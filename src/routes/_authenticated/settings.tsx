import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Save, CalendarX } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DashboardShell } from "@/components/dashboard-shell";
import { supabase } from "@/integrations/supabase/client";
import { WEEKDAY_LABELS } from "@/lib/clinic";

export const Route = createFileRoute("/_authenticated/settings")({
  beforeLoad: ({ context }) => {
    if (!context.roles?.includes("doctor")) throw redirect({ to: "/reception" });
  },
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <DashboardShell
      title="Clinic settings"
      subtitle="Manage treatments, availability, cancellations and social links"
    >
      <Tabs defaultValue="treatments" className="w-full">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="treatments">Treatments</TabsTrigger>
          <TabsTrigger value="hours">Availability</TabsTrigger>
          <TabsTrigger value="blocked">Cancellations</TabsTrigger>
          <TabsTrigger value="testimonials">Reviews</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="social">Contact &amp; social</TabsTrigger>
        </TabsList>
        <TabsContent value="treatments" className="mt-6"><TreatmentsPanel /></TabsContent>
        <TabsContent value="hours" className="mt-6"><HoursPanel /></TabsContent>
        <TabsContent value="blocked" className="mt-6"><BlockedPanel /></TabsContent>
        <TabsContent value="testimonials" className="mt-6"><TestimonialsPanel /></TabsContent>
        <TabsContent value="gallery" className="mt-6"><GalleryPanel /></TabsContent>
        <TabsContent value="social" className="mt-6"><SocialPanel /></TabsContent>
      </Tabs>
    </DashboardShell>
  );
}

/* --- Treatments --- */
function TreatmentsPanel() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["settings-treatments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("treatments").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

  async function saveRow(row: any) {
    const { error } = await supabase.from("treatments").update({
      name: row.name,
      description: row.description,
      fee: Number(row.fee) || 0,
      duration_minutes: Number(row.duration_minutes) || 15,
      is_active: !!row.is_active,
      sort_order: Number(row.sort_order) || 0,
    }).eq("id", row.id);
    if (error) toast.error(error.message); else { toast.success("Saved"); qc.invalidateQueries({ queryKey: ["settings-treatments"] }); qc.invalidateQueries({ queryKey: ["treatments"] }); }
  }
  async function removeRow(id: string) {
    if (!confirm("Delete this treatment?")) return;
    const { error } = await supabase.from("treatments").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["settings-treatments"] }); qc.invalidateQueries({ queryKey: ["treatments"] }); }
  }
  async function addRow() {
    const { error } = await supabase.from("treatments").insert({
      name: "New treatment", description: "", fee: 0, duration_minutes: 15, is_active: true, sort_order: (q.data?.length ?? 0) + 1,
    });
    if (error) toast.error(error.message); else { toast.success("Added"); qc.invalidateQueries({ queryKey: ["settings-treatments"] }); qc.invalidateQueries({ queryKey: ["treatments"] }); }
  }

  if (q.isLoading) return <Loader2 className="h-5 w-5 animate-spin" />;
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" onClick={addRow} className="gap-1"><Plus className="h-4 w-4" /> Add treatment</Button>
      </div>
      {q.data?.map((t) => <TreatmentRow key={t.id} row={t} onSave={saveRow} onDelete={removeRow} />)}
    </div>
  );
}

