export type PpdbStatus = "buka" | "tutup" | "segera";

export type FeePeriod = "sekali" | "bulanan" | "tahunan";

export interface SchoolProfile {
  readonly vision: string;
  readonly missions: readonly string[];
  readonly history: string;
  readonly foundedYear: number;
  readonly accreditation: string;
  readonly studentCount: number;
  readonly teacherCount: number;
  readonly headmaster: {
    readonly name: string;
    readonly title: string;
    readonly greeting: string;
  };
}

export interface SchoolStats {
  readonly yearsRunning: number;
  readonly studentCount: number;
  readonly teacherCount: number;
  readonly studentsPerTeacher: number;
}

export interface PpdbRequirement {
  readonly id: string;
  readonly label: string;
  readonly note?: string;
}

export interface PpdbScheduleItem {
  readonly id: string;
  readonly phase: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly description?: string;
}

export interface PpdbFee {
  readonly id: string;
  readonly label: string;
  readonly amount: number;
  readonly period: FeePeriod;
  readonly note?: string;
}

export interface PpdbContact {
  readonly name: string;
  readonly phone: string;
  readonly whatsapp: string;
  readonly email: string;
}

export interface PpdbInfo {
  readonly academicYear: string;
  readonly status: PpdbStatus;
  readonly announcement: string;
  readonly requirements: readonly PpdbRequirement[];
  readonly schedule: readonly PpdbScheduleItem[];
  readonly fees: readonly PpdbFee[];
  readonly contact: PpdbContact;
  readonly updatedAt: string;
}

export interface EnrollmentReport {
  readonly id: string;
  readonly year: number;
  readonly month: number;
  readonly applicants: number;
  readonly accepted: number;
  readonly quota: number;
  readonly note?: string;
  readonly published: boolean;
  readonly updatedAt: string;
}

export interface EnrollmentSummary {
  readonly academicYear: string;
  readonly totalApplicants: number;
  readonly totalAccepted: number;
  readonly quota: number;
  readonly remainingQuota: number;
  readonly acceptanceRate: number;
  readonly quotaFilledPercent: number;
  readonly latestReport: EnrollmentReport | null;
}

export interface Program {
  readonly id: string;
  readonly name: string;
  readonly ageRange: string;
  readonly description: string;
  readonly schedule: string;
  readonly capacity: number;
  readonly highlights: readonly string[];
}

export type FacilityIcon =
  | "classroom"
  | "playground"
  | "library"
  | "health"
  | "transport"
  | "worship";

export type HighlightIcon = "heart" | "teacher" | "puzzle" | "leaf" | "shield";

export interface Highlight {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: HighlightIcon;
}

export interface Facility {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly icon: FacilityIcon;
}

export type GalleryCategory = "kegiatan" | "fasilitas" | "prestasi";

export interface GalleryItem {
  readonly id: string;
  readonly title: string;
  readonly category: GalleryCategory;
  readonly alt: string;
}

export interface Announcement {
  readonly id: string;
  readonly title: string;
  readonly excerpt: string;
  readonly publishedAt: string;
}
