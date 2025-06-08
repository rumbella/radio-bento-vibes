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
    setIsMenuOpen(false); // Close menu on item click
  };

  const menuItems = ["Live", "Podcast", "Palinsesto", "Chi siamo", "Contatti"];

  return (
    <div className="fixed top-[5px] left-1/2 transform -translate-x-1/2 w-[90%] z-30 md:hidden">
      {/* Main Navbar Card */}
      <div className="bg-transparent shadow-lg rounded-lg relative">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6RFZ_DjLPAbpKy6YRptoo6QFCSVF3PFLNLQ&s"
                alt="Amblé Radio"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">Amblé Radio</h1>
              <p className="text-white text-sm">Fresh Sound & Podcasts</p>
            </div>
          </div>
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

      {/* Full-Page Slide-In Menu */}
      <div
        className={`fixed inset-0 bg-white shadow-xl p-4 transform transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={toggleMenu} // Click on background closes menu
      >
        {/* Content wrapper to prevent click propagation */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full h-full flex flex-col items-center justify-center" // Centering content
        >
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-neutral-800 text-3xl font-bold p-2 leading-none" // Adjusted styling for visibility
            aria-label="Close menu"
          >
            &times;
          </button>

          {/* Menu Items Container */}
          <div className="mt-12 space-y-4 text-center"> {/* Centered text for menu items */}
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuItemClick(item)}
                className="w-full block text-left px-6 py-5 text-neutral-800 hover:bg-neutral-100 transition-colors text-xl font-semibold border-b border-gray-300"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-center py-4"> {/* Wrapper for centering and top margin */}
            <button
              onClick={toggleMenu}
              className="py-3 px-8 bg-neutral-200 text-neutral-800 font-semibold rounded-lg hover:bg-neutral-300 transition-colors"
            >
              Chiudi
            </button>
          </div>
        </div>
      </div>
      {/* Old overlay is removed */}
    </div>
  )
};

export default MobileNavbar;
