import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { ArrowRight, Phone } from "lucide-react";

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
};

const SLIDES: Slide[] = [
  {
    image: doctorSlide,
    eyebrow: "Dr. Shreyas M. J. — MBBS, MS (Orthopaedics)",
    title: "Orthopaedic Surgeon, Arthroscopy & Sports Medicine",
    body: "Assistant Professor, JSS Hospital, Mysore. Fellowship trained in Arthroscopy & Sports Medicine — India, Australia & Thailand.",
    href: "/about-doctor",
    portrait: true,
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

export function HeroSlider({ phone }: { phone?: string | null }) {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

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
              <div className="relative h-[420px] w-full sm:h-[500px] lg:h-[560px]">
                {s.portrait ? (
                  <>
                    <div className="absolute inset-0 bg-hero-gradient" aria-hidden />
                    <img
                      src={s.image}
                      alt={s.title}
                      className="absolute bottom-0 right-0 h-full w-1/2 object-cover object-top opacity-90 sm:w-[42%] lg:w-[38%]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/30"
                      aria-hidden
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={s.image}
                      alt={s.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/20"
                      aria-hidden
                    />
                  </>
                )}
                <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                  <div className="max-w-xl text-primary-foreground sm:max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/80">
                      {s.eyebrow}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                      {s.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-sm opacity-90 sm:text-base">{s.body}</p>
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
                      {phone && (
                        <a href={`tel:${phone.replace(/\s/g, "")}`} className="hidden sm:block">
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
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 hidden border-none bg-background/70 sm:flex" />
        <CarouselNext className="right-4 hidden border-none bg-background/70 sm:flex" />
      </Carousel>
    </section>
  );
}
