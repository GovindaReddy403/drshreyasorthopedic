
DROP POLICY IF EXISTS "public read treatments" ON public.treatments;
CREATE POLICY "public read active treatments" ON public.treatments FOR SELECT USING (is_active);
CREATE POLICY "staff read all treatments" ON public.treatments FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "public read testimonials" ON public.testimonials;
CREATE POLICY "public read published testimonials" ON public.testimonials FOR SELECT USING (is_published);
CREATE POLICY "staff read all testimonials" ON public.testimonials FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
