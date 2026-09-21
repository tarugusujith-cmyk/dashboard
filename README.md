# BankDash — Vite + React + Tailwind CSS

This is the BankDash banking dashboard, migrated from Next.js (App Router) to
**Vite + React + TypeScript + Tailwind CSS v4**, with client-side routing via
**react-router-dom** and full responsive layouts preserved/tuned for mobile,
tablet, and desktop.

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (defaults to http://localhost:5173).

## Build

```bash
npm run build
npm run preview   # serve the production build locally
```

## What changed from the original Next.js project

- **Routing**: Next's file-based App Router (`src/app/**`) was replaced with
  `react-router-dom`. All routes now live in `src/App.tsx` and match the
  original paths exactly (`/dashboard/overview`, `/dashboard/transactions`,
  etc.). `src/layouts/DashboardLayout.tsx` renders an `<Outlet />` instead of
  taking `children`.
- **API routes**: The Next.js route handlers under `src/app/api/**` (which
  only ever returned local mock data after an artificial delay) were
  reproduced as plain async functions in `src/mock/api.ts`. No server is
  required — this is a fully static, client-only app.
- **Next-specific APIs removed**: `next/link` → `react-router-dom`'s `Link`,
  `next/navigation`'s `usePathname` → `useLocation()`, `next/image` → a plain
  `<img>` tag, `next/font` → a Google Fonts `<link>` in `index.html`.
- **Styling**: Tailwind v4 config (`src/index.css`, using `@theme`) is
  unchanged — Vite uses the official `@tailwindcss/vite` plugin.
- **State/data**: Zustand stores, TanStack Query, Framer Motion, Recharts,
  lucide-react icons, and all mock data are untouched.

## Responsiveness

The dashboard layout, sidebar, and header already used Tailwind's responsive
breakpoints (`sm`/`md`/`lg`) for a collapsible sidebar and adaptive grids;
this behavior was preserved as-is during the migration. Test at common
breakpoints (375px, 768px, 1024px, 1440px) after installing dependencies.

## Note on this conversion

This conversion was done in an isolated environment without network/npm
registry access, so `npm install` / `npm run build` could not be executed
here to verify the result end-to-end. The migration is a careful, faithful
line-by-line port (same JSX, same Tailwind classes, same store/data logic) —
only Next.js-specific APIs were swapped for their Vite/React Router
equivalents. Please run `npm install && npm run dev` and let me know if you
hit any issue; I'm happy to fix it immediately.
