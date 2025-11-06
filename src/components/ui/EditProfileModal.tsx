import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  avatars: string[];
  selectedAvatar: string;
  onSelectAvatar: (avatarUrl: string) => void;
  currentCardBackground: string;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  children,
  avatars,
  selectedAvatar,
  onSelectAvatar,
  currentCardBackground
}) => {
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
