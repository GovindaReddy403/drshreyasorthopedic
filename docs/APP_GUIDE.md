# Dr. Shreyas Orthopedic Clinic — App Guide

A single guide covering *what* the app does, *where* to change things, and *how* the code is organized.

---

## 1. What this app is

A patient-facing clinic website with an online booking flow, plus a private
staff dashboard for the doctor and receptionist.

Public visitors can:
- Browse the home page (about the doctor, treatments, testimonials, FAQs, gallery, map, contact).
- Book an appointment (`/book`) — pick treatment, date, slot, enter details, pay online or at clinic.
- View a booking confirmation (`/booking/<code>`) and save the clinic vCard / QR.
- Manage their own bookings (`/manage`) — verify via OTP, view and cancel.

Staff (signed in) can:
- **Doctor** (`/doctor`) — see today's schedule, patient history, add notes.
- **Receptionist** (`/reception`) — manage appointments, check-in, edit payments.
- **Settings** (`/settings`) — edit **every piece of "default" content** shown on the site.

---

## 2. Where the "default" data lives

**None of the clinic content is hard-coded.** Everything editable is stored in the database and rendered from there. To change any of it, go to **`/settings`** while signed in as the doctor.

| What you want to change | Where in Settings | DB table |
| --- | --- | --- |
| Clinic name, logo, tagline | Clinic Info | `clinic_settings` |
| Doctor name, photo, qualifications, about, education, experience, awards | Doctor Info | `clinic_settings` |
| **Google Maps link + embed iframe** | Location | `clinic_settings.google_maps_url`, `google_maps_embed` |
| Address, phone, WhatsApp, email, emergency contact | Contact | `clinic_settings` |
| Consultation fee, slot length, max bookings per slot | Booking rules | `clinic_settings` |
| Social links (LinkedIn/Insta/FB/YouTube/X) | Social | `clinic_settings` |
| Treatments offered (name, price, duration, description) | Treatments tab | `treatments` |
| Additional doctors on the team | Doctors tab | `doctors` |
| Working hours per weekday | Working Hours tab | `working_hours` |
| Blocked / holiday dates | Blocked Dates tab | `blocked_dates` |
| Testimonials shown on home | Testimonials tab | `testimonials` |
| FAQs on home page | FAQs tab | `faqs` |
| Gallery photos | Gallery tab | `gallery` (Storage bucket: `gallery`) |

> The Google Maps embed uses **any iframe URL you paste in** — from Google Maps → Share → Embed a map → copy the `src`. No API key needed for that.
> The map on the home page and the booking confirmation both read `clinic_settings.google_maps_url`; update it in Settings and both places refresh.

### Things that only live in the database (no UI yet)

- `user_roles` — who is a `doctor` vs `receptionist`. To promote a new user, insert a row via the backend admin. (Only staff can sign in; no self-signup for roles.)
- `otp_codes` — internal, auto-managed by the OTP server function.

---

## 3. Tech stack in one paragraph

- **Framework:** TanStack Start (React 19 + Vite 7). File-based routing under `src/routes/`.
- **Styling:** Tailwind CSS v4 (design tokens in `src/styles.css`) + shadcn/ui components.
- **Data layer:** Lovable Cloud (Supabase Postgres + Auth + Storage) with Row-Level Security everywhere.
- **Server code:** TanStack `createServerFn` (RPC-style server functions), no separate backend.
- **Deployment:** Cloudflare Workers via Lovable publish.

---

## 4. Folder map

