/**
 * Identitas sekolah dan konfigurasi situs.
 *
 * NAMA SEKOLAH MASIH DUMMY. Untuk menggantinya, ubah di file ini saja — tidak
 * ada nama sekolah yang di-hardcode di komponen mana pun.
 */

/**
 * URL publik situs, dipakai untuk metadata, sitemap, dan robots.txt.
 *
 * Urutan: `NEXT_PUBLIC_SITE_URL` (isi saat domain final ada) → domain produksi
 * yang disediakan Vercel otomatis → localhost saat pengembangan.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    return explicit.replace(/\/+$/, "");
  }

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) {
    return `https://${vercelProduction}`;
  }

  return "http://localhost:3000";
}

export const siteConfig = {
  /** Nama resmi, dipakai di judul halaman dan footer. */
  name: "TK Tunas Ceria",
  /** Nama pendek untuk logo dan navigasi. */
  shortName: "Tunas Ceria",
  /** Inisial untuk lambang sementara, sebelum ada logo asli. */
  initials: "TC",
  tagline: "Tumbuh ceria, belajar bermakna",
  description:
    "Taman Kanak-kanak yang menumbuhkan rasa ingin tahu anak melalui bermain, " +
    "pembiasaan karakter, dan pendampingan guru yang hangat.",
  url: resolveSiteUrl(),
  contact: {
    address: "Jl. Melati Raya No. 12, Kelurahan Sukamaju, Bandung 40123",
    phone: "(022) 1234 5678",
    whatsapp: "6281234567890",
    email: "halo@tunasceria.sch.id",
    operationalHours: "Senin – Jumat, 07.00 – 14.00 WIB",
    mapsQuery: "Jl. Melati Raya No. 12 Bandung",
  },
} as const;

export interface NavItem {
  readonly href: string;
  readonly label: string;
}

/** Sumber tunggal untuk navigasi header dan footer. */
export const navItems: readonly NavItem[] = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/program", label: "Program" },
  { href: "/ppdb", label: "PPDB" },
  { href: "/laporan", label: "Laporan PPDB" },
  { href: "/galeri", label: "Galeri" },
  { href: "/kontak", label: "Kontak" },
] as const;

export const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  siteConfig.contact.mapsQuery,
)}`;

export interface NavGroup {
  readonly title: string;
  readonly items: readonly NavItem[];
}

/** Kolom tautan di footer. Kontak tidak di sini karena diambil dari `siteConfig.contact`. */
export const footerNavGroups: readonly NavGroup[] = [
  {
    title: "Jelajahi",
    items: [
      { href: "/", label: "Beranda" },
      { href: "/tentang", label: "Tentang kami" },
      { href: "/program", label: "Program" },
      { href: "/galeri", label: "Galeri" },
    ],
  },
  {
    title: "Pendaftaran",
    items: [
      { href: "/ppdb", label: "Info PPDB" },
      { href: "/ppdb#judul-biaya", label: "Rincian biaya" },
      { href: "/laporan", label: "Laporan PPDB" },
      { href: "/kontak", label: "Kunjungi sekolah" },
    ],
  },
];
