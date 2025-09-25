import React, { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import ConceptHomePage from './components/ConceptHomePage';
import Videobg from './components/Videobg';
import PlaylistsPage from './components/PlaylistsPage';
import PodcastsPage from './components/PodcastsPage';
import ResidentsPage from './components/ResidentsPage';
import AdminPage from './components/AdminPage';
import { UIProvider } from './contexts/UIContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'concept':
        return <ConceptHomePage />;
      case 'video':
        return <Videobg />;
      case 'playlists':
        return <PlaylistsPage />;
      case 'podcasts':
        return <PodcastsPage />;
      case 'residents':
        return <ResidentsPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <ConceptHomePage />;
    }
  };

  return (
    <UIProvider>
      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderPage()}
      </Layout>
    </UIProvider>
  );
}

export default App;
