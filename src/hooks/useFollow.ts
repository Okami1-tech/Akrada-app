import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';

export function useFollow(targetUserId: string) {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !targetUserId) return;
    supabase
      .from('follows')
      .select('*')
      .match({ follower_id: user.id, following_id: targetUserId })
      .single()
      .then(({ data }) => setIsFollowing(!!data));
  }, [user, targetUserId]);

  const toggleFollow = async () => {
    if (!user || loading) return;
    setLoading(true);
    try {
      if (isFollowing) {
        await supabase
          .from('follows')
          .delete()
          .match({ follower_id: user.id, following_id: targetUserId });
        setIsFollowing(false);
      } else {
        await supabase
          .from('follows')
          .insert({ follower_id: user.id, following_id: targetUserId });
        setIsFollowing(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return { isFollowing, toggleFollow, loading };
}
