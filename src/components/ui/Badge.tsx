import React from 'react';

interface BadgeProps {
  text: string;
}

const Badge: React.FC<BadgeProps> = ({ text }) => {
  return (
    <div className="absolute top-4 right-4 bg-yellow-400 text-black rounded-full w-24 h-24 flex items-center justify-center transform rotate-12">
      <p className="font-bold text-center text-sm">{text}</p>
    </div>
  );
};

export default Badge;
