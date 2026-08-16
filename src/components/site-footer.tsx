import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Stethoscope, Youtube, Twitter } from "lucide-react";
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
    { url: c.instagram_url, Icon: Instagram, label: "Instagram" },
    { url: c.facebook_url, Icon: Facebook, label: "Facebook" },
    { url: c.youtube_url, Icon: Youtube, label: "YouTube" },
    { url: c.twitter_url, Icon: Twitter, label: "X" },
    { url: c.linkedin_url, Icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Stethoscope className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-semibold">{clinic.clinic_name}</span>
          </div>
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

        <div>
          <h4 className="text-sm font-semibold">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {clinic.phone && <li>Phone: {clinic.phone}</li>}
            {clinic.whatsapp && <li>WhatsApp: {clinic.whatsapp}</li>}
            {clinic.email && <li>Email: {clinic.email}</li>}
            {clinic.address && <li>{clinic.address}</li>}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Working hours</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex justify-between gap-4"><span>Monday – Saturday</span><span className="font-medium text-foreground">5:00 PM – 9:00 PM</span></li>
            <li className="flex justify-between gap-4"><span>Sunday</span><span className="font-medium text-foreground">Closed</span></li>
          </ul>
          <h4 className="mt-6 text-sm font-semibold">Visiting Consultant at</h4>
          <p className="mt-2 text-sm text-muted-foreground">
            JSS Hospital, Department of Orthopaedics
            <br />
            Mahatma Gandhi Road, Agrahara, Mysuru, Karnataka 570004
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=JSS+Hospital+Mysuru"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-sm font-semibold text-accent hover:underline"
          >
            Open in Maps →
          </a>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Quick links</h4>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <li><Link to="/about-doctor" className="hover:text-foreground">About the Doctor</Link></li>
            <li><Link to="/specialties" className="hover:text-foreground">Area of Specialties</Link></li>
            <li><Link to="/gallery" className="hover:text-foreground">Gallery</Link></li>
            <li><Link to="/awards" className="hover:text-foreground">Awards</Link></li>
            <li><Link to="/media-coverage" className="hover:text-foreground">Media Coverage</Link></li>
            <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
            <li><Link to="/reviews" className="hover:text-foreground">Reviews</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact Us</Link></li>
            <li><Link to="/book" className="hover:text-foreground">Book appointment</Link></li>
            <li><Link to="/manage" className="hover:text-foreground">Manage appointment</Link></li>
            <li><Link to="/auth" className="hover:text-foreground">Staff login</Link></li>
          </ul>
        </div>

      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {clinic.clinic_name}. All rights reserved.
      </div>
    </footer>
  );
}
