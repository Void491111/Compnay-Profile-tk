/**
 * Data PPDB dan laporan bulanan (dummy).
 *
 * Laporan hanya berisi angka agregat. Laporan dengan `published: false` adalah
 * draf dan tidak pernah ditampilkan ke publik — penyaringan dilakukan di service.
 */

import type { EnrollmentReport, PpdbInfo } from "@/types";

export const ppdbInfo: PpdbInfo = {
  academicYear: "2027/2028",
  status: "buka",
  announcement:
    "Pendaftaran gelombang pertama dibuka. Orang tua dapat datang langsung ke sekolah " +
    "atau menghubungi panitia lewat WhatsApp untuk menjadwalkan kunjungan.",
  requirements: [
    { id: "r1", label: "Usia minimal 3 tahun pada 1 Juli 2027", note: "Untuk Kelompok Bermain" },
    { id: "r2", label: "Fotokopi akta kelahiran anak" },
    { id: "r3", label: "Fotokopi kartu keluarga" },
    { id: "r4", label: "Fotokopi KTP kedua orang tua" },
    { id: "r5", label: "Pas foto anak ukuran 3×4 (2 lembar)" },
    { id: "r6", label: "Mengisi formulir pendaftaran", note: "Tersedia di sekolah" },
  ],
  schedule: [
    {
      id: "s1",
      phase: "Pendaftaran gelombang 1",
      startDate: "2026-09-01",
      endDate: "2026-12-31",
      description: "Pengambilan dan pengembalian formulir di sekolah.",
    },
    {
      id: "s2",
      phase: "Pendaftaran gelombang 2",
      startDate: "2027-01-04",
      endDate: "2027-03-31",
      description: "Dibuka bila kuota masih tersedia.",
    },
    {
      id: "s3",
      phase: "Observasi dan wawancara orang tua",
      startDate: "2027-04-05",
      endDate: "2027-04-16",
    },
    {
      id: "s4",
      phase: "Pengumuman penerimaan",
      startDate: "2027-04-26",
      endDate: "2027-04-26",
    },
    {
      id: "s5",
      phase: "Awal tahun ajaran",
      startDate: "2027-07-12",
      endDate: "2027-07-12",
    },
  ],
  fees: [
    { id: "f1", label: "Biaya pendaftaran", amount: 250_000, period: "sekali" },
    {
      id: "f2",
      label: "Uang pangkal",
      amount: 3_500_000,
      period: "sekali",
      note: "Dapat dicicil hingga 3 kali",
    },
    { id: "f3", label: "SPP", amount: 450_000, period: "bulanan" },
    {
      id: "f4",
      label: "Kegiatan dan seragam",
      amount: 1_200_000,
      period: "tahunan",
      note: "Termasuk 3 stel seragam dan buku kegiatan",
    },
  ],
  contact: {
    name: "Ibu Dewi Lestari (Panitia PPDB)",
    phone: "0812-3456-7890",
    whatsapp: "6281234567890",
    email: "ppdb@tunasceria.sch.id",
  },
  updatedAt: "2026-09-28",
};

/** Kuota total murid baru untuk semua kelompok dalam satu tahun ajaran. */
const QUOTA_2026 = 50;
const QUOTA_2027 = 55;

export const enrollmentReports: readonly EnrollmentReport[] = [
  // Tahun ajaran 2026/2027 (periode PPDB Juli 2025 – Juni 2026)
  { id: "2025-09", year: 2025, month: 9, applicants: 8, accepted: 7, quota: QUOTA_2026, published: true, updatedAt: "2025-10-02" },
  { id: "2025-10", year: 2025, month: 10, applicants: 11, accepted: 10, quota: QUOTA_2026, published: true, updatedAt: "2025-11-03" },
  { id: "2025-11", year: 2025, month: 11, applicants: 9, accepted: 8, quota: QUOTA_2026, published: true, updatedAt: "2025-12-01" },
  { id: "2025-12", year: 2025, month: 12, applicants: 6, accepted: 6, quota: QUOTA_2026, published: true, updatedAt: "2026-01-05" },
  { id: "2026-01", year: 2026, month: 1, applicants: 7, accepted: 6, quota: QUOTA_2026, published: true, updatedAt: "2026-02-02" },
  { id: "2026-02", year: 2026, month: 2, applicants: 5, accepted: 5, quota: QUOTA_2026, published: true, updatedAt: "2026-03-02" },
  {
    id: "2026-03",
    year: 2026,
    month: 3,
    applicants: 9,
    accepted: 6,
    quota: QUOTA_2026,
    note: "Kuota Kelompok Bermain penuh; sebagian pendaftar masuk daftar tunggu.",
    published: true,
    updatedAt: "2026-04-01",
  },
  { id: "2026-04", year: 2026, month: 4, applicants: 2, accepted: 2, quota: QUOTA_2026, note: "Pendaftaran ditutup.", published: true, updatedAt: "2026-05-04" },

  // Tahun ajaran 2027/2028 (periode PPDB Juli 2026 – Juni 2027)
  {
    id: "2026-09",
    year: 2026,
    month: 9,
    applicants: 12,
    accepted: 10,
    quota: QUOTA_2027,
    note: "Gelombang 1 dibuka 1 September.",
    published: true,
    updatedAt: "2026-10-01",
  },
  // Draf — belum diverifikasi, tidak tampil di situs.
  { id: "2026-10", year: 2026, month: 10, applicants: 3, accepted: 1, quota: QUOTA_2027, published: false, updatedAt: "2026-10-03" },
];
