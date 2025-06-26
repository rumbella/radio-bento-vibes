
import { Button } from "@/components/ui/button";

const LyricsPanel = () => {
  const relatedVideos = [
    { title: "Free Mind", plays: "8.2M Plays", image: "https://res.cloudinary.com/thinkdigital/image/upload/v1748272969/pexels-pixabay-64002_to8eao.jpg" },
    { title: "Try Me", plays: "8.2M Plays", image: "https://res.cloudinary.com/thinkdigital/image/upload/v1748272969/pexels-pixabay-64002_to8eao.jpg" },
    { title: "Damages", plays: "8.2M Plays", image: "https://res.cloudinary.com/thinkdigital/image/upload/v1748272969/pexels-pixabay-64002_to8eao.jpg" },
    { title: "The Key", plays: "8.2M Plays", image: "https://res.cloudinary.com/thinkdigital/image/upload/v1748272969/pexels-pixabay-64002_to8eao.jpg" }
  ];

  return (
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
  );
};

export default LyricsPanel;
