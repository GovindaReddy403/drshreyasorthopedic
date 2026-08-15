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
  validateSearch: (s: Record<string, unknown>): { next?: string } => {
    const next = typeof s.next === "string" && s.next.startsWith("/") && !s.next.startsWith("//") ? s.next : undefined;
    return next ? { next } : {};
  },

  head: () => ({
    meta: [
      { title: "Staff login — Dr. Shreyas Orthopedic Clinic" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});


function AuthPage() {
  const navigate = useNavigate();
  const { next } = Route.useSearch();

  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"doctor" | "receptionist">("doctor");
  const [busy, setBusy] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) redirectByRole(data.session.user.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function showError(prefix: string, err: unknown) {
    const anyErr = err as { message?: string; status?: number; name?: string; code?: string } | null;
    const parts = [
      anyErr?.message ?? String(err),
      anyErr?.status != null ? `status ${anyErr.status}` : null,
      anyErr?.code ? `code ${anyErr.code}` : null,
      anyErr?.name ? `(${anyErr.name})` : null,
    ].filter(Boolean);
    const msg = `${prefix}: ${parts.join(" · ")}`;
    console.error(`[auth] ${prefix}`, err);
    setErrorDetails(msg);
    toast.error(msg);
  }

  async function redirectByRole(userId: string) {
    if (next) {
      window.location.href = next;
      return;
    }
    const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId);

    if (error) return showError("Loading roles failed", error);
    const roles = (data ?? []).map((r) => r.role);
    if (roles.includes("doctor")) navigate({ to: "/doctor" });
    else if (roles.includes("receptionist")) navigate({ to: "/reception" });
    else {
      const msg = "Signed in, but this account has no staff role. A clinic owner/admin must assign doctor or receptionist access before this account can open the staff dashboard.";
      setErrorDetails(msg);
      toast.error(msg);
    }
  }

  async function signInExistingAccount() {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return showError("Account already exists, but sign in failed", error);
    toast.success("Account already exists — signed in");
    if (data.user) await redirectByRole(data.user.id);
  }

  async function signIn() {
    setErrorDetails(null);
    const parsed = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse({ email, password });
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Invalid input";
      setErrorDetails(msg);
      return toast.error(msg);
    }
    setBusy(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return showError("Sign in failed", error);
      toast.success("Signed in");
      if (data.user) await redirectByRole(data.user.id);
    } catch (e) {
      showError("Sign in threw", e);
    } finally {
      setBusy(false);
    }
  }

  async function signUp() {
    setErrorDetails(null);
    const parsed = z.object({ email: z.string().email(), password: z.string().min(8) }).safeParse({ email, password });
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Invalid input";
      setErrorDetails(msg);
      return toast.error(msg);
    }
    setBusy(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/auth" },
      });
      if (error) {
        const authError = error as { code?: string; status?: number };
        if (authError.code === "user_already_exists" || authError.status === 422) {
          await signInExistingAccount();
          return;
        }
        return showError("Create account failed", error);
      }

      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        toast.success("Account created. Confirm your email, then sign in.");
        setTab("signin");
        return;
      }

      const userId = signInData.user?.id ?? data.user?.id;
      if (userId) {
        const { error: rErr } = await supabase.from("user_roles").insert({ user_id: userId, role });
        if (rErr) return showError("Role assignment failed", rErr);
      }
      toast.success("Account created — signed in");
      if (signInData.user) await redirectByRole(signInData.user.id);
    } catch (e) {
      showError("Create account threw", e);
    } finally {
      setBusy(false);
    }
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

        {errorDetails && (
          <div className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            <div className="font-semibold">Login error</div>
            <div className="mt-1 break-words font-mono text-xs">{errorDetails}</div>
          </div>
        )}

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
