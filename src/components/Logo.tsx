import { useId } from 'react';

export function Logo({ className = 'h-7 w-7' }: { className?: string }) {
  const gradientId = `logo-${useId().replace(/:/g, '')}`;

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#67E8F9" />
          <stop offset="1" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="31" height="31" rx="8" fill="#0E1726" stroke="#2A3B56" />
      <path
        d="M9 22 L16 10 L23 22 Z"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="22" r="2.4" fill="#67E8F9" />
      <circle cx="16" cy="10" r="2.4" fill="#A78BFA" />
      <circle cx="23" cy="22" r="2.4" fill="#67E8F9" />
    </svg>
  );
}
