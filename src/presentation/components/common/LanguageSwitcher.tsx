import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-white hover:bg-white/10 transition-all font-['Inter'] text-sm"
    >
      <span className="material-symbols-outlined text-lg">language</span>
      <span>{i18n.language === 'ar' ? 'English' : 'العربية'}</span>
    </button>
  );
}
