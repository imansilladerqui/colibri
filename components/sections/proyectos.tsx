"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PROYECTOS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { ShowcaseCard } from "@/components/ui/showcase-card";

export const Proyectos = () => {
  const reduced = useReducedMotion();

  return (
    <section id="proyectos" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading label={PROYECTOS.label} title={PROYECTOS.heading} />

        <motion.p
          className="text-muted -mt-8 mb-12 max-w-2xl text-lg md:mx-auto md:text-center"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          {PROYECTOS.intro}
        </motion.p>

        <div className="grid w-full gap-5 md:grid-cols-2">
          {PROYECTOS.items.map((item) => (
            <ShowcaseCard
              key={item.id}
              title={item.title}
              tagline={item.tagline}
              icon={item.icon}
              accent={item.accent}
              span={"span" in item && item.span === "wide" ? "wide" : "default"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
