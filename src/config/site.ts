// Working name. Rename the product here; the watchlist copy follows it.
export const site = {
  name: "cue",
  title: "Cue",
  description: "See what's trending in film and TV, search everything on TMDb, and keep a list of what to watch next.",
  nav: [
    { href: "/", label: "Home" },
    { href: "/movies", label: "Movies" },
    { href: "/tv-shows", label: "TV series" },
  ],
  watchlist: {
    href: "/watchlist",
    nav: "My cue",
    add: "Add to cue",
    saved: "In your cue",
  },
} as const;
