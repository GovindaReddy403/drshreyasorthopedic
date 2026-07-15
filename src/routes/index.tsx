import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
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
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
} from "lucide-react";

import heroImg from "@/assets/hero-doctor.jpg";
import doctorImg from "@/assets/doctor-portrait.jpg";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import {
  fetchClinic,
  fetchFaqs,
  fetchTestimonials,
  fetchTreatments,
  fetchWorkingHours,
  formatMoney,
  formatTime,
  WEEKDAY_LABELS,
} from "@/lib/clinic";

const clinicQO = queryOptions({ queryKey: ["clinic"], queryFn: fetchClinic });
const treatmentsQO = queryOptions({ queryKey: ["treatments"], queryFn: fetchTreatments });
const hoursQO = queryOptions({ queryKey: ["hours"], queryFn: fetchWorkingHours });
const testimonialsQO = queryOptions({ queryKey: ["testimonials"], queryFn: fetchTestimonials });
const faqsQO = queryOptions({ queryKey: ["faqs"], queryFn: fetchFaqs });

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(clinicQO),
      context.queryClient.ensureQueryData(treatmentsQO),
      context.queryClient.ensureQueryData(hoursQO),
      context.queryClient.ensureQueryData(testimonialsQO),
      context.queryClient.ensureQueryData(faqsQO),
    ]);
  },
  component: LandingPage,
});

function LandingPage() {
  const { data: clinic } = useSuspenseQuery(clinicQO);
  const { data: treatments } = useSuspenseQuery(treatmentsQO);
  const { data: hours } = useSuspenseQuery(hoursQO);
  const { data: testimonials } = useSuspenseQuery(testimonialsQO);
  const { data: faqs } = useSuspenseQuery(faqsQO);

  const gallery = [clinic1, clinic2, clinic3];

  return (
    <div id="top" className="min-h-screen bg-background">
      <SiteNav clinicName={clinic.clinic_name} />

      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Now booking — no account required
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-6xl">
              {clinic.tagline ?? "Modern care, close to home."}
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Consult with {clinic.doctor_name} — {clinic.specialization}. Book in under a
              minute, pay online or at the clinic.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book">
                <Button size="lg" className="gap-2">
                  Book appointment <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              {clinic.whatsapp && (
                <a
                  href={`https://wa.me/${clinic.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button size="lg" variant="outline" className="gap-2">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </Button>
                </a>
              )}
              {clinic.phone && (
                <a href={`tel:${clinic.phone}`}>
                  <Button size="lg" variant="ghost" className="gap-2">
                    <Phone className="h-4 w-4" /> Call
                  </Button>
                </a>
              )}
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4">
              {[
                { label: "Years experience", value: `${clinic.years_experience ?? 0}+` },
                { label: "Consultation fee", value: formatMoney(clinic.consultation_fee) },
                { label: "Happy patients", value: "10k+" },
              ].map((s) => (
                <div key={s.label} className="glass-card rounded-2xl p-4">
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" aria-hidden />
            <img
              src={heroImg}
              alt={`${clinic.doctor_name} at ${clinic.clinic_name}`}
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
                <p className="text-xs text-muted-foreground">{clinic.qualifications}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <img
              src={doctorImg}
              alt={clinic.doctor_name}
              width={900}
              height={1100}
              loading="lazy"
              className="w-full max-w-sm rounded-3xl object-cover shadow-[var(--shadow-soft)]"
            />
          </div>
          <div className="md:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">About the doctor</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{clinic.doctor_name}</h2>
            <p className="mt-1 text-muted-foreground">
              {clinic.qualifications} · {clinic.specialization}
            </p>
            <p className="mt-6 whitespace-pre-line text-foreground/85 leading-relaxed">
              {clinic.about_doctor}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <InfoCard icon={GraduationCap} title="Education" body={clinic.education} />
              <InfoCard icon={Stethoscope} title="Experience" body={clinic.professional_experience} />
              <InfoCard icon={BadgeCheck} title="Certifications" body={clinic.certifications} />
              <InfoCard icon={Award} title="Awards & Memberships" body={[clinic.awards, clinic.memberships].filter(Boolean).join("\n")} />
            </div>

            {clinic.languages_spoken && (
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Languages className="h-4 w-4" />
                <span>Speaks {clinic.languages_spoken}</span>
              </div>
            )}
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
              <Card key={t.id} className="group transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
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

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Inside the clinic" title="A calm, modern space" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {gallery.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Clinic ${i + 1}`}
              width={1200}
              height={900}
              loading="lazy"
              className="aspect-4/3 w-full rounded-3xl object-cover"
            />
          ))}
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
                          h.morning_start && `${formatTime(h.morning_start)} – ${formatTime(h.morning_end)}`,
                          h.evening_start && `${formatTime(h.evening_start)} – ${formatTime(h.evening_end)}`,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                  </span>
                </div>
              ))}
            </div>
            {clinic.emergency_contact && (
              <p className="mt-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Emergency:</span> {clinic.emergency_contact}
              </p>
            )}
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

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Testimonials" title="Patients we've had the pleasure to serve" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.id}>
              <CardContent className="p-6">
                <Quote className="h-6 w-6 text-primary/60" />
                <p className="mt-4 text-foreground/85">"{t.content}"</p>
                <div className="mt-6 flex items-center justify-between">
                  <p className="font-medium">{t.patient_name}</p>
                  <div className="flex gap-0.5 text-warning">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border/60 bg-muted/40">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f) => (
              <AccordionItem key={f.id} value={f.id}>
                <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Contact" title="Send us a message" subtitle="We reply within one business day." />
        <div className="mt-10">
          <ContactForm clinicEmail={clinic.email} />
        </div>
      </section>

      <SiteFooter clinic={clinic} />
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
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
