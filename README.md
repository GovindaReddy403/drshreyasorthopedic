# Dr. Shreyas Orthopedic Clinic

Website and appointment booking system for a single-doctor orthopedic clinic in
Mysuru, India.

**Live:** https://drshreyas.com

Patients browse the clinic site and book appointments without creating an
account. Staff sign in to a private dashboard to manage the day's schedule,
patients, payments and all site content.

---

## Contents

| Document | What it covers |
| --- | --- |
| This file | Overview, local setup, project layout |
| [`docs/APP_GUIDE.md`](docs/APP_GUIDE.md) | **Running the clinic** — editing content, adding treatments, staff |
| [`docs/DESIGN.md`](docs/DESIGN.md) | **Architecture** — data model, security, booking flow, decisions |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | **Shipping** — build, CI/CD, secrets, domain, rollback |
| [`docs/PATIENT_LAUNCH_SETUP.md`](docs/PATIENT_LAUNCH_SETUP.md) | Pre-launch checklist for the booking + OTP flow |
| [`docs/ORIGINAL_BRIEF.md`](docs/ORIGINAL_BRIEF.md) | The original product brief the project was generated from |

---

## Features

**Public site** — home, about the doctor, areas of specialty, injuries &
conditions, gallery, videos, reviews, awards, media coverage, blog, contact.
Treatments and fees are shown on the home page and in the booking flow, sourced
from the database.

**Booking** (`/book`) — pick a treatment, date and slot; only genuinely
available slots are offered. Confirmation page at `/booking/<code>` with a
scannable clinic vCard.

**Patient self-service** (`/manage`) — verify a mobile number by SMS OTP, view
bookings made with that number, and cancel up to one hour before the
appointment. No patient account is ever created.

**Staff dashboards** — `/doctor` (schedule, patient history, consultation
notes), `/reception` (bookings, check-in, payments), `/settings` (all site
content, treatments, working hours, holidays).

---

## Tech stack

- **TanStack Start** (React 19 + Vite) — file-based routing, SSR, typed server functions
- **Tailwind CSS v4** + **shadcn/ui** — design tokens in `src/styles.css`
- **Supabase** (Postgres + Auth + Storage) — Row-Level Security throughout
- **Twilio Verify** — patient SMS OTP
- **Cloudflare Workers** — SSR at the edge, deployed from `main` by GitHub Actions

---

## Local development

Requires **Node.js 22+** and **pnpm 10**.

```sh
git clone https://github.com/GovindaReddy403/drshreyasorthopedic.git
cd drshreyasorthopedic
pnpm install --frozen-lockfile

cp .env.example .env    # then fill in the values below

pnpm dev                # Vite prints the local URL
```

> **Use pnpm, not bun.** `bun.lock` resolves ~131 packages from a private
> Lovable registry that is unreachable outside Lovable's sandbox.
> `pnpm-lock.yaml` uses public npm.

### Environment variables

`VITE_`-prefixed values are **inlined into the browser bundle at build time** and
are therefore public. Everything else is server-only and must never gain a
`VITE_` prefix.

| Variable | Scope | Needed for |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | public | Browser Supabase client |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | public | Browser Supabase client |
| `VITE_PATIENT_MANAGE_ENABLED` | public | Feature-flags `/manage`; keep `false` until Twilio is live |
| `SUPABASE_URL` | server | Server-side Supabase access |
| `SUPABASE_PUBLISHABLE_KEY` | server | Auth middleware |
| `SUPABASE_SERVICE_ROLE_KEY` | **secret** | Booking and patient sessions — bypasses RLS |
| `TWILIO_ACCOUNT_SID` | **secret** | Patient OTP |
| `TWILIO_AUTH_TOKEN` | **secret** | Patient OTP |
| `TWILIO_VERIFY_SERVICE_SID` | **secret** | Patient OTP |

Without `SUPABASE_SERVICE_ROLE_KEY` the site runs and every public page works,
but **booking fails** — the booking RPC is granted to `service_role` only.
Without the Twilio values the OTP endpoint fails closed by design.

### Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Dev server with HMR |
| `pnpm build` | Production build into `.output/` |
| `pnpm preview` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier write |

There is no `test` script yet — see *Known gaps* below.

Typecheck with:

```sh
pnpm exec tsc --noEmit
```

---

## Project layout

```
src/
├── routes/                    every URL is a file here
│   ├── __root.tsx             <html>, providers, global head
│   ├── index.tsx              home page
│   ├── book.tsx               booking wizard
│   ├── booking.$code.tsx      confirmation + QR
│   ├── manage.tsx             patient OTP self-service
│   ├── auth.tsx               staff sign-in
│   ├── sitemap[.]xml.ts       generated sitemap
│   └── _authenticated/        requires login (ssr: false)
│       ├── doctor.tsx  reception.tsx  settings.tsx
├── components/                site + dashboard components
│   └── ui/                    shadcn primitives
├── lib/
│   ├── booking.functions.ts   server fns: slots + booking
│   ├── otp.functions.ts       server fns: send/verify OTP
│   ├── patient-auth.server.ts Twilio Verify + hashed sessions
│   ├── clinic-time.ts         Asia/Kolkata time helpers
│   ├── slots.ts               slot maths
│   └── seo.ts                 SITE_URL + meta helpers
├── integrations/supabase/     ⚠️ auto-generated — do not edit
└── server.ts                  Worker entry (SSR error wrapper)

supabase/migrations/           every schema change, as SQL
docs/                          documentation
.github/workflows/deploy.yml   auto-deploy to Cloudflare
```

Conventions:

- Adding `src/routes/foo.tsx` creates `/foo`. `src/routeTree.gen.ts` is
  generated — never edit it.
- Files in `src/integrations/supabase/` are generated from the database schema.
- Server-only code lives in `*.server.ts` or inside a `createServerFn` handler.
  Import the service-role client **dynamically** inside the handler:
  ```ts
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  ```
  A top-level import in a route or `*.functions.ts` file would bundle it into
  the client.
- Every schema change is a migration committed under `supabase/migrations/`.

---

## Deploying

Push to `main`. GitHub Actions typechecks, builds and deploys to Cloudflare
Workers. See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for secrets, the custom
domain, manual deploys and rollback.

---

## Security

- The `sb_publishable_…` key is public by design and protected by RLS.
- The `service_role` key bypasses RLS and belongs only in Worker/CI secrets.
- Patients cannot write to the database directly; all booking goes through a
  validated server function and a `service_role`-only SQL function.
- Patient sessions are stored as SHA-256 hashes, never in plaintext.

Full model in [`docs/DESIGN.md`](docs/DESIGN.md#6-security-model).

---

## Known gaps

- No automated test suite. Slot generation, the `Asia/Kolkata` boundary and the
  one-hour cancellation rule are the highest-value candidates.
- ~1100 Prettier violations inherited from generated code, so CI gates on
  typecheck rather than lint. `pnpm format` clears them.
- Online payment is schema-ready but not enabled; bookings are pay-at-clinic.
- `pnpm build` fails on Windows due to a path bug in `@lovable.dev/mcp-js`.
  Linux, CI and the Lovable preview are unaffected.

---

## Lovable

This project is connected to [Lovable](https://lovable.dev) and syncs both ways
with `main`, so **do not rewrite published history** (no force-push, rebase or
amend of pushed commits) — it corrupts the project history on Lovable's side.
