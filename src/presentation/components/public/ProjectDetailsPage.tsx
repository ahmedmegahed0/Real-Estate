import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProject } from '../../../application/hooks/useProject';
import { useProjects } from '../../../application/hooks/useProjects';
import { useSettings } from '../../../application/hooks/useSettings';
import { useTranslation, Trans } from 'react-i18next';

export const ProjectDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>(); // This is actually the slug based on the router
  const { project, isLoading, error } = useProject(id);
  const { projects: allProjects } = useProjects('public');
  const { settings } = useSettings();
  const [activeHeroImage, setActiveHeroImage] = useState<string>('');

  useEffect(() => {
    if (project) {
      setActiveHeroImage(project.coverImage);
    }
  }, [project]);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          entry.target.classList.add('visible'); 
        }
      });
    }, observerOptions);

    setTimeout(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    }, 100);

    // Sticky Bar Visibility
    const handleScroll = () => {
      const inquiryBar = document.getElementById('inquiryBar');
      if (inquiryBar) {
        if (window.scrollY > 600) {
          inquiryBar.classList.remove('translate-y-full');
        } else {
          inquiryBar.classList.add('translate-y-full');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [project]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-16 h-16 border-t-2 border-tertiary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !project) {
    return <div className="min-h-screen bg-surface flex items-center justify-center font-display text-2xl text-on-surface-variant">Project not found.</div>;
  }

  const relatedProjects = allProjects.filter(p => p._id !== project._id).slice(0, 3);
  
  // Format description into paragraphs
  const fullDescriptionParagraphs = project.fullDescription
    ? project.fullDescription.split('\n').filter(p => p.trim() !== '')
    : [];

  const allImages = [project.coverImage, ...(project.gallery || [])].filter(Boolean);

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden selection:bg-tertiary selection:text-white">
      
      {/* Hero Parallax Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10 transition-colors duration-1000"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-black/20 to-black/60 z-10"></div>
          <img 
            key={activeHeroImage}
            src={activeHeroImage} 
            alt={project.name}
            className="w-full h-full object-cover fixed top-0 left-0 -z-10 animate-in fade-in zoom-in-105 duration-1000"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-20 flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div>
            <span className="inline-block px-4 py-1 border border-white/30 backdrop-blur-md text-white font-label-caps text-[11px] uppercase tracking-[0.3em] mb-6 shadow-2xl">
              {project.isPublished ? t('projectDetails.available') : t('projectDetails.soldOut')}
            </span>
            <h1 className="font-display text-display-xl md:text-[80px] lg:text-[100px] text-white leading-[1.1] mb-6 drop-shadow-2xl">
              {project.name}
            </h1>
            <p className="font-label-caps text-[12px] md:text-[14px] text-white/80 uppercase tracking-[0.4em] flex items-center justify-center gap-4">
              <span className="w-8 h-px bg-tertiary"></span>
              {project.location}
              <span className="w-8 h-px bg-tertiary"></span>
            </p>
          </div>
        </div>

        {/* Thumbnails Row */}
        {allImages.length > 1 && (
          <div className="relative z-30 w-full px-margin-mobile md:px-margin-desktop pb-12">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar justify-start md:justify-center">
              {allImages.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveHeroImage(img)}
                  className={`relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden cursor-pointer snap-start transition-all duration-500 border-2 ${
                    activeHeroImage === img ? 'border-tertiary scale-110 shadow-2xl z-10' : 'border-transparent opacity-50 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <main className="relative z-30 bg-surface overflow-hidden">
        
        {/* Ambient Luxury Background Elements */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          {/* Glowing Orbs */}
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-tertiary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute top-[40%] left-0 w-[40vw] h-[40vw] bg-on-surface/5 rounded-full blur-[120px] -translate-x-1/2"></div>
          <div className="absolute bottom-0 right-10 w-[60vw] h-[60vw] bg-tertiary/5 rounded-full blur-[150px] translate-y-1/3"></div>
          
          {/* Subtle Architectural Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_40%,transparent_100%)]"></div>
        </div>

        {/* Overview Section */}
        <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop relative">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            
            {/* Sticky Title */}
            <div className="md:col-span-4 reveal-on-scroll">
              <div className="sticky top-32">
                <p className="font-label-caps text-[11px] text-tertiary uppercase tracking-[0.3em] mb-4 drop-shadow-sm">{t('projectDetails.theVision')}</p>
                <h2 className="font-display text-headline-xl md:text-display-sm leading-tight text-on-surface">
                  {t('projectDetails.title1')} <br/><span className="italic text-tertiary font-light">{t('projectDetails.title2')}</span>
                </h2>
              </div>
            </div>

            {/* Description & Quick Stats */}
            <div className="md:col-span-8 reveal-on-scroll delay-100">
              <div className="prose prose-xl max-w-none relative z-10">
                {project.shortDescription && (
                  <p className="text-3xl md:text-4xl text-on-surface font-light leading-snug mb-8 whitespace-pre-wrap">
                    {project.shortDescription}
                  </p>
                )}
                {fullDescriptionParagraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-xl md:text-2xl text-on-surface-variant font-light leading-relaxed mb-6 whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Details & Amenities Section */}
              <div className="mt-20 pt-16 border-t border-outline-variant/30 grid grid-cols-1 md:grid-cols-12 gap-12">
                
                {/* Location & Status (Stacked) */}
                <div className="md:col-span-4 flex flex-col gap-10 md:border-r md:rtl:border-l md:rtl:border-r-0 border-outline-variant/30 md:pr-10 md:rtl:pr-0 md:rtl:pl-10">
                  <div>
                    <p className="font-label-caps text-[12px] text-tertiary uppercase tracking-[0.3em] mb-4">{t('projectDetails.location')}</p>
                    <p className="font-display text-3xl md:text-4xl text-on-surface">{project.location}</p>
                  </div>
                  <div>
                    <p className="font-label-caps text-[12px] text-tertiary uppercase tracking-[0.3em] mb-4">{t('projectDetails.status')}</p>
                    <p className="font-display text-3xl md:text-4xl text-on-surface">{project.isPublished ? t('projectDetails.available') : t('projectDetails.soldOut')}</p>
                  </div>
                </div>

                {/* Amenities (Premium Display) */}
                {project.amenities && project.amenities.length > 0 && (
                  <div className="md:col-span-8">
                    <p className="font-label-caps text-[12px] text-tertiary uppercase tracking-[0.3em] mb-8">{t('projectDetails.amenities')}</p>
                    <div className="flex flex-wrap gap-4">
                      {project.amenities.map((amenity, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center gap-4 px-8 py-5 bg-surface/60 backdrop-blur-md border border-outline-variant/40 shadow-sm hover:shadow-lg hover:border-tertiary/60 hover:bg-surface transition-all duration-500 rounded-xl"
                        >
                          <span className="material-symbols-outlined text-tertiary text-2xl font-light">done_all</span>
                          <span className="font-body-lg text-2xl md:text-3xl text-on-surface font-light">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>



        {/* Related Projects - Chic Cards */}
        {relatedProjects.length > 0 && (
          <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-surface border-t border-outline-variant/10">
            <div className="max-w-container-max mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 reveal-on-scroll">
                <div>
                  <p className="font-label-caps text-[11px] text-tertiary uppercase tracking-[0.3em] mb-4">{t('projectDetails.discoverMore')}</p>
                  <h2 className="font-display text-headline-xl md:text-display-sm text-on-surface leading-tight">{t('projectDetails.similar')} <span className="italic text-tertiary font-light">{t('projectDetails.similarHighlight')}</span></h2>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProjects.map((rel, idx) => (
                  <Link 
                    key={rel._id} 
                    to={`/projects/${rel.slug}`}
                    className={`group relative w-full aspect-[3/4] overflow-hidden rounded-2xl border border-black/5 shadow-xl hover:shadow-2xl reveal-on-scroll stagger-${idx+1} block`}
                  >
                    <img 
                      alt={rel.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                      src={rel.coverImage}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-10 flex flex-col justify-end transform transition-transform duration-700 group-hover:-translate-y-2">
                      <p className="font-label-caps text-[11px] text-tertiary-fixed uppercase tracking-[0.3em] mb-3 drop-shadow-md">
                        {rel.location}
                      </p>
                      <h3 className="font-display text-headline-md text-white leading-tight mb-6 drop-shadow-lg">
                        {rel.name}
                      </h3>
                      <div className="flex items-center justify-between text-white group-hover:text-tertiary-fixed transition-colors duration-500">
                        <span className="font-label-caps text-[10px] uppercase tracking-[0.2em]">{t('projectsPage.viewDetails')}</span>
                        <span className="material-symbols-outlined text-sm transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2 rtl:rotate-180 transition-transform duration-500">arrow_forward</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Premium Sticky Inquiry Bar */}
      <div className="fixed bottom-0 left-0 w-full z-40 translate-y-full transition-transform duration-700 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]" id="inquiryBar">
        <div className="bg-surface/95 backdrop-blur-3xl border-t border-outline-variant/30 px-margin-mobile md:px-margin-desktop py-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div 
              className="w-12 h-12 bg-cover bg-center rounded-sm shadow-sm" 
              style={{ backgroundImage: `url('${project.coverImage}')` }}
            ></div>
            <div className="hidden sm:block">
              <p className="font-label-caps text-[9px] text-on-surface-variant tracking-[0.2em] uppercase mb-1">{t('projectDetails.interestedIn')}</p>
              <p className="font-display text-lg leading-none">{project.name}</p>
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            {settings?.contactPhone && (
              <a className="flex-1 md:flex-none border border-outline-variant text-on-surface px-8 py-3.5 font-label-caps text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:border-tertiary hover:text-tertiary transition-all duration-300 rounded-sm" href={`tel:${settings.contactPhone}`}>
                <span className="material-symbols-outlined text-sm">call</span>
                {t('projectDetails.callNow')}
              </a>
            )}
            {settings?.whatsappNumber && (
              <a className="flex-1 md:flex-none bg-on-surface text-surface px-8 py-3.5 font-label-caps text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-tertiary transition-all duration-300 shadow-xl rounded-sm" href={`https://wa.me/${settings.whatsappNumber}`}>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
                {t('projectDetails.whatsapp')}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
