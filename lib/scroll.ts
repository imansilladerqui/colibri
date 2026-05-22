import { trackNavigationClick, type GtmLocation } from "@/lib/analytics/gtm";

export const scrollToSection = (
  hash: string,
  options?: { linkText?: string; location?: GtmLocation },
) => {
  const id = hash.replace(/^#/, "");

  if (options?.location) {
    trackNavigationClick({
      linkText: options.linkText ?? hash,
      linkUrl: hash,
      location: options.location,
    });
  }

  if (!id) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  const headerOffset = 72;
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({ top, behavior: "smooth" });

  if (typeof window !== "undefined") {
    window.history.replaceState(null, "", `#${id}`);
  }
};
