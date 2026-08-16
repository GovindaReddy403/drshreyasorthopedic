import { OG_IMAGE, absUrl, breadcrumbLd } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Newspaper, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { PageHero, SectionHeader, CtaBand } from "@/components/site-sections";
import { clinicQO } from "@/lib/queries";
import doctorAsset from "@/assets/doctor-portrait.png.asset.json";

export const Route = createFileRoute("/media-coverage")({
  head: () => ({
    meta: [
      { title: "Media Coverage & Health Talks | Dr. Shreyas M.J, Mysuru" },
      {
        name: "description",
        content:
          "Health awareness articles, expert views and community talks by Dr. Shreyas M.J on joint pain, sports injuries and bone health.",
      },
      { property: "og:title", content: "Media Coverage — Dr. Shreyas Orthopedic Clinic" },
      {
        property: "og:description",
        content: "Expert commentary and awareness features on bone and joint health from Mysuru.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: absUrl("/media-coverage") },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: absUrl("/media-coverage") }],
    scripts: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Media", path: "/media-coverage" },
      ]),
    ],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(clinicQO);
  },
  component: MediaPage,
});

const features = [
  {
    n: "01",
    outlet: "Health Awareness Talk",
    title: "Why young adults are facing joint and back problems",
    body: "Long hours of sitting, screen time and poor posture are bringing knee, neck and back pain to people in their 20s and 30s. Early evaluation, strength training and movement breaks prevent most of it.",
  },
  {
    n: "02",
    outlet: "Sports Injury Camp",
    title: "ACL injuries in amateur athletes — prevention over repair",
    body: "Most non-contact ACL tears follow a predictable landing and pivoting pattern. Neuromuscular training programmes measurably reduce that risk in club-level players.",
  },
  {
    n: "03",
    outlet: "Community Session",
    title: "Knee arthritis: what to try before replacement surgery",
    body: "Weight management, quadriceps strengthening, activity modification and targeted injections help many patients delay or avoid joint replacement.",
  },
  {
    n: "04",
    outlet: "Clinic Education",
    title: "Shoulder pain that is not just a 'frozen shoulder'",
    body: "Rotator cuff tears are often mislabelled as frozen shoulder. Distinguishing the two changes both treatment and outcome.",
  },
];

function MediaPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Featured"
        title="Media Coverage & Health Talks"
        subtitle="Awareness features, patient education sessions and expert commentary on bone and joint health."
        crumb="Media Coverage"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
          <div>
            <img
              src={doctorAsset.url}
              alt="Dr. Shreyas M.J"
              className="w-full rounded-3xl object-cover shadow-[var(--shadow-soft)]"
              loading="lazy"
            />
          </div>
          <div>
            <SectionHeader align="left" eyebrow="Expert view" title="Dr. Shreyas M.J's perspective" />
            <div className="mt-5 rounded-2xl border border-border/60 bg-card p-6">
              <Quote className="h-6 w-6 text-accent" />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Joint and back problems are no longer limited to older adults. Sedentary routines,
                prolonged screen time and inadequate physical activity are bringing knee, shoulder
                and back pain to much younger patients. The encouraging part is that most of these
                conditions are preventable — regular exercise, strength training, a healthy weight,
                good posture and frequent movement breaks make a real difference. Persistent pain
                should never be ignored; timely diagnosis usually prevents the need for major
                surgery later.
              </p>
              <p className="mt-4 text-sm font-semibold text-primary">
                — Dr. Shreyas M.J, MBBS, MS (Ortho), Fellowship in Arthroscopy &amp; Sports Medicine
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-soft-blue">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Featured coverage"
            title="Talks, articles & awareness sessions"
            description="Patient education content shared through camps, community sessions and clinic outreach."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {features.map((f) => (
              <article key={f.n} className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Newspaper className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                      {f.outlet}
                    </p>
                    <p className="font-display text-sm font-semibold text-primary">{f.n}</p>
                  </div>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-primary">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </article>
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
