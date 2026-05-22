"use client";

import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/scroll";
import type { GtmLocation } from "@/lib/analytics/gtm";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
  gtmLocation?: GtmLocation;
}

export const NavLink = ({
  href,
  children,
  className,
  onNavigate,
  gtmLocation,
}: NavLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const linkText =
        typeof children === "string"
          ? children
          : e.currentTarget.textContent?.trim() ?? href;

      scrollToSection(
        href,
        gtmLocation ? { linkText, location: gtmLocation } : undefined,
      );
      onNavigate?.();
    }
  };

  return (
    <a href={href} onClick={handleClick} className={cn(className)}>
      {children}
    </a>
  );
};
