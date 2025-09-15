import React, { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import VideoHomePage from './components/VideoHomePage';
import PlaylistsPage from './components/PlaylistsPage';
import PodcastsPage from './components/PodcastsPage';
import ResidentsPage from './components/ResidentsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <VideoHomePage />;
      case 'playlists':
        return <PlaylistsPage />;
      case 'podcasts':
        return <PodcastsPage />;
      case 'residents':
        return <ResidentsPage />;
      default:
        return <VideoHomePage />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
