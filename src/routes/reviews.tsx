import { OG_IMAGE, absUrl, breadcrumbLd } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell } from "@/components/page-shell";
import { GoogleGlyph } from "@/components/reviews-carousel";
import { SectionHeader, CtaBand } from "@/components/site-sections";
import { clinicQO, testimonialsQO, GOOGLE_REVIEWS_URL } from "@/lib/queries";
import type { Testimonial } from "@/lib/clinic";

const AVATAR_COLORS = [
  "bg-primary/15 text-primary",
  "bg-success/15 text-success",
  "bg-warning/15 text-warning",
  "bg-accent/15 text-accent",
];

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join("");
}

function ReviewCard({ t, idx }: { t: Testimonial; idx: number }) {
  return (
    <Card className="h-full border-primary/10 transition-shadow hover:shadow-lg">
      <CardContent className="flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-semibold ${
              AVATAR_COLORS[idx % AVATAR_COLORS.length]
            }`}
            aria-hidden
          >
            {initials(t.patient_name)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold leading-tight text-primary">
              {t.patient_name}
            </p>
            <p className="text-xs text-muted-foreground">Google Review</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-1">
            <GoogleGlyph className="h-4 w-4" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Google
            </span>
          </span>
        </div>

        <div className="mt-4 flex gap-0.5 text-warning">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < t.rating ? "fill-current" : "text-muted-foreground/30"}`}
            />
          ))}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-foreground/85">
          {t.content}
        </p>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Patient Reviews | Dr. Shreyas Orthopedic Clinic, Mysuru" },
      {
        name: "description",
        content:
          "Read patient experiences and reviews for Dr. Shreyas M.J, orthopaedic and arthroscopy surgeon in Mysuru.",
      },
      { property: "og:title", content: "Patient Reviews — Dr. Shreyas Orthopedic Clinic" },
      {
        property: "og:description",
        content: "What patients say about knee, shoulder and ankle care at the clinic.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: absUrl("/reviews") },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: absUrl("/reviews") }],
    scripts: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Reviews", path: "/reviews" },
      ]),
    ],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(clinicQO),
      context.queryClient.ensureQueryData(testimonialsQO),
    ]);
  },
  component: ReviewsPage,
});

function ReviewsPage() {
  const { data: reviews } = useSuspenseQuery(testimonialsQO);

  return (
    <PageShell>
      {/* Google Reviews badge / heading */}
      <section className="border-b border-border/60 bg-hero-gradient">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-5 text-center">
            <span className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2 shadow-[var(--shadow-soft)]">
              <GoogleGlyph className="h-7 w-7" />
              <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Google Reviews
              </span>
            </span>
            <h1 className="max-w-3xl font-display text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
              Read Reviews for Dr. Shreyas Orthopedic Clinic
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              Verified feedback from patients treated for knee, shoulder, ankle,
              trauma and joint replacement care in Mysuru.
            </p>
            <div className="mt-1 flex flex-wrap justify-center gap-3">
              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">
                <Button className="gap-2 rounded-full">
                  <GoogleGlyph className="h-4 w-4" /> Read reviews on Google
                </Button>
              </a>
              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-full">
                  Write a review
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Review card grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Testimonials"
          title="What our patients say"
          description="Real reviews from our Google Business profile, shared with patient consent."
        />
        {reviews.length ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((t, i) => (
              <ReviewCard key={t.id} t={t} idx={i} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No reviews yet. Be the first to share your experience.
          </p>
        )}
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
