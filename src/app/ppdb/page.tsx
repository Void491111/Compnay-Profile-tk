import type { Metadata } from "next";
import { CheckIcon, ChatIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/motion";
import {
  Container,
  PageHeader,
  PpdbStatusBadge,
  Section,
  SectionHeading,
  TextLink,
  buttonClass,
} from "@/components/ui/primitives";
import { formatDateRange, formatFeePeriod, formatIsoDate, formatRupiah } from "@/lib/format";
import { getPpdbInfo } from "@/services/ppdb";

export async function generateMetadata(): Promise<Metadata> {
  const ppdb = await getPpdbInfo();

  return {
    title: `PPDB ${ppdb.academicYear}`,
    description: `Syarat, jadwal, dan biaya penerimaan peserta didik baru tahun ajaran ${ppdb.academicYear}.`,
  };
}

export default async function PpdbPage() {
  const ppdb = await getPpdbInfo();
  const { contact } = ppdb;

  return (
    <>
      <PageHeader
        eyebrow="PPDB"
        title={`Penerimaan peserta didik baru ${ppdb.academicYear}`}
        description="Semua yang perlu Ayah dan Bunda ketahui sebelum mendaftar."
      />

      <Section label="Status, persyaratan, dan jadwal">
        <Container>
          <Reveal className="flex flex-col gap-6 border-b border-line pb-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <div className="max-w-2xl">
              <PpdbStatusBadge status={ppdb.status} />
              <p className="mt-4 text-lg leading-relaxed text-ink">{ppdb.announcement}</p>
            </div>
            <p className="shrink-0 text-sm text-muted">
              Diperbarui <time dateTime={ppdb.updatedAt}>{formatIsoDate(ppdb.updatedAt)}</time>
            </p>
          </Reveal>

          <div className="mt-16 grid gap-16 lg:grid-cols-2">
            <Reveal>
              <SectionHeading id="judul-syarat" eyebrow="Persyaratan" title="Dokumen yang disiapkan" />
              <ul className="mt-10 divide-y divide-line border-y border-line">
                {ppdb.requirements.map((requirement) => (
                  <li key={requirement.id} className="flex gap-4 py-4">
                    <CheckIcon className="mt-0.5 size-5 shrink-0 text-gold-500" />
                    <span>
                      <span className="font-medium text-navy-900">{requirement.label}</span>
                      {requirement.note ? <span className="mt-1 block text-sm text-muted">{requirement.note}</span> : null}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <SectionHeading id="judul-jadwal" eyebrow="Jadwal" title="Tahapan pendaftaran" />
              <ol className="mt-10 border-l border-line pl-8">
                {ppdb.schedule.map((item) => (
                  <li key={item.id} className="relative pb-8 last:pb-0">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[37px] top-1.5 size-2.5 rounded-full bg-gold-400 ring-4 ring-white"
                    />
                    <p className="text-sm text-muted">{formatDateRange(item.startDate, item.endDate)}</p>
                    <p className="mt-1 font-heading text-lg font-bold text-navy-900">{item.phase}</p>
                    {item.description ? <p className="mt-1 leading-relaxed text-muted">{item.description}</p> : null}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section id="judul-biaya" tone="cream">
        <Container>
          <Reveal>
            <SectionHeading
              id="judul-biaya"
              eyebrow="Biaya"
              title="Rincian biaya pendidikan"
              description="Tersedia keringanan bagi keluarga yang membutuhkan. Silakan bicarakan dengan panitia."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12 overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[520px] text-left">
              <thead className="border-b border-line text-sm text-muted">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium">Komponen</th>
                  <th scope="col" className="px-6 py-4 font-medium">Periode</th>
                  <th scope="col" className="px-6 py-4 text-right font-medium">Nominal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {ppdb.fees.map((fee) => (
                  <tr key={fee.id}>
                    <th scope="row" className="px-6 py-5 font-medium text-navy-900">
                      {fee.label}
                      {fee.note ? <span className="mt-1 block text-sm font-normal text-muted">{fee.note}</span> : null}
                    </th>
                    <td className="px-6 py-5 text-muted">{formatFeePeriod(fee.period)}</td>
                    <td className="px-6 py-5 text-right font-semibold tabular-nums text-navy-900">{formatRupiah(fee.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </Container>
      </Section>

      <Section id="judul-panitia">
        <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading id="judul-panitia" eyebrow="Panitia PPDB" title="Ada pertanyaan?" />
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              Hubungi {contact.name} di {contact.phone} atau{" "}
              <a href={`mailto:${contact.email}`} className="font-medium text-navy-900 underline underline-offset-4">
                {contact.email}
              </a>
              .
            </p>
          </Reveal>
          <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("gold")}
            >
              <ChatIcon className="size-4" />
              WhatsApp panitia
            </a>
            <TextLink href="/laporan">Laporan PPDB</TextLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
