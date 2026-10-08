import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ChatIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { Container, PageHeader } from "@/components/ui/primitives";
import { mapsUrl, siteConfig, whatsappUrl } from "@/config/site";

export const metadata: Metadata = {
  title: "Kontak",
  description: `Alamat, telepon, WhatsApp, dan jam operasional ${siteConfig.name}.`,
};

function ContactItem({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-3 rounded-lg border border-line bg-white p-5 shadow-sm">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-navy-900 text-gold-400">{icon}</span>
      <div className="min-w-0">
        <h2 className="text-sm font-bold text-muted">{label}</h2>
        <div className="mt-0.5 font-semibold">{children}</div>
      </div>
    </li>
  );
}

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <>
      <PageHeader eyebrow="Kontak" title="Kunjungi kami" description="Kami senang menerima kunjungan. Kabari kami dulu agar bisa disambut dengan baik." />

      <Container className="grid gap-10 py-14 lg:grid-cols-[1.3fr_1fr]">
        <ul className="grid gap-4 sm:grid-cols-2">
          <ContactItem icon={<MapPinIcon />} label="Alamat">
            {contact.address}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm font-bold text-navy-700 underline underline-offset-4"
            >
              Buka di Google Maps
            </a>
          </ContactItem>
          <ContactItem icon={<ClockIcon />} label="Jam operasional">
            {contact.operationalHours}
          </ContactItem>
          <ContactItem icon={<PhoneIcon />} label="Telepon">
            <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="hover:text-navy-700">
              {contact.phone}
            </a>
          </ContactItem>
          <ContactItem icon={<MailIcon />} label="Email">
            <a href={`mailto:${contact.email}`} className="[overflow-wrap:anywhere] hover:text-navy-700">
              {contact.email}
            </a>
          </ContactItem>
        </ul>

        <aside className="self-start rounded-xl bg-navy-900 p-8 text-white">
          <h2 className="font-heading text-3xl font-bold tracking-tight">Cara tercepat: WhatsApp</h2>
          <p className="mt-2 text-white/80">
            Untuk pertanyaan PPDB, jadwal kunjungan, atau trial class, tim kami membalas pada jam operasional.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-gold-400 px-5 py-3 text-xs font-bold uppercase tracking-wider text-navy-900 hover:bg-gold-400/85"
          >
            <ChatIcon className="size-5" />
            Chat WhatsApp
          </a>
        </aside>
      </Container>
    </>
  );
}
