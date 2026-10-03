/**
 * Ikon SVG inline (gaya garis, 24×24). Dekoratif — selalu `aria-hidden`, jadi
 * teks di sebelahnya yang membawa makna.
 */

import type { ReactNode } from "react";
import type { FacilityIcon as FacilityIconName, HighlightIcon as HighlightIconName } from "@/types";

function Svg({ className = "size-6", children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

const FACILITY_PATHS: Record<FacilityIconName, ReactNode> = {
  classroom: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M7 20h10M12 16v4M7 9h5" />
    </>
  ),
  playground: (
    <>
      <path d="M4 20V6l8-3 8 3v14" />
      <path d="M8 20v-6h8v6M4 10h16" />
    </>
  ),
  library: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h5v17H6a2 2 0 0 0-2 2z" />
      <path d="M20 5a2 2 0 0 0-2-2h-5v17h5a2 2 0 0 1 2 2z" />
    </>
  ),
  health: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  transport: (
    <>
      <rect x="3" y="5" width="18" height="11" rx="2" />
      <path d="M3 11h18M7 19a1.5 1.5 0 1 0 0-.01M17 19a1.5 1.5 0 1 0 0-.01" />
    </>
  ),
  worship: (
    <>
      <path d="M12 3c2 2 3 4 3 6H9c0-2 1-4 3-6z" />
      <path d="M5 21V12h14v9M10 21v-4a2 2 0 0 1 4 0v4" />
    </>
  ),
};

export function FacilityIcon({ name, className }: { name: FacilityIconName; className?: string }) {
  return <Svg className={className}>{FACILITY_PATHS[name]}</Svg>;
}

const HIGHLIGHT_PATHS: Record<HighlightIconName, ReactNode> = {
  puzzle: (
    <path d="M9 3h4v2.5a1.5 1.5 0 0 0 3 0V3h3a2 2 0 0 1 2 2v4h-2.5a1.5 1.5 0 0 0 0 3H21v7a2 2 0 0 1-2 2h-6v-2.5a1.5 1.5 0 0 0-3 0V21H5a2 2 0 0 1-2-2v-6h2.5a1.5 1.5 0 0 0 0-3H3V5a2 2 0 0 1 2-2z" />
  ),
  teacher: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 20v-1a6 6 0 0 1 12 0v1M15 4h6v6h-4" />
    </>
  ),
  heart: <path d="M12 20s-7-4.5-9-9a4.5 4.5 0 0 1 9-2 4.5 4.5 0 0 1 9 2c-2 4.5-9 9-9 9z" />,
  leaf: (
    <>
      <path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z" />
      <path d="M5 19 13 11" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
};

export function HighlightIcon({ name, className }: { name: HighlightIconName; className?: string }) {
  return <Svg className={className}>{HIGHLIGHT_PATHS[name]}</Svg>;
}

export function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function CameraIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
      <circle cx="12" cy="13" r="3.5" />
    </Svg>
  );
}

export function UsersIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20v-1a6 6 0 0 1 12 0v1M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5v1" />
    </Svg>
  );
}

export function AwardIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="9" r="6" />
      <path d="m9 14.5-1.5 6.5 4.5-2.5 4.5 2.5-1.5-6.5" />
    </Svg>
  );
}

export function CalendarIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </Svg>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </Svg>
  );
}

export function MailIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </Svg>
  );
}

export function MapPinIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </Svg>
  );
}

export function ClockIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Svg>
  );
}

export function ChatIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M4 20l1.5-4A8 8 0 1 1 9 19.5z" />
    </Svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="m5 12 4 4 10-10" />
    </Svg>
  );
}
