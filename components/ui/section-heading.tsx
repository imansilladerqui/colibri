"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  className?: string;
}

export const SectionHeading = ({
  label,
  title,
  className,
}: SectionHeadingProps) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn("mb-12 md:mb-16", className)}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-sage">
        {label}
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
        {title}
      </h2>
    </motion.div>
  );
};
