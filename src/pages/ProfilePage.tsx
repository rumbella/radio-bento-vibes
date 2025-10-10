import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Upload, ArrowLeft } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, loading, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    bio: '',
    date_of_birth: '',
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        username: profile.username || '',
        bio: profile.bio || '',
        date_of_birth: profile.date_of_birth || '',
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }

      setUploading(true);
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user?.id);

      if (updateError) throw updateError;

      await refreshProfile();
      toast({
        title: "Avatar aggiornato",
        description: "La tua immagine profilo è stata caricata con successo",
      });
    } catch (error: any) {
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', user?.id);

      if (error) throw error;

      await refreshProfile();
      toast({
        title: "Profilo aggiornato",
        description: "Le tue modifiche sono state salvate",
      });
    } catch (error: any) {
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-global-bg">
        <div className="text-white">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-global-bg p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2" size={20} />
          Indietro
        </Button>

        <div className="bg-black/20 backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-8">Il mio profilo</h1>

          <div className="flex flex-col items-center mb-8">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src={profile?.avatar_url || ''} />
              <AvatarFallback className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-3xl">
                {profile?.username?.[0]?.toUpperCase() || profile?.full_name?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <label htmlFor="avatar-upload">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer bg-white/10 border-white/30 text-white hover:bg-white/20"
                disabled={uploading}
                onClick={() => document.getElementById('avatar-upload')?.click()}
              >
                <Upload className="mr-2" size={16} />
                {uploading ? 'Caricamento...' : 'Cambia avatar'}
              </Button>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="full_name" className="text-white">Nome completo</Label>
              <Input
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                placeholder="Mario Rossi"
              />
            </div>

            <div>
              <Label htmlFor="username" className="text-white">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                placeholder="mario_rossi"
              />
            </div>

            <div>
              <Label htmlFor="bio" className="text-white">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/50 resize-none"
                placeholder="Raccontaci qualcosa di te..."
              />
            </div>

            <div>
              <Label htmlFor="date_of_birth" className="text-white">Data di nascita</Label>
              <Input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="bg-white/10 border-white/30 text-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold py-6 rounded-xl"
              disabled={saving}
            >
              {saving ? 'Salvataggio...' : 'Salva modifiche'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;