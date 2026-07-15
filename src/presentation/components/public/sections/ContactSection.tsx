import React, { useState } from 'react';
import { useSubmitLead } from '../../../../application/hooks/useLeads';
import { useSettings } from '../../../../application/hooks/useSettings';

export const ContactSection: React.FC = () => {
  const { submitLead, isSubmitting } = useSubmitLead();
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interest: 'Residential Development Launch',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);
    try {
      await submitLead({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phone,
        notes: `Interested in: ${formData.interest}`,
      });
      setSuccess(true);
      setFormData({ fullName: '', email: '', phone: '', interest: 'Residential Development Launch' });
    } catch (err: any) {
      setError(err.message || 'Failed to submit request');
    }
  };

  return (
    <section id="contact" className="py-section-gap px-margin-desktop bg-surface-container-highest max-md:px-margin-mobile">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="reveal-on-scroll">
          <h2 className="font-display text-display-lg mb-10 leading-none max-md:text-display-md">
            Ready to Lead the <span className="italic">Market?</span>
          </h2>
          <p className="font-body-lg text-on-surface-variant mb-12 max-w-lg">
            We selectively partner with developers who share our commitment to architectural excellence. Let's start the conversation.
          </p>
          <div className="space-y-8">
            <div className="flex items-center gap-6 group cursor-pointer">
              <span className="material-symbols-outlined text-tertiary">call</span>
              <span className="font-display text-headline-lg group-hover:text-tertiary transition-colors max-md:text-headline-md">
                {settings?.contactPhone || '+20 100 123 4567'}
              </span>
            </div>
            <div className="flex items-center gap-6 group cursor-pointer">
              <span className="material-symbols-outlined text-tertiary">mail</span>
              <span className="font-display text-headline-lg group-hover:text-tertiary transition-colors max-md:text-headline-md">
                {settings?.contactEmail || 'hello@creative-eye.com'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="reveal-on-scroll stagger-2">
          <form onSubmit={handleSubmit} className="bg-surface p-12 shadow-xl space-y-8 border border-outline-variant/30 max-md:p-8">
            {success && (
              <div className="bg-[#e4ffec] text-[#006e2a] p-4 font-body-md border border-[#006e2a]/20">
                Request received. Our team will contact you shortly.
              </div>
            )}
            {error && (
              <div className="bg-error-container text-on-error-container p-4 font-body-md border border-error/20">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <label className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">Your Information</label>
              <input 
                className="w-full bg-surface-container-low border-none p-5 focus:ring-1 focus:ring-tertiary font-body-md text-on-surface placeholder:text-on-surface-variant/50" 
                placeholder="Full Name" 
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              <input 
                className="w-full bg-surface-container-low border-none p-5 focus:ring-1 focus:ring-tertiary font-body-md text-on-surface placeholder:text-on-surface-variant/50" 
                placeholder="Corporate Email" 
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input 
                className="w-full bg-surface-container-low border-none p-5 focus:ring-1 focus:ring-tertiary font-body-md text-on-surface placeholder:text-on-surface-variant/50" 
                placeholder="Phone Number" 
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-4">
              <label className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">Project Interest</label>
              <select 
                className="w-full bg-surface-container-low border-none p-5 focus:ring-1 focus:ring-tertiary font-body-md text-on-surface"
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
              >
                <option>Residential Development Launch</option>
                <option>Commercial Portfolio Marketing</option>
                <option>Global Investor Acquisition</option>
                <option>Brand Identity Refinement</option>
              </select>
            </div>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-on-surface text-surface py-6 font-label-caps text-label-caps uppercase hover:bg-tertiary transition-all tracking-[0.2em] disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Request Confidential Brief'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
