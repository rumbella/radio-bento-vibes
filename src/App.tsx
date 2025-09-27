import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import ConceptHomePage from './components/ConceptHomePage';
import Videobg from './components/Videobg';
import PlaylistsPage from './components/PlaylistsPage';
import PodcastsPage from './components/PodcastsPage';
import ResidentsPage from './components/ResidentsPage';
import AdminPage from './components/AdminPage';
import SinglePlaylistPage from './pages/SinglePlaylistPage';
import { UIProvider } from './contexts/UIContext';

function App() {
  const location = useLocation();
  const currentPage = location.pathname.substring(1) || 'home';

  return (
    <UIProvider>
      <Layout currentPage={currentPage} onPageChange={() => {}}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/concept" element={<ConceptHomePage />} />
          <Route path="/video" element={<Videobg />} />
          <Route path="/playlists" element={<PlaylistsPage />} />
          <Route path="/podcasts" element={<PodcastsPage />} />
          <Route path="/residents" element={<ResidentsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/playlist/:id" element={<SinglePlaylistPage />} />
          <Route path="*" element={<ConceptHomePage />} />
        </Routes>
      </Layout>
    </UIProvider>
  );
}

export default App;
