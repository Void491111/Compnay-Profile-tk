import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRightIcon, CameraIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/motion";
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
      <span className="relative font-heading text-lg font-bold text-gold-400">{siteConfig.initials}</span>
    </span>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link href="/" className="flex items-center gap-3 rounded-md">
      <Emblem />
      <span className="whitespace-nowrap leading-tight">
        <span className={`block font-heading text-lg font-bold uppercase sm:text-xl ${tone === "dark" ? "text-navy-900" : "text-white"}`}>
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
    <section className="border-b border-line bg-cream">
      <Container className="py-16 sm:py-20">
        <Reveal>
          {eyebrow ? <p className="text-sm font-semibold text-gold-600">{eyebrow}</p> : null}
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold leading-[1.1] tracking-tight text-navy-900 sm:text-5xl">
            {title}
          </h1>
          {description ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{description}</p> : null}
        </Reveal>
      </Container>
    </section>
  );
}

export function Section({
  id,
  label,
  tone = "white",
  className = "",
  children,
}: {
  id?: string;
  label?: string;
  tone?: "white" | "cream";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      aria-label={id ? undefined : label}
      className={`py-20 sm:py-28 ${tone === "cream" ? "bg-cream" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="text-sm font-semibold text-gold-600">{eyebrow}</p>
      ) : null}
      <h2 id={id} className={`${eyebrow ? "mt-3" : ""} font-heading text-3xl font-bold leading-tight tracking-tight text-navy-900 sm:text-4xl`}>
        {title}
      </h2>
      {description ? <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p> : null}
    </div>
  );
}

const BUTTON_VARIANTS = {
  primary: "bg-navy-900 text-white hover:bg-navy-700",
  outline: "border border-navy-900/20 text-navy-900 hover:border-navy-900/40 hover:bg-navy-50",
  gold: "bg-gold-400 text-navy-900 hover:bg-gold-400/85",
  onDark: "border border-white/50 text-white hover:bg-white/10",
} as const;

type ButtonVariant = keyof typeof BUTTON_VARIANTS;

export function buttonClass(variant: ButtonVariant = "primary", className = "") {
  return `group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold transition-colors duration-200 ${BUTTON_VARIANTS[variant]} ${className}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  arrow?: boolean;
};

export function ButtonLink({ variant = "primary", arrow = false, className = "", children, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={buttonClass(variant, className)}
      {...props}
    >
      {children}
      {arrow ? (
        <ArrowRightIcon className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
      ) : null}
    </Link>
  );
}

export function TextLink({ className = "", children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`group inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-navy-900 underline-offset-4 hover:underline ${className}`}
      {...props}
    >
      {children}
      <ArrowRightIcon className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
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
    <div className="border-t border-line pt-6">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-2 font-heading text-4xl font-bold tabular-nums text-navy-900">{value}</dd>
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
      className={`relative grid place-items-center overflow-hidden bg-navy-50 ${className}`}
    >
      <span aria-hidden="true" className="flex flex-col items-center gap-1.5 text-navy-500/60">
        <CameraIcon className="size-8" />
        <span className="text-xs font-semibold">Foto menyusul</span>
      </span>
    </div>
  );
}
