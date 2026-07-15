import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, Building2, CalendarDays, CheckCircle2, CreditCard, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SiteNav } from "@/components/site-nav";
import { cn } from "@/lib/utils";

import { fetchClinic, fetchTreatments, formatMoney } from "@/lib/clinic";
import { labelSlot } from "@/lib/slots";
import { bookAppointment, getAvailableSlots } from "@/lib/booking.functions";

const clinicQO = queryOptions({ queryKey: ["clinic"], queryFn: fetchClinic });
const treatmentsQO = queryOptions({ queryKey: ["treatments"], queryFn: fetchTreatments });

const searchSchema = z.object({ treatment: z.string().optional() });

export const Route = createFileRoute("/book")({
  validateSearch: (s) => searchSchema.parse(s),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(clinicQO),
      context.queryClient.ensureQueryData(treatmentsQO),
    ]);
  },
  head: () => ({
    meta: [
      { title: "Book appointment — Meridian Family Clinic" },
      { name: "description", content: "Book your appointment in under a minute. No account needed." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BookPage,
});

type Values = {
  full_name: string;
  mobile: string;
  email: string;
  age: string;
  gender: string;
  treatment_id: string;
  date: Date | undefined;
  time: string;
  reason: string;
  payment_method: "clinic" | "online";
};

function BookPage() {
  const { data: clinic } = useSuspenseQuery(clinicQO);
  const { data: treatments } = useSuspenseQuery(treatmentsQO);
  const search = Route.useSearch();
  const navigate = useNavigate();
  const fetchSlots = useServerFn(getAvailableSlots);
  const createAppointment = useServerFn(bookAppointment);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [v, setV] = useState<Values>({
    full_name: "",
    mobile: "",
    email: "",
    age: "",
    gender: "",
    treatment_id: search.treatment ?? "",
    date: undefined,
    time: "",
    reason: "",
    payment_method: "clinic",
  });

  const set = <K extends keyof Values>(k: K, val: Values[K]) => setV((prev) => ({ ...prev, [k]: val }));

  const treatment = treatments.find((t) => t.id === v.treatment_id);
  const dateStr = v.date ? format(v.date, "yyyy-MM-dd") : "";

  const slotsQ = useQuery({
    queryKey: ["slots", dateStr],
    enabled: Boolean(dateStr),
    queryFn: () => fetchSlots({ data: { date: dateStr } }),
  });

  async function submit() {
    if (!v.date || !v.time || !treatment) return;
    setSubmitting(true);
    try {
      const mobile = v.mobile.trim();
      const appt = await createAppointment({
        data: {
          full_name: v.full_name.trim(),
          mobile,
          email: v.email.trim() || null,
          age: v.age ? Number(v.age) : null,
          gender: v.gender || null,
          treatment_id: treatment.id,
          appointment_date: dateStr,
          appointment_time: v.time,
          reason: v.reason.trim() || null,
          payment_method: v.payment_method,
        },
      });

      toast.success("Appointment booked!");
      navigate({ to: "/booking/$code", params: { code: appt.booking_code } });
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message ?? "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  const canNext = (() => {
    if (step === 0) {
      const parsed = z
        .object({
          full_name: z.string().trim().min(2),
          mobile: z.string().trim().regex(/^\d{10}$/, "Mobile must be exactly 10 digits"),
          email: z.string().trim().email().optional().or(z.literal("")),
          age: z.string().optional(),
          gender: z.string().optional(),
        })
        .safeParse(v);
      return parsed.success;
    }
    if (step === 1) return Boolean(v.treatment_id);
    if (step === 2) return Boolean(v.date && v.time);
    return true;
  })();

  return (
    <div className="min-h-screen bg-background">
      <SiteNav clinicName={clinic.clinic_name} />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Link to="/" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to home
        </Link>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">Book your appointment</h1>
        <p className="mt-2 text-muted-foreground">Takes about a minute. No account needed.</p>

        <Stepper step={step} steps={["Your details", "Treatment", "Date & time", "Payment"]} />

        <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required>
                <Input value={v.full_name} onChange={(e) => set("full_name", e.target.value)} />
              </Field>
              <Field label="Mobile number" required>
                <Input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit mobile"
                  value={v.mobile}
                  onChange={(e) => set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                />
              </Field>
              <Field label="Email (optional)">
                <Input type="email" value={v.email} onChange={(e) => set("email", e.target.value)} />
              </Field>
              <Field label="Age">
                <Input type="number" min={0} max={120} value={v.age} onChange={(e) => set("age", e.target.value)} />
              </Field>
              <Field label="Gender" className="sm:col-span-2">
                <Select value={v.gender} onValueChange={(val) => set("gender", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Prefer not to say" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer_not">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-3">
              {treatments.map((t) => (
                <label
                  key={t.id}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 transition-all",
                    v.treatment_id === t.id
                      ? "border-primary bg-primary-soft/60 ring-2 ring-primary/30"
                      : "border-border hover:border-primary/40",
                  )}
                >
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{t.duration_minutes} min</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-lg font-semibold">{formatMoney(t.fee)}</span>
                    <input
                      type="radio"
                      name="treatment"
                      className="accent-primary"
                      checked={v.treatment_id === t.id}
                      onChange={() => set("treatment_id", t.id)}
                    />
                  </div>
                </label>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-medium">Pick a date</p>
                <Calendar
                  mode="single"
                  selected={v.date}
                  onSelect={(d) => {
                    set("date", d);
                    set("time", "");
                  }}
                  disabled={(d) => d < new Date(new Date().toDateString())}
                  className={cn("pointer-events-auto rounded-2xl border border-border p-3")}
                />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Available slots</p>
                {!v.date && <p className="text-sm text-muted-foreground">Pick a date first.</p>}
                {v.date && slotsQ.isLoading && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading…
                  </div>
                )}
                {v.date && slotsQ.data && slotsQ.data.length === 0 && (
                  <p className="text-sm text-muted-foreground">No slots available for this day.</p>
                )}
                <div className="grid grid-cols-3 gap-2">
                  {slotsQ.data?.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => set("time", s)}
                      className={cn(
                        "rounded-lg border px-2 py-2 text-sm transition-all",
                        v.time === s
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      {labelSlot(s)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <Field label="Reason for visit (optional)">
                  <Textarea rows={3} value={v.reason} onChange={(e) => set("reason", e.target.value)} />
                </Field>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-4">
              <Summary
                clinicName={clinic.clinic_name}
                doctorName={clinic.doctor_name}
                treatment={treatment?.name ?? ""}
                fee={treatment?.fee ?? 0}
                date={v.date ? format(v.date, "EEE, dd MMM yyyy") : ""}
                time={v.time ? labelSlot(v.time) : ""}
              />
              <RadioGroup
                value={v.payment_method}
                onValueChange={(val) => set("payment_method", val as "clinic" | "online")}
                className="grid gap-3 sm:grid-cols-2"
              >
                <PayOption value="clinic" title="Pay at clinic" desc="Cash, card or UPI at reception." icon={<Building2 className="h-5 w-5" />} />
                <PayOption value="online" title="Pay online (demo)" desc="Simulated — Razorpay wiring pending." icon={<CreditCard className="h-5 w-5" />} />
              </RadioGroup>
              <p className="text-xs text-muted-foreground">
                By continuing you agree to receive appointment updates on your mobile.
              </p>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              Back
            </Button>
            {step < 3 ? (
              <Button type="button" onClick={() => setStep((s) => s + 1)} disabled={!canNext} className="gap-2">
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="button" onClick={submit} disabled={submitting} className="gap-2">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                Confirm booking
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label className="mb-1 block">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
    </div>
  );
}

function Stepper({ step, steps }: { step: number; steps: string[] }) {
  return (
    <ol className="mt-8 grid grid-cols-4 gap-2 text-xs">
      {steps.map((s, i) => (
        <li key={s} className="flex flex-col items-start gap-1">
          <span
            className={cn(
              "h-1 w-full rounded-full",
              i <= step ? "bg-primary" : "bg-muted",
            )}
          />
          <span className={cn("font-medium", i === step ? "text-foreground" : "text-muted-foreground")}>
            {i + 1}. {s}
          </span>
        </li>
      ))}
    </ol>
  );
}

function PayOption({
  value,
  title,
  desc,
  icon,
}: {
  value: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border p-4 hover:border-primary/40 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-soft/60 has-[[data-state=checked]]:ring-2 has-[[data-state=checked]]:ring-primary/30">
      <RadioGroupItem value={value} className="mt-1" />
      <div className="flex-1">
        <div className="flex items-center gap-2 font-medium">{icon} {title}</div>
        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      </div>
    </label>
  );
}

function Summary({
  clinicName,
  doctorName,
  treatment,
  fee,
  date,
  time,
}: {
  clinicName: string;
  doctorName: string;
  treatment: string;
  fee: number;
  date: string;
  time: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-muted/40 p-4 text-sm">
      <p className="font-medium">{clinicName} · {doctorName}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="h-4 w-4" /> {date} · {time}
        </div>
        <div className="text-muted-foreground">Treatment: {treatment}</div>
      </div>
      <div className="mt-3 flex items-center justify-between text-base">
        <span className="text-muted-foreground">Total</span>
        <span className="font-display text-lg font-semibold">{formatMoney(fee)}</span>
      </div>
    </div>
  );
}
