import { ReactNode } from 'react';
import { cn } from '@/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-surface-card border border-surface-border rounded-xl p-4',
        hover && 'hover:border-purple-500/30 hover:bg-surface-elevated cursor-pointer transition-all duration-200',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}
