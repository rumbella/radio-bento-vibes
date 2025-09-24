import React from 'react';

interface MobileTickerProps {
  content: {
    title: string;
    subtitle: string;
    show: string;
    showSubtitle: string;
  };
}

const MobileTicker: React.FC<MobileTickerProps> = ({ content }) => {
  return (
    <div className="text-white overflow-hidden w-full">
      <div className="animate-marquee whitespace-nowrap">
        <span className="mx-4 font-bold">{content.title}</span>
        <span className="mx-4">{content.subtitle}</span>
        <span className="mx-4 font-bold">{content.show}</span>
        <span className="mx-4">{content.showSubtitle}</span>
      </div>
    </div>
  );
};

export default MobileTicker;