import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useSettings } from '../../../application/hooks/useSettings';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { useAuth } from '../../../application/hooks/use-auth';

export const ClientLayout: React.FC = () => {
  const { settings, isLoading } = useSettings();
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isProjectDetailsPage = location.pathname.startsWith('/projects/');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return <div className="min-h-screen bg-surface flex items-center justify-center text-on-surface">Loading...</div>;
  }

  const siteName = settings?.siteName || 'CREATIVE EYE';
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col font-body text-on-surface bg-surface selection:bg-tertiary-fixed selection:text-on-tertiary-fixed">
      {/* Premium Floating Navbar */}
      <header
        id="main-nav"
        className="fixed w-full z-50 top-6 px-4 flex justify-center transition-all duration-700"
      >
        <div className={`flex justify-between items-center w-full max-w-5xl rounded-full px-8 transition-all duration-700 ${
          scrolled 
            ? 'py-4 bg-surface/95 backdrop-blur-2xl border border-outline-variant/30 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]' 
            : 'py-5 bg-surface/70 backdrop-blur-md border border-white/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]'
        }`}>
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Creative Eye" className="h-8 md:h-10 w-auto" />
          </Link>
          <nav className="hidden md:flex gap-6 lg:gap-10 items-center">
            <Link to="/projects" className="text-[10px] rtl:text-[14px] rtl:font-bold font-label-caps uppercase tracking-[0.2em] rtl:tracking-normal text-on-surface hover:text-tertiary transition-colors">{t('nav.projects')}</Link>
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-[10px] rtl:text-[14px] rtl:font-bold font-label-caps uppercase tracking-[0.2em] rtl:tracking-normal text-on-surface-variant hover:text-tertiary transition-colors">{t('nav.admin')}</Link>
            <LanguageSwitcher />
          </nav>
          <Link
            to="/contact"
            className={`font-label-caps text-[10px] rtl:text-[14px] rtl:font-bold uppercase tracking-[0.2em] rtl:tracking-normal transition-all duration-500 max-md:hidden ${
              scrolled 
                ? 'bg-on-surface text-surface px-8 py-3 rounded-full hover:bg-tertiary hover:scale-105 shadow-xl' 
                : 'border border-outline-variant px-8 py-3 hover:border-tertiary hover:text-tertiary'
            }`}
          >
            {t('nav.inquireNow')}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      {!isProjectDetailsPage && (
        <footer className="bg-[#050505] text-white pt-32 pb-16 border-t border-white/5 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-tertiary/5 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="max-w-[1280px] mx-auto px-margin-desktop relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 mb-24 max-md:px-margin-mobile">
            <div className="md:col-span-4">
              <Link to="/">
                <img src="/logo.png" alt={siteName} className="h-12 md:h-16 mb-8 object-contain" />
              </Link>
              <p className="font-body-md text-white/60 leading-relaxed max-w-sm">
                {settings?.siteDescription || t('footer.description')}
              </p>
            </div>
            
            <div className="md:col-span-2 md:col-start-7">
              <h5 className="font-label-caps text-[11px] rtl:text-[14px] rtl:font-bold rtl:tracking-normal uppercase mb-8 tracking-[0.3em] text-tertiary">{t('footer.portfolio')}</h5>
              <ul className="space-y-4">
                <li><Link to="/projects" className="text-white/60 hover:text-white hover:-translate-x-2 rtl:hover:translate-x-2 transition-all font-body-md inline-block">{t('footer.allProjects')}</Link></li>
                <li><a className="text-white/60 hover:text-white hover:-translate-x-2 rtl:hover:translate-x-2 transition-all font-body-md inline-block" href="#">{t('footer.availableNow')}</a></li>
                <li><a className="text-white/60 hover:text-white hover:-translate-x-2 rtl:hover:translate-x-2 transition-all font-body-md inline-block" href="#">{t('footer.soldOut')}</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-2">
              <h5 className="font-label-caps text-[11px] rtl:text-[14px] rtl:font-bold rtl:tracking-normal uppercase mb-8 tracking-[0.3em] text-tertiary">{t('footer.company')}</h5>
              <ul className="space-y-4">
                <li><a className="text-white/60 hover:text-white hover:-translate-x-2 rtl:hover:translate-x-2 transition-all font-body-md inline-block" href="#">{t('footer.aboutUs')}</a></li>
                <li><a className="text-white/60 hover:text-white hover:-translate-x-2 rtl:hover:translate-x-2 transition-all font-body-md inline-block" href="#">{t('footer.theProcess')}</a></li>
                <li><Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-white/60 hover:text-white hover:-translate-x-2 rtl:hover:translate-x-2 transition-all font-body-md inline-block">{t('footer.adminPortal')}</Link></li>
              </ul>
            </div>
            
            <div className="md:col-span-2">
              <h5 className="font-label-caps text-[11px] rtl:text-[14px] rtl:font-bold rtl:tracking-normal uppercase mb-8 tracking-[0.3em] text-tertiary">{t('footer.connect')}</h5>
              <ul className="space-y-4">
                {settings?.contactEmail && <li><a className="text-white/60 hover:text-white hover:-translate-x-2 rtl:hover:translate-x-2 transition-all font-body-md inline-block" href={`mailto:${settings.contactEmail}`}>{t('footer.emailUs')}</a></li>}
                {settings?.whatsappNumber && <li><a className="text-white/60 hover:text-white hover:-translate-x-2 rtl:hover:translate-x-2 transition-all font-body-md inline-block" href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noreferrer">{t('footer.whatsapp')}</a></li>}
                {settings?.contactPhone && <li><a className="text-white/60 hover:text-white hover:-translate-x-2 rtl:hover:translate-x-2 transition-all font-body-md inline-block" href={`tel:${settings.contactPhone}`}>{t('footer.callUs')}</a></li>}
              </ul>
            </div>
          </div>
          
          <div className="max-w-[1280px] mx-auto px-margin-desktop pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 max-md:px-margin-mobile relative z-10">
            <p className="font-body-md text-white/40 text-[12px] rtl:text-[14px]">{t('footer.copyright', { year: currentYear, siteName })}</p>
            <div className="flex gap-10">
              <a className="text-[10px] rtl:text-[13px] rtl:font-bold rtl:tracking-normal uppercase tracking-[0.2em] font-label-caps text-white/40 hover:text-white transition-colors" href="#">{t('footer.privacyPolicy')}</a>
              <a className="text-[10px] rtl:text-[13px] rtl:font-bold rtl:tracking-normal uppercase tracking-[0.2em] font-label-caps text-white/40 hover:text-white transition-colors" href="#">{t('footer.termsOfService')}</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
