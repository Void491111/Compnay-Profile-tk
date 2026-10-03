import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRightIcon, CameraIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import type { PpdbStatus } from "@/types";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

function Emblem() {
  return (
    <span aria-hidden="true" className="relative grid h-12 w-11 shrink-0 place-items-center">
      <svg viewBox="0 0 44 48" className="absolute inset-0 size-full">
        <path
          d="M22 2 40 8v14c0 12-8 20-18 24C12 42 4 34 4 22V8z"
          className="fill-navy-900 stroke-gold-400"
          strokeWidth="2.5"
        />
      </svg>
      <span className="relative font-serif text-lg text-gold-400">{siteConfig.initials}</span>
    </span>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link href="/" className="flex items-center gap-3 rounded-md">
      <Emblem />
      <span className="whitespace-nowrap leading-tight">
        <span className={`block font-serif text-lg uppercase sm:text-xl ${tone === "dark" ? "text-navy-900" : "text-white"}`}>
          TK {siteConfig.shortName}
        </span>
        <span
          className={`block text-[0.65rem] font-semibold uppercase tracking-[0.18em] ${
            tone === "dark" ? "text-muted" : "text-white/70"
          }`}
        >
          Taman Kanak-kanak
        </span>
      </span>
    </Link>
  );
}

export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <section className="bg-navy-900 text-white">
      <Container className="py-14 sm:py-20">
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 max-w-3xl font-serif text-4xl sm:text-5xl">{title}</h1>
        {description ? <p className="mt-4 max-w-2xl text-lg text-white/75">{description}</p> : null}
      </Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  id,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  id?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">{eyebrow}</p>
      ) : null}
      <h2 id={id} className="mt-2 font-serif text-3xl leading-tight text-navy-900 sm:text-4xl">
        {title}
        {accent ? <span className="block text-gold-500">{accent}</span> : null}
      </h2>
      {description ? <p className="mt-3 text-muted">{description}</p> : null}
    </div>
  );
}

const BUTTON_VARIANTS = {
  primary: "bg-navy-900 text-white hover:bg-navy-700",
  outline: "border border-navy-900 text-navy-900 hover:bg-navy-50",
  gold: "bg-gold-400 text-navy-900 hover:bg-gold-400/85",
  onDark: "border border-white/50 text-white hover:bg-white/10",
} as const;

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof BUTTON_VARIANTS;
  arrow?: boolean;
};

export function ButtonLink({ variant = "primary", arrow = false, className = "", children, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center gap-2.5 rounded-md px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${BUTTON_VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
      {arrow ? <ArrowRightIcon className="size-4" /> : null}
    </Link>
  );
}

const PPDB_STATUS = {
  buka: { label: "Pendaftaran dibuka", className: "bg-emerald-100 text-emerald-800" },
  segera: { label: "Segera dibuka", className: "bg-amber-100 text-amber-800" },
  tutup: { label: "Pendaftaran ditutup", className: "bg-rose-100 text-rose-800" },
} as const satisfies Record<PpdbStatus, { label: string; className: string }>;

export function PpdbStatusBadge({ status }: { status: PpdbStatus }) {
  const { label, className } = PPDB_STATUS[status];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      <span aria-hidden="true" className="size-2 rounded-full bg-current" />
      {label}
    </span>
  );
}

export function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <dt className="text-sm font-semibold text-muted">{label}</dt>
      <dd className="mt-1 font-serif text-4xl text-navy-900">{value}</dd>
      {hint ? <dd className="mt-1 text-sm text-muted">{hint}</dd> : null}
    </div>
  );
}

export function ProgressBar({ value, label }: { value: number; label: string }) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      className="h-2.5 overflow-hidden rounded-full bg-navy-100"
    >
      <div className="h-full rounded-full bg-gold-400" style={{ width: `${value}%` }} />
    </div>
  );
}

export function PhotoPlaceholder({ alt, className = "" }: { alt: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative grid place-items-center overflow-hidden bg-linear-to-br from-navy-100 via-cream to-gold-100 ${className}`}
    >
      <span aria-hidden="true" className="absolute -right-8 -top-8 size-32 rounded-full bg-gold-400/20" />
      <span aria-hidden="true" className="absolute -bottom-10 -left-6 size-28 rounded-full bg-navy-500/10" />
      <span aria-hidden="true" className="relative flex flex-col items-center gap-1.5 text-navy-500/60">
        <CameraIcon className="size-8" />
        <span className="text-xs font-semibold">Foto menyusul</span>
      </span>
    </div>
  );
}
