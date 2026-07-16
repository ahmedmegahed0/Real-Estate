import React from 'react';
import { useTranslation } from 'react-i18next';

export const ProcessSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-section-gap px-margin-desktop bg-on-surface text-white max-md:px-margin-mobile">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="reveal-on-scroll">
            <p className="font-label-caps text-label-caps text-tertiary-fixed uppercase mb-6 tracking-widest">{t('process.framework')}</p>
            <h2 className="font-display text-display-lg mb-12 max-md:text-display-md">
              {t('process.title')}<span className="italic">{t('process.titleHighlight')}</span>
            </h2>
            <div className="space-y-16">
              <div className="flex gap-10 group">
                <span className="font-display text-display-lg text-white/10 group-hover:text-tertiary-fixed transition-colors">01</span>
                <div>
                  <h4 className="font-display text-headline-lg mb-4">{t('process.step1Title')}</h4>
                  <p className="text-white/60 font-body-lg leading-relaxed">
                    {t('process.step1Desc')}
                  </p>
                </div>
              </div>
              <div className="flex gap-10 group">
                <span className="font-display text-display-lg text-white/10 group-hover:text-tertiary-fixed transition-colors">02</span>
                <div>
                  <h4 className="font-display text-headline-lg mb-4">{t('process.step2Title')}</h4>
                  <p className="text-white/60 font-body-lg leading-relaxed">
                    {t('process.step2Desc')}
                  </p>
                </div>
              </div>
              <div className="flex gap-10 group">
                <span className="font-display text-display-lg text-white/10 group-hover:text-tertiary-fixed transition-colors">03</span>
                <div>
                  <h4 className="font-display text-headline-lg mb-4">{t('process.step3Title')}</h4>
                  <p className="text-white/60 font-body-lg leading-relaxed">
                    {t('process.step3Desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="sticky top-40 hidden lg:block reveal-on-scroll stagger-2">
            <div className="relative p-12 border border-white/10">
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-tertiary-fixed"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-tertiary-fixed"></div>
              <img 
                alt="Process work" 
                className="w-full grayscale opacity-80 filter brightness-75" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsIpjkdAbPdmgS_Xuu7xW42xs89j79Iz4nVt7cx43hNZ-V8yKfIDcKuaasrP__vYa-cGWsNohouOhkQSEZlSLXGZbPSIxy3jiAfvBOhOwFUd5aLjdtUZjfxmKM3edWv1f-qT-6SAHXVqv2ZEMr_urhc8onWFdxF_5RKEN_k45ASByrH67CaXhQCdheY05GjQUzIh3XXCDrkjFqPp0feaON2ANJBjNpMWlRNpOg49wH-j3qLH2lKSFi"
              />
              <div className="mt-8">
                <p className="font-display text-headline-sm italic mb-2">{t('process.quote')}</p>
                <p className="font-label-caps text-label-caps text-white/40">{t('process.quoteAuthor')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
