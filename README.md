# MotionGuru marketing site

A standalone Next.js App Router site for the MotionGuru product launch page. It lives beside the existing Vite application so the product routes and their dependencies remain unchanged.

## Run locally

```sh
pnpm install
pnpm dev
```

The site runs at `http://localhost:3000`. Marketing CTAs use `http://localhost:5173` by default to reach the existing Vite app. Set `NEXT_PUBLIC_APP_URL` to the product application's public base URL before deploying.

Set `NEXT_PUBLIC_SITE_URL` to the public marketing-site origin before deploying. It is used for canonical metadata, social sharing URLs, `robots.txt`, and the sitemap.

Set `NEXT_PUBLIC_INTRO_VIDEO_SRC` to a real local or hosted introduction video to enable playback. Until then, the player intentionally shows a labeled concept poster instead of pretending a placeholder is a finished demo.

Pricing plans and workflow examples are demonstration data, visibly identified in the interface. Replace the sample plan data in `src/lib/content.ts` only when approved pricing is available.

## Checks

```sh
pnpm test
pnpm lint
pnpm typecheck
pnpm build
```
