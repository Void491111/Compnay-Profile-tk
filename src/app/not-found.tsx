import { ButtonLink, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start py-20 sm:py-28">
      <p className="text-sm font-semibold text-gold-600">404</p>
      <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-navy-900">Halaman tidak ditemukan</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">Mungkin alamatnya salah ketik, atau halamannya sudah dipindahkan.</p>
      <ButtonLink href="/" className="mt-10">Kembali ke beranda</ButtonLink>
    </Container>
  );
}
