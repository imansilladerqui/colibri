"use client";

import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export const ServiceCard = ({
  title,
  description,
  icon: Icon,
  className,
}: ServiceCardProps) => {
  const reduced = useReducedMotion();

  return (
    <motion.article
      className={cn(
        "gradient-border group relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl p-6 text-center transition-[background-color,box-shadow,transform] duration-300",
        "hover:bg-surface hover:shadow-[0_8px_28px_rgba(26,77,78,0.08)] hover:-translate-y-0.5",
        "max-md:hover:translate-y-0 max-md:hover:shadow-none",
        className
      )}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background/80 transition-colors duration-300 group-hover:border-coral/35 group-hover:bg-coral/8">
        <Icon
          className="h-6 w-6 text-teal transition-colors duration-300 group-hover:text-coral"
          strokeWidth={1.5}
        />
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-foreground md:text-xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </motion.article>
  );
};
