// Shared types + helpers for clinic data (browser-safe).
import { supabase } from "@/integrations/supabase/client";

export type ClinicSettings = {
  id: number;
  clinic_name: string;
  clinic_logo_url: string | null;
  tagline: string | null;
  doctor_name: string;
  doctor_photo_url: string | null;
  qualifications: string | null;
  specialization: string | null;
  years_experience: number | null;
  about_doctor: string | null;
  education: string | null;
  professional_experience: string | null;
  certifications: string | null;
  awards: string | null;
  memberships: string | null;
  languages_spoken: string | null;
  consultation_fee: number | null;
  emergency_contact: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  google_maps_url: string | null;
  google_maps_embed: string | null;
  slot_duration_minutes: number;
  max_per_slot: number;
};

export type Treatment = {
  id: string;
  name: string;
  description: string | null;
  fee: number;
  duration_minutes: number;
  is_active: boolean;
  sort_order: number;
};

export type WorkingHour = {
  weekday: number;
  is_open: boolean;
  morning_start: string | null;
  morning_end: string | null;
  evening_start: string | null;
  evening_end: string | null;
};

export type Testimonial = {
  id: string;
  patient_name: string;
  content: string;
  rating: number;
};

export type Faq = { id: string; question: string; answer: string };
export type GalleryItem = { id: string; image_url: string; caption: string | null };

export type Doctor = {
  id: string;
  name: string;
  qualifications: string | null;
  specialization: string | null;
  photo_url: string | null;
  about: string | null;
  education: string | null;
  professional_experience: string | null;
  certifications: string | null;
  memberships: string | null;
  languages_spoken: string | null;
  years_experience: number | null;
  consultation_fee: number | null;
  is_primary: boolean;
  sort_order: number;
};

export async function fetchDoctors(): Promise<Doctor[]> {
  const { data, error } = await supabase
    .from("doctors" as never)
    .select("*")
    .eq("is_active", true)
    .order("is_primary", { ascending: false })
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as unknown as Doctor[];
}

export async function fetchClinic(): Promise<ClinicSettings> {
  const { data, error } = await supabase.from("clinic_settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Clinic not configured");
  return data as unknown as ClinicSettings;
}

export async function fetchTreatments(): Promise<Treatment[]> {
  const { data, error } = await supabase
    .from("treatments")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as unknown as Treatment[];
}

export async function fetchWorkingHours(): Promise<WorkingHour[]> {
  const { data, error } = await supabase.from("working_hours").select("*").order("weekday");
  if (error) throw error;
  return (data ?? []) as unknown as WorkingHour[];
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as Testimonial[];
}

export async function fetchFaqs(): Promise<Faq[]> {
  const { data, error } = await supabase.from("faqs").select("*").order("sort_order");
  if (error) throw error;
  return (data ?? []) as unknown as Faq[];
}

export async function fetchGallery(): Promise<GalleryItem[]> {
  const { data, error } = await supabase.from("gallery").select("*").order("sort_order");
  if (error) throw error;
  return (data ?? []) as unknown as GalleryItem[];
}

export const WEEKDAY_LABELS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function formatTime(t: string | null): string {
  if (!t) return "";
  const [hh, mm] = t.split(":");
  const h = parseInt(hh, 10);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${mm} ${suffix}`;
}

export function formatMoney(n: number | null | undefined): string {
  const v = Number(n ?? 0);
  return `₹${v.toLocaleString("en-IN")}`;
}
