import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const listPatientAppointments = createServerFn({ method: "GET" }).handler(async () => {
  const { requirePatientMobile } = await import("./patient-auth.server");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const mobile = await requirePatientMobile();
  const { data, error } = await supabaseAdmin.from("appointments")
    .select("id, booking_code, patient_name, treatment_name, appointment_date, appointment_time, payment_method, payment_status, payment_amount, status")
    .eq("patient_mobile", mobile)
    .order("appointment_date", { ascending: false })
    .order("appointment_time", { ascending: false });
  if (error) throw new Error("Could not load your appointments.");
  return data ?? [];
});

export const cancelPatientAppointment = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { requirePatientMobile } = await import("./patient-auth.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const mobile = await requirePatientMobile();
    const { data: cancelled, error } = await supabaseAdmin.rpc("cancel_patient_appointment" as never, {
      p_id: data.id, p_mobile: mobile,
    } as never);
    if (error) throw new Error("Could not cancel this appointment. Please contact the clinic.");
    if (!cancelled) throw new Error("This appointment cannot be cancelled online within one hour of its scheduled time.");
    return { ok: true };
  });
