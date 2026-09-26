import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { clinicNow } from "./clinic-time";

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const timeSchema = z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/);

const availableSlotsSchema = z.object({
  date: dateSchema,
});

const bookAppointmentSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid Indian mobile number"),
  email: z.string().trim().email().nullable().optional(),
  age: z.number().int().min(0).max(120).nullable().optional(),
  gender: z.string().trim().max(40).nullable().optional(),
  treatment_id: z.string().uuid(),
  appointment_date: dateSchema,
  appointment_time: timeSchema,
  reason: z.string().trim().max(1000).nullable().optional(),
  payment_method: z.literal("clinic"),
});

const bookingCodeSchema = z.object({
  code: z.string().trim().min(4).max(40),
});

export const getAvailableSlots = createServerFn({ method: "GET" })
  .validator((input) => availableSlotsSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const timeToMinutes = (t: string): number => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };

    const minutesToTime = (m: number): string => {
      const h = Math.floor(m / 60);
      const mm = m % 60;
      return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00`;
    };

    const generateSlots = (
      hours:
        | {
            is_open: boolean;
            morning_start: string | null;
            morning_end: string | null;
            evening_start: string | null;
            evening_end: string | null;
          }
        | null,
      slotMinutes: number,
    ): string[] => {
      if (!hours?.is_open) return [];
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
    };

    const weekday = new Date(`${data.date}T00:00:00Z`).getUTCDay();

    const [{ data: clinic, error: clinicError }, { data: hours, error: hoursError }, { data: blocked, error: blockedError }, { data: booked, error: bookedError }] =
      await Promise.all([
        supabaseAdmin.from("clinic_settings").select("slot_duration_minutes, max_per_slot").eq("id", 1).single(),
        supabaseAdmin.from("working_hours").select("is_open, morning_start, morning_end, evening_start, evening_end").eq("weekday", weekday).maybeSingle(),
        supabaseAdmin.from("blocked_dates").select("blocked_date").eq("blocked_date", data.date).maybeSingle(),
        supabaseAdmin
          .from("appointments")
          .select("appointment_time")
          .eq("appointment_date", data.date)
          .in("status", ["confirmed", "checked_in", "completed"]),
      ]);

    if (clinicError) throw clinicError;
    if (hoursError) throw hoursError;
    if (blockedError) throw blockedError;
    if (bookedError) throw bookedError;
    if (blocked) return [];

    const all = generateSlots(hours, clinic.slot_duration_minutes);
    const counts = new Map<string, number>();
    (booked ?? []).forEach((row) => {
      counts.set(row.appointment_time, (counts.get(row.appointment_time) ?? 0) + 1);
    });

    const now = clinicNow();
    if (data.date < now.date) return [];
    const isToday = data.date === now.date;
    const nowMin = now.minutes;

    return all.filter((slot) => {
      if ((counts.get(slot) ?? 0) >= clinic.max_per_slot) return false;
      if (isToday && timeToMinutes(slot) <= nowMin) return false;
      return true;
    });
  });

export const bookAppointment = createServerFn({ method: "POST" })
  .validator((input) => bookAppointmentSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const normalizeTime = (value: string) => (value.length === 5 ? `${value}:00` : value);
    const appointmentTime = normalizeTime(data.appointment_time);
    const { data: code, error } = await supabaseAdmin.rpc("book_clinic_appointment" as never, {
      p_full_name: data.full_name,
      p_mobile: data.mobile,
      p_email: data.email ?? null,
      p_age: data.age ?? null,
      p_gender: data.gender ?? null,
      p_treatment_id: data.treatment_id,
      p_date: data.appointment_date,
      p_time: appointmentTime,
      p_reason: data.reason ?? null,
    } as never);
    if (error) throw new Error(error.message);
    return { booking_code: code as unknown as string };
  });

export const getBookingByCode = createServerFn({ method: "GET" })
  .validator((input) => bookingCodeSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: appointment, error } = await supabaseAdmin
      .from("appointments")
      .select(
        "booking_code, treatment_name, appointment_date, appointment_time, payment_method, payment_status, payment_amount, status",
      )
      .eq("booking_code", data.code.trim())
      .maybeSingle();

    if (error) throw error;
    return appointment;
  });
