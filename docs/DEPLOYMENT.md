# Deployment Guide

How this site is built, deployed, and operated on **Cloudflare Workers**, with
automatic deploys from `main` via GitHub Actions.

- **Production:** https://drshreyas.com (and `www.drshreyas.com`)
- **Worker name:** `drshreyasorthopedic`
- **Preview URL:** `https://drshreyasorthopedic.<subdomain>.workers.dev`

---

## 1. How the build works

The app is a [TanStack Start](https://tanstack.com/start) SSR application. The
Lovable Vite preset (`@lovable.dev/vite-tanstack-config`) configures Nitro with
the **`cloudflare-module`** preset, so `pnpm run build` emits a Workers-native
module bundle — there is no separate "adapter" step.

```
pnpm run build
└── .output/
    ├── server/
    │   ├── index.mjs          ← Worker entry (export default { fetch })
    │   └── wrangler.json      ← generated Worker config
    ├── public/                ← static assets, served via the ASSETS binding
    └── ...
.wrangler/deploy/config.json   ← points wrangler at .output/server/wrangler.json
```

Two details matter:

- `src/server.ts` is the server entry (wired via `tanstackStart.server.entry` in
  `vite.config.ts`). It exports the Workers module format and wraps SSR errors
  that h3 would otherwise swallow.
- The generated `wrangler.json` sets `compatibility_flags: ["nodejs_compat"]`.
  The Supabase client needs this.

Because `wrangler.json` is **generated at build time**, you do not edit it. To
change the Worker name, pass `--name` (see below) — that is what CI does.

---

## 2. Package manager: use pnpm, not bun

The repo contains both `bun.lock` and `pnpm-lock.yaml`. **CI must use pnpm.**

`bun.lock` resolves ~131 packages from a private Lovable registry
(`europe-west1-npm.pkg.dev/...`) that is only reachable from inside Lovable's
build sandbox. `pnpm-lock.yaml` resolves everything from public npm, so it is
the only lockfile that installs on a clean machine or in GitHub Actions.

```sh
pnpm install --frozen-lockfile
```

---

## 3. Automatic deploys (GitHub Actions)

`.github/workflows/deploy.yml` runs on every push to `main`, and via manual
**Run workflow** (`workflow_dispatch`).

Pipeline:

| Step | What it does | Fails the deploy? |
| --- | --- | --- |
| `pnpm install --frozen-lockfile` | Install from the public lockfile | Yes |
| `pnpm exec tsc --noEmit` | Typecheck | Yes |
| `pnpm run build` | Vite + Nitro build | Yes |
| Sync Worker secrets | Uploads only the secrets that are configured | Yes |
| `cloudflare/wrangler-action` | `wrangler deploy --name drshreyasorthopedic` | Yes |

Notes:

- **Lint is deliberately not a gate.** The repo currently has ~1100 Prettier
  formatting violations inherited from generated code. Gating on `pnpm lint`
  would block every deploy. Run `pnpm format` if you want to clear them.
- **`concurrency: deploy-cloudflare`** with `cancel-in-progress: false` means
  overlapping pushes queue rather than racing each other to Cloudflare.
- **`WORKER_NAME` must not change.** The custom domain is bound to the Worker
  named `drshreyasorthopedic`. Renaming it creates a *new, empty* Worker and
  `drshreyas.com` goes dead. Nitro would otherwise auto-generate a name from the
  repo slug, which is why `--name` is passed explicitly.

### Why secrets are synced conditionally

`wrangler-action`'s built-in `secrets:` input uploads **every** name you list,
including ones whose environment variable is empty. An unset GitHub secret would
therefore overwrite a working Worker secret with an empty string on every
deploy. The workflow instead filters to non-empty values and skips the upload
entirely when nothing is configured, leaving existing Worker secrets untouched.

---

## 4. Configuration

### Build-time vs runtime — the important distinction

| Kind | Prefix | Where it must be set | Visibility |
| --- | --- | --- | --- |
| Build-time | `VITE_*` | GitHub Actions secrets (used during `pnpm run build`) | **Inlined into the public browser bundle** |
| Runtime | no prefix | Cloudflare Worker secrets | Server-only, never shipped to the browser |

> **Never** give a secret a `VITE_` prefix. Vite substitutes `VITE_*` values into
> the client bundle at build time, which would publish the secret to every
> visitor.

### GitHub Actions secrets

Repository → **Settings → Secrets and variables → Actions**.

| Secret | Required | Purpose |
| --- | --- | --- |
| `CLOUDFLARE_API_TOKEN` | **Yes** | Authenticates the deploy |
| `CLOUDFLARE_ACCOUNT_ID` | **Yes** | Target Cloudflare account |
| `VITE_SUPABASE_URL` | **Yes** | Supabase URL, inlined into the client bundle |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | **Yes** | Publishable key (public by design) |
| `SUPABASE_URL` | Yes | Same URL, for server code |
| `SUPABASE_PUBLISHABLE_KEY` | Yes | Same key, for server code |
| `SUPABASE_SERVICE_ROLE_KEY` | For booking | Bypasses RLS; required by the booking RPC |
| `TWILIO_ACCOUNT_SID` | For OTP | Twilio Verify |
| `TWILIO_AUTH_TOKEN` | For OTP | Twilio Verify |
| `TWILIO_VERIFY_SERVICE_SID` | For OTP | Twilio Verify |

Optional repository **variable** (not a secret):
`VITE_PATIENT_MANAGE_ENABLED` — set to `true` only once Twilio is fully
configured and tested. Defaults to `false`.

### Creating the Cloudflare API token

1. https://dash.cloudflare.com/profile/api-tokens → **Create Token**
2. Use the **"Edit Cloudflare Workers"** template
3. **Account Resources:** include your account
4. **Zone Resources:** include `drshreyas.com`
5. Create, copy the token, and store it as `CLOUDFLARE_API_TOKEN`

The token is shown only once. If lost, roll it and update the secret.

---

## 5. Worker runtime secrets

Worker secrets **persist across deployments** — they are stored on the Worker,
not in the bundle. CI re-syncs them only when the matching GitHub secret is set.

Set them manually (you are prompted for the value, so it never lands in shell
history):

```sh
npx wrangler@4 secret put SUPABASE_SERVICE_ROLE_KEY --name drshreyasorthopedic
npx wrangler@4 secret list --name drshreyasorthopedic
```

Required at runtime:

| Secret | Needed for |
| --- | --- |
| `SUPABASE_URL` | All server-side Supabase access |
| `SUPABASE_PUBLISHABLE_KEY` | Auth middleware |
| `SUPABASE_SERVICE_ROLE_KEY` | Booking, patient sessions, appointment management |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_VERIFY_SERVICE_SID` | Patient OTP |

Without `SUPABASE_SERVICE_ROLE_KEY` the public pages still work, but **booking
fails** — `book_clinic_appointment` is granted to `service_role` only.

Without the Twilio values the OTP endpoint **fails closed** by design: it throws
`"SMS verification is not configured"` rather than degrading to something
insecure.

---

## 6. Custom domain

The domain is attached as a **Workers Custom Domain**, not a DNS record you
manage by hand. Cloudflare creates the DNS entry and provisions the certificate
automatically.

Cloudflare dashboard → **Workers & Pages → `drshreyasorthopedic` → Settings →
Domains & Routes → Add → Custom domain** → enter `drshreyas.com`, repeat for
`www.drshreyas.com`.

> **Do not** add an `A` record pointing at Lovable's IP (`185.158.133.1`). That
> is for Lovable-hosted sites and conflicts with Workers routing. A Workers
> Custom Domain is proxied (orange cloud) and needs no manual record.

Certificate issuance takes a few minutes; a `525`/`526` or connection reset
immediately after attaching is normal and resolves on its own.

### After changing the domain

1. `src/lib/seo.ts` → `SITE_URL`
2. `src/routes/sitemap[.]xml.ts` → `BASE_URL`
3. `public/robots.txt` → `Sitemap:` line
4. Supabase → **Authentication → URL Configuration** → Site URL and Redirect
   URLs (`https://drshreyas.com/**`)

---

## 7. Manual deploy

Normally unnecessary — push to `main` instead. For an emergency deploy:

```sh
pnpm install --frozen-lockfile

# VITE_* values are needed at BUILD time
VITE_SUPABASE_URL="https://<project>.supabase.co" \
VITE_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..." \
VITE_PATIENT_MANAGE_ENABLED=false \
pnpm run build

npx wrangler@4 login
npx wrangler@4 deploy --name drshreyasorthopedic
```

Verify without deploying:

```sh
npx wrangler@4 deploy --dry-run   # bundles only
npx wrangler@4 dev                # run the built Worker locally
```

---

## 8. Rollback

Cloudflare keeps previous versions of the Worker.

```sh
npx wrangler@4 deployments list --name drshreyasorthopedic
npx wrangler@4 rollback --name drshreyasorthopedic
```

Rollback restores the **code**, not secrets or database state. A bad migration
must be corrected with a new migration.

---

## 9. Verifying a deploy

```sh
curl -s -o /dev/null -w "%{http_code}\n" https://drshreyas.com/
curl -s https://drshreyas.com/sitemap.xml | grep -c "<loc>"
curl -s https://drshreyas.com/robots.txt
```

Worth checking after a content or routing change:

- Every URL in `sitemap.xml` returns `200`
- No image 404s (see the troubleshooting note on Lovable CDN assets below)
- `<link rel="canonical">` points at `drshreyas.com`, not `*.lovable.app`

Live logs:

```sh
npx wrangler@4 tail --name drshreyasorthopedic
```

---

## 10. Troubleshooting

**Deploy step fails with an authentication error**
`CLOUDFLARE_API_TOKEN` is missing, expired, or lacks Workers Scripts:Edit on the
right account. Re-create it from the "Edit Cloudflare Workers" template.

**"You need to register a workers.dev subdomain before publishing"**
The account has no `workers.dev` subdomain yet. Register one at
**Workers & Pages → Overview**, or attach a custom domain/route instead.

**Booking returns a 500**
`SUPABASE_SERVICE_ROLE_KEY` is not set on the Worker. Confirm with
`npx wrangler@4 secret list --name drshreyasorthopedic`.

**Images 404 in production but work in the Lovable preview**
Assets referenced through `src/assets/*.asset.json` resolve to
`/__l5e/assets-v1/...`, a path served **only by Lovable's hosting**. Import the
image normally instead so Vite bundles and hashes it:

```ts
import clinicFrontage from "@/assets/clinic-frontage.jpg";   // ✅ bundled
import asset from "@/assets/clinic-frontage.png.asset.json"; // ❌ 404 off-Lovable
```

**`vite build` fails on Windows with a path assertion**
A known Windows-only bug in `@lovable.dev/mcp-js` (`assertContains` compares a
normalized parent path against a backslash child path). It does not affect Linux
CI or the Lovable preview. Build in WSL, or deploy via CI.

**`pnpm install` resolves a private registry**
You used `bun.lock`. Delete `node_modules` and install with pnpm.

---

## 11. Security notes

- The `sb_publishable_...` key is **public by design** — it is shipped in the
  browser bundle and protected by Row-Level Security. Exposure is not an
  incident.
- The `service_role` key bypasses RLS entirely and must exist **only** as a
  Worker secret / GitHub secret. Never commit it, never prefix it `VITE_`.
- Staff routes (`/doctor`, `/reception`, `/settings`) return `200` when logged
  out. This is expected: they are client-rendered (`ssr: false`), so the server
  returns an empty shell and the redirect happens in the browser. The real
  security boundary is RLS in Postgres, not the route guard.
