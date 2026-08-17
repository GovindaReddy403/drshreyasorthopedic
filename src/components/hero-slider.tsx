import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { ArrowRight, Check, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import sKnee from "@/assets/treat-knee.jpg";
import sShoulder from "@/assets/treat-shoulder.jpg";
import sArthro from "@/assets/treat-arthroscopy.jpg";
import sPhysio from "@/assets/treat-physio.jpg";
import doctorSlideAsset from "@/assets/doctor-hero-slide.jpg.asset.json";

const doctorSlide = doctorSlideAsset.url;

type Slide = {
  image: string;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  portrait?: boolean;
  bullets?: string[];
};

const SLIDES: Slide[] = [
  {
    image: doctorSlide,
    eyebrow: "Dr. Shreyas M. J. — MBBS, MS (Orthopaedics)",
    title: "Orthopaedic Surgeon, Arthroscopy & Sports Medicine",
    body: "Assistant Professor, JSS Hospital, Mysore. Fellowship trained in Arthroscopy & Sports Medicine — India, Australia & Thailand.",
    href: "/about-doctor",
    portrait: true,
    bullets: [
      "Orthopaedic Surgeon — Fellowship in Arthroscopy & Sports Medicine",
      "Assistant Professor, JSS Hospital, Mysore",
      "Advanced Technologies in Orthopaedics",
    ],
  },

  {
    image: sArthro,
    eyebrow: "Advanced Orthopaedic Care",
    title: "Arthroscopy Knee & Shoulder — Key Hole Surgery",
    body: "Fellowship-trained arthroscopy and sports medicine care with faster recovery and smaller incisions.",
    href: "/specialties/knee-arthroscopy",
  },
  {
    image: sKnee,
    eyebrow: "Joint Replacement",
    title: "Pain-Free Movement, Restored",
    body: "Modern knee and hip implants with rapid-recovery protocols, planned individually for every patient.",
    href: "/specialties/joint-replacement",
  },
  {
    image: sShoulder,
    eyebrow: "Sports Injury",
    title: "Back to Sport, Safely",
    body: "Rotator cuff repair, recurrent dislocation surgery and milestone-based return-to-play rehabilitation.",
    href: "/specialties/shoulder-arthroscopy",
  },
  {
    image: sPhysio,
    eyebrow: "Trauma & Fractures",
    title: "Expert Fracture & Trauma Care",
    body: "High-volume trauma training from the Sanjay Gandhi Institute of Trauma & Orthopaedics.",
    href: "/specialties/trauma-and-fractures",
  },
];

/* Shared CTA row — 4 buttons: WhatsApp, Book, Read More, Phone */
function SlideCTAs({
  href,
  waHref,
  phone,
  showBullets,
}: {
  href: string;
  waHref?: string;
  phone?: string | null;
  showBullets: boolean;
}) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {showBullets && waHref && (
        <a href={waHref} target="_blank" rel="noreferrer">
          <Button
            size="lg"
            variant="outline"
            className="gap-2 rounded-full border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            <MessageCircle className="h-4 w-4" /> Consult Online via WhatsApp
          </Button>
        </a>
      )}

      <Link to="/book">
        <Button size="lg" variant="secondary" className="gap-2 rounded-full">
          Book An Appointment <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
      <Link to={href}>
        <Button
          size="lg"
          variant="outline"
          className="rounded-full border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
        >
          Read More
        </Button>
      </Link>
      {phone && (
        <a href={`tel:${phone.replace(/\s/g, "")}`}>
          <Button
            size="lg"
            variant="ghost"
            className="gap-2 rounded-full text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
          >
            <Phone className="h-4 w-4" /> {phone}
          </Button>
        </a>
      )}
    </div>
  );
}

export function HeroSlider({
  phone,
  whatsapp,
}: {
  phone?: string | null;
  whatsapp?: string | null;
}) {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const waHref = whatsapp ? `https://wa.me/91${whatsapp.replace(/\D/g, "")}` : undefined;

  return (
    <section className="relative">
      <Carousel
        opts={{ loop: true }}
        plugins={[autoplay.current, Fade()]}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {SLIDES.map((s) => (
            <CarouselItem key={s.title} className="pl-0">
              {s.portrait ? (
                /* ---- Doctor split slide: photo left/top, text right/bottom ---- */
                <div className="flex h-[840px] w-full flex-col sm:h-[640px] md:h-[560px] md:flex-row">
                  {/* Doctor photo — full width on top (mobile), left half (desktop) */}
                  <div className="relative h-64 w-full shrink-0 overflow-hidden sm:h-72 md:h-full md:w-1/2">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="absolute inset-0 h-full w-full object-cover object-[center_30%] sm:object-[center_30%] md:object-[right_top]"
                    />
                  </div>

                  {/* Text panel — below photo (mobile), right half (desktop) */}
                  <div className="relative flex w-full flex-1 items-center bg-primary md:h-full md:w-1/2">
                    <div className="mx-auto w-full max-w-xl px-5 py-6 text-primary-foreground sm:px-8 sm:py-8">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/80 sm:text-xs">
                        {s.eyebrow}
                      </p>
                      <h2 className="mt-2 font-display text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                        {s.title}
                      </h2>
                      <p className="mt-3 max-w-lg text-sm opacity-90 sm:text-base">
                        {s.body}
                      </p>
                      {s.bullets && (
                        <ul className="mt-4 space-y-1.5 text-sm sm:text-base">
                          {s.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2">
                              <Check className="mt-1 h-4 w-4 shrink-0 opacity-90" />
                              <span className="opacity-95">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <SlideCTAs
                        href={s.href}
                        waHref={waHref}
                        phone={phone}
                        showBullets={!!s.bullets}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* ---- Standard full-bleed background slide ---- */
                <div className="relative h-[420px] w-full sm:h-[500px] lg:h-[560px]">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/20"
                    aria-hidden
                  />
                  <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                    <div className="max-w-xl text-primary-foreground sm:max-w-2xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/80">
                        {s.eyebrow}
                      </p>
                      <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                        {s.title}
                      </h2>
                      <p className="mt-4 max-w-xl text-sm opacity-90 sm:text-base">
                        {s.body}
                      </p>
                      <div className="mt-7 flex flex-wrap gap-3">
                        <Link to="/book">
                          <Button size="lg" variant="secondary" className="gap-2 rounded-full">
                            Book An Appointment <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link to={s.href}>
                          <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                          >
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 hidden border-none bg-background/70 sm:flex" />
        <CarouselNext className="right-4 hidden border-none bg-background/70 sm:flex" />
      </Carousel>
    </section>
  );
}
