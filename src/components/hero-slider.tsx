import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { ArrowRight, Check, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


import sKnee from "@/assets/hero-joint.png";
import sShoulder from "@/assets/hero-sports.png";
import sArthro from "@/assets/hero-arthroscopy.jpg";
import sPhysio from "@/assets/hero-trauma.png";
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
  imageClass?: string;
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
    imageClass: "object-[62%_center] md:object-center",
  },
  {
    image: sShoulder,
    eyebrow: "Sports Injury",
    title: "Back to Sport, Safely",
    body: "Rotator cuff repair, recurrent dislocation surgery and milestone-based return-to-play rehabilitation.",
    href: "/specialties/shoulder-arthroscopy",
    imageClass: "object-center md:object-center",
  },
  {
    image: sPhysio,
    eyebrow: "Trauma & Fractures",
    title: "Expert Fracture & Trauma Care",
    body: "High-volume trauma training from the Sanjay Gandhi Institute of Trauma & Orthopaedics.",
    href: "/specialties/trauma-and-fractures",
    imageClass: "object-center md:object-[70%_center]",
  },
];

/* Shared CTA row — 4 buttons: WhatsApp, Book, Read More, Phone */
function SlideCTAs({
  href,
  waHref,
  phone,
  showBullets,
  mobileBook,
}: {
  href: string;
  waHref?: string;
  phone?: string | null;
  showBullets: boolean;
  mobileBook?: boolean;
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
      {showBullets && waHref && (
        <a href={waHref} target="_blank" rel="noreferrer">
          <Button
            size="lg"
            className="gap-2 rounded-full bg-[#25d366] text-white hover:bg-[#1ebe57]"
          >
            <WhatsAppIcon className="h-4 w-4" /> Consult Online via WhatsApp
          </Button>
        </a>
      )}

      <Link to="/book" className={mobileBook ? "" : "hidden sm:block"}>
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
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="relative">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[autoplay.current, Fade()]}
        className="w-full"
      >

        <CarouselContent className="ml-0">
          {SLIDES.map((s) => (
            <CarouselItem key={s.title} className="pl-0">
              {s.portrait ? (
                /* ---- Doctor split slide: photo left/top, text right/bottom ---- */
                <div className="flex h-[600px] w-full flex-col sm:h-[520px] md:h-[500px] md:flex-row">
                   {/* Doctor photo — full width on top (mobile), left half (desktop).
                        Capped width on large screens so the portrait never over-scales
                        and crops the doctor's face. Taller on mobile so the blue
                        text panel stays compact with no empty gap at its top. */}
                   <div className="relative h-60 w-full shrink-0 overflow-hidden sm:h-64 md:h-full md:w-1/2 md:max-w-[760px]">
                     <img
                       src={s.image}
                       alt={s.title}
                       className="absolute inset-0 h-full w-full object-cover object-[center_30%] sm:object-[center_35%] md:object-[center_20%]"
                     />
                   </div>
 
                   {/* Text panel — below photo (mobile), fills remaining width (desktop).
                       Top-aligned on mobile with tight padding so no blue gap sits
                       between the photo and the text. */}
                   <div className="relative flex w-full flex-1 items-start bg-primary pt-3 md:h-full md:items-center">
                     <div className="mx-auto w-full max-w-xl px-4 pb-4 text-primary-foreground sm:px-8 sm:py-8">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/80 sm:text-xs">
                        {s.eyebrow}
                      </p>
                      <h2 className="mt-1.5 font-display text-xl font-bold leading-tight sm:mt-2 sm:text-3xl lg:text-4xl">
                        {s.title}
                      </h2>
                      <p className="mt-2 hidden max-w-lg text-sm opacity-90 sm:mt-3 sm:block sm:text-base">
                        {s.body}
                      </p>
                      {s.bullets && (
                        <ul className="mt-3 space-y-1 text-xs sm:mt-4 sm:text-base">
                          {s.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2">
                              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-90 sm:h-4 sm:w-4" />
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
                /* ---- Standard split slide: text left, photo right (desktop) / photo top, text bottom (mobile).
                     Mobile height is content-driven (no fixed empty space); desktop keeps a fixed height. */
                <div className="flex w-full flex-col md:h-[520px] md:flex-row-reverse">
                  {/* Photo — full width on top (mobile) with 16:10-ish proportion, right half (desktop). */}
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-[16/9] md:h-full md:w-3/5 md:aspect-auto">
                    <img
                      src={s.image}
                      alt={s.title}
                      className={`absolute inset-0 h-full w-full object-cover ${s.imageClass ?? ""}`}
                    />
                    <div
                      className="absolute inset-0 bg-primary/30 md:bg-transparent"
                      aria-hidden
                    />
                  </div>

                  {/* Text panel — below photo (mobile), fills remaining width (desktop). */}
                  <div className="relative flex w-full flex-1 items-start bg-primary pt-4 md:h-full md:items-center">
                    <div className="mx-auto w-full max-w-xl px-5 pb-6 text-primary-foreground sm:px-8 sm:py-8">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/80 sm:text-xs">
                        {s.eyebrow}
                      </p>
                      <h2 className="mt-2 font-display text-xl font-bold leading-tight sm:mt-2 sm:text-3xl lg:text-4xl">
                        {s.title}
                      </h2>
                      <p className="mt-2 max-w-lg text-sm opacity-90 sm:mt-3 sm:text-base">
                        {s.body}
                      </p>
                      <SlideCTAs
                        href={s.href}
                        waHref={waHref}
                        phone={phone}
                        showBullets={false}
                        mobileBook
                      />
                    </div>
                  </div>
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 top-[104px] border-none bg-background/70 sm:left-4 md:top-1/2" />
        <CarouselNext className="right-2 top-[104px] border-none bg-background/70 sm:right-4 md:top-1/2" />

        {/* Dots */}
        <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={`h-2.5 rounded-full transition-all ${
                selected === i
                  ? "w-6 bg-primary-foreground"
                  : "w-2.5 bg-primary-foreground/50 hover:bg-primary-foreground/80"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}

