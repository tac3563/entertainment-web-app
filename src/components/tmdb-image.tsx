"use client";

import Image, { type ImageLoader } from "next/image";

// TMDb serves fixed backdrop widths, so pick the smallest one that covers the requested width.
// This skips Next's optimiser entirely: TMDb's CDN already resizes.
const tmdbLoader: ImageLoader = ({ src, width }) => {
  const size = width <= 300 ? "w300" : width <= 780 ? "w780" : "w1280";
  return `https://image.tmdb.org/t/p/${size}${src}`;
};

type TmdbImageProps = {
  path: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function TmdbImage({ path, alt, sizes, priority, className = "" }: TmdbImageProps) {
  if (!path) {
    return (
      <div
        className={`absolute inset-0 bg-[radial-gradient(90%_70%_at_78%_18%,rgb(164_173_255/0.18),transparent_60%)] bg-raised ${className}`}
        aria-hidden
      />
    );
  }

  return (
    <Image
      loader={tmdbLoader}
      src={path}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}
