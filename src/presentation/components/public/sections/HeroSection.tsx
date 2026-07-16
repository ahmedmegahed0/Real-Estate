import React, { useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

    const handleScroll = () => {
      const scroll = window.scrollY;
      const heroImg = document.getElementById('hero-img');
      if (heroImg) {
        heroImg.style.transform = `scale(1.1) translateY(${scroll * 0.15}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    }
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 overflow-hidden" id="hero-bg-wrap">
        <img 
          alt="Luxury Villa Architecture" 
          className="w-full h-full object-cover brightness-[0.6] scale-110" 
          id="hero-img" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaXFTdT19qdT-2dtdGfrzCkAi8qnYWXkuhF2_Lz3DRPwA2BFExPoA1elDwS75ImM6fu9ZDeIn_dzUOhR64QPCWLiETfCJslGgC94BbfwAI-fXoCaXDYKMmqYqngT6WMVzqHyBg5FQIjqSNGR2hzpfj3SCupotdNIK7P0TCIN1F3fJLCWXhL1-3MJ26T71WAyDLsJOkOfdvajXMKU2Chbv2ZTBg3bjeC0o9UxLD067d4BuryBO0sOU2"
        />
      </div>
      <div className="relative z-10 px-margin-desktop w-full max-w-container-max mx-auto text-white flex flex-col items-center text-center justify-center max-md:px-margin-mobile">
        <p className="font-label-caps text-[10px] md:text-[12px] uppercase tracking-[0.5em] mb-8 text-tertiary-fixed reveal-on-scroll drop-shadow-md">
          {t('hero.welcome')}
        </p>
        <h1 className="font-display text-display-md md:text-display-xl max-w-5xl mb-8 reveal-on-scroll stagger-1 leading-tight drop-shadow-2xl">
          {t('hero.title')}<span className="italic font-light text-tertiary-fixed">{t('hero.titleHighlight')}</span>
        </h1>
        <p className="font-body-md md:font-body-lg text-white/90 max-w-3xl mb-14 reveal-on-scroll stagger-2 leading-relaxed drop-shadow-lg">
          <Trans 
            i18nKey="hero.description"
            components={{ 1: <span className="font-semibold text-tertiary-fixed" /> }}
          />
        </p>
        
        <div className="flex flex-col items-center reveal-on-scroll stagger-3 w-full">
          <a 
            href="/projects" 
            className="group relative overflow-hidden bg-transparent border-y border-x-0 border-white/30 text-white px-12 py-6 font-label-caps text-[11px] tracking-[0.4em] uppercase transition-all duration-700 hover:border-tertiary-fixed hover:tracking-[0.5em] flex items-center justify-center min-w-[300px]"
          >
            <span className="relative z-10 transition-colors duration-500 flex items-center gap-4 group-hover:text-tertiary-fixed">
              {t('hero.explore')}
              <span className="material-symbols-outlined text-sm transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2 rtl:rotate-180 transition-transform duration-500">arrow_forward</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-tertiary-fixed/0 via-tertiary-fixed/10 to-tertiary-fixed/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
          </a>
        </div>
      </div>

    </section>
  );
};
