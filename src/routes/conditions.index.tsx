import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { PageHero, SectionHeader, CtaBand } from "@/components/site-sections";
import { CONDITIONS } from "@/lib/conditions";
import { breadcrumbLd, pageSeo } from "@/lib/seo";

const TITLE = "Injuries & Conditions We Treat | Dr. Shreyas Orthopedic Clinic, Mysuru";
const DESC =
  "Knee, shoulder, neck & back, foot & ankle and elbow & wrist problems explained — symptoms, causes, when to see a doctor and treatment options from self-care to key-hole surgery.";

export const Route = createFileRoute("/conditions/")({
  head: () => {
    const seo = pageSeo({ title: TITLE, description: DESC, path: "/conditions" });
    return {
      ...seo,
      scripts: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Injuries & Conditions", path: "/conditions" },
        ]),
      ],
    };
  },
  component: ConditionsIndex,
});

function ConditionsIndex() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Injuries & Conditions"
        title="Injuries & Conditions We Treat"
        subtitle="Understand your symptoms, what causes them, when to see an orthopaedic surgeon, and how treatment progresses from self-care to key-hole surgery."
        crumb="Injuries & Conditions"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Choose your area"
          title="Where does it hurt?"
          description="Each guide is written by Dr. Shreyas M.J for patients — plain language, no jargon."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CONDITIONS.map((c) => (
            <Link
              key={c.slug}
              to="/conditions/$slug"
              params={{ slug: c.slug }}
              className="card-lift group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-soft)]"
            >
              <img src={c.image} alt={c.title} className="h-44 w-full object-cover" loading="lazy" />
              <div className="p-5">
                <h2 className="font-display text-lg font-semibold text-primary">{c.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{c.short}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Read More <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
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
