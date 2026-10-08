import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ChatIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/motion";
import { Container, PageHeader, Section, buttonClass } from "@/components/ui/primitives";
import { mapsUrl, siteConfig, whatsappUrl } from "@/config/site";

export const metadata: Metadata = {
  title: "Kontak",
  description: `Alamat, telepon, WhatsApp, dan jam operasional ${siteConfig.name}.`,
};

function ContactItem({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 py-6">
      <span className="shrink-0 text-gold-500">{icon}</span>
      <div className="min-w-0">
        <dt className="text-sm text-muted">{label}</dt>
        <dd className="mt-1 font-medium leading-relaxed text-navy-900">{children}</dd>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <>
      <PageHeader eyebrow="Kontak" title="Kunjungi kami" description="Kami senang menerima kunjungan. Kabari kami dulu agar bisa disambut dengan baik." />

      <Section label="Informasi kontak">
        <Container className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <Reveal>
            <dl className="divide-y divide-line border-y border-line">
              <ContactItem icon={<MapPinIcon />} label="Alamat">
                {contact.address}
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex min-h-11 w-fit items-center text-sm font-semibold text-navy-900 underline underline-offset-4"
                >
                  Buka di Google Maps
                </a>
              </ContactItem>
              <ContactItem icon={<ClockIcon />} label="Jam operasional">
                {contact.operationalHours}
              </ContactItem>
              <ContactItem icon={<PhoneIcon />} label="Telepon">
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="underline-offset-4 hover:underline">
                  {contact.phone}
                </a>
              </ContactItem>
              <ContactItem icon={<MailIcon />} label="Email">
                <a href={`mailto:${contact.email}`} className="[overflow-wrap:anywhere] underline-offset-4 hover:underline">
                  {contact.email}
                </a>
              </ContactItem>
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="self-start rounded-2xl bg-cream p-8 sm:p-10">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-navy-900">Cara tercepat: WhatsApp</h2>
            <p className="mt-4 leading-relaxed text-muted">
              Untuk pertanyaan PPDB, jadwal kunjungan, atau trial class, tim kami membalas pada jam operasional.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("gold", "mt-8")}>
              <ChatIcon className="size-4" />
              Chat WhatsApp
            </a>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
