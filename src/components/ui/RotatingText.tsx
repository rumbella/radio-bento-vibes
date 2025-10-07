import React from 'react';

interface RotatingTextProps {
  text1: string;
  text2: string;
  className?: string;
}

const RotatingText: React.FC<RotatingTextProps> = ({ text1, text2, className }) => {
  return (
    <div className={className}>
      <span>{text1} {text2}</span>
    </div>
  );
};

export default RotatingText;