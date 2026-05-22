"use client";

import { NAV, SITE } from "@/lib/constants";
import { trackLogoClick } from "@/lib/analytics/gtm";
import { scrollToSection } from "@/lib/scroll";
import { NavLink } from "@/components/ui/nav-link";
import { Logo } from "@/components/ui/logo";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              trackLogoClick("footer");
              scrollToSection("#inicio");
            }}
            className="inline-flex shrink-0"
            aria-label="Ir al inicio"
          >
            <Logo className="h-12 md:h-14" />
          </button>
          <div>
            <p className="font-display text-foreground font-semibold">
              {SITE.name}
            </p>
            <p className="text-muted text-sm">{SITE.location}</p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-6">
          {NAV.map((item) => (
            <NavLink
              key={item.id}
              href={`#${item.id}`}
              gtmLocation="footer"
              className="text-muted hover:text-foreground text-sm transition-colors"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <p className="text-muted text-xs">
          © {year} {SITE.name}
        </p>
      </div>
    </footer>
  );
};
