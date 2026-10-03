import { enrollmentReports, ppdbInfo } from "@/data/ppdb";
import type { EnrollmentReport, EnrollmentSummary, PpdbInfo } from "@/types";

const PPDB_CYCLE_START_MONTH = 7;

export async function getPpdbInfo(): Promise<PpdbInfo> {
  return ppdbInfo;
}

export function academicYearOf(report: Pick<EnrollmentReport, "year" | "month">): string {
  const startYear = report.month >= PPDB_CYCLE_START_MONTH ? report.year + 1 : report.year;
  return `${startYear}/${startYear + 1}`;
}

function byPeriodAsc(a: EnrollmentReport, b: EnrollmentReport): number {
  return a.year - b.year || a.month - b.month;
}

function toPercent(part: number, whole: number): number {
  if (whole <= 0) {
    return 0;
  }

  return Math.round((part / whole) * 100);
}

export async function getPublishedReports(academicYear?: string): Promise<readonly EnrollmentReport[]> {
  return enrollmentReports
    .filter((report) => report.published)
    .filter((report) => !academicYear || academicYearOf(report) === academicYear)
    .sort(byPeriodAsc);
}

export async function getReportAcademicYears(): Promise<readonly string[]> {
  const reports = await getPublishedReports();
  const years = new Set(reports.map(academicYearOf));

  return [...years].sort().reverse();
}

export function summarizeReports(
  academicYear: string,
  reports: readonly EnrollmentReport[],
): EnrollmentSummary {
  const totalApplicants = reports.reduce((sum, report) => sum + report.applicants, 0);
  const totalAccepted = reports.reduce((sum, report) => sum + report.accepted, 0);
  const latestReport = reports.length > 0 ? [...reports].sort(byPeriodAsc)[reports.length - 1] : null;
  const quota = latestReport?.quota ?? 0;

  return {
    academicYear,
    totalApplicants,
    totalAccepted,
    quota,
    remainingQuota: Math.max(quota - totalAccepted, 0),
    acceptanceRate: toPercent(totalAccepted, totalApplicants),
    quotaFilledPercent: Math.min(toPercent(totalAccepted, quota), 100),
    latestReport,
  };
}

export async function getEnrollmentSummary(academicYear: string): Promise<EnrollmentSummary> {
  const reports = await getPublishedReports(academicYear);
  return summarizeReports(academicYear, reports);
}
