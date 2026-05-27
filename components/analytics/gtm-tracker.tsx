"use client";

import { useEffect, useRef } from "react";
import {
  isGtmEnabled,
  pushGtmEvent,
  SECTION_LABELS,
  trackPageView,
  trackScrollDepth,
  trackSectionView,
  TRACKED_SECTION_IDS,
  whenGtmReady,
} from "@/lib/analytics/gtm";

const SCROLL_THRESHOLDS = [25, 50, 75, 90] as const;

export const GtmTracker = () => {
  const seenSections = useRef(new Set<string>());
  const seenDepths = useRef(new Set<number>());

  useEffect(() => {
    if (!isGtmEnabled()) return;

    let cancelled = false;
    let sectionObserver: IntersectionObserver | null = null;

    const onHashChange = () => {
      trackPageView();
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const scrollHeight = doc.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const percent = Math.round((scrollTop / scrollHeight) * 100);

      for (const threshold of SCROLL_THRESHOLDS) {
        if (percent >= threshold && !seenDepths.current.has(threshold)) {
          seenDepths.current.add(threshold);
          trackScrollDepth(threshold);
        }
      }
    };

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const tracked = target.closest<HTMLElement>("[data-gtm-event]");
      if (!tracked) return;

      const gtmEvent = tracked.dataset.gtmEvent;
      if (!gtmEvent) return;

      pushGtmEvent({
        event: gtmEvent,
        element_id: tracked.id || undefined,
        element_text:
          tracked.dataset.gtmText ??
          tracked.textContent?.trim().slice(0, 120) ??
          undefined,
        link_url: tracked.dataset.gtmUrl,
        link_location: tracked.dataset.gtmLocation,
        cta_name: tracked.dataset.gtmName,
        ...Object.fromEntries(
          Object.entries(tracked.dataset)
            .filter(([key]) => key.startsWith("gtmParam"))
            .map(([key, value]) => [
              key
                .replace(/^gtmParam/, "")
                .replace(/^./, (c) => c.toLowerCase()),
              value,
            ]),
        ),
      });
    };

    const startTracking = () => {
      if (cancelled) return;

      trackPageView();

      window.addEventListener("hashchange", onHashChange);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      sectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;

            const sectionId = entry.target.id;
            if (!sectionId || !TRACKED_SECTION_IDS.includes(sectionId))
              continue;
            if (seenSections.current.has(sectionId)) continue;

            seenSections.current.add(sectionId);
            trackSectionView(sectionId, SECTION_LABELS[sectionId] ?? sectionId);
          }
        },
        { rootMargin: "-20% 0px -55% 0px", threshold: 0 },
      );

      for (const sectionId of TRACKED_SECTION_IDS) {
        const el = document.getElementById(sectionId);
        if (el) sectionObserver.observe(el);
      }

      document.addEventListener("click", onDocumentClick);
    };

    void whenGtmReady().then(startTracking);

    return () => {
      cancelled = true;
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onDocumentClick);
      sectionObserver?.disconnect();
    };
  }, []);

  return null;
};
