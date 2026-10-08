import type { Metadata } from "next";
import { connection } from "next/server";
import { ReportBrowser, type YearReport } from "@/components/sections/report-browser";
import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { getPpdbInfo, getPublishedReports, getReportAcademicYears, summarizeReports } from "@/services/ppdb";

export const metadata: Metadata = {
  title: "Laporan PPDB",
  description: "Laporan bulanan jumlah pendaftar, murid diterima, dan sisa kuota PPDB.",
};

export default async function ReportPage() {
  await connection();
  const [ppdb, academicYears] = await Promise.all([getPpdbInfo(), getReportAcademicYears()]);
  const years = academicYears.includes(ppdb.academicYear) ? academicYears : [ppdb.academicYear, ...academicYears];

  const entries = await Promise.all(
    years.map(async (year): Promise<[string, YearReport]> => {
      const reports = await getPublishedReports(year);
      return [year, { reports, summary: summarizeReports(year, reports) }];
    }),
  );

  return (
    <>
      <PageHeader
        eyebrow="Transparansi"
        title="Laporan PPDB"
        description="Transparansi penerimaan murid baru, diperbarui setiap awal bulan. Laporan hanya memuat angka agregat, tanpa data pribadi anak."
      />

      <Section label="Laporan penerimaan">
        <Container>
          <ReportBrowser years={years} defaultYear={ppdb.academicYear} data={Object.fromEntries(entries)} />
        </Container>
      </Section>
    </>
  );
}
