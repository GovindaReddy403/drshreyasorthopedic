
-- Roles
CREATE TYPE public.app_role AS ENUM ('doctor', 'receptionist');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id)
$$;

-- Shared updated_at trigger
CREATE OR REPLACE FUNCTION public.tg_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Clinic settings (singleton, id=1)
CREATE TABLE public.clinic_settings (
  id INT PRIMARY KEY DEFAULT 1,
  clinic_name TEXT NOT NULL DEFAULT 'Your Clinic',
  clinic_logo_url TEXT,
  tagline TEXT,
  doctor_name TEXT NOT NULL DEFAULT 'Dr. Doctor',
  doctor_photo_url TEXT,
  qualifications TEXT,
  specialization TEXT,
  years_experience INT DEFAULT 0,
  about_doctor TEXT,
  education TEXT,
  professional_experience TEXT,
  certifications TEXT,
  awards TEXT,
  memberships TEXT,
  languages_spoken TEXT,
  consultation_fee NUMERIC(10,2) DEFAULT 500,
  emergency_contact TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  address TEXT,
  google_maps_url TEXT,
  google_maps_embed TEXT,
  slot_duration_minutes INT NOT NULL DEFAULT 30,
  max_per_slot INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT clinic_singleton CHECK (id = 1)
);
GRANT SELECT ON public.clinic_settings TO anon, authenticated;
GRANT ALL ON public.clinic_settings TO service_role;
GRANT UPDATE, INSERT ON public.clinic_settings TO authenticated;
ALTER TABLE public.clinic_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read clinic" ON public.clinic_settings FOR SELECT USING (true);
CREATE POLICY "doctor update clinic" ON public.clinic_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'doctor')) WITH CHECK (public.has_role(auth.uid(),'doctor'));
CREATE POLICY "doctor insert clinic" ON public.clinic_settings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'doctor'));
CREATE TRIGGER tg_clinic_updated BEFORE UPDATE ON public.clinic_settings FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Treatments
CREATE TABLE public.treatments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  fee NUMERIC(10,2) NOT NULL DEFAULT 0,
  duration_minutes INT NOT NULL DEFAULT 30,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.treatments TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.treatments TO authenticated;
GRANT ALL ON public.treatments TO service_role;
ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read treatments" ON public.treatments FOR SELECT USING (is_active OR public.is_staff(auth.uid()));
CREATE POLICY "doctor manage treatments" ON public.treatments FOR ALL TO authenticated USING (public.has_role(auth.uid(),'doctor')) WITH CHECK (public.has_role(auth.uid(),'doctor'));
CREATE TRIGGER tg_treatments_updated BEFORE UPDATE ON public.treatments FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Gallery
CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.gallery TO authenticated;
GRANT ALL ON public.gallery TO service_role;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "doctor manage gallery" ON public.gallery FOR ALL TO authenticated USING (public.has_role(auth.uid(),'doctor')) WITH CHECK (public.has_role(auth.uid(),'doctor'));

-- Testimonials
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read testimonials" ON public.testimonials FOR SELECT USING (is_published OR public.is_staff(auth.uid()));
CREATE POLICY "doctor manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.has_role(auth.uid(),'doctor')) WITH CHECK (public.has_role(auth.uid(),'doctor'));

-- FAQs
CREATE TABLE public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faqs TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "doctor manage faqs" ON public.faqs FOR ALL TO authenticated USING (public.has_role(auth.uid(),'doctor')) WITH CHECK (public.has_role(auth.uid(),'doctor'));

-- Working hours per weekday (0=Sun..6=Sat), morning + evening session
CREATE TABLE public.working_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  weekday SMALLINT NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  is_open BOOLEAN NOT NULL DEFAULT true,
  morning_start TIME,
  morning_end TIME,
  evening_start TIME,
  evening_end TIME,
  UNIQUE(weekday)
);
GRANT SELECT ON public.working_hours TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.working_hours TO authenticated;
GRANT ALL ON public.working_hours TO service_role;
ALTER TABLE public.working_hours ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read hours" ON public.working_hours FOR SELECT USING (true);
CREATE POLICY "doctor manage hours" ON public.working_hours FOR ALL TO authenticated USING (public.has_role(auth.uid(),'doctor')) WITH CHECK (public.has_role(auth.uid(),'doctor'));

