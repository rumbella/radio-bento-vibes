
import { Minimize, Fullscreen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MusicVisualizerProps {
  isFullScreen: boolean;
  toggleFullScreen: () => void;
}

const MusicVisualizer = ({ isFullScreen, toggleFullScreen }: MusicVisualizerProps) => {
  return (
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
  );
};

export default MusicVisualizer;
