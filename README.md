# Cue

See what's trending in film and TV, search everything on TMDb, and keep a list of what to watch next. Built with Next.js 16 and TypeScript.

No account needed: everything is open, and your list ("My cue") is saved in your browser. (Accounts are planned, so lists can sync across devices.)

## 🚀 Features

- 🎬 **Trending:** a featured hero you can switch between this week's top titles, a trending rail, and popular films and TV with real ratings and genres.
- 🔍 **Search:** searches all of TMDb from the header (press `/` anywhere), with results at `/search?q=` so they can be shared.
- 🔖 **My cue:** save titles from any page. Stored in `localStorage` and kept in sync across tabs.
- ⚡ **Fast:** home, movies and TV are fully static, prerendered and refreshed hourly with `'use cache'`. Images come at the right size straight from TMDb's CDN, and motion uses only transform and opacity, respecting reduced-motion settings.

## 🧱 Tech Stack

| Tool                       | Purpose                                         |
| -------------------------- | ----------------------------------------------- |
| Next.js 16 (App Router)    | Routing, server rendering, Cache Components     |
| React 19                   | UI                                              |
| TypeScript                 | Type safety                                     |
| Tailwind CSS 4             | Styling                                         |
| TMDb API                   | Movie and TV data (fetched server-side only)    |

## 📦 Getting Started

1. Clone the repo:

   ```bash
   git clone git@github.com:tac3563/entertainment-web-app.git
   cd entertainment-web-app
   ```

2. Copy `.env.example` to `.env.local` and add your TMDb API key.

3. Install and run:

   ```bash
   npm install
   npm run dev
   ```

| Command             | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Dev server on :3000                      |
| `npm run build`     | Production build (needs `TMDB_API_KEY`)  |
| `npm run start`     | Serve the production build               |
| `npm run lint`      | ESLint                                   |
| `npm run typecheck` | `tsc --noEmit`                           |

## 🗂️ Structure

```
src/
  app/          routes: /, /movies, /tv-shows, /search, /watchlist, plus layout, error and 404
  components/   UI; only interactive pieces (hero switcher, tabs, search, save buttons) are client components
  config/       site.ts: product name, nav and watchlist copy (rename the product here)
  hooks/        use-watchlist.ts (localStorage-backed list)
  lib/          tmdb.ts (server-only, cached), query helper
  styles/       theme.css: Midnight design tokens (colours, fonts, motion)
  types/        MediaItem
```

## 🛠️ Future Plans

- Accounts, so the list syncs across devices.
- Title detail pages with cast, trailer and where to watch.
- Infinite scroll / pagination.

---

This product uses the TMDb API but is not endorsed or certified by TMDb.
