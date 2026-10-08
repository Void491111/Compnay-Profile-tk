import { ButtonLink, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start gap-4 py-24">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">404</p>
      <h1 className="font-heading text-4xl font-bold tracking-tight text-navy-900">Halaman tidak ditemukan</h1>
      <p className="text-muted">Mungkin alamatnya salah ketik, atau halamannya sudah dipindahkan.</p>
      <ButtonLink href="/">Kembali ke beranda</ButtonLink>
    </Container>
  );
}
