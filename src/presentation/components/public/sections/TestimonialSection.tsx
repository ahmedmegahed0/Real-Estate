import React from 'react';

export const TestimonialSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-section-gap px-margin-desktop bg-surface max-md:px-margin-mobile">
      <div className="max-w-container-max mx-auto text-center mb-20 reveal-on-scroll">
        <p className="font-label-caps text-label-caps text-tertiary uppercase mb-6 tracking-widest">Industry Voices</p>
        <h2 className="font-display text-display-lg max-md:text-display-md">
          Words from Our <span className="italic">Partners</span>
        </h2>
      </div>
      <div className="max-w-4xl mx-auto reveal-on-scroll stagger-2">
        <div className="bg-surface-container-low p-16 md:p-24 relative overflow-hidden text-center">
          <span className="material-symbols-outlined text-[100px] text-tertiary-fixed absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-20">format_quote</span>
          <div className="relative z-10">
            <p className="font-display text-headline-xl italic text-on-surface mb-12 leading-tight max-md:text-headline-md">
              "Creative Eye transformed the way we present our projects. The quality of leads and the campaign results exceeded our expectations by a factor of three."
            </p>
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden grayscale">
                <img 
                  alt="Eng. Mohamed Adel" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdeqetabSVQehrATpVIHz-iJSdGV4Xff0UVJ6CDuwKHOWuSx-3npmb_zqiUXNLeL2SRr0jhhleJ8pbwzTvvUPCXZIJiHSYzIl6YdgLYcWuR2DU7-k9_1O7B_Ol869FYNj2jhJy93wwHcBGh28HMmzAe1P5ifpjSPclfyq2ez5Y-KXBT4YXQvjyh-uhsCXMAvewcWtmYaVb9Zm09gqPBsSmsmTci59mBGKz6ZGp-3MFHT8CpEg3Pd4A"
                />
              </div>
              <div>
                <h5 className="font-display text-headline-sm">Eng. Mohamed Adel</h5>
                <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">CEO, BuildWell Developments</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-8 mt-12">
          <button className="w-14 h-14 rounded-full border border-outline flex items-center justify-center hover:bg-on-surface hover:text-white transition-all">
            <span className="material-symbols-outlined">west</span>
          </button>
          <button className="w-14 h-14 rounded-full border border-outline flex items-center justify-center hover:bg-on-surface hover:text-white transition-all">
            <span className="material-symbols-outlined">east</span>
          </button>
        </div>
      </div>
    </section>
  );
};
