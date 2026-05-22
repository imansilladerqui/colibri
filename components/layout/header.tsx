"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV } from "@/lib/constants";
import {
  trackCtaClick,
  trackLogoClick,
  trackMenuToggle,
} from "@/lib/analytics/gtm";
import { scrollToSection } from "@/lib/scroll";
import { Logo } from "@/components/ui/logo";
import { NavLink } from "@/components/ui/nav-link";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="glass fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <button
          type="button"
          onClick={() => {
            trackLogoClick("header");
            scrollToSection("#inicio");
          }}
          className="inline-flex shrink-0"
          aria-label="Ir al inicio"
        >
          <Logo className="h-12 md:h-14" />
        </button>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Principal"
        >
          {NAV.map((item) => (
            <NavLink
              key={item.id}
              href={`#${item.id}`}
              gtmLocation="header"
              className="text-muted hover:text-foreground text-sm transition-colors"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            onClick={() => {
              trackCtaClick({
                ctaName: "Iniciar proyecto",
                location: "header",
                destination: "#contacto",
              });
              scrollToSection("#contacto");
            }}
            size="sm"
          >
            Iniciar proyecto
          </Button>
        </div>

        <button
          type="button"
          className="border-border flex h-10 w-10 items-center justify-center rounded-lg border md:hidden"
          onClick={() => {
            const next = !open;
            trackMenuToggle(next);
            setOpen(next);
          }}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-border border-t px-6 py-4 md:hidden"
          aria-label="Menú móvil"
        >
          <ul className="flex flex-col gap-4">
            {NAV.map((item) => (
              <li key={item.id}>
                <NavLink
                  href={`#${item.id}`}
                  gtmLocation="header_mobile"
                  onNavigate={() => setOpen(false)}
                  className="text-muted hover:text-foreground block text-lg"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Button
                className="w-full"
                onClick={() => {
                  trackCtaClick({
                    ctaName: "Iniciar proyecto",
                    location: "header_mobile",
                    destination: "#contacto",
                  });
                  scrollToSection("#contacto");
                  setOpen(false);
                }}
              >
                Iniciar proyecto
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
