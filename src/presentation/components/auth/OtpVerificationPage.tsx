import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../application/hooks/use-auth';
import { useTranslation } from 'react-i18next';

export function OtpVerificationPage() {
  const { t } = useTranslation();
  const { submitOtp, triggerResendOtp } = useAuth();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    // Keep only the last char if they pasted or typed multiple
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);
    
    // Auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalCode = code.join('');
    if (finalCode.length < 6) {
      setError(t('otp.invalidLength'));
      return;
    }

    setIsLoading(true);
    setError('');
    
    const success = await submitOtp(finalCode);
    if (!success) {
      setError(t('otp.invalidCode'));
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError('');
    const success = await triggerResendOtp();
    if (success) {
      setCountdown(60);
    } else {
      setError(t('otp.resendFailed'));
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md p-10 bg-[#111111]/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]">
      <div className="mb-10 text-center flex flex-col items-center">
        <div className="w-20 h-20 mb-6 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(200,169,106,0.15)] bg-black">
          <img src="/logo.png" alt="Creative Eye Logo" className="w-full h-full object-contain" />
        </div>
        <h2 className="text-3xl font-['Playfair_Display'] text-[#C8A96A] mb-3 tracking-wide">
          {t('otp.title')}
        </h2>
        <p className="font-['Inter'] text-xs font-medium text-[#6B6B6B] tracking-[0.2em] uppercase">
          {t('otp.subtitle')}
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 border-l-2 border-[#ba1a1a] bg-[#ba1a1a]/5 text-[#ffdad6] font-['Inter'] text-xs tracking-wide">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-between gap-2" dir="ltr">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={isLoading}
              className="w-12 h-14 text-center text-2xl text-[#FCFCFB] bg-white/5 backdrop-blur-sm border border-white/10 focus:outline-none focus:border-[#C8A96A] focus:ring-1 focus:ring-[#C8A96A] rounded-xl font-['Inter'] transition-all"
            />
          ))}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading || code.some((d) => d === '')}
            className="relative w-full overflow-hidden bg-gradient-to-r from-[#C8A96A] to-[#D4AF37] text-[#111111] font-['Inter'] font-bold text-xs tracking-[0.2em] rtl:tracking-normal uppercase py-4 rounded-xl hover:shadow-[0_0_20px_rgba(200,169,106,0.4)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            <span className="relative z-10">{isLoading ? t('otp.verifying') : t('otp.verifyAccess')}</span>
          </button>
        </div>

        <div className="mt-8 text-center border-t border-white/10 pt-6">
          <p className="text-[11px] tracking-wider text-white/50 font-['Inter'] mb-3 uppercase">
            {t('otp.didNotReceive')}
          </p>
          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0}
            className="text-[11px] font-bold text-[#C8A96A] hover:text-white transition-colors bg-transparent border-none uppercase tracking-[0.15em] rtl:tracking-normal disabled:opacity-50 disabled:hover:text-[#C8A96A]"
          >
            {countdown > 0 ? t('otp.resendIn', { seconds: countdown }) : t('otp.resendCode')}
          </button>
        </div>
      </form>
    </div>
  );
}
