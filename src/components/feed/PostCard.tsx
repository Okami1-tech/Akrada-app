import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Trash2, Pin } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { timeAgo, formatCount } from '@/utils';
import type { Post } from '@/types';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onDelete: (postId: string) => void;
  onPin: (postId: string) => void;
}

export function PostCard({ post, onLike, onDelete, onPin }: PostCardProps) {
  const { user, profile } = useAuth();
  const isAuthor = user?.id === post.author_id;
  const canDelete = isAuthor || profile?.role === 'admin' || profile?.role === 'founder';
  const canPin = isAuthor;

  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between">
        <Link to={`/profile/${post.author?.username}`} className="flex gap-3 flex-1">
          <Avatar src={post.author?.avatar_url} name={post.author?.display_name || 'User'} size="md" isVerified={post.author?.is_verified} />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-white hover:text-purple-400 transition-colors">{post.author?.display_name}</h3>
              {post.author?.is_verified && <span className="text-xs text-purple-400">✓</span>}
            </div>
            <p className="text-xs text-gray-500">@{post.author?.username} · {timeAgo(post.created_at)}</p>
          </div>
        </Link>

        {post.is_pinned && <span className="text-xs bg-purple-500/20 border border-purple-500/50 text-purple-300 px-2 py-1 rounded">📌 Pinned</span>}
      </div>

      <p className="text-gray-100 whitespace-pre-wrap">{post.content}</p>

      {post.media_urls.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-lg overflow-hidden">
          {post.media_urls.map((url, idx) => (
            <img key={idx} src={url} alt={`Post media ${idx}`} className="w-full h-48 object-cover" />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-gray-400 pt-2 border-t border-surface-border">
        <button onClick={() => onLike(post.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${post.is_liked ? 'text-red-500' : 'hover:text-red-500'}`}>
          <Heart size={18} fill={post.is_liked ? 'currentColor' : 'none'} />
          <span className="text-xs">{formatCount(post.likes_count)}</span>
        </button>

        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:text-blue-500 transition-colors">
          <MessageCircle size={18} />
          <span className="text-xs">{formatCount(post.comments_count)}</span>
        </button>

        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:text-green-500 transition-colors">
          <Share2 size={18} />
        </button>

        {canPin && (
          <button onClick={() => onPin(post.id)} className={`p-2 rounded-lg transition-colors ${post.is_pinned ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}>
            <Pin size={18} />
          </button>
        )}

        {canDelete && (
          <button onClick={() => onDelete(post.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </Card>
  );
}