-- Blocked dates / holidays
CREATE TABLE public.blocked_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocked_date DATE NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blocked_dates TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.blocked_dates TO authenticated;
GRANT ALL ON public.blocked_dates TO service_role;
ALTER TABLE public.blocked_dates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read blocked" ON public.blocked_dates FOR SELECT USING (true);
CREATE POLICY "doctor manage blocked" ON public.blocked_dates FOR ALL TO authenticated USING (public.has_role(auth.uid(),'doctor')) WITH CHECK (public.has_role(auth.uid(),'doctor'));

-- Patients (keyed by mobile)
CREATE TABLE public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mobile TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT,
  age INT,
  gender TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.patients TO anon, authenticated;
GRANT ALL ON public.patients TO service_role;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff read patients" ON public.patients FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "anyone upsert patient by mobile" ON public.patients FOR INSERT WITH CHECK (true);
CREATE POLICY "staff update patients" ON public.patients FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER tg_patients_updated BEFORE UPDATE ON public.patients FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Appointments
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_code TEXT NOT NULL UNIQUE DEFAULT ('APT-' || upper(substring(gen_random_uuid()::text, 1, 8))),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  patient_mobile TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  treatment_id UUID REFERENCES public.treatments(id),
  treatment_name TEXT,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 30,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'confirmed', -- confirmed, checked_in, completed, cancelled, no_show
  payment_method TEXT NOT NULL DEFAULT 'clinic', -- clinic, online
  payment_status TEXT NOT NULL DEFAULT 'pending', -- pending, paid_clinic, paid_online, refunded
  payment_amount NUMERIC(10,2) DEFAULT 0,
  payment_paid_at TIMESTAMPTZ,
  payment_reference TEXT,
  internal_notes TEXT,
  booked_by TEXT NOT NULL DEFAULT 'patient', -- patient, receptionist, doctor
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_appt_date_time ON public.appointments(appointment_date, appointment_time);
CREATE INDEX idx_appt_mobile ON public.appointments(patient_mobile);
CREATE INDEX idx_appt_status ON public.appointments(status);
GRANT SELECT, INSERT, UPDATE ON public.appointments TO anon, authenticated;
GRANT ALL ON public.appointments TO service_role;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
-- Anon: can insert new bookings; can read/update only via OTP-verified mobile flow (server function w/ admin). For safety, restrict anon reads to none.
CREATE POLICY "anon insert appointment" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "staff read appointments" ON public.appointments FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "staff update appointments" ON public.appointments FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER tg_appts_updated BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Doctor consultation notes
CREATE TABLE public.doctor_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  notes TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.doctor_notes TO authenticated;
GRANT ALL ON public.doctor_notes TO service_role;
ALTER TABLE public.doctor_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff read notes" ON public.doctor_notes FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "doctor manage notes" ON public.doctor_notes FOR ALL TO authenticated USING (public.has_role(auth.uid(),'doctor')) WITH CHECK (public.has_role(auth.uid(),'doctor'));
CREATE TRIGGER tg_notes_updated BEFORE UPDATE ON public.doctor_notes FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- OTP codes (for patient mobile verification during Manage Appointment flow)
CREATE TABLE public.otp_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mobile TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_otp_mobile ON public.otp_codes(mobile);
GRANT SELECT, INSERT, UPDATE ON public.otp_codes TO anon, authenticated;
GRANT ALL ON public.otp_codes TO service_role;
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon insert otp" ON public.otp_codes FOR INSERT WITH CHECK (true);
CREATE POLICY "anon read own otp" ON public.otp_codes FOR SELECT USING (true);
CREATE POLICY "anon update otp used" ON public.otp_codes FOR UPDATE USING (true) WITH CHECK (true);

