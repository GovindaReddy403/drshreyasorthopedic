import { Link } from "@tanstack/react-router";
import { Menu, Stethoscope } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { to: "/", label: "Home", hash: "top" },
  { to: "/", label: "About", hash: "about" },
  { to: "/", label: "Treatments", hash: "treatments" },
  { to: "/", label: "Gallery", hash: "gallery" },
  { to: "/", label: "Reviews", hash: "testimonials" },
  { to: "/", label: "Contact", hash: "contact" },
];

export function SiteNav({ clinicName = "Meridian" }: { clinicName?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Stethoscope className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">{clinicName}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.hash}
              href={`#${l.hash}`}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Link to="/manage">
            <Button variant="ghost" size="sm">
              Manage
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
                <a
                  key={l.hash}
                  href={`#${l.hash}`}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm hover:bg-muted"
                >
                  {l.label}
                </a>
              ))}
              <Link to="/manage" onClick={() => setOpen(false)} className="mt-2">
                <Button variant="outline" className="w-full">
                  Manage appointment
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
