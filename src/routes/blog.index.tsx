import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell } from "@/components/page-shell";
import { PageHero, SectionHeader, CtaBand } from "@/components/site-sections";
import { clinicQO } from "@/lib/queries";
import { BLOG_POSTS, formatPostDate } from "@/lib/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Orthopaedic Health Blog | Dr. Shreyas M.J, Mysuru" },
      {
        name: "description",
        content:
          "Patient guides on ACL injury, rotator cuff tears, knee replacement, PRP therapy, ankle instability and arthroscopic key-hole surgery from Dr. Shreyas M.J, Mysuru.",
      },
      { property: "og:title", content: "Orthopaedic Health Blog — Dr. Shreyas Orthopedic Clinic" },
      {
        property: "og:description",
        content:
          "Clear, practical articles on bone and joint problems, surgery and recovery written for patients.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(clinicQO);
  },
  component: BlogIndexPage,
});

function BlogIndexPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Patient education"
        title="Orthopaedic Health Blog"
        subtitle="Straightforward articles on joint pain, sports injuries, surgery and recovery — written to help you make an informed decision about your treatment."
        crumb="Blog"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Latest articles"
          title="Understanding your bones and joints"
          description="New guides are added as common patient questions come up in the clinic."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Card
              key={post.slug}
              className="flex h-full flex-col overflow-hidden border-primary/10 py-0 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
            >
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="aspect-16/10 w-full object-cover"
              />
              <CardContent className="flex flex-1 flex-col p-6">
                <span className="inline-flex w-fit rounded-full bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                  {post.category}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" /> {formatPostDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {post.readingTime}
                  </span>
                </div>
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="mt-5">
                  <Button size="sm" variant="outline" className="gap-1 rounded-full">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <CtaBand />
    </PageShell>
  );
}
