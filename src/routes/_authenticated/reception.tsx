import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Loader2,
  RotateCw,
  Search,
  UserCheck,
  XCircle,
  BadgeIndianRupee,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DashboardShell } from "@/components/dashboard-shell";
import { AppointmentsReport } from "@/components/appointments-report";
import { PaymentEditDialog, type PaymentEditTarget } from "@/components/payment-edit-dialog";
import { ContactQR } from "@/components/contact-qr";
import { supabase } from "@/integrations/supabase/client";
import { labelSlot } from "@/lib/slots";
import { fetchClinic, formatMoney } from "@/lib/clinic";

export const Route = createFileRoute("/_authenticated/reception")({
  beforeLoad: ({ context }) => {
    if (!context.roles?.includes("receptionist") && !context.roles?.includes("doctor")) {
      throw redirect({ to: "/auth" });
    }
  },
  component: ReceptionDashboard,
});

type Appt = {
  id: string;
  booking_code: string;
  patient_name: string;
  patient_mobile: string;
  treatment_name: string | null;
  appointment_date: string;
  appointment_time: string;
  status: string;
  payment_method: string;
  payment_status: string;
  payment_amount: number | null;
};

type Filter = "today" | "upcoming" | "completed" | "follow_up" | "cancelled" | "all";

function ReceptionDashboard() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("today");
  const [tab, setTab] = useState<"list" | "report">("list");
  const [payEdit, setPayEdit] = useState<PaymentEditTarget | null>(null);

  const listQ = useQuery({
    queryKey: ["recep-appts", filter, q],
    queryFn: async () => {
      const today = format(new Date(), "yyyy-MM-dd");
      let query = supabase.from("appointments").select("*");
      if (filter === "today") query = query.eq("appointment_date", today);
      else if (filter === "upcoming")
        query = query.gt("appointment_date", today).in("status", ["confirmed", "checked_in"]);
      else if (filter === "completed") query = query.eq("status", "completed");
      else if (filter === "follow_up") query = query.eq("status", "follow_up");
      else if (filter === "cancelled") query = query.eq("status", "cancelled");
      const { data, error } = await query
        .order("appointment_date", { ascending: false })
        .order("appointment_time", { ascending: true })
        .limit(200);
      if (error) throw error;
      const list = (data ?? []) as Appt[];
      if (!q) return list;
      const s = q.toLowerCase();
      return list.filter(
        (a) =>
          a.booking_code.toLowerCase().includes(s) ||
          a.patient_name.toLowerCase().includes(s) ||
          a.patient_mobile.toLowerCase().includes(s),
      );
    },
  });

  const stats = useQuery({
    queryKey: ["recep-stats"],
    queryFn: async () => {
      const today = format(new Date(), "yyyy-MM-dd");
      const [t, ci, comp, f, u, x, p, r] = await Promise.all([
        supabase.from("appointments").select("id", { count: "exact", head: true }).eq("appointment_date", today),
        supabase.from("appointments").select("id", { count: "exact", head: true }).eq("appointment_date", today).eq("status", "checked_in"),
        supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "completed"),
        supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "follow_up"),
        supabase.from("appointments").select("id", { count: "exact", head: true }).gt("appointment_date", today).in("status", ["confirmed", "checked_in"]),
        supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "cancelled"),
        supabase.from("appointments").select("id", { count: "exact", head: true }).eq("payment_status", "pending"),
        supabase.from("appointments").select("payment_amount").eq("appointment_date", today).in("payment_status", ["paid_online", "paid_clinic"]),
      ]);
      const revenue = (r.data ?? []).reduce((s, a) => s + Number(a.payment_amount ?? 0), 0);
      return {
        today: t.count ?? 0,
        checkedIn: ci.count ?? 0,
        completed: comp.count ?? 0,
        followUp: f.count ?? 0,
        upcoming: u.count ?? 0,
        cancelled: x.count ?? 0,
        pending: p.count ?? 0,
        revenue,
      };
    },
  });

  async function checkIn(id: string) {
    const { error } = await supabase.from("appointments").update({ status: "checked_in" }).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Patient checked in"); qc.invalidateQueries(); }
  }
  async function cancel(id: string) {
    if (!confirm("Cancel this appointment?")) return;
    const { error } = await supabase.from("appointments").update({ status: "cancelled" }).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Cancelled"); qc.invalidateQueries(); }
  }

  return (
    <DashboardShell
      title="Reception"
      subtitle="Check patients in, take payments, and handle bookings"
      navExtra={
        <Link to="/book">
          <Button size="sm" variant="outline">New booking</Button>
        </Link>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
        <Stat icon={<CalendarCheck className="h-4 w-4" />} label="Today" value={stats.data?.today ?? 0} tone="primary" />
        <Stat icon={<UserCheck className="h-4 w-4" />} label="Checked-in" value={stats.data?.checkedIn ?? 0} tone="accent" />
        <Stat icon={<Clock className="h-4 w-4" />} label="Upcoming" value={stats.data?.upcoming ?? 0} />
        <Stat icon={<CheckCircle2 className="h-4 w-4" />} label="Completed" value={stats.data?.completed ?? 0} tone="success" />
        <Stat icon={<RotateCw className="h-4 w-4" />} label="Follow-ups" value={stats.data?.followUp ?? 0} tone="warning" />
        <Stat icon={<XCircle className="h-4 w-4" />} label="Cancelled" value={stats.data?.cancelled ?? 0} tone="destructive" />
        <Stat icon={<BadgeIndianRupee className="h-4 w-4" />} label="Payments due" value={stats.data?.pending ?? 0} />
        <Stat icon={<BadgeIndianRupee className="h-4 w-4" />} label="Today's revenue" value={formatMoney(stats.data?.revenue ?? 0)} />
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as "list" | "report")} className="mt-8">
        <TabsList>
          <TabsTrigger value="list">Appointments</TabsTrigger>
          <TabsTrigger value="report">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <div className="rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
                <TabsList>
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="follow_up">Follow-up</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="relative w-full max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search…" className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
              </div>
            </div>

            <div className="mt-4 divide-y divide-border">
              {listQ.isLoading && (
                <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading…
                </div>
              )}
              {listQ.data?.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">Nothing here.</p>}
              {listQ.data?.map((a) => (
                <div key={a.id} className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-widest text-primary">{a.booking_code}</span>
                      <StatusPill status={a.status} />
                      <span className="text-xs text-muted-foreground">
                        {a.payment_method === "online" ? "Paid online" : a.payment_status === "paid_clinic" ? "Paid at clinic" : "Payment pending"}
                      </span>
                    </div>
                    <p className="mt-1 font-medium">{a.patient_name} · {a.patient_mobile}</p>
                    <p className="text-sm text-muted-foreground">
                      {a.treatment_name} · {format(new Date(a.appointment_date + "T00:00:00"), "dd MMM yyyy")} · {labelSlot(a.appointment_time)} · {formatMoney(a.payment_amount)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {a.status === "confirmed" && (
                      <Button size="sm" onClick={() => checkIn(a.id)} className="gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Check-in
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => setPayEdit(a)} className="gap-1">
                      <Pencil className="h-3.5 w-3.5" /> Payment
                    </Button>
                    {a.status !== "cancelled" && a.status !== "completed" && (
                      <Button size="sm" variant="ghost" onClick={() => cancel(a.id)}>Cancel</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="report" className="mt-4">
          <AppointmentsReport />
        </TabsContent>
      </Tabs>

      <PaymentEditDialog appt={payEdit} onClose={() => setPayEdit(null)} />
    </DashboardShell>
  );
}

function Stat({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  tone?: "primary" | "accent" | "success" | "warning" | "destructive";
}) {
  const toneMap: Record<string, string> = {
    primary: "bg-primary-soft text-primary",
    accent: "bg-accent text-accent-foreground",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    destructive: "bg-destructive/10 text-destructive",
  };
  const chip = tone ? toneMap[tone] : "bg-muted text-muted-foreground";
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-2">
          <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${chip}`}>{icon}</span>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
        </div>
        <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    confirmed: "bg-primary-soft text-primary",
    checked_in: "bg-accent text-accent-foreground",
    completed: "bg-success/15 text-success",
    follow_up: "bg-warning/15 text-warning",
    cancelled: "bg-destructive/10 text-destructive",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${map[status] ?? "bg-muted"}`}>
      {status.replace("_", " ")}
    </span>
  );
}
