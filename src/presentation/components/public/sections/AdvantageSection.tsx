import React from 'react';

export const AdvantageSection: React.FC = () => {
  return (
    <section id="process" className="py-section-gap px-margin-desktop bg-surface overflow-hidden max-md:px-margin-mobile">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 reveal-on-scroll">
          <p className="font-label-caps text-label-caps text-tertiary uppercase mb-6 tracking-widest">About Us</p>
          <h2 className="font-display text-display-lg leading-tight mb-8 max-md:text-display-md">
            A Legacy of Excellence in <span className="italic">Luxury Real Estate.</span>
          </h2>
          <div className="space-y-10">
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-container flex items-center justify-center rounded-lg group-hover:bg-tertiary-fixed transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-on-tertiary-fixed">visibility</span>
              </div>
              <div>
                <h4 className="font-display text-headline-sm mb-2">Cinematic Narrative</h4>
                <p className="text-on-surface-variant font-body-md leading-relaxed">
                  We don't just shoot interiors; we capture the emotional essence of a home through Hollywood-grade production values.
                </p>
              </div>
            </div>
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-container flex items-center justify-center rounded-lg group-hover:bg-tertiary-fixed transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-on-tertiary-fixed">analytics</span>
              </div>
              <div>
                <h4 className="font-display text-headline-sm mb-2">Precision Targeting</h4>
                <p className="text-on-surface-variant font-body-md leading-relaxed">
                  Proprietary data algorithms ensure your project is seen by the top 1% of qualified global investors.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 relative reveal-on-scroll stagger-2">
          <div className="grid grid-cols-2 gap-6 items-start">
            <div className="mt-20">
              <img 
                alt="Detail shot" 
                className="w-full aspect-[4/5] object-cover rounded shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDlUXrAYhyhptanUWnXwS4WFK_w16vlwoRVLIYyAk9LkbsSmOPu1CdfCD97em7EPi_wa4KgcsHJpie_CsfeaOgwADJ04Ujoe4NlyS-m4YJLboBnL0uImMV93LGO5q7i9Omq6L1-X_VKUrAcOqKPcqjYf7Vfudb8jaz57zo3c8T5DgpFjT1PrzxWSCr_xsNwrOziPk0z_cuN7NCdA8OXAf8bfg0mtNvpJx4IxEulT6RBOz14VnbVfl3"
              />
            </div>
            <div>
              <img 
                alt="Lens reflection" 
                className="w-full aspect-[4/6] object-cover rounded shadow-2xl" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgBtQ3A-Z6Uakd9ZhSETNZojOFehzfPCcI5OyMRCSN820FeJA7zrZTuOoWsBEha9ClWLdp7OArDZtXdbVych73gI-W-dMyTw-6I7ykPVBcrRXGPxG3divSwdT34CecW7N38sVIpKSO9WnG8f3TOw6BiMg9ycIAlpDIUKsaBcY8xPYP8Q0PhgAlVbqS6RbVbAOaEo0_ks-NKzBb_gCamLo0S9g_RBJVfdd6i5-B9Btv5hVubTp9TaGH"
              />
            </div>
          </div>
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-tertiary-fixed/5 rounded-full blur-[100px]"></div>
        </div>
      </div>
    </section>
  );
};
