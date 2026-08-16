import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PlayCircle, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { PageHero, SectionHeader, CtaBand } from "@/components/site-sections";
import { clinicQO, GOOGLE_REVIEWS_URL } from "@/lib/queries";
import { CLINIC_VIDEOS, youtubeEmbedSrc, youtubeVideoId } from "@/lib/videos";

export const Route = createFileRoute("/videos")({
  head: () => {
    const seo = pageSeo({
      title: "Patient Education Videos | Dr. Shreyas Orthopedic Clinic, Mysuru",
      description:
        "Watch patient stories and orthopaedic education videos from Dr. Shreyas M.J — knee and shoulder arthroscopy, joint replacement, PRP and rehabilitation.",
      path: "/videos",
    });
    return {
      ...seo,
      scripts: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Patient Education Videos", path: "/videos" },
        ]),
      ],
    };
  },

  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(clinicQO);
  },
  component: VideosPage,
});

function VideosPage() {
  const { data: clinic } = useSuspenseQuery(clinicQO);
  const featuredId = youtubeVideoId(clinic.youtube_url);
  const channelUrl = clinic.youtube_url ?? GOOGLE_REVIEWS_URL;

  return (
    <PageShell>
      <PageHero
        eyebrow="Media & Videos"
        title="Patient Education Videos"
        subtitle="Patient recovery stories and short explainers on arthroscopy, joint replacement, biologics and rehabilitation."
        crumb="Videos"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
          {featuredId ? (
            <iframe
              title="Featured clinic video"
              src={youtubeEmbedSrc(featuredId, { autoplay: true })}
              className="aspect-video w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 bg-soft-blue text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-card text-primary shadow-[var(--shadow-soft)]">
                <PlayCircle className="h-8 w-8" />
              </span>
              <p className="font-display text-lg font-semibold text-primary">Video coming soon</p>
              <p className="max-w-md px-6 text-sm text-muted-foreground">
                The clinic&rsquo;s video channel is being set up. Films will be published here as
                they are recorded.
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <a href={channelUrl} target="_blank" rel="noreferrer">
            <Button variant="outline" className="gap-2 rounded-full">
              <Youtube className="h-4 w-4" /> Visit the channel
            </Button>
          </a>
        </div>
      </section>

      <section className="border-t border-border/60 bg-ice-blue">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Video library" title="Patient stories & explainers" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CLINIC_VIDEOS.map((v) => (
              <div
                key={v.title}
                className="card-lift overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="flex aspect-16/10 items-center justify-center bg-soft-blue">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-card text-primary shadow-[var(--shadow-soft)]">
                    <PlayCircle className="h-7 w-7" />
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                    {v.category}
                  </p>
                  <h3 className="mt-2 font-display text-base font-semibold text-primary">
                    {v.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.description}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Video coming soon
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/book">
              <Button className="rounded-full">Book An Appointment</Button>
            </Link>
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