function TreatmentRow({ row, onSave, onDelete }: { row: any; onSave: (r: any) => void; onDelete: (id: string) => void }) {
  const [r, setR] = useState(row);
  useEffect(() => setR(row), [row]);
  return (
    <Card>
      <CardContent className="grid gap-3 p-5 md:grid-cols-[2fr_1fr_1fr_auto]">
        <div className="space-y-2">
          <Input value={r.name ?? ""} onChange={(e) => setR({ ...r, name: e.target.value })} placeholder="Name" />
          <Textarea rows={2} value={r.description ?? ""} onChange={(e) => setR({ ...r, description: e.target.value })} placeholder="Short description" />
        </div>
        <div>
          <Label className="text-xs">Fee (₹)</Label>
          <Input type="number" value={r.fee ?? 0} onChange={(e) => setR({ ...r, fee: e.target.value })} />
        </div>
        <div>
          <Label className="text-xs">Duration (min)</Label>
          <Input type="number" value={r.duration_minutes ?? 15} onChange={(e) => setR({ ...r, duration_minutes: e.target.value })} />
          <div className="mt-2 flex items-center gap-2">
            <Switch checked={!!r.is_active} onCheckedChange={(v) => setR({ ...r, is_active: v })} />
            <span className="text-xs text-muted-foreground">Active</span>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2">
          <Button size="sm" onClick={() => onSave(r)} className="gap-1"><Save className="h-3.5 w-3.5" /> Save</Button>
          <Button size="sm" variant="outline" onClick={() => onDelete(r.id)} className="gap-1"><Trash2 className="h-3.5 w-3.5" /> Delete</Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* --- Hours --- */
function HoursPanel() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["settings-hours"],
    queryFn: async () => {
      const { data, error } = await supabase.from("working_hours").select("*").order("weekday");
      if (error) throw error;
      return data ?? [];
    },
  });

  async function save(row: any) {
    const { error } = await supabase.from("working_hours").update({
      is_open: !!row.is_open,
      morning_start: row.morning_start || null,
      morning_end: row.morning_end || null,
      evening_start: row.evening_start || null,
      evening_end: row.evening_end || null,
    }).eq("weekday", row.weekday);
    if (error) toast.error(error.message); else { toast.success(`${WEEKDAY_LABELS[row.weekday]} updated`); qc.invalidateQueries({ queryKey: ["settings-hours"] }); qc.invalidateQueries({ queryKey: ["hours"] }); }
  }

  if (q.isLoading) return <Loader2 className="h-5 w-5 animate-spin" />;
  return (
    <div className="space-y-3">
      {q.data?.map((h) => <HourRow key={h.weekday} row={h} onSave={save} />)}
    </div>
  );
}

function HourRow({ row, onSave }: { row: any; onSave: (r: any) => void }) {
  const [r, setR] = useState(row);
  useEffect(() => setR(row), [row]);
  return (
    <Card>
      <CardContent className="grid gap-3 p-5 md:grid-cols-[140px_auto_1fr_1fr_auto] md:items-end">
        <div>
          <p className="font-medium">{WEEKDAY_LABELS[r.weekday]}</p>
          <div className="mt-1 flex items-center gap-2">
            <Switch checked={!!r.is_open} onCheckedChange={(v) => setR({ ...r, is_open: v })} />
            <span className="text-xs text-muted-foreground">{r.is_open ? "Open" : "Closed"}</span>
          </div>
        </div>
        <div />
        <div>
          <Label className="text-xs">Morning</Label>
          <div className="flex gap-2">
            <Input type="time" value={r.morning_start ?? ""} onChange={(e) => setR({ ...r, morning_start: e.target.value })} />
            <Input type="time" value={r.morning_end ?? ""} onChange={(e) => setR({ ...r, morning_end: e.target.value })} />
          </div>
        </div>
        <div>
          <Label className="text-xs">Evening</Label>
          <div className="flex gap-2">
            <Input type="time" value={r.evening_start ?? ""} onChange={(e) => setR({ ...r, evening_start: e.target.value })} />
            <Input type="time" value={r.evening_end ?? ""} onChange={(e) => setR({ ...r, evening_end: e.target.value })} />
          </div>
        </div>
        <Button size="sm" onClick={() => onSave(r)} className="gap-1"><Save className="h-3.5 w-3.5" /> Save</Button>
      </CardContent>
    </Card>
  );
}

