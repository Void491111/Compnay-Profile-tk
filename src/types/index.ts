/**
 * Tipe domain terpusat.
 *
 * Semua layer (model, service, komponen) memakai tipe dari sini supaya kontrak
 * datanya satu dan perubahan bentuk data langsung terdeteksi compiler.
 */

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

/** Angka turunan dari profil sekolah. Dihitung di service. */
export interface SchoolStats {
  readonly yearsRunning: number;
  readonly studentCount: number;
  readonly teacherCount: number;
  /** Jumlah murid per satu guru, dibulatkan. */
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
  /** Format ISO `YYYY-MM-DD`. */
  readonly startDate: string;
  /** Format ISO `YYYY-MM-DD`. */
  readonly endDate: string;
  readonly description?: string;
}

export interface PpdbFee {
  readonly id: string;
  readonly label: string;
  /** Nominal dalam rupiah, bukan sen. */
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
  /** Format ISO `YYYY-MM-DD`. */
  readonly updatedAt: string;
}

/**
 * Laporan PPDB bulanan.
 *
 * Hanya menyimpan angka agregat — tidak ada data pribadi calon murid. Ini
 * disengaja: laporan ini publik, jadi tidak boleh memuat data anak.
 */
export interface EnrollmentReport {
  readonly id: string;
  readonly year: number;
  /** 1 = Januari, 12 = Desember. */
  readonly month: number;
  readonly applicants: number;
  readonly accepted: number;
  readonly quota: number;
  readonly note?: string;
  readonly published: boolean;
  /** Format ISO `YYYY-MM-DD`. */
  readonly updatedAt: string;
}

/** Hasil turunan dari sekumpulan laporan. Dihitung di service, bukan di UI. */
export interface EnrollmentSummary {
  readonly academicYear: string;
  readonly totalApplicants: number;
  readonly totalAccepted: number;
  readonly quota: number;
  readonly remainingQuota: number;
  /** 0–100, sudah dibulatkan. */
  readonly acceptanceRate: number;
  /** 0–100, sudah dibulatkan. */
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

/** Keunggulan sekolah yang ditampilkan di bawah hero beranda. */
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
  /** Teks alternatif wajib — aksesibilitas, bukan opsional. */
  readonly alt: string;
}

export interface Announcement {
  readonly id: string;
  readonly title: string;
  readonly excerpt: string;
  /** Format ISO `YYYY-MM-DD`. */
  readonly publishedAt: string;
}
