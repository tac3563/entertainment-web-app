"use client";

import { useState, type ReactNode } from "react";

type Tab = { id: string; label: string; content: ReactNode };

/**
 * Switches between server-rendered panels without a round trip. Panels arrive as
 * props, so their content stays server components; only the toggle is client code.
 */
export function FilterTabs({ label, tabs }: { label: string; tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);

  return (
    <div className="flex flex-col gap-5">
      <div
        role="group"
        aria-label={label}
        className="flex gap-1 self-start rounded-full border border-line bg-surface p-1"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            aria-pressed={tab.id === active}
            className={`min-h-10 cursor-pointer rounded-full px-4.5 font-medium transition-colors duration-200 ${
              tab.id === active ? "bg-fg text-bg" : "text-muted hover:text-fg"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div key={tab.id} hidden={tab.id !== active}>
          {tab.content}
        </div>
      ))}
    </div>
  );
}
