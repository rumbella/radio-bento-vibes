import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import PageTransition from '../components/ui/PageTransition';

const UserProfilePage: React.FC = () => {
  const { user } = useAuth();

  const userName = user?.user_metadata?.full_name || 'User';
  const userAvatarUrl = user?.user_metadata?.avatar_url || 'https://randomuser.me/api/portraits/women/44.jpg';

  return (
    <PageTransition>
      <div
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576673442933-5b82b3a3c5a6?q=80&w=2592&auto=format&fit=crop')" }}
      >
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
                  src="https://images.unsplash.com/photo-1576673442933-5b82b3a3c5a6?q=80&w=2592&auto=format&fit=crop"
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
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default UserProfilePage;
