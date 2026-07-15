
-- Lock down otp_codes: remove all anon policies. Only service role (server) may access it.
DROP POLICY IF EXISTS "anon read own otp" ON public.otp_codes;
DROP POLICY IF EXISTS "anon update otp used" ON public.otp_codes;
DROP POLICY IF EXISTS "anon insert otp" ON public.otp_codes;

REVOKE SELECT, INSERT, UPDATE, DELETE ON public.otp_codes FROM anon, authenticated;
GRANT ALL ON public.otp_codes TO service_role;

-- Explicit deny policies on user_roles for writes to prevent privilege escalation.
CREATE POLICY "deny insert user_roles" ON public.user_roles
  FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "deny update user_roles" ON public.user_roles
  FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "deny delete user_roles" ON public.user_roles
  FOR DELETE TO anon, authenticated USING (false);

-- Convert SECURITY DEFINER helpers to SECURITY INVOKER; user_roles SELECT policy
-- lets authenticated users see their own roles, which is all these functions check via auth.uid().
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id)
$$;
