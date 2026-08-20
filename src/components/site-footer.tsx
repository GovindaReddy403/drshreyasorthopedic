import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  Stethoscope,
  Twitter,
  Youtube,
} from "lucide-react";
import type { ClinicSettings } from "@/lib/clinic";

type SocialClinic = ClinicSettings & {
  instagram_url?: string | null;
  facebook_url?: string | null;
  youtube_url?: string | null;
  twitter_url?: string | null;
  linkedin_url?: string | null;
};

export function SiteFooter({ clinic }: { clinic: ClinicSettings }) {
  const c = clinic as SocialClinic;
  const socials = [
    { url: c.facebook_url, Icon: Facebook, label: "Facebook" },
    { url: c.instagram_url, Icon: Instagram, label: "Instagram" },
    { url: c.twitter_url, Icon: Twitter, label: "X" },
    { url: c.linkedin_url, Icon: Linkedin, label: "LinkedIn" },
    { url: c.youtube_url, Icon: Youtube, label: "YouTube" },
  ];
  const telHref = clinic.phone ? `tel:${clinic.phone.replace(/\s/g, "")}` : undefined;
  const quickLinks = [
    { to: "/about-doctor", label: "About the Doctor" },
    { to: "/specialties", label: "Specialties" },
    { to: "/conditions", label: "Conditions" },
    { to: "/blog", label: "Blog" },
    { to: "/manage", label: "Manage Appointment" },
    { to: "/auth", label: "Staff Login" },
  ];

  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        {/* Column 1 — brand, doctor, socials */}
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Stethoscope className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-semibold">{clinic.clinic_name}</span>
          </div>
          <p className="mt-3 font-display text-base font-semibold text-foreground">Dr. Shreyas M.J</p>
          <p className="text-sm text-muted-foreground">
            MBBS, MS (Ortho) — Arthroscopy, Sports Medicine & Joint Replacement Surgeon
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{clinic.tagline}</p>
          <div className="mt-4 flex gap-2">
            {socials.map(({ url, Icon, label }) =>
              url ? (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ) : (
                <span
                  key={label}
                  aria-label={`${label} (link not set)`}
                  title={`${label} — not configured`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/60 text-muted-foreground/60"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ),
            )}
          </div>
        </div>

        {/* Column 2 — working hours + contact + CTA */}
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold">
            <Clock className="h-4 w-4 text-accent" /> Working Hours
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex justify-between gap-4">
              <span>Monday – Saturday</span>
              <span className="font-medium text-foreground">5:00 PM – 9:00 PM</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Sunday</span>
              <span className="font-medium text-foreground">Closed</span>
            </li>
          </ul>
          {clinic.phone && (
            <a
              href={telHref}
              className="mt-4 inline-flex items-center gap-2 text-base font-semibold text-foreground hover:text-accent"
            >
              <Phone className="h-4 w-4" /> {clinic.phone}
            </a>
          )}
          {clinic.email && <p className="mt-1 text-sm text-muted-foreground">{clinic.email}</p>}
          <Link to="/book" className="mt-4 block">
            <span className="inline-flex items-center gap-2 rounded-[36px] bg-[#000B43] px-6 py-3 text-[13px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90">
              <CalendarDays className="h-4 w-4" /> Book An Appointment
            </span>
          </Link>
        </div>

        {/* Column 3 — quick links */}
        <div>
          <h4 className="text-sm font-semibold">Quick Links</h4>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {clinic.clinic_name}. All rights reserved.</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <Link to="/contact" className="hover:text-foreground">Contact Us</Link>
            <Link to="/reviews" className="hover:text-foreground">Reviews</Link>
            <Link to="/gallery" className="hover:text-foreground">Gallery</Link>
            <a href="/sitemap.xml" className="hover:text-foreground">Sitemap</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
