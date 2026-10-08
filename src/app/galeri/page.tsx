import type { Metadata } from "next";
import { connection } from "next/server";
import { GalleryBrowser } from "@/components/sections/gallery-browser";
import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { getGalleryItems } from "@/services/school";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Dokumentasi kegiatan, fasilitas, dan prestasi murid.",
};

export default async function GalleryPage() {
  await connection();
  const items = await getGalleryItems();

  return (
    <>
      <PageHeader eyebrow="Galeri" title="Keseharian di sekolah" description="Sekilas kegiatan, fasilitas, dan prestasi anak-anak." />

      <Section label="Foto sekolah">
        <Container>
          <GalleryBrowser items={items} />
        </Container>
      </Section>
    </>
  );
}
