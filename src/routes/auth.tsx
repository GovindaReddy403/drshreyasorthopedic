import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, LogIn, ShieldCheck, Stethoscope } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Staff login — Meridian Family Clinic" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"doctor" | "receptionist">("doctor");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) redirectByRole(data.session.user.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function redirectByRole(userId: string) {
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
    const roles = (data ?? []).map((r) => r.role);
    if (roles.includes("doctor")) navigate({ to: "/doctor" });
    else if (roles.includes("receptionist")) navigate({ to: "/reception" });
    else navigate({ to: "/" });
  }

  async function signIn() {
    const parsed = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse({ email, password });
    if (!parsed.success) return toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
    setBusy(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Signed in");
    if (data.user) redirectByRole(data.user.id);
  }

  async function signUp() {
    const parsed = z.object({ email: z.string().email(), password: z.string().min(8) }).safeParse({ email, password });
    if (!parsed.success) return toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin + "/auth" },
    });
    if (error) {
      setBusy(false);
      return toast.error(error.message);
    }
    // Assign role immediately (first sign-up in fresh project); if it fails silently we'll say so.
    if (data.user) {
      const { error: rErr } = await supabase.from("user_roles").insert({ user_id: data.user.id, role });
      if (rErr) console.warn("Role assignment failed:", rErr.message);
    }
    setBusy(false);
    toast.success("Account created. You can sign in now.");
    setTab("signin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-hero-gradient px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Stethoscope className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-2xl font-semibold">Staff portal</h1>
            <p className="text-sm text-muted-foreground">Doctor & Receptionist access</p>
          </div>
        </div>

        <Tabs value={tab} onValueChange={(t) => setTab(t as "signin" | "signup")} className="mt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign in</TabsTrigger>
            <TabsTrigger value="signup">Create account</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="mt-6 grid gap-4">
            <Field label="Email">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
            <Field label="Password">
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Field>
            <Button onClick={signIn} disabled={busy} className="gap-2">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
              Sign in
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="mt-6 grid gap-4">
            <Field label="Email">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
            <Field label="Password (min 8 chars)">
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Field>
            <Field label="Role">
              <div className="grid grid-cols-2 gap-2">
                {(["doctor", "receptionist"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`rounded-lg border px-3 py-2 text-sm capitalize ${
                      role === r ? "border-primary bg-primary-soft text-primary" : "border-border"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </Field>
            <Button onClick={signUp} disabled={busy} className="gap-2">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              Create account
            </Button>
            <p className="text-xs text-muted-foreground">
              First account per role should be created by the clinic owner. In production you'd invite team members instead.
            </p>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center text-sm">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1 block">{label}</Label>
      {children}
    </div>
  );
}
