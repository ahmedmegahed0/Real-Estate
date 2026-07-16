import React, { useState, useEffect, useRef } from 'react';
import { useProjects } from '../../../../application/hooks/useProjects';
import { ProjectUnlockModal } from './ProjectUnlockModal';
import type { Project } from '../../../../domain/types/project.types';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../../application/hooks/use-auth';

const PremiumProjectCard: React.FC<{ project: Project; onUnlock: () => void; index: number }> = ({ project, onUnlock, index }) => {
  const { t } = useTranslation();
  return (
    <div 
      className={`group relative w-full aspect-[3/4] overflow-hidden rounded-2xl border border-white/5 shadow-2xl hover:shadow-[0_0_40px_rgba(200,169,106,0.15)] cursor-pointer reveal-on-scroll stagger-${Math.min(index + 1, 3)} transition-shadow duration-700`}
      onClick={onUnlock}
    >
      {/* Background Image with slow zoom on hover */}
      <img 
        src={project.coverImage} 
        alt={project.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />

      {/* Top Badges */}
      <div className="absolute top-6 left-6 flex flex-col gap-3 items-start z-10">
        {project.isFeatured && (
          <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-label-caps text-[10px] uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-2xl">
            {t('featuredProjects.badges.featured')}
          </span>
        )}
        <span className={`${project.isPublished ? 'bg-tertiary text-on-tertiary' : 'bg-error text-on-error'} font-label-caps text-[10px] uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-2xl`}>
          {project.isPublished ? t('featuredProjects.badges.available') : t('featuredProjects.badges.soldOut')}
        </span>
      </div>

      {/* Center Lock Icon (Appears on Hover) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="w-16 h-16 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 shadow-2xl">
          <span className="material-symbols-outlined text-white text-2xl">lock_open</span>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10 flex flex-col justify-end transform transition-transform duration-700 group-hover:-translate-y-4">
        <p className="font-label-caps text-[11px] text-tertiary-fixed uppercase tracking-[0.3em] mb-3 drop-shadow-md">
          {project.location}
        </p>
        <h3 className="font-display text-headline-xl text-white leading-tight mb-4 drop-shadow-lg">
          {project.name}
        </h3>
        
        {/* Description that fades in and slides up */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-in-out">
          <div className="overflow-hidden">
            <p className="font-body-md text-white/80 line-clamp-2 mb-6 transform opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
              {project.shortDescription}
            </p>
          </div>
        </div>
        
        {/* Animated Divider */}
        <div className="w-0 group-hover:w-full h-px bg-white/20 transition-all duration-1000 ease-out mb-6" />
        
        {/* Call to Action */}
        <div className="flex items-center justify-between text-white group-hover:text-tertiary-fixed transition-colors duration-500">
          <span className="font-label-caps text-[11px] uppercase tracking-[0.2em]">
            {t('featuredProjects.unlock')}
          </span>
          <span className="material-symbols-outlined transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2 rtl:rotate-180 transition-transform duration-500">
            arrow_forward
          </span>
        </div>
      </div>
    </div>
  );
};

export const FeaturedProjects: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { projects, isLoading, error } = useProjects('public');
  const [selectedProject, setSelectedProject] = useState<{ id: string; name: string; projectSlug: string; coverImage: string } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const handleProjectClick = (project: Project) => {
    const hasUnlocked = localStorage.getItem('hasUnlockedProjects') === 'true';
    if (isAuthenticated || hasUnlocked) {
      navigate(`/projects/${project.slug}`);
    } else {
      setSelectedProject({ id: project._id, name: project.name, projectSlug: project.slug, coverImage: project.coverImage });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [projects]);

  if (isLoading) {
    return (
      <section className="py-section-gap px-margin-desktop bg-surface max-md:px-margin-mobile">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-full aspect-[3/4] bg-surface-container-high animate-pulse rounded-2xl" />
          ))}
        </div>
      </section>
    );
  }

  if (error || !projects || projects.length === 0) {
    return null; 
  }

  const displayProjects = projects.slice(0, 6);
  const hasMore = projects.length > 6;

  return (
    <section ref={sectionRef} id="portfolio" className="py-section-gap px-margin-desktop bg-surface max-md:px-margin-mobile relative overflow-hidden">
      
      {/* Background abstract elements for a premium feel */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-tertiary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-container-max mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 reveal-on-scroll">
          <div className="max-w-2xl relative">
            {/* Decorative line */}
            <div className="absolute -left-margin-desktop top-4 w-12 h-px bg-tertiary max-md:hidden" />
            
            <p className="font-label-caps text-label-caps text-tertiary uppercase mb-6 tracking-[0.3em]">{t('featuredProjects.collection')}</p>
            <h2 className="font-display text-display-lg max-md:text-display-md leading-tight text-on-surface">
              {t('featuredProjects.title')}<span className="italic text-tertiary font-light">{t('featuredProjects.titleHighlight')}</span>
            </h2>
          </div>
          {hasMore && (
            <Link 
              to="/projects" 
              className="group flex items-center gap-4 border-b border-on-surface pb-2 hover:border-tertiary transition-colors"
            >
              <span className="font-label-caps text-[12px] uppercase tracking-[0.2em] text-on-surface group-hover:text-tertiary transition-colors">
                {t('featuredProjects.exploreAll')}
              </span>
              <span className="material-symbols-outlined text-sm text-on-surface group-hover:text-tertiary group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-all">
                arrow_forward
              </span>
            </Link>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
          {displayProjects.map((project, index) => (
            <PremiumProjectCard 
              key={project._id} 
              project={project}
              index={index}
              onUnlock={() => handleProjectClick(project)} 
            />
          ))}
        </div>

        {/* Mobile View All Button */}
        {hasMore && (
          <div className="mt-16 text-center md:hidden reveal-on-scroll">
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-on-surface text-surface font-label-caps text-[12px] uppercase tracking-[0.2em] hover:bg-tertiary transition-colors"
            >
              {t('featuredProjects.viewAll')}
              <span className="material-symbols-outlined text-sm rtl:rotate-180">east</span>
            </Link>
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectUnlockModal
          isOpen={true}
          onClose={() => setSelectedProject(null)}
          projectId={selectedProject.id}
          projectName={selectedProject.name}
          projectSlug={selectedProject.projectSlug}
          coverImage={selectedProject.coverImage}
        />
      )}
    </section>
  );
};
