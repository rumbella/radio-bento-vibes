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
  return <div className="fixed top-[5px] left-1/2 transform -translate-x-1/2 w-[90%] z-30 md:hidden">
      <div className={`bg-white shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? "rounded-t-lg rounded-b-lg" : "rounded-lg"}`}>
        {/* Main navbar */}
        <div className="flex items-center justify-between p-2">
          <div className="w-8 h-8">
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6RFZ_DjLPAbpKy6YRptoo6QFCSVF3PFLNLQ&s" alt="Amblé Radio" className="w-10 h-8 object-contain" />
          
          <div className="flex-1 text-center px-2">
              <div>
              <h1 className="text-white font-bold text-xl">Amblé Radio</h1>
              <p className="text-white/70 text-sm">Fresh Sound & Podcasts</p>
            </div>
          </div>
          
          <Button onClick={toggleMenu} variant="ghost" size="sm" className="text-gray-800 font-medium py-1 bg-transparent px-[12px] text-base">
            {isMenuOpen ? "- CLOSE" : "+ MENU"}
          </Button>
        </div>

        {/* Expandable menu */}
        {isMenuOpen && <div className="border-t border-gray-200 bg-white rounded-b-lg">
            <div className="py-2">
              {menuItems.map((item, index) => <button key={index} onClick={() => handleMenuItemClick(item)} className="w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors text-sm font-medium">
                  {item}
                </button>)}
            </div>
          </div>}
      </div>
    </div>;
};
export default MobileNavbar;
