import { useState, useEffect, ReactNode } from "react";
import { Play, Pause, SkipBack, SkipForward, Heart, Volume2, VolumeX, Maximize, Minimize, Fullscreen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import RadioPageLayout from "@/components/layout/RadioPageLayout";
import { Program } from "./Index";

const MusicVisualizerPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    setCurrentProgram({
      id: "freefall",
      name: "Free Fall (Visualizer) (feat. J. Cole)",
      host: "Tems",
      imageUrl: "/lovable-uploads/b4c57b68-ffb5-469d-b8a8-f89176efa04e.png",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    });
  }, []);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
    setMuted(false);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const backgroundElement = (
    <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-900"></div>
  );

  const relatedVideos = [
    { title: "Free Mind", plays: "8.2M Plays", image: "https://res.cloudinary.com/thinkdigital/image/upload/v1748272969/pexels-pixabay-64002_to8eao.jpg" },
    { title: "Try Me", plays: "8.2M Plays", image: "https://res.cloudinary.com/thinkdigital/image/upload/v1748272969/pexels-pixabay-64002_to8eao.jpg" },
    { title: "Damages", plays: "8.2M Plays", image: "https://res.cloudinary.com/thinkdigital/image/upload/v1748272969/pexels-pixabay-64002_to8eao.jpg" },
    { title: "The Key", plays: "8.2M Plays", image: "https://res.cloudinary.com/thinkdigital/image/upload/v1748272969/pexels-pixabay-64002_to8eao.jpg" }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Sidebar */}
      <div className="w-20 bg-black flex flex-col items-center py-4 space-y-6">
        <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center">
          <span className="text-sm font-bold">🏠</span>
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <span className="text-xl">🔍</span>
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <span className="text-xl">📱</span>
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <span className="text-xl">📄</span>
        </div>
        <div className="w-8 h-8 bg-pink-500 flex items-center justify-center rounded">
          <Heart className="w-4 h-4" />
        </div>
        <div className="flex-1"></div>
        <div className="space-y-2">
          <div className="w-8 h-8 rounded overflow-hidden">
            <img src="https://res.cloudinary.com/thinkdigital/image/upload/v1748272969/pexels-pixabay-64002_to8eao.jpg" alt="Artist" className="w-full h-full object-cover" />
          </div>
          <div className="w-8 h-8 rounded overflow-hidden">
            <img src="https://res.cloudinary.com/thinkdigital/image/upload/v1748272969/pexels-pixabay-64002_to8eao.jpg" alt="Artist" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
          <span className="text-xs">TS</span>
        </div>
        <Button variant="ghost" size="icon" className="text-white">
          <span className="text-xl">➕</span>
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Section - Visualizer and Song Info */}
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Free Fall (Visualizer)</h1>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={toggleFullScreen} className="text-white">
                <Minimize className="w-4 h-4 mr-1" />
                {isFullScreen ? "Minimize" : "Minimize"}
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleFullScreen} className="text-white">
                <Fullscreen className="w-4 h-4 mr-1" />
                Full Screen
              </Button>
              <Button variant="ghost" size="sm" className="text-white">
                <span className="text-lg">⋯</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-white">
                <span className="text-lg">✕</span>
              </Button>
            </div>
          </div>

          {/* Main Visualizer Card */}
          <Card className="bg-gradient-to-br from-red-500 to-red-700 p-8 mb-6 rounded-2xl overflow-hidden relative">
            <div className="absolute top-4 left-4 flex space-x-2">
              <Button size="sm" className="bg-black/20 text-white hover:bg-black/30">
                <Minimize className="w-4 h-4 mr-1" />
                Minimize
              </Button>
              <Button size="sm" className="bg-black/20 text-white hover:bg-black/30">
                <Fullscreen className="w-4 h-4 mr-1" />
                Full Screen
              </Button>
            </div>
            
            <div className="flex items-center justify-center h-80">
              <img 
                src="/lovable-uploads/b4c57b68-ffb5-469d-b8a8-f89176efa04e.png" 
                alt="Artist Visualizer" 
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/50 backdrop-blur-lg rounded-lg p-4">
                <p className="text-sm opacity-70 mb-1">Song</p>
                <h2 className="text-xl font-bold mb-2">Free Fall (Visualizer) (feat. J. Cole)</h2>
                <div className="flex items-center space-x-4 text-sm opacity-70">
                  <span>👤 Tems</span>
                  <span>Born in the Wild</span>
                  <span>2024</span>
                  <span>4:15</span>
                  <span>103,254,549</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Section - Lyrics and Related Videos */}
        <div className="w-96 bg-gray-900 p-6 overflow-y-auto">
          {/* Song Lyrics */}
          <div className="mb-8">
            <div className="space-y-4 text-sm">
              <p className="text-gray-400">Send me a love that you cannot mix</p>
              <p className="text-gray-400">One is the joy that you cannot waste</p>
              <p className="text-gray-400">And the other one price that you cannot fix</p>
              <p className="text-white font-semibold">This is the peace that you cannot buy</p>
              <p className="text-white font-semibold">Finding a way where you cannot see</p>
              <p className="text-gray-400">Mind with this system we cannot pray</p>
              <p className="text-gray-400">I need to find release</p>
              <p className="text-gray-400">But behind my mind, it runs</p>
            </div>
          </div>

          {/* Related Music Videos */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-red-400">Related Music Videos</h3>
              <Button variant="ghost" size="sm" className="text-red-400">
                See All
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {relatedVideos.map((video, index) => (
                <div key={index} className="bg-black/20 rounded-lg p-2 hover:bg-black/30 transition-colors cursor-pointer">
                  <div className="aspect-square mb-2 rounded overflow-hidden">
                    <img src={video.image} alt={video.title} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs font-medium text-white">{video.title}</p>
                  <p className="text-xs text-gray-400">{video.plays}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-gray-800 p-4 z-50">
        <div className="flex items-center justify-between max-w-full mx-auto">
          {/* Current Track Info */}
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-12 h-12 rounded overflow-hidden">
              <img src="/lovable-uploads/b4c57b68-ffb5-469d-b8a8-f89176efa04e.png" alt="Current Track" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Free Fall</p>
              <p className="text-gray-400 text-xs">Tems</p>
            </div>
            <Button variant="ghost" size="icon" className="text-white">
              <Heart className="w-4 h-4" />
            </Button>
          </div>

          {/* Player Controls */}
          <div className="flex items-center space-x-6 flex-1 justify-center">
            <Button variant="ghost" size="icon" className="text-white">
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button onClick={togglePlay} className="w-10 h-10 rounded-full bg-white text-black hover:bg-white/90">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress and Volume */}
          <div className="flex items-center space-x-4 flex-1 justify-end">
            <span className="text-xs text-gray-400">0:10</span>
            <Slider
              value={[30]}
              max={100}
              step={1}
              className="w-32 h-1 bg-gray-600 rounded-full"
            />
            <span className="text-xs text-gray-400">-3:24</span>
            <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white">
              {muted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Slider
              value={[muted ? 0 : volume * 100]}
              onValueChange={(value) => handleVolumeChange([value[0] / 100])}
              max={100}
              step={1}
              className="w-20 h-1 bg-gray-600 rounded-full"
            />
            <Button variant="ghost" size="icon" className="text-white">
              <Fullscreen className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicVisualizerPage;
