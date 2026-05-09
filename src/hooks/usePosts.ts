import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Post, FeedType } from '@/types';
import { useAuth } from './useAuth';

export function usePosts(feed: FeedType) {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('posts')
        .select(`
          *,
          author:profiles(id, username, display_name, avatar_url, is_verified, role),
          post_likes(user_id)
        `)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(30);

      if (feed.type === 'university' && feed.id) {
        query = query.eq('university_id', feed.id);
      } else if (feed.type === 'club' && feed.id) {
        query = query.eq('club_id', feed.id);
      } else if (feed.type === 'profile' && feed.id) {
        query = query.eq('author_id', feed.id);
      } else if (feed.type === 'following' && user) {
        const { data: followingIds } = await supabase
          .from('follows')
          .select('following_id')
          .eq('follower_id', user.id);
        const ids = followingIds?.map(f => f.following_id) ?? [];
        if (ids.length === 0) {
          setPosts([]);
          setLoading(false);
          return;
        }
        query = query.in('author_id', ids);
      }

      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;

      const processedPosts = (data ?? []).map((post: Record<string, unknown>) => ({
        ...post,
        is_liked: user
          ? (post.post_likes as { user_id: string }[])?.some(l => l.user_id === user.id)
          : false,
      })) as Post[];

      setPosts(processedPosts);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, [feed.type, feed.id, user]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const likePost = async (postId: string) => {
    if (!user) return;
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const isLiked = post.is_liked;
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, is_liked: !isLiked, likes_count: p.likes_count + (isLiked ? -1 : 1) }
          : p
      )
    );

    if (isLiked) {
      await supabase.from('post_likes').delete().match({ post_id: postId, user_id: user.id });
    } else {
      await supabase.from('post_likes').insert({ post_id: postId, user_id: user.id });
    }
  };

  const deletePost = async (postId: string) => {
    await supabase.from('posts').delete().eq('id', postId);
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const pinPost = async (postId: string) => {
    if (!user) return;
    const pinnedPosts = posts.filter(p => p.is_pinned && p.author_id === user.id);
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    if (!post.is_pinned && pinnedPosts.length >= 3) return;

    const newPinned = !post.is_pinned;
    await supabase.from('posts').update({ is_pinned: newPinned }).eq('id', postId);
    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, is_pinned: newPinned } : p))
    );
  };

  return { posts, loading, error, likePost, deletePost, pinPost, refetch: fetchPosts };
}
