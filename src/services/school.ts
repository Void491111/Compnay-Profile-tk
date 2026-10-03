/**
 * Akses data profil sekolah.
 *
 * Fungsinya async walau datanya masih statis, supaya halaman tidak perlu diubah
 * ketika sumber data pindah ke CMS atau database.
 */

import { announcements, facilities, galleryItems, highlights, programs, schoolProfile } from "@/data/school";
import type { Announcement, Facility, GalleryCategory, GalleryItem, Highlight, Program, SchoolProfile, SchoolStats } from "@/types";


export async function getSchoolProfile(): Promise<SchoolProfile> {
  return schoolProfile;
}

export async function getHighlights(): Promise<readonly Highlight[]> {
  return highlights;
}

export async function getSchoolStats(now = new Date()): Promise<SchoolStats> {
  const { foundedYear, studentCount, teacherCount } = schoolProfile;

  return {
    yearsRunning: now.getFullYear() - foundedYear,
    studentCount,
    teacherCount,
    studentsPerTeacher: teacherCount > 0 ? Math.round(studentCount / teacherCount) : 0,
  };
}

export async function getPrograms(): Promise<readonly Program[]> {
  return programs;
}

export async function getFacilities(): Promise<readonly Facility[]> {
  return facilities;
}

export async function getGalleryItems(category?: GalleryCategory): Promise<readonly GalleryItem[]> {
  if (!category) {
    return galleryItems;
  }

  return galleryItems.filter((item) => item.category === category);
}

/** Pengumuman terbaru lebih dulu. */
export async function getLatestAnnouncements(limit = 3): Promise<readonly Announcement[]> {
  return [...announcements]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}
