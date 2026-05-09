import { formatDistanceToNow, format } from 'date-fns';

export function timeAgo(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatDate(date: string): string {
  return format(new Date(date), 'MMM d, yyyy');
}

export function formatCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function generateUsername(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') + Math.floor(Math.random() * 999);
}

export function isValidUsername(username: string): boolean {
  return /^[a-z0-9_]{3,30}$/.test(username);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getAvatarUrl(avatarPath: string | null, supabaseUrl: string): string | null {
  if (!avatarPath) return null;
  if (avatarPath.startsWith('http')) return avatarPath;
  return `${supabaseUrl}/storage/v1/object/public/avatars/${avatarPath}`;
}

export function getMediaUrl(mediaPath: string | null, supabaseUrl: string): string | null {
  if (!mediaPath) return null;
  if (mediaPath.startsWith('http')) return mediaPath;
  return `${supabaseUrl}/storage/v1/object/public/media/${mediaPath}`;
}
