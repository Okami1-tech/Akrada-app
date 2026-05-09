import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Input } from '@/components/ui/Input';
import { Search, Plus } from 'lucide-react';

export function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-surface-DEFAULT">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Clubs</h1>
            <p className="text-gray-400">Join clubs and connect with like-minded students</p>
          </div>
          <Button variant="primary">
            <Plus size={18} />
            Create Club
          </Button>
        </div>

        <Input
          placeholder="Search clubs..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          leftIcon={<Search size={16} />}
        />

        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Avatar name={`Club ${i}`} size="lg" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg">Club {i}</h3>
                    <p className="text-sm text-gray-400">500 members</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300">A community for students interested in {i === 1 ? 'programming' : i === 2 ? 'gaming' : 'music'}.</p>
                <Button variant="secondary" fullWidth>
                  Join Club
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
