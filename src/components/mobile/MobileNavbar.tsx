import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming Button component is used for the X, if not, replace with <button>

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
    setIsMenuOpen(false); // Close menu on item click
  };

  const menuItems = ["Live", "Podcast", "Palinsesto", "Chi siamo", "Contatti"];

  return (
    <div className="fixed top-[5px] left-1/2 transform -translate-x-1/2 w-[90%] z-30 md:hidden">
      {/* Main Navbar Card */}
      <div className="bg-transparent shadow-lg rounded-lg relative"> {/* Step 1: Added relative */}
        <div className="flex items-center justify-between p-2">
          {/* Step 2: New grouping div */}
          <div className="flex items-center space-x-3"> 
            {/* Logo Div with flex-shrink-0 (Step 3) */}
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6RFZ_DjLPAbpKy6YRptoo6QFCSVF3PFLNLQ&s" 
                alt="Amblé Radio" 
                className="w-full h-full object-contain" 
              />
            </div>
            {/* Text Div */}
            <div> 
              <h1 className="text-white font-bold text-xl">Amblé Radio</h1>
              <p className="text-white text-sm">Fresh Sound & Podcasts</p>
            </div>
          </div>
          {/* The Button is positioned absolutely relative to the parent "bg-transparent..." div */}
        </div>
        <Button 
          onClick={toggleMenu} 
          variant="ghost" 
          size="sm" 
          className="text-white font-medium py-1 bg-transparent px-[12px] text-base absolute top-1/2 right-2 transform -translate-y-1/2"
        >
          {isMenuOpen ? "CLOSE" : "MENU"}
        </Button>
      </div>

      {/* Slide-In Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-3/4 max-w-xs bg-neutral-800 shadow-xl p-4 transform transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button 
          onClick={toggleMenu} 
          className="absolute top-3 right-3 text-white text-2xl font-bold p-2 leading-none"
          aria-label="Close menu"
        >
          &times;
        </button>
        <div className="mt-12 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleMenuItemClick(item)}
              className="w-full text-left block px-3 py-2 text-white hover:bg-neutral-700 transition-colors text-base font-medium rounded-md"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Overlay for background click to close */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={toggleMenu}
          aria-hidden="true"
        ></div>
      )}
    </div>
  )
};

export default MobileNavbar;
