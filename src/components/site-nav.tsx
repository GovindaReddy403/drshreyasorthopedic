import { Link } from "@tanstack/react-router";
import { CalendarDays, Menu, Phone, Stethoscope } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { label: "Home", to: "/" as const },
  { label: "About the Doctor", to: "/about-doctor" as const },
  { label: "Area of Specialties", to: "/specialties" as const },
  { label: "Gallery", to: "/gallery" as const },
  { label: "Reviews", to: "/reviews" as const },
  { label: "Contact Us", to: "/contact" as const },
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
      {/* Brand row */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" hash="top" className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Stethoscope className="h-6 w-6" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-bold tracking-tight text-primary sm:text-xl">
              {clinicName}
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
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
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-0 px-4 sm:px-6 lg:px-8">
          {links.map((l, i) => (
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
          ))}
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
