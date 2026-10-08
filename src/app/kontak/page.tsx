import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRightIcon, ChatIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/motion";
import { Container, PageHeader, Section, buttonClass } from "@/components/ui/primitives";
import { mapsUrl, siteConfig, whatsappUrl } from "@/config/site";

export const metadata: Metadata = {
  title: "Kontak",
  description: `Alamat, telepon, WhatsApp, dan jam operasional ${siteConfig.name}.`,
};

function formatWhatsapp(number: string) {
  const local = number.startsWith("62") ? `0${number.slice(2)}` : number;
  return local.replace(/(\d{4})(\d{4})(\d+)/, "$1 $2 $3");
}

function ContactItem({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-4 py-5 sm:py-6">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-900">{icon}</span>
      <div className="min-w-0 flex-1">
        <dt className="text-sm text-muted">{label}</dt>
        <dd className="mt-0.5 font-medium leading-relaxed text-navy-900">{children}</dd>
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
        <Container className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <Reveal>
            <dl className="divide-y divide-line border-y border-line">
              <ContactItem icon={<MapPinIcon className="size-5" />} label="Alamat">
                <span className="block">{contact.address}</span>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group -mb-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-navy-900"
                >
                  Buka di Google Maps
                  <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </ContactItem>
              <ContactItem icon={<ClockIcon className="size-5" />} label="Jam operasional">
                {contact.operationalHours}
              </ContactItem>
              <ContactItem icon={<PhoneIcon className="size-5" />} label="Telepon">
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="underline-offset-4 hover:underline">
                  {contact.phone}
                </a>
              </ContactItem>
              <ContactItem icon={<MailIcon className="size-5" />} label="Email">
                <a href={`mailto:${contact.email}`} className="[overflow-wrap:anywhere] underline-offset-4 hover:underline">
                  {contact.email}
                </a>
              </ContactItem>
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="self-start rounded-2xl bg-navy-900 p-6 sm:p-8">
            <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-gold-400">
              <ChatIcon className="size-5" />
            </span>
            <h2 className="mt-5 font-heading text-2xl font-bold tracking-tight text-white">Cara tercepat: WhatsApp</h2>
            <p className="mt-3 leading-relaxed text-white/70">
              Untuk pertanyaan PPDB, jadwal kunjungan, atau trial class, tim kami membalas pada jam operasional.
            </p>
            <p className="mt-5 text-sm text-white/60">
              Nomor WhatsApp
              <span className="mt-0.5 block text-lg font-semibold tracking-wide text-white">{formatWhatsapp(contact.whatsapp)}</span>
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("gold", "mt-6 w-full sm:w-auto")}>
              <ChatIcon className="size-4" />
              Chat WhatsApp
            </a>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
