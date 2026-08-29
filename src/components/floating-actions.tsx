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
    { label: "Book Appointment", icon: CalendarDays, to: "/book" as const },
    { label: "Locate us", icon: MapPin, href: mapsUrl ?? undefined },
    { label: "Call", icon: Phone, href: tel },
    { label: "WhatsApp", icon: MessageCircle, href: wa },
  ].filter((i) => i.to || i.href);

  const fabClass =
    "group relative flex h-12 w-12 items-center justify-center rounded-full text-primary-foreground shadow-[var(--shadow-glow)] ring-1 ring-white/20 transition-all duration-200 ease-out hover:-translate-y-1 active:translate-y-0 active:scale-90";

  return (
    <>
      {/* Desktop — floating action stack, bottom-right */}
      <div className="fixed bottom-6 right-5 z-40 hidden animate-in fade-in slide-in-from-right-3 flex-col items-end gap-3 duration-500 lg:flex">
        {items.map(({ label, icon: Icon, to, href }, index) =>
          to ? (
            <Link
              key={label}
              to={to}
              style={{ transitionDelay: `${index * 45}ms` }}
              className={`${fabClass} ${
                index === 0
                  ? "h-14 w-14 bg-accent text-accent-foreground ring-accent-foreground/20"
                  : "bg-primary hover:bg-accent hover:text-accent-foreground"
              }`}
              aria-label={label}
            >
              <Icon className="h-5 w-5" />
              <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-border/60 bg-background px-3 py-1.5 text-xs font-semibold text-foreground opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
                {label}
              </span>
            </Link>
          ) : (
            <a
              key={label}
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              style={{ transitionDelay: `${index * 45}ms` }}
              className={`${fabClass} ${
                index === 0
                  ? "h-14 w-14 bg-accent text-accent-foreground ring-accent-foreground/20"
                  : "bg-primary hover:bg-accent hover:text-accent-foreground"
              }`}
              aria-label={label}
            >
              <Icon className="h-5 w-5" />
              <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-border/60 bg-background px-3 py-1.5 text-xs font-semibold text-foreground opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
                {label}
              </span>
            </a>
          ),
        )}
      </div>

      {/* Mobile — floating rounded dock with safe-area inset */}
      <div className="fixed inset-x-0 bottom-0 z-40 animate-in fade-in slide-in-from-bottom-4 pb-[env(safe-area-inset-bottom)] duration-500 lg:hidden">
        <div className="mx-3 mb-3 grid grid-cols-4 gap-0.5 overflow-hidden rounded-2xl border border-border/60 bg-primary/95 p-1.5 text-primary-foreground shadow-[var(--shadow-soft)] backdrop-blur">
          {items.map(({ label, icon: Icon, to, href }, index) =>
            to ? (
              <Link
                key={label}
                to={to}
                className={`flex flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-[10px] font-semibold transition-colors active:scale-95 ${
                  index === 0
                    ? "bg-accent text-accent-foreground"
                    : "text-primary-foreground/90 hover:bg-white/10"
                }`}
              >
                <Icon className="h-5 w-5" />
                {index === 0 ? "Book" : label}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={`flex flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-[10px] font-semibold transition-colors active:scale-95 ${
                  index === 0
                    ? "bg-accent text-accent-foreground"
                    : "text-primary-foreground/90 hover:bg-white/10"
                }`}
              >
                <Icon className="h-5 w-5" />
                {index === 0 ? "Book" : label}
              </a>
            ),
          )}
        </div>
      </div>
    </>
  );
}