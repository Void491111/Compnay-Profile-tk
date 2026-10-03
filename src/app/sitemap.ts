import type { MetadataRoute } from "next";
import { navItems, siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return navItems.map((item) => ({
    url: `${siteConfig.url}${item.href === "/" ? "" : item.href}`,
    changeFrequency: item.href === "/laporan" ? "monthly" : "weekly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}
