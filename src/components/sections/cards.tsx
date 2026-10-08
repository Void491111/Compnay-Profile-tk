import Link from "next/link";
import { ArrowRightIcon, ClockIcon, FacilityIcon, HighlightIcon, UsersIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/motion";
import { PhotoPlaceholder } from "@/components/ui/primitives";
import { formatIsoDate } from "@/lib/format";
import type { Announcement, Facility, GalleryCategory, GalleryItem, Highlight, Program } from "@/types";

export function HighlightStrip({ highlights }: { highlights: readonly Highlight[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {highlights.map((highlight, index) => (
        <Reveal
          as="li"
          key={highlight.id}
          delay={index * 0.05}
          className="flex items-start gap-4 rounded-2xl bg-navy-900 p-5 sm:last:col-span-2 lg:flex-col lg:items-center lg:px-4 lg:py-7 lg:text-center lg:last:col-span-1"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold-400/60">
            <HighlightIcon name={highlight.icon} className="size-6 text-gold-400" />
          </span>
          <div className="min-w-0">
            <h3 className="font-heading text-base font-semibold text-white">{highlight.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-navy-100/80 lg:mt-2">{highlight.description}</p>
          </div>
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

export function ProgramDetail({ program }: { program: Program }) {
  return (
    <article aria-labelledby={`program-${program.id}`} className="grid gap-6 lg:grid-cols-[2fr_3fr] lg:gap-16">
      <div>
        <p className="text-sm font-semibold text-gold-600">Usia {program.ageRange}</p>
        <h2 id={`program-${program.id}`} className="mt-3 font-heading text-3xl font-bold tracking-tight text-navy-900">
          {program.name}
        </h2>
      </div>

      <div>
        <p className="text-lg leading-relaxed text-ink">{program.description}</p>
        <p className="mt-4 text-muted">
          <span className="sr-only">Fokus kegiatan: </span>
          {program.highlights.join(" · ")}
        </p>

        <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
          <div className="flex gap-3">
            <ClockIcon className="mt-0.5 size-5 shrink-0 text-gold-500" />
            <div>
              <dt className="text-sm text-muted">Jadwal</dt>
              <dd className="mt-1 font-medium text-navy-900">{program.schedule}</dd>
            </div>
          </div>
          <div className="flex gap-3">
            <UsersIcon className="mt-0.5 size-5 shrink-0 text-gold-500" />
            <div>
              <dt className="text-sm text-muted">Kapasitas</dt>
              <dd className="mt-1 font-medium text-navy-900">Maks. {program.capacity} anak per kelas</dd>
            </div>
          </div>
        </dl>
      </div>
    </article>
  );
}

export function FacilityList({ facilities }: { facilities: readonly Facility[] }) {
  return (
    <ul className="grid gap-x-16 border-b border-line sm:grid-cols-2">
      {facilities.map((facility, index) => (
        <Reveal as="li" key={facility.id} delay={(index % 2) * 0.05} className="flex gap-4 border-t border-line py-6">
          <FacilityIcon name={facility.icon} className="size-6 shrink-0 text-gold-500" />
          <div className="min-w-0">
            <h3 className="font-heading text-lg font-bold text-navy-900">{facility.name}</h3>
            <p className="mt-1 leading-relaxed text-muted">{facility.description}</p>
          </div>
        </Reveal>
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
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Reveal as="li" key={item.id} delay={(index % 3) * 0.05}>
          <figure className="group">
            <div className="overflow-hidden rounded-2xl">
              <PhotoPlaceholder
                alt={item.alt}
                className="aspect-4/3 transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="mt-4">
              <span className="block font-medium text-navy-900">{item.title}</span>
              <span className="mt-1 block text-sm text-muted">{GALLERY_CATEGORY_LABELS[item.category]}</span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}
