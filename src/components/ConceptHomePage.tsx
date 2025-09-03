import React from 'react';
import { usePlayerState, usePlayerActions } from '@/contexts/PlayerContext';
import { Play, Pause, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const ConceptHomePage: React.FC = () => {
  const { isPlaying } = usePlayerState();
  const { togglePlay } = usePlayerActions();

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* Full Background Image */}
      <div 
        className="flex-1 bg-cover bg-center bg-no-repeat relative lg:absolute lg:inset-0"
        style={{
          backgroundImage: `url('/concept-bg.jpg')`
        }}
      >
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Desktop Player Sidebar */}
      <div className="hidden lg:flex lg:w-1/3 lg:relative lg:z-10">
        <div className="w-full bg-black/50 backdrop-blur-md p-6 flex flex-col justify-center">
          <div className="text-center space-y-4">
            <div>
              <p className="text-white font-semibold text-lg">Suono al Quadrato</p>
              <p className="text-gray-400 text-sm">Free Fall - Tems</p>
            </div>
            
            {/* Player Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-gray-300">
                <Heart className="w-5 h-5" />
              </Button>
              <Button 
                onClick={togglePlay} 
                className="w-12 h-12 rounded-full bg-white text-black hover:bg-white/90"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-gray-300">
                <MessageCircle className="w-5 h-5" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Slider
                value={[30]}
                max={100}
                step={1}
                className="w-full h-1 bg-gray-600 rounded-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>0:10</span>
                <span>3:24</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Player */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-gray-800 p-4 z-50">
        <div className="flex items-center justify-between">
          {/* Program Info */}
          <div className="flex-1">
            <p className="text-white font-medium text-sm">Suono al Quadrato</p>
            <p className="text-gray-400 text-xs">Free Fall - Tems</p>
          </div>

          {/* Player Controls */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white">
              <Heart className="w-4 h-4" />
            </Button>
            <Button onClick={togglePlay} className="w-10 h-10 rounded-full bg-white text-black hover:bg-white/90">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress */}
          <div className="flex-1 flex justify-end">
            <div className="w-20">
              <Slider
                value={[30]}
                max={100}
                step={1}
                className="h-1 bg-gray-600 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptHomePage;