import type { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <div
        className="overflow-x-hidden flex flex-col md:flex-row gap-[var(--spacing-400)] justify-between"
        id="page-wrapper"
      >
        {children}
      </div>
    </>
  );
}
