import React, { useState, useEffect } from 'react';
import { useSettings } from '../../../application/hooks/useSettings';
import { ImageDropzoneInput } from '../upload/ImageDropzoneInput';
import { useTranslation } from 'react-i18next';

export function SettingsPage() {
  const { t } = useTranslation();
  const { settings, isLoading, isUpdating, error, updateSettings } = useSettings();
  const [formData, setFormData] = useState({
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    contactPhone: '',
    whatsappNumber: '',
    logoUrl: '',
    maintenanceMode: false,
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        siteName: settings.siteName || '',
        siteDescription: settings.siteDescription || '',
        contactEmail: settings.contactEmail || '',
        contactPhone: settings.contactPhone || '',
        whatsappNumber: settings.whatsappNumber || '',
        logoUrl: settings.logoUrl || '',
        maintenanceMode: settings.maintenanceMode || false,
      });
    }
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLogoUploadSuccess = (url: string) => {
    setFormData(prev => ({ ...prev, logoUrl: url }));
  };

  const handleLogoRemove = () => {
    setFormData(prev => ({ ...prev, logoUrl: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(false);
    const success = await updateSettings(formData);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-40">
        <div className="w-8 h-8 border-2 border-[#C8A96A]/20 border-t-[#C8A96A] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] text-white mb-2">{t('settingsPage.title')}</h2>
        <p className="text-xs md:text-sm font-['Inter'] text-white/40 tracking-wide">{t('settingsPage.subtitle')}</p>
      </div>

      <div className="bg-[#1a1a1a]/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8A96A]/5 rounded-full blur-[80px] pointer-events-none" />

        {error && (
          <div className="mb-8 p-4 border-l-4 border-red-500/50 bg-red-500/10 text-red-400 rounded-r-xl text-sm font-medium flex items-center space-x-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <span>{error}</span>
          </div>
        )}

        {saveSuccess && (
          <div className="mb-8 p-4 border-l-4 border-green-500/50 bg-green-500/10 text-green-400 rounded-r-xl text-sm font-medium flex items-center space-x-3 animate-in slide-in-from-top-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <span>{t('settingsPage.saveSuccess')}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-10">
              <div className="relative group">
                <input required type="text" name="siteName" id="siteName" placeholder=" " value={formData.siteName} onChange={handleChange} className="block w-full px-0 py-3 pt-6 text-white bg-transparent border-0 border-b border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-[#C8A96A] peer transition-colors" />
                <label htmlFor="siteName" className="absolute text-[10px] tracking-[0.2em] font-semibold uppercase text-white/40 duration-300 transform -translate-y-4 top-5 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-[#C8A96A]">{t('settingsPage.siteName')}</label>
              </div>

              <div className="relative group">
                <textarea required name="siteDescription" id="siteDescription" placeholder=" " value={formData.siteDescription} onChange={handleChange} rows={4} className="block w-full px-0 py-3 pt-6 text-white bg-transparent border-0 border-b border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-[#C8A96A] peer transition-colors resize-none" />
                <label htmlFor="siteDescription" className="absolute text-[10px] tracking-[0.2em] font-semibold uppercase text-white/40 duration-300 transform -translate-y-4 top-5 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-[#C8A96A]">{t('settingsPage.siteDescription')}</label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="relative group">
                  <input required type="email" name="contactEmail" id="contactEmail" placeholder=" " value={formData.contactEmail} onChange={handleChange} className="block w-full px-0 py-3 pt-6 text-white bg-transparent border-0 border-b border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-[#C8A96A] peer transition-colors" />
                  <label htmlFor="contactEmail" className="absolute text-[10px] tracking-[0.2em] font-semibold uppercase text-white/40 duration-300 transform -translate-y-4 top-5 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-[#C8A96A]">{t('settingsPage.contactEmail')}</label>
                </div>
                <div className="relative group">
                  <input required type="text" name="contactPhone" id="contactPhone" placeholder=" " value={formData.contactPhone} onChange={handleChange} className="block w-full px-0 py-3 pt-6 text-white bg-transparent border-0 border-b border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-[#C8A96A] peer transition-colors" />
                  <label htmlFor="contactPhone" className="absolute text-[10px] tracking-[0.2em] font-semibold uppercase text-white/40 duration-300 transform -translate-y-4 top-5 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-[#C8A96A]">{t('settingsPage.contactPhone')}</label>
                </div>
              </div>

              <div className="relative group">
                <input required type="text" name="whatsappNumber" id="whatsappNumber" placeholder=" " value={formData.whatsappNumber} onChange={handleChange} className="block w-full px-0 py-3 pt-6 text-white bg-transparent border-0 border-b border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-[#C8A96A] peer transition-colors" />
                <label htmlFor="whatsappNumber" className="absolute text-[10px] tracking-[0.2em] font-semibold uppercase text-white/40 duration-300 transform -translate-y-4 top-5 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-[#C8A96A]">{t('settingsPage.whatsappNumber')}</label>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <ImageDropzoneInput 
                  label={t('settingsPage.websiteLogo')}
                  onUploadSuccess={handleLogoUploadSuccess}
                  onRemove={handleLogoRemove}
                  currentImageUrl={formData.logoUrl}
                />
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-white text-sm font-semibold mb-1">{t('settingsPage.maintenanceMode')}</h4>
                  <p className="text-white/40 text-xs">{t('settingsPage.maintenanceDesc')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="maintenanceMode" 
                    checked={formData.maintenanceMode} 
                    onChange={handleChange} 
                    className="sr-only peer" 
                  />
                  <div className="w-14 h-7 bg-black/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#C8A96A] border border-white/20 transition-colors duration-300"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex justify-end">
            <button 
              type="submit" 
              disabled={isUpdating} 
              className="px-10 py-4 bg-gradient-to-r from-[#C8A96A] to-[#E5D09C] text-black font-['Inter'] font-bold text-[10px] uppercase tracking-[0.3em] rounded-xl hover:shadow-[0_0_30px_rgba(200,169,106,0.4)] transition-all duration-300 disabled:opacity-50 disabled:grayscale flex items-center space-x-3 group"
            >
              {isUpdating && <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />}
              <span>{isUpdating ? t('settingsPage.saving') : t('settingsPage.saveSettings')}</span>
              {!isUpdating && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
