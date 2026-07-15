
UPDATE public.clinic_settings SET
  clinic_name = 'Dr. Shreyas Orthopedic Clinic',
  tagline = 'Bone & Joint Care',
  specialization = 'Arthroscopy • Joint Replacement • Spine • Foot & Ankle • Trauma',
  phone = '86609 50443',
  whatsapp = '86609 50443'
WHERE id = 1;

UPDATE public.treatments SET is_active = false;

INSERT INTO public.treatments (name, description, fee, duration_minutes, is_active, sort_order) VALUES
  ('Arthroscopy - Knee & Shoulder (Key Hole)', 'Minimally invasive keyhole arthroscopic surgery for knee and shoulder joints.', 800, 20, true, 1),
  ('Joint Replacement', 'Consultation and planning for knee, hip and shoulder joint replacement.', 800, 20, true, 2),
  ('Spine Injury', 'Assessment and management of spine injuries and back pain.', 800, 20, true, 3),
  ('Foot & Ankle', 'Diagnosis and treatment of foot and ankle disorders and sports injuries.', 800, 20, true, 4),
  ('Trauma', 'Fracture and trauma care, follow-up and rehabilitation guidance.', 800, 20, true, 5);

-- Working hours: 5pm-9pm all days except Sunday (weekday 0)
UPDATE public.working_hours SET
  is_open = true,
  morning_start = NULL,
  morning_end = NULL,
  evening_start = '17:00',
  evening_end = '21:00'
WHERE weekday BETWEEN 1 AND 6;

UPDATE public.working_hours SET
  is_open = false,
  morning_start = NULL,
  morning_end = NULL,
  evening_start = NULL,
  evening_end = NULL
WHERE weekday = 0;
