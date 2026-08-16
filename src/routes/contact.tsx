import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { PageHero, SectionHeader, CtaBand } from "@/components/site-sections";
import { clinicQO, hoursQO, GOOGLE_REVIEWS_URL } from "@/lib/queries";
import { WEEKDAY_LABELS, formatTime } from "@/lib/clinic";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Clinic Location | Dr. Shreyas Orthopedic Clinic, Mysuru" },
      {
        name: "description",
        content:
          "Visit Dr. Shreyas Orthopedic Clinic at Vivekananda Circle Road, Mysuru. Open Mon–Sat 5:00 PM to 9:00 PM. Call 86609 50443.",
      },
      { property: "og:title", content: "Contact Dr. Shreyas Orthopedic Clinic, Mysuru" },
      {
        property: "og:description",
        content: "Clinic address, timings, phone and WhatsApp for orthopaedic consultations in Mysuru.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(clinicQO),
      context.queryClient.ensureQueryData(hoursQO),
    ]);
  },
  component: ContactPage,
});

function ContactPage() {
  const { data: clinic } = useSuspenseQuery(clinicQO);
  const { data: hours } = useSuspenseQuery(hoursQO);
  const wa = clinic.whatsapp ? `https://wa.me/91${clinic.whatsapp.replace(/\D/g, "")}` : undefined;

  return (
    <PageShell>
      <PageHero
        eyebrow="Where to consult"
        title="Contact Us"
        subtitle="Consultations by appointment and walk-in, Monday to Saturday evenings. Sunday holiday."
        crumb="Contact Us"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeader align="left" eyebrow="Clinic" title={clinic.clinic_name} />
            <ul className="mt-6 space-y-4 text-sm">
              {clinic.address && (
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-muted-foreground">{clinic.address}</span>
                </li>
              )}
              {clinic.phone && (
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <a href={`tel:${clinic.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                    {clinic.phone}
                  </a>
                </li>
              )}
              {wa && (
                <li className="flex gap-3">
                  <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <a href={wa} target="_blank" rel="noreferrer" className="hover:text-primary">
                    WhatsApp {clinic.whatsapp}
                  </a>
                </li>
              )}
              {clinic.email && (
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <a href={`mailto:${clinic.email}`} className="hover:text-primary">
                    {clinic.email}
                  </a>
                </li>
              )}
            </ul>

            <div className="mt-8 rounded-2xl border border-border/60 bg-card p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-primary">
                <Clock className="h-5 w-5 text-accent" /> Working hours
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {hours.map((h) => (
                  <li key={h.weekday} className="flex justify-between border-b border-border/40 pb-2">
                    <span className="font-medium text-foreground">{WEEKDAY_LABELS[h.weekday]}</span>
                    <span className="text-muted-foreground">
                      {h.is_open
                        ? [
                            h.morning_start && `${formatTime(h.morning_start)} – ${formatTime(h.morning_end)}`,
                            h.evening_start && `${formatTime(h.evening_start)} – ${formatTime(h.evening_end)}`,
                          ]
                            .filter(Boolean)
                            .join(" | ")
                        : "Holiday"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/book">
                <Button className="rounded-full">Book An Appointment</Button>
              </Link>
              <a href={clinic.google_maps_url ?? GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-full">
                  Get directions
                </Button>
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/60 shadow-[var(--shadow-soft)]">
            <iframe
              title="Clinic location map"
              src={
                clinic.google_maps_embed ??
                `https://www.google.com/maps?q=${encodeURIComponent(
                  clinic.address ??
                    "Dr Shreyas Orthopedic Clinic, Vivekananda Cir Rd, Vivekananda Nagar, Mysuru, Karnataka 570023",
                )}&output=embed`
              }
              className="h-full min-h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </section>

      <CtaBand>
        <Link to="/book">
          <Button size="lg" variant="secondary" className="rounded-full">
            Book An Appointment
          </Button>
        </Link>
      </CtaBand>
    </PageShell>
  );
}
