
-- Grant Data API access to public tables (was missing, causing 401 on inserts)
GRANT SELECT ON public.clinic_settings TO anon, authenticated;
GRANT ALL ON public.clinic_settings TO service_role;

GRANT SELECT ON public.treatments TO anon, authenticated;
GRANT ALL ON public.treatments TO service_role;

GRANT SELECT ON public.working_hours TO anon, authenticated;
GRANT ALL ON public.working_hours TO service_role;

GRANT SELECT ON public.blocked_dates TO anon, authenticated;
GRANT ALL ON public.blocked_dates TO service_role;

GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT ALL ON public.testimonials TO service_role;

GRANT SELECT ON public.faqs TO anon, authenticated;
GRANT ALL ON public.faqs TO service_role;

GRANT SELECT ON public.gallery TO anon, authenticated;
GRANT ALL ON public.gallery TO service_role;

GRANT SELECT, INSERT, UPDATE ON public.patients TO anon, authenticated;
GRANT ALL ON public.patients TO service_role;

GRANT SELECT, INSERT, UPDATE ON public.appointments TO anon, authenticated;
GRANT ALL ON public.appointments TO service_role;

GRANT SELECT, INSERT ON public.otp_codes TO anon, authenticated;
GRANT ALL ON public.otp_codes TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.doctor_notes TO authenticated;
GRANT ALL ON public.doctor_notes TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
