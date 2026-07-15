import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarDays,
  Clock,
  GraduationCap,
  Languages,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Stethoscope,
} from "lucide-react";

import heroImg from "@/assets/hero-doctor.jpg";
import doctorImg from "@/assets/doctor-portrait.jpg";
import clinicBoard from "@/assets/clinic-board.png.asset.json";
import gKnee from "@/assets/treat-knee.jpg";
import gShoulder from "@/assets/treat-shoulder.jpg";
import gAnkle from "@/assets/treat-ankle.jpg";
import gArthro from "@/assets/treat-arthroscopy.jpg";
import gPhysio from "@/assets/treat-physio.jpg";
import gXray from "@/assets/treat-xray.jpg";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/card-badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

import {
  fetchClinic,
  fetchDoctors,
  fetchTestimonials,
  fetchTreatments,
  fetchWorkingHours,
  formatMoney,
  formatTime,
  WEEKDAY_LABELS,
  type Doctor,
} from "@/lib/clinic";

const clinicQO = queryOptions({ queryKey: ["clinic"], queryFn: fetchClinic });
const doctorsQO = queryOptions({ queryKey: ["doctors"], queryFn: fetchDoctors });
const treatmentsQO = queryOptions({ queryKey: ["treatments"], queryFn: fetchTreatments });
const hoursQO = queryOptions({ queryKey: ["hours"], queryFn: fetchWorkingHours });
const testimonialsQO = queryOptions({ queryKey: ["testimonials"], queryFn: fetchTestimonials });

