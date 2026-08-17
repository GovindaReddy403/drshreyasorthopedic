import { Link } from "@tanstack/react-router";
import { CalendarDays, ChevronDown, List, Menu, Phone, Stethoscope } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { label: "Home", to: "/" as const },
  { label: "About Dr. Shreyas", to: "/about-doctor" as const },
  { label: "Area of Specialties", to: "/specialties" as const },
  { label: "Injuries & Conditions", to: "/conditions" as const },
  { label: "Media", to: "/media-coverage" as const },
  { label: "Gallery", to: "/gallery" as const },
  { label: "Blog", to: "/blog" as const },
  { label: "Contact Us", to: "/contact" as const },
];

const MEGA_COLUMNS = [
  {
    heading: "Treatments & Procedures",
    items: [
      { slug: "arthroscopic-surgery", label: "Arthroscopic Surgery" },
      { slug: "joint-replacement", label: "Joint Replacement Surgery" },
      { slug: "sports-medicine-solutions", label: "Sports Medicine Solutions" },
      { slug: "trauma-and-fractures", label: "Fracture & Trauma Care" },
      { slug: "ortho-biologics", label: "Ortho Biologics (PRP)" },
    ],
  },
  {
    heading: "Knee Procedures",
    items: [
      { slug: "knee-arthroscopy", label: "Knee Arthroscopy" },
      { slug: "knee-arthroscopy", label: "ACL / PCL Reconstruction" },
      { slug: "knee-arthroscopy", label: "Meniscus Repair" },
      { slug: "knee-arthroscopy", label: "Cartilage Repair" },
    ],
  },
  {
    heading: "Shoulder Procedures",
    items: [
      { slug: "shoulder-arthroscopy", label: "Shoulder Arthroscopy" },
      { slug: "shoulder-arthroscopy", label: "Rotator Cuff Repair" },
      { slug: "shoulder-arthroscopy", label: "Recurrent Dislocation" },
      { slug: "shoulder-arthroscopy", label: "SLAP / Bankart Repair" },
    ],
  },
  {
    heading: "Foot & Ankle",
    items: [
      { slug: "foot-and-ankle", label: "Foot & Ankle Surgery" },
      { slug: "foot-and-ankle", label: "Ankle Ligament Reconstruction" },
      { slug: "foot-and-ankle", label: "Achilles Tendon Repair" },
    ],
  },
  {
    heading: "Sports Medicine & Rehab",
    items: [
      { slug: "sports-medicine-rehab", label: "Sports Medicine & Rehab" },
      { slug: "sports-medicine-rehab", label: "Return-to-Play Program" },
      { slug: "ortho-biologics", label: "PRP & Biologics" },
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
    <header className="sticky top-0 z-40 w-full bg-[#dfeef4]">
      {/* Row 1 — Top bar: logo left, phone + Book button right */}
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
              Bone & Joint Care
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {phone && (
            <a
              href={telHref}
              className="hidden items-center gap-2 font-sans text-[20px] font-medium text-black sm:inline-flex"
            >
              <Phone className="h-5 w-5" /> {phone}
            </a>
          )}
          <Link to="/book" className="hidden sm:block">
            <span className="inline-flex items-center gap-2 rounded-[36px] bg-[#000B43] px-[30px] py-[15px] font-sans text-sm font-semibold text-white transition-opacity hover:opacity-90">
              <CalendarDays className="h-4 w-4" /> Book An Appointment
            </span>
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

      {/* Row 2 — Navigation bar: horizontal menu only */}
      <nav className="hidden lg:block">
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
                  <div className="grid grid-cols-5 gap-6 rounded-b-2xl border border-border/60 bg-[#EAF8FF] p-7">
                    {MEGA_COLUMNS.map((col) => (
                      <div key={col.heading} className="flex flex-col">
                        <p className="text-[15px] font-bold uppercase tracking-wider text-primary">
                          {col.heading}
                        </p>
                        <ul className="mt-3 space-y-2">
                          {col.items.map((it) => (
                            <li key={it.label}>
                              <Link
                                to="/specialties/$slug"
                                params={{ slug: it.slug }}
                                className="text-[15px] text-black transition-colors hover:text-[#eb6a56]"
                              >
                                {it.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link to="/specialties" className="mt-4 self-start">
                          <span className="inline-flex items-center gap-1.5 bg-[#eb6a56] px-3 py-1.5 text-xs font-semibold text-white">
                            <List className="h-3.5 w-3.5" /> More Procedures
                          </span>
                        </Link>
                      </div>
                    ))}
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
        </div>
      </nav>
    </header>
  );
}
