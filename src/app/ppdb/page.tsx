import type { Metadata } from "next";
import { CheckIcon, ChatIcon } from "@/components/ui/icons";
import { ButtonLink, Container, PageHeader, PpdbStatusBadge, SectionHeading } from "@/components/ui/primitives";
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

      <Container className="py-14">
        <div className="flex flex-col gap-4 rounded-xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <PpdbStatusBadge status={ppdb.status} />
            <p className="mt-3 max-w-2xl">{ppdb.announcement}</p>
          </div>
          <p className="shrink-0 text-sm text-muted">
            Diperbarui <time dateTime={ppdb.updatedAt}>{formatIsoDate(ppdb.updatedAt)}</time>
          </p>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-2">
          <section aria-labelledby="judul-syarat">
            <SectionHeading id="judul-syarat" eyebrow="Persyaratan" title="Dokumen yang disiapkan" />
            <ul className="mt-6 space-y-3">
              {ppdb.requirements.map((requirement) => (
                <li key={requirement.id} className="flex gap-3 rounded-lg border border-line bg-white p-4">
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-gold-500" />
                  <span>
                    <span className="font-semibold">{requirement.label}</span>
                    {requirement.note ? <span className="block text-sm text-muted">{requirement.note}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="judul-jadwal">
            <SectionHeading id="judul-jadwal" eyebrow="Jadwal" title="Tahapan pendaftaran" />
            <ol className="mt-6 border-l-2 border-navy-100 pl-6">
              {ppdb.schedule.map((item) => (
                <li key={item.id} className="relative pb-6 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[33px] top-1 size-4 rounded-full border-4 border-white bg-gold-400"
                  />
                  <p className="text-sm font-bold text-navy-700">{formatDateRange(item.startDate, item.endDate)}</p>
                  <p className="font-bold text-navy-900">{item.phase}</p>
                  {item.description ? <p className="text-sm text-muted">{item.description}</p> : null}
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section aria-labelledby="judul-biaya" className="mt-14">
          <SectionHeading
            id="judul-biaya"
            eyebrow="Biaya"
            title="Rincian biaya pendidikan"
            description="Tersedia keringanan bagi keluarga yang membutuhkan. Silakan bicarakan dengan panitia."
          />
          <div className="mt-6 overflow-x-auto rounded-lg border border-line bg-white">
            <table className="w-full min-w-[520px] text-left">
              <thead className="bg-navy-50 text-sm text-muted">
                <tr>
                  <th scope="col" className="px-5 py-3 font-bold">Komponen</th>
                  <th scope="col" className="px-5 py-3 font-bold">Periode</th>
                  <th scope="col" className="px-5 py-3 text-right font-bold">Nominal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {ppdb.fees.map((fee) => (
                  <tr key={fee.id}>
                    <th scope="row" className="px-5 py-4 font-semibold">
                      {fee.label}
                      {fee.note ? <span className="block text-sm font-normal text-muted">{fee.note}</span> : null}
                    </th>
                    <td className="px-5 py-4 text-muted">{formatFeePeriod(fee.period)}</td>
                    <td className="px-5 py-4 text-right font-bold tabular-nums">{formatRupiah(fee.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          aria-labelledby="judul-panitia"
          className="mt-14 flex flex-col gap-6 rounded-xl bg-navy-900 p-8 text-white md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h2 id="judul-panitia" className="font-serif text-3xl">
              Ada pertanyaan?
            </h2>
            <p className="mt-1 text-white/80">
              Hubungi {contact.name} di {contact.phone} atau{" "}
              <a href={`mailto:${contact.email}`} className="font-bold underline underline-offset-4">
                {contact.email}
              </a>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-gold-400 px-5 py-3 text-xs font-bold uppercase tracking-wider text-navy-900 hover:bg-gold-400/85"
            >
              <ChatIcon className="size-5" />
              WhatsApp panitia
            </a>
            <ButtonLink href="/laporan" variant="onDark">
              Laporan PPDB
            </ButtonLink>
          </div>
        </section>
      </Container>
    </>
  );
}
