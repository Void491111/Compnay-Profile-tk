# Company Profile TK

Situs profil taman kanak-kanak: beranda, tentang, program, PPDB, laporan PPDB bulanan, galeri, dan kontak.

Dibangun dengan Next.js 16 (App Router), React 19, Tailwind CSS 4, dan TypeScript.

## Menjalankan

```bash
pnpm install
npm run dev     # atau: pnpm dev
```

Buka http://localhost:3000.

Perintah lain: `pnpm build`, `pnpm start`, `pnpm lint`.

> Proyek ini memakai **pnpm** (lihat `pnpm-lock.yaml`). Pasang paket dengan `pnpm add`, bukan `npm install`, supaya tidak muncul lockfile kedua.

## Struktur

```
src/
  app/           Halaman (satu folder per rute)
  components/    layout/ (header, footer), sections/ (kartu), ui/ (komponen dasar, ikon)
  config/site.ts Identitas sekolah, kontak, dan navigasi
  data/          Data dummy (profil, program, PPDB, laporan)
  services/      Akses data + perhitungan turunan (ringkasan laporan, statistik)
  lib/format.ts  Format rupiah, tanggal, bulan
  types/         Tipe domain terpusat
```

## Mengganti konten

- **Nama sekolah, alamat, telepon, WhatsApp, URL situs:** `src/config/site.ts`
- **Profil, program, fasilitas, galeri, pengumuman:** `src/data/school.ts`
- **Info PPDB dan laporan bulanan:** `src/data/ppdb.ts`. Laporan dengan `published: false` adalah draf dan tidak tampil di situs.
- **Foto:** simpan di `public/`, lalu ganti `PhotoPlaceholder` dengan `next/image` (lihat komentar di `src/components/ui/primitives.tsx`).

Laporan PPDB bersifat publik, jadi hanya memuat angka agregat, tanpa data pribadi anak.

## Deploy

Siap di-deploy ke Vercel: impor repo ini, pengaturan bawaan sudah cukup (pnpm terdeteksi otomatis). Setelah domain final ada, perbarui `url` di `src/config/site.ts`.