/* --- Blocked dates --- */
function BlockedPanel() {
  const qc = useQueryClient();
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const q = useQuery({
    queryKey: ["settings-blocked"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blocked_dates").select("*").order("blocked_date", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
  async function add() {
    if (!date) return toast.error("Pick a date");
    const { error } = await supabase.from("blocked_dates").insert({ blocked_date: date, reason });
    if (error) toast.error(error.message);
    else { toast.success("Date blocked"); setDate(""); setReason(""); qc.invalidateQueries({ queryKey: ["settings-blocked"] }); }
  }
  async function remove(id: string) {
    const { error } = await supabase.from("blocked_dates").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Removed"); qc.invalidateQueries({ queryKey: ["settings-blocked"] }); }
  }
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="grid gap-3 p-5 md:grid-cols-[auto_1fr_auto] md:items-end">
          <div>
            <Label className="text-xs">Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <Label className="text-xs">Reason (optional)</Label>
            <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Public holiday, conference…" />
          </div>
          <Button onClick={add} className="gap-1"><CalendarX className="h-4 w-4" /> Block day</Button>
        </CardContent>
      </Card>
      {q.data?.length === 0 && <p className="text-sm text-muted-foreground">No blocked dates.</p>}
      <div className="space-y-2">
        {q.data?.map((b) => (
          <div key={b.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
            <div>
              <p className="font-medium">{format(new Date(b.blocked_date + "T00:00:00"), "EEEE, dd MMM yyyy")}</p>
              {b.reason && <p className="text-xs text-muted-foreground">{b.reason}</p>}
            </div>
            <Button size="sm" variant="outline" onClick={() => remove(b.id)} className="gap-1">
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Testimonials / Reviews --- */
function TestimonialsPanel() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["settings-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  async function add() {
    const { error } = await supabase.from("testimonials").insert({
      patient_name: "New patient",
      content: "Great experience at the clinic.",
      rating: 5,
      is_published: true,
    });
    if (error) toast.error(error.message);
    else { toast.success("Added"); qc.invalidateQueries({ queryKey: ["settings-testimonials"] }); qc.invalidateQueries({ queryKey: ["testimonials"] }); }
  }
  async function save(row: any) {
    const { error } = await supabase.from("testimonials").update({
      patient_name: row.patient_name,
      content: row.content,
      rating: Number(row.rating) || 5,
      is_published: !!row.is_published,
    }).eq("id", row.id);
    if (error) toast.error(error.message);
    else { toast.success("Saved"); qc.invalidateQueries({ queryKey: ["settings-testimonials"] }); qc.invalidateQueries({ queryKey: ["testimonials"] }); }
  }
  async function remove(id: string) {
    if (!confirm("Delete this review?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["settings-testimonials"] }); qc.invalidateQueries({ queryKey: ["testimonials"] }); }
  }

  if (q.isLoading) return <Loader2 className="h-5 w-5 animate-spin" />;
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" onClick={add} className="gap-1"><Plus className="h-4 w-4" /> Add review</Button>
      </div>
      {q.data?.length === 0 && <p className="text-sm text-muted-foreground">No reviews yet.</p>}
      {q.data?.map((t) => <TestimonialRow key={t.id} row={t} onSave={save} onDelete={remove} />)}
    </div>
  );
}

function TestimonialRow({ row, onSave, onDelete }: { row: any; onSave: (r: any) => void; onDelete: (id: string) => void }) {
  const [r, setR] = useState(row);
  useEffect(() => setR(row), [row]);
  return (
    <Card>
      <CardContent className="grid gap-3 p-5 md:grid-cols-[2fr_auto_auto]">
        <div className="space-y-2">
          <Input value={r.patient_name ?? ""} onChange={(e) => setR({ ...r, patient_name: e.target.value })} placeholder="Patient name" />
          <Textarea rows={3} value={r.content ?? ""} onChange={(e) => setR({ ...r, content: e.target.value })} placeholder="Review text" />
        </div>
        <div>
          <Label className="text-xs">Rating (1–5)</Label>
          <Input type="number" min={1} max={5} value={r.rating ?? 5} onChange={(e) => setR({ ...r, rating: e.target.value })} />
          <div className="mt-2 flex items-center gap-2">
            <Switch checked={!!r.is_published} onCheckedChange={(v) => setR({ ...r, is_published: v })} />
            <span className="text-xs text-muted-foreground">Published</span>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2">
          <Button size="sm" onClick={() => onSave(r)} className="gap-1"><Save className="h-3.5 w-3.5" /> Save</Button>
          <Button size="sm" variant="outline" onClick={() => onDelete(r.id)} className="gap-1"><Trash2 className="h-3.5 w-3.5" /> Delete</Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* --- Social & contact --- */
function SocialPanel() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["settings-clinic"],
    queryFn: async () => {
      const { data, error } = await supabase.from("clinic_settings").select("*").eq("id", 1).maybeSingle();
      if (error) throw error;
      return data as any;
    },
  });
  const [f, setF] = useState<any>({});
  useEffect(() => { if (q.data) setF(q.data); }, [q.data]);

  async function save() {
    const { error } = await supabase.from("clinic_settings").update({
      phone: f.phone, whatsapp: f.whatsapp, email: f.email, address: f.address,
      google_maps_url: f.google_maps_url,
      instagram_url: f.instagram_url, facebook_url: f.facebook_url,
      youtube_url: f.youtube_url, twitter_url: f.twitter_url, linkedin_url: f.linkedin_url,
    }).eq("id", 1);
    if (error) toast.error(error.message);
    else { toast.success("Saved"); qc.invalidateQueries({ queryKey: ["settings-clinic"] }); qc.invalidateQueries({ queryKey: ["clinic"] }); }
  }

  if (q.isLoading) return <Loader2 className="h-5 w-5 animate-spin" />;
  return (
    <Card>
      <CardContent className="grid gap-4 p-6 md:grid-cols-2">
        <Field label="Phone"><Input value={f.phone ?? ""} onChange={(e) => setF({ ...f, phone: e.target.value })} /></Field>
        <Field label="WhatsApp"><Input value={f.whatsapp ?? ""} onChange={(e) => setF({ ...f, whatsapp: e.target.value })} /></Field>
        <Field label="Email"><Input value={f.email ?? ""} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
        <Field label="Google Maps URL"><Input value={f.google_maps_url ?? ""} onChange={(e) => setF({ ...f, google_maps_url: e.target.value })} /></Field>
        <Field label="Address" full><Textarea rows={2} value={f.address ?? ""} onChange={(e) => setF({ ...f, address: e.target.value })} /></Field>
        <Field label="Instagram"><Input value={f.instagram_url ?? ""} onChange={(e) => setF({ ...f, instagram_url: e.target.value })} placeholder="https://instagram.com/…" /></Field>
        <Field label="Facebook"><Input value={f.facebook_url ?? ""} onChange={(e) => setF({ ...f, facebook_url: e.target.value })} placeholder="https://facebook.com/…" /></Field>
        <Field label="YouTube"><Input value={f.youtube_url ?? ""} onChange={(e) => setF({ ...f, youtube_url: e.target.value })} placeholder="https://youtube.com/…" /></Field>
        <Field label="X / Twitter"><Input value={f.twitter_url ?? ""} onChange={(e) => setF({ ...f, twitter_url: e.target.value })} placeholder="https://x.com/…" /></Field>
        <Field label="LinkedIn"><Input value={f.linkedin_url ?? ""} onChange={(e) => setF({ ...f, linkedin_url: e.target.value })} placeholder="https://linkedin.com/…" /></Field>
        <div className="md:col-span-2 flex justify-end">
          <Button onClick={save} className="gap-1"><Save className="h-4 w-4" /> Save changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <Label className="mb-1 block text-xs">{label}</Label>
      {children}
    </div>
  );
}
