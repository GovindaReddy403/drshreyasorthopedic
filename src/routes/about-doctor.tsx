import { OG_IMAGE, absUrl, breadcrumbLd } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CalendarDays, CheckCircle2, GraduationCap, Languages, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { PageHero, SectionHeader, TickList, TrustBand, CtaBand } from "@/components/site-sections";
import { clinicQO, doctorsQO } from "@/lib/queries";
import doctorAsset from "@/assets/doctor-portrait.png.asset.json";

const doctorImg = doctorAsset.url;

export const Route = createFileRoute("/about-doctor")({
  head: () => ({
    meta: [
      { title: "About Dr. Shreyas M. J. | Arthroscopy & Sports Medicine, Mysore" },
      {
        name: "description",
        content:
          "Dr. Shreyas M. J. — MBBS, MS (Ortho), Assistant Professor at JSS Hospital Mysore. Fellowships in Arthroscopy & Sports Medicine in India, Australia and Thailand.",
      },
      { property: "og:title", content: "About Dr. Shreyas M. J. — Orthopaedic Surgeon, Mysore" },
      {
        property: "og:description",
        content:
          "Overview, advanced fellowship training, current position, areas of special interest and regenerative treatments offered by Dr. Shreyas M. J.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: absUrl("/about-doctor") },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: absUrl("/about-doctor") }],
    scripts: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "About the Doctor", path: "/about-doctor" },
      ]),
    ],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(clinicQO),
      context.queryClient.ensureQueryData(doctorsQO),
    ]);
  },
  component: AboutDoctorPage,
});

const sections = [
  { id: "overview", label: "Overview" },
  { id: "membership", label: "Fellowship & Membership" },
  { id: "expertise", label: "Areas of Special Interest" },
  { id: "regenerative", label: "Regenerative Treatments" },
  { id: "languages", label: "Languages Spoken" },
  { id: "career", label: "Career & Training" },
  { id: "faqs", label: "FAQs" },
];

const faqs = [
  {
    q: "Why do patients consult Dr. Shreyas?",
    a: "Knee and shoulder pain, sports injuries, ligament and meniscus tears, arthritis, fractures and post-surgery rehabilitation.",
  },
  {
    q: "What does he specialise in?",
    a: "Arthroscopy (key-hole) surgery of the knee and shoulder, joint replacement, foot & ankle care, spine injury and trauma.",
  },
  {
    q: "Do I need an appointment?",
    a: "Walk-ins are welcome during clinic hours, but booking online secures your slot between 5:00 PM and 9:00 PM, Monday to Saturday.",
  },
];

