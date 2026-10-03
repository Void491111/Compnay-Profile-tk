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
                className={`inline-block rounded-full px-4 py-2 font-bold transition-colors ${
                  active ? "bg-navy-900 text-white" : "border border-line bg-white hover:bg-navy-50"
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
