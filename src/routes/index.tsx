import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  GraduationCap,
  Languages,
  MapPin,
  MessageCircle,
  Phone,
  Stethoscope,
  Star,
  Trophy,
  Users,
} from "lucide-react";

import doctorAsset from "@/assets/doctor-portrait.png.asset.json";
const doctorImg = doctorAsset.url;

import gKnee from "@/assets/treat-knee.jpg";
import gShoulder from "@/assets/treat-shoulder.jpg";
import gAnkle from "@/assets/treat-ankle.jpg";
import gArthro from "@/assets/treat-arthroscopy.jpg";
import gPhysio from "@/assets/treat-physio.jpg";
import gXray from "@/assets/treat-xray.jpg";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ContactQR } from "@/components/contact-qr";
import { FloatingActions } from "@/components/floating-actions";
import { HeroSlider } from "@/components/hero-slider";
import { SPECIALTIES } from "@/lib/specialties";
import {
  AppointmentCtaBand,
  CareRoadmap,
  CentreOfExcellence,
  ClinicMap,
  SpecialtyImageCards,
  StatsBand,
  SurgicalPhilosophy,
  TrustedExpertiseBand,
  WhyChooseClinic,
  WhyPatientsTrust,
} from "@/components/home-sections";

import {
  fetchClinic,
  fetchDoctors,
  fetchTestimonials,
  fetchTreatments,
  fetchWorkingHours,
  formatTime,
  WEEKDAY_LABELS,
  type Doctor,
} from "@/lib/clinic";

const clinicQO = queryOptions({ queryKey: ["clinic"], queryFn: fetchClinic });
const doctorsQO = queryOptions({ queryKey: ["doctors"], queryFn: fetchDoctors });
const treatmentsQO = queryOptions({ queryKey: ["treatments"], queryFn: fetchTreatments });
const hoursQO = queryOptions({ queryKey: ["hours"], queryFn: fetchWorkingHours });
const testimonialsQO = queryOptions({ queryKey: ["testimonials"], queryFn: fetchTestimonials });

const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/6WGqUa5tk2gTi1JD7";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Dr. Shreyas M.J | Orthopedic Surgeon in Mysuru | Bone & Joint Care",
      },
      {
        name: "description",
        content:
          "Dr. Shreyas M.J, MBBS, MS (Ortho) — arthroscopy, joint replacement, spine, foot & ankle and trauma care in Mysuru. Book an appointment online, Mon–Sat 5–9 PM.",
      },
      {
        property: "og:title",
        content: "Dr. Shreyas Orthopedic Clinic — Bone & Joint Care, Mysuru",
      },
      {
        property: "og:description",
        content:
          "Fellowship-trained orthopedic surgeon in Mysuru. Knee, shoulder and ankle arthroscopy, joint replacement and trauma care.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(clinicQO),
      context.queryClient.ensureQueryData(doctorsQO),
      context.queryClient.ensureQueryData(treatmentsQO),
      context.queryClient.ensureQueryData(hoursQO),
      context.queryClient.ensureQueryData(testimonialsQO),
    ]);
  },
  component: LandingPage,
});

