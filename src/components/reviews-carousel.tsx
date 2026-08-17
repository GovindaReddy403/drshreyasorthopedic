import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Testimonial } from "@/lib/clinic";

export function GoogleGlyph({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-label="Google">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

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

export function ReviewsCarousel({
  reviews,
  autoplay = true,
}: {
  reviews: Testimonial[];
  autoplay?: boolean;
}) {
  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: false }));
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    setSnaps(api.scrollSnapList());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  if (!reviews.length) return null;

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        plugins={autoplay ? [plugin.current] : []}
        className="w-full"
      >
        <CarouselContent>
          {reviews.map((t, idx) => (
            <CarouselItem key={t.id} className="md:basis-1/2">
              <Card className="h-full border-primary/10 transition-shadow hover:shadow-lg">
                <CardContent className="flex h-full flex-col p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-semibold ${
                        AVATAR_COLORS[idx % AVATAR_COLORS.length]
                      }`}
                      aria-hidden
                    >
                      {initials(t.patient_name)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold leading-tight">{t.patient_name}</p>
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
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-foreground/85">{t.content}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>

      <div className="mt-6 flex items-center justify-center gap-2">
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to review ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={`h-2.5 rounded-full transition-all ${
              selected === i ? "w-6 bg-primary" : "w-2.5 bg-primary/30 hover:bg-primary/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
