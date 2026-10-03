import type { Metadata } from "next";
import { FacilityGrid } from "@/components/sections/cards";
import { Container, PageHeader, SectionHeading } from "@/components/ui/primitives";
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

      <Container className="grid gap-10 py-14 md:grid-cols-[1fr_1.4fr]">
        <figure className="rounded-xl bg-gold-100 p-8">
          <blockquote className="font-serif text-2xl leading-snug text-navy-900">“{profile.headmaster.greeting}”</blockquote>
          <figcaption className="mt-6">
            <span className="block font-bold text-navy-900">{profile.headmaster.name}</span>
            <span className="text-muted">{profile.headmaster.title}</span>
          </figcaption>
        </figure>

        <div className="space-y-10">
          <section aria-labelledby="judul-sejarah">
            <SectionHeading id="judul-sejarah" eyebrow="Sejarah" title="Tumbuh bersama warga sekitar" />
            <p className="mt-4 leading-relaxed text-muted">{profile.history}</p>
          </section>

          <section aria-labelledby="judul-visi">
            <SectionHeading id="judul-visi" eyebrow="Visi" title="Ke mana kami melangkah" />
            <p className="mt-4 text-lg font-semibold leading-relaxed">{profile.vision}</p>
          </section>

          <section aria-labelledby="judul-misi">
            <SectionHeading id="judul-misi" eyebrow="Misi" title="Cara kami mewujudkannya" />
            <ol className="mt-4 space-y-3">
              {profile.missions.map((mission, index) => (
                <li key={mission} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-navy-900 font-bold text-gold-400"
                  >
                    {index + 1}
                  </span>
                  <span className="pt-1 text-muted">{mission}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </Container>

      <section aria-labelledby="judul-fasilitas" className="pb-6">
        <Container>
          <SectionHeading id="judul-fasilitas" eyebrow="Fasilitas" title="Sarana belajar dan bermain" />
          <div className="mt-8">
            <FacilityGrid facilities={facilities} />
          </div>
        </Container>
      </section>
    </>
  );
}
