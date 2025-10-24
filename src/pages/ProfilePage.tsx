import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';

const avatars = [
  'https://placehold.co/150x150/1d4ed8/white?text=Techno',
  'https://placehold.co/150x150/be185d/white?text=House',
  'https://placehold.co/150x150/16a34a/white?text=Trance',
  'https://placehold.co/150x150/eab308/white?text=Jungle',
  'https://placehold.co/150x150/9333ea/white?text=Ambient',
  'https://placehold.co/150x150/f97316/white?text=Hardcore',
];

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  useEffect(() => {
    document.body.style.backgroundImage = 'url("https://images.unsplash.com/photo-1506157786151-b8491531f063")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';

    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

  const handleAvatarUpdate = async () => {
    if (!selectedAvatar || !user) return;

    const { error } = await supabase.auth.updateUser({
      data: { avatar_url: selectedAvatar },
    });

    if (error) {
      setFeedbackMessage('Error updating avatar. Please try again.');
      console.error('Error updating avatar:', error);
    } else {
      setFeedbackMessage('Avatar updated successfully!');
      // Refresh user data if necessary, though onAuthStateChange should handle it
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="w-full max-w-4xl p-8 mx-4 space-y-8 bg-black/30 backdrop-blur-md rounded-3xl">
        <div className="flex flex-col items-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8">
          <img
            src={user?.user_metadata.avatar_url || 'https://placehold.co/150x150'}
            alt="User Avatar"
            className="w-32 h-32 rounded-full"
          />
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold font-bebas-neue">
              {user?.user_metadata.full_name || user?.email}
            </h1>
            <p className="text-lg">{user?.email}</p>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl text-center font-bebas-neue lg:text-left">Choose your avatar</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {avatars.map((avatarUrl) => (
              <img
                key={avatarUrl}
                src={avatarUrl}
                alt="Selectable Avatar"
                className={`w-full h-auto rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${
                  selectedAvatar === avatarUrl ? 'ring-4 ring-purple-500' : ''
                }`}
                onClick={() => setSelectedAvatar(avatarUrl)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center pt-4">
            <button
                onClick={handleAvatarUpdate}
                disabled={!selectedAvatar}
                className="px-6 py-2 font-bold text-white uppercase transition-colors bg-purple-600 rounded-full font-bebas-neue hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
                Save Avatar
            </button>
            {feedbackMessage && <p className="mt-4 text-center">{feedbackMessage}</p>}
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
