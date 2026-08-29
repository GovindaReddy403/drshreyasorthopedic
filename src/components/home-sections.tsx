import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Bone,
  Building2,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Dumbbell,
  Globe,
  HeartHandshake,
  HeartPulse,
  MapPin,
  Microscope,
  PlayCircle,
  Quote,
  Route as RouteIcon,
  ScanLine,
  Scissors,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  Timer,
  Trophy,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SPECIALTIES } from "@/lib/specialties";
import { CLINIC_VIDEOS, youtubeEmbedSrc, youtubeVideoId } from "@/lib/videos";
import { BLOG_POSTS, HOME_BLOG_SLUGS } from "@/lib/blog";

import gKnee from "@/assets/treat-knee.jpg";
import gShoulder from "@/assets/treat-shoulder.jpg";
import gAnkle from "@/assets/treat-ankle.jpg";
import gHip from "@/assets/treat-hip.jpg";
import gArthroscopy from "@/assets/treat-arthroscopy.jpg";
import gJoint from "@/assets/treat-xray.jpg";
import gSports from "@/assets/treat-physio.jpg";
import gBiologics from "@/assets/treat-biologics.jpg";
import clinic1 from "@/assets/clinic-1.jpg";
import clinicFrontageAsset from "@/assets/clinic-frontage.png.asset.json";

/* ------------------------------------------------------------------ */
/* 4 — Compact hero stats row (4 icons)                                 */
/* ------------------------------------------------------------------ */

const HERO_STATS = [
  { icon: CalendarClock, value: "12+", label: "Years of Experience" },
  { icon: Scissors, value: "2,000+", label: "Orthopaedic Surgeries" },
  { icon: HeartHandshake, value: "20,000+", label: "Happy Patients" },
  { icon: Globe, value: "3", label: "Fellowships · India, Australia & Thailand" },
];

