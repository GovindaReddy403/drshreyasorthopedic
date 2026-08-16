import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Medal, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { PageHero, SectionHeader, CtaBand } from "@/components/site-sections";
import { clinicQO } from "@/lib/queries";

export const Route = createFileRoute("/awards")({
  head: () => ({
    meta: [
      { title: "Awards & Recognition | Dr. Shreyas M.J, Orthopedic Surgeon Mysuru" },
      {
        name: "description",
        content:
          "Fellowships, memberships and professional recognition earned by Dr. Shreyas M.J in arthroscopy, sports medicine and joint replacement surgery.",
      },
      { property: "og:title", content: "Awards & Recognition — Dr. Shreyas Orthopedic Clinic" },
      {
        property: "og:description",
        content: "Recognition of clinical excellence in arthroscopy, sports medicine and trauma care.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(clinicQO);
  },
  component: AwardsPage,
});

const honours = [
  {
    icon: Trophy,
    year: "Fellowship",
    title: "Fellowship in Arthroscopy & Sports Medicine (India & Australia)",
    body: "Advanced training in key-hole knee and shoulder surgery, sports injury management and return-to-play rehabilitation.",
  },
  {
    icon: Medal,
    year: "Membership",
    title: "Karnataka Orthopaedic Association (KOA)",
    body: "Active member contributing to state-level orthopaedic academic activity and continuing medical education.",
  },
  {
    icon: Medal,
    year: "Membership",
    title: "Mysore Orthopaedic Association (MOA)",
    body: "Member of the local orthopaedic fraternity, participating in case discussions and skill workshops.",
  },
  {
    icon: Award,
    year: "Training",
    title: "Senior Registrar, Fortis Hospital",
    body: "Served as Senior Registrar following the arthroscopy fellowship under Dr. Chirag N Thonse.",
  },
  {
    icon: Award,
    year: "Training",
    title: "Senior Resident, Sanjay Gandhi Institute of Trauma & Orthopaedics",
    body: "High-volume trauma and poly-trauma experience at one of Karnataka's leading trauma centres.",
  },
  {
    icon: Trophy,
    year: "Academics",
    title: "MBBS & MS (Orthopaedics), JSS Medical College and Hospitals",
    body: "Postgraduate orthopaedic training with a strong foundation in trauma and reconstructive surgery.",
  },
];

function AwardsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Awards & Recognition"
        title="Celebrating Excellence in Orthopaedic Care"
        subtitle="Recognition of Dr. Shreyas M.J's commitment to arthroscopy, sports medicine, joint replacement and trauma surgery."
        crumb="Awards"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Milestones"
          title="Fellowships, memberships & recognition"
          description="A career built on structured training at leading orthopaedic institutions across India and Australia."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {honours.map((h) => (
            <article key={h.title} className="glass-card flex h-full flex-col rounded-2xl p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <h.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-accent">
                {h.year}
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold text-primary">{h.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{h.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-soft-blue">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            { k: "12+", v: "Years of orthopaedic practice" },
            { k: "Knee · Shoulder · Ankle", v: "Core areas of expertise" },
            { k: "KOA & MOA", v: "Professional memberships" },
          ].map((s) => (
            <div key={s.v} className="rounded-2xl bg-card p-6 text-center shadow-[var(--shadow-soft)]">
              <p className="font-display text-2xl font-bold text-primary">{s.k}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.v}</p>
            </div>
          ))}
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
