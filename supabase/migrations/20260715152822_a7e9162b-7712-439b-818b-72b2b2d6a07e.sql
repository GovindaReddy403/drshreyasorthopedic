
-- 1) Update clinic settings
UPDATE public.clinic_settings SET
  clinic_name = 'Dr. Shreyas Orthopedic Clinic',
  tagline = 'Bone & Joint Care',
  doctor_name = 'Dr. Shreyas',
  qualifications = 'MBBS, MS (Orthopaedics), Fellowship in Arthroscopy & Sports Medicine',
  specialization = 'Orthopaedic Surgeon · Arthroscopy & Sports Medicine',
  about_doctor = 'MBBS & MS (Ortho) from JSS Medical College and Hospitals. Started career as Senior Resident, Department of Orthopaedics, Sanjay Gandhi Institute of Trauma & Orthopaedics. Pursued Fellowship in Arthroscopy and Sports Medicine at Fortis Hospital under Dr. Chirag N Thonse. Worked as Senior Registrar at Fortis Hospital.',
  education = 'MBBS & MS (Orthopaedics) — JSS Medical College and Hospitals',
  professional_experience = 'Senior Resident, Sanjay Gandhi Institute of Trauma & Orthopaedics\nSenior Registrar, Fortis Hospital',
  certifications = 'Fellowship in Arthroscopy and Sports Injury — Fortis Hospital (under Dr. Chirag N Thonse)',
  memberships = 'KOA (Karnataka Orthopaedic Association) Member\nMOA (Mysore Orthopaedic Association) Member',
  phone = '86609 50443',
  whatsapp = '86609 50443',
  address = 'Shop no 1, 5, Vivekananda Cir Rd, beside Karnataka Bank and Patanjali store, Vivekananda Nagar, Mysuru, Karnataka 570023, India',
  google_maps_url = 'https://maps.app.goo.gl/6WGqUa5tk2gTi1JD7'
WHERE id = 1;

-- 2) Rewrite treatments
UPDATE public.treatments SET is_active = false;

INSERT INTO public.treatments (name, description, fee, duration_minutes, is_active, sort_order) VALUES
  ('Arthroscopy — Knee & Shoulder (Key-Hole)', 'Minimally invasive key-hole surgery for knee and shoulder injuries, including ligament repair and cartilage procedures.', 800, 30, true, 1),
  ('Joint Replacement', 'Total and partial joint replacement for hip and knee arthritis to restore pain-free mobility.', 800, 30, true, 2),
  ('Spine Injury', 'Evaluation and management of spine injuries, disc problems, and back pain.', 800, 30, true, 3),
  ('Foot & Ankle', 'Care for foot and ankle injuries, sports-related sprains, and chronic conditions.', 800, 30, true, 4),
  ('Trauma', 'Fracture management and post-trauma orthopaedic care.', 800, 30, true, 5);

-- 3) Working hours: 5PM-9PM Mon-Sat, Sunday closed
UPDATE public.working_hours SET
  is_open = false,
  morning_start = NULL, morning_end = NULL,
  evening_start = NULL, evening_end = NULL
WHERE weekday = 0;

UPDATE public.working_hours SET
  is_open = true,
  morning_start = NULL, morning_end = NULL,
  evening_start = '17:00', evening_end = '21:00'
WHERE weekday BETWEEN 1 AND 6;

-- 4) Doctors table for future multi-doctor support
CREATE TABLE IF NOT EXISTS public.doctors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  qualifications TEXT,
  specialization TEXT,
  photo_url TEXT,
  about TEXT,
  education TEXT,
  professional_experience TEXT,
  certifications TEXT,
  memberships TEXT,
  languages_spoken TEXT,
  years_experience INT,
  consultation_fee NUMERIC,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.doctors TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.doctors TO authenticated;
GRANT ALL ON public.doctors TO service_role;

ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active doctors"
  ON public.doctors FOR SELECT
  USING (is_active = true);

CREATE POLICY "Staff can manage doctors"
  ON public.doctors FOR ALL
  TO authenticated
  USING (public.is_staff(auth.uid()))
  WITH CHECK (public.is_staff(auth.uid()));

CREATE TRIGGER doctors_set_updated_at
  BEFORE UPDATE ON public.doctors
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Seed the primary doctor
INSERT INTO public.doctors (name, qualifications, specialization, about, education, professional_experience, certifications, memberships, is_primary, sort_order)
VALUES (
  'Dr. Shreyas',
  'MBBS, MS (Orthopaedics), Fellowship in Arthroscopy & Sports Medicine',
  'Orthopaedic Surgeon · Arthroscopy & Sports Medicine',
  'MBBS & MS (Ortho) from JSS Medical College and Hospitals. Started career as Senior Resident, Department of Orthopaedics, Sanjay Gandhi Institute of Trauma & Orthopaedics. Pursued Fellowship in Arthroscopy and Sports Medicine at Fortis Hospital under Dr. Chirag N Thonse. Worked as Senior Registrar at Fortis Hospital.',
  'MBBS & MS (Orthopaedics) — JSS Medical College and Hospitals',
  E'Senior Resident, Sanjay Gandhi Institute of Trauma & Orthopaedics\nSenior Registrar, Fortis Hospital',
  'Fellowship in Arthroscopy and Sports Injury — Fortis Hospital (under Dr. Chirag N Thonse)',
  E'KOA (Karnataka Orthopaedic Association) Member\nMOA (Mysore Orthopaedic Association) Member',
  true,
  1
);
