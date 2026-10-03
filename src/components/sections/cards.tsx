import Link from "next/link";
import { ClockIcon, FacilityIcon, HighlightIcon, UsersIcon } from "@/components/ui/icons";
import { PhotoPlaceholder } from "@/components/ui/primitives";
import { formatIsoDate } from "@/lib/format";
import type { Announcement, Facility, GalleryCategory, GalleryItem, Highlight, Program } from "@/types";

/**
 * Aturan kartu: setiap blok teks dibatasi jumlah barisnya (`line-clamp`) dan
 * diberi tinggi minimum yang sama, kartu mengisi penuh tinggi baris grid, dan
 * bagian bawahnya didorong ke dasar (`mt-auto`). Dengan begitu panjang teks
 * tidak pernah mengubah ukuran atau kesejajaran kartu.
 */
const CARD_HOVER =
  "transition duration-300 ease-out hover:shadow-lg motion-safe:hover:-translate-y-1";
const PHOTO_ZOOM = "transition-transform duration-500 ease-out motion-safe:group-hover:scale-105";

/** Bar keunggulan navy di bawah hero beranda. */
export function HighlightBar({ highlights }: { highlights: readonly Highlight[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-xl bg-white/10 shadow-xl sm:grid-cols-2 lg:grid-cols-5">
      {highlights.map((highlight) => (
        <li key={highlight.id} className="group flex gap-4 bg-navy-900 p-5 text-white">
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-gold-400/60 text-gold-400 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-navy-900">
            <HighlightIcon name={highlight.icon} />
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold">{highlight.title}</h3>
            <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-white/70">{highlight.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Kartu ringkas untuk beranda: foto, nama, deskripsi singkat, usia. */
export function ProgramTile({ program }: { program: Program }) {
  return (
    <Link
      href="/program"
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm ${CARD_HOVER}`}
    >
      <div className="overflow-hidden">
        <PhotoPlaceholder alt={`Kegiatan kelas ${program.name}`} className={`aspect-[4/3] ${PHOTO_ZOOM}`} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 font-semibold text-navy-900">{program.name}</h3>
        <p className="mt-2 line-clamp-3 min-h-15 text-sm text-muted">{program.description}</p>
        <p className="mt-auto pt-4 text-sm font-semibold text-gold-600">Usia {program.ageRange}</p>
      </div>
    </Link>
  );
}

/** Kartu halaman Program: foto, nama, satu kalimat, poin singkat, jadwal & kapasitas. */
export function ProgramCard({ program }: { program: Program }) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm ${CARD_HOVER}`}
    >
      <div className="relative overflow-hidden">
        <PhotoPlaceholder alt={`Kegiatan kelas ${program.name}`} className={`aspect-[16/10] ${PHOTO_ZOOM}`} />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-navy-900 shadow-sm">
          Usia {program.ageRange}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="line-clamp-1 font-serif text-2xl text-navy-900">{program.name}</h3>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm text-muted">{program.description}</p>

        <ul className="mb-5 mt-4 flex flex-wrap gap-2" aria-label="Fokus kegiatan">
          {program.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight} className="rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-700">
              {highlight}
            </li>
          ))}
        </ul>

        <dl className="mt-auto space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex items-center gap-2.5">
            <dt>
              <ClockIcon className="size-4 text-gold-500" />
              <span className="sr-only">Jadwal</span>
            </dt>
            <dd className="truncate text-ink" title={program.schedule}>
              {program.schedule}
            </dd>
          </div>
          <div className="flex items-center gap-2.5">
            <dt>
              <UsersIcon className="size-4 text-gold-500" />
              <span className="sr-only">Kapasitas</span>
            </dt>
            <dd className="text-ink">Maks. {program.capacity} anak per kelas</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export function FacilityGrid({ facilities }: { facilities: readonly Facility[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {facilities.map((facility) => (
        <li
          key={facility.id}
          className={`group flex h-full gap-4 rounded-xl border border-line bg-white p-5 shadow-sm ${CARD_HOVER}`}
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-navy-900 text-gold-400 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-navy-900">
            <FacilityIcon name={facility.icon} />
          </span>
          <div className="min-w-0">
            <h3 className="line-clamp-1 font-semibold text-navy-900">{facility.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted">{facility.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function AnnouncementList({ announcements }: { announcements: readonly Announcement[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {announcements.map((announcement) => (
        <li
          key={announcement.id}
          className={`flex h-full flex-col rounded-xl border border-line bg-white p-6 shadow-sm ${CARD_HOVER}`}
        >
          <time dateTime={announcement.publishedAt} className="text-xs font-semibold uppercase tracking-wider text-gold-600">
            {formatIsoDate(announcement.publishedAt)}
          </time>
          <h3 className="mt-2 line-clamp-2 min-h-14 font-serif text-xl text-navy-900">{announcement.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm text-muted">{announcement.excerpt}</p>
        </li>
      ))}
    </ul>
  );
}

export const GALLERY_CATEGORY_LABELS: Record<GalleryCategory, string> = {
  kegiatan: "Kegiatan",
  fasilitas: "Fasilitas",
  prestasi: "Prestasi",
};

/**
 * Belum ada foto asli, jadi tiap item memakai `PhotoPlaceholder` yang tetap
 * membawa teks `alt`. Saat foto tersedia, ganti dengan `next/image`.
 *
 * Keterangan foto punya tinggi tetap (`h-20`) dan judul maksimal dua baris,
 * jadi semua kartu sama besar berapa pun panjang judulnya.
 */
export function GalleryGrid({ items }: { items: readonly GalleryItem[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id}>
          <figure
            className={`group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm ${CARD_HOVER}`}
          >
            <div className="overflow-hidden">
              <PhotoPlaceholder alt={item.alt} className={`aspect-[4/3] ${PHOTO_ZOOM}`} />
            </div>
            <figcaption className="flex h-20 items-center gap-3 px-4">
              <span className="line-clamp-2 min-w-0 flex-1 text-sm font-semibold text-navy-900" title={item.title}>
                {item.title}
              </span>
              <span className="shrink-0 rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-700">
                {GALLERY_CATEGORY_LABELS[item.category]}
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
