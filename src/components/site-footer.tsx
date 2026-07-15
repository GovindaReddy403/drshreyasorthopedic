import { Link } from "@tanstack/react-router";
import { Stethoscope } from "lucide-react";
import type { ClinicSettings } from "@/lib/clinic";

export function SiteFooter({ clinic }: { clinic: ClinicSettings }) {
  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Stethoscope className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-semibold">{clinic.clinic_name}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{clinic.tagline}</p>
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
          <h4 className="text-sm font-semibold">Quick links</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/book" className="hover:text-foreground">
                Book appointment
              </Link>
            </li>
            <li>
              <Link to="/manage" className="hover:text-foreground">
                Manage appointment
              </Link>
            </li>
            <li>
              <Link to="/auth" className="hover:text-foreground">
                Staff login
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {clinic.clinic_name}. All rights reserved.
      </div>
    </footer>
  );
}
