import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubmitLead } from '../../application/hooks/useSubmitLead';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

export function LeadFormModal({ isOpen, onClose, projectId }: LeadFormModalProps) {
  const navigate = useNavigate();
  const { submitLead, isLoading, error } = useSubmitLead();

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitLead({
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      projectId: projectId,
    });

    if (success) {
      // 201 Created -> navigate to project details
      navigate(`/projects/${projectId}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with Glassmorphism blur (20px+) and 10% opacity white fill */}
      <div 
        className="absolute inset-0 bg-white/10 backdrop-blur-[20px]"
        onClick={onClose}
      />
      
      {/* Modal Container: Sharp corners, Warm White, Minimalist Outline */}
      <div className="relative z-10 w-full max-w-md bg-[#FCFCFB] p-10 border border-[#6B6B6B]/20 rounded-none shadow-2xl">
        
        {/* Header - Playfair Display, oversized */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-['Playfair_Display'] text-[#111111] mb-2 tracking-tight">
            Register Interest
          </h2>
          <p className="font-['Inter'] text-sm font-light text-[#6B6B6B]">
            Exclusive details for a curated lifestyle.
          </p>
        </div>

        {/* Global Error Display */}
        {error && (
          <div className="mb-6 p-4 border border-[#ba1a1a]/30 bg-[#ffdad6] text-[#93000a] font-['Inter'] text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Input Group: Minimalist, bottom border only, floating label in all-caps */}
          <div className="relative group">
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={isLoading}
              className="block w-full px-0 py-2 pt-5 text-[#111111] bg-transparent border-0 border-b border-[#6B6B6B] appearance-none focus:outline-none focus:ring-0 focus:border-[#C8A96A] peer font-['Inter'] rounded-none"
              placeholder=" "
              required
            />
            <label
              htmlFor="fullName"
              className="absolute text-xs tracking-[0.1em] font-semibold uppercase text-[#6B6B6B] duration-300 transform -translate-y-4 top-4 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-[#C8A96A] font-['Inter']"
            >
              Full Name
            </label>
          </div>

          <div className="relative group">
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={isLoading}
              className="block w-full px-0 py-2 pt-5 text-[#111111] bg-transparent border-0 border-b border-[#6B6B6B] appearance-none focus:outline-none focus:ring-0 focus:border-[#C8A96A] peer font-['Inter'] rounded-none"
              placeholder=" "
              required
            />
            <label
              htmlFor="phoneNumber"
              className="absolute text-xs tracking-[0.1em] font-semibold uppercase text-[#6B6B6B] duration-300 transform -translate-y-4 top-4 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-[#C8A96A] font-['Inter']"
            >
              Phone Number
            </label>
          </div>

          <div className="relative group">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              className="block w-full px-0 py-2 pt-5 text-[#111111] bg-transparent border-0 border-b border-[#6B6B6B] appearance-none focus:outline-none focus:ring-0 focus:border-[#C8A96A] peer font-['Inter'] rounded-none"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute text-xs tracking-[0.1em] font-semibold uppercase text-[#6B6B6B] duration-300 transform -translate-y-4 top-4 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-[#C8A96A] font-['Inter']"
            >
              Email (Optional)
            </label>
          </div>

          {/* Submit Button: Champagne Gold, Sharp corners, Black text */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C8A96A] text-[#111111] font-['Inter'] font-semibold text-xs tracking-[0.1em] uppercase py-4 rounded-none hover:scale-[1.02] transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? 'Submitting...' : 'Request Details'}
            </button>
          </div>

          {/* Cancel button: Ghost style */}
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="text-xs tracking-[0.1em] font-semibold uppercase text-[#6B6B6B] hover:text-[#111111] transition-colors duration-300 font-['Inter'] bg-transparent border-none"
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
