import React, { useState, useEffect } from 'react';
import './MobileMenu.css';
import { Button } from '@/components/ui/button'; // Import Button

const MobileMenu = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const menuItems = [
    { label: 'Live', href: '/live' },
    { label: 'Playlist', href: '/playlist' },
    { label: 'Programmi', href: '/programmi' },
    { label: 'Podcast', href: '/podcast' },
    { label: 'Chi Siamo', href: '/chi-siamo' },
    { label: 'Pagina Slideshow', href: '/program-slideshow' },
    { label: 'Pagina Video Background', href: '/sponsor-video' }
  ];

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Piccolo delay per permettere il render prima dell'animazione
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      // Delay per permettere l'animazione di uscita prima di rimuovere dal DOM
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleMenuItemClick = (href) => {
    // Naviga alla sezione
    window.location.href = href;
    handleClose();
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`mobile-menu-overlay ${isVisible ? 'visible' : ''}`}
      onClick={handleClose} // Overlay click closes
    >
      {/* Close Button - direct child of overlay */}
      <Button
        onClick={(e) => {
          e.stopPropagation(); // Prevent overlay click handler from firing as well
          handleClose();
        }}
        variant="ghost"
        size="sm"
        className="fixed top-6 right-6 text-black font-medium py-1 px-[12px] text-base z-[10000]"
      >
        - CLOSE
      </Button>

      <div
        className="mobile-menu-content"
        onClick={(e) => e.stopPropagation()} // Content click does not close
      >
        <nav className="mobile-menu-nav">
          {menuItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className="mobile-menu-item"
              style={{
                animationDelay: isVisible ? `${index * 0.1}s` : '0s',
                animationDirection: isVisible ? 'normal' : 'reverse'
              }}
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
