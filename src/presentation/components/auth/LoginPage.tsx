import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../application/hooks/use-auth';

interface LoginPageProps {
  onSuccess: () => void;
  onNavigateToForgetPassword: () => void;
}

export function LoginPage({ onSuccess, onNavigateToForgetPassword }: LoginPageProps) {
  const { submitLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      setIsLoading(false);
      return;
    }

    const success = await submitLogin({ email, password });
    setIsLoading(false);
    
    if (success) {
      onSuccess();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <>
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-white/50 hover:text-[#C8A96A] transition-colors font-['Inter'] text-[10px] uppercase tracking-widest z-50 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Website
      </Link>

      <div className="w-full max-w-md p-10 bg-[#111111]/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]">
        <div className="mb-10 text-center flex flex-col items-center">
        <div className="w-24 h-24 mb-6 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(200,169,106,0.15)] bg-black">
          <img src="/logo.png" alt="Creative Eye Logo" className="w-full h-full object-contain" />
        </div>
        <h2 className="text-4xl font-['Playfair_Display'] text-[#C8A96A] mb-3 tracking-wide">
          Creative Eye
        </h2>
        <p className="font-['Inter'] text-xs font-medium text-[#6B6B6B] tracking-[0.2em] uppercase">
          Authorized Personnel Only
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 border-l-2 border-[#ba1a1a] bg-[#ba1a1a]/5 text-[#ffdad6] font-['Inter'] text-xs tracking-wide">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="relative group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="block w-full px-4 py-3 pt-6 text-[#FCFCFB] bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-[#C8A96A] focus:border-[#C8A96A] peer font-['Inter'] transition-all"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="absolute text-[10px] tracking-[0.15em] font-semibold uppercase text-white/50 duration-300 transform -translate-y-3 top-5 left-4 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-focus:text-[#C8A96A] font-['Inter']"
          >
            Email Address
          </label>
        </div>

        <div className="relative group">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="block w-full px-4 py-3 pt-6 pr-12 text-[#FCFCFB] bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-[#C8A96A] focus:border-[#C8A96A] peer font-['Inter'] transition-all"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="absolute text-[10px] tracking-[0.15em] font-semibold uppercase text-white/50 duration-300 transform -translate-y-3 top-5 left-4 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-focus:text-[#C8A96A] font-['Inter']"
          >
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-[18px] text-white/50 hover:text-[#C8A96A] focus:outline-none transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onNavigateToForgetPassword}
            className="text-[11px] font-['Inter'] text-white/60 hover:text-[#C8A96A] transition-colors bg-transparent border-none tracking-widest uppercase"
          >
            Forgot Password?
          </button>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full overflow-hidden bg-gradient-to-r from-[#C8A96A] to-[#D4AF37] text-[#111111] font-['Inter'] font-bold text-xs tracking-[0.2em] uppercase py-4 rounded-xl hover:shadow-[0_0_20px_rgba(200,169,106,0.4)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            <span className="relative z-10">{isLoading ? 'Authenticating...' : 'Sign In'}</span>
          </button>
        </div>
      </form>
      </div>
    </>
  );
}
