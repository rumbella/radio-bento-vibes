import React from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
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
import SignUpPage from './pages/SignUpPage';
import { UIProvider } from './contexts/UIContext';
import DetailLayout from './components/shell/DetailLayout';

// This wrapper provides the main layout to a group of routes
const MainLayoutWrapper: React.FC = () => {
  const location = useLocation();
  const currentPage = location.pathname.substring(1) || 'home';

  return (
    <Layout currentPage={currentPage} onPageChange={() => {}}>
      <Outlet />
    </Layout>
  );
};

function App() {
  return (
    <UIProvider>
      <Routes>
        {/* Routes with the main layout (header, footer, etc.) */}
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

        {/* Routes with the detail layout (e.g., for single items) */}
        <Route element={<DetailLayout />}>
          <Route path="/playlist/:id" element={<SinglePlaylistPage />} />
          <Route path="/podcast/:id" element={<SinglePodcastPage />} />
          <Route path="/resident/:id" element={<SingleResidentPage />} />
        </Route>

        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Fallback route */}
        <Route path="*" element={<ConceptHomePage />} />
      </Routes>
    </UIProvider>
  );
}

export default App;