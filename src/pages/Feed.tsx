import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { CreatePost } from '@/components/feed/CreatePost';
import { PostCard } from '@/components/feed/PostCard';
import { usePosts } from '@/hooks/usePosts';
import { useAuth } from '@/hooks/useAuth';

export function FeedPage() {
  const { profile } = useAuth();
  const [feedTab, setFeedTab] = useState<'following' | 'university'>('following');
  const { posts, loading, likePost, deletePost, pinPost, refetch } = usePosts({
    type: feedTab,
    id: feedTab === 'university' ? profile?.university_id : undefined,
  });

  return (
    <div className="min-h-screen bg-surface-DEFAULT">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="flex gap-4 border-b border-surface-border">
          <button
            onClick={() => setFeedTab('following')}
            className={`pb-3 font-medium transition-colors ${feedTab === 'following' ? 'border-b-2 border-purple-500 text-white' : 'text-gray-500 hover:text-white'}`}
          >
            Following
          </button>
          <button
            onClick={() => setFeedTab('university')}
            className={`pb-3 font-medium transition-colors ${feedTab === 'university' ? 'border-b-2 border-purple-500 text-white' : 'text-gray-500 hover:text-white'}`}
          >
            {profile?.university?.name || 'My University'}
          </button>
        </div>

        <CreatePost onPostCreated={refetch} />

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No posts yet. Follow users or join clubs!</div>
          ) : (
            posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onLike={likePost}
                onDelete={deletePost}
                onPin={pinPost}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
