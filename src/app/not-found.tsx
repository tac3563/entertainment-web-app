import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-start gap-4 py-10">
      <p className="font-mono text-xs tracking-[0.1em] text-accent uppercase">404</p>
      <h1 className="font-display text-[clamp(40px,5vw,64px)] leading-none font-extrabold tracking-[-0.045em]">
        This page isn&apos;t showing
      </h1>
      <p className="text-muted">The link may be old, or the page has moved.</p>
      <Link
        href="/"
        className="flex min-h-12 items-center rounded-full bg-fg px-6 font-semibold text-bg transition-transform hover:scale-[1.03] active:scale-95"
      >
        Back to home
      </Link>
    </section>
  );
}