-- Seed clinic + defaults
INSERT INTO public.clinic_settings (id, clinic_name, tagline, doctor_name, qualifications, specialization, years_experience, about_doctor, education, professional_experience, certifications, awards, memberships, languages_spoken, consultation_fee, emergency_contact, phone, whatsapp, email, address, google_maps_url)
VALUES (1,
  'Meridian Family Clinic',
  'Compassionate care, modern medicine.',
  'Dr. Anika Sharma',
  'MBBS, MD (Internal Medicine)',
  'Internal Medicine & Preventive Care',
  14,
  'Dr. Anika Sharma is a board-certified internal medicine physician with 14+ years of experience treating adults and adolescents. She believes in listening first — building long-term relationships with her patients and focusing on prevention as much as treatment.',
  'MBBS — Grant Medical College, Mumbai (2008)\nMD, Internal Medicine — AIIMS, New Delhi (2012)\nFellowship, Preventive Cardiology — Cleveland Clinic (2014)',
  'Consultant Physician, Apollo Hospitals (2014–2019)\nSenior Consultant, Fortis Healthcare (2019–2023)\nFounder, Meridian Family Clinic (2023–present)',
  'Board Certified, American Board of Internal Medicine\nAdvanced Cardiac Life Support (ACLS)\nCertified Diabetes Educator (CDE)',
  'Young Physician Award, Indian Medical Association (2018)\nBest Preventive Care Practice, Health India Awards (2022)',
  'Fellow, Royal College of Physicians (FRCP)\nIndian Medical Association (IMA)\nAssociation of Physicians of India (API)',
  'English, Hindi, Marathi',
  600,
  '+91 98765 43210',
  '+91 98765 43210',
  '+91 98765 43210',
  'care@meridianclinic.example',
  '4th Floor, Wellness Plaza, Bandra West, Mumbai 400050',
  'https://maps.google.com/?q=Bandra+West+Mumbai'
) ON CONFLICT (id) DO NOTHING;

-- Default working hours: Mon-Sat open, Sun closed
INSERT INTO public.working_hours (weekday, is_open, morning_start, morning_end, evening_start, evening_end) VALUES
 (0,false,NULL,NULL,NULL,NULL),
 (1,true,'09:00','13:00','17:00','20:00'),
 (2,true,'09:00','13:00','17:00','20:00'),
 (3,true,'09:00','13:00','17:00','20:00'),
 (4,true,'09:00','13:00','17:00','20:00'),
 (5,true,'09:00','13:00','17:00','20:00'),
 (6,true,'10:00','13:00',NULL,NULL)
ON CONFLICT (weekday) DO NOTHING;

INSERT INTO public.treatments (name, description, fee, duration_minutes, sort_order) VALUES
 ('General Consultation','Comprehensive check-up for common concerns, symptoms and follow-ups.',600,20,1),
 ('Preventive Health Screening','Annual wellness review with lifestyle, cardiac and metabolic risk assessment.',1500,45,2),
 ('Diabetes Management','Ongoing care for Type 1 & Type 2 diabetes — labs review, medication and lifestyle plan.',800,30,3),
 ('Hypertension Review','Blood pressure evaluation, medication tuning, and long-term monitoring plan.',700,30,4),
 ('Travel Medicine','Pre-travel vaccinations, prescriptions and health advice for international trips.',900,30,5),
 ('Vaccination','Adult immunizations including flu, tetanus, hepatitis and travel vaccines.',500,15,6);

INSERT INTO public.testimonials (patient_name, content, rating) VALUES
 ('Rahul M.','Dr. Sharma actually listens. First doctor in years who explained things without rushing me out.',5),
 ('Priya K.','Booked online, walked in, seen on time. The whole experience felt calm and professional.',5),
 ('Ahmed S.','Great preventive care advice — I finally feel in control of my health.',5);

INSERT INTO public.faqs (question, answer, sort_order) VALUES
 ('Do I need to create an account to book?','No. Just enter your mobile number when booking. To manage or cancel later, we send a one-time code to that same number.',1),
 ('Can I pay at the clinic?','Yes. Choose "Pay at Clinic" during booking and settle by cash, card or UPI at reception.',2),
 ('What is your cancellation policy?','You can cancel any appointment up to one hour before its scheduled time from the Manage Appointment page.',3),
 ('Do you accept walk-ins?','We prefer appointments to avoid waiting, but reception will always try to accommodate urgent walk-ins.',4);
