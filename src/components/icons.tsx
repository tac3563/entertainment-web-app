type IconProps = { size?: number; className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function PlusIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} className={className} aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function CheckIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} className={className} aria-hidden>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function SearchIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} strokeWidth={2} className={className} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function ExternalIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} strokeWidth={2} className={className} aria-hidden>
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

/** Three shortening bars: a queue of things to watch. */
export function LogoMark({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" className={className} aria-hidden>
      <rect x="3" y="6" width="22" height="4" rx="2" fill="currentColor" />
      <rect x="3" y="12" width="15" height="4" rx="2" fill="currentColor" opacity=".65" />
      <rect x="3" y="18" width="9" height="4" rx="2" fill="currentColor" opacity=".35" />
    </svg>
  );
}
