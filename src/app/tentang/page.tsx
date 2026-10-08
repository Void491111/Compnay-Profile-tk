import type { Metadata } from "next";
import { FacilityList } from "@/components/sections/cards";
import { Reveal } from "@/components/ui/motion";
import { Container, PageHeader, Section, SectionHeading } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";
import { getFacilities, getSchoolProfile } from "@/services/school";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: `Visi, misi, sejarah, dan fasilitas ${siteConfig.name}.`,
};

export default async function AboutPage() {
  const [profile, facilities] = await Promise.all([getSchoolProfile(), getFacilities()]);

  return (
    <>
      <PageHeader
        eyebrow="Tentang kami"
        title="Mengenal sekolah kami"
        description={`Mengenal ${siteConfig.name} lebih dekat: sejak ${profile.foundedYear}, terakreditasi ${profile.accreditation}.`}
      />

      <Section id="judul-sambutan">
        <Container className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <Reveal>
            <SectionHeading id="judul-sambutan" eyebrow="Sambutan" title="Dari kepala sekolah" />
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="border-l-2 border-gold-400 pl-6 sm:pl-8">
              <blockquote className="font-heading text-2xl font-medium leading-snug text-navy-900">
                “{profile.headmaster.greeting}”
              </blockquote>
              <figcaption className="mt-6">
                <span className="block font-semibold text-navy-900">{profile.headmaster.name}</span>
                <span className="text-sm text-muted">{profile.headmaster.title}</span>
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>

      <Section label="Sejarah dan visi" tone="cream">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="Sejarah" title="Tumbuh bersama warga sekitar" />
            <p className="mt-4 text-lg leading-relaxed text-muted">{profile.history}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Visi" title="Ke mana kami melangkah" />
            <p className="mt-4 text-lg font-medium leading-relaxed text-navy-900">{profile.vision}</p>
          </Reveal>
        </Container>
      </Section>

      <Section id="judul-misi">
        <Container className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <Reveal>
            <SectionHeading id="judul-misi" eyebrow="Misi" title="Cara kami mewujudkannya" />
          </Reveal>
          <ol className="divide-y divide-line border-y border-line">
            {profile.missions.map((mission, index) => (
              <Reveal as="li" key={mission} delay={index * 0.05} className="flex gap-6 py-5">
                <span aria-hidden="true" className="w-6 shrink-0 font-heading font-bold tabular-nums text-gold-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed text-ink">{mission}</span>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section id="judul-fasilitas" tone="cream">
        <Container>
          <Reveal>
            <SectionHeading id="judul-fasilitas" eyebrow="Fasilitas" title="Sarana belajar dan bermain" />
          </Reveal>
          <div className="mt-12">
            <FacilityList facilities={facilities} />
          </div>
        </Container>
      </Section>
    </>
  );
}
