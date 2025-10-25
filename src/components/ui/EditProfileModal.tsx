import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  avatars: string[];
  selectedAvatar: string;
  onSelectAvatar: (avatarUrl: string) => void;
  onPageBackgroundChange: (file: File) => void;
  onCardBackgroundChange: (file: File) => void;
  currentPageBackground: string;
  currentCardBackground: string;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  children,
  avatars,
  selectedAvatar,
  onSelectAvatar,
  onPageBackgroundChange,
  onCardBackgroundChange,
  currentPageBackground,
  currentCardBackground
}) => {
  const [pagePreview, setPagePreview] = useState<string | null>(null);
  const [cardPreview, setCardPreview] = useState<string | null>(null);

  if (!isOpen) {
    return null;
  }

  const handlePageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPagePreview(URL.createObjectURL(file));
      onPageBackgroundChange(file);
    }
  };

  const handleCardFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCardPreview(URL.createObjectURL(file));
      onCardBackgroundChange(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        className="bg-black/20 backdrop-blur-md rounded-3xl shadow-lg w-full max-w-md p-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-bold mb-4">Edit Profile</h3>

        <div className="mb-6">
          <h4 className="font-semibold mb-2">Choose your avatar</h4>
          <div className="flex justify-center space-x-2">
            {avatars.map((avatar) => (
              <img
                key={avatar}
                src={avatar}
                alt="Avatar choice"
                onClick={() => onSelectAvatar(avatar)}
                className={`w-16 h-16 rounded-full object-cover cursor-pointer border-4 ${selectedAvatar === avatar ? 'border-blue-500' : 'border-transparent'}`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Upload page background</h4>
            <input
              type="file"
              onChange={handlePageFileChange}
              className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
            />
            <div className="mt-4">
              <img src={pagePreview || currentPageBackground} alt="Page background preview" className="w-full h-32 object-cover rounded-lg" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Upload card background</h4>
            <input
              type="file"
              onChange={handleCardFileChange}
              className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
            />
            <div className="mt-4">
              <img src={cardPreview || currentCardBackground} alt="Card background preview" className="w-full h-32 object-cover rounded-lg" />
            </div>
          </div>
        </div>

        {children}

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-white/10 rounded-lg font-semibold hover:bg-white/20 transition-colors"
        >
          Save & Close
        </button>
      </motion.div>
    </div>
  );
};

export default EditProfileModal;
