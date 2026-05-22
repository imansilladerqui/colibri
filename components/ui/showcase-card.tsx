"use client";

import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { WorkAccent } from "@/lib/constants";
import { cn } from "@/lib/utils";

const accentStyles = {
  coral: {
    mesh: "from-accent/25 via-transparent to-transparent",
    glow: "bg-accent/20",
    dot: "bg-accent",
  },
  sage: {
    mesh: "from-accent-secondary/25 via-transparent to-transparent",
    glow: "bg-accent-secondary/20",
    dot: "bg-accent-secondary",
  },
  mustard: {
    mesh: "from-highlight/25 via-transparent to-transparent",
    glow: "bg-highlight/20",
    dot: "bg-highlight",
  },
} as const;

interface ShowcaseCardProps {
  title: string;
  tagline: string;
  icon: LucideIcon;
  accent: WorkAccent;
  span?: "wide" | "default";
  className?: string;
}

export const ShowcaseCard = ({
  title,
  tagline,
  icon: Icon,
  accent,
  span = "default",
  className,
}: ShowcaseCardProps) => {
  const reduced = useReducedMotion();
  const styles = accentStyles[accent];

  return (
    <motion.article
      className={cn(
        "gradient-border group relative min-h-[200px] overflow-hidden rounded-2xl md:min-h-[220px]",
        span === "wide" && "md:col-span-2",
        className,
      )}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      whileHover={reduced ? undefined : { y: -6 }}
    >
      <div
        className={cn("absolute inset-0 bg-gradient-to-br", styles.mesh)}
        aria-hidden
      />
      <div
        className={cn(
          "absolute -top-8 -right-8 h-40 w-40 rounded-full blur-3xl",
          styles.glow,
        )}
        aria-hidden
      />

      <div className="relative z-10 flex h-full min-h-[200px] flex-col items-center justify-center gap-3 p-6 text-center md:min-h-[220px] md:gap-4 md:p-8">
        <Icon
          className="text-foreground/80 h-10 w-10 shrink-0 transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1.25}
        />
        <div>
          <h3 className="font-display text-foreground text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h3>
          <p className="text-muted mx-auto mt-2 max-w-sm text-sm leading-relaxed md:text-base">
            {tagline}
          </p>
        </div>
      </div>

      <div
        className="absolute right-6 bottom-6 flex gap-1.5 opacity-40"
        aria-hidden
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn("h-2 w-2 rounded-sm", styles.dot)}
            style={{ opacity: 1 - i * 0.25 }}
          />
        ))}
      </div>
    </motion.article>
  );
};
