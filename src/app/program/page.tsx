import type { Metadata } from "next";
import { ProgramDetail } from "@/components/sections/cards";
import { Reveal } from "@/components/ui/motion";
import { ButtonLink, Container, PageHeader, Section, SectionHeading } from "@/components/ui/primitives";
import { getPrograms } from "@/services/school";

export const metadata: Metadata = {
  title: "Program",
  description: "Kelompok Bermain, TK A, dan TK B — pembelajaran berbasis bermain sesuai usia anak.",
};

export default async function ProgramPage() {
  const programs = await getPrograms();

  return (
    <>
      <PageHeader
        eyebrow="Program"
        title="Program pembelajaran"
        description="Setiap kelompok dirancang sesuai tahap perkembangan anak, dengan rasio guru dan murid yang kecil."
      />

      <Section label="Daftar program">
        <Container>
          <div className="divide-y divide-line">
            {programs.map((program) => (
              <Reveal key={program.id} className="py-12 first:pt-0 last:pb-0">
                <ProgramDetail program={program} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="judul-bantuan" tone="cream">
        <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              id="judul-bantuan"
              title="Bingung memilih kelompok yang tepat?"
              description="Usia anak per 1 Juli tahun ajaran baru menjadi acuan penempatan."
            />
          </Reveal>
          <ButtonLink href="/ppdb" arrow className="shrink-0">
            Lihat syarat PPDB
          </ButtonLink>
        </Container>
      </Section>
    </>
  );
}
