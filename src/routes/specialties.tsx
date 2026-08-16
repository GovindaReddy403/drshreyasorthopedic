import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { PageHero, SectionHeader, TrustBand, CtaBand } from "@/components/site-sections";
import { clinicQO, treatmentsQO } from "@/lib/queries";
import { SPECIALTIES } from "@/lib/specialties";


export const Route = createFileRoute("/specialties")({
  head: () => ({
    meta: [
      { title: "Area of Specialties | Knee, Shoulder & Ankle Surgeon in Mysuru" },
      {
        name: "description",
        content:
          "Arthroscopy of knee & shoulder (key-hole), joint replacement, spine injury, foot & ankle and trauma care by Dr. Shreyas M.J in Mysuru.",
      },
      { property: "og:title", content: "Area of Specialties — Dr. Shreyas Orthopedic Clinic" },
      {
        property: "og:description",
        content:
          "Knee, shoulder, ankle, joint replacement, spine and trauma treatments offered at Dr. Shreyas Orthopedic Clinic, Mysuru.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(clinicQO),
      context.queryClient.ensureQueryData(treatmentsQO),
    ]);
  },
  component: SpecialtiesPage,
});




function SpecialtiesPage() {
  const { data: treatments } = useSuspenseQuery(treatmentsQO);

  return (
    <PageShell>
      <PageHero
        eyebrow="Advanced Orthopaedic Care"
        title="Area of Specialties"
        subtitle="Arthroscopy Knee & Shoulder (Key Hole) · Joint Replacement · Spine Injury · Foot & Ankle · Trauma"
        crumb="Area of Specialties"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Treatments & Procedures"
          title="What we treat"
          description="Every plan starts with an accurate diagnosis, followed by the least invasive treatment that restores function."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SPECIALTIES.map((f) => (
            <article
              key={f.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-soft)]"
            >
              <img
                src={f.image}
                alt={`${f.title} treatment at Dr. Shreyas Orthopedic Clinic`}
                className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold text-primary">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.short}</p>
                <ul className="mt-4 space-y-1 text-sm text-foreground/80">
                  {f.conditions.slice(0, 4).map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <ArrowRight className="h-3.5 w-3.5 text-accent" /> {p}
                    </li>
                  ))}
                </ul>
                <Link to="/specialties/$slug" params={{ slug: f.slug }} className="mt-5">
                  <Button variant="outline" size="sm" className="gap-1 rounded-full">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>

      </section>

      <section className="border-y border-border/60 bg-soft-blue">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Consultation"
            title="Available consultations"
            description="Choose a consultation type while booking your appointment online."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map((t) => (
              <div key={t.id} className="glass-card rounded-2xl p-5">
                <h3 className="font-display text-base font-semibold text-primary">{t.name}</h3>
                {t.description && (
                  <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
                )}
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-accent">
                  {t.duration_minutes} min consultation
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustBand />
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