function AboutDoctorPage() {
  const { data: clinic } = useSuspenseQuery(clinicQO);
  const { data: doctors } = useSuspenseQuery(doctorsQO);
  const doc = doctors[0];

  return (
    <PageShell>
      <PageHero
        eyebrow="Orthopaedic Surgeon | Arthroscopy & Sports Medicine"
        title={doc?.name ?? clinic.doctor_name}
        subtitle="MBBS, MS (Orthopaedics) — JSS Medical College and Hospital, Mysore | Knee & Shoulder | Joint Replacement | Trauma | Spine Injuries"
        crumb="About the Doctor"
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[320px_1fr]">
          <div>
            <img
              src={doc?.photo_url || doctorImg}
              alt={`Portrait of ${doc?.name ?? clinic.doctor_name}`}
              className="w-full rounded-3xl object-cover shadow-[var(--shadow-glow)]"
              loading="lazy"
            />
            <div className="mt-6 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-soft-blue p-4">
                <p className="font-display text-xl font-bold text-primary">3 Fellowships</p>
                <p className="text-xs text-muted-foreground">India · Australia · Thailand</p>
              </div>
              <div className="rounded-xl bg-soft-blue p-4">
                <p className="font-display text-xl font-bold text-primary">Knee · Shoulder</p>
                <p className="text-xs text-muted-foreground">Core focus</p>
              </div>
            </div>
            <div className="mt-3 rounded-xl bg-soft-blue p-4 text-center">
              <p className="font-display text-base font-bold text-primary">Assistant Professor</p>
              <p className="text-xs text-muted-foreground">
                Dept. of Orthopaedics, JSS Hospital, Mysore
              </p>
            </div>
            <Link to="/book" className="mt-4 block">
              <Button className="w-full gap-2 rounded-full">
                <CalendarDays className="h-4 w-4" /> Book An Appointment
              </Button>
            </Link>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 border-b border-border/60 pb-4">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {s.label}
                </a>
              ))}
            </div>

            <div id="overview" className="scroll-mt-28 pt-8">
              <SectionHeader align="left" title="Overview" />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Dr. Shreyas M. J. is a qualified Orthopaedic Surgeon with specialised training and
                extensive experience in Arthroscopy, Sports Medicine, Knee and Shoulder Surgery, and
                Upper and Lower Limb Trauma. He completed his MBBS and MS (Orthopaedics) at JSS
                Medical College and Hospital, Mysore.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                He began his professional career as a Senior Resident in the Department of
                Orthopaedics at the Sanjay Gandhi Institute of Trauma &amp; Orthopaedics, Bengaluru,
                where he gained significant experience in trauma management and complex orthopaedic
                care. He integrates strong academic training, international fellowship experience and
                clinical expertise to deliver evidence-based, patient-centred orthopaedic care.
              </p>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Qualification Highlights
                </p>
                <ul className="mt-3 space-y-2.5">
                  {[
                    {
                      title: "International Fellowships",
                      body: "Arthroscopy & Sports Medicine — India, Australia & Thailand.",
                    },
                    {
                      title: "Hospital affiliations",
                      body: "JSS Hospital, Mysore & Sanjay Gandhi Institute of Trauma & Orthopaedics, Bengaluru.",
                    },
                    {
                      title: "Languages spoken",
                      body: "English, Kannada, Hindi & Tamil.",
                    },
                  ].map((h) => (
                    <li
                      key={h.title}
                      className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-3.5"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <div>
                        <p className="font-semibold text-foreground">{h.title}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">{h.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <TickList
                items={[
                  {
                    title: "Assistant Professor, JSS Hospital, Mysore",
                    body: "Department of Orthopaedics — patient care, surgical training, teaching and academic research.",
                  },
                  {
                    title: "Minimally invasive focus",
                    body: "Arthroscopy-first mindset wherever appropriate for faster recovery.",
                  },
                  {
                    title: "Sports injury expertise",
                    body: "Knee, shoulder and sports injuries with structured rehabilitation planning.",
                  },
                  {
                    title: "Trauma & joint replacement",
                    body: "Upper and lower limb trauma and joint replacement with modern implants.",
                  },
                ]}
              />
            </div>

            <div id="membership" className="scroll-mt-28 pt-12">
              <SectionHeader align="left" title="Advanced Fellowship Training & Membership" />
              <TickList
                items={[
                  {
                    title: "Fellowship in Arthroscopy & Sports Medicine, Fortis Hospital",
                    body: "Under the mentorship of Dr. Chirag N. Thonse.",
                  },
                  {
                    title: "Senior Registrar, Dept. of Orthopaedics, Fortis Hospital",
                    body: "Extensive exposure to arthroscopic and sports injury procedures.",
                  },
                  {
                    title: "Fellowship in Arthroscopy & Upper Limb Trauma, Sydney, Australia",
                    body: "Under Dr. Jonathan Herald — advanced arthroscopic techniques and upper limb trauma management.",
                  },
                  {
                    title: "Fellowship in Arthroscopy (Knee & Shoulder), Thammasat University, Bangkok",
                    body: "Under Dr. Bancha Chernchujit — focused training in advanced knee and shoulder arthroscopy.",
                  },
                  {
                    title: "KOA & MOA Member",
                    body: "Karnataka Orthopaedic Association and Mysore Orthopaedic Association.",
                  },
                ]}
              />
            </div>

            <div id="expertise" className="scroll-mt-28 pt-12">
              <SectionHeader align="left" title="Areas of Special Interest" />
              <TickList
                items={[
                  { title: "Knee Arthroscopy", body: "ACL/PCL reconstruction, cartilage procedures and sports injuries." },
                  { title: "Shoulder Arthroscopy", body: "Rotator cuff repair, shoulder instability, SLAP/Bankart lesions." },
                  { title: "Ligament & Meniscal Surgery", body: "Ligament reconstruction and meniscal repair or trimming." },
                  { title: "Upper Limb Trauma & Sports Medicine", body: "Complex upper and lower limb trauma with return-to-sport planning." },
                ]}
              />
            </div>

            <div id="regenerative" className="scroll-mt-28 pt-12">
              <SectionHeader align="left" title="Regenerative & Non-Surgical Treatments" />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Dr. Shreyas also offers PRP (Platelet-Rich Plasma) therapy and Hylast (Hyaluronic
                Acid) injections for appropriately selected patients. PRP may be considered for
                certain sports injuries, tendon and ligament conditions, while Hylast injections may
                help improve pain, mobility and joint function in selected patients with
                osteoarthritis and degenerative joint conditions.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Treatment is recommended following a detailed clinical assessment and appropriate
                imaging, with an individualised approach based on the patient's condition and
                requirements.
              </p>
              <TickList
                items={[
                  {
                    title: "PRP (Platelet-Rich Plasma) therapy",
                    body: "For selected sports injuries, tendon and ligament conditions.",
                  },
                  {
                    title: "Hylast (Hyaluronic Acid) injections",
                    body: "To improve pain, mobility and joint function in selected osteoarthritis patients.",
                  },
                ]}
              />
            </div>


            <div id="languages" className="scroll-mt-28 pt-12">
              <SectionHeader align="left" title="Languages Spoken" />
              <div className="mt-4 flex flex-wrap gap-2">
                {(doc?.languages_spoken ?? "English, Kannada, Hindi, Tamil, Telugu")
                  .split(",")
                  .map((l) => (
                    <span
                      key={l}
                      className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-sm font-medium text-primary"
                    >
                      <Languages className="h-4 w-4" /> {l.trim()}
                    </span>
                  ))}
              </div>
            </div>

            <div id="career" className="scroll-mt-28 pt-12">
              <SectionHeader align="left" title="Career & Training" />
              <ol className="mt-6 space-y-4 border-l border-border pl-6">
                {[
                  {
                    t: "MBBS & MS (Orthopaedics)",
                    d: "JSS Medical College and Hospital, Mysore",
                    icon: GraduationCap,
                  },
                  {
                    t: "Senior Resident, Dept. of Orthopaedics",
                    d: "Sanjay Gandhi Institute of Trauma & Orthopaedics, Bengaluru",
                    icon: Stethoscope,
                  },
                  {
                    t: "Fellowship in Arthroscopy & Sports Medicine",
                    d: "Fortis Hospital, under Dr. Chirag N. Thonse",
                    icon: GraduationCap,
                  },
                  {
                    t: "Senior Registrar, Dept. of Orthopaedics",
                    d: "Fortis Hospital",
                    icon: Stethoscope,
                  },
                  {
                    t: "Fellowship in Arthroscopy & Upper Limb Trauma",
                    d: "Sydney, Australia — under Dr. Jonathan Herald",
                    icon: GraduationCap,
                  },
                  {
                    t: "Fellowship in Arthroscopy (Knee & Shoulder)",
                    d: "Thammasat University, Bangkok — under Dr. Bancha Chernchujit",
                    icon: GraduationCap,
                  },
                  {
                    t: "Assistant Professor, Dept. of Orthopaedics",
                    d: "JSS Hospital, Mysore — current position",
                    icon: Stethoscope,
                  },
                ].map((s) => (
                  <li key={s.t} className="relative">
                    <span className="absolute -left-[31px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <s.icon className="h-3 w-3" />
                    </span>
                    <p className="font-semibold text-foreground">{s.t}</p>
                    <p className="text-sm text-muted-foreground">{s.d}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div id="faqs" className="scroll-mt-28 pt-12">
              <SectionHeader align="left" title="FAQs" />
              <div className="mt-4 space-y-3">
                {faqs.map((f) => (
                  <details
                    key={f.q}
                    className="rounded-xl border border-border/60 bg-card p-4 [&_summary]:cursor-pointer"
                  >
                    <summary className="font-semibold text-foreground">{f.q}</summary>
                    <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBand />
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
