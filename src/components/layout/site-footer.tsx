import Link from "next/link";
import { ArrowRightIcon, ClockIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/primitives";
import { footerNavGroups, siteConfig } from "@/config/site";
import { getPpdbInfo } from "@/services/ppdb";

const LINK_CLASS =
  "bg-linear-to-r from-white to-white bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 text-sm text-white/70 transition-all duration-300 hover:bg-[length:100%_1px] hover:text-white";

export async function SiteFooter() {
  const ppdb = await getPpdbInfo();
  const { contact } = siteConfig;

  return (
    <footer className="mt-auto bg-navy-900 text-white/70">
      <Container className="grid lg:grid-cols-[1.7fr_1fr]">
        <div className="grid gap-8 py-10 sm:grid-cols-3 lg:py-12 lg:pr-10">
          {footerNavGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white">{group.title}</h2>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={LINK_CLASS}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Hubungi kami</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className={LINK_CLASS}>
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className={`break-all ${LINK_CLASS}`}>
                  {contact.email}
                </a>
              </li>
              <li className="text-sm leading-relaxed">{contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-10 lg:border-l lg:border-t-0 lg:py-12 lg:pl-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">PPDB {ppdb.academicYear}</h2>
          <p className="mt-3 font-semibold leading-snug text-white">
            Pendaftaran sudah dibuka. Tanyakan kuota dan jadwal kunjungan langsung ke panitia.
          </p>

          <a
            href={`https://wa.me/${ppdb.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 flex items-center justify-between gap-4 rounded-full border border-white/25 py-1 pl-5 pr-1 transition-colors hover:border-white/50 hover:bg-white/5"
          >
            <span className="text-sm text-white/80 group-hover:text-white">Chat panitia via WhatsApp</span>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold-400 text-navy-900 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none">
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </span>
          </a>

          <p className="mt-4 flex gap-2.5 text-xs leading-relaxed">
            <ClockIcon className="size-4 shrink-0 text-gold-400" />
            Dibalas pada jam operasional: {contact.operationalHours}.
          </p>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-5">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} {siteConfig.name}. {siteConfig.tagline}. Hak cipta dilindungi.
          </p>
        </Container>
      </div>
    </footer>
  );
}
