import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const mobileSchema = z.string().regex(/^\d{10}$/, "Invalid mobile number");

export const sendOtp = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ mobile: mobileSchema }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    const { error } = await supabaseAdmin
      .from("otp_codes")
      .insert({ mobile: data.mobile, code, expires_at });
    if (error) throw new Error(error.message);
    // TODO: integrate a real SMS provider and stop returning the code to the client.
    // Until then, this remains a demo flow that returns the code so testers can proceed.
    return { demoCode: code };
  });

export const verifyOtp = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({ mobile: mobileSchema, code: z.string().length(6) }).parse(data),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("otp_codes")
      .select("id, expires_at, used")
      .eq("mobile", data.mobile)
      .eq("code", data.code)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return { ok: false as const, reason: "invalid" as const };
    if (row.used) return { ok: false as const, reason: "used" as const };
    if (new Date(row.expires_at) < new Date())
      return { ok: false as const, reason: "expired" as const };
    await supabaseAdmin.from("otp_codes").update({ used: true }).eq("id", row.id);
    return { ok: true as const };
  });
