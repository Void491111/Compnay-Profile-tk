import Link from "next/link";
import { ArrowRightIcon, ClockIcon } from "@/components/ui/icons";
import { Container, Logo } from "@/components/ui/primitives";
import { footerNavGroups, siteConfig } from "@/config/site";
import { getPpdbInfo } from "@/services/ppdb";

const LINK_CLASS =
  "bg-linear-to-r from-white to-white bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 text-white/70 transition-all duration-300 hover:bg-[length:100%_1px] hover:text-white";

/**
 * Tata letak mengikuti referensi footer: kolom tautan di kiri, panel ajakan
 * terpisah garis vertikal di kanan, lalu bar copyright di bawah.
 */
export async function SiteFooter() {
  const ppdb = await getPpdbInfo();
  const { contact } = siteConfig;

  return (
    <footer className="mt-auto bg-navy-900 text-white/70">
      <Container className="grid lg:grid-cols-[1.7fr_1fr]">
        <div className="grid gap-10 py-14 sm:grid-cols-3 lg:py-20 lg:pr-12">
          {footerNavGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-lg font-semibold text-white">{group.title}</h2>
              <ul className="mt-6 space-y-3.5">
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
            <h2 className="text-lg font-semibold text-white">Hubungi kami</h2>
            <ul className="mt-6 space-y-3.5">
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
              <li className="leading-relaxed">{contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-14 lg:border-l lg:border-t-0 lg:py-20 lg:pl-14">
          <h2 className="text-lg font-semibold uppercase tracking-wide text-white">PPDB {ppdb.academicYear}</h2>
          <p className="mt-4 text-xl font-semibold leading-snug text-white">
            Pendaftaran sudah dibuka. Tanyakan kuota dan jadwal kunjungan langsung ke panitia.
          </p>

          <a
            href={`https://wa.me/${ppdb.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 flex items-center justify-between gap-4 rounded-full border border-white/25 py-1.5 pl-6 pr-1.5 transition-colors hover:border-white/50 hover:bg-white/5"
          >
            <span className="text-white/80 group-hover:text-white">Chat panitia via WhatsApp</span>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gold-400 text-navy-900 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none">
              <ArrowRightIcon className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </span>
          </a>

          <p className="mt-6 flex gap-3 text-sm leading-relaxed">
            <ClockIcon className="size-5 shrink-0 text-gold-400" />
            Dibalas pada jam operasional: {contact.operationalHours}.
          </p>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col-reverse gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-xs leading-relaxed text-white/60">
            © {new Date().getFullYear()} {siteConfig.name}. {siteConfig.tagline}. Hak cipta dilindungi.
          </p>
          <Logo tone="light" />
        </Container>
      </div>
    </footer>
  );
}
