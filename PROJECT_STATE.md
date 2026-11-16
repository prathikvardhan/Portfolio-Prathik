# Prathik Vardhan — 3D Portfolio

## Status
First interactive build is written. Visual direction adapted from `nagi.amsterdam` as a reference only: warm plaster/ivory, forest-green accent, Instrument Serif italic details, calm 3D museum room with three portals.

## Stack
- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4
- React Three Fiber + Drei + Three.js
- Lucide icons

## Content
- Name: Prathik Vardhan
- Student / technologist / strong in mathematics
- Won first place — Bharat Tech League 2025 Codex Competition at A Hub
- Hackathons: Campfire and Haven
- Certificate exists, but no image has been supplied yet
- Contact details and social links pending

## Key files
- `app/page.tsx` — full single-page content
- `app/globals.css` — design system and responsive styles
- `components/scene/hero-scene.tsx` — 3D gallery room, portals, sculpture, camera motion
- `components/site-header.tsx` — nav and mobile menu
- `components/hero-visual.tsx` — client-only Canvas loader
- `components/reveal.tsx`, `components/custom-cursor.tsx`
- `app/layout.tsx` — fonts and metadata

## Pending
1. Verify production build and fix any TypeScript/R3F errors.
2. Preview locally at 1440px and 390px, check overflow and 3D framing.
3. Replace contact placeholder once email/socials are supplied.
4. Add certificate image when supplied.
5. Use reference analysis to refine transitions, menu, and room composition without copying assets/code.

## Commands
```bash
npm run dev
npm run build
npm run lint
```
