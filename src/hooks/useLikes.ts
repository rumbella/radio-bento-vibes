import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface LikesData {
  totalLikes: number;
  todayLikes: number;
  hasLikedToday: boolean;
  loading: boolean;
}

const getSessionId = (): string => {
  let sessionId = localStorage.getItem('radio_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('radio_session_id', sessionId);
  }
  return sessionId;
};

export const useLikes = () => {
  const [data, setData] = useState<LikesData>({
    totalLikes: 0,
    todayLikes: 0,
    hasLikedToday: false,
    loading: true,
  });
  const { user } = useAuth();
  const { toast } = useToast();
  const sessionId = getSessionId();

  const fetchLikes = async () => {
    try {
      // Get total likes
      const { data: totalData, error: totalError } = await supabase
        .rpc('get_total_likes');
      
      if (totalError) throw totalError;

      // Get today's likes
      const { data: todayData, error: todayError } = await supabase
        .rpc('get_today_likes');
      
      if (todayError) throw todayError;

      // Check if user/session has liked today
      const today = new Date().toISOString().split('T')[0];
      
      const { data: userLike, error: checkError } = await supabase
        .from('likes')
        .select('id')
        .eq('like_date', today)
        .eq(user ? 'user_id' : 'session_id', user?.id || sessionId)
        .maybeSingle();
      
      if (checkError) throw checkError;

      setData({
        totalLikes: totalData || 0,
        todayLikes: todayData || 0,
        hasLikedToday: !!userLike,
        loading: false,
      });
    } catch (error: any) {
      console.error('Error fetching likes:', error);
      setData(prev => ({ ...prev, loading: false }));
    }
  };

  const addLike = async () => {
    try {
      const { error } = await supabase
        .from('likes')
        .insert({
          user_id: user?.id || null,
          session_id: sessionId,
        });
      
      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Hai già messo like oggi!",
            description: "Torna domani per continuare a supportare Radio Amblè",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Grazie! ❤️",
          description: "Il tuo like è stato registrato",
        });
        await fetchLikes();
      }
    } catch (error: any) {
      console.error('Error adding like:', error);
      toast({
        title: "Errore",
        description: "Non è stato possibile aggiungere il like",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchLikes();

    // Real-time updates for likes
    const channel = supabase
      .channel('likes-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'likes'
        },
        () => {
          fetchLikes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return { ...data, addLike, refetch: fetchLikes };
};