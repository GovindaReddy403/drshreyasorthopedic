import { supabase } from "@/integrations/supabase/client";
import type { WorkingHour } from "./clinic";

export function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
export function minutesToTime(m: number): string {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00`;
}
export function labelSlot(t: string): string {
  const [hh, mm] = t.split(":");
  const h = parseInt(hh, 10);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${mm} ${suffix}`;
}

export function generateSlotsForDay(hours: WorkingHour | undefined, slotMinutes: number): string[] {
  if (!hours || !hours.is_open) return [];
  const slots: string[] = [];
  const push = (start: string | null, end: string | null) => {
    if (!start || !end) return;
    let cur = timeToMinutes(start);
    const stop = timeToMinutes(end);
    while (cur + slotMinutes <= stop) {
      slots.push(minutesToTime(cur));
      cur += slotMinutes;
    }
  };
  push(hours.morning_start, hours.morning_end);
  push(hours.evening_start, hours.evening_end);
  return slots;
}

export async function fetchAvailableSlots(
  date: string, // YYYY-MM-DD
  slotMinutes: number,
  maxPerSlot: number,
): Promise<string[]> {
  const day = new Date(date + "T00:00:00");
  const weekday = day.getDay();

  const [{ data: hours }, { data: blocked }, { data: booked }] = await Promise.all([
    supabase.from("working_hours").select("*").eq("weekday", weekday).maybeSingle(),
    supabase.from("blocked_dates").select("blocked_date").eq("blocked_date", date).maybeSingle(),
    supabase
      .from("appointments")
      .select("appointment_time")
      .eq("appointment_date", date)
      .in("status", ["confirmed", "checked_in", "completed"]),
  ]);

  if (blocked) return [];
  const all = generateSlotsForDay(hours as unknown as WorkingHour | undefined, slotMinutes);

  const counts = new Map<string, number>();
  (booked ?? []).forEach((row: { appointment_time: string }) => {
    counts.set(row.appointment_time, (counts.get(row.appointment_time) ?? 0) + 1);
  });

  // Filter past slots if date is today
  const now = new Date();
  const isToday = day.toDateString() === now.toDateString();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  return all.filter((s) => {
    if ((counts.get(s) ?? 0) >= maxPerSlot) return false;
    if (isToday && timeToMinutes(s) <= nowMin) return false;
    return true;
  });
}
