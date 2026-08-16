import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { PageHero, SectionHeader, CtaBand } from "@/components/site-sections";
import { clinicQO } from "@/lib/queries";
import { SPECIALTIES, getSpecialty } from "@/lib/specialties";

export const Route = createFileRoute("/specialties/$slug")({
  loader: async ({ context, params }) => {
    const spec = getSpecialty(params.slug);
    if (!spec) throw notFound();
    await context.queryClient.ensureQueryData(clinicQO);
    return { spec };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Treatment not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { spec } = loaderData;
    const title = `${spec.title} in Mysuru | Dr. Shreyas Orthopedic Clinic`;
    return {
      meta: [
        { title },
        { name: "description", content: spec.short },
        { property: "og:title", content: title },
        { property: "og:description", content: spec.short },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: SpecialtyNotFound,
  component: SpecialtyDetail,
});

function SpecialtyNotFound() {
  return (
    <PageShell>
      <PageHero title="Treatment not found" subtitle="This page may have moved." crumb="Not found" />
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Link to="/specialties">
          <Button className="rounded-full">View all specialties</Button>
        </Link>
      </div>
    </PageShell>
  );
}

function SpecialtyDetail() {
  const { spec } = Route.useLoaderData();
  const others = SPECIALTIES.filter((s) => s.slug !== spec.slug).slice(0, 3);

  return (
    <PageShell>
      <PageHero eyebrow="Area of Specialties" title={spec.title} subtitle={spec.short} crumb={spec.title} />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <article>
            <img
              src={spec.image}
              alt={spec.title}
              className="w-full rounded-3xl object-cover shadow-[var(--shadow-soft)]"
              loading="lazy"
            />
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">{spec.intro}</p>

            <h2 className="mt-10 font-display text-2xl font-bold text-primary">Conditions treated</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {spec.conditions.map((c) => (
                <li key={c} className="flex gap-2 rounded-xl border border-border/60 bg-card p-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {c}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-display text-2xl font-bold text-primary">Procedures offered</h2>
            <div className="mt-4 space-y-4">
              {spec.procedures.map((p) => (
                <div key={p.name} className="rounded-2xl border border-border/60 bg-card p-5">
                  <h3 className="font-display text-lg font-semibold text-primary">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 font-display text-2xl font-bold text-primary">Recovery & aftercare</h2>
            <ul className="mt-4 space-y-2">
              {spec.recovery.map((r) => (
                <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {r}
                </li>
              ))}
            </ul>
          </article>

          <aside className="space-y-4">
            <div className="rounded-2xl bg-soft-blue p-6">
              <h3 className="font-display text-lg font-semibold text-primary">Consult Dr. Shreyas</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Clinic hours: Monday to Saturday, 5:00 PM – 9:00 PM. Sunday holiday.
              </p>
              <Link to="/book" className="mt-4 block">
                <Button className="w-full rounded-full">Book An Appointment</Button>
              </Link>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <h3 className="font-display text-lg font-semibold text-primary">Other specialties</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      to="/specialties/$slug"
                      params={{ slug: o.slug }}
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
                    >
                      <ArrowRight className="h-3.5 w-3.5 text-accent" /> {o.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-border/60 bg-soft-blue">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Explore" title="More treatments" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/specialties/$slug"
                params={{ slug: o.slug }}
                className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-soft)]"
              >
                <img src={o.image} alt={o.title} className="h-40 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className="font-display text-base font-semibold text-primary">{o.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{o.short}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
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
