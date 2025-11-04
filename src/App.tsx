import React from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import ConceptHomePage from './components/ConceptHomePage';
import Videobg from './components/Videobg';
import PlaylistsPage from './components/PlaylistsPage';
import PodcastsPage from './components/PodcastsPage';
import ResidentsPage from './components/ResidentsPage';
import AdminPage from './components/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import SinglePlaylistPage from './pages/SinglePlaylistPage';
import SinglePodcastPage from './pages/SinglePodcastPage';
import SingleResidentPage from './pages/SingleResidentPage';
import LoginPage from './pages/LoginPage';
import PreLaunchPage from './pages/PreLaunchPage';
import SignUpPage from './pages/SignUpPage';
import UserProfilePage from './pages/UserProfilePage';
import { UIProvider } from './contexts/UIContext';
import DetailLayout from './components/shell/DetailLayout';
import PageTransition from './components/ui/PageTransition';
import AdminRoute from './components/AdminRoute';

// This wrapper provides the main layout to a group of routes
const MainLayoutWrapper: React.FC = () => {
  const location = useLocation();
  const currentPage = location.pathname.substring(1) || 'home';

  return (
    <Layout currentPage={currentPage} onPageChange={() => {}}>
      <PageTransition>
        <Outlet />
      </PageTransition>
    </Layout>
  );
};

function App() {
  const location = useLocation();
  return (
    <UIProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Routes accessible only to the admin */}
          <Route element={<AdminRoute />}>
            <Route element={<MainLayoutWrapper />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/concept" element={<ConceptHomePage />} />
              <Route path="/video" element={<Videobg />} />
              <Route path="/playlists" element={<PlaylistsPage />} />
              <Route path="/podcasts" element={<PodcastsPage />} />
              <Route path="/residents" element={<ResidentsPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route element={<DetailLayout />}>
              <Route path="/playlist/:id" element={<SinglePlaylistPage />} />
              <Route path="/podcast/:id" element={<SinglePodcastPage />} />
              <Route path="/resident/:id" element={<SingleResidentPage />} />
            </Route>
            <Route
              path="/profile"
              element={
                <PageTransition>
                  <UserProfilePage />
                </PageTransition>
              }
            />
          </Route>

          {/* Publicly accessible routes */}
          <Route
            path="/login"
            element={
              <PageTransition>
                <LoginPage />
              </PageTransition>
            }
          />
          <Route
            path="/signup"
            element={
              <PageTransition>
                <SignUpPage />
              </PageTransition>
            }
          />
          <Route
            path="/pre-launch"
            element={
              <PageTransition>
                <PreLaunchPage />
              </PageTransition>
            }
          />

          {/* Fallback route */}
          <Route
            path="*"
            element={
              <PageTransition>
                <ConceptHomePage />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </UIProvider>
  );
}

export default App;