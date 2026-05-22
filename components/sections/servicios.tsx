"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SERVICIOS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";

export const Servicios = () => {
  const reduced = useReducedMotion();

  return (
    <section id="servicios" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading label={SERVICIOS.label} title={SERVICIOS.heading} />

        <motion.p
          className="-mt-8 mb-12 max-w-2xl text-lg text-muted"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          {SERVICIOS.intro}
        </motion.p>

        <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICIOS.items.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
