import type { Announcement, Facility, GalleryItem, Highlight, Program, SchoolProfile } from "@/types";

export const schoolProfile: SchoolProfile = {
  vision:
    "Menjadi taman kanak-kanak yang melahirkan anak ceria, mandiri, dan berakhlak baik " +
    "melalui pengalaman bermain yang bermakna.",
  missions: [
    "Menyelenggarakan pembelajaran berbasis bermain yang sesuai tahap tumbuh kembang anak.",
    "Menanamkan pembiasaan karakter: santun, jujur, peduli, dan bertanggung jawab.",
    "Mengembangkan kemampuan bahasa, motorik, sosial, dan kreativitas secara seimbang.",
    "Menjalin kemitraan yang hangat dengan orang tua dalam mendampingi anak.",
    "Menyediakan lingkungan belajar yang aman, bersih, dan menyenangkan.",
  ],
  history:
    "Berawal dari kelompok bermain kecil di ruang tamu salah satu pendiri, sekolah ini " +
    "tumbuh bersama warga sekitar. Kini kami menempati gedung sendiri dengan halaman " +
    "bermain yang luas, tetapi semangatnya tetap sama: setiap anak dikenal namanya, " +
    "didengar ceritanya, dan dirayakan kemajuannya.",
  foundedYear: 2009,
  accreditation: "A (Unggul)",
  studentCount: 118,
  teacherCount: 12,
  headmaster: {
    name: "Ibu Siti Rahmawati, S.Pd.",
    title: "Kepala Sekolah",
    greeting:
      "Selamat datang. Kami percaya masa kanak-kanak adalah waktu terbaik untuk " +
      "bermain, bertanya, dan mencoba. Tugas kami adalah menyiapkan ruang yang aman " +
      "agar rasa ingin tahu itu tumbuh, sambil terus bergandeng tangan dengan Ayah dan Bunda.",
  },
};

export const highlights: readonly Highlight[] = [
  { id: "h1", title: "Belajar lewat bermain", icon: "puzzle" },
  { id: "h2", title: "Guru terlatih", icon: "teacher" },
  { id: "h3", title: "Karakter sejak dini", icon: "heart" },
  { id: "h4", title: "Dekat dengan alam", icon: "leaf" },
  { id: "h5", title: "Aman & nyaman", icon: "shield" },
];

export const programs: readonly Program[] = [
  {
    id: "kb",
    name: "Kelompok Bermain",
    ageRange: "3–4 tahun",
    description: "Mengenal sekolah lewat bermain, bernyanyi, dan bercerita.",
    schedule: "Senin – Kamis, 08.00 – 10.30",
    capacity: 15,
    highlights: ["Bermain sensorik", "Toilet training", "Musik dan gerak"],
  },
  {
    id: "tk-a",
    name: "TK A",
    ageRange: "4–5 tahun",
    description: "Belajar tematik lewat proyek kecil dan eksplorasi alam.",
    schedule: "Senin – Jumat, 07.30 – 11.00",
    capacity: 20,
    highlights: ["Proyek tematik", "Berkebun", "Pra-membaca lewat cerita"],
  },
  {
    id: "tk-b",
    name: "TK B",
    ageRange: "5–6 tahun",
    description: "Siap masuk SD dengan percaya diri dan mandiri.",
    schedule: "Senin – Jumat, 07.30 – 11.30",
    capacity: 20,
    highlights: ["Kesiapan sekolah", "Pentas kelas", "Kunjungan edukatif"],
  },
];

export const facilities: readonly Facility[] = [
  {
    id: "kelas",
    name: "Ruang kelas ceria",
    description: "Kelas berpendingin udara dengan sudut baca, balok, dan seni.",
    icon: "classroom",
  },
  {
    id: "bermain",
    name: "Halaman bermain",
    description: "Area luar berlantai lembut dengan ayunan, perosotan, dan bak pasir.",
    icon: "playground",
  },
  {
    id: "perpustakaan",
    name: "Pojok perpustakaan",
    description: "Ratusan buku cerita bergambar yang bisa dipinjam pulang tiap pekan.",
    icon: "library",
  },
  {
    id: "uks",
    name: "UKS",
    description: "Pemeriksaan kesehatan berkala bekerja sama dengan puskesmas setempat.",
    icon: "health",
  },
  {
    id: "antar-jemput",
    name: "Antar jemput",
    description: "Layanan antar jemput opsional untuk area sekitar sekolah.",
    icon: "transport",
  },
  {
    id: "ibadah",
    name: "Ruang ibadah",
    description: "Ruang untuk pembiasaan doa harian dan kegiatan keagamaan.",
    icon: "worship",
  },
];

export const galleryItems: readonly GalleryItem[] = [
  { id: "g1", title: "Hari pertama sekolah", category: "kegiatan", alt: "Anak-anak berbaris di depan kelas sambil melambaikan tangan pada hari pertama sekolah" },
  { id: "g2", title: "Panen sayur di kebun", category: "kegiatan", alt: "Murid TK A memegang wortel hasil panen dari kebun sekolah" },
  { id: "g3", title: "Pentas akhir tahun", category: "kegiatan", alt: "Murid TK B menari di panggung dengan kostum warna-warni" },
  { id: "g4", title: "Kunjungan ke pemadam kebakaran", category: "kegiatan", alt: "Anak-anak melihat mobil pemadam kebakaran bersama petugas" },
  { id: "g5", title: "Ruang kelas", category: "fasilitas", alt: "Ruang kelas dengan meja kecil, rak buku, dan hasil karya anak di dinding" },
  { id: "g6", title: "Halaman bermain", category: "fasilitas", alt: "Halaman bermain dengan ayunan, perosotan, dan bak pasir" },
  { id: "g7", title: "Pojok baca", category: "fasilitas", alt: "Sudut baca berkarpet dengan bantal dan rak buku cerita bergambar" },
  { id: "g8", title: "Juara 1 lomba mewarnai", category: "prestasi", alt: "Seorang murid memegang piala lomba mewarnai tingkat kecamatan" },
  { id: "g9", title: "Lomba kolase tingkat kota", category: "prestasi", alt: "Tiga murid berfoto bersama karya kolase dan medali" },
];

export const announcements: readonly Announcement[] = [
  {
    id: "a1",
    title: "Pendaftaran murid baru 2027/2028 dibuka",
    excerpt: "Gelombang pertama dibuka hingga akhir Desember. Kuota terbatas untuk setiap kelompok.",
    publishedAt: "2026-09-01",
  },
  {
    id: "a2",
    title: "Open house dan trial class",
    excerpt: "Ajak si kecil mencoba satu hari belajar bersama kami. Daftar lewat WhatsApp.",
    publishedAt: "2026-09-15",
  },
  {
    id: "a3",
    title: "Libur Maulid Nabi",
    excerpt: "Kegiatan belajar diliburkan sesuai kalender pendidikan, masuk kembali keesokan harinya.",
    publishedAt: "2026-08-20",
  },
];
