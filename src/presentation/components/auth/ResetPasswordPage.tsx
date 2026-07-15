import React, { useState } from 'react';
import { useResetPassword } from '../../../application/hooks/use-reset-password';

interface ResetPasswordPageProps {
  tempToken: string;
  onSuccess: () => void;
}

export function ResetPasswordPage({ tempToken, onSuccess }: ResetPasswordPageProps) {
  const { submitResetPassword, isLoading, error } = useResetPassword();
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (newPassword !== confirmPassword) {
      setValidationError('Passwords do not match.');
      return;
    }

    if (code.length !== 6) {
      setValidationError('Please enter a valid 6-digit code.');
      return;
    }

    const success = await submitResetPassword({ tempToken, code, newPassword });
    if (success) {
      onSuccess(); // Redirect to login
    }
  };

  const displayError = validationError || error;

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
          Set New Password
        </p>
      </div>

      {displayError && (
        <div className="mb-8 p-4 border-l-2 border-[#ba1a1a] bg-[#ba1a1a]/5 text-[#ffdad6] font-['Inter'] text-xs tracking-wide">
          {displayError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="relative group">
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isLoading}
            maxLength={6}
            className="block w-full px-4 py-3 pt-6 text-[#FCFCFB] bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-[#C8A96A] focus:border-[#C8A96A] peer font-['Inter'] transition-all tracking-[0.5em]"
            placeholder=" "
            required
          />
          <label
            htmlFor="code"
            className="absolute text-[10px] tracking-[0.15em] font-semibold uppercase text-white/50 duration-300 transform -translate-y-3 top-5 left-4 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-focus:text-[#C8A96A] font-['Inter']"
          >
            6-Digit Recovery Code
          </label>
        </div>

        <div className="relative group">
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isLoading}
            className="block w-full px-4 py-3 pt-6 pr-12 text-[#FCFCFB] bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-[#C8A96A] focus:border-[#C8A96A] peer font-['Inter'] transition-all"
            placeholder=" "
            required
          />
          <label
            htmlFor="newPassword"
            className="absolute text-[10px] tracking-[0.15em] font-semibold uppercase text-white/50 duration-300 transform -translate-y-3 top-5 left-4 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-focus:text-[#C8A96A] font-['Inter']"
          >
            New Password
          </label>
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-0 top-5 text-[#6B6B6B] hover:text-[#C8A96A] focus:outline-none transition-colors"
            tabIndex={-1}
          >
            {showNewPassword ? (
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

        <div className="relative group">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            className="block w-full px-4 py-3 pt-6 pr-12 text-[#FCFCFB] bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-[#C8A96A] focus:border-[#C8A96A] peer font-['Inter'] transition-all"
            placeholder=" "
            required
          />
          <label
            htmlFor="confirmPassword"
            className="absolute text-[10px] tracking-[0.15em] font-semibold uppercase text-white/50 duration-300 transform -translate-y-3 top-5 left-4 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-focus:text-[#C8A96A] font-['Inter']"
          >
            Confirm New Password
          </label>
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-0 top-5 text-[#6B6B6B] hover:text-[#C8A96A] focus:outline-none transition-colors"
            tabIndex={-1}
          >
            {showConfirmPassword ? (
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

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading || !code || !newPassword || !confirmPassword}
            className="relative w-full overflow-hidden bg-gradient-to-r from-[#C8A96A] to-[#D4AF37] text-[#111111] font-['Inter'] font-bold text-xs tracking-[0.2em] uppercase py-4 rounded-xl hover:shadow-[0_0_20px_rgba(200,169,106,0.4)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            <span className="relative z-10">{isLoading ? 'Resetting...' : 'Confirm Reset'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
