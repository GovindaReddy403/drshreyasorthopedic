import { faqLd, OG_IMAGE, absUrl, breadcrumbLd, CLINIC_PHONE } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Bone, CalendarCheck, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { SectionHeader, TrustBand, CtaBand } from "@/components/site-sections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { clinicQO, treatmentsQO } from "@/lib/queries";
import { SPECIALTIES } from "@/lib/specialties";
import gKnee from "@/assets/specialty-knee-imaging.png";
import gShoulder from "@/assets/specialty-shoulder-imaging.png";
import gAnkle from "@/assets/specialty-ankle-imaging.png";
import gHip from "@/assets/specialty-hip-imaging.png";
import gElbow from "@/assets/specialty-elbow-imaging.png";

const PROCEDURE_CATEGORIES: {
  title: string;
  image?: string;
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
  {
    title: "Other Procedures",
    procedures: [
      "Spine Injury Management",
      "Diabetic Foot Care",
      "Wrist TFCC Reconstruction",
    ],
  },
];

const SPECIALTY_FAQS: { q: string; a: string }[] = [
  {
    q: "What does an orthopaedic surgeon in Mysuru treat?",
    a: "An orthopaedic surgeon treats disorders of bones, joints, ligaments, tendons and muscles. Dr. Shreyas manages knee, shoulder, foot & ankle, hip and elbow conditions, spine injuries, sports injuries, fractures and degenerative joint disease using both surgical and non-surgical methods.",
  },
  {
    q: "Is Dr. Shreyas the best orthopaedic surgeon in Mysuru?",
    a: "Dr. Shreyas M. J. is a fellowship-trained orthopaedic surgeon with specialised training in Arthroscopy and Sports Medicine from India, Australia and Thailand. Patients choose him for minimally invasive techniques, personalised care and consistent outcomes in joint replacement and sports injury treatment in Mysuru.",
  },
  {
    q: "What is the cost of orthopaedic surgery in Mysuru?",
    a: "Costs vary by procedure — key-hole arthroscopy, ligament reconstruction and joint replacement each have different scopes. Dr. Shreyas provides a clear estimate after your consultation and diagnosis. Please call 86609 50443 or book online to discuss your case and expected expenses.",
  },
  {
    q: "Is orthopaedic surgery covered by insurance?",
    a: "Most medically necessary orthopaedic procedures are covered by health insurance, subject to your policy terms. We assist with the documentation, pre-authorisation and discharge summaries you need to file a cashless or reimbursement claim with your insurer.",
  },
  {
    q: "Does Dr. Shreyas perform robotic orthopaedic surgery?",
    a: "Yes. Robotic-assisted and computer-navigated techniques are offered for select knee replacement and arthroscopy cases where they improve precision in bone cuts and implant positioning. Suitability is decided after assessing your scans and joint condition.",
  },
  {
    q: "How do I book an appointment?",
    a: "Book online through our appointment page in under two minutes — select a consultation type, choose an available slot and confirm with an OTP. You can also call 86609 50443. The clinic is open Monday to Saturday, 5 PM to 9 PM.",
  },
  {
    q: "What is minimally invasive orthopaedic surgery?",
    a: "Minimally invasive or key-hole surgery (arthroscopy) uses small incisions and a camera to treat joint problems, causing less tissue damage, smaller scars, less pain and a faster return to activity compared to open surgery. Dr. Shreyas routinely performs arthroscopy of the knee, shoulder, ankle, hip and elbow.",
  },
  {
    q: "Can athletes be treated at Dr. Shreyas's clinic?",
    a: "Yes. With fellowship training in Arthroscopy and Sports Medicine, Dr. Shreyas treats sports injuries such as ACL tears, shoulder dislocations, rotator cuff tears and ankle sprains, with a focus on safe return-to-play and injury prevention for athletes of all levels.",
  },
  {
    q: "What hospitals is Dr. Shreyas associated with?",
    a: "Dr. Shreyas M. J. consults at his clinic in Vivekanandanagar, Mysuru and is a visiting consultant at JSS Hospital, Mysore, enabling access to advanced theatre, imaging and inpatient facilities when surgery or admission is required.",
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
      faqLd(SPECIALTY_FAQS),
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
                {c.image ? (
                  <img
                    src={c.image}
                    alt={`${c.title} at Dr. Shreyas Orthopedic Clinic`}
                    loading="lazy"
                    className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-40 w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/15">
                    <Bone className="h-12 w-12 text-accent" />
                  </div>
                )}
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

      {/* FAQ */}
      <section className="border-y border-border/60 bg-soft-blue/40">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Frequently asked questions
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">
              Your orthopaedic questions, answered
            </h2>
          </div>
          <Accordion type="single" collapsible className="mt-10 space-y-3">
            {SPECIALTY_FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className="overflow-hidden rounded-2xl border border-border bg-card px-5"
              >
                <AccordionTrigger className="text-left font-display text-base font-semibold text-primary hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
