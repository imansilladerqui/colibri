"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ESTUDIO } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/section-heading";

export const Estudio = () => {
  const reduced = useReducedMotion();

  return (
    <section id="estudio" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading label={ESTUDIO.label} title={ESTUDIO.heading} />

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <p className="text-lg leading-relaxed text-muted md:text-xl">
            {ESTUDIO.summary}
          </p>

          <div className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {ESTUDIO.stats.map((stat) => (
              <div key={stat.id} className="gradient-border rounded-xl p-6">
                <p className="font-display text-3xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
