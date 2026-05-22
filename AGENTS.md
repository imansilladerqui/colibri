<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Estudio Colibrí — agent rules

## Project

- Marketing site for **Estudio Colibrí** (digital products studio, Barcelona). Single-page app: `Hero` → `Estudio` → `Proyectos` → `Servicios` → `Contacto` in `app/page.tsx`.
- UI copy is **Spanish** and lives in `lib/constants.ts` (`SITE`, `HERO`, `NAV`, `ESTUDIO`, etc.). Do not invent marketing copy in components; add or change strings in constants.
- In-page nav uses hash sections (`#estudio`, `#proyectos`, …). Use `scrollToSection` from `lib/scroll.ts` and `NavLink` with `gtmLocation` where tracking applies — do not add full page routes unless explicitly requested.

## Code style

- Use **`export const` arrow functions** for components and helpers (no `function` declarations in app code).
- Merge classes with `cn()` from `lib/utils.ts`. Prefer existing UI primitives (`Button`, `NavLink`, `SectionHeading`, `ServiceCard`, `ShowcaseCard`) over new one-offs.
- Client components need `"use client"` only when they use hooks, browser APIs, or event handlers. Keep server actions in `app/actions/`.

## Design & assets

- Brand tokens are CSS variables in `app/globals.css` (`--accent` coral, `--foreground` teal, cream background). Use semantic Tailwind classes (`text-muted`, `bg-surface`, `gradient-border`, `glass`) — avoid hard-coded hex in components.
- Logo is **`HummingbirdIcon`** / `Logo` (`components/ui/`), inline SVG — not `<img>` and not CSS `background-image`. Favicon: `public/hummingbird.svg`.

## Analytics (GTM)

- GTM is optional via `NEXT_PUBLIC_GTM_ID`. All tracking goes through `lib/analytics/gtm.ts` (`trackCtaClick`, `trackNavigationClick`, `trackContactForm*`, etc.).
- New CTAs or nav actions: call the matching `track*` helper or add `data-gtm-event` / `data-gtm-name` / `data-gtm-location` for `GtmTracker` delegation. Do not embed raw `gtag` or duplicate GTM snippets.

## Contact & env

- Contact form: `sendContactEmail` server action + Turnstile/honeypot in `lib/contact-antispam.ts`. Document new env vars in `.env.example` only; never commit `.env.local` or secrets.

## Scope

- Minimize diff scope. Do not reintroduce removed experiments (`CustomCursor`, `ScrollProgress`, old `/casos` routes) unless asked. Run `pnpm run build` after non-trivial changes.
