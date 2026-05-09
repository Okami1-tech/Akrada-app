import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('relative w-full bg-surface-card border border-surface-border rounded-2xl shadow-card animate-slide-up', sizes[size])}>
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-surface-border">
            <h2 className="font-display font-semibold text-white text-lg">{title}</h2>
            <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-surface-elevated transition-colors">
              <X size={18} />
            </button>
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
