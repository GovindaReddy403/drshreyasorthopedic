import { useSuspenseQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { FloatingActions } from "@/components/floating-actions";
import { clinicQO, GOOGLE_REVIEWS_URL } from "@/lib/queries";

export function PageShell({ children }: { children: ReactNode }) {
  const { data: clinic } = useSuspenseQuery(clinicQO);
  return (
    <div id="top" className="min-h-screen bg-background pb-16 lg:pb-0">
      <SiteNav clinicName={clinic.clinic_name} phone={clinic.phone} />
      <FloatingActions
        phone={clinic.phone}
        whatsapp={clinic.whatsapp}
        mapsUrl={clinic.google_maps_url ?? GOOGLE_REVIEWS_URL}
      />
      <main>{children}</main>
      <SiteFooter clinic={clinic} />
    </div>
  );
}
