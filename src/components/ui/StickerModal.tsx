import React from 'react';
import { motion } from 'framer-motion';

interface StickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSticker: (imageUrl: string) => void;
}

const stickers = [
  'https://res.cloudinary.com/thinkdigital/image/upload/v1761035884/maskable-icon_bouqpq.png',
];

const StickerModal: React.FC<StickerModalProps> = ({ isOpen, onClose, onSelectSticker }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        className="bg-black/20 backdrop-blur-md rounded-3xl shadow-lg w-full max-w-md p-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-bold mb-4">Choose a Sticker</h3>
        <div className="grid grid-cols-4 gap-4">
          {stickers.map((sticker) => (
            <div
              key={sticker}
              className="p-2 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20"
              onClick={() => {
                onSelectSticker(sticker);
                onClose();
              }}
            >
              <img src={sticker} alt="Sticker" className="w-full h-full object-contain" />
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-white/10 rounded-lg font-semibold hover:bg-white/20 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default StickerModal;
