import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
  };

  const handleGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-transparent">
      <div className="w-full max-w-sm p-8 space-y-6 bg-black/20 backdrop-blur-md rounded-3xl shadow-lg text-white">
        <h1 className="text-3xl font-bold text-center">SIGN UP</h1>
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
            SIGN UP
          </button>
        </form>
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-white/20"></div>
          <span className="flex-shrink mx-4 text-white/70 text-sm">OR</span>
          <div className="flex-grow border-t border-white/20"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button onClick={handleGoogleSignUp} className="p-3 bg-black/30 rounded-full hover:bg-white/20 transition-colors">
            {/* Replace with actual icons */}
            <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12.5C5,8.75 8.36,5.73 12.19,5.73C15.19,5.73 17.5,6.7 18.69,8.25L21.35,6.1C19.05,3.62 15.9,2.5 12.19,2.5C6.36,2.5 2,7.45 2,12.5C2,17.55 6.36,22.5 12.19,22.5C17.6,22.5 21.7,18.33 21.7,12.89C21.7,12.16 21.35,11.1 21.35,11.1Z"></path></svg>
          </button>
          {/* Add other social logins similarly */}
        </div>
        <p className="text-center text-sm text-white/70">
          Already have an account?{' '}
          <a href="/login" className="font-bold text-white hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;