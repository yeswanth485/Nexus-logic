import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_MAP = { sm: 16, md: 24, lg: 40 };

export default function Spinner({ size = 'md', className }: SpinnerProps) {
  const px = SIZE_MAP[size];
  const stroke = size === 'sm' ? 2.5 : 3;

  return (
    <>
      <style>{`
        @keyframes nlx-spin { to { transform: rotate(360deg); } }
      `}</style>
      <svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        style={{ animation: 'nlx-spin 0.9s linear infinite', flexShrink: 0 }}
      >
        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
        <path
          d="M12 2 A10 10 0 0 1 22 12"
          stroke="var(--accent-primary)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}

export function FullPageSpinner() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', minHeight: 200 }}>
      <Spinner size="lg" />
    </div>
  );
}
