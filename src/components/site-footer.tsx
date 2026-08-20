import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
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

const HOSPITALS = [
  {
    name: "JSS Hospital, Department of Orthopaedics",
    address: "Mahatma Gandhi Road, Agrahara, Mysuru, Karnataka 570004",
    maps: "https://www.google.com/maps/search/?api=1&query=JSS+Hospital+Mysuru",
  },
];

export function SiteFooter({ clinic }: { clinic: ClinicSettings }) {
  const c = clinic as SocialClinic;
  const [openHospital, setOpenHospital] = useState<string | null>(HOSPITALS[0].name);
  const socials = [
    { url: c.facebook_url, Icon: Facebook, label: "Facebook" },
    { url: c.instagram_url, Icon: Instagram, label: "Instagram" },
    { url: c.twitter_url, Icon: Twitter, label: "X" },
    { url: c.linkedin_url, Icon: Linkedin, label: "LinkedIn" },
    { url: c.youtube_url, Icon: Youtube, label: "YouTube" },
  ];
  const telHref = clinic.phone ? `tel:${clinic.phone.replace(/\s/g, "")}` : undefined;

  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Column 1 — logo, doctor, socials */}
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Stethoscope className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-semibold">{clinic.clinic_name}</span>
          </div>
          <p className="mt-3 font-display text-base font-semibold text-foreground">Dr. Shreyas M.J</p>
          <p className="text-sm text-muted-foreground">
            MBBS, MS (Ortho) — Arthroscopy, Sports Medicine &amp; Joint Replacement Surgeon
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

        {/* Column 2 — working hours + phone + CTA */}
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

        {/* Column 3 — clinic address */}
        <div>
          <h4 className="text-sm font-semibold">Visit Our Clinic</h4>
          <p className="mt-3 flex gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{clinic.address}</span>
          </p>
          <a
            href={clinic.google_maps_url ?? "https://maps.app.goo.gl/6WGqUa5tk2gTi1JD7"}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-accent hover:underline"
          >
            Open in Maps →
          </a>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <li><Link to="/about-doctor" className="hover:text-foreground">About the Doctor</Link></li>
            <li><Link to="/specialties" className="hover:text-foreground">Specialties</Link></li>
            <li><Link to="/conditions" className="hover:text-foreground">Conditions</Link></li>
            <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
            <li><Link to="/manage" className="hover:text-foreground">Manage appointment</Link></li>
            <li><Link to="/auth" className="hover:text-foreground">Staff login</Link></li>
          </ul>
        </div>

        {/* Column 4 — visiting consultant, expandable */}
        <div>
          <h4 className="text-sm font-semibold">Visiting Consultant at</h4>
          <div className="mt-3 divide-y divide-border/60 rounded-xl border border-border/60 bg-card/60">
            {HOSPITALS.map((h) => {
              const open = openHospital === h.name;
              return (
                <div key={h.name}>
                  <button
                    type="button"
                    onClick={() => setOpenHospital(open ? null : h.name)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left text-sm font-medium text-foreground"
                  >
                    {h.name}
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && (
                    <div className="px-3 pb-3 text-sm text-muted-foreground">
                      <p>{h.address}</p>
                      <a
                        href={h.maps}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block text-sm font-semibold text-accent hover:underline"
                      >
                        Open in Maps →
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <li><Link to="/about-doctor" className="hover:text-foreground">About the Doctor</Link></li>
            <li><Link to="/specialties" className="hover:text-foreground">Specialties</Link></li>
            <li><Link to="/conditions" className="hover:text-foreground">Conditions</Link></li>
            <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
            <li><Link to="/manage" className="hover:text-foreground">Manage appointment</Link></li>
            <li><Link to="/auth" className="hover:text-foreground">Staff login</Link></li>
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
