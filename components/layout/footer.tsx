import { NAV, SITE } from "@/lib/constants";
import { NavLink } from "@/components/ui/nav-link";
import { Logo } from "@/components/ui/logo";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Logo className="h-12 md:h-14" />
          <div>
            <p className="font-display font-semibold text-foreground">
              {SITE.name}
            </p>
            <p className="text-sm text-muted">{SITE.location}</p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-6">
          {NAV.map((item) => (
            <NavLink
              key={item.id}
              href={`#${item.id}`}
              gtmLocation="footer"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <p className="text-xs text-muted">© {year} {SITE.name}</p>
      </div>
    </footer>
  );
};
