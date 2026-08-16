export const SITE_URL = "https://drshreyasorthopedic.lovable.app";

/** Absolute, meaningful share image for the clinic. */
export const OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2405f49b-2e7a-449c-9d6f-0b2c5f0d6305/id-preview-1e4712ad--8ec5de39-4396-4f70-b465-49bced3ea343.lovable.app-1784139488576.png";

export const CLINIC_NAME = "Dr. Shreyas Orthopedic Clinic";
export const CLINIC_PHONE = "+91 86609 50443";
export const CLINIC_ADDRESS = {
  street: "Shop no 1, 5, Vivekananda Cir Rd, beside Karnataka Bank, Vivekanandana Nagar",
  locality: "Mysuru",
  region: "Karnataka",
  postalCode: "570023",
  country: "IN",
};

export function absUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type MetaEntry = Record<string, string>;

/** Standard per-page meta + canonical link, including og:image. */
export function pageSeo(opts: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
}) {
  const url = absUrl(opts.path);
  const image = opts.image ?? OG_IMAGE;
  const meta: MetaEntry[] = [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:type", content: opts.type ?? "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: image },
  ];
  return { meta, links: [{ rel: "canonical", href: url }] };
}

export function ldScript(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return ldScript({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absUrl(it.path),
    })),
  });
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return ldScript({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });
}

export function clinicLd(sameAs: string[] = []) {
  return ldScript({
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "Physician"],
    name: CLINIC_NAME,
    url: SITE_URL,
    image: OG_IMAGE,
    telephone: CLINIC_PHONE,
    medicalSpecialty: "Orthopedic",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: CLINIC_ADDRESS.street,
      addressLocality: CLINIC_ADDRESS.locality,
      addressRegion: CLINIC_ADDRESS.region,
      postalCode: CLINIC_ADDRESS.postalCode,
      addressCountry: CLINIC_ADDRESS.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: 12.3051, longitude: 76.6553 },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "17:00",
        closes: "21:00",
      },
    ],
    sameAs: sameAs.filter(Boolean),
  });
}

export function articleLd(opts: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  image?: string;
}) {
  return ldScript({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    image: opts.image ?? OG_IMAGE,
    mainEntityOfPage: absUrl(opts.path),
    datePublished: opts.datePublished,
    author: { "@type": "Person", name: "Dr. Shreyas M.J" },
    publisher: { "@type": "Organization", name: CLINIC_NAME },
  });
}
