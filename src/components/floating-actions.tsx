import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin, MessageCircle, Phone } from "lucide-react";

export function FloatingActions({
  phone,
  whatsapp,
  mapsUrl,
}: {
  phone?: string | null;
  whatsapp?: string | null;
  mapsUrl?: string | null;
}) {
  const tel = phone ? `tel:${phone.replace(/\s/g, "")}` : undefined;
  const wa = whatsapp ? `https://wa.me/91${whatsapp.replace(/\D/g, "")}` : undefined;

  const items = [
    { label: "Appointment", icon: CalendarDays, to: "/book" as const },
    { label: "Locate us", icon: MapPin, href: mapsUrl ?? undefined },
    { label: "Call", icon: Phone, href: tel },
    { label: "WhatsApp", icon: MessageCircle, href: wa },
  ].filter((i) => i.to || i.href);

  return (
    <>
      {/* Desktop right rail */}
      <div className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col overflow-hidden rounded-l-xl shadow-[var(--shadow-soft)] lg:flex">
        {items.map(({ label, icon: Icon, to, href }) =>
          to ? (
            <Link
              key={label}
              to={to}
              className="flex w-20 flex-col items-center gap-1 bg-primary px-2 py-3 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-accent"
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ) : (
            <a
              key={label}
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex w-20 flex-col items-center gap-1 bg-primary px-2 py-3 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-accent"
            >
              <Icon className="h-5 w-5" />
              {label}
            </a>
          ),
        )}
      </div>

      {/* Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-primary text-primary-foreground lg:hidden">
        {items.map(({ label, icon: Icon, to, href }) =>
          to ? (
            <Link
              key={label}
              to={to}
              className="flex flex-col items-center gap-1 py-2 text-[10px] font-semibold uppercase"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ) : (
            <a
              key={label}
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex flex-col items-center gap-1 py-2 text-[10px] font-semibold uppercase"
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ),
        )}
      </div>
    </>
  );
}
