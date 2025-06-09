import { useState } from "react";
import { Button } from "@/components/ui/button";
interface MobileNavbarProps {
  onMenuItemClick?: (item: string) => void;
}
const MobileNavbar = ({
  onMenuItemClick
}: MobileNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleMenuItemClick = (item: string) => {
    onMenuItemClick?.(item);
    setIsMenuOpen(false);
  };
  const menuItems = ["Live", "Podcast", "Palinsesto", "Chi siamo", "Contatti"];
  return <div className={isMenuOpen ? "md:hidden fixed inset-0 z-50 bg-white flex flex-col" : "md:hidden fixed top-[5px] left-1/2 transform -translate-x-1/2 w-[90%] z-30"}>
      <div className={isMenuOpen ? "flex flex-col h-full" : "bg-transparent shadow-lg rounded-lg"}>
        {/* Main navbar */}
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-2"> {/* New wrapper div */}
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6RFZ_DjLPAbpKy6YRptoo6QFCSVF3PFLNLQ&s" alt="Amblé Radio" className="w-10 h-8 object-contain" />
            </div>
            <div className="text-left"> {/* Modified text div */}
              <span className="text-white font-bold text-base">Amblé Radio</span>
              <p className="text-white/70 text-xs">Fresh Sound & Podcasts</p>
            </div>
          </div>
          
          <Button onClick={toggleMenu} variant="ghost" size="sm" className="text-white font-medium py-1 bg-transparent px-[12px] text-base">
            {isMenuOpen ? "- CLOSE" : "+ MENU"}
          </Button>
        </div>

        {/* Expandable menu */}
        {isMenuOpen && <div className="border-t border-gray-200 flex-grow overflow-y-auto">
            <div className="py-2">
              {menuItems.map((item, index) => <button key={index} onClick={() => handleMenuItemClick(item)} style={{ transitionDelay: isMenuOpen ? `${index * 75}ms` : '0ms' }} className={`w-full text-left px-4 py-4 text-gray-800 hover:bg-gray-50 text-sm font-medium border-b border-gray-200 last:border-b-0 transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                  {item}
                </button>)}
            </div>
          </div>}
      </div>
    </div>;
};
export default MobileNavbar;
