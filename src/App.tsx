import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import { Toaster } from 'react-hot-toast';
import { LoginPage } from '@/pages/Login';
import { FeedPage } from '@/pages/Feed';
import { ExplorePage } from '@/pages/Explore';
import { ClubsPage } from '@/pages/Clubs';
import { ProfilePage } from '@/pages/Profile';
import { NotificationsPage } from '@/pages/Notifications';
import { ProtectedRoute } from '@/pages/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/feed" replace />} />
          
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <FeedPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <ExplorePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/clubs"
            element={
              <ProtectedRoute>
                <ClubsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/:username"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/feed" replace />} />
        </Routes>
        <Toaster position="top-right" />
      </AuthProvider>
    </Router>
  );
}

export default App;
