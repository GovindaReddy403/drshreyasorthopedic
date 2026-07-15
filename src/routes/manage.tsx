import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { format, differenceInMinutes } from "date-fns";
import { ArrowLeft, CheckCircle2, Clock, Loader2, Phone, ShieldCheck, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { SiteNav } from "@/components/site-nav";
import { supabase } from "@/integrations/supabase/client";
import { fetchClinic } from "@/lib/clinic";
import { labelSlot } from "@/lib/slots";
import { sendOtp, verifyOtp } from "@/lib/otp.functions";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";

const clinicQO = queryOptions({ queryKey: ["clinic"], queryFn: fetchClinic });

export const Route = createFileRoute("/manage")({
  loader: ({ context }) => context.queryClient.ensureQueryData(clinicQO),
  head: () => ({
    meta: [
      { title: "Manage appointment" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ManagePage,
});

type Appointment = {
  id: string;
  booking_code: string;
  patient_name: string;
  treatment_name: string | null;
  appointment_date: string;
  appointment_time: string;
  payment_method: string;
  payment_status: string;
  payment_amount: number | null;
  status: string;
};

function ManagePage() {
  const { data: clinic } = useSuspenseQuery(clinicQO);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [phase, setPhase] = useState<"mobile" | "otp" | "list">("mobile");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [devCode, setDevCode] = useState<string | null>(null);

  async function sendOtpFn() {
    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }
    setSending(true);
    try {
      const res = await sendOtp({ data: { mobile: mobile.trim() } });
      setDevCode(res.demoCode ?? null);
      setPhase("otp");
      toast.success("OTP sent (shown below for demo)");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSending(false);
    }
  }

  async function verifyOtpFn() {
    setVerifying(true);
    try {
      const res = await verifyOtp({ data: { mobile: mobile.trim(), code: otp } });
      if (!res.ok) {
        const msg =
          res.reason === "expired"
            ? "Code expired"
            : res.reason === "used"
              ? "Code already used"
              : "Invalid code";
        toast.error(msg);
        return;
      }
      setPhase("list");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setVerifying(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteNav clinicName={clinic.clinic_name} />
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Link to="/" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to home
        </Link>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">Manage your appointments</h1>
        <p className="mt-2 text-muted-foreground">
          Enter your mobile number to see and cancel your bookings.
        </p>

        <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
          {phase === "mobile" && (
            <div className="grid gap-4">
              <div>
                <Label htmlFor="m-mobile">Mobile number</Label>
                <Input
                  id="m-mobile"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  className="mt-1"
                  placeholder="10-digit mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                />
              </div>
              <Button onClick={sendOtpFn} disabled={sending} className="w-full gap-2">
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Phone className="h-4 w-4" />}
                Send OTP
              </Button>
            </div>
          )}

          {phase === "otp" && (
            <div className="grid gap-4">
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit code we sent to <span className="font-medium text-foreground">{mobile}</span>.
              </p>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {devCode && (
                <p className="rounded-lg bg-warning/15 px-3 py-2 text-center text-sm text-warning-foreground">
                  Demo mode — your OTP is <span className="font-mono font-semibold">{devCode}</span>
                </p>
              )}
              <Button onClick={verifyOtpFn} disabled={otp.length !== 6 || verifying} className="w-full gap-2">
                {verifying ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                Verify
              </Button>
              <Button variant="ghost" onClick={() => setPhase("mobile")}>
                Change number
              </Button>
            </div>
          )}

          {phase === "list" && <AppointmentList mobile={mobile.trim()} />}
        </div>
      </div>
    </div>
  );
}

function AppointmentList({ mobile }: { mobile: string }) {
  const q = useQuery({
    queryKey: ["mine", mobile],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select(
          "id, booking_code, patient_name, treatment_name, appointment_date, appointment_time, payment_method, payment_status, payment_amount, status",
        )
        .eq("patient_mobile", mobile)
        .order("appointment_date", { ascending: false })
        .order("appointment_time", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Appointment[];
    },
  });

  const [cancelling, setCancelling] = useState<string | null>(null);

  async function cancel(appt: Appointment) {
    const when = new Date(`${appt.appointment_date}T${appt.appointment_time}`);
    if (differenceInMinutes(when, new Date()) < 60) {
      toast.error("This appointment cannot be cancelled within one hour of the scheduled time. Please contact the clinic.");
      return;
    }
    setCancelling(appt.id);
    const { error } = await supabase.from("appointments").update({ status: "cancelled" }).eq("id", appt.id);
    setCancelling(null);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Appointment cancelled");
    q.refetch();
  }

  if (q.isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading your appointments…
      </div>
    );
  }

  if (!q.data || q.data.length === 0) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">No appointments found for this number.</p>
        <Link to="/book">
          <Button className="mt-4">Book an appointment</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {q.data.map((a) => {
        const isCancelled = a.status === "cancelled";
        return (
          <div key={a.id} className="rounded-2xl border border-border p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">{a.booking_code}</p>
                <p className="mt-1 font-medium">{a.treatment_name}</p>
                <p className="text-sm text-muted-foreground">
                  <Clock className="mr-1 inline h-3.5 w-3.5" />
                  {format(new Date(a.appointment_date + "T00:00:00"), "EEE, dd MMM yyyy")} · {labelSlot(a.appointment_time)}
                </p>
              </div>
              <StatusPill status={a.status} />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {a.payment_method === "online" ? "Paid online" : `Pay at clinic — ${a.payment_status === "paid_clinic" ? "Paid" : "Pending"}`}
              </span>
              {!isCancelled && a.status !== "completed" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => cancel(a)}
                  disabled={cancelling === a.id}
                  className="gap-1"
                >
                  {cancelling === a.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <X className="h-3.5 w-3.5" />}
                  Cancel
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    confirmed: { label: "Confirmed", className: "bg-primary-soft text-primary" },
    checked_in: { label: "Checked in", className: "bg-accent text-accent-foreground" },
    completed: { label: "Completed", className: "bg-success/15 text-success" },
    cancelled: { label: "Cancelled", className: "bg-destructive/10 text-destructive" },
    no_show: { label: "No-show", className: "bg-muted text-muted-foreground" },
  };
  const s = map[status] ?? map.confirmed;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${s.className}`}>
      {status === "completed" && <CheckCircle2 className="h-3 w-3" />}
      {s.label}
    </span>
  );
}
