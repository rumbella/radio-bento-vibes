import React, { useState } from 'react';
import { useUIState, useUIActions } from '../contexts/UIContext';
import { HeroSlide } from './HeroSection';

const AdminPage: React.FC = () => {
  const { showVideo, videoSrc, slides } = useUIState();
  const { toggleShowVideo, setVideoSrc, setSlides } = useUIActions();

  const [localVideoSrc, setLocalVideoSrc] = useState(videoSrc);
  const [localSlidesJson, setLocalSlidesJson] = useState(JSON.stringify(slides, null, 2));

  const handleVideoSave = () => {
    setVideoSrc(localVideoSrc);
    alert('Video URL saved!');
  };

  const handleSlidesSave = () => {
    try {
      const parsedSlides: HeroSlide[] = JSON.parse(localSlidesJson);
      setSlides(parsedSlides);
      alert('Slides data saved!');
    } catch (error) {
      alert('Error: Invalid JSON format for slides.');
    }
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Homepage Display Mode</h2>
        <div className="flex items-center justify-between">
          <p>Current Mode: {showVideo ? 'Video Background' : 'Slideshow'}</p>
          <button
            onClick={toggleShowVideo}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Switch to {showVideo ? 'Slideshow' : 'Video'}
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Manage Video Background</h2>
        <div className="flex flex-col space-y-2">
          <label htmlFor="video-url">Video URL</label>
          <input
            id="video-url"
            type="text"
            value={localVideoSrc}
            onChange={(e) => setLocalVideoSrc(e.target.value)}
            className="p-2 rounded bg-gray-700 border border-gray-600"
          />
          <button
            onClick={handleVideoSave}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors self-start"
          >
            Save Video URL
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Manage Slideshow Content (JSON)</h2>
        <div className="flex flex-col space-y-2">
          <label htmlFor="slides-json">Slides Data</label>
          <textarea
            id="slides-json"
            value={localSlidesJson}
            onChange={(e) => setLocalSlidesJson(e.target.value)}
            className="p-2 rounded bg-gray-700 border border-gray-600 h-64 font-mono"
          />
          <button
            onClick={handleSlidesSave}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors self-start"
          >
            Save Slides Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;