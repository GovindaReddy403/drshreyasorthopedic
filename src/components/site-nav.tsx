import { Link } from "@tanstack/react-router";
import { CalendarDays, ChevronDown, Menu, Phone, Stethoscope } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { label: "Home", to: "/" as const },
  { label: "About the Doctor", to: "/about-doctor" as const },
  { label: "Area of Specialties", to: "/specialties" as const },
  { label: "Gallery", to: "/gallery" as const },
  { label: "Awards", to: "/awards" as const },
  { label: "Media", to: "/media-coverage" as const },
  { label: "Videos", to: "/videos" as const },
  { label: "Reviews", to: "/reviews" as const },
  { label: "Blog", to: "/blog" as const },
  { label: "Contact Us", to: "/contact" as const },
];

const MEGA_COLUMNS = [
  {
    heading: "Treatments & Procedures",
    items: [
      { slug: "joint-replacement", label: "Joint Replacement Surgery" },
      { slug: "ortho-biologics", label: "Ortho Biologics (PRP)" },
      { slug: "trauma-and-fractures", label: "Fracture & Trauma Care" },
    ],
  },
  {
    heading: "Knee Procedures",
    items: [
      { slug: "knee-arthroscopy", label: "Knee Arthroscopy" },
      { slug: "knee-arthroscopy", label: "ACL / PCL Reconstruction" },
      { slug: "knee-arthroscopy", label: "Meniscus Repair" },
    ],
  },
  {
    heading: "Shoulder Procedures",
    items: [
      { slug: "shoulder-arthroscopy", label: "Shoulder Arthroscopy" },
      { slug: "shoulder-arthroscopy", label: "Rotator Cuff Repair" },
      { slug: "shoulder-arthroscopy", label: "Recurrent Dislocation" },
    ],
  },
  {
    heading: "Foot, Ankle & Sports",
    items: [
      { slug: "foot-and-ankle", label: "Foot & Ankle Surgery" },
      { slug: "sports-medicine-rehab", label: "Sports Medicine & Rehab" },
      { slug: "sports-medicine-rehab", label: "Return-to-Play Program" },
    ],
  },
];

export function SiteNav({
  clinicName = "Dr. Shreyas Orthopedic Clinic",
  phone,
}: {
  clinicName?: string;
  phone?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const telHref = phone ? `tel:${phone.replace(/\s/g, "")}` : undefined;

  return (
    <header className="sticky top-0 z-40 w-full bg-hero-gradient/95 backdrop-blur">
      {/* Utility bar (desktop) */}
      <div className="hidden bg-primary text-primary-foreground lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-sm sm:px-6 lg:px-8">
          {phone ? (
            <a href={telHref} className="inline-flex items-center gap-2 font-medium">
              <Phone className="h-3.5 w-3.5" /> {phone}
            </a>
          ) : (
            <span className="text-xs uppercase tracking-widest opacity-80">
              Mon–Sat · 5:00 PM – 9:00 PM
            </span>
          )}
          <Link to="/book">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-4 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary-foreground/90">
              <CalendarDays className="h-3.5 w-3.5" /> Book An Appointment
            </span>
          </Link>
        </div>
      </div>

      {/* Brand row */}

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" hash="top" className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Stethoscope className="h-6 w-6" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-2xl lg:text-3xl">
              {clinicName}
            </span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.3em] text-accent sm:text-xs">
              Bone &amp; Joint Care
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {phone && (
            <a
              href={telHref}
              className="hidden items-center gap-2 font-display text-lg font-bold text-primary sm:inline-flex"
            >
              <Phone className="h-4 w-4" /> {phone}
            </a>
          )}
          <Link to="/book" className="hidden sm:block">
            <Button size="lg" className="gap-2 rounded-full">
              <CalendarDays className="h-4 w-4" /> Book An Appointment
            </Button>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-sm hover:bg-muted"
                  >
                    {l.label}
                  </Link>
                ))}

                <Link to="/book" onClick={() => setOpen(false)} className="mt-2">
                  <Button className="w-full rounded-full">Book appointment</Button>
                </Link>
                <Link to="/manage" onClick={() => setOpen(false)} className="mt-2">
                  <Button variant="outline" className="w-full rounded-full">
                    Manage appointment
                  </Button>
                </Link>
                <Link to="/auth" onClick={() => setOpen(false)} className="mt-2">
                  <Button variant="ghost" className="w-full">
                    Staff login
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Nav row */}
      <nav className="hidden border-t border-primary/10 lg:block">
        <div className="group/mega mx-auto flex max-w-7xl items-center justify-center gap-0 px-4 sm:px-6 lg:px-8">
          {links.map((l, i) =>
            l.to === "/specialties" ? (
              <div key={l.to} className="group/item relative border-l border-primary/15">
                <Link
                  to={l.to}
                  activeProps={{ className: "text-primary" }}
                  className="flex items-center gap-1 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-foreground/75 transition-colors hover:text-primary"
                >
                  {l.label} <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                <div className="invisible absolute left-1/2 top-full z-50 w-[min(1100px,92vw)] -translate-x-1/2 opacity-0 shadow-[var(--shadow-soft)] transition-opacity group-hover/item:visible group-hover/item:opacity-100">
                  <div className="grid grid-cols-4 gap-6 rounded-b-2xl border border-border/60 bg-card p-7">
                    {MEGA_COLUMNS.map((col) => (
                      <div key={col.heading}>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
                          {col.heading}
                        </p>
                        <ul className="mt-3 space-y-2">
                          {col.items.map((it) => (
                            <li key={it.label}>
                              <Link
                                to="/specialties/$slug"
                                params={{ slug: it.slug }}
                                className="text-sm text-muted-foreground hover:text-primary"
                              >
                                {it.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="col-span-4 border-t border-border/60 pt-4">
                      <Link to="/specialties">
                        <Button size="sm" variant="outline" className="rounded-full">
                          More Procedures
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                activeProps={{ className: "text-primary" }}
                className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider text-foreground/75 transition-colors hover:text-primary ${
                  i > 0 ? "border-l border-primary/15" : ""
                }`}
              >
                {l.label}
              </Link>
            ),
          )}

          <Link
            to="/manage"
            className="border-l border-primary/15 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-foreground/75 hover:text-primary"
          >
            Manage
          </Link>
          <Link
            to="/auth"
            className="border-l border-primary/15 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-foreground/75 hover:text-primary"
          >
            Staff Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
