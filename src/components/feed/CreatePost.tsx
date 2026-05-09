import { useState, useRef } from 'react';
import { Image as ImageIcon, Video, Send } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

interface CreatePostProps {
  onPostCreated: () => void;
}

export function CreatePost({ onPostCreated }: CreatePostProps) {
  const { user, profile } = useAuth();
  const [content, setContent] = useState('');
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadMedia = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !user) return;

    setLoading(true);
    try {
      for (const file of files) {
        const filename = `${Date.now()}_${file.name}`;
        const { error, data } = await supabase.storage
          .from('media')
          .upload(`${user.id}/${filename}`, file);

        if (error) throw error;

        const { data: urlData } = supabase.storage
          .from('media')
          .getPublicUrl(`${user.id}/${filename}`);

        setMediaUrls(prev => [...prev, urlData.publicUrl]);
      }
    } catch (err) {
      toast.error('Failed to upload media');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!content.trim() && mediaUrls.length === 0) {
      toast.error('Write something or add media');
      return;
    }

    if (!user || !profile) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('posts').insert({
        author_id: user.id,
        content: content.trim(),
        media_urls: mediaUrls,
        media_type: mediaUrls.length > 0 ? (mediaUrls[0].includes('video') ? 'video' : 'image') : null,
        university_id: profile.university_id,
        likes_count: 0,
        comments_count: 0,
        is_pinned: false,
      });

      if (error) throw error;

      setContent('');
      setMediaUrls([]);
      toast.success('Post created!');
      onPostCreated();
    } catch (err) {
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return null;

  return (
    <Card className="space-y-4">
      <div className="flex gap-4">
        <Avatar src={profile.avatar_url} name={profile.display_name} size="md" isVerified={profile.is_verified} />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none"
            rows={3}
          />
        </div>
      </div>

      {mediaUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {mediaUrls.map((url, idx) => (
            <div key={idx} className="relative">
              <img src={url} alt="Preview" className="w-full h-24 object-cover rounded-lg" />
              <button
                onClick={() => setMediaUrls(prev => prev.filter((_, i) => i !== idx))}
                className="absolute top-1 right-1 bg-black/50 rounded-full p-1 text-white hover:bg-black/70"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-surface-border">
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleUploadMedia}
            className="hidden"
          />
          <button onClick={() => fileInputRef.current?.click()} className="p-2 rounded-lg text-gray-400 hover:text-white transition-colors" disabled={loading}>
            <ImageIcon size={20} />
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="p-2 rounded-lg text-gray-400 hover:text-white transition-colors" disabled={loading}>
            <Video size={20} />
          </button>
        </div>
        <Button onClick={handleCreatePost} loading={loading} size="sm">
          <Send size={16} />
          Post
        </Button>
      </div>
    </Card>
  );
}
