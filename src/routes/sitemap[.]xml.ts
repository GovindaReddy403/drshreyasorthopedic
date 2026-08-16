import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SPECIALTIES } from "@/lib/specialties";
import { CONDITIONS } from "@/lib/conditions";
import { BLOG_POSTS } from "@/lib/blog";

const BASE_URL = "https://drshreyasorthopedic.lovable.app";

type Entry = { path: string; changefreq: string; priority: string };

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls: Entry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about-doctor", changefreq: "monthly", priority: "0.8" },
          { path: "/specialties", changefreq: "monthly", priority: "0.9" },
          { path: "/conditions", changefreq: "monthly", priority: "0.9" },
          { path: "/gallery", changefreq: "monthly", priority: "0.6" },
          { path: "/awards", changefreq: "yearly", priority: "0.5" },
          { path: "/media-coverage", changefreq: "monthly", priority: "0.5" },
          { path: "/videos", changefreq: "monthly", priority: "0.6" },
          { path: "/reviews", changefreq: "monthly", priority: "0.6" },
          { path: "/blog", changefreq: "weekly", priority: "0.8" },
          { path: "/contact", changefreq: "monthly", priority: "0.7" },
          { path: "/book", changefreq: "monthly", priority: "0.9" },
          ...SPECIALTIES.map((s) => ({
            path: `/specialties/${s.slug}`,
            changefreq: "monthly",
            priority: "0.8",
          })),
          ...CONDITIONS.map((c) => ({
            path: `/conditions/${c.slug}`,
            changefreq: "monthly",
            priority: "0.8",
          })),
          ...BLOG_POSTS.map((p) => ({
            path: `/blog/${p.slug}`,
            changefreq: "monthly",
            priority: "0.7",
          })),
        ];

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls.map(
            (u) =>
              `  <url><loc>${BASE_URL}${u.path}</loc><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`,
          ),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
