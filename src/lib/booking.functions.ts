import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const timeSchema = z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/);

const availableSlotsSchema = z.object({
  date: dateSchema,
});

const bookAppointmentSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  mobile: z.string().trim().regex(/^\d{10}$/, "Mobile must be exactly 10 digits"),
  email: z.string().trim().email().nullable().optional(),
  age: z.number().int().min(0).max(120).nullable().optional(),
  gender: z.string().trim().max(40).nullable().optional(),
  treatment_id: z.string().uuid(),
  appointment_date: dateSchema,
  appointment_time: timeSchema,
  reason: z.string().trim().max(1000).nullable().optional(),
  payment_method: z.enum(["clinic", "online"]),
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

    const now = new Date();
    const selected = new Date(`${data.date}T00:00:00Z`);
    const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    const isToday = selected.getTime() === today.getTime();
    const nowMin = now.getHours() * 60 + now.getMinutes();

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

    const timeToMinutes = (t: string): number => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };

    const minutesToTime = (m: number): string => {
      const h = Math.floor(m / 60);
      const mm = m % 60;
      return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00`;
    };

    const normalizeTime = (value: string) => (value.length === 5 ? `${value}:00` : value);
    const appointmentTime = normalizeTime(data.appointment_time);
    const mobile = data.mobile.trim();

    const [{ data: clinic, error: clinicError }, { data: treatment, error: treatmentError }] = await Promise.all([
      supabaseAdmin.from("clinic_settings").select("slot_duration_minutes, max_per_slot").eq("id", 1).single(),
      supabaseAdmin
        .from("treatments")
        .select("id, name, fee, duration_minutes, is_active")
        .eq("id", data.treatment_id)
        .eq("is_active", true)
        .single(),
    ]);

    if (clinicError) throw clinicError;
    if (treatmentError) throw treatmentError;
    if (!treatment) throw new Error("Please choose an active treatment.");

    const weekday = new Date(`${data.appointment_date}T00:00:00Z`).getUTCDay();
    const [{ data: hours, error: hoursError }, { data: blocked, error: blockedError }, { data: booked, error: bookedError }] = await Promise.all([
      supabaseAdmin.from("working_hours").select("is_open, morning_start, morning_end, evening_start, evening_end").eq("weekday", weekday).maybeSingle(),
      supabaseAdmin.from("blocked_dates").select("blocked_date").eq("blocked_date", data.appointment_date).maybeSingle(),
      supabaseAdmin
        .from("appointments")
        .select("appointment_time")
        .eq("appointment_date", data.appointment_date)
        .in("status", ["confirmed", "checked_in", "completed"]),
    ]);

    if (hoursError) throw hoursError;
    if (blockedError) throw blockedError;
    if (bookedError) throw bookedError;
    if (blocked || !hours?.is_open) throw new Error("The clinic is closed on this date. Please pick another day.");

    const slots: string[] = [];
    const pushSlots = (start: string | null, end: string | null) => {
      if (!start || !end) return;
      let cur = timeToMinutes(start);
      const stop = timeToMinutes(end);
      while (cur + clinic.slot_duration_minutes <= stop) {
        slots.push(minutesToTime(cur));
        cur += clinic.slot_duration_minutes;
      }
    };
    pushSlots(hours.morning_start, hours.morning_end);
    pushSlots(hours.evening_start, hours.evening_end);

    const counts = new Map<string, number>();
    (booked ?? []).forEach((row) => {
      counts.set(row.appointment_time, (counts.get(row.appointment_time) ?? 0) + 1);
    });

    const available = slots.filter((slot) => (counts.get(slot) ?? 0) < clinic.max_per_slot);
    if (!available.includes(appointmentTime)) {
      throw new Error("This slot was just taken. Please pick another.");
    }

    const { data: patient, error: patientError } = await supabaseAdmin
      .from("patients")
      .upsert(
        {
          mobile,
          full_name: data.full_name.trim(),
          email: data.email?.trim() || null,
          age: data.age ?? null,
          gender: data.gender?.trim() || null,
        },
        { onConflict: "mobile" },
      )
      .select("id")
      .single();

    if (patientError) throw patientError;

    const { data: appointment, error: appointmentError } = await supabaseAdmin
      .from("appointments")
      .insert({
        patient_id: patient.id,
        patient_mobile: mobile,
        patient_name: data.full_name.trim(),
        treatment_id: treatment.id,
        treatment_name: treatment.name,
        appointment_date: data.appointment_date,
        appointment_time: appointmentTime,
        duration_minutes: treatment.duration_minutes,
        reason: data.reason?.trim() || null,
        status: "confirmed",
        payment_method: data.payment_method,
        payment_status: data.payment_method === "online" ? "paid_online" : "pending",
        payment_amount: treatment.fee,
        payment_paid_at: data.payment_method === "online" ? new Date().toISOString() : null,
        booked_by: "patient",
      })
      .select("booking_code")
      .single();

    if (appointmentError) throw appointmentError;

    return { booking_code: appointment.booking_code };
  });

export const getBookingByCode = createServerFn({ method: "GET" })
  .validator((input) => bookingCodeSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: appointment, error } = await supabaseAdmin
      .from("appointments")
      .select(
        "booking_code, patient_name, patient_mobile, treatment_name, appointment_date, appointment_time, payment_method, payment_status, payment_amount, status",
      )
      .eq("booking_code", data.code.trim())
      .maybeSingle();

    if (error) throw error;
    return appointment;
  });