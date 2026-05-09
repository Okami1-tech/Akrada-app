interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const sizes = {
  sm: { icon: 28, text: 'text-lg' },
  md: { icon: 36, text: 'text-2xl' },
  lg: { icon: 56, text: 'text-4xl' },
};

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const s = sizes[size];
  return (
    <div className="flex items-center gap-2">
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a855f7" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d="M20 2L36 11V29L20 38L4 29V11L20 2Z" fill="url(#logo-grad)" opacity="0.15" />
        <path d="M20 2L36 11V29L20 38L4 29V11L20 2Z" stroke="url(#logo-grad)" strokeWidth="1.5" fill="none" filter="url(#glow)" />
        <path d="M14 28L20 12L26 28M16.5 22H23.5" stroke="url(#logo-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
      </svg>
      {showText && (
        <span className={`font-display font-bold tracking-widest text-white ${s.text}`} style={{ letterSpacing: '0.2em' }}>
          AKRADA
        </span>
      )}
    </div>
  );
}
