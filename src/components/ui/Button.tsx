import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-body font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-surface-DEFAULT disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-electric text-white hover:bg-electric-dark shadow-purple-glow-sm hover:shadow-purple-glow active:scale-[0.98]',
    secondary: 'bg-surface-elevated border border-surface-border text-white hover:border-purple-500 hover:bg-surface-hover active:scale-[0.98]',
    ghost: 'bg-transparent text-purple-400 hover:bg-surface-elevated hover:text-white active:scale-[0.98]',
    danger: 'bg-red-600/20 border border-red-500/50 text-red-400 hover:bg-red-600/30 hover:border-red-500 active:scale-[0.98]',
    outline: 'bg-transparent border border-electric text-electric hover:bg-electric hover:text-white active:scale-[0.98]',
  };

  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
