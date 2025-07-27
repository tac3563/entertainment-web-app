import type { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <div
        className="flex flex-col md:flex-row md:gap-[var(--spacing-400)] justify-between"
        id="page-wrapper"
      >
        {children}
      </div>
    </>
  );
}
