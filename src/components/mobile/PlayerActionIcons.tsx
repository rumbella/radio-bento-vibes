
import { Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlayerActionIconsProps {
  onLikeClick?: () => void;
  onMessageClick?: () => void;
}

const PlayerActionIcons = ({ onLikeClick, onMessageClick }: PlayerActionIconsProps) => {
  return (
    <div className="fixed bottom-[110px] right-4 flex space-x-3 z-20 md:hidden">
      <Button
        onClick={onLikeClick}
        variant="ghost"
        size="icon"
        className="w-10 h-10 bg-black/30 backdrop-blur-lg border border-white/10 text-white hover:bg-white/10 rounded-full"
      >
        <Heart className="w-5 h-5" />
      </Button>
      
      <Button
        onClick={onMessageClick}
        variant="ghost"
        size="icon"
        className="w-10 h-10 bg-black/30 backdrop-blur-lg border border-white/10 text-white hover:bg-white/10 rounded-full"
      >
        <MessageCircle className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default PlayerActionIcons;
