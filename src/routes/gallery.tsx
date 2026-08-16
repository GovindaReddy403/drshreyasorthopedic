import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { PageHero, SectionHeader, CtaBand } from "@/components/site-sections";
import { clinicQO, galleryQO } from "@/lib/queries";
import gKnee from "@/assets/treat-knee.jpg";
import gShoulder from "@/assets/treat-shoulder.jpg";
import gAnkle from "@/assets/treat-ankle.jpg";
import gArthro from "@/assets/treat-arthroscopy.jpg";
import gPhysio from "@/assets/treat-physio.jpg";
import gXray from "@/assets/treat-xray.jpg";
import clinicBoard from "@/assets/clinic-board.png.asset.json";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Photo Gallery | Dr. Shreyas Orthopedic Clinic, Mysuru" },
      {
        name: "description",
        content:
          "Clinic photos, treatment moments and patient care at Dr. Shreyas Orthopedic Clinic, Vivekananda Nagar, Mysuru.",
      },
      { property: "og:title", content: "Gallery — Dr. Shreyas Orthopedic Clinic" },
      {
        property: "og:description",
        content: "A look inside the clinic, treatments and orthopaedic care in Mysuru.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(clinicQO),
      context.queryClient.ensureQueryData(galleryQO),
    ]);
  },
  component: GalleryPage,
});

const staticItems = [
  { image_url: clinicBoard.url, caption: "Dr. Shreyas Orthopedic Clinic — Vivekananda Nagar, Mysuru" },
  { image_url: gKnee, caption: "Knee assessment & ligament care" },
  { image_url: gShoulder, caption: "Shoulder examination" },
  { image_url: gAnkle, caption: "Ankle & foot injury care" },
  { image_url: gArthro, caption: "Arthroscopic (key-hole) surgery" },
  { image_url: gPhysio, caption: "Sports rehabilitation" },
  { image_url: gXray, caption: "Imaging review" },
];

function GalleryPage() {
  const { data: dbItems } = useSuspenseQuery(galleryQO);
  const items = [
    ...staticItems,
    ...dbItems.map((g) => ({ image_url: g.image_url, caption: g.caption ?? "" })),
  ];

  return (
    <PageShell>
      <PageHero
        eyebrow="Inside the clinic"
        title="Photo Gallery"
        subtitle="Clinical facilities, treatment moments and everyday orthopaedic care at Dr. Shreyas Orthopedic Clinic."
        crumb="Gallery"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Gallery"
          title="Treatment & clinic photos"
          description="Images shared with patient consent. Staff can add or update photos from the dashboard."
        />
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>figure]:mb-4">
          {items.map((item, i) => (
            <figure
              key={`${item.image_url}-${i}`}
              className="break-inside-avoid overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-soft)]"
            >
              <img
                src={item.image_url}
                alt={item.caption || "Clinic gallery photo"}
                className="w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                loading="lazy"
              />
              {item.caption && (
                <figcaption className="px-4 py-3 text-sm text-muted-foreground">
                  {item.caption}
                </figcaption>
              )}
            </figure>
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
