
ALTER TABLE public.clinic_settings
  ADD COLUMN IF NOT EXISTS instagram_url text,
  ADD COLUMN IF NOT EXISTS facebook_url text,
  ADD COLUMN IF NOT EXISTS youtube_url text,
  ADD COLUMN IF NOT EXISTS twitter_url text,
  ADD COLUMN IF NOT EXISTS linkedin_url text;

UPDATE public.clinic_settings SET
  clinic_name = 'Dr. Shreyas Orthopedic Clinic',
  tagline = 'Bone & Joint Care',
  doctor_name = 'Dr. Shreyas M.J',
  qualifications = 'MBBS, MS (Ortho)',
  specialization = 'Sports Medicine Specialist & Joint Replacement Surgeon',
  phone = '86609 50443',
  whatsapp = '86609 50443',
  address = 'Shop no 1, 5, Vivekananda Cir Rd, beside Karnataka Bank and Patangali store, Vivekananda Nagar, Mysuru, Karnataka 570023',
  google_maps_url = 'https://maps.app.goo.gl/6WGqUa5tk2gTi1JD7'
WHERE id = 1;
