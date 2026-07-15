CREATE POLICY "Staff can upload gallery" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gallery' AND public.is_staff(auth.uid()));
CREATE POLICY "Staff can update gallery" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'gallery' AND public.is_staff(auth.uid()));
CREATE POLICY "Staff can delete gallery" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'gallery' AND public.is_staff(auth.uid()));
CREATE POLICY "Anyone can read gallery" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'gallery');