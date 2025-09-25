import React from 'react';
import { useUIState, useUIActions } from '../contexts/UIContext';

const AdminPage: React.FC = () => {
  const { showVideo } = useUIState();
  const { toggleShowVideo } = useUIActions();

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Homepage Settings</h2>
        <div className="flex items-center justify-between">
          <p>Toggle between Slideshow and Video Background</p>
          <button
            onClick={toggleShowVideo}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            {showVideo ? 'Show Slideshow' : 'Show Video'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;