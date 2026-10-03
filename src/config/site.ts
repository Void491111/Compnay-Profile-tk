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
  name: "TK Tunas Ceria",
  shortName: "Tunas Ceria",
  initials: "TC",
  tagline: "Tumbuh ceria, belajar bermakna",
  description:
    "Taman Kanak-kanak yang menumbuhkan rasa ingin tahu anak melalui bermain, " +
    "pembiasaan karakter, dan pendampingan guru yang hangat.",
  url: resolveSiteUrl(),
  contact: {
    address: "Jl. Ahmad Yani, Batam Kota, Kota Batam, Kepulauan Riau 29461",
    phone: "(0778) 123 4567",
    whatsapp: "6281234567890",
    email: "halo@tunasceria.sch.id",
    operationalHours: "Senin – Jumat, 07.00 – 14.00 WIB",
    mapsQuery: "Politeknik Negeri Batam",
  },
} as const;

export interface NavItem {
  readonly href: string;
  readonly label: string;
}

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