export const Route = createFileRoute("/")({
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
  const reviewsAutoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  const gallery = [
    { src: gKnee, caption: "Knee assessment & ligament care" },
    { src: gShoulder, caption: "Shoulder examination" },
    { src: gAnkle, caption: "Ankle & foot injury care" },
    { src: gArthro, caption: "Arthroscopic surgery" },
    { src: gPhysio, caption: "Sports rehabilitation" },
    { src: gXray, caption: "Imaging review" },
  ];

  return (
    <div id="top" className="min-h-screen bg-background">
      <SiteNav clinicName={clinic.clinic_name} phone={clinic.phone} />

      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <Stethoscope className="h-3.5 w-3.5" />
              {clinic.tagline ?? "Bone & Joint Care"}
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl">
              {clinic.clinic_name}
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              {primaryDoctor?.name ?? clinic.doctor_name} —{" "}
              {primaryDoctor?.specialization ?? clinic.specialization}.
              Arthroscopy, joint replacement, spine, foot &amp; ankle and trauma care in Mysuru.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book">
                <Button size="lg" className="gap-2">
                  Book appointment <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              {clinic.whatsapp && (
                <a
                  href={`https://wa.me/91${clinic.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button size="lg" variant="outline" className="gap-2">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </Button>
                </a>
              )}
              {clinic.phone && (
                <a href={`tel:${clinic.phone.replace(/\s/g, "")}`}>
                  <Button size="lg" variant="ghost" className="gap-2">
                    <Phone className="h-4 w-4" /> {clinic.phone}
                  </Button>
                </a>
              )}
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { label: "Timings", value: "5–9 PM" },
                { label: "Days", value: "Mon–Sat" },
                { label: "Experience", value: "12+ yrs" },
              ].map((s) => (
                <div key={s.label} className="glass-card rounded-2xl p-4">
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-foreground">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" aria-hidden />
            <img
              src={heroImg}
              alt={`${primaryDoctor?.name ?? clinic.doctor_name} at ${clinic.clinic_name}`}
              width={1600}
              height={1200}
              className="relative w-full rounded-[2rem] object-cover shadow-[var(--shadow-glow)]"
            />
            <div className="glass-card absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl px-4 py-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-success/15 text-success">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">Verified & board-certified</p>
                <p className="text-xs text-muted-foreground">
                  {primaryDoctor?.qualifications ?? clinic.qualifications}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About / Doctors */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={doctors.length > 1 ? "Meet the team" : "About the doctor"}
          title={doctors.length > 1 ? "Our doctors" : primaryDoctor?.name ?? clinic.doctor_name}
        />
        <div className="mt-10 space-y-16">
          {doctors.map((doc, idx) => (
            <DoctorProfile
              key={doc.id}
              doctor={doc}
              image={idx === 0 ? doctorImg : doc.photo_url ?? doctorImg}
              flip={idx % 2 === 1}
            />
          ))}
        </div>

        {/* Clinic name board */}
        <div className="mt-10 rounded-3xl border border-border bg-card p-4 sm:p-6">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <img
              src={clinicBoard.url}
              alt="Dr. Shreyas Orthopedic Clinic name board"
              className="w-full rounded-2xl object-cover shadow-[var(--shadow-soft)]"
              loading="lazy"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Look for this board
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                Dr. Shreyas M.J
              </h3>
              <p className="mt-2 text-muted-foreground">
                Sports Medicine Specialist &amp; Joint Replacement Surgeon · MBBS, MS (Ortho)
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Fellowship in Arthroscopy &amp; Sports Medicine (India &amp; Australia)
              </p>
              <p className="mt-4 text-sm">
                <span className="font-semibold">Timings:</span> 5:00 PM – 9:00 PM · Sunday Holiday
              </p>
              <p className="text-sm">
                <span className="font-semibold">Mobile:</span> 86609 50443
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section id="treatments" className="border-y border-border/60 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Treatments"
            title="Care tailored to what you need"
            subtitle="Every consultation includes a full history review, examination and a personalised plan."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map((t) => (
              <Card
                key={t.id}
                className="group transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
              >
                <CardContent className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold">{t.name}</h3>
                    <Badge>{formatMoney(t.fee)}</Badge>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{t.description}</p>
                  <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4" /> {t.duration_minutes} min
                    </span>
                    <Link to="/book" search={{ treatment: t.id }}>
                      <Button size="sm" variant="ghost" className="gap-1">
                        Book <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery (slider) */}
      <section id="gallery" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Treatment gallery"
          title="A glimpse of care in action"
          subtitle="From detailed assessments to arthroscopic procedures and rehabilitation."
        />
        <div className="mt-10">
          <Carousel opts={{ align: "start", loop: true }} plugins={[galleryAutoplay.current]} className="w-full">
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

      {/* Hours + location */}
      <section id="hours" className="border-y border-border/60 bg-muted/40">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <SectionHeader eyebrow="Working hours" title="When we're open" />
            <div className="mt-8 divide-y divide-border/60 rounded-2xl border border-border bg-card">
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
          <div>
            <SectionHeader eyebrow="Find us" title="Visit the clinic" />
            <div className="mt-8 rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{clinic.clinic_name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{clinic.address}</p>
                </div>
              </div>
              {clinic.google_maps_url && (
                <a href={clinic.google_maps_url} target="_blank" rel="noreferrer">
                  <Button variant="outline" className="mt-6 w-full">
                    Open in Google Maps
                  </Button>
                </a>
              )}
              <Link to="/book">
                <Button className="mt-3 w-full gap-2">
                  <CalendarDays className="h-4 w-4" /> Book appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews (slider) */}
      <section id="testimonials" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Patient Reviews
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            What our patients say
          </h2>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex gap-0.5 text-warning">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              5.0 · sample reviews · verified Google reviews will appear here once connected
            </span>
          </div>
        </div>
        <div className="mt-10">
          <Carousel opts={{ align: "start", loop: true }} plugins={[reviewsAutoplay.current]} className="w-full">
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
                    <Card className="relative h-full">
                      <CardContent className="flex h-full flex-col p-6">
                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex h-11 w-11 items-center justify-center rounded-full font-semibold ${color}`}
                          >
                            {initial}
                          </span>
                          <div className="flex-1">
                            <p className="font-medium leading-tight">{t.patient_name}</p>
                            <p className="text-xs text-muted-foreground">via Google</p>
                          </div>
                          <GoogleGlyph />
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                          <div className="flex gap-0.5 text-warning">
                            {Array.from({ length: t.rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
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
        <div className="mt-8 flex justify-center">
          <a href="https://maps.app.goo.gl/6WGqUa5tk2gTi1JD7" target="_blank" rel="noreferrer">
            <Button variant="outline" className="gap-2">
              <GoogleGlyph /> Read reviews on Google
            </Button>
          </a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Contact"
          title="Send us a message"
          subtitle="We reply within one business day."
        />
        <div className="mt-10">
          <ContactForm clinicEmail={clinic.email} />
        </div>
      </section>

      <SiteFooter clinic={clinic} />
    </div>
  );
}

function DoctorProfile({
  doctor,
  image,
  flip,
}: {
  doctor: Doctor;
  image: string;
  flip: boolean;
}) {
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
        <h3 className="font-display text-3xl font-semibold sm:text-4xl">{doctor.name}</h3>
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
          <InfoCard
            icon={Stethoscope}
            title="Experience"
            body={doctor.professional_experience}
          />
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
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
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
        <Icon className="h-4 w-4 text-primary" />
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
