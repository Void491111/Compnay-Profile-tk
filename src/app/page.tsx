import Image from "next/image";
import classroomPhoto from "../../public/1.jpg";
import heroPhoto from "../../public/2.jpg";
import classPhoto from "../../public/3.jpg";
import { AnnouncementList, HighlightStrip, ProgramList } from "@/components/sections/cards";
import { ChatIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/motion";
import {
  ButtonLink,
  Container,
  PpdbStatusBadge,
  ProgressBar,
  Section,
  SectionHeading,
  TextLink,
} from "@/components/ui/primitives";
import { siteConfig, whatsappUrl } from "@/config/site";
import { formatNumber } from "@/lib/format";
import { getEnrollmentSummary, getPpdbInfo } from "@/services/ppdb";
import {
  getHighlights,
  getLatestAnnouncements,
  getPrograms,
  getSchoolProfile,
  getSchoolStats,
} from "@/services/school";

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
  const [taglineLead, taglineRest] = siteConfig.tagline.split(", ");

  const aboutStats = [
    { value: `${stats.yearsRunning}+`, label: "Tahun berdiri" },
    { value: formatNumber(stats.studentCount), label: "Murid aktif" },
    { value: `1:${stats.studentsPerTeacher}`, label: "Rasio guru : murid" },
  ];

  return (
    <>
      <section className="bg-cream">
        <Container className="pb-16 pt-16 sm:pb-20 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <PpdbStatusBadge status={ppdb.status} />
              <h1 className="mt-6 font-heading text-4xl font-bold leading-[1.1] tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
                {taglineLead}
                {taglineRest ? <span className="block">{taglineRest}.</span> : null}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{siteConfig.description}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/ppdb" arrow>
                  Info PPDB {ppdb.academicYear}
                </ButtonLink>
                <ButtonLink href="/tentang" variant="outline">
                  Kenali sekolah kami
                </ButtonLink>
              </div>
            </Reveal>

            <div className="relative aspect-5/4 overflow-hidden rounded-2xl bg-navy-100">
              <Image
                src={heroPhoto}
                alt="Guru mendampingi anak-anak yang tertawa sambil membaca buku bergambar di meja kelas"
                fill
                sizes="(min-width: 1152px) 520px, (min-width: 1024px) 46vw, 100vw"
                placeholder="blur"
                loading="eager"
                fetchPriority="high"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-12 sm:mt-16">
            <h2 className="sr-only">Keunggulan sekolah</h2>
            <HighlightStrip highlights={highlights} />
          </div>
        </Container>
      </section>

      <Section id="judul-tentang">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative aspect-4/3 overflow-hidden rounded-2xl bg-navy-100">
            <Image
              src={classroomPhoto}
              alt="Ruang kelas berwarna-warni dengan karpet huruf, meja kelompok, dan hiasan karya anak di dinding"
              fill
              sizes="(min-width: 1152px) 520px, (min-width: 1024px) 46vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading
              id="judul-tentang"
              eyebrow="Tentang kami"
              title="Belajar dengan gembira, berkarakter sejak dini"
              description={profile.vision}
            />
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8 sm:gap-6">
              {aboutStats.map((item) => (
                <div key={item.label} className="flex min-w-0 flex-col-reverse justify-end">
                  <dt className="mt-2 text-xs leading-snug text-muted sm:text-sm">{item.label}</dt>
                  <dd className="font-heading text-2xl font-bold leading-none tabular-nums text-navy-900 sm:text-3xl">{item.value}</dd>
                </div>
              ))}
            </dl>
            <TextLink href="/tentang" className="mt-8">
              Selengkapnya tentang kami
            </TextLink>
          </Reveal>
        </Container>
      </Section>

      <Section id="judul-program" tone="cream">
        <Container className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              id="judul-program"
              eyebrow="Program"
              title="Kelompok belajar sesuai usia"
              description="Setiap kelompok dirancang sesuai tahap tumbuh kembang anak."
            />
            <TextLink href="/program" className="mt-8">
              Lihat detail program
            </TextLink>
          </Reveal>
          <ProgramList programs={programs} />
        </Container>
      </Section>

      <Section id="judul-ppdb">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative aspect-4/3 overflow-hidden rounded-2xl bg-navy-100 lg:order-last">
            <Image
              src={classPhoto}
              alt="Foto bersama satu kelas: anak-anak berseragam biru tersenyum bersama para guru"
              fill
              sizes="(min-width: 1152px) 520px, (min-width: 1024px) 46vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading
              id="judul-ppdb"
              eyebrow={`PPDB ${ppdb.academicYear}`}
              title="Mulai petualangan si kecil bersama kami"
              description={ppdb.announcement}
            />

            <div className="mt-10 max-w-sm">
              <div className="mb-3 flex justify-between text-sm">
                <span className="text-muted">Kuota terisi</span>
                <span className="font-semibold tabular-nums text-navy-900">
                  {formatNumber(summary.totalAccepted)} / {formatNumber(summary.quota)}
                </span>
              </div>
              <ProgressBar value={summary.quotaFilledPercent} label="Persentase kuota terisi" />
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ButtonLink href="/ppdb" variant="gold" arrow>
                Daftar sekarang
              </ButtonLink>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-navy-900 underline-offset-4 hover:underline"
              >
                <ChatIcon className="size-4" />
                Tanya via WhatsApp
              </a>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="judul-kabar" tone="cream">
        <Container>
          <Reveal>
            <SectionHeading id="judul-kabar" eyebrow="Kabar sekolah" title="Pengumuman terbaru" />
          </Reveal>
          <div className="mt-12">
            <AnnouncementList announcements={announcements} />
          </div>
        </Container>
      </Section>
    </>
  );
}
