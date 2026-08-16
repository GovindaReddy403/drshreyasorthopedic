import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CalendarDays, GraduationCap, Languages, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { PageHero, SectionHeader, TickList, TrustBand, CtaBand } from "@/components/site-sections";
import { clinicQO, doctorsQO } from "@/lib/queries";
import doctorAsset from "@/assets/doctor-portrait.png.asset.json";

const doctorImg = doctorAsset.url;

export const Route = createFileRoute("/about-doctor")({
  head: () => ({
    meta: [
      { title: "About Dr. Shreyas M. J. | Arthroscopy & Sports Medicine, Mysore" },
      {
        name: "description",
        content:
          "Dr. Shreyas M. J. — MBBS, MS (Ortho), Assistant Professor at JSS Hospital Mysore. Fellowships in Arthroscopy & Sports Medicine in India, Australia and Thailand.",
      },
      { property: "og:title", content: "About Dr. Shreyas M. J. — Orthopaedic Surgeon, Mysore" },
      {
        property: "og:description",
        content:
          "Overview, advanced fellowship training, current position, areas of special interest and regenerative treatments offered by Dr. Shreyas M. J.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(clinicQO),
      context.queryClient.ensureQueryData(doctorsQO),
    ]);
  },
  component: AboutDoctorPage,
});

const sections = [
  { id: "overview", label: "Overview" },
  { id: "membership", label: "Fellowship & Membership" },
  { id: "expertise", label: "Field of Expertise" },
  { id: "languages", label: "Languages Spoken" },
  { id: "career", label: "Career & Training" },
  { id: "faqs", label: "FAQs" },
];

const faqs = [
  {
    q: "Why do patients consult Dr. Shreyas?",
    a: "Knee and shoulder pain, sports injuries, ligament and meniscus tears, arthritis, fractures and post-surgery rehabilitation.",
  },
  {
    q: "What does he specialise in?",
    a: "Arthroscopy (key-hole) surgery of the knee and shoulder, joint replacement, foot & ankle care, spine injury and trauma.",
  },
  {
    q: "Do I need an appointment?",
    a: "Walk-ins are welcome during clinic hours, but booking online secures your slot between 5:00 PM and 9:00 PM, Monday to Saturday.",
  },
];

function AboutDoctorPage() {
  const { data: clinic } = useSuspenseQuery(clinicQO);
  const { data: doctors } = useSuspenseQuery(doctorsQO);
  const doc = doctors[0];

  return (
    <PageShell>
      <PageHero
        eyebrow="Consultant Orthopaedic Surgeon"
        title={doc?.name ?? clinic.doctor_name}
        subtitle="MBBS | MS (Ortho) — JSS Medical College & Hospitals | Fellowship in Arthroscopy & Sports Medicine (India & Australia)"
        crumb="About the Doctor"
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[320px_1fr]">
          <div>
            <img
              src={doc?.photo_url || doctorImg}
              alt={`Portrait of ${doc?.name ?? clinic.doctor_name}`}
              className="w-full rounded-3xl object-cover shadow-[var(--shadow-glow)]"
              loading="lazy"
            />
            <div className="mt-6 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-soft-blue p-4">
                <p className="font-display text-xl font-bold text-primary">12+</p>
                <p className="text-xs text-muted-foreground">Years experience</p>
              </div>
              <div className="rounded-xl bg-soft-blue p-4">
                <p className="font-display text-xl font-bold text-primary">Knee · Shoulder</p>
                <p className="text-xs text-muted-foreground">Core focus</p>
              </div>
            </div>
            <Link to="/book" className="mt-4 block">
              <Button className="w-full gap-2 rounded-full">
                <CalendarDays className="h-4 w-4" /> Book An Appointment
              </Button>
            </Link>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 border-b border-border/60 pb-4">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {s.label}
                </a>
              ))}
            </div>

            <div id="overview" className="scroll-mt-28 pt-8">
              <SectionHeader align="left" title="Overview" />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {doc?.about ??
                  "Dr. Shreyas M.J is an orthopaedic surgeon focused on restoring movement through precise, minimally invasive care. He completed MBBS and MS (Orthopaedics) at JSS Medical College & Hospitals, began his career as Senior Resident at the Sanjay Gandhi Institute of Trauma & Orthopaedics, and pursued a Fellowship in Arthroscopy and Sports Medicine at Fortis Hospital under Dr. Chirag N Thonse, later serving as Senior Registrar there."}
              </p>
              <TickList
                items={[
                  {
                    title: "Patient-first approach",
                    body: "Clear diagnosis, transparent plan and recovery guidance at every visit.",
                  },
                  {
                    title: "Minimally invasive focus",
                    body: "Arthroscopy-first mindset wherever appropriate for faster recovery.",
                  },
                  {
                    title: "Sports injury expertise",
                    body: "Knee, shoulder and ankle injuries with structured rehab planning.",
                  },
                  {
                    title: "Trauma & joint replacement",
                    body: "Complex fracture care and joint replacement with modern implants.",
                  },
                ]}
              />
            </div>

            <div id="membership" className="scroll-mt-28 pt-12">
              <SectionHeader align="left" title="Fellowship & Membership" />
              <TickList
                items={[
                  {
                    title: "Fellowship in Arthroscopy & Sports Medicine (India & Australia)",
                    body: "Knee, shoulder and sports injury management.",
                  },
                  {
                    title: "KOA & MOA Member",
                    body: "Karnataka Orthopaedic Association and Mysore Orthopaedic Association.",
                  },
                ]}
              />
            </div>

            <div id="expertise" className="scroll-mt-28 pt-12">
              <SectionHeader align="left" title="Field of Expertise" />
              <TickList
                items={[
                  { title: "Knee", body: "ACL/PCL injuries, meniscus tears, cartilage damage, arthritis." },
                  { title: "Shoulder", body: "Rotator cuff tears, instability, SLAP/Bankart lesions, frozen shoulder." },
                  { title: "Ankle & Foot", body: "Ligament injuries, ankle arthroscopy, sprains and deformity care." },
                  { title: "Trauma & Replacement", body: "Complex fractures, spine injury and joint replacement." },
                ]}
              />
            </div>

            <div id="languages" className="scroll-mt-28 pt-12">
              <SectionHeader align="left" title="Languages Spoken" />
              <div className="mt-4 flex flex-wrap gap-2">
                {(doc?.languages_spoken ?? "English, Kannada, Hindi, Tamil, Telugu")
                  .split(",")
                  .map((l) => (
                    <span
                      key={l}
                      className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-sm font-medium text-primary"
                    >
                      <Languages className="h-4 w-4" /> {l.trim()}
                    </span>
                  ))}
              </div>
            </div>

            <div id="career" className="scroll-mt-28 pt-12">
              <SectionHeader align="left" title="Career & Training" />
              <ol className="mt-6 space-y-4 border-l border-border pl-6">
                {[
                  {
                    t: "MBBS & MS (Orthopaedics)",
                    d: "JSS Medical College and Hospitals",
                    icon: GraduationCap,
                  },
                  {
                    t: "Senior Resident, Dept. of Orthopaedics",
                    d: "Sanjay Gandhi Institute of Trauma & Orthopaedics",
                    icon: Stethoscope,
                  },
                  {
                    t: "Fellowship in Arthroscopy & Sports Medicine",
                    d: "Fortis Hospital, under Dr. Chirag N Thonse",
                    icon: GraduationCap,
                  },
                  {
                    t: "Senior Registrar",
                    d: "Fortis Hospital",
                    icon: Stethoscope,
                  },
                ].map((s) => (
                  <li key={s.t} className="relative">
                    <span className="absolute -left-[31px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <s.icon className="h-3 w-3" />
                    </span>
                    <p className="font-semibold text-foreground">{s.t}</p>
                    <p className="text-sm text-muted-foreground">{s.d}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div id="faqs" className="scroll-mt-28 pt-12">
              <SectionHeader align="left" title="FAQs" />
              <div className="mt-4 space-y-3">
                {faqs.map((f) => (
                  <details
                    key={f.q}
                    className="rounded-xl border border-border/60 bg-card p-4 [&_summary]:cursor-pointer"
                  >
                    <summary className="font-semibold text-foreground">{f.q}</summary>
                    <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
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
