import Link from "next/link";
import { ArrowRightIcon, ClockIcon, FacilityIcon, HighlightIcon, UsersIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/motion";
import { PhotoPlaceholder } from "@/components/ui/primitives";
import { formatIsoDate } from "@/lib/format";
import type { Announcement, Facility, GalleryCategory, GalleryItem, Highlight, Program } from "@/types";

const CARD_HOVER =
  "transition duration-300 ease-out hover:shadow-lg motion-safe:hover:-translate-y-1";
const PHOTO_ZOOM = "transition-transform duration-500 ease-out motion-safe:group-hover:scale-105";

export function HighlightStrip({ highlights }: { highlights: readonly Highlight[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
      {highlights.map((highlight, index) => (
        <Reveal as="li" key={highlight.id} delay={index * 0.05} className="flex items-center gap-3">
          <HighlightIcon name={highlight.icon} className="size-6 shrink-0 text-gold-500" />
          <span className="text-sm font-medium text-navy-900">{highlight.title}</span>
        </Reveal>
      ))}
    </ul>
  );
}

export function ProgramList({ programs }: { programs: readonly Program[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {programs.map((program, index) => (
        <Reveal as="li" key={program.id} delay={index * 0.05}>
          <Link href="/program" className="group flex items-center gap-6 py-6 sm:py-8">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-heading text-xl font-bold text-navy-900">{program.name}</h3>
                <span className="text-sm text-muted">Usia {program.ageRange}</span>
              </div>
              <p className="mt-2 leading-relaxed text-muted">{program.description}</p>
            </div>
            <ArrowRightIcon className="size-5 shrink-0 text-navy-900/30 transition duration-200 ease-out group-hover:translate-x-1 group-hover:text-navy-900" />
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

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
        <h3 className="line-clamp-1 font-heading text-2xl font-bold text-navy-900">{program.name}</h3>
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
    <ul className="divide-y divide-line border-y border-line">
      {announcements.map((announcement, index) => (
        <Reveal as="li" key={announcement.id} delay={index * 0.05}>
          <article className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8 sm:py-8">
            <time dateTime={announcement.publishedAt} className="text-sm text-muted sm:pt-1">
              {formatIsoDate(announcement.publishedAt)}
            </time>
            <div className="max-w-2xl">
              <h3 className="font-heading text-lg font-bold text-navy-900">{announcement.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{announcement.excerpt}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}

export const GALLERY_CATEGORY_LABELS: Record<GalleryCategory, string> = {
  kegiatan: "Kegiatan",
  fasilitas: "Fasilitas",
  prestasi: "Prestasi",
};

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
