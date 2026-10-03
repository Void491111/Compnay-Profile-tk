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

      <section aria-labelledby="judul-ringkasan" className="mt-10 [overflow-anchor:none]">
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

        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total pendaftar" value={formatNumber(summary.totalApplicants)} />
          <StatCard
            label="Diterima"
            value={formatNumber(summary.totalAccepted)}
            hint={`${formatPercent(summary.acceptanceRate)} dari pendaftar`}
          />
          <StatCard label="Kuota" value={formatNumber(summary.quota)} />
          <StatCard label="Sisa kuota" value={formatNumber(summary.remainingQuota)} />
        </dl>

        <div className="mt-6 rounded-lg border border-line bg-white p-5">
          <div className="mb-2 flex justify-between font-bold">
            <span>Kuota terisi</span>
            <span>{formatPercent(summary.quotaFilledPercent)}</span>
          </div>
          <ProgressBar value={summary.quotaFilledPercent} label="Persentase kuota terisi" />
        </div>
      </section>

      <section aria-labelledby="judul-bulanan" className="mt-14 [overflow-anchor:none]">
        <SectionHeading id="judul-bulanan" eyebrow="Rincian" title="Laporan per bulan" />

        {reports.length > 0 ? (
          <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-white shadow-sm">
            <table className="w-full min-w-190 table-fixed text-left text-sm">
              <colgroup>
                <col className="w-44" />
                <col className="w-28" />
                <col className="w-28" />
                <col />
                <col className="w-44" />
              </colgroup>
              <thead className="bg-navy-50 text-xs uppercase tracking-wider text-navy-700">
                <tr className="h-12">
                  <th scope="col" className="px-5 font-semibold">Bulan</th>
                  <th scope="col" className="px-5 text-right font-semibold">Pendaftar</th>
                  <th scope="col" className="px-5 text-right font-semibold">Diterima</th>
                  <th scope="col" className="px-5 font-semibold">Catatan</th>
                  <th scope="col" className="px-5 font-semibold">Diperbarui</th>
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
              <tfoot className="border-t-2 border-line bg-navy-50/50 font-semibold text-navy-900">
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
          <p className="mt-6 rounded-lg border border-dashed border-line bg-white p-6 text-muted">
            Laporan pertama akan terbit setelah bulan pendaftaran pertama berakhir.
          </p>
        )}
      </section>
    </>
  );
}
