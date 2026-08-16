UPDATE public.doctors SET
  name = 'Dr. Shreyas M. J.',
  qualifications = 'MBBS, MS (Orthopaedics)',
  specialization = 'Arthroscopy & Sports Medicine | Knee & Shoulder | Joint Replacement | Trauma | Spine Injuries',
  about = 'Dr. Shreyas M. J. is a qualified Orthopaedic Surgeon with specialised training and extensive experience in Arthroscopy, Sports Medicine, Knee and Shoulder Surgery, and Upper and Lower Limb Trauma. He completed his MBBS and MS (Orthopaedics) at JSS Medical College and Hospital, Mysore. He began his career as a Senior Resident in the Department of Orthopaedics at the Sanjay Gandhi Institute of Trauma & Orthopaedics, Bengaluru. He is currently Assistant Professor in the Department of Orthopaedics at JSS Hospital, Mysore.',
  education = 'MBBS & MS (Orthopaedics), JSS Medical College and Hospital, Mysore',
  professional_experience = 'Senior Resident, Sanjay Gandhi Institute of Trauma & Orthopaedics, Bengaluru; Senior Registrar, Dept. of Orthopaedics, Fortis Hospital; Assistant Professor, Dept. of Orthopaedics, JSS Hospital, Mysore',
  certifications = 'Fellowship in Arthroscopy & Sports Medicine, Fortis Hospital (Dr. Chirag N. Thonse); Fellowship in Arthroscopy & Upper Limb Trauma, Sydney, Australia (Dr. Jonathan Herald); Fellowship in Arthroscopy (Knee & Shoulder), Thammasat University, Bangkok (Dr. Bancha Chernchujit)'
WHERE is_primary = true;

UPDATE public.clinic_settings SET
  doctor_name = 'Dr. Shreyas M. J.',
  qualifications = 'MBBS, MS (Orthopaedics)',
  specialization = 'Arthroscopy & Sports Medicine | Knee & Shoulder | Joint Replacement | Trauma | Spine Injuries',
  about_doctor = 'Dr. Shreyas M. J. is a qualified Orthopaedic Surgeon with specialised training and extensive experience in Arthroscopy, Sports Medicine, Knee and Shoulder Surgery, and Upper and Lower Limb Trauma. He completed his MBBS and MS (Orthopaedics) at JSS Medical College and Hospital, Mysore, and is currently Assistant Professor in the Department of Orthopaedics at JSS Hospital, Mysore.',
  certifications = 'Fellowship in Arthroscopy & Sports Medicine, Fortis Hospital; Fellowship in Arthroscopy & Upper Limb Trauma, Sydney, Australia; Fellowship in Arthroscopy (Knee & Shoulder), Thammasat University, Bangkok'
WHERE id = 1;