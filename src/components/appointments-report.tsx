import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, subDays, startOfDay, parseISO } from "date-fns";
import { Download, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { formatMoney } from "@/lib/clinic";
import { labelSlot } from "@/lib/slots";

type Row = {
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

export function AppointmentsReport() {
  const [days, setDays] = useState<string>("30");

  const q = useQuery({
    queryKey: ["report-appts", days],
    queryFn: async () => {
      const from = format(subDays(startOfDay(new Date()), Number(days) - 1), "yyyy-MM-dd");
      const { data, error } = await supabase
        .from("appointments")
        .select(
          "booking_code, patient_name, patient_mobile, treatment_name, appointment_date, appointment_time, status, payment_method, payment_status, payment_amount",
        )
        .gte("appointment_date", from)
        .order("appointment_date", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

  const trend = useMemo(() => {
    const map = new Map<string, { date: string; appointments: number; completed: number; cancelled: number; revenue: number }>();
    const n = Number(days);
    for (let i = n - 1; i >= 0; i--) {
      const d = format(subDays(startOfDay(new Date()), i), "yyyy-MM-dd");
      map.set(d, { date: d, appointments: 0, completed: 0, cancelled: 0, revenue: 0 });
    }
    (q.data ?? []).forEach((r) => {
      const e = map.get(r.appointment_date);
      if (!e) return;
      e.appointments += 1;
      if (r.status === "completed") e.completed += 1;
      if (r.status === "cancelled") e.cancelled += 1;
      if (r.payment_status === "paid_online" || r.payment_status === "paid_clinic") {
        e.revenue += Number(r.payment_amount ?? 0);
      }
    });
    return [...map.values()].map((e) => ({
      ...e,
      label: format(parseISO(e.date), "dd MMM"),
    }));
  }, [q.data, days]);

  const totals = useMemo(() => {
    const list = q.data ?? [];
    return {
      total: list.length,
      completed: list.filter((r) => r.status === "completed").length,
      cancelled: list.filter((r) => r.status === "cancelled").length,
      revenue: list
        .filter((r) => r.payment_status === "paid_online" || r.payment_status === "paid_clinic")
        .reduce((s, r) => s + Number(r.payment_amount ?? 0), 0),
    };
  }, [q.data]);

  function downloadExcel() {
    const list = q.data ?? [];
    const rows = list.map((r) => ({
      "Booking code": r.booking_code,
      Patient: r.patient_name,
      Mobile: r.patient_mobile,
      Treatment: r.treatment_name ?? "",
      Date: r.appointment_date,
      Time: labelSlot(r.appointment_time),
      Status: r.status,
      "Payment method": r.payment_method,
      "Payment status": r.payment_status,
      Amount: Number(r.payment_amount ?? 0),
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, "Appointments");
    const trendRows = trend.map((t) => ({
      Date: t.date,
      Appointments: t.appointments,
      Completed: t.completed,
      Cancelled: t.cancelled,
      Revenue: t.revenue,
    }));
    const wsTrend = XLSX.utils.json_to_sheet(trendRows);
    XLSX.utils.book_append_sheet(wb, wsTrend, "Daily trend");
    XLSX.writeFile(wb, `appointments-report-${format(new Date(), "yyyyMMdd-HHmm")}.xlsx`);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold">Reports</h2>
          <p className="text-sm text-muted-foreground">Appointment and revenue trends</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={days} onValueChange={setDays}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="180">Last 6 months</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={downloadExcel} className="gap-2" disabled={q.isLoading || !q.data?.length}>
            <Download className="h-4 w-4" /> Excel
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Appointments" value={totals.total} />
        <Kpi label="Completed" value={totals.completed} />
        <Kpi label="Cancelled" value={totals.cancelled} />
        <Kpi label="Revenue" value={formatMoney(totals.revenue)} />
      </div>

      {q.isLoading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Appointments trend</CardTitle></CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="label" fontSize={11} />
                    <YAxis allowDecimals={false} fontSize={11} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="appointments" fill="var(--primary)" name="Total" />
                    <Bar dataKey="completed" fill="var(--success)" name="Completed" />
                    <Bar dataKey="cancelled" fill="var(--destructive)" name="Cancelled" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Revenue trend</CardTitle></CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="label" fontSize={11} />
                    <YAxis fontSize={11} />
                    <Tooltip formatter={(v: number) => formatMoney(v)} />
                    <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Revenue" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: number | string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
