import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, CalendarDays, Clock, MapPin, Phone, Printer, Stethoscope } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { fetchClinic, formatMoney } from "@/lib/clinic";
import { labelSlot } from "@/lib/slots";
import { format } from "date-fns";

export const Route = createFileRoute("/booking/$code")({
  loader: async ({ params }) => {
    const [{ data: appt, error }, clinic] = await Promise.all([
      supabase
        .from("appointments")
        .select(
          "booking_code, patient_name, patient_mobile, treatment_name, appointment_date, appointment_time, payment_method, payment_status, payment_amount, status",
        )
        .eq("booking_code", params.code)
        .maybeSingle(),
      fetchClinic(),
    ]);
    if (error) throw error;
    if (!appt) throw notFound();
    return { appt, clinic };
  },
  head: () => ({
    meta: [
      { title: "Booking confirmed" },
      { name: "robots", content: "noindex" },
    ],
  }),
  errorComponent: ({ error }) => (
    <div className="p-10 text-center">
      <p>Couldn't load your booking. {error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="p-10 text-center">
      <p>Booking not found.</p>
      <Link to="/" className="text-primary underline">Home</Link>
    </div>
  ),
  component: Confirmation,
});

function Confirmation() {
  const { appt, clinic } = Route.useLoaderData();
  const dateStr = format(new Date(appt.appointment_date + "T00:00:00"), "EEE, dd MMM yyyy");

  return (
    <div className="min-h-screen bg-hero-gradient">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-10">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <h1 className="mt-4 font-display text-3xl font-semibold">You're confirmed!</h1>
            <p className="mt-2 text-muted-foreground">
              We've saved your appointment. Please arrive 5 minutes early.
            </p>
            <div className="mt-4 rounded-full border border-primary/20 bg-primary-soft px-4 py-1 text-sm font-semibold text-primary">
              Booking ID · {appt.booking_code}
            </div>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <Row icon={<Stethoscope className="h-4 w-4" />} label="Clinic" value={`${clinic.clinic_name} · ${clinic.doctor_name}`} />
            <Row icon={<CalendarDays className="h-4 w-4" />} label="Date" value={dateStr} />
            <Row icon={<Clock className="h-4 w-4" />} label="Time" value={labelSlot(appt.appointment_time)} />
            <Row icon={<Stethoscope className="h-4 w-4" />} label="Treatment" value={appt.treatment_name ?? "General"} />
            <Row
              icon={<CalendarDays className="h-4 w-4" />}
              label="Payment"
              value={`${appt.payment_method === "online" ? "Paid online" : "Pay at clinic"} · ${formatMoney(appt.payment_amount)}`}
            />
            <Row icon={<Phone className="h-4 w-4" />} label="Patient" value={`${appt.patient_name} · ${appt.patient_mobile}`} />
          </dl>

          {clinic.address && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-muted/40 p-4">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">{clinic.clinic_name}</p>
                <p className="text-sm text-muted-foreground">{clinic.address}</p>
              </div>
              {clinic.google_maps_url && (
                <a href={clinic.google_maps_url} target="_blank" rel="noreferrer">
                  <Button size="sm" variant="outline">Directions</Button>
                </a>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button onClick={() => window.print()} variant="outline" className="gap-2">
              <Printer className="h-4 w-4" /> Print
            </Button>
            <Link to="/manage">
              <Button variant="outline">Manage appointment</Button>
            </Link>
            <Link to="/">
              <Button>Back home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-4">
      <dt className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}
