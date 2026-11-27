"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="py-[var(--spacing-500)]">
      <h2 className="pb-4">Couldn&apos;t load titles</h2>
      <p className="mb-8 opacity-75">Something went wrong fetching movies and TV series.</p>
      <button type="button" onClick={reset} className="cursor-pointer">
        Try again
      </button>
    </section>
  );
}
