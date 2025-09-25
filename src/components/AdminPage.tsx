import React, { useState } from 'react';
import { useUIState, useUIActions } from '../contexts/UIContext';
import { HeroSlide } from './HeroSection';

const AdminPage: React.FC = () => {
  const { showVideo, videoSrc, slides } = useUIState();
  const { toggleShowVideo, setVideoSrc, setSlides } = useUIActions();

  const [localVideoSrc, setLocalVideoSrc] = useState(videoSrc);
  const [localSlides, setLocalSlides] = useState<HeroSlide[]>(slides);

  const handleVideoSave = () => {
    setVideoSrc(localVideoSrc);
    alert('Video URL saved!');
  };

  const handleSlideChange = (index: number, field: keyof HeroSlide, value: string) => {
    const updatedSlides = [...localSlides];
    updatedSlides[index] = { ...updatedSlides[index], [field]: value };
    setLocalSlides(updatedSlides);
  };

  const handleAddSlide = () => {
    setLocalSlides([
      ...localSlides,
      { id: `new-${Date.now()}`, title: '', subtitle: '', image: '', type: 'show' },
    ]);
  };

  const handleRemoveSlide = (index: number) => {
    const updatedSlides = localSlides.filter((_, i) => i !== index);
    setLocalSlides(updatedSlides);
  };

  const handleSlidesSave = () => {
    setSlides(localSlides);
    alert('Slides data saved!');
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
        <h2 className="text-xl font-semibold mb-4">Manage Slideshow Content</h2>
        <div className="space-y-4">
          {localSlides.map((slide, index) => (
            <div key={slide.id} className="p-4 border border-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Slide {index + 1}</h3>
                <button onClick={() => handleRemoveSlide(index)} className="text-red-500 hover:text-red-400">Remove</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Title" value={slide.title} onChange={(e) => handleSlideChange(index, 'title', e.target.value)} className="p-2 rounded bg-gray-700 border border-gray-600" />
                <input type="text" placeholder="Subtitle" value={slide.subtitle} onChange={(e) => handleSlideChange(index, 'subtitle', e.target.value)} className="p-2 rounded bg-gray-700 border border-gray-600" />
                <input type="text" placeholder="Image URL" value={slide.image} onChange={(e) => handleSlideChange(index, 'image', e.target.value)} className="p-2 rounded bg-gray-700 border border-gray-600 col-span-2" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
            <button onClick={handleAddSlide} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">Add New Slide</button>
            <button onClick={handleSlidesSave} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">Save All Slides</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;