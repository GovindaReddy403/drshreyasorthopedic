import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  BadgeIndianRupee,
  CalendarCheck,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  RotateCw,
  Search,
  StickyNote,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DashboardShell } from "@/components/dashboard-shell";
import { supabase } from "@/integrations/supabase/client";
import { labelSlot } from "@/lib/slots";
import { formatMoney } from "@/lib/clinic";

export const Route = createFileRoute("/_authenticated/doctor")({
  beforeLoad: ({ context }) => {
    if (!context.roles?.includes("doctor")) throw redirect({ to: "/reception" });
  },
  component: DoctorDashboard,
});

type Appt = {
  id: string;
  booking_code: string;
  patient_id: string;
  patient_name: string;
  patient_mobile: string;
  treatment_name: string | null;
  appointment_date: string;
  appointment_time: string;
  status: string;
  payment_method: string;
  payment_status: string;
  payment_amount: number | null;
  reason: string | null;
};

type Filter = "today" | "upcoming" | "completed" | "follow_up" | "cancelled" | "all";

function DoctorDashboard() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("today");
  const [notesFor, setNotesFor] = useState<Appt | null>(null);

  const listQ = useQuery({
    queryKey: ["doctor-appts", filter, q],
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
          a.patient_mobile.toLowerCase().includes(s) ||
          (a.treatment_name ?? "").toLowerCase().includes(s),
      );
    },
  });

  const statsQ = useQuery({
    queryKey: ["doctor-stats"],
    queryFn: async () => {
      const today = format(new Date(), "yyyy-MM-dd");
      const [t, u, c, f, x, p, r] = await Promise.all([
        supabase.from("appointments").select("id", { count: "exact", head: true }).eq("appointment_date", today),
        supabase.from("appointments").select("id", { count: "exact", head: true }).gt("appointment_date", today).in("status", ["confirmed", "checked_in"]),
        supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "completed"),
        supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "follow_up"),
        supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "cancelled"),
        supabase.from("appointments").select("id", { count: "exact", head: true }).eq("payment_status", "pending"),
        supabase.from("appointments").select("payment_amount").eq("appointment_date", today).in("payment_status", ["paid_online", "paid_clinic"]),
      ]);
      const revenue = (r.data ?? []).reduce((s, a) => s + Number(a.payment_amount ?? 0), 0);
      return {
        today: t.count ?? 0,
        upcoming: u.count ?? 0,
        completed: c.count ?? 0,
        followUp: f.count ?? 0,
        cancelled: x.count ?? 0,
        pending: p.count ?? 0,
        revenue,
      };
    },
  });

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Updated");
      qc.invalidateQueries();
    }
  }

  async function markPaid(id: string) {
    const { error } = await supabase
      .from("appointments")
      .update({ payment_status: "paid_clinic", payment_paid_at: new Date().toISOString() })
      .eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Payment recorded");
      qc.invalidateQueries();
    }
  }

  return (
    <DashboardShell title="Doctor dashboard" subtitle="Appointments at a glance">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        <Stat icon={<CalendarCheck className="h-4 w-4" />} label="Today" value={statsQ.data?.today ?? 0} tone="primary" />
        <Stat icon={<Clock className="h-4 w-4" />} label="Upcoming" value={statsQ.data?.upcoming ?? 0} tone="accent" />
        <Stat icon={<CheckCircle2 className="h-4 w-4" />} label="Completed" value={statsQ.data?.completed ?? 0} tone="success" />
        <Stat icon={<RotateCw className="h-4 w-4" />} label="Follow-ups" value={statsQ.data?.followUp ?? 0} tone="warning" />
        <Stat icon={<XCircle className="h-4 w-4" />} label="Cancelled" value={statsQ.data?.cancelled ?? 0} tone="destructive" />
        <Stat icon={<FileText className="h-4 w-4" />} label="Payments due" value={statsQ.data?.pending ?? 0} />
        <Stat icon={<BadgeIndianRupee className="h-4 w-4" />} label="Today's revenue" value={formatMoney(statsQ.data?.revenue ?? 0)} />
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] sm:p-6">
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
            <TabsContent value={filter} />
          </Tabs>
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search name, mobile, code…" className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>

        <div className="mt-4 divide-y divide-border">
          {listQ.isLoading && (
            <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading…
            </div>
          )}
          {listQ.data?.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">No appointments match.</p>
          )}
          {listQ.data?.map((a) => (
            <div key={a.id} className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">{a.booking_code}</span>
                  <StatusPill status={a.status} />
                </div>
                <p className="mt-1 font-medium">{a.patient_name} · {a.patient_mobile}</p>
                <p className="text-sm text-muted-foreground">
                  {a.treatment_name} · {format(new Date(a.appointment_date + "T00:00:00"), "dd MMM yyyy")} · {labelSlot(a.appointment_time)}
                </p>
                {a.reason && <p className="mt-1 text-xs text-muted-foreground">Reason: {a.reason}</p>}
              </div>
              <div className="flex flex-wrap gap-2">
                {a.status === "confirmed" && (
                  <Button size="sm" variant="outline" onClick={() => updateStatus(a.id, "checked_in")}>
                    Check-in
                  </Button>
                )}
                {a.status !== "completed" && a.status !== "cancelled" && a.status !== "follow_up" && (
                  <Button size="sm" onClick={() => updateStatus(a.id, "completed")}>Mark complete</Button>
                )}
                {a.status !== "cancelled" && a.status !== "follow_up" && (
                  <Button size="sm" variant="outline" onClick={() => updateStatus(a.id, "follow_up")} className="gap-1">
                    <RotateCw className="h-3.5 w-3.5" /> Follow-up
                  </Button>
                )}
                {a.payment_status === "pending" && (
                  <Button size="sm" variant="outline" onClick={() => markPaid(a.id)}>Mark paid</Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => setNotesFor(a)} className="gap-1">
                  <StickyNote className="h-3.5 w-3.5" /> Notes
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <NotesDialog appt={notesFor} onClose={() => setNotesFor(null)} />
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

function NotesDialog({ appt, onClose }: { appt: Appt | null; onClose: () => void }) {
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const notesQ = useQuery({
    queryKey: ["notes", appt?.id],
    enabled: Boolean(appt?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("doctor_notes")
        .select("id, notes, created_at")
        .eq("appointment_id", appt!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  async function save() {
    if (!appt || !note.trim()) return;
    setSaving(true);
    const { data: u } = await supabase.auth.getUser();
    const { error } = await supabase.from("doctor_notes").insert({
      appointment_id: appt.id,
      patient_id: appt.patient_id,
      notes: note.trim(),
      created_by: u.user?.id,
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    setNote("");
    toast.success("Note saved");
    notesQ.refetch();
  }

  return (
    <Dialog open={Boolean(appt)} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Consultation notes · {appt?.patient_name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Textarea rows={4} placeholder="Add notes…" value={note} onChange={(e) => setNote(e.target.value)} />
          <Button onClick={save} disabled={saving || !note.trim()}>
            {saving ? "Saving…" : "Save note"}
          </Button>
          <div className="max-h-64 space-y-2 overflow-y-auto">
            {notesQ.data?.map((n) => (
              <div key={n.id} className="rounded-lg border border-border p-3 text-sm">
                <p className="text-xs text-muted-foreground">{format(new Date(n.created_at), "dd MMM yyyy, HH:mm")}</p>
                <p className="mt-1 whitespace-pre-line">{n.notes}</p>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
