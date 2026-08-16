import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { PageHero, CtaBand } from "@/components/site-sections";
import { clinicQO } from "@/lib/queries";
import { BLOG_POSTS, formatPostDate, getPost } from "@/lib/blog";
import { ARTICLE_SECTIONS } from "@/lib/blog-longform";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ context, params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    await context.queryClient.ensureQueryData(clinicQO);
    return { post };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found | Dr. Shreyas Orthopedic Clinic" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    const path = `/blog/${params.slug}`;
    const seo = pageSeo({
      title: `${post.title} | Dr. Shreyas Orthopedic Clinic`,
      description: post.excerpt,
      path,
      type: "article",
      image: post.image?.startsWith("http") ? post.image : undefined,
    });
    return {
      ...seo,
      scripts: [
        articleLd({
          title: post.title,
          description: post.excerpt,
          path,
          datePublished: post.date,
        }),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path },
        ]),
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
  const sections = ARTICLE_SECTIONS[post.slug];
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <PageShell>
      <PageHero eyebrow={post.category} title={post.title} subtitle={post.excerpt} crumb="Blog" />

      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-primary">
            Blog
          </Link>
          <span>/</span>
          <span className="text-foreground">{post.category}</span>
        </nav>

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

        {sections ? (
          <div className="mt-8 space-y-8">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-display text-xl font-bold text-primary sm:text-2xl">{s.heading}</h2>
                <div className="mt-3 space-y-4 text-base leading-relaxed text-foreground/85">
                  {s.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/85">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}

        <div className="mt-10 flex gap-4 rounded-2xl border border-border bg-card p-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-soft-blue text-primary">
            <Stethoscope className="h-6 w-6" />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">About the author</p>
            <h3 className="mt-1 font-display text-lg font-semibold text-primary">Dr. Shreyas M.J</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Consultant Orthopaedic Surgeon in Mysuru specialising in arthroscopy of the knee and
              shoulder, joint replacement, foot &amp; ankle surgery and trauma care. Fellowship-trained
              in arthroscopy and sports medicine (India, Australia and Thailand) and Assistant
              Professor at JSS Hospital.
            </p>
            <Link to="/about-doctor" className="mt-3 inline-block text-sm font-semibold text-accent">
              Read full profile →
            </Link>
          </div>
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
