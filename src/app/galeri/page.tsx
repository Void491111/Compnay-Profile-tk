import type { Metadata } from "next";
import Link from "next/link";
import { GALLERY_CATEGORY_LABELS, GalleryGrid } from "@/components/sections/cards";
import { Container, PageHeader } from "@/components/ui/primitives";
import { getGalleryItems } from "@/services/school";
import type { GalleryCategory } from "@/types";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Dokumentasi kegiatan, fasilitas, dan prestasi murid.",
};

function parseCategory(value: string | string[] | undefined): GalleryCategory | undefined {
  return typeof value === "string" && Object.hasOwn(GALLERY_CATEGORY_LABELS, value)
    ? (value as GalleryCategory)
    : undefined;
}

export default async function GalleryPage({ searchParams }: PageProps<"/galeri">) {
  const category = parseCategory((await searchParams).kategori);
  const items = await getGalleryItems(category);

  const filters: { href: string; label: string; active: boolean }[] = [
    { href: "/galeri", label: "Semua", active: !category },
    ...(Object.keys(GALLERY_CATEGORY_LABELS) as GalleryCategory[]).map((key) => ({
      href: `/galeri?kategori=${key}`,
      label: GALLERY_CATEGORY_LABELS[key],
      active: category === key,
    })),
  ];

  return (
    <>
      <PageHeader eyebrow="Galeri" title="Keseharian di sekolah" description="Sekilas kegiatan, fasilitas, dan prestasi anak-anak." />

      <Container className="py-14">
        <nav aria-label="Filter kategori galeri">
          <ul className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <li key={filter.href}>
                <Link
                  href={filter.href}
                  aria-current={filter.active ? "page" : undefined}
                  className={`inline-block rounded-full px-4 py-2 font-bold transition-colors ${
                    filter.active ? "bg-navy-900 text-white" : "border border-line bg-white hover:bg-navy-50"
                  }`}
                >
                  {filter.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8">
          {items.length > 0 ? (
            <GalleryGrid items={items} />
          ) : (
            <p className="text-muted">Belum ada foto untuk kategori ini.</p>
          )}
        </div>
      </Container>
    </>
  );
}
