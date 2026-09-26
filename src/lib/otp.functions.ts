import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const mobileSchema = z.string().regex(/^[6-9]\d{9}$/, "Enter a valid Indian mobile number");

export const sendOtp = createServerFn({ method: "POST" })
  .validator((data) => z.object({ mobile: mobileSchema }).parse(data))
  .handler(async ({ data }) => {
    const { startPhoneVerification } = await import("./patient-auth.server");
    await startPhoneVerification(data.mobile);
    return { sent: true };
  });

export const verifyOtp = createServerFn({ method: "POST" })
  .validator((data) => z.object({ mobile: mobileSchema, code: z.string().regex(/^\d{6}$/) }).parse(data))
  .handler(async ({ data }) => {
    const { completePhoneVerification } = await import("./patient-auth.server");
    return { ok: await completePhoneVerification(data.mobile, data.code) };
  });
