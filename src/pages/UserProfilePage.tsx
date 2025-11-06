import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import PageTransition from '../components/ui/PageTransition';
import DetailNav from '../components/ui/DetailNav';
import EditProfileModal from '../components/ui/EditProfileModal';
import { supabase } from '../lib/supabaseClient';

const UserProfilePage: React.FC = () => {
  const { user, refreshUser } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardBackground, setCardBackground] = useState(user?.user_metadata?.card_background_url || 'https://placehold.co/300x300');
  const [userAvatarUrl, setUserAvatarUrl] = useState(user?.user_metadata?.avatar_url || 'https://randomuser.me/api/portraits/women/44.jpg');
  const [message, setMessage] = useState('');

  const userName = user?.user_metadata?.full_name || 'User';

  const avatars = [
    'https://res.cloudinary.com/thinkdigital/image/upload/v1761404852/d824d650-4495-4449-b2d1-8b2dc84340c0_iuwzdx.png',
    'https://res.cloudinary.com/thinkdigital/image/upload/v1761404854/d0d0846a-ffc0-4ffc-9c72-75c7a58e349d_c9lmbe.png',
    'https://res.cloudinary.com/thinkdigital/image/upload/v1761404854/2b5c1a43-e399-4e39-9efa-01ef94ad51a9_krndov.png',
    'https://res.cloudinary.com/thinkdigital/image/upload/v1761404853/614eb38f-abf9-4abf-b123-d712cfb2000b_1_q992qg.png',
    'https://res.cloudinary.com/thinkdigital/image/upload/v1761404852/cb8780e2-6981-4698-b815-cf814431a5d2_d3str7.png'
  ];

  const handleSave = async () => {
    if (!user) return;

    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        avatar_url: userAvatarUrl,
        card_background_url: userAvatarUrl,
      },
    });

    if (updateError) {
      console.error('Error updating user metadata:', updateError);
    } else {
      await refreshUser();
    }
    setIsModalOpen(false);
  };

  const handleSendMessage = async () => {
    if (!user || !message.trim()) return;

    const { error } = await supabase.from('messages').insert([{ user_id: user.id, message }]);

    if (error) {
      console.error('Error sending message:', error);
    } else {
      setMessage('');
    }
  };

  useEffect(() => {
    if (user) {
      setCardBackground(user.user_metadata?.card_background_url || 'https://placehold.co/300x300');
      setUserAvatarUrl(user.user_metadata?.avatar_url || 'https://randomuser.me/api/portraits/women/44.jpg');
    }
  }, [user]);

  return (
    <PageTransition>
      <div className="relative min-h-screen flex items-center justify-center">
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
                    <button onClick={() => setIsModalOpen(true)} className="text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83S 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="mt-4">
              <div className="bg-black/20 backdrop-blur-md rounded-3xl p-4 flex items-center">
                <input
                  type="text"
                  placeholder="Send a message..."
                  className="w-full bg-transparent border-none text-white placeholder-white/70 focus:ring-0"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="text-white" onClick={handleSendMessage}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={handleSave}
        avatars={avatars}
        selectedAvatar={userAvatarUrl}
        onSelectAvatar={setUserAvatarUrl}
        currentCardBackground={cardBackground}
      />
    </PageTransition>
  );
};

export default UserProfilePage;
