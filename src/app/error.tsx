"use client";

import { useEffect } from "react";
import { ButtonLink, Container } from "@/components/ui/primitives";

/**
 * Tampil bila sebuah halaman gagal dirender. Header dan footer tetap tampil
 * karena berada di root layout, di luar error boundary ini.
 */
export default function ErrorPage({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-col items-start gap-4 py-24">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">Terjadi kendala</p>
      <h1 className="font-serif text-4xl text-navy-900">Halaman gagal dimuat</h1>
      <p className="max-w-xl text-muted">
        Maaf, ada gangguan saat menampilkan halaman ini. Coba muat ulang, atau kembali ke beranda.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="inline-flex items-center justify-center rounded-md bg-navy-900 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-navy-700"
        >
          Coba lagi
        </button>
        <ButtonLink href="/" variant="outline">
          Ke beranda
        </ButtonLink>
      </div>
      {error.digest ? <p className="text-xs text-muted">Kode: {error.digest}</p> : null}
    </Container>
  );
}
