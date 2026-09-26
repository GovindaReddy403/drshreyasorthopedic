-- Keep the legacy OTP table during rollout so the current site is unaffected.
-- Retire it only after the SMS-backed application is deployed and verified.
-- Anonymous browser clients must not bypass the validated booking function.
DROP POLICY IF EXISTS "anon insert appointment" ON public.appointments;
DROP POLICY IF EXISTS "anyone upsert patient by mobile" ON public.patients;
REVOKE INSERT, UPDATE ON public.appointments FROM anon;
REVOKE INSERT, UPDATE ON public.patients FROM anon;
CREATE POLICY "staff insert appointments" ON public.appointments FOR INSERT TO authenticated
  WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "staff insert patients" ON public.patients FOR INSERT TO authenticated
  WITH CHECK (public.is_staff(auth.uid()));
CREATE TABLE public.patient_manage_sessions (
  token_hash text PRIMARY KEY,
  mobile text NOT NULL CHECK (mobile ~ '^[0-9]{10}$'),
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX patient_manage_sessions_expiry_idx ON public.patient_manage_sessions (expires_at);
ALTER TABLE public.appointments ALTER COLUMN booking_code
  SET DEFAULT ('APT-' || upper(replace(gen_random_uuid()::text, '-', '')));
ALTER TABLE public.patient_manage_sessions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.patient_manage_sessions FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.patient_manage_sessions TO service_role;

-- The application calls this with a server-only service-role client. The advisory
-- lock serializes checks and inserts for the same clinic slot across workers.
CREATE OR REPLACE FUNCTION public.book_clinic_appointment(
  p_full_name text, p_mobile text, p_email text, p_age integer,
  p_gender text, p_treatment_id uuid, p_date date, p_time time, p_reason text
) RETURNS text
LANGUAGE plpgsql SECURITY INVOKER SET search_path = public
AS $$
DECLARE
  v_clinic public.clinic_settings%ROWTYPE;
  v_hours public.working_hours%ROWTYPE;
  v_treatment public.treatments%ROWTYPE;
  v_patient_id uuid;
  v_code text;
  v_slot_minutes integer;
  v_count integer;
BEGIN
  IF p_mobile !~ '^[6-9][0-9]{9}$' OR length(trim(p_full_name)) < 2 THEN
    RAISE EXCEPTION 'Invalid patient details';
  END IF;
  IF p_date IS NULL OR p_time IS NULL OR (p_date + p_time) <= (now() AT TIME ZONE 'Asia/Kolkata') THEN
    RAISE EXCEPTION 'Please choose a future appointment time';
  END IF;

  PERFORM pg_advisory_xact_lock(hashtextextended(p_date::text || '/' || p_time::text, 0));
  SELECT * INTO STRICT v_clinic FROM public.clinic_settings WHERE id = 1;
  IF v_clinic.slot_duration_minutes <= 0 OR v_clinic.max_per_slot <= 0 THEN
    RAISE EXCEPTION 'Clinic booking is unavailable';
  END IF;
  SELECT * INTO v_treatment FROM public.treatments WHERE id = p_treatment_id AND is_active;
  IF NOT FOUND THEN RAISE EXCEPTION 'Please choose an active treatment'; END IF;
  SELECT * INTO v_hours FROM public.working_hours WHERE weekday = extract(dow FROM p_date);
  IF NOT FOUND OR NOT v_hours.is_open OR EXISTS (
    SELECT 1 FROM public.blocked_dates WHERE blocked_date = p_date
  ) THEN RAISE EXCEPTION 'The clinic is closed on this date'; END IF;

  v_slot_minutes := (extract(hour FROM p_time)::integer * 60 + extract(minute FROM p_time)::integer);
  IF extract(second FROM p_time) <> 0 OR NOT (
    (v_hours.morning_start IS NOT NULL AND v_hours.morning_end IS NOT NULL
      AND p_time >= v_hours.morning_start
      AND p_time + make_interval(mins => v_clinic.slot_duration_minutes) <= v_hours.morning_end
      AND (v_slot_minutes - (extract(hour FROM v_hours.morning_start)::integer * 60
          + extract(minute FROM v_hours.morning_start)::integer)) % v_clinic.slot_duration_minutes = 0)
    OR (v_hours.evening_start IS NOT NULL AND v_hours.evening_end IS NOT NULL
      AND p_time >= v_hours.evening_start
      AND p_time + make_interval(mins => v_clinic.slot_duration_minutes) <= v_hours.evening_end
      AND (v_slot_minutes - (extract(hour FROM v_hours.evening_start)::integer * 60
          + extract(minute FROM v_hours.evening_start)::integer)) % v_clinic.slot_duration_minutes = 0)
  ) THEN RAISE EXCEPTION 'Please choose an available clinic slot'; END IF;

  SELECT count(*) INTO v_count FROM public.appointments
  WHERE appointment_date = p_date AND appointment_time = p_time
    AND status IN ('confirmed', 'checked_in', 'completed');
  IF v_count >= v_clinic.max_per_slot THEN RAISE EXCEPTION 'This slot was just taken. Please pick another'; END IF;

  INSERT INTO public.patients (mobile, full_name, email, age, gender)
  VALUES (p_mobile, trim(p_full_name), p_email, p_age, p_gender)
  ON CONFLICT (mobile) DO UPDATE SET full_name = excluded.full_name,
    email = excluded.email, age = excluded.age, gender = excluded.gender
  RETURNING id INTO v_patient_id;

  INSERT INTO public.appointments (
    patient_id, patient_mobile, patient_name, treatment_id, treatment_name,
    appointment_date, appointment_time, duration_minutes, reason, status,
    payment_method, payment_status, payment_amount, booked_by
  ) VALUES (
    v_patient_id, p_mobile, trim(p_full_name), v_treatment.id, v_treatment.name,
    p_date, p_time, v_treatment.duration_minutes, p_reason, 'confirmed',
    'clinic', 'pending', v_treatment.fee, 'patient'
  ) RETURNING booking_code INTO v_code;
  RETURN v_code;
END;
$$;
REVOKE ALL ON FUNCTION public.book_clinic_appointment(text,text,text,integer,text,uuid,date,time,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.book_clinic_appointment(text,text,text,integer,text,uuid,date,time,text) TO service_role;

-- Patient cancellation must be scoped to the verified mobile and checked in the DB.
CREATE OR REPLACE FUNCTION public.cancel_patient_appointment(p_id uuid, p_mobile text)
RETURNS boolean LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
BEGIN
  UPDATE public.appointments SET status = 'cancelled'
  WHERE id = p_id AND patient_mobile = p_mobile AND status = 'confirmed'
    AND (appointment_date + appointment_time) > ((now() AT TIME ZONE 'Asia/Kolkata') + interval '1 hour');
  RETURN FOUND;
END;
$$;
REVOKE ALL ON FUNCTION public.cancel_patient_appointment(uuid,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.cancel_patient_appointment(uuid,text) TO service_role;
