import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">Or</span>
            <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full px-4 py-2 font-bold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Sign in with Google
        </button>
        <p className="text-center">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;