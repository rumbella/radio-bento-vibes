import React, { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import PlaylistsPage from './components/PlaylistsPage';
import PodcastsPage from './components/PodcastsPage';
import ResidentsPage from './components/ResidentsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'playlists':
        return <PlaylistsPage />;
      case 'podcasts':
        return <PodcastsPage />;
      case 'residents':
        return <ResidentsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
