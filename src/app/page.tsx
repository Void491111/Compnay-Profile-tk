import type { ReactNode } from "react";
import { AnnouncementList, HighlightBar, ProgramTile } from "@/components/sections/cards";
import { AwardIcon, CalendarIcon, ChatIcon, CheckIcon, UsersIcon } from "@/components/ui/icons";
import {
  ButtonLink,
  Container,
  PhotoPlaceholder,
  PpdbStatusBadge,
  ProgressBar,
  SectionHeading,
} from "@/components/ui/primitives";
import { siteConfig, whatsappUrl } from "@/config/site";
import { formatNumber, formatPercent } from "@/lib/format";
import { getEnrollmentSummary, getPpdbInfo } from "@/services/ppdb";
import {
  getHighlights,
  getLatestAnnouncements,
  getPrograms,
  getSchoolProfile,
  getSchoolStats,
} from "@/services/school";

function MiniStat({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-navy-500">{icon}</span>
      <div className="flex flex-col-reverse">
        <dt className="mt-1 text-xs text-muted">{label}</dt>
        <dd className="font-serif text-2xl leading-none text-navy-900">{value}</dd>
      </div>
    </div>
  );
}

export default async function HomePage() {
  const [profile, stats, highlights, programs, announcements, ppdb] = await Promise.all([
    getSchoolProfile(),
    getSchoolStats(),
    getHighlights(),
    getPrograms(),
    getLatestAnnouncements(),
    getPpdbInfo(),
  ]);
  const summary = await getEnrollmentSummary(ppdb.academicYear);
  // Tagline "Tumbuh ceria, belajar bermakna" dipecah jadi dua baris berwarna.
  const [taglineLead, taglineAccent] = siteConfig.tagline.split(", ");

  return (
    <>
      {/* Hero */}
      <section className="relative bg-cream">
        <Container className="grid items-center gap-12 pb-28 pt-14 lg:grid-cols-[1.05fr_1fr] lg:pb-36 lg:pt-20">
          <div>
            <PpdbStatusBadge status={ppdb.status} />
            <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-navy-900 sm:text-6xl">
              {taglineLead}
              {taglineAccent ? <span className="block text-gold-500">{taglineAccent}.</span> : null}
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted">{siteConfig.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/tentang" arrow>
                Kenali sekolah kami
              </ButtonLink>
              <ButtonLink href="/ppdb" variant="outline">
                Info PPDB {ppdb.academicYear}
              </ButtonLink>
            </div>
          </div>

          <div className="relative">
            <PhotoPlaceholder
              alt="Anak-anak tersenyum saat bermain bersama guru di dalam kelas"
              className="aspect-[5/4] rounded-2xl"
            />
            <div className="absolute -bottom-6 right-4 flex items-center gap-3 rounded-xl bg-white p-4 shadow-lg sm:right-6">
              <span className="grid size-11 place-items-center rounded-full bg-gold-100 text-gold-600">
                <AwardIcon />
              </span>
              <div className="leading-tight">
                <p className="text-xs text-muted">Mendampingi anak</p>
                <p className="font-serif text-xl text-navy-900">sejak {profile.foundedYear}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="relative z-10 -mt-16 lg:-mt-20">
        <HighlightBar highlights={highlights} />
      </Container>

      {/* Tentang */}
      <section aria-labelledby="judul-tentang" className="py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_1.2fr_0.8fr]">
          <div>
            <SectionHeading
              id="judul-tentang"
              eyebrow="Tentang sekolah kami"
              title="Belajar dengan gembira,"
              accent="berkarakter sejak dini"
            />
            <p className="mt-5 text-muted">{profile.vision}</p>
            <ButtonLink href="/tentang" className="mt-6" arrow>
              Selengkapnya
            </ButtonLink>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <MiniStat icon={<CalendarIcon />} value={`${stats.yearsRunning}+`} label="Tahun berdiri" />
              <MiniStat icon={<UsersIcon />} value={formatNumber(stats.studentCount)} label="Murid aktif" />
              <MiniStat icon={<AwardIcon />} value={profile.accreditation.split(" ")[0]} label="Akreditasi" />
            </dl>
          </div>

          <PhotoPlaceholder
            alt="Gedung sekolah dengan halaman bermain yang luas dan pepohonan"
            className="aspect-[4/3] rounded-xl"
          />

          <dl className="grid gap-4">
            {[
              { value: `1:${stats.studentsPerTeacher}`, label: "Rasio guru dan murid" },
              { value: `${programs.length}`, label: "Kelompok belajar" },
              { value: `${stats.teacherCount}`, label: "Guru dan pendamping" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col-reverse rounded-lg border border-line bg-white p-5 shadow-sm">
                <dt className="mt-1 text-sm text-muted">{item.label}</dt>
                <dd className="font-serif text-3xl text-navy-900">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Program */}
      <section aria-labelledby="judul-program" className="bg-cream py-20">
        <Container>
          <SectionHeading
            id="judul-program"
            eyebrow="Program"
            title="Temukan program yang tepat"
            description="Setiap kelompok dirancang sesuai tahap tumbuh kembang anak."
            align="center"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <ProgramTile key={program.id} program={program} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/program" arrow>
              Lihat semua program
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Statistik */}
      <section aria-label="Sekolah dalam angka" className="py-10">
        <Container>
          <dl className="grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <CalendarIcon className="size-8" />, value: `${stats.yearsRunning}+`, label: "Tahun pengalaman" },
              { icon: <UsersIcon className="size-8" />, value: formatNumber(stats.studentCount), label: "Murid aktif" },
              { icon: <AwardIcon className="size-8" />, value: `${stats.teacherCount}`, label: "Guru berpengalaman" },
              {
                icon: <CheckIcon className="size-8" />,
                value: formatPercent(summary.quotaFilledPercent),
                label: `Kuota PPDB ${ppdb.academicYear} terisi`,
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 bg-navy-900 px-6 py-7">
                <span className="text-gold-400">{item.icon}</span>
                <div className="flex flex-col-reverse">
                  <dt className="mt-1.5 text-sm text-white/75">{item.label}</dt>
                  <dd className="font-serif text-3xl leading-none text-gold-400">{item.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* PPDB */}
      <section aria-labelledby="judul-ppdb" className="py-10">
        <Container>
          <div className="grid overflow-hidden rounded-xl border border-line lg:grid-cols-2">
            <PhotoPlaceholder
              alt="Anak-anak membaca buku cerita bersama di halaman sekolah"
              className="min-h-64 lg:min-h-full"
            />
            <div className="bg-cream p-8 sm:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">PPDB {ppdb.academicYear}</p>
              <h2 id="judul-ppdb" className="mt-2 font-serif text-3xl leading-tight text-navy-900 sm:text-4xl">
                Mulai petualangan si kecil
                <span className="block">bersama kami</span>
              </h2>
              <p className="mt-4 text-muted">{ppdb.announcement}</p>

              <div className="mt-6 max-w-sm">
                <div className="mb-2 flex justify-between text-sm font-bold text-navy-900">
                  <span>Kuota terisi</span>
                  <span>
                    {formatNumber(summary.totalAccepted)} / {formatNumber(summary.quota)}
                  </span>
                </div>
                <ProgressBar value={summary.quotaFilledPercent} label="Persentase kuota terisi" />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/ppdb" variant="gold" arrow>
                  Daftar sekarang
                </ButtonLink>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-md border border-navy-900 px-5 py-3 text-xs font-bold uppercase tracking-wider text-navy-900 hover:bg-navy-50"
                >
                  <ChatIcon className="size-4" />
                  Tanya via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Pengumuman */}
      <section aria-labelledby="judul-kabar" className="py-20">
        <Container>
          <SectionHeading id="judul-kabar" eyebrow="Kabar sekolah" title="Pengumuman terbaru" />
          <div className="mt-10">
            <AnnouncementList announcements={announcements} />
          </div>
        </Container>
      </section>
    </>
  );
}
