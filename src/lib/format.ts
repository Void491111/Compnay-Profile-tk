/**
 * Fungsi format murni (pure). Tidak menyentuh React, data, maupun I/O —
 * supaya bisa dipakai di server dan client, dan mudah diuji.
 */

import type { FeePeriod } from "@/types";

const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
] as const;

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("id-ID");

export function formatRupiah(amount: number): string {
  return rupiahFormatter.format(amount);
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/** Mengubah nomor bulan 1–12 menjadi nama bulan Indonesia. */
export function formatMonthName(month: number): string {
  return MONTH_NAMES[month - 1] ?? "Bulan tidak valid";
}

export function formatMonthYear(month: number, year: number): string {
  return `${formatMonthName(month)} ${year}`;
}

/** Mengubah `YYYY-MM-DD` menjadi `4 Oktober 2026`. */
export function formatIsoDate(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Menggabungkan dua tanggal jadi satu rentang yang ringkas. */
export function formatDateRange(startIso: string, endIso: string): string {
  if (startIso === endIso) {
    return formatIsoDate(startIso);
  }

  return `${formatIsoDate(startIso)} – ${formatIsoDate(endIso)}`;
}

export function formatPercent(value: number): string {
  return `${value}%`;
}

const FEE_PERIOD_LABELS: Record<FeePeriod, string> = {
  sekali: "sekali bayar",
  bulanan: "per bulan",
  tahunan: "per tahun",
};

export function formatFeePeriod(period: FeePeriod): string {
  return FEE_PERIOD_LABELS[period];
}
