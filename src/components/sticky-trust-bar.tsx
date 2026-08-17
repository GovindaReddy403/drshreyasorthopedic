/**
 * Fixed bottom trust bar shown on every page (desktop/tablet).
 * Mobile keeps the FloatingActions bottom action bar instead.
 */
const TRUST_STATS = [
  {
    title: "Patient Trust",
    line1: "Assistant Professor, JSS Hospital",
    line2:
      "Fellowship trained in Arthroscopy & Sports Medicine — India, Australia & Thailand",
  },
  {
    title: "Surgical Volume",
    line1: "Arthroscopy & Trauma",
    line2:
      "Knee & Shoulder Arthroscopy | Ligament Reconstruction | Meniscal Surgery | Joint Replacement | Upper & Lower Limb Trauma",
  },
  {
    title: "Recognition",
    line1: "Fellowships & Memberships",
    line2: "Fellowships in India, Australia & Thailand · KOA & MOA Member",
  },
];

export function StickyTrustBar() {
  return (
    <div
      aria-label="Doctor credentials trust bar"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-30 hidden border-t border-white/10 bg-[#00154d] text-white lg:block"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-white/10">
        {TRUST_STATS.map((s) => (
          <div key={s.title} className="px-6 py-4">
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-[#7fc7ff]">
              {s.title}
            </p>
            <p className="mt-1.5 text-[13px] font-medium leading-snug text-white/90">
              {s.line1}
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-white/60">
              {s.line2}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Spacer matching the trust bar height, so footer content isn't hidden behind it. */
export function TrustBarSpacer() {
  return <div aria-hidden className="hidden h-[112px] lg:block" />;
}
