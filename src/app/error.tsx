"use client";

import { useEffect } from "react";
import { ButtonLink, Container, buttonClass } from "@/components/ui/primitives";

export default function ErrorPage({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-col items-start py-20 sm:py-28">
      <p className="text-sm font-semibold text-gold-600">Terjadi kendala</p>
      <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-navy-900">Halaman gagal dimuat</h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
        Maaf, ada gangguan saat menampilkan halaman ini. Coba muat ulang, atau kembali ke beranda.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className={buttonClass("primary")}
        >
          Coba lagi
        </button>
        <ButtonLink href="/" variant="outline">
          Ke beranda
        </ButtonLink>
      </div>
      {error.digest ? <p className="mt-6 text-xs text-muted">Kode: {error.digest}</p> : null}
    </Container>
  );
}
