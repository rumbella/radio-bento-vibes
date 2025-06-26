
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const MusicSidebar = () => {
  return (
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
  );
};

export default MusicSidebar;
