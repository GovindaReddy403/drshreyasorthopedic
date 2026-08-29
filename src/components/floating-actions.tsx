import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPinned, PhoneCall } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

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
    { label: "Locate us", icon: MapPinned, href: mapsUrl ?? undefined },
    { label: "Call", icon: PhoneCall, href: tel },
    { label: "WhatsApp", icon: WhatsAppIcon, href: wa },
  ].filter((i) => i.to || i.href);

  const fabBase =
    "group relative flex items-center justify-center rounded-full transition-all duration-200 ease-out hover:-translate-y-1 active:translate-y-0 active:scale-90";

  const fabStyle = (label: string) => {
    switch (label) {
      case "Book Appointment":
        return "h-14 w-14 bg-[linear-gradient(135deg,#f59e0b,#ea580c)] text-white shadow-[0_12px_30px_-8px_rgba(234,88,12,0.6)] ring-2 ring-white";
      case "WhatsApp":
        return "h-12 w-12 bg-[#25d366] text-white shadow-[0_8px_24px_-8px_rgba(37,211,102,0.7)] ring-2 ring-white/80 hover:bg-[#1ebe57]";
      case "Locate us":
        return "h-12 w-12 bg-[#0ea5e9] text-white shadow-[0_8px_24px_-8px_rgba(14,165,233,0.7)] ring-2 ring-white/80 hover:bg-[#0284c7]";
      default:
        return "h-12 w-12 bg-[#6366f1] text-white shadow-[0_8px_24px_-8px_rgba(99,102,241,0.7)] ring-2 ring-white/80 hover:bg-[#4f46e5]";
    }
  };

  return (
    <>
      {/* Desktop — floating action stack, bottom-right */}
      <div className="fixed bottom-6 right-5 z-40 hidden animate-in fade-in slide-in-from-right-3 flex-col items-end gap-3 duration-500 lg:flex">
        {items.map(({ label, icon: Icon, to, href }, index) => {
          const iconClass = `${fabBase} ${fabStyle(label)}`;
          const content = (
            <>
              <Icon className={label === "Book Appointment" ? "h-6 w-6" : "h-5 w-5"} />
              <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-border/60 bg-background px-3 py-1.5 text-xs font-semibold text-foreground opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
                {label}
              </span>
            </>
          );
          return to ? (
            <Link
              key={label}
              to={to}
              aria-label={label}
              style={{ transitionDelay: `${index * 45}ms` }}
              className={iconClass}
            >
              {content}
            </Link>
          ) : (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              style={{ transitionDelay: `${index * 45}ms` }}
              className={iconClass}
            >
              {content}
            </a>
          );
        })}
      </div>

      {/* Mobile — floating rounded dock with safe-area inset */}
      <div className="fixed inset-x-0 bottom-0 z-40 animate-in fade-in slide-in-from-bottom-4 pb-[env(safe-area-inset-bottom)] duration-500 lg:hidden">
        <div className="mx-3 mb-3 grid grid-cols-4 gap-0.5 overflow-hidden rounded-2xl bg-[#00154d] p-1.5 text-white shadow-[0_16px_40px_-12px_rgba(0,21,77,0.55)] ring-1 ring-white/10">
          {items.map(({ label, icon: Icon, to, href }, index) => {
            const segmentClass =
              index === 0
                ? "flex flex-col items-center justify-center gap-0.5 rounded-xl bg-[linear-gradient(135deg,#f59e0b,#ea580c)] py-2 text-[10px] font-bold text-white shadow-inner"
                : "flex flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-[10px] font-semibold text-white/90 transition-colors hover:bg-white/10 active:scale-95";
            const content = (
              <>
                <Icon
                  className={
                    label === "Book Appointment"
                      ? "h-6 w-6"
                      : label === "WhatsApp"
                        ? "h-5 w-5 text-[#25d366]"
                        : label === "Locate us"
                          ? "h-5 w-5 text-[#38bdf8]"
                          : "h-5 w-5 text-[#a5b4fc]"
                  }
                />
                {index === 0 ? "Book" : label}
              </>
            );
            return to ? (
              <Link key={label} to={to} className={segmentClass}>
                {content}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={segmentClass}
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}