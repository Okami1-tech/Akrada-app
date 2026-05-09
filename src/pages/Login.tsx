import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { NIGERIAN_UNIVERSITIES } from '@/lib/universities';
import toast from 'react-hot-toast';

export function LoginPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [university, setUniversity] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (isSignUp) {
      if (!displayName) newErrors.displayName = 'Display name is required';
      if (!username) newErrors.username = 'Username is required';
      else if (!/^[a-z0-9_]{3,30}$/.test(username)) newErrors.username = 'Username must be 3-30 chars (lowercase, numbers, underscores)';
      if (!university) newErrors.university = 'Please select a university';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isSignUp) {
        const { data: authData, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;

        if (authData.user) {
          const { error: profileError } = await supabase.from('profiles').insert({
            id: authData.user.id,
            username: username.toLowerCase(),
            display_name: displayName,
            university_id: university,
            avatar_url: null,
            bio: null,
            hobbies: [],
            relationship_status: null,
            external_links: [],
            role: 'user',
            is_verified: false,
            is_banned: false,
            is_suspended: false,
            followers_count: 0,
            following_count: 0,
            posts_count: 0,
          });

          if (profileError) throw profileError;
          toast.success('Account created! Check your email to verify.');
          setIsSignUp(false);
          setEmail('');
          setPassword('');
          setDisplayName('');
          setUsername('');
          setUniversity('');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/feed');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-DEFAULT via-surface-card to-surface-DEFAULT flex items-center justify-center px-4">
      {/* Decorative glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <form onSubmit={handleAuth} className="relative w-full max-w-sm space-y-6 bg-surface-elevated border border-surface-border rounded-2xl p-8 shadow-card">
        <div className="flex justify-center mb-8">
          <Logo size="lg" showText={true} />
        </div>

        <div>
          <h1 className="text-2xl font-display font-bold text-white text-center mb-2">
            {isSignUp ? 'Join AKRADA' : 'Welcome Back'}
          </h1>
          <p className="text-center text-gray-400 text-sm">
            {isSignUp ? 'Connect with Nigerian students' : 'Sign in to your account'}
          </p>
        </div>

        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            leftIcon={<Mail size={16} />}
            error={errors.email}
          />

          {isSignUp && (
            <>
              <Input
                label="Display Name"
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="John Doe"
                leftIcon={<User size={16} />}
                error={errors.displayName}
              />

              <Input
                label="Username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="johndoe_123"
                leftIcon={<User size={16} />}
                error={errors.username}
                hint="3-30 characters, lowercase & underscores"
              />

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-300">University</label>
                <select
                  value={university}
                  onChange={e => setUniversity(e.target.value)}
                  className="w-full bg-surface-DEFAULT border border-surface-border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select your university...</option>
                  {NIGERIAN_UNIVERSITIES.map(uni => (
                    <option key={uni.id} value={uni.id}>
                      {uni.name} ({uni.state})
                    </option>
                  ))}
                </select>
                {errors.university && <span className="text-xs text-red-400">{errors.university}</span>}
              </div>
            </>
          )}

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            leftIcon={<Lock size={16} />}
            error={errors.password}
            hint={isSignUp ? 'At least 6 characters' : ''}
          />
        </div>

        <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
          {isSignUp ? 'Create Account' : 'Sign In'}
        </Button>

        <div className="text-center text-sm text-gray-400">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrors({});
            }}
            className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
}
