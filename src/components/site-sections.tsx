import { Link } from "@tanstack/react-router";
import { Award, CheckCircle2, Stethoscope, Trophy, Users } from "lucide-react";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  crumb,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumb?: string;
}) {
  return (
    <section className="border-b border-border/60 bg-hero-gradient">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        )}
        <h1 className="mt-2 font-display text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
          {title}
        </h1>
        {subtitle && <p className="mt-2 max-w-3xl text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
        <nav className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="px-2">/</span>
          <span className="text-primary">{crumb ?? title}</span>
        </nav>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
      )}
      <h2 className="mt-2 font-display text-2xl font-bold text-primary sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-sm text-muted-foreground sm:text-base">{description}</p>}
    </div>
  );
}

const trust = [
  {
    tag: "Patient Trust",
    icon: Users,
    title: "Clinical Experience",
    lead: "Assistant Professor, JSS Hospital, Mysore",
    body: "Fellowship trained in Arthroscopy & Sports Medicine — India, Australia & Thailand",
  },
  {
    tag: "Surgical Focus",
    icon: Stethoscope,
    title: "Surgical Track Record",
    lead: "Knee & Shoulder Arthroscopy",
    body: "Ligament Reconstruction | Meniscal Surgery | Joint Replacement | Upper & Lower Limb Trauma",
  },
  {
    tag: "Recognition",
    icon: Trophy,
    title: "Training & Memberships",
    lead: "KOA & MOA Member",
    body: "Senior Resident, SGITO Bengaluru | Senior Registrar, Fortis Hospital",
  },
];

export function TrustBand() {
  return (
    <section className="border-y border-border/60 bg-soft-blue">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Advanced Orthopaedic Care" title="Trusted Orthopaedic Expertise" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {trust.map((t) => (
            <div key={t.title} className="glass-card rounded-2xl p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <t.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-accent">
                {t.tag}
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold text-primary">{t.title}</h3>
              <p className="mt-2 text-sm font-semibold text-foreground">{t.lead}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TickList({ items }: { items: { title: string; body?: string }[] }) {
  return (
    <ul className="mt-6 grid gap-4 sm:grid-cols-2">
      {items.map((i) => (
        <li key={i.title} className="flex gap-3 rounded-xl border border-border/60 bg-card p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <div>
            <p className="font-semibold text-foreground">{i.title}</p>
            {i.body && <p className="mt-1 text-sm text-muted-foreground">{i.body}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function CtaBand({ children }: { children?: ReactNode }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-12 text-center sm:px-6 lg:px-8">
        <Award className="h-8 w-8" />
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          Ready to move without pain?
        </h2>
        <p className="max-w-2xl text-sm opacity-90">
          Book a consultation at Dr. Shreyas Orthopedic Clinic, Vivekananda Nagar, Mysuru — open
          Monday to Saturday, 5:00 PM to 9:00 PM.
        </p>
        {children}
      </div>
    </section>
  );
}
