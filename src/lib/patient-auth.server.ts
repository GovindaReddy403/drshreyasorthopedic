import { getCookie, setCookie } from "@tanstack/react-start/server";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const COOKIE = "patient_manage_session";
const SESSION_SECONDS = 60 * 30;

async function tokenHash(token: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function verifyConfig() {
  const { TWILIO_ACCOUNT_SID: sid, TWILIO_AUTH_TOKEN: secret, TWILIO_VERIFY_SERVICE_SID: service } = process.env;
  if (!sid || !secret || !service) throw new Error("SMS verification is not configured. Please contact the clinic.");
  return { sid, secret, service };
}

async function verifyRequest(path: string, data: URLSearchParams) {
  const { sid, secret, service } = verifyConfig();
  const response = await fetch(`https://verify.twilio.com/v2/Services/${encodeURIComponent(service)}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${sid}:${secret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  });
  if (!response.ok) {
    if (path === "VerificationCheck" && response.status === 404) return { status: "expired" };
    console.error("SMS verification provider error", response.status);
    throw new Error("SMS verification is unavailable. Please try again later.");
  }
  return (await response.json()) as { status: string };
}

export async function startPhoneVerification(mobile: string) {
  await verifyRequest("Verifications", new URLSearchParams({ To: `+91${mobile}`, Channel: "sms" }));
}

export async function completePhoneVerification(mobile: string, code: string) {
  const result = await verifyRequest("VerificationCheck", new URLSearchParams({ To: `+91${mobile}`, Code: code }));
  if (result.status !== "approved") return false;

  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const token = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  const { error } = await supabaseAdmin.from("patient_manage_sessions" as never).insert({
    token_hash: await tokenHash(token),
    mobile,
    expires_at: new Date(Date.now() + SESSION_SECONDS * 1000).toISOString(),
  } as never);
  if (error) throw new Error("Could not start your appointment session. Please try again.");
  setCookie(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  return true;
}

export async function requirePatientMobile() {
  const token = getCookie(COOKIE);
  if (!token || !/^[0-9a-f]{64}$/.test(token)) throw new Error("Please verify your mobile number again.");
  const { data, error } = await supabaseAdmin.from("patient_manage_sessions" as never)
    .select("mobile, expires_at")
    .eq("token_hash", await tokenHash(token)).maybeSingle();
  const session = data as { mobile: string; expires_at: string } | null;
  if (error || !session || new Date(session.expires_at).getTime() <= Date.now()) {
    throw new Error("Your session has expired. Please verify your mobile number again.");
  }
  return session.mobile;
}