export function HeroStatsRow() {
  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-28">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:divide-x lg:divide-border/60">
          {HERO_STATS.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 lg:border-0 lg:bg-transparent lg:p-4"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-2xl font-bold leading-none text-primary">
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5 — Surgical track record & stats                                    */
/* ------------------------------------------------------------------ */

const STATS = [
  { icon: Trophy, value: "12+", label: "Years of Experience", primary: true },
  { icon: Scissors, value: "2,000+", label: "Orthopaedic Surgeries Performed" },
  { icon: Users, value: "20,000+", label: "Happy Patients" },
  { icon: Activity, value: "2,000+", label: "Knee Arthroscopy Surgeries" },
  { icon: Bone, value: "1,500+", label: "Joint Replacement Surgeries" },
  { icon: HeartPulse, value: "1,000+", label: "Shoulder Arthroscopy Surgeries" },
  { icon: ShieldCheck, value: "500+", label: "Trauma & Fracture Cases" },
  { icon: Sparkles, value: "100+", label: "Robotic-Assisted Knee Replacements" },
];

export function StatsBand() {
  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Surgical Track Record & Clinical Statistics
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-primary sm:text-3xl">
            High-volume orthopaedic expertise backed by verifiable surgical numbers
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Academic practice at JSS Hospital combined with a busy private arthroscopy, joint
            replacement and trauma service in Mysuru.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className={`rounded-2xl border p-6 text-center ${
                s.primary
                  ? "border-primary/30 bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                  : "border-border/60 bg-card"
              }`}
            >
              <span
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                  s.primary ? "bg-primary-foreground/15" : "bg-primary/10 text-primary"
                }`}
              >
                <s.icon className="h-6 w-6" />
              </span>
              <p
                className={`mt-4 font-display text-3xl font-bold ${
                  s.primary ? "" : "text-primary"
                }`}
              >
                {s.value}
              </p>
              <p className={`mt-1 text-sm ${s.primary ? "opacity-90" : "text-muted-foreground"}`}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6 — Area of specialties: 3 tall image cards                          */
/* ------------------------------------------------------------------ */

const SPECIALTY_CARDS = [
  { slug: "knee-arthroscopy", title: "Knee", image: gKnee },
  { slug: "shoulder-arthroscopy", title: "Shoulder", image: gShoulder },
  { slug: "foot-and-ankle", title: "Foot & Ankle", image: gAnkle },
  { slug: "joint-replacement", title: "Robotic Joint Replacement (Hip & Knee)", image: gHip },
];

export function SpecialtyImageCards() {
  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Area of Specialties
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-primary sm:text-3xl">
            Focused expertise in knee, shoulder, foot &amp; ankle care and robotic hip &amp; knee
            joint replacement
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Key-hole arthroscopic surgery, ligament reconstruction, robotic joint replacement and
            joint preservation, planned individually for every patient.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SPECIALTY_CARDS.map((c) => (
            <div
              key={c.slug}
              className="relative flex h-[380px] items-end overflow-hidden rounded-[15px]"
            >
              <img
                src={c.image}
                alt={`${c.title} treatment`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/60" aria-hidden />
              <div className="relative w-full p-6 text-center text-primary-foreground">
                <h3 className="font-display text-[28px] font-bold">{c.title}</h3>
                <Link to="/specialties/$slug" params={{ slug: c.slug }}>
                  <Button
                    variant="outline"
                    className="mt-4 rounded-full border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    Read More
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/specialties">
            <Button className="rounded-full px-7">More Specialties</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7 — Centre of excellence 2x2                                         */
/* ------------------------------------------------------------------ */

const KEYHOLE_BENEFITS = [
  "Smaller Incisions",
  "Minimal Soft Tissue Trauma",
  "Less Pain and Scars",
  "Lower Infection Rate",
  "Faster Healing Time",
  "Earlier Mobilization",
  "Shorter Hospital Stay",
];

const EXCELLENCE = [
  {
    slug: "knee-arthroscopy",
    title: "Arthroscopic Surgery",
    image: gArthroscopy,
    body: "Key-hole surgery of the knee and shoulder allows the joint to be inspected and repaired through incisions a few millimetres wide — ACL and PCL reconstruction, meniscus repair, cartilage procedures and rotator cuff repair.",
  },
  {
    slug: "joint-replacement",
    title: "Robotic Joint Replacement Surgery",
    image: gJoint,
    body: "Modern knee and hip implants with rapid-recovery protocols, individually planned alignment and structured physiotherapy so patients stand and walk the same or next day.",
  },
  {
    slug: "sports-medicine-rehab",
    title: "Sports Medicine",
    image: gSports,
    body: "Return-to-play care for athletes — injury assessment, ligament reconstruction and milestone-based rehabilitation. Benefits of the minimally invasive approach:",
    checklist: KEYHOLE_BENEFITS,
  },
  {
    slug: "trauma-and-fractures",
    title: "Fractures & Biologic Treatments",
    image: gBiologics,
    body: "High-volume trauma experience from the Sanjay Gandhi Institute of Trauma & Orthopaedics, plus regenerative options such as PRP and viscosupplementation for early arthritis and tendon problems.",
  },
];

export function CentreOfExcellence() {
  return (
    <section className="border-b border-border/60 bg-soft-blue">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-4xl text-center font-display text-2xl font-bold text-primary sm:text-3xl">
          Centre of Excellence For Arthroscopic Surgery, Joint Replacements, Sports Medicine
          Injuries, Ortho Biologics, Fracture &amp; Trauma Care
        </h2>
        <div className="mt-12 flex flex-col gap-12">
          {EXCELLENCE.map((e, i) => {
            const imageLeft = i % 2 === 0;
            return (
              <div
                key={e.slug}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
              >
                <div className={imageLeft ? "md:order-1" : "md:order-2"}>
                  <img
                    src={e.image}
                    alt={e.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-2xl border border-border/60 object-cover shadow-[var(--shadow-soft)]"
                  />
                </div>
                <div className={imageLeft ? "md:order-2" : "md:order-1"}>
                  <h3 className="font-display text-2xl font-bold text-primary">
                    {e.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {e.body}
                  </p>
                  {e.checklist && (
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {e.checklist.map((c) => (
                        <li
                          key={c}
                          className="flex items-center gap-2 text-sm font-medium text-foreground/85"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    to="/specialties/$slug"
                    params={{ slug: e.slug }}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 9 — Why patients trust (6 benefit cards)                             */
/* ------------------------------------------------------------------ */

const TRUST_CARDS = [
  {
    icon: Microscope,
    title: "Fellowship-Trained Arthroscopy Specialist",
    body: "Fellowships in Arthroscopy & Sports Medicine completed in India, Australia and Thailand.",
  },
  {
    icon: Stethoscope,
    title: "Assistant Professor at JSS Hospital",
    body: "Assistant Professor in Orthopaedics — teaching, research and complex case exposure every week.",
  },
  {
    icon: Scissors,
    title: "Minimally Invasive First Approach",
    body: "Key-hole techniques wherever suitable, so recovery is faster and scarring is minimal.",
  },
  {
    icon: Syringe,
    title: "Ortho Biologics & PRP (Non-Surgical)",
    body: "PRP, viscosupplementation and image-guided injections for early arthritis and tendon pain.",
  },
  {
    icon: Trophy,
    title: "International Fellowships",
    body: "Advanced arthroscopy and sports medicine training in India, Australia and Thailand.",
  },
  {
    icon: MapPin,
    title: "Serving All of Mysuru",
    body: "Evening clinic hours at Vivekananda Nagar, Monday to Saturday, 5:00 PM to 9:00 PM.",
  },
];

export function WhyPatientsTrust() {
  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Why Patients Trust Us
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-primary sm:text-3xl">
            Why Patients Across Mysuru Trust Dr. Shreyas
          </h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_CARDS.map((c) => (
            <Card key={c.title} className="h-full border-primary/10">
              <CardContent className="p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-primary">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 12 — Surgical philosophy quote                                       */
/* ------------------------------------------------------------------ */

export function SurgicalPhilosophy({ image, name }: { image: string; name: string }) {
  return (
    <section className="border-b border-border/60 bg-soft-blue">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-5 lg:px-8">
        <div className="md:col-span-2">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full max-w-sm rounded-3xl object-cover shadow-[var(--shadow-soft)]"
          />
        </div>
        <div className="md:col-span-3">
          <Quote className="h-9 w-9 text-accent" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Surgical Philosophy
          </p>
          <p className="mt-3 font-display text-xl leading-relaxed text-primary sm:text-2xl">
            “I combine advanced international surgical precision with localized, empathetic patient
            care — the right operation at the right time, and never an operation that can be
            avoided.”
          </p>
          <p className="mt-4 text-sm font-semibold text-foreground">— {name}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Fellowship training in Arthroscopy &amp; Sports Medicine across India, Australia and
            Thailand, senior residency at the Sanjay Gandhi Institute of Trauma &amp; Orthopaedics
            and a senior registrar post at Fortis Hospital shape a practice that is evidence-led and
            patient-first.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 15 — Why choose the clinic                                           */
/* ------------------------------------------------------------------ */

export function WhyChooseClinic() {
  const points = [
    "Consultation, diagnosis and surgical planning under one roof at Vivekananda Nagar, Mysuru.",
    "Evening hours designed around work and school schedules — Monday to Saturday, 5 to 9 PM.",
    "Transparent guidance on when surgery is needed and when it genuinely is not.",
  ];
  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
        <img
          src={clinic1}
          alt="Dr. Shreyas Orthopedic Clinic in Mysuru"
          loading="lazy"
          className="w-full rounded-3xl object-cover shadow-[var(--shadow-soft)]"
        />
        <div>
          <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl">
            Why Choose Dr. Shreyas Orthopedic Clinic?
          </h2>
          <ul className="mt-6 space-y-4">
            {points.map((p) => (
              <li key={p} className="flex gap-3 text-sm text-foreground/85">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 16 — Patient care roadmap                                            */
/* ------------------------------------------------------------------ */

const ROADMAP = [
  {
    icon: Stethoscope,
    title: "Consultation",
    body: "Detailed history, clinical examination and discussion of your goals.",
  },
  {
    icon: ScanLine,
    title: "Diagnostic Imaging",
    body: "X-ray, MRI or ultrasound reviewed with you to confirm the diagnosis.",
  },
  {
    icon: ClipboardList,
    title: "Treatment Planning",
    body: "A written plan with surgical and non-surgical options clearly compared.",
  },
  {
    icon: Syringe,
    title: "Non-Surgical Therapies",
    body: "Medication, bracing, PRP and injections tried first where appropriate.",
  },
  {
    icon: Scissors,
    title: "Arthroscopy or Replacement",
    body: "Key-hole or joint replacement surgery when it is the right answer.",
  },
  {
    icon: Dumbbell,
    title: "Rehabilitation",
    body: "Milestone-based physiotherapy with scheduled review appointments.",
  },
  {
    icon: Timer,
    title: "Active Lifestyle",
    body: "Return to work, daily activity and sport with a long-term joint care plan.",
  },
];

export function CareRoadmap() {
  return (
    <section className="border-b border-border/60 bg-soft-blue">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            <RouteIcon className="h-4 w-4" /> Patient Care Roadmap
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-primary sm:text-3xl">
            Your path to pain-free living: the 7-step treatment journey
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Every patient follows the same clear pathway, from the first consultation to a confident
            return to an active life.
          </p>
          <Link to="/book">
            <Button className="mt-6 gap-2 rounded-full px-7">
              <CalendarDays className="h-4 w-4" /> Schedule an Appointment
            </Button>
          </Link>
        </div>
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ROADMAP.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-border/60 bg-card p-6">
              <span className="absolute -top-3 left-6 inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>
              <s.icon className="h-6 w-6 text-accent" />
              <h3 className="mt-3 font-display text-base font-semibold text-primary">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 18 — CTA band                                                        */
/* ------------------------------------------------------------------ */

export function AppointmentCtaBand() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="font-display text-xl font-semibold sm:text-2xl">
          You can request an appointment with Dr. Shreyas Orthopedic Clinic online by submitting the
          appointment request form here
        </p>
        <Link to="/book">
          <Button
            size="lg"
            className="gap-2 rounded-full bg-accent px-10 text-lg font-semibold text-white hover:bg-accent/90"
          >
            <CalendarDays className="h-5 w-5" /> BOOK AN APPOINTMENT
          </Button>
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 19 — Google map embed                                                */
/* ------------------------------------------------------------------ */

export function ClinicMap({ address }: { address?: string | null }) {
  const q = encodeURIComponent(
    address ??
      "Dr Shreyas Orthopedic Clinic, Vivekananda Cir Rd, Vivekananda Nagar, Mysuru, Karnataka 570023",
  );
  return (
    <section aria-label="Clinic location map" className="border-b border-border/60">
      <iframe
        title="Clinic location on Google Maps"
        src={`https://www.google.com/maps?q=${q}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[380px] w-full border-0"
      />
    </section>
  );
}

