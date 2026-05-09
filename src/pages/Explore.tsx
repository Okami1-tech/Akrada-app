import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

export function ExplorePage() {
  return (
    <div className="min-h-screen bg-surface-DEFAULT">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Explore AKRADA</h1>
            <p className="text-gray-400">Discover trending posts, users, and clubs from your university</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Trending Posts */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-xl font-display font-semibold text-white">Trending Now</h2>
              {[1, 2, 3].map(i => (
                <Card key={i} hover>
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm">Trending in your university</p>
                    <h3 className="font-semibold text-white">Trending Topic #{i}</h3>
                    <p className="text-xs text-gray-500">450K posts</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Suggested Users */}
            <div className="space-y-4">
              <h2 className="text-xl font-display font-semibold text-white">Suggested Users</h2>
              {[1, 2, 3].map(i => (
                <Card key={i}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={`User ${i}`} size="md" />
                      <div className="flex-1">
                        <p className="font-medium text-white">User {i}</p>
                        <p className="text-xs text-gray-500">@user{i}</p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" fullWidth>
                      Follow
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
