import React, { useState } from 'react';
import { useForgetPassword } from '../../../application/hooks/use-forget-password';

interface ForgetPasswordPageProps {
  onBackToLogin: () => void;
  onSuccess: () => void; // move to reset password stage
}

export function ForgetPasswordPage({ onBackToLogin, onSuccess }: ForgetPasswordPageProps) {
  const { submitForgetPassword, isLoading, error } = useForgetPassword();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const success = await submitForgetPassword(email);
    if (success) {
      onSuccess();
    }
  };

  return (
    <div className="w-full max-w-md p-10 bg-[#111111]/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]">
      <div className="mb-10 text-center flex flex-col items-center">
        <div className="w-20 h-20 mb-6 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(200,169,106,0.15)] bg-black">
          <img src="/logo.png" alt="Creative Eye Logo" className="w-full h-full object-contain" />
        </div>
        <h2 className="text-3xl font-['Playfair_Display'] text-[#C8A96A] mb-3 tracking-wide">
          Creative Eye
        </h2>
        <p className="font-['Inter'] text-xs font-medium text-[#6B6B6B] tracking-[0.2em] uppercase">
          Recover Account Access
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

        <div className="flex justify-start">
          <button
            type="button"
            onClick={onBackToLogin}
            disabled={isLoading}
            className="text-[11px] font-['Inter'] text-white/60 hover:text-[#C8A96A] transition-colors bg-transparent border-none tracking-widest uppercase"
          >
            ← Back to Login
          </button>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading || !email}
            className="relative w-full overflow-hidden bg-gradient-to-r from-[#C8A96A] to-[#D4AF37] text-[#111111] font-['Inter'] font-bold text-xs tracking-[0.2em] uppercase py-4 rounded-xl hover:shadow-[0_0_20px_rgba(200,169,106,0.4)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            <span className="relative z-10">{isLoading ? 'Sending...' : 'Send Recovery Code'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
