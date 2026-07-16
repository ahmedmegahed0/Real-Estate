import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../../application/hooks/useSettings';

export const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    notes: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);
    setError(null);
    try {
      const response = await fetch('https://formsubmit.co/ajax/ahmedmegahed580@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: formData.fullName,
          Phone: formData.phoneNumber,
          Email: formData.email || 'No email provided',
          Message: formData.notes || 'No message provided',
          _subject: 'New Contact Form Submission - Creative Eye'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSuccess(true);
      setFormData({ fullName: '', phoneNumber: '', email: '', notes: '' });
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md relative overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-tertiary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="relative z-10 pt-40 pb-24 min-h-screen flex flex-col justify-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Contact Info & Text */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            <p className="font-label-caps text-[11px] text-tertiary uppercase tracking-[0.3em] mb-4">{t('contactPage.getInTouch')}</p>
            <h1 className="font-display text-display-md md:text-display-lg leading-tight mb-6">
              {t('contactPage.title')} <br />
              <span className="italic text-tertiary font-light">{t('contactPage.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-on-surface-variant font-light leading-relaxed mb-12 max-w-lg">
              {t('contactPage.description')}
            </p>

            <div className="space-y-8">
              {settings?.contactEmail && (
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center bg-surface-container/50">
                    <span className="material-symbols-outlined text-tertiary">mail</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">{t('footer.emailUs')}</p>
                    <a href={`mailto:${settings.contactEmail}`} className="text-lg font-light hover:text-tertiary transition-colors">{settings.contactEmail}</a>
                  </div>
                </div>
              )}
              {settings?.contactPhone && (
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center bg-surface-container/50">
                    <span className="material-symbols-outlined text-tertiary">call</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">{t('footer.callUs')}</p>
                    <a href={`tel:${settings.contactPhone}`} className="text-lg font-light hover:text-tertiary transition-colors" dir="ltr">{settings.contactPhone}</a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-surface-container-low/30 backdrop-blur-xl border border-outline-variant/20 rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
            {success ? (
              <div className="text-center py-16 animate-in zoom-in duration-500">
                <div className="w-20 h-20 mx-auto rounded-full bg-tertiary/20 flex items-center justify-center mb-6 border border-tertiary/30">
                  <span className="material-symbols-outlined text-tertiary text-4xl">check_circle</span>
                </div>
                <h3 className="font-display text-3xl mb-4 text-tertiary">{t('contactPage.successTitle')}</h3>
                <p className="text-on-surface-variant font-light">{t('contactPage.successMessage')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="bg-error/10 text-error p-4 font-body-sm border border-error/20 rounded-lg">
                    {error}
                  </div>
                )}
                
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-on-surface-variant font-label-caps text-[10px] uppercase tracking-widest">
                    {t('unlockModal.fullName')} *
                  </label>
                  <input 
                    id="fullName"
                    className="block w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-lg py-3 px-4 text-on-surface font-body-lg focus:ring-1 focus:ring-tertiary focus:border-tertiary transition-colors" 
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="phoneNumber" className="block text-on-surface-variant font-label-caps text-[10px] uppercase tracking-widest">
                      {t('unlockModal.phoneNumber')} *
                    </label>
                    <input 
                      id="phoneNumber"
                      className="block w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-lg py-3 px-4 text-on-surface font-body-lg focus:ring-1 focus:ring-tertiary focus:border-tertiary transition-colors rtl:text-right" 
                      type="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-on-surface-variant font-label-caps text-[10px] uppercase tracking-widest">
                      {t('unlockModal.email')}
                    </label>
                    <input 
                      id="email"
                      className="block w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-lg py-3 px-4 text-on-surface font-body-lg focus:ring-1 focus:ring-tertiary focus:border-tertiary transition-colors" 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="notes" className="block text-on-surface-variant font-label-caps text-[10px] uppercase tracking-widest">
                    {t('contactPage.message')}
                  </label>
                  <textarea 
                    id="notes"
                    rows={4}
                    className="block w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-lg py-3 px-4 text-on-surface font-body-lg focus:ring-1 focus:ring-tertiary focus:border-tertiary transition-colors resize-none" 
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative group overflow-hidden bg-on-surface text-surface py-5 mt-6 font-label-caps text-[12px] uppercase tracking-[0.2em] disabled:opacity-50 transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] rounded-sm"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? t('contactPage.sending') : t('contactPage.send')}
                    {!isSubmitting && <span className="material-symbols-outlined text-sm group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform">east</span>}
                  </span>
                  <div className="absolute inset-0 bg-tertiary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rtl:origin-right duration-500 ease-out" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
