import { getInitials } from '@/utils';

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isVerified?: boolean;
  className?: string;
}

const sizes = {
  xs: { img: 'w-6 h-6', text: 'text-xs', badge: 'w-3 h-3 -bottom-0.5 -right-0.5' },
  sm: { img: 'w-8 h-8', text: 'text-xs', badge: 'w-3.5 h-3.5 -bottom-0.5 -right-0.5' },
  md: { img: 'w-10 h-10', text: 'text-sm', badge: 'w-4 h-4 bottom-0 right-0' },
  lg: { img: 'w-16 h-16', text: 'text-xl', badge: 'w-5 h-5 bottom-0.5 right-0.5' },
  xl: { img: 'w-24 h-24', text: 'text-3xl', badge: 'w-6 h-6 bottom-1 right-1' },
};

export function Avatar({ src, name, size = 'md', isVerified, className = '' }: AvatarProps) {
  const s = sizes[size];
  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      {src ? (
        <img src={src} alt={name} className={`${s.img} rounded-full object-cover ring-2 ring-surface-border`} />
      ) : (
        <div className={`${s.img} rounded-full bg-gradient-to-br from-purple-600 to-purple-900 ring-2 ring-surface-border flex items-center justify-center`}>
          <span className={`${s.text} font-display font-bold text-white`}>{getInitials(name)}</span>
        </div>
      )}
      {isVerified && (
        <div className={`absolute ${s.badge} bg-electric rounded-full flex items-center justify-center ring-1 ring-surface-DEFAULT`}>
          <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
            <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  );
}
