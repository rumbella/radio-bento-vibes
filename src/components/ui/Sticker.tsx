import React from 'react';
import Draggable from 'react-draggable';

interface StickerProps {
  id: number;
  imageUrl: string;
  x: number;
  y: number;
  onStop: (id: number, x: number, y: number) => void;
}

const Sticker: React.FC<StickerProps> = ({ id, imageUrl, x, y, onStop }) => {
  return (
    <Draggable
      defaultPosition={{ x, y }}
      onStop={(_, data) => onStop(id, data.x, data.y)}
    >
      <img src={imageUrl} alt="sticker" className="w-24 h-24" />
    </Draggable>
  );
};

export default Sticker;
