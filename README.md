# Entertainment Web App

Browse popular movies and TV series from TMDb, search by title, and keep a watchlist. Built with Next.js 16 and TypeScript.

No account needed: everything is open, and the watchlist is saved in your browser. (Accounts are planned, so watchlists can sync across devices.)

## 🚀 Features

- 🎬 **Browse:** trending titles, recommendations, movies and TV series, rendered on the server.
- 🔍 **Search:** filters by title, kept in the URL (`?q=`) so results can be shared and survive refresh.
- 🔖 **Watchlist:** save titles from any page. Stored in `localStorage` and kept in sync across tabs.
- ⚡ **Fast:** TMDb responses are cached for an hour with `'use cache'`, pages stream in with skeletons, and images are served at the right size from TMDb's CDN.

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
  app/          routes: / , /movies, /tv-shows, /watchlist, plus layout and error
  components/   UI; only interactive pieces are client components
  hooks/        use-watchlist.ts (localStorage-backed watchlist)
  lib/          tmdb.ts (server-only, cached), search helpers
  types/        MediaItem
```

## 🛠️ Future Plans

- Accounts, so the watchlist syncs across devices.
- Title detail pages with cast, trailer and where to watch.
- Server-side search across all of TMDb, not just popular titles.
- Infinite scroll / pagination.

---

This product uses the TMDb API but is not endorsed or certified by TMDb.
