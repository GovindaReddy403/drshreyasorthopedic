import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { QrCode } from "lucide-react";

export type ContactQRClinic = {
  clinic_name: string;
  doctor_name: string;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  google_maps_url: string | null;
};

export function buildClinicVCard(clinic: ContactQRClinic): string {
  const tel = clinic.whatsapp || clinic.phone || "";
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${clinic.doctor_name}`,
    `N:${clinic.doctor_name};;;;`,
    `ORG:${clinic.clinic_name}`,
  ];
  if (tel) lines.push(`TEL;TYPE=CELL,VOICE:${tel}`);
  if (clinic.whatsapp) lines.push(`TEL;TYPE=WHATSAPP:${clinic.whatsapp}`);
  if (clinic.email) lines.push(`EMAIL;TYPE=INTERNET:${clinic.email}`);
  if (clinic.address) lines.push(`ADR;TYPE=WORK:;;${clinic.address.replace(/\n/g, ", ")};;;;`);
  if (clinic.google_maps_url) lines.push(`URL:${clinic.google_maps_url}`);
  lines.push("END:VCARD");
  return lines.join("\n");
}

export function ContactQR({ clinic, size = 180 }: { clinic: ContactQRClinic; size?: number }) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    QRCode.toDataURL(buildClinicVCard(clinic), { width: size * 2, margin: 1, errorCorrectionLevel: "M" })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(""));
  }, [clinic, size]);

  return (
    <div className="rounded-2xl border border-border bg-background/60 p-5">
      <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:text-left">
        <div
          className="flex shrink-0 items-center justify-center rounded-xl border border-border bg-white p-2"
          style={{ height: size, width: size }}
        >
          {qrDataUrl ? (
            <img src={qrDataUrl} alt={`Save ${clinic.doctor_name} contact`} className="h-full w-full" />
          ) : (
            <QrCode className="h-10 w-10 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1">
          <p className="flex items-center justify-center gap-2 text-sm font-semibold sm:justify-start">
            <QrCode className="h-4 w-4 text-primary" /> Save clinic contact
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Scan with your phone camera or WhatsApp to save{" "}
            <span className="font-medium text-foreground">{clinic.doctor_name}</span> under{" "}
            <span className="font-medium text-foreground">{clinic.clinic_name}</span>.
          </p>
          {qrDataUrl && (
            <a
              href={qrDataUrl}
              download={`${clinic.clinic_name.replace(/\s+/g, "-").toLowerCase()}-contact.png`}
              className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
            >
              Download QR
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
