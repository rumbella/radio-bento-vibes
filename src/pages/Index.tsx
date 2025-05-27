
import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Mic, Radio, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentShow, setCurrentShow] = useState("Morning Vibes");

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-purple-900 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "https://res.cloudinary.com/thinkdigital/image/upload/v1748272969/pexels-pixabay-64002_to8eao.jpg"
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
            <img 
              src="https://images.squarespace-cdn.com/content/v1/5c94e9bd51f4d461df990539/1564051525149-H1I5HXV8ZIOCETKQK2SY/amble-logo.png?format=500w"
              alt="Amblé Radio" 
              className="w-10 h-8 object-contain"
            />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">Amblé Radio</h1>
            <p className="text-white/70 text-sm">Fresh Sound & Podcasts</p>
          </div>
        </div>
        
        <nav className="flex items-center space-x-6">
          <Button variant="ghost" className="text-white hover:bg-white/10">Live</Button>
          <Button variant="ghost" className="text-white hover:bg-white/10">Podcasts</Button>
          <Button variant="ghost" className="text-white hover:bg-white/10">Schedule</Button>
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
        </nav>
      </header>

      {/* Main Content Grid */}
      <div className="relative z-10 p-6 grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        
        {/* Current Show - Large Card */}
        <Card className="col-span-8 row-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 text-sm font-medium">LIVE NOW</span>
            </div>
            <h2 className="text-white text-4xl font-bold mb-2">{currentShow}</h2>
            <p className="text-white/70 text-lg mb-4">with Marco & Sofia</p>
            <p className="text-white/60">Wake up with the best mix of indie, electronic, and emerging artists. Live from Milano.</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </Button>
              <div className="text-white">
                <p className="text-sm opacity-70">Currently Playing</p>
                <p className="font-medium">Tame Impala - The Less I Know</p>
              </div>
            </div>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {/* Stats Cards */}
        <Card className="col-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-white/70 text-sm">Listeners</span>
          </div>
          <p className="text-white text-2xl font-bold">2,847</p>
          <p className="text-green-400 text-xs">+12% vs yesterday</p>
        </Card>

        <Card className="col-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Mic className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-white/70 text-sm">Shows Today</span>
          </div>
          <p className="text-white text-2xl font-bold">8</p>
          <p className="text-white/50 text-xs">Live & Recorded</p>
        </Card>

        {/* Schedule */}
        <Card className="col-span-3 row-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-white" />
            <h3 className="text-white font-semibold">Today's Schedule</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
              <div>
                <p className="text-white font-medium">Morning Vibes</p>
                <p className="text-white/60 text-sm">Marco & Sofia</p>
              </div>
              <div className="text-right">
                <p className="text-white text-sm">06:00 - 10:00</p>
                <div className="w-2 h-2 bg-green-500 rounded-full ml-auto"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">Tech Talk</p>
                <p className="text-white/60 text-sm">Alessandro R.</p>
              </div>
              <p className="text-white/60 text-sm">10:00 - 12:00</p>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">Lunch Beats</p>
                <p className="text-white/60 text-sm">DJ Luna</p>
              </div>
              <p className="text-white/60 text-sm">12:00 - 14:00</p>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">Afternoon Stories</p>
                <p className="text-white/60 text-sm">Giulia M.</p>
              </div>
              <p className="text-white/60 text-sm">14:00 - 16:00</p>
            </div>
          </div>
        </Card>

        {/* Popular Podcasts */}
        <Card className="col-span-5 bg-black/30 backdrop-blur-lg border-white/10 p-4">
          <h3 className="text-white font-semibold mb-4">Popular Podcasts</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-full h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-2"></div>
              <p className="text-white text-sm font-medium">Tech & Innovation</p>
              <p className="text-white/60 text-xs">24 episodes</p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-full h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg mb-2"></div>
              <p className="text-white text-sm font-medium">Culture & Arts</p>
              <p className="text-white/60 text-xs">18 episodes</p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-full h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mb-2"></div>
              <p className="text-white text-sm font-medium">Music Stories</p>
              <p className="text-white/60 text-xs">32 episodes</p>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-4 bg-black/30 backdrop-blur-lg border-white/10 p-4">
          <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                <Radio className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white text-sm">New episode available</p>
                <p className="text-white/60 text-xs">Tech & Innovation - 2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white text-sm">1000+ new followers</p>
                <p className="text-white/60 text-xs">This week</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white text-sm">Most liked show</p>
                <p className="text-white/60 text-xs">Morning Vibes - Today</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 z-20">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          
          {/* Now Playing Info */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Radio className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-medium">Tame Impala - The Less I Know</p>
              <p className="text-white/60 text-sm">Morning Vibes • Amblé Radio</p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <SkipBack className="w-5 h-5" />
            </Button>
            
            <Button 
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-white text-black hover:bg-white/90"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </Button>
            
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Volume and Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Heart className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5 text-white" />
              <div className="w-20 h-1 bg-white/20 rounded-full">
                <div className="w-12 h-full bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
