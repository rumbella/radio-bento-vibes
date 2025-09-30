import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import ConceptHomePage from './components/ConceptHomePage';
import Videobg from './components/Videobg';
import PlaylistsPage from './components/PlaylistsPage';
import PodcastsPage from './components/PodcastsPage';
import ResidentsPage from './components/ResidentsPage';
import AdminPage from './components/AdminPage';
import SinglePlaylistPage from './pages/SinglePlaylistPage';
import SinglePodcastPage from './pages/SinglePodcastPage';
import SingleSongPage from './pages/SingleSongPage';
import SingleEpisodePage from './pages/SingleEpisodePage';
import { UIProvider } from './contexts/UIContext';
import { PlayerProvider } from './contexts/PlayerContext';

function App() {
  const location = useLocation();
  const currentPage = location.pathname.substring(1) || 'home';

  const isDetailPage = /^\/(playlist|podcast)\//.test(location.pathname);

  return (
    <PlayerProvider>
      <UIProvider>
        {isDetailPage ? (
          <TransitionGroup>
          <CSSTransition key={location.key} classNames="page" timeout={300}>
            <Routes location={location}>
              <Route path="/playlist/:id" element={<SinglePlaylistPage />} />
              <Route path="/podcast/:id" element={<SinglePodcastPage />} />
              <Route path="/playlist/:id/song/:songId" element={<SingleSongPage />} />
              <Route path="/podcast/:id/episode/:episodeId" element={<SingleEpisodePage />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      ) : (
        <Layout currentPage={currentPage} onPageChange={() => {}}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/concept" element={<ConceptHomePage />} />
            <Route path="/video" element={<Videobg />} />
            <Route path="/playlists" element={<PlaylistsPage />} />
            <Route path="/podcasts" element={<PodcastsPage />} />
            <Route path="/residents" element={<ResidentsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<ConceptHomePage />} />
          </Routes>
        </Layout>
      )}
    </UIProvider>
  </PlayerProvider>
  );
}

export default App;
