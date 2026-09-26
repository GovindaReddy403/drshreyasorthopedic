-- Gallery uploads are private until staff choose to display them via a signed URL.
-- The public gallery table continues to expose only curated display records.
DROP POLICY IF EXISTS "Anyone can read gallery" ON storage.objects;

CREATE POLICY "Staff can read gallery" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'gallery' AND public.is_staff(auth.uid()));
