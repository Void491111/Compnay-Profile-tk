"use client";

import type { MouseEvent } from "react";

export interface FilterOption {
  readonly key: string;
  readonly label: string;
  readonly href: string;
}

export function FilterPills({
  label,
  options,
  activeKey,
}: {
  label: string;
  options: readonly FilterOption[];
  activeKey: string;
}) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    window.history.pushState(null, "", href);
  }

  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option.key === activeKey;
          return (
            <li key={option.key}>
              <a
                href={option.href}
                onClick={(event) => handleClick(event, option.href)}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold transition-colors duration-200 ${
                  active ? "bg-navy-900 text-white" : "border border-line text-navy-900 hover:border-navy-900/40"
                }`}
              >
                {option.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
