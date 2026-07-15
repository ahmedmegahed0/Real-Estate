import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubmitLead } from '../../../../application/hooks/useLeads';

interface ProjectUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
  projectSlug: string;
  coverImage?: string;
}

export const ProjectUnlockModal: React.FC<ProjectUnlockModalProps> = ({ isOpen, onClose, projectId, projectName, projectSlug, coverImage }) => {
  const { submitLead, isSubmitting, error } = useSubmitLead();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitLead({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        projectId,
      });
      // On success, redirect to the project details page using slug
      navigate(`/projects/${projectSlug}`);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-surface flex flex-col md:flex-row shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-500 overflow-hidden rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-black/5 md:bg-white/10 hover:bg-black/10 md:hover:bg-white/20 rounded-full text-on-surface md:text-white backdrop-blur-md transition-all"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>

        {/* Left Side: Image (Hidden on small mobile) */}
        {coverImage && (
          <div className="hidden md:block md:w-1/2 relative">
            <div className="absolute inset-0 bg-black/30 z-10 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10" />
            <img 
              src={coverImage} 
              alt={projectName} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-10 left-10 right-10 z-20">
              <span className="inline-block px-3 py-1 bg-tertiary/90 text-on-tertiary font-label-caps text-[10px] uppercase tracking-[0.2em] mb-4 backdrop-blur-sm">
                Exclusive Access
              </span>
              <h3 className="font-display text-headline-lg text-white leading-tight mb-2">
                {projectName}
              </h3>
              <p className="font-body-md text-white/70">
                Register to unlock full project gallery, floor plans, and pricing details.
              </p>
            </div>
          </div>
        )}

        {/* Right Side: Form */}
        <div className={`w-full ${coverImage ? 'md:w-1/2' : ''} p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-surface`}>
          <div className="mb-10 text-center md:text-left">
            <span className="material-symbols-outlined text-tertiary text-3xl mb-4">vpn_key</span>
            <h2 className="font-display text-headline-md mb-2">Unlock Portfolio</h2>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              Provide your details to securely access the presentation for <span className="font-bold">{projectName}</span>.
            </p>
          </div>

          {error && (
            <div className="bg-error/10 text-error p-4 font-body-sm mb-6 border border-error/20 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <input 
                id="fullName"
                className="block w-full bg-transparent border-0 border-b border-outline-variant/40 py-3 text-on-surface font-body-md focus:ring-0 focus:border-tertiary transition-colors peer placeholder-transparent" 
                placeholder="Full Name" 
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              <label 
                htmlFor="fullName"
                className="absolute left-0 -top-3.5 text-on-surface-variant font-label-caps text-[10px] uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-on-surface-variant/50 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-tertiary"
              >
                Full Name
              </label>
            </div>

            <div className="relative group pt-4">
              <input 
                id="phoneNumber"
                className="block w-full bg-transparent border-0 border-b border-outline-variant/40 py-3 text-on-surface font-body-md focus:ring-0 focus:border-tertiary transition-colors peer placeholder-transparent" 
                placeholder="Phone Number" 
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
              <label 
                htmlFor="phoneNumber"
                className="absolute left-0 top-1 text-on-surface-variant font-label-caps text-[10px] uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-on-surface-variant/50 peer-placeholder-shown:top-7 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-tertiary"
              >
                Phone Number
              </label>
            </div>

            <div className="relative group pt-4">
              <input 
                id="email"
                className="block w-full bg-transparent border-0 border-b border-outline-variant/40 py-3 text-on-surface font-body-md focus:ring-0 focus:border-tertiary transition-colors peer placeholder-transparent" 
                placeholder="Email Address" 
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <label 
                htmlFor="email"
                className="absolute left-0 top-1 text-on-surface-variant font-label-caps text-[10px] uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-on-surface-variant/50 peer-placeholder-shown:top-7 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-tertiary"
              >
                Email Address
              </label>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full relative group overflow-hidden bg-on-surface text-surface py-4 mt-8 font-label-caps text-label-caps uppercase tracking-[0.2em] disabled:opacity-50 transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? 'Unlocking...' : 'Unlock Project'}
                {!isSubmitting && <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">east</span>}
              </span>
              <div className="absolute inset-0 bg-tertiary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
            </button>
            <p className="text-center font-body-sm text-on-surface-variant/60 text-[11px] mt-4">
              By unlocking, you agree to our privacy policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
