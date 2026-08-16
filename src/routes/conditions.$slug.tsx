import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageShell } from "@/components/page-shell";
import { PageHero, SectionHeader, CtaBand } from "@/components/site-sections";
import { CONDITIONS, getCondition } from "@/lib/conditions";
import { getSpecialty } from "@/lib/specialties";
import { breadcrumbLd, faqLd, pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/conditions/$slug")({
  loader: ({ params }) => {
    const condition = getCondition(params.slug);
    if (!condition) throw notFound();
    return { condition };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Condition not found" }, { name: "robots", content: "noindex" }] };
    }
    const c = loaderData.condition;
    const seo = pageSeo({
      title: `${c.title} — Symptoms, Causes & Treatment | Dr. Shreyas, Mysuru`,
      description: c.short,
      path: `/conditions/${params.slug}`,
      type: "article",
    });
    return {
      ...seo,
      scripts: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Injuries & Conditions", path: "/conditions" },
          { name: c.title, path: `/conditions/${params.slug}` },
        ]),
        faqLd(c.faqs),
      ],
    };
  },
  notFoundComponent: ConditionNotFound,
  component: ConditionDetail,
});

function ConditionNotFound() {
  return (
    <PageShell>
      <PageHero title="Condition not found" subtitle="This page may have moved." crumb="Not found" />
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Link to="/conditions">
          <Button className="rounded-full">View all conditions</Button>
        </Link>
      </div>
    </PageShell>
  );
}

function ConditionDetail() {
  const { condition: c } = Route.useLoaderData();
  const others = CONDITIONS.filter((o) => o.slug !== c.slug).slice(0, 3);
  const spec = getSpecialty(c.relatedSpecialty);

  return (
    <PageShell>
      <PageHero eyebrow="Injuries & Conditions" title={c.title} subtitle={c.short} crumb={c.title} />

      <div className="mx-auto max-w-7xl px-4 pt-6 text-xs text-muted-foreground sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link to="/conditions" className="hover:text-primary">
            Injuries &amp; Conditions
          </Link>
          <span>/</span>
          <span className="text-foreground">{c.title}</span>
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <article>
            <img
              src={c.image}
              alt={c.title}
              className="w-full rounded-3xl object-cover shadow-[var(--shadow-soft)]"
              loading="lazy"
            />
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">{c.intro}</p>
            <div className="mt-6">
              <Link to="/book">
                <Button size="lg" className="rounded-full">
                  Book An Appointment
                </Button>
              </Link>
            </div>

            <h2 className="mt-10 font-display text-2xl font-bold text-primary">
              Symptoms checklist
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {c.symptoms.map((s) => (
                <li
                  key={s}
                  className="flex gap-2 rounded-xl border border-border/60 bg-card p-3 text-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {s}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-display text-2xl font-bold text-primary">
              When to see a doctor
            </h2>
            <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
              <ul className="space-y-2">
                {c.redFlags.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" /> {r}
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="mt-10 font-display text-2xl font-bold text-primary">Common causes</h2>
            <div className="mt-4 space-y-4">
              {c.causes.map((cause) => (
                <div key={cause.name} className="rounded-2xl border border-border/60 bg-card p-5">
                  <h3 className="font-display text-lg font-semibold text-primary">{cause.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{cause.body}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 font-display text-2xl font-bold text-primary">Treatment ladder</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Treatment always begins with the least invasive option that can work — surgery is
              considered only when simpler measures have been given a fair trial.
            </p>
            <ol className="mt-4 space-y-4">
              {c.ladder.map((step, i) => (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-border/60 bg-card p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                      {step.stage}
                    </p>
                    <h3 className="font-display text-lg font-semibold text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="mt-10 font-display text-2xl font-bold text-primary">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="mt-4">
              {c.faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm font-semibold text-primary">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </article>

          <aside className="space-y-4">
            <div className="rounded-2xl bg-soft-blue p-6">
              <h2 className="font-display text-lg font-semibold text-primary">
                Consult Dr. Shreyas
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Clinic hours: Monday to Saturday, 5:00 PM – 9:00 PM. Sunday holiday.
              </p>
              <Link to="/book" className="mt-4 block">
                <Button className="w-full rounded-full">Book An Appointment</Button>
              </Link>
            </div>
            {spec && (
              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <h2 className="font-display text-lg font-semibold text-primary">
                  Related treatment
                </h2>
                <Link
                  to="/specialties/$slug"
                  params={{ slug: spec.slug }}
                  className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-accent" /> {spec.title}
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="border-t border-border/60 bg-soft-blue">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Explore" title="Other conditions" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/conditions/$slug"
                params={{ slug: o.slug }}
                className="card-lift overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-soft)]"
              >
                <img src={o.image} alt={o.title} className="h-40 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className="font-display text-base font-semibold text-primary">{o.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{o.short}</p>
                </div>
              </Link>
            ))}
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