export const HOME_SPECIALTY_LINKS = SPECIALTIES;

/* ------------------------------------------------------------------ */
/* 20 — Trusted orthopaedic expertise band                              */
/* ------------------------------------------------------------------ */

const TRUSTED = [
  {
    icon: Users,
    eyebrow: "Patient Trust",
    title: "Assistant Professor, JSS Hospital",
    body: "Patient care, surgical training, teaching and academic research in Orthopaedics",
  },
  {
    icon: Stethoscope,
    eyebrow: "Surgical Volume",
    title: "Arthroscopy & Trauma",
    body: "Knee & Shoulder Arthroscopy | Ligament Reconstruction | Meniscal Surgery | Upper & Lower Limb Trauma",
  },
  {
    icon: Trophy,
    eyebrow: "Awards",
    title: "Fellowships & Memberships",
    body: "Fellowships in India, Australia & Thailand · KOA & MOA Member",
  },
];

export function TrustedExpertiseBand() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] opacity-80">
            Advanced Orthopaedic Care
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
            Trusted Orthopaedic Expertise
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TRUSTED.map((t) => (
            <div key={t.title} className="overflow-hidden rounded-2xl bg-card">
              <div className="h-1 w-full bg-gradient-to-r from-accent to-success" />
              <div className="p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <t.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 inline-block rounded-full bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                  {t.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-primary">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Patient video stories                                                */
/* ------------------------------------------------------------------ */

export function PatientVideoStories({
  youtubeUrl,
  reviewsUrl,
}: {
  youtubeUrl?: string | null;
  reviewsUrl: string;
}) {
  const featuredId = youtubeVideoId(youtubeUrl);
  const cards = CLINIC_VIDEOS.slice(0, 3);

  return (
    <section className="border-y border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Patient stories
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">
            Recovery journeys, in patients&rsquo; own words
          </h2>
          <p className="mt-3 text-muted-foreground">
            Short testimonial and patient-education videos from the clinic — sports injuries, joint
            replacement, trauma care and rehabilitation.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
          {featuredId ? (
            <iframe
              title="Patient story video"
              src={youtubeEmbedSrc(featuredId, { autoplay: true })}
              className="aspect-video w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 bg-soft-blue text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-card text-primary shadow-[var(--shadow-soft)]">
                <PlayCircle className="h-8 w-8" />
              </span>
              <p className="font-display text-lg font-semibold text-primary">Video coming soon</p>
              <p className="max-w-md px-6 text-sm text-muted-foreground">
                Patient story films are being recorded at the clinic and will appear here shortly.
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((v) => (
            <div key={v.title} className="card-lift overflow-hidden rounded-2xl border border-border bg-card">
              <div className="flex aspect-16/10 items-center justify-center bg-soft-blue">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-card text-primary shadow-[var(--shadow-soft)]">
                  <PlayCircle className="h-7 w-7" />
                </span>
              </div>
              <div className="p-5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                  {v.category}
                </p>
                <h3 className="mt-2 font-display text-base font-semibold text-primary">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.description}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Video coming soon
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/videos">
            <Button className="rounded-full">Watch more patient stories</Button>
          </Link>
          <a href={youtubeUrl ?? reviewsUrl} target="_blank" rel="noreferrer">
            <Button variant="outline" className="rounded-full">
              View all videos
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}


/* ------------------------------------------------------------------ */
/* FAQs                                                                 */
/* ------------------------------------------------------------------ */

export const FAQS = [
  {
    q: "What is the cost of knee replacement surgery in Mysuru?",
    a: "The cost depends on the implant type, whether one or both knees are done, the hospital category and your room choice. You will be given a written estimate covering surgery, implant, stay and physiotherapy before you decide — there are no hidden additions later.",
  },
  {
    q: "Is orthopaedic surgery covered by insurance?",
    a: "Yes. Joint replacement, arthroscopy and trauma surgery are covered by most health insurance policies and cashless TPA networks, subject to your waiting period and sub-limits. The clinic team helps with pre-authorisation paperwork.",
  },
  {
    q: "When should I see an orthopaedic surgeon?",
    a: "See a specialist if joint pain lasts beyond two to three weeks, if you have night pain, swelling, locking or giving way of a joint, difficulty climbing stairs, or any injury after which you cannot bear weight.",
  },
  {
    q: "Robotic-assisted versus traditional knee replacement — which is better?",
    a: "Robotic assistance improves the accuracy of bone cuts and implant alignment, which can mean a more natural-feeling knee and better long-term implant survival. Traditional replacement in experienced hands still gives excellent results; the right choice depends on your deformity, bone quality and budget.",
  },
  {
    q: "Can knee replacement be avoided?",
    a: "Often, yes — especially in early and moderate arthritis. Weight management, targeted physiotherapy, medication, bracing, PRP and viscosupplementation injections can delay or avoid surgery for years. Replacement is advised only when pain limits daily life despite these measures.",
  },
  {
    q: "Where can I consult Dr. Shreyas?",
    a: "At Dr. Shreyas Orthopedic Clinic, Vivekananda Nagar, Mysuru — Monday to Saturday, 5:00 PM to 9:00 PM (Sunday closed). He is also Assistant Professor in the Department of Orthopaedics at JSS Hospital, Mysore.",
  },
  {
    q: "Which conditions does Dr. Shreyas treat?",
    a: "Knee and shoulder arthroscopy, ACL and ligament reconstruction, meniscus and rotator cuff repair, joint replacement, foot and ankle problems, sports injuries, fractures and trauma, and non-surgical ortho biologics such as PRP.",
  },
  {
    q: "What should I expect after arthroscopy (key-hole surgery)?",
    a: "Most arthroscopies are day-care or a single overnight stay. You will walk the same or next day with support, use two or three small dressings, and begin guided physiotherapy within days. Desk work usually resumes in one to two weeks.",
  },
  {
    q: "Do I need an appointment, or can I walk in?",
    a: "Walk-ins are accepted during consulting hours, but booking online guarantees a slot and keeps your waiting time short. Please carry previous X-rays, MRI or CT scans and your current medication list.",
  },
];

export function FaqSection() {
  return (
    <section id="faqs" className="border-y border-border/60 bg-soft-blue">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Frequently asked questions
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">
            Answers before your visit
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {FAQS.map((f, i) => (
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
        <div className="mt-8 text-center">
          <Link to="/contact">
            <Button variant="outline" className="rounded-full">
              Still have a question? Contact us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}


/* ------------------------------------------------------------------ */
/* Doctor profile — featured two-column layout                          */
/* ------------------------------------------------------------------ */

const PROFILE_TAGS = [
  "Robotic Joint Replacement",
  "Knee & Shoulder Arthroscopy",
  "JSS Hospital, Mysore",
  "Languages: English / Kannada / Hindi",
];

const PROFILE_STATS = [
  { value: "12+", label: "Years" },
  { value: "2,000+", label: "Surgeries" },
  { value: "20,000+", label: "Patients" },
];

const PROFILE_SUBTITLE =
  "Orthopaedic Surgeon & Sports Medicine Specialist";

export function DoctorProfileFeature({
  image,
  name,
  qualifications,
  about,
}: {
  image: string;
  name: string;
  qualifications?: string | null;
  about?: string | null;
}) {
  return (
    <section id="about" className="border-b border-border/60 bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left: larger doctor image */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="rounded-[28px] bg-[linear-gradient(140deg,var(--primary),var(--accent))] p-[6px] shadow-[var(--shadow-soft)]">
            <div className="overflow-hidden rounded-[22px] bg-card">
              <img
                src={image}
                alt={name}
                width={1000}
                height={1250}
                loading="lazy"
                className="aspect-4/5 w-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Right: details */}
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Doctor Profile
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">
            {name}
          </h2>
          <p className="mt-1 font-medium text-accent">{PROFILE_SUBTITLE}</p>

          {about && (
            <p className="mt-5 whitespace-pre-line leading-relaxed text-muted-foreground">
              {about}
            </p>
          )}

          {qualifications && (
            <div className="mt-5 flex items-start gap-2 rounded-2xl border border-border/60 bg-card p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm font-medium leading-relaxed text-foreground/80">
                {qualifications}
              </p>
            </div>
          )}

          {/* Stats row */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {PROFILE_STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-center"
              >
                <p className="font-display text-2xl font-bold text-primary sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Tag pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {PROFILE_TAGS.map((t) => (
              <span
                key={t}
                className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book">
              <Button className="gap-2 rounded-full">
                <CalendarDays className="h-4 w-4" /> Book Appointment
              </Button>
            </Link>
            <Link to="/about-doctor">
              <Button variant="outline" className="rounded-full">
                View Full Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ------------------------------------------------------------------ */
/* Meet Dr. Shreyas — expanded bio + where to consult                    */
/* ------------------------------------------------------------------ */

const MEET_DESIGNATION =
  "Consultant — Arthroscopy, Knee & Shoulder Surgery, Joint Replacement, and Sports Medicine Specialist";

const MEET_BIO = `Dr. Shreyas M. J. is an Assistant Professor in the Department of Orthopaedics at JSS Hospital, Mysore, where he combines academic teaching with a busy surgical practice. He completed his MBBS and MS in Orthopaedics at JSS Medical College, before pursuing fellowships in Arthroscopy and Sports Medicine across India, Australia and Thailand — training that shaped his philosophy of minimally invasive, patient-first orthopaedic care.

His practice spans key-hole (arthroscopic) surgery of the knee and shoulder, primary and complex joint replacement, upper-limb trauma and regenerative (PRP) therapy for early joint preservation. Patients are guided through a clear plan of care — from diagnosis and conservative management to surgery and structured rehabilitation — with honest advice on when an operation is truly needed.`;

const SURGICAL_PHILOSOPHY_QUOTE =
  "I combine advanced international surgical precision with localized, empathetic patient care — the right operation at the right time, and never an operation that can be avoided.";

const JSS_ADDRESS =
  "JSS Medical College & Hospital, MG Road, Saraswathipuram, Mysuru, Karnataka 570004";
const JSS_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=JSS+Hospital+Mysore";

export function MeetDrShreyas({
  name,
  clinicName,
  address,
  mapsUrl,
}: {
  name: string;
  clinicName: string;
  address?: string | null;
  mapsUrl?: string | null;
}) {
  return (
    <section id="meet-dr-shreyas" className="border-b border-border/60 bg-soft-blue">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            About the Doctor
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">
            Meet {name}
          </h2>
          <p className="mt-2 font-medium text-foreground/80">{MEET_DESIGNATION}</p>
        </div>

        {/* Surgical philosophy blockquote */}
        <blockquote className="mx-auto mt-10 max-w-3xl border-l-4 border-accent bg-card/70 p-6 text-center italic text-lg leading-relaxed text-foreground/85 shadow-[var(--shadow-soft)] sm:p-8">
          <Quote className="mx-auto mb-3 h-8 w-8 text-accent" />
          "{SURGICAL_PHILOSOPHY_QUOTE}"
        </blockquote>

        {/* Extended bio */}
        <div className="mx-auto mt-10 max-w-3xl">
          <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
            {MEET_BIO}
          </p>
        </div>

        {/* Where to Consult */}
        <div className="mt-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Where to Consult
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-primary sm:text-3xl">
              Consult Dr. Shreyas in Mysuru
            </h3>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Primary practice */}
            <Card className="h-full overflow-hidden border-primary/15 py-0">
              <img
                src={clinicFrontageAsset.url}
                alt={`${clinicName} entrance and reception in Vivekananda Nagar, Mysuru`}
                className="h-48 w-full object-cover object-[center_20%] sm:h-56"
                loading="lazy"
              />
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Stethoscope className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                      Primary Practice
                    </p>
                    <h4 className="font-display text-lg font-semibold text-primary">
                      {clinicName}
                    </h4>
                  </div>
                </div>
                <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{address}</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Best for:</span>{" "}
                  OPD consultations, second opinions, sports injury assessment and
                  non-surgical joint preservation.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:mt-auto">
                  {mapsUrl && (
                    <a href={mapsUrl} target="_blank" rel="noreferrer" className="sm:flex-1">
                      <Button variant="outline" className="w-full gap-2 rounded-full">
                        <MapPin className="h-4 w-4" /> Open in Google Maps
                      </Button>
                    </a>
                  )}
                  <Link to="/book" className="sm:flex-1">
                    <Button className="w-full gap-2 rounded-full">
                      <CalendarDays className="h-4 w-4" /> Book Appointment
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Hospital affiliation */}
            <Card className="h-full border-primary/15 py-0">
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Building2 className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                      Hospital Affiliation
                    </p>
                    <h4 className="font-display text-lg font-semibold text-primary">
                      JSS Hospital, Mysore
                    </h4>
                  </div>
                </div>
                <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{JSS_ADDRESS}</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Best for:</span>{" "}
                  In-patient orthopaedic surgery, complex trauma, joint replacement
                  and arthroscopic procedures with full multidisciplinary support.
                </p>
                <div className="mt-6 flex sm:mt-auto">
                  <a href={JSS_MAPS_URL} target="_blank" rel="noreferrer" className="w-full sm:w-auto sm:px-8">
                    <Button variant="outline" className="w-full gap-2 rounded-full">
                      <MapPin className="h-4 w-4" /> Open in Maps
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Blog teaser                                                          */
/* ------------------------------------------------------------------ */

export function HomeBlogSection() {
  const posts = HOME_BLOG_SLUGS.map((slug) => BLOG_POSTS.find((p) => p.slug === slug)).filter(
    (p): p is (typeof BLOG_POSTS)[number] => Boolean(p),
  );
  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Blog</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-primary sm:text-3xl">
            Orthopaedic health guides from the clinic
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Card
              key={p.slug}
              className="h-full overflow-hidden border-primary/10 py-0 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
            >
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="aspect-16/10 w-full object-cover"
              />
              <CardContent className="p-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                  {p.category}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-primary">{p.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
                >
                  Read More →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/blog">
            <Button variant="outline" className="rounded-full">
              View all articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pre-footer doctor card                                                */
/* ------------------------------------------------------------------ */

const PREFOOTER_STATS = [
  { value: "12+", label: "Years" },
  { value: "2,000+", label: "Surgeries" },
  { value: "20,000+", label: "Patients" },
];

export function PreFooterDoctorCard({ image }: { image: string }) {
  return (
    <section className="bg-soft-blue">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-28">
        <div className="grid items-center gap-10 rounded-3xl border border-primary/10 bg-card p-6 shadow-[var(--shadow-soft)] md:grid-cols-2 md:p-10">
          <div className="order-1 mx-auto max-w-sm md:order-1">
            <img
              src={image}
              alt="Dr. Shreyas M. J. — Orthopaedic Surgeon & Sports Medicine Specialist"
              width={900}
              height={1100}
              loading="lazy"
              className="w-full rounded-2xl object-cover object-top shadow-md"
            />
          </div>
          <div className="order-2 md:order-2">
            <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">
              Dr. Shreyas M. J.
            </h2>
            <p className="mt-1.5 font-display text-base font-semibold text-accent">
              Orthopaedic Surgeon & Sports Medicine Specialist
            </p>

            <div className="mt-6 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-background/60">
              {PREFOOTER_STATS.map((s) => (
                <div key={s.label} className="px-3 py-4 text-center">
                  <p className="font-display text-2xl font-bold text-primary sm:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about-doctor">
                <Button variant="outline" className="rounded-full px-6">
                  Full profile
                </Button>
              </Link>
              <Link to="/book">
                <Button className="rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90">
                  <CalendarDays className="mr-2 h-4 w-4" /> Book an appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
