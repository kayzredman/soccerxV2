# SoccerX V2 Starter

A premium, motion-first **Next.js App Router** web app starter for **SoccerX**, aligned to the product docs and decision log.

## What is included
- **Mobile-first landing page** for the 39-day social prediction game
- Core routes:
  - `/` landing / sign-in CTA
  - `/bracket`
  - `/daily`
  - `/leaderboard`
  - `/league/[code]`
  - `/me`
- **Motion-first UI** using `motion/react`
- Tailwind-based design system with premium gradients, glass panels, score cards, and social/game surfaces
- Monorepo-friendly root setup for future `apps/api`, `workers/scoring`, and shared packages

## Notes from the docs synthesis
This starter follows the **latest decision log** where it conflicts with the original project draft:
- v1 auth is implemented as **magic-link ready** and not Clerk-first
- v1 product emphasis is **groups-first launch path** while keeping the UI structure extensible for knockout picks
- scoring is modeled conceptually as an **immutable ledger** (`score_events`) for future API integration

## Quick start
```bash
pnpm install
pnpm --filter web dev
```

Open `http://localhost:3000`.

## Recommended next build steps
1. Wire auth screens to your magic-link backend
2. Replace mock data in `apps/web/lib/mock-data.ts`
3. Add SSR data fetching for fixtures, leagues, and leaderboard cache
4. Add optimistic mutations for pick updates
5. Add OG image route and share surfaces

## Branch setup for GitHub
A helper script is included at `scripts/git-branch-setup.sh`.

Typical flow:
```bash
git init
git remote add origin https://github.com/kayzredman/soccerxV2.git
bash scripts/git-branch-setup.sh
```

If the remote already has commits, fetch and reconcile first:
```bash
git fetch origin
git checkout -b dev origin/dev || git checkout -b dev
git checkout -b main origin/main || git checkout -b main
```
