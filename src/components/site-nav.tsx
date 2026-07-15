import { Link } from "@tanstack/react-router";
import { Menu, Phone, Stethoscope } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { label: "Home", hash: "top" },
  { label: "About", hash: "about" },
  { label: "Treatments", hash: "treatments" },
  { label: "Gallery", hash: "gallery" },
  { label: "Reviews", hash: "testimonials" },
  { label: "Contact", hash: "contact" },
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
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/90 backdrop-blur">
      {phone && (
        <div className="bg-primary text-primary-foreground">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1.5 text-xs sm:px-6 lg:px-8">
            <span className="hidden sm:inline">Bone &amp; Joint Care · Mon–Sat 5:00 PM – 9:00 PM</span>
            <a href={telHref} className="inline-flex items-center gap-1.5 font-semibold">
              <Phone className="h-3.5 w-3.5" /> {phone}
            </a>
          </div>
        </div>
      )}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" hash="top" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Stethoscope className="h-5 w-5" />
          </span>
          <span className="font-display text-base font-semibold tracking-tight sm:text-lg">
            {clinicName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.hash}
              to="/"
              hash={l.hash}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link to="/manage">
            <Button variant="ghost" size="sm">
              Manage
            </Button>
          </Link>
          <Link to="/auth">
            <Button variant="ghost" size="sm">
              Staff login
            </Button>
          </Link>
          <Link to="/book">
            <Button size="sm" className="ml-2">
              Book Appointment
            </Button>
          </Link>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="mt-8 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.hash}
                  to="/"
                  hash={l.hash}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm hover:bg-muted"
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/manage" onClick={() => setOpen(false)} className="mt-2">
                <Button variant="outline" className="w-full">
                  Manage appointment
                </Button>
              </Link>
              <Link to="/auth" onClick={() => setOpen(false)} className="mt-2">
                <Button variant="ghost" className="w-full">
                  Staff login
                </Button>
              </Link>
              <Link to="/book" onClick={() => setOpen(false)} className="mt-2">
                <Button className="w-full">Book appointment</Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
