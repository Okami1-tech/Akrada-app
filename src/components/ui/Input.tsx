import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, leftIcon, rightIcon, fullWidth = true, className, ...props },
  ref
) {
  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
      {label && <label className="text-sm font-medium text-gray-300 font-body">{label}</label>}
      <div className="relative">
        {leftIcon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{leftIcon}</span>}
        <input
          ref={ref}
          className={cn(
            'w-full bg-surface-elevated border rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 font-body',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent',
            error
              ? 'border-red-500/60 focus:ring-red-500'
              : 'border-surface-border hover:border-purple-500/50',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          {...props}
        />
        {rightIcon && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{rightIcon}</span>}
      </div>
      {error && <span className="text-xs text-red-400 font-body">{error}</span>}
      {hint && !error && <span className="text-xs text-gray-500 font-body">{hint}</span>}
    </div>
  );
});
