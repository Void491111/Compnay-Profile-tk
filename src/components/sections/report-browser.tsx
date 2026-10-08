"use client";

import { useSearchParams } from "next/navigation";
import { FilterPills } from "@/components/ui/filter-pills";
import { ProgressBar, SectionHeading, StatCard } from "@/components/ui/primitives";
import { formatIsoDate, formatMonthYear, formatNumber, formatPercent } from "@/lib/format";
import type { EnrollmentReport, EnrollmentSummary } from "@/types";

export interface YearReport {
  readonly summary: EnrollmentSummary;
  readonly reports: readonly EnrollmentReport[];
}

export function ReportBrowser({
  years,
  defaultYear,
  data,
}: {
  years: readonly string[];
  defaultYear: string;
  data: Readonly<Record<string, YearReport>>;
}) {
  const requested = useSearchParams().get("tahun");
  const academicYear = requested !== null && years.includes(requested) ? requested : defaultYear;
  const { summary, reports } = data[academicYear];

  return (
    <>
      <FilterPills
        label="Pilih tahun ajaran"
        activeKey={academicYear}
        options={years.map((year) => ({
          key: year,
          label: year,
          href: `/laporan?tahun=${encodeURIComponent(year)}`,
        }))}
      />

      <section aria-labelledby="judul-ringkasan" className="mt-12 [overflow-anchor:none]">
        <SectionHeading
          id="judul-ringkasan"
          eyebrow={`Tahun ajaran ${summary.academicYear}`}
          title="Ringkasan"
          description={
            summary.latestReport
              ? `Data hingga ${formatMonthYear(summary.latestReport.month, summary.latestReport.year)}.`
              : "Belum ada laporan yang dipublikasikan untuk tahun ajaran ini."
          }
        />

        <dl className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total pendaftar" value={formatNumber(summary.totalApplicants)} />
          <StatCard
            label="Diterima"
            value={formatNumber(summary.totalAccepted)}
            hint={`${formatPercent(summary.acceptanceRate)} dari pendaftar`}
          />
          <StatCard label="Kuota" value={formatNumber(summary.quota)} />
          <StatCard label="Sisa kuota" value={formatNumber(summary.remainingQuota)} />
        </dl>

        <div className="mt-12 max-w-xl">
          <div className="mb-3 flex justify-between text-sm">
            <span className="text-muted">Kuota terisi</span>
            <span className="font-semibold tabular-nums text-navy-900">{formatPercent(summary.quotaFilledPercent)}</span>
          </div>
          <ProgressBar value={summary.quotaFilledPercent} label="Persentase kuota terisi" />
        </div>
      </section>

      <section aria-labelledby="judul-bulanan" className="mt-20 border-t border-line pt-20 sm:mt-28 sm:pt-28 [overflow-anchor:none]">
        <SectionHeading id="judul-bulanan" eyebrow="Rincian" title="Laporan per bulan" />

        {reports.length > 0 ? (
          <div className="mt-12 overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-190 table-fixed text-left text-sm">
              <colgroup>
                <col className="w-44" />
                <col className="w-28" />
                <col className="w-28" />
                <col />
                <col className="w-44" />
              </colgroup>
              <thead className="border-b border-line text-muted">
                <tr className="h-12">
                  <th scope="col" className="px-5 font-medium">Bulan</th>
                  <th scope="col" className="px-5 text-right font-medium">Pendaftar</th>
                  <th scope="col" className="px-5 text-right font-medium">Diterima</th>
                  <th scope="col" className="px-5 font-medium">Catatan</th>
                  <th scope="col" className="px-5 font-medium">Diperbarui</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {reports.map((report) => (
                  <tr key={report.id} className="h-16 transition-colors hover:bg-cream">
                    <th scope="row" className="truncate px-5 font-semibold text-navy-900">
                      {formatMonthYear(report.month, report.year)}
                    </th>
                    <td className="px-5 text-right tabular-nums">{formatNumber(report.applicants)}</td>
                    <td className="px-5 text-right tabular-nums">{formatNumber(report.accepted)}</td>
                    <td className="px-5 text-muted">
                      <p className="line-clamp-2" title={report.note}>
                        {report.note ?? "—"}
                      </p>
                    </td>
                    <td className="truncate px-5 text-muted">
                      <time dateTime={report.updatedAt}>{formatIsoDate(report.updatedAt)}</time>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-line bg-cream font-semibold text-navy-900">
                <tr className="h-14">
                  <th scope="row" className="px-5">Total</th>
                  <td className="px-5 text-right tabular-nums">{formatNumber(summary.totalApplicants)}</td>
                  <td className="px-5 text-right tabular-nums">{formatNumber(summary.totalAccepted)}</td>
                  <td colSpan={2} />
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <p className="mt-12 rounded-2xl border border-dashed border-line p-6 text-muted">
            Laporan pertama akan terbit setelah bulan pendaftaran pertama berakhir.
          </p>
        )}
      </section>
    </>
  );
}