```
src/
├── routes/                       ← every URL is a file here
│   ├── __root.tsx                ← <html>, providers, global head/meta
│   ├── index.tsx                 ← Home page (hero, about, treatments, testimonials, map, contact)
│   ├── book.tsx                  ← Booking flow
│   ├── booking.$code.tsx         ← Confirmation page (with QR)
│   ├── manage.tsx                ← Patient self-service (OTP)
│   ├── auth.tsx                  ← Staff sign-in / sign-up
│   ├── sitemap[.]xml.ts          ← SEO sitemap
│   └── _authenticated/           ← Everything under here requires login
│       ├── route.tsx             ← Auth gate (do not edit — managed)
│       ├── doctor.tsx            ← Doctor dashboard
│       ├── reception.tsx         ← Receptionist dashboard
│       └── settings.tsx          ← ⭐ Where the doctor edits ALL default content
│
├── components/
│   ├── ui/                       ← shadcn primitives (Button, Input, Dialog, …)
│   ├── site-nav.tsx              ← Top navigation
│   ├── site-footer.tsx           ← Footer
│   ├── contact-form.tsx          ← Home contact form
│   ├── contact-qr.tsx            ← "Save clinic contact" QR (home + dashboards)
│   ├── dashboard-shell.tsx       ← Shared wrapper for doctor/reception pages
│   ├── appointments-report.tsx   ← Reception reporting widget
│   └── payment-edit-dialog.tsx   ← Reception payment editor
│
├── lib/
│   ├── clinic.ts                 ← fetchClinic() — reads clinic_settings
│   ├── slots.ts                  ← Slot maths (labelSlot, timesForDay, …)
│   ├── booking.functions.ts      ← Server fns for booking (createServerFn)
│   ├── otp.functions.ts          ← Server fns: send/verify OTP (service-role)
│   ├── error-page.ts             ← SSR error HTML
│   └── utils.ts                  ← cn(), misc helpers
│
├── integrations/supabase/        ← ⚠️ AUTO-GENERATED — do not edit
│   ├── client.ts                 ← Browser Supabase client
│   ├── client.server.ts          ← Server admin client (service role)
│   ├── auth-middleware.ts        ← requireSupabaseAuth for protected server fns
│   ├── auth-attacher.ts          ← Attaches bearer token to server fn calls
│   └── types.ts                  ← DB types
│
├── hooks/                        ← React hooks (use-mobile, …)
├── assets/                       ← Images (hero, doctor portrait, …)
├── styles.css                    ← Tailwind v4 theme tokens & CSS variables
├── router.tsx                    ← Router bootstrap
└── start.ts                      ← Server bootstrap (middleware chain)

supabase/migrations/              ← Every DB change committed as SQL
docs/                             ← This document
```

---

## 5. Design system

Colors, radii, fonts, and shadows are **design tokens** in `src/styles.css` — never hardcoded hex values in components. All components use semantic classes like `bg-primary`, `text-muted-foreground`, `shadow-[var(--shadow-soft)]`.

To rebrand:
1. Open `src/styles.css`.
2. Change the CSS custom properties under `@theme` (primary color, accent, background, radius, fonts).
3. Every page updates automatically — no component edits needed.

Icons: [lucide-react](https://lucide.dev). Toasts: `sonner`.

---

## 6. Data flow (typical page)

1. **Route loader** calls `queryClient.ensureQueryData(clinicQO)` — fetch clinic settings on the server.
2. Component renders with `useSuspenseQuery(clinicQO)` — instant read from cache.
3. Any write (book, cancel, update settings) hits either:
   - The browser Supabase client (RLS enforces "you can only touch your own row"), or
   - A **server function** (`src/lib/*.functions.ts`) for anything privileged (OTP, admin writes).

RLS policies are the enforcement layer — the frontend simply asks; the database decides.

---

## 7. Security model (short version)

- **Public tables** (treatments, doctors, faqs, testimonials, gallery, working_hours, clinic_settings) — `SELECT` open to `anon`. Writes require `has_role('doctor')`.
- **Appointments** — patients can insert (booking form). Reads scoped to matching mobile number. Staff full access.
- **OTP** — table locked to service role only. OTP is generated and verified by `src/lib/otp.functions.ts`.
- **user_roles** — read-your-own only; writes explicitly denied at the RLS layer (grant a role only via backend admin).
- **Auth** — email + password with HaveIBeenPwned check enabled. `/auth` page handles sign-in.

---

## 8. Common tasks

### Change the Google Maps location on the home page
Sign in → **Settings → Location** → paste your Google Maps share URL and (optionally) an embed iframe `src`. Save.

### Add a new treatment
Sign in → **Settings → Treatments** → **Add treatment**.

### Change consultation fee
Sign in → **Settings → Booking rules** → update "Consultation fee".

### Block a holiday date
Sign in → **Settings → Blocked Dates** → add the date.

### Add a new receptionist
1. Ask them to sign up at `/auth`.
2. From the backend, insert a row into `user_roles` with their `user_id` and `role = 'receptionist'`.

### Change the theme / brand color
Edit `src/styles.css` → `@theme` block → save.

### Change SEO title / description
- Global fallback: `src/routes/__root.tsx` → `head()`.
- Per-page: each route file's `head()` (e.g. `src/routes/index.tsx`).

---

## 9. Local development notes

- File-based routing: adding `src/routes/foo.tsx` creates `/foo`. Don't edit `src/routeTree.gen.ts` — it's generated.
- Never edit files in `src/integrations/supabase/` (auto-generated).
- Every DB change is a **migration** committed under `supabase/migrations/`. Do not run destructive SQL by hand in production.
- Server functions live in files named `*.functions.ts`. Anything using the service role must be loaded inside the handler with `await import("@/integrations/supabase/client.server")`.

---

## 10. Publishing

Click **Publish** in the Lovable editor → get a `*.lovable.app` URL. For a custom domain, use Project Settings → Domains.

Before going live, review in Settings:
- Clinic name, address, phone, WhatsApp, Google Maps link
- Doctor photo and bio
- All treatments with correct prices
- Working hours for each weekday
- At least 3 testimonials and 5 FAQs
- Gallery images
