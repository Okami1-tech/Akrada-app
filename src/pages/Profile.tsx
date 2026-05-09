import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { PostCard } from '@/components/feed/PostCard';
import { usePosts } from '@/hooks/usePosts';
import { useFollow } from '@/hooks/useFollow';
import { formatCount } from '@/utils';
import { Mail, LinkIcon } from 'lucide-react';

export function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { profile: currentProfile } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const { posts, likePost, deletePost, pinPost } = usePosts({
    type: 'profile',
    id: profileData?.id,
  });

  const { isFollowing, toggleFollow } = useFollow(profileData?.id || '');

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-DEFAULT">
        <Navbar />
        <div className="text-center py-12 text-gray-500">Loading profile...</div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-surface-DEFAULT">
        <Navbar />
        <div className="text-center py-12 text-gray-500">Profile not found</div>
      </div>
    );
  }

  const isOwnProfile = currentProfile?.id === profileData.id;

  return (
    <div className="min-h-screen bg-surface-DEFAULT">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card className="space-y-4">
          <div className="flex items-start justify-between">
            <Avatar
              src={profileData.avatar_url}
              name={profileData.display_name}
              size="xl"
              isVerified={profileData.is_verified}
            />
            {!isOwnProfile && (
              <Button
                variant={isFollowing ? 'secondary' : 'primary'}
                onClick={toggleFollow}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-display font-bold text-white">
              {profileData.display_name}
            </h1>
            <p className="text-gray-500">@{profileData.username}</p>
            {profileData.is_verified && (
              <p className="text-sm text-purple-400">✓ Verified</p>
            )}
          </div>

          {profileData.bio && <p className="text-gray-300">{profileData.bio}</p>}

          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <p className="font-semibold text-white">
                {formatCount(profileData.followers_count)}
              </p>
              <p className="text-gray-500">Followers</p>
            </div>
            <div>
              <p className="font-semibold text-white">
                {formatCount(profileData.following_count)}
              </p>
              <p className="text-gray-500">Following</p>
            </div>
            <div>
              <p className="font-semibold text-white">
                {formatCount(profileData.posts_count)}
              </p>
              <p className="text-gray-500">Posts</p>
            </div>
          </div>

          {profileData.external_links?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {profileData.external_links.map((link: any, idx: number) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-purple-400 hover:text-purple-300"
                >
                  <LinkIcon size={14} />
                  {link.label}
                </a>
              ))}
            </a> <div>
          )} 
        </Card>

        {/* Posts */}
          <h2 className="text-xl font-display font-semibold text-white mb-4">Posts</h2>
          <div className="space-y-4">
            {posts.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No posts yet</p>
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
    </div>
  );
}