function LandingPage() {
  const { data: clinic } = useSuspenseQuery(clinicQO);
  const { data: doctors } = useSuspenseQuery(doctorsQO);
  const { data: treatments } = useSuspenseQuery(treatmentsQO);
  const { data: hours } = useSuspenseQuery(hoursQO);
  const { data: testimonials } = useSuspenseQuery(testimonialsQO);

  const primaryDoctor: Doctor | undefined = doctors[0];

  const galleryAutoplay = useRef(Autoplay({ delay: 3500, stopOnInteraction: false }));
  const reviewsAutoplay = useRef(Autoplay({ delay: 6000, stopOnInteraction: false }));
  const specialtiesAutoplay = useRef(Autoplay({ delay: 4500, stopOnInteraction: false }));

  const waHref = clinic.whatsapp
    ? `https://wa.me/91${clinic.whatsapp.replace(/\D/g, "")}`
    : undefined;

  const gallery = [
    { src: gKnee, caption: "Knee assessment & ligament care" },
    { src: gShoulder, caption: "Shoulder examination" },
    { src: gAnkle, caption: "Ankle & foot injury care" },
    { src: gArthro, caption: "Arthroscopic surgery" },
    { src: gPhysio, caption: "Sports rehabilitation" },
    { src: gXray, caption: "Imaging review" },
  ];

  const highlights = [
    "MBBS, MS (Orthopaedics) — JSS Medical College and Hospital, Mysore",
    "Assistant Professor, Dept. of Orthopaedics, JSS Hospital, Mysore",
    "Fellowships in Arthroscopy & Sports Medicine — India, Australia & Thailand",
    "Knee & Shoulder Arthroscopy, Ligament Reconstruction, Upper Limb Trauma",
  ];

  return (
    <div id="top" className="min-h-screen bg-background pb-16 lg:pb-0">
      <SiteNav clinicName={clinic.clinic_name} phone={clinic.phone} />
      <FloatingActions
        phone={clinic.phone}
        whatsapp={clinic.whatsapp}
        mapsUrl={clinic.google_maps_url ?? GOOGLE_REVIEWS_URL}
      />

      <HeroSlider phone={clinic.phone} />

      {/* Headline + CTA */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold leading-tight text-primary sm:text-4xl">
            Fellowship-Trained Orthopaedic Surgeon &amp; Sports Medicine Specialist in Mysuru
          </h2>
          <p className="mt-3 font-display text-lg font-semibold text-foreground/85">
            {clinic.clinic_name} — Advanced Technologies in Orthopaedic Care
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Arthroscopy of knee &amp; shoulder (key-hole surgery), joint replacement, spine injury,
            foot &amp; ankle and trauma care — restoring pain-free mobility with a personalised
            treatment plan for every patient.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/book">
              <Button size="lg" className="rounded-full px-7">
                Book Clinic Appointment
              </Button>
            </Link>
            {waHref && (
              <a href={waHref} target="_blank" rel="noreferrer">
                <Button
                  size="lg"
                  className="rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90"
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> Consult Online via WhatsApp
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>

      <StatsBand />
      <SpecialtyImageCards />
      <CentreOfExcellence />

      {/* About / Doctors */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={doctors.length > 1 ? "Meet the team" : "About the doctor"}
          title={
            doctors.length > 1 ? "Our doctors" : `Meet ${primaryDoctor?.name ?? clinic.doctor_name}`
          }
        />
        <div className="mt-10 space-y-16">
          {doctors.map((doc, idx) => (
            <DoctorProfile
              key={doc.id}
              doctor={doc}
              image={idx === 0 ? doctorImg : (doc.photo_url ?? doctorImg)}
              flip={idx % 2 === 1}
            />
          ))}
        </div>
      </section>

      <WhyPatientsTrust />

      {/* Treatments / Area of specialties — slider with Read More */}
      <section id="treatments" className="border-y border-border/60 bg-soft-blue">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Area of specialties"
            title="Conditions & procedures we treat"
            subtitle="Every consultation includes a full history review, examination and a personalised plan."
          />
          <div className="mt-10">
            <Carousel
              opts={{ align: "start", loop: true }}
              plugins={[specialtiesAutoplay.current]}
              className="w-full"
            >
              <CarouselContent>
                {SPECIALTIES.map((s) => (
                  <CarouselItem key={s.slug} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full overflow-hidden border-primary/10 py-0 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        className="aspect-4/3 w-full object-cover"
                      />
                      <CardContent className="flex h-full flex-col p-6">
                        <h3 className="font-display text-xl font-semibold text-primary">
                          {s.title}
                        </h3>
                        <p className="mt-3 text-sm text-muted-foreground">{s.short}</p>
                        <div className="mt-6 flex items-center justify-between pb-6">
                          <Link to="/specialties/$slug" params={{ slug: s.slug }}>
                            <Button size="sm" variant="outline" className="gap-1 rounded-full">
                              Read More <ArrowRight className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                          <Link to="/book">
                            <Button size="sm" variant="ghost" className="gap-1">
                              Book <ArrowRight className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
          <div className="mt-8 text-center">
            <Link to="/specialties">
              <Button variant="outline" className="rounded-full">
                View all specialties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Treatment gallery"
          title="A glimpse of care in action"
          subtitle="From detailed assessments to arthroscopic procedures and rehabilitation."
        />
        <div className="mt-10">
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[galleryAutoplay.current]}
            className="w-full"
          >
            <CarouselContent>
              {gallery.map((g, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <figure className="group relative overflow-hidden rounded-3xl">
                    <img
                      src={g.src}
                      alt={g.caption}
                      width={1200}
                      height={900}
                      loading="lazy"
                      className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm font-medium text-white">
                      {g.caption}
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>

      {/* Google Reviews */}
      <section id="testimonials" className="border-y border-border/60 bg-soft-blue">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <GoogleGlyph /> Google Reviews
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-primary sm:text-4xl">
              What patients say about {primaryDoctor?.name ?? clinic.doctor_name}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Patient feedback from families treated for orthopaedic care, sports injuries, joint
              replacement and post-surgery recovery support.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-warning">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
          </div>

          <div className="mt-10">
            <Carousel
              opts={{ align: "start", loop: true }}
              plugins={[reviewsAutoplay.current]}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((t) => {
                  const initial = t.patient_name.trim().charAt(0).toUpperCase();
                  const colors = [
                    "bg-primary/15 text-primary",
                    "bg-success/15 text-success",
                    "bg-warning/15 text-warning",
                  ];
                  const color = colors[t.patient_name.charCodeAt(0) % colors.length];
                  return (
                    <CarouselItem key={t.id} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="h-full border-primary/10">
                        <CardContent className="flex h-full flex-col p-6">
                          <div className="flex items-center gap-3">
                            <span
                              className={`inline-flex h-11 w-11 items-center justify-center rounded-full font-semibold ${color}`}
                            >
                              {initial}
                            </span>
                            <div className="flex-1">
                              <p className="font-medium leading-tight">{t.patient_name}</p>
                              <p className="text-xs text-muted-foreground">Google Review</p>
                            </div>
                            <GoogleGlyph />
                          </div>
                          <div className="mt-4 flex gap-0.5 text-warning">
                            {Array.from({ length: t.rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                            {t.content}
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">
              <Button variant="outline" className="gap-2 rounded-full">
                <GoogleGlyph /> Read Google Reviews
              </Button>
            </a>
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">
              <Button className="rounded-full">Write a Review</Button>
            </a>
          </div>
        </div>
      </section>

      <SurgicalPhilosophy image={doctorImg} name={primaryDoctor?.name ?? clinic.doctor_name} />

      {/* Where to consult */}

      <section id="hours" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Where to consult" title="Visit the clinic" />
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-xl font-semibold text-primary">
              Primary Private Practice
            </h3>
            <div className="mt-4 flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-accent" />
              <div>
                <p className="font-medium">{clinic.clinic_name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{clinic.address}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Best for:</span> OPD consultations,
              second opinions, sports injury assessment and non-surgical joint preservation.
            </p>
            {clinic.google_maps_url && (
              <a href={clinic.google_maps_url} target="_blank" rel="noreferrer">
                <Button variant="outline" className="mt-6 w-full rounded-full">
                  Open in Google Maps
                </Button>
              </a>
            )}
            <Link to="/book">
              <Button className="mt-3 w-full gap-2 rounded-full">
                <CalendarDays className="h-4 w-4" /> Book appointment
              </Button>
            </Link>
            <div className="mt-6">
              <ContactQR clinic={clinic} />
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-primary">Consulting hours</h3>
            <div className="mt-4 divide-y divide-border/60 rounded-2xl border border-border bg-card">
              {hours.map((h) => (
                <div key={h.weekday} className="flex items-center justify-between px-5 py-3">
                  <span className="font-medium">{WEEKDAY_LABELS[h.weekday]}</span>
                  <span className="text-sm text-muted-foreground">
                    {!h.is_open
                      ? "Closed"
                      : [
                          h.morning_start &&
                            `${formatTime(h.morning_start)} – ${formatTime(h.morning_end)}`,
                          h.evening_start &&
                            `${formatTime(h.evening_start)} – ${formatTime(h.evening_end)}`,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WhyChooseClinic />
      <CareRoadmap />
      <AppointmentCtaBand />
      <ClinicMap address={clinic.address} />
      <TrustedExpertiseBand />

      <SiteFooter clinic={clinic} />
    </div>
  );
}

function DoctorProfile({ doctor, image, flip }: { doctor: Doctor; image: string; flip: boolean }) {
  return (
    <div className={`grid gap-12 md:grid-cols-5 ${flip ? "md:[direction:rtl]" : ""}`}>
      <div className="md:col-span-2 md:[direction:ltr]">
        <img
          src={image}
          alt={doctor.name}
          width={900}
          height={1100}
          loading="lazy"
          className="w-full max-w-sm rounded-3xl object-cover shadow-[var(--shadow-soft)]"
        />
      </div>
      <div className="md:col-span-3 md:[direction:ltr]">
        <h3 className="font-display text-3xl font-semibold text-primary sm:text-4xl">
          {doctor.name}
        </h3>
        <p className="mt-1 text-muted-foreground">
          {doctor.qualifications}
          {doctor.specialization ? ` · ${doctor.specialization}` : ""}
        </p>
        {doctor.about && (
          <p className="mt-6 whitespace-pre-line leading-relaxed text-foreground/85">
            {doctor.about}
          </p>
        )}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <InfoCard icon={GraduationCap} title="Education" body={doctor.education} />
          <InfoCard icon={Stethoscope} title="Experience" body={doctor.professional_experience} />
          <InfoCard icon={BadgeCheck} title="Fellowship" body={doctor.certifications} />
          <InfoCard icon={Award} title="Memberships" body={doctor.memberships} />
        </div>
        {doctor.languages_spoken && (
          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Languages className="h-4 w-4" />
            <span>Speaks {doctor.languages_spoken}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Award;
  title: string;
  body: string | null | undefined;
}) {
  if (!body) return null;
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-accent" />
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
      <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-label="Google">
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
