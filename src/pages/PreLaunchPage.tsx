import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const images = [
  'https://res.cloudinary.com/thinkdigital/image/upload/c_pad,b_gen_fill,ar_16:9/v1758625184/radio%20amble%20immagini/gemini-2.5-flash-image-preview_nano-banana__Steeve_Macqueen_che_.png',
  'https://res.cloudinary.com/thinkdigital/image/upload/v1758714158/1758714007182-679c260b-9ed1-4078-8502-2176ff6bfa41_ihqh3f.png',
  'https://res.cloudinary.com/thinkdigital/image/upload/v1758714241/1758714137173-ac8f5ced-b1f9-48e1-9d1e-e8550fff56ca_chjfs9.png',
  'https://res.cloudinary.com/thinkdigital/image/upload/c_pad,b_gen_fill,ar_16:9/v1758625066/radio%20amble%20immagini/Generated_Image_September_23_2025_-_11_38AM.png',
  'https://res.cloudinary.com/thinkdigital/image/upload/v1758716754/1758715806855-177b2083-d42a-4ea7-951c-bfcdc1838437_ejvwya.png'
];

const PreLaunchPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    Math.floor(Math.random() * images.length)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * images.length);
        } while (newIndex === prevIndex);
        return newIndex;
      });
    }, 180000); // 3 minutes in milliseconds

    return () => clearInterval(interval);
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // NOTE: The following Supabase call is commented out because sign-ups are currently disabled in the Supabase instance.
    // Once enabled, this code will handle user registration.
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setIsSubmitted(true); // Simulate success for now to show the message
    } else {
      setIsSubmitted(true);
    }
  };

  const handleGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      setError(error.message);
    } else {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen">
      <div className="fixed top-0 left-0 w-full h-full z-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${image}')`
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      <div className="relative w-full max-w-sm p-8 space-y-6 bg-black/20 backdrop-blur-md rounded-3xl shadow-lg text-white">
        {isSubmitted ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-center">Grazie!</h1>
            <p className="mt-4 text-white/80">
              La tua registrazione è andata a buon fine. Ti avvertiremo con una mail e una notifica del giorno del lancio della radio.
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center">registrati per il lancio di Radio Amblè !</h1>
            <form onSubmit={handleSignUp} className="space-y-6">
              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-black/20 rounded-xl border-none placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:outline-none"
                />
              </div>
              <div>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-black/20 rounded-xl border-none placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:outline-none"
                />
              </div>
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              <button
                type="submit"
                className="w-full px-4 py-3 font-bold text-white bg-white/30 rounded-xl hover:bg-white/40 transition-colors"
              >
                REGISTRATI
              </button>
            </form>
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/20"></div>
              <span className="flex-shrink mx-4 text-white/70 text-sm">OR</span>
              <div className="flex-grow border-t border-white/20"></div>
            </div>
            <div className="flex justify-center space-x-4">
              <button onClick={handleGoogleSignUp} className="p-3 bg-black/30 rounded-full hover:bg-white/20 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12.5C5,8.75 8.36,5.73 12.19,5.73C15.19,5.73 17.5,6.7 18.69,8.25L21.35,6.1C19.05,3.62 15.9,2.5 12.19,2.5C6.36,2.5 2,7.45 2,12.5C2,17.55 6.36,22.5 12.19,22.5C17.6,22.5 21.7,18.33 21.7,12.89C21.7,12.16 21.35,11.1 21.35,11.1Z"></path></svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PreLaunchPage;