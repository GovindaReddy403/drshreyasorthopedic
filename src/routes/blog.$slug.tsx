import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { PageHero, CtaBand } from "@/components/site-sections";
import { clinicQO } from "@/lib/queries";
import { BLOG_POSTS, formatPostDate, getPost } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ context, params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    await context.queryClient.ensureQueryData(clinicQO);
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found | Dr. Shreyas Orthopedic Clinic" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | Dr. Shreyas Orthopedic Clinic` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  component: BlogPostPage,
});

function PostNotFound() {
  return (
    <PageShell>
      <PageHero title="Article not found" subtitle="This article may have been moved." crumb="Blog" />
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <Link to="/blog">
          <Button className="rounded-full">Back to all articles</Button>
        </Link>
      </div>
    </PageShell>
  );
}

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <PageShell>
      <PageHero eyebrow={post.category} title={post.title} subtitle={post.excerpt} crumb="Blog" />

      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" /> {formatPostDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {post.readingTime}
          </span>
        </div>
        <img
          src={post.image}
          alt={post.title}
          className="mt-6 aspect-16/9 w-full rounded-3xl object-cover"
        />
        <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/85">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <p className="mt-8 rounded-2xl border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
          This article is general information and not a substitute for a clinical examination. For
          advice on your specific problem, book a consultation at the clinic.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/book">
            <Button className="rounded-full">Book an appointment</Button>
          </Link>
          <Link to="/blog">
            <Button variant="outline" className="gap-2 rounded-full">
              <ArrowLeft className="h-4 w-4" /> All articles
            </Button>
          </Link>
        </div>
      </article>

      <section className="border-t border-border/60 bg-soft-blue">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-primary">More articles</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group overflow-hidden rounded-2xl border border-border bg-card"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="aspect-16/10 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                    {p.category}
                  </p>
                  <h3 className="mt-2 font-display text-base font-semibold text-primary">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </PageShell>
  );
}
