import type { Metadata } from "next";
import { ProgramCard } from "@/components/sections/cards";
import { ButtonLink, Container, PageHeader } from "@/components/ui/primitives";
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

      <Container className="py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-xl bg-navy-50 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-navy-900">Bingung memilih kelompok yang tepat?</h2>
            <p className="mt-1 text-muted">Usia anak per 1 Juli tahun ajaran baru menjadi acuan penempatan.</p>
          </div>
          <ButtonLink href="/ppdb" arrow>
            Lihat syarat PPDB
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
