import { OG_IMAGE, absUrl, breadcrumbLd } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { PageHero, SectionHeader, CtaBand } from "@/components/site-sections";
import { clinicQO, testimonialsQO, GOOGLE_REVIEWS_URL } from "@/lib/queries";

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
      <PageHero
        eyebrow="Patient experiences"
        title="Reviews"
        subtitle="Feedback from patients treated for knee, shoulder, ankle, trauma and joint replacement care."
        crumb="Reviews"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Testimonials"
          title="What our patients say"
          description="Verified reviews are also available on our Google Business profile."
        />
        <div className="mt-10">
          <ReviewsCarousel reviews={reviews} />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">
            <Button variant="outline" className="rounded-full">
              Read reviews on Google
            </Button>
          </a>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">
            <Button className="rounded-full">Write a review</Button>
          </a>
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
