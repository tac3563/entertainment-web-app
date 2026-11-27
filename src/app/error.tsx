"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="flex flex-col items-start gap-4 py-10">
      <h1 className="font-display text-[32px] font-bold tracking-[-0.03em]">Couldn&apos;t load titles</h1>
      <p className="text-muted">TMDb didn&apos;t respond. Check your connection, then try again.</p>
      <button
        type="button"
        onClick={reset}
        className="min-h-12 cursor-pointer rounded-full bg-fg px-6 font-semibold text-bg transition-transform hover:scale-[1.03] active:scale-95"
      >
        Try again
      </button>
    </section>
  );
}
