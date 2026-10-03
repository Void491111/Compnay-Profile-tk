"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChatIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { ButtonLink, Container, Logo } from "@/components/ui/primitives";
import { navItems, siteConfig, whatsappUrl } from "@/config/site";

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function TopBar() {
  const { contact } = siteConfig;

  return (
    <div className="hidden bg-navy-900 text-xs text-white/80 md:block">
      <Container className="flex h-10 items-center justify-between gap-6">
        <ul className="flex items-center gap-6">
          <li className="flex items-center gap-2">
            <MapPinIcon className="size-4 text-gold-400" />
            {contact.address}
          </li>
          <li className="flex items-center gap-2">
            <PhoneIcon className="size-4 text-gold-400" />
            {contact.phone}
          </li>
          <li className="hidden items-center gap-2 lg:flex">
            <MailIcon className="size-4 text-gold-400" />
            <a href={`mailto:${contact.email}`} className="hover:text-white">
              {contact.email}
            </a>
          </li>
        </ul>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-semibold hover:text-white"
        >
          <ChatIcon className="size-4 text-gold-400" />
          WhatsApp
        </a>
      </Container>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 shadow-sm">
      <TopBar />

      <div className="bg-white">
        <Container className="flex h-20 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Navigasi utama" className="hidden xl:block">
            <ul className="flex items-center gap-7">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`border-b-2 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                        active
                          ? "border-gold-400 text-navy-900"
                          : "border-transparent text-ink/80 hover:text-navy-900"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* Dibungkus agar `hidden` tidak bentrok dengan `inline-flex` milik ButtonLink. */}
            <div className="hidden sm:block">
              <ButtonLink href="/ppdb" variant="gold">
                Daftar sekarang
              </ButtonLink>
            </div>
            <button
              type="button"
              className="rounded-md border border-line px-4 py-2 text-xs font-bold uppercase tracking-wider xl:hidden"
              aria-expanded={menuOpen}
              aria-controls="menu-seluler"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? "Tutup" : "Menu"}
            </button>
          </div>
        </Container>

        <nav id="menu-seluler" aria-label="Navigasi utama" hidden={!menuOpen} className="border-t border-line xl:hidden">
          <Container className="py-3">
            <ul className="flex flex-col">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={`block border-l-4 px-3 py-2.5 font-bold ${
                        active ? "border-gold-400 bg-navy-50 text-navy-900" : "border-transparent hover:bg-navy-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-3 sm:hidden">
                <ButtonLink href="/ppdb" variant="gold" className="w-full" onClick={() => setMenuOpen(false)}>
                  Daftar sekarang
                </ButtonLink>
              </li>
            </ul>
          </Container>
        </nav>
      </div>
    </header>
  );
}
