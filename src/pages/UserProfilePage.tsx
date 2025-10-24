import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import PageTransition from '../components/ui/PageTransition';
import DetailNav from '../components/ui/DetailNav';

const UserProfilePage: React.FC = () => {
  const { user } = useAuth();

  const [pageBackground, setPageBackground] = useState('https://placehold.co/1200x1200');
  const [cardBackground, setCardBackground] = useState('https://placehold.co/300x300');

  const userName = user?.user_metadata?.full_name || 'User';
  const userAvatarUrl = user?.user_metadata?.avatar_url || 'https://randomuser.me/api/portraits/women/44.jpg';

  const handleEditClick = () => {
    const newPageBackground = window.prompt("Enter new page background URL:", pageBackground);
    if (newPageBackground) {
      setPageBackground(newPageBackground);
    }

    const newCardBackground = window.prompt("Enter new card background URL:", cardBackground);
    if (newCardBackground) {
      setCardBackground(newCardBackground);
    }
  };

  return (
    <PageTransition>
      <div
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('${pageBackground}')` }}
      >
        <DetailNav title="" />
        <div className="pt-16">
          <div className="relative w-full max-w-sm mx-auto">
            <motion.div
              className="bg-black/20 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6">
                <div className="relative">
                  <img
                    src={cardBackground}
                    alt="Profile background"
                    className="rounded-3xl w-full h-64 object-cover"
                  />
                </div>

                <div className="relative -mt-16 p-4">
                  <div className="flex items-center justify-between bg-black/20 backdrop-blur-md rounded-full p-2">
                    <div className="flex items-center space-x-3">
                      <img
                        src={userAvatarUrl}
                        alt={userName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white"
                      />
                      <div>
                        <h2 className="text-white text-lg font-bold">{userName}</h2>
                      </div>
                    </div>
                    <button onClick={handleEditClick} className="text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default UserProfilePage;
