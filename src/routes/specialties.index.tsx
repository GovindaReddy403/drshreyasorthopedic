import { OG_IMAGE, absUrl, breadcrumbLd, CLINIC_PHONE } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, CalendarCheck, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { SectionHeader, TrustBand, CtaBand } from "@/components/site-sections";
import { clinicQO, treatmentsQO } from "@/lib/queries";
import { SPECIALTIES } from "@/lib/specialties";
import gKnee from "@/assets/treat-knee.jpg";
import gShoulder from "@/assets/treat-shoulder.jpg";
import gAnkle from "@/assets/treat-ankle.jpg";
import gHip from "@/assets/treat-hip.jpg";
import gElbow from "@/assets/treat-elbow.jpg";

const PROCEDURE_CATEGORIES: {
  title: string;
  image: string;
  procedures: string[];
}[] = [
  {
    title: "Knee Procedures",
    image: gKnee,
    procedures: [
      "Knee Arthroscopy",
      "Total Knee Replacement",
      "Partial Knee Replacement",
      "ACL Reconstruction",
      "PCL Reconstruction",
      "Meniscal Surgery",
      "Cartilage Repair",
      "Patellar Tendon Repair",
      "Knee Osteotomy",
      "Robotic-Assisted Surgeries",
    ],
  },
  {
    title: "Shoulder Procedures",
    image: gShoulder,
    procedures: [
      "Shoulder Arthroscopy",
      "SLAP Repair",
      "Bankart Repair",
      "Rotator Cuff Repair",
      "Shoulder Joint Replacement",
      "Recurrent Dislocation Surgery",
      "Frozen Shoulder Release",
      "Labrum Reconstruction",
    ],
  },
  {
    title: "Foot & Ankle Procedures",
    image: gAnkle,
    procedures: [
      "Ankle Arthroscopy",
      "Ankle Ligament Reconstruction (ATFL)",
      "Achilles Tendon Repair",
      "Plantar Fasciitis Treatment",
      "Deformity Correction",
      "Ankle Fracture Fixation",
    ],
  },
  {
    title: "Hip Procedures",
    image: gHip,
    procedures: [
      "Hip Arthroscopy",
      "Total Hip Replacement",
      "Hip Labral Repair",
      "Hip Fracture Surgery",
    ],
  },
  {
    title: "Elbow Procedures",
    image: gElbow,
    procedures: [
      "Elbow Arthroscopy",
      "Tennis Elbow Surgery",
      "Golfer Elbow Surgery",
      "Elbow Ligament Reconstruction",
      "Elbow Tendon Repair",
    ],
  },
];


export const Route = createFileRoute("/specialties/")({
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
      { property: "og:url", content: absUrl("/specialties") },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: absUrl("/specialties") }],
    scripts: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Area of Specialties", path: "/specialties" },
      ]),
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
      {/* Page header with CTAs */}
      <section className="border-b border-border/60 bg-hero-gradient">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Advanced Orthopaedic Care
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
            Your Trusted Orthopaedic Surgeon in Bangalore — Comprehensive Joint
            Care Under One Roof
          </h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground">
            From key-hole arthroscopy of the knee and shoulder to joint
            replacement, spine injury, foot & ankle and trauma care — Dr.
            Shreyas M. J. offers evidence-based, minimally invasive orthopaedic
            treatment tailored to your recovery goals.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/book">
              <Button size="lg" className="gap-2 rounded-full">
                <CalendarCheck className="h-4 w-4" /> Book a Consultation
              </Button>
            </Link>
            <a href={`tel:${CLINIC_PHONE.replace(/\s+/g, "")}`}>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 rounded-full"
              >
                <Phone className="h-4 w-4" /> Call: {CLINIC_PHONE}
              </Button>
            </a>
          </div>
          <nav className="mt-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-primary">Area of Specialties</span>
          </nav>
        </div>
      </section>

      {/* About + clinic highlights */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              About Dr. Shreyas M. J.
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-primary sm:text-3xl">
              Fellowship-trained Orthopaedic Surgeon & Sports Medicine
              Specialist
            </h2>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              Dr. Shreyas M. J. is an Orthopaedic Surgeon with specialised
              training in Arthroscopy, Sports Medicine, Knee & Shoulder
              surgery and Upper & Lower Limb Trauma. With fellowships in
              India, Australia and Thailand, he combines international
              techniques with a patient-first approach to deliver faster,
              safer recoveries and lasting joint function.
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-display text-lg font-semibold text-primary">
              Clinic Highlights
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                "Fellowship-trained in Arthroscopy & Sports Medicine",
                "Visiting consultant at JSS Hospital, Mysore",
                "Minimally invasive procedures for faster recovery",
                "Multilingual patient care — Kannada, Hindi, English",
                "Open Monday to Saturday | 5 PM – 9 PM",
              ].map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm text-foreground/90">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Individual procedure lists per body-part category */}
      <section className="bg-soft-blue/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Procedures Performed"
            title="Individual procedures by body area"
            description="A full spectrum of surgical and minimally invasive orthopaedic procedures, organised by the joint or region they treat."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROCEDURE_CATEGORIES.map((c) => (
              <article
                key={c.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-soft)]"
              >
                <img
                  src={c.image}
                  alt={`${c.title} at Dr. Shreyas Orthopedic Clinic`}
                  loading="lazy"
                  className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold text-primary">
                    {c.title}
                  </h3>
                  <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                    {c.procedures.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


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
