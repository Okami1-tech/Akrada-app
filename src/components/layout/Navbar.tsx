import { Link, useNavigate } from 'react-router-dom';
import { Home, Bell, Compass, Users, User, LogOut, Menu } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export function Navbar() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const navItems = [
    { icon: Home, label: 'Home', path: '/feed' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: Users, label: 'Clubs', path: '/clubs' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-surface-DEFAULT/95 backdrop-blur border-b border-surface-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/feed" className="flex items-center gap-3">
          <Logo size="md" showText={true} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <Link key={item.path} to={item.path} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <item.icon size={20} />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {profile && (
            <Link to={`/profile/${profile.username}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Avatar src={profile.avatar_url} name={profile.display_name} size="sm" isVerified={profile.is_verified} />
              <span className="hidden sm:inline text-sm font-medium">{profile.display_name}</span>
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-surface-elevated transition-colors md:hidden"
          >
            <Menu size={20} />
          </button>

          <button
            onClick={handleSignOut}
            className="p-2 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
            title="Sign out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-surface-border p-4 flex flex-col gap-3">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors py-2"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
