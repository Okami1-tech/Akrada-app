import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/Card';

export function NotificationsPage() {
  return (
    <div className="min-h-screen bg-surface-DEFAULT">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-display font-bold text-white mb-6">Notifications</h1>
        <Card>
          <p className="text-center text-gray-500 py-12">
            No notifications yet. Follow users or interact with posts to get started!
          </p>
        </Card>
      </div>
    </div>
  );
}
