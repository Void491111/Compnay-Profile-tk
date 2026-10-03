"use client";

import { useSearchParams } from "next/navigation";
import { GALLERY_CATEGORY_LABELS, GalleryGrid } from "@/components/sections/cards";
import { FilterPills, type FilterOption } from "@/components/ui/filter-pills";
import type { GalleryCategory, GalleryItem } from "@/types";

const ALL = "semua";

const OPTIONS: readonly FilterOption[] = [
  { key: ALL, label: "Semua", href: "/galeri" },
  ...(Object.keys(GALLERY_CATEGORY_LABELS) as GalleryCategory[]).map((key) => ({
    key,
    label: GALLERY_CATEGORY_LABELS[key],
    href: `/galeri?kategori=${key}`,
  })),
];

function parseCategory(value: string | null): GalleryCategory | null {
  return value !== null && Object.hasOwn(GALLERY_CATEGORY_LABELS, value) ? (value as GalleryCategory) : null;
}

export function GalleryBrowser({ items }: { items: readonly GalleryItem[] }) {
  const category = parseCategory(useSearchParams().get("kategori"));
  const visible = category ? items.filter((item) => item.category === category) : items;

  return (
    <>
      <FilterPills label="Filter kategori galeri" options={OPTIONS} activeKey={category ?? ALL} />
      <div className="mt-8 [overflow-anchor:none]">
        {visible.length > 0 ? (
          <GalleryGrid items={visible} />
        ) : (
          <p className="text-muted">Belum ada foto untuk kategori ini.</p>
        )}
      </div>
    </>
  );
}
