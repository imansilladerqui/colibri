"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { HERO } from "@/lib/constants";
import { Logo } from "@/components/ui/logo";
import { NavLink } from "@/components/ui/nav-link";

export const Hero = () => {
  const reduced = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay },
        };

  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden pt-24"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="mesh-blob bg-accent/20 top-1/4 left-1/4 h-96 w-96" />
        <div className="mesh-blob bg-accent-secondary/20 top-1/3 right-1/4 h-80 w-80" />
        <div className="mesh-blob bg-highlight/15 bottom-1/4 left-1/2 h-72 w-72 -translate-x-1/2" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div {...fadeUp(0)} className="mb-8">
          <Logo className="h-32 md:h-44 lg:h-52" />
        </motion.div>

        <motion.p
          className="text-sage mb-4 font-mono text-xs tracking-[0.25em] uppercase"
          {...fadeUp(0.1)}
        >
          {HERO.eyebrow}
        </motion.p>

        <motion.h1
          className="font-display text-4xl leading-[1.1] font-semibold tracking-tight md:text-7xl lg:text-8xl"
          {...fadeUp(0.15)}
        >
          <span className="text-foreground block">{HERO.headline}</span>
          <span className="gradient-text block">{HERO.headlineAccent}</span>
        </motion.h1>

        <motion.p
          className="text-muted mx-auto mt-6 max-w-xl text-lg md:text-xl"
          {...fadeUp(0.25)}
        >
          {HERO.tagline}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-4"
          {...fadeUp(0.35)}
        >
          <NavLink
            href="#proyectos"
            gtmLocation="hero"
            className="bg-foreground text-background inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
          >
            {HERO.ctaWork}
            <ArrowDown className="h-4 w-4" />
          </NavLink>
          <NavLink
            href="#contacto"
            gtmLocation="hero"
            className="border-border text-foreground hover:border-accent/40 hover:bg-accent/5 inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors"
          >
            <Mail className="h-4 w-4" />
            {HERO.ctaContact}
          </NavLink>
        </motion.div>
      </div>
    </section>
  );
};
