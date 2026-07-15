
# Doctor Clinic Management App — Build Plan

This is a large, multi-module product. I'll build it in phases so you get a working, polished app at each step rather than one giant unstable drop. Before I start, a few decisions I need from you, then the phased plan.

## Decisions I need from you

1. **Razorpay** — requires your Razorpay Key ID + Key Secret (test mode is fine to start). Do you have them, or should I stub "Pay Online" as "coming soon" and ship "Pay at Clinic" first?
2. **OTP delivery** — real SMS OTP needs a paid provider (Twilio/MSG91). Options:
   - (a) Use **email OTP** via Lovable Cloud (free, works today, but patient must give email).
   - (b) Use **mobile OTP** but require you to connect Twilio/MSG91 (extra secret + cost).
   - (c) Dev mode: show OTP on-screen for now, swap in SMS later.
3. **Email** — I'll use Lovable's built-in email (needs a domain you own for branded sending, otherwise auth-only fallback). OK?
4. **Seed content** — should I seed the site with a placeholder doctor (name, photo, treatments) that you edit later from the doctor dashboard, or do you want to enter real details now?

## Tech setup

- Lovable Cloud (Supabase) for DB + auth + storage + email.
- TanStack Start + Tailwind + shadcn (already scaffolded).
- Roles: `doctor`, `receptionist` in a separate `user_roles` table (secure `has_role` function).
- RLS on every table; public-safe read policies for landing-page content only.

## Database schema (high level)

`clinic_settings` (singleton), `doctor_profile`, `treatments`, `gallery`, `testimonials`, `faqs`, `working_hours`, `blocked_dates`, `patients` (keyed by phone), `appointments`, `payments`, `doctor_notes`, `otp_codes`, `user_roles`.

Slots are computed on the fly from `working_hours` + `blocked_dates` + existing appointments — no pre-generated slot rows.

## Phased delivery

**Phase 1 — Foundation & Public Website**
- Enable Cloud, design system (premium medical blue/white), schema + RLS + seed.
- Landing page: hero, about doctor, treatments, gallery, testimonials, FAQs, hours, contact, WhatsApp/Call/Maps, prominent Book Appointment CTA.
- Routes: `/`, `/about`, `/treatments`, `/contact` each with proper `head()` SEO.

**Phase 2 — Booking Flow (Patient)**
- Multi-step booking: details → treatment → date → live-available slots → payment choice.
- "Pay at Clinic" path fully working; Razorpay wired if keys provided else disabled.
- Booking confirmation page + confirmation email.
- `/manage` — enter mobile → OTP → list/cancel appointments (1-hour rule).

**Phase 3 — Doctor Dashboard**
- Auth + role gate. Dashboard cards, appointment lists with search/filter, calendar (month/week/day), consultation notes, patient history.
- Clinic & doctor profile editor, treatments CRUD, working hours + holidays, gallery/testimonials/FAQ management.

**Phase 4 — Receptionist Dashboard**
- Separate role gate. Book on behalf, walk-ins, check-in, mark paid, reschedule, cancel, print/share confirmation, internal notes.

**Phase 5 — Polish**
- Email templates (booking, cancel, reschedule), toasts, loading states, empty states, mobile pass, a11y, SEO/sitemap.

## What I'll do first if you say "go"

1. Answer the 4 questions above (or say "your call" and I'll pick sensible defaults: email-OTP, Razorpay stubbed until keys, Lovable email, seed placeholder doctor).
2. I enable Lovable Cloud and ship Phase 1 (public site + schema + doctor/receptionist login shell) in the first turn.
3. Then we iterate phase by phase.

Reply with your picks (or "your call, defaults are fine, go") and I'll start Phase 1.
