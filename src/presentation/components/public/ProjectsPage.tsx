import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../../../application/hooks/useProjects';

export const ProjectsPage: React.FC = () => {
  const { projects, isLoading, error } = useProjects('public');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-16 h-16 border-t-2 border-tertiary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen bg-surface flex items-center justify-center font-display text-2xl text-on-surface-variant">Failed to load projects.</div>;
  }

  return (
    <div className="relative min-h-screen text-on-surface font-body-md overflow-x-hidden">
      
      {/* Premium Image Background with Glassmorphism Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" 
          alt="Luxury Architecture Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-surface/85 backdrop-blur-3xl z-10"></div>
        {/* Subtle Gradient to ensure contrast at the top */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/50 to-transparent z-20"></div>
      </div>

      <div className="relative z-10 pt-32 pb-24 min-h-screen flex flex-col">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
        <div className="mb-16">
          <p className="font-label-caps text-[11px] text-tertiary uppercase tracking-[0.3em] mb-4">Our Portfolio</p>
          <h1 className="font-display text-display-md md:text-display-xl text-on-surface leading-tight">
            Exclusive <span className="italic text-tertiary font-light">Residences</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <Link 
              key={project._id} 
              to={`/projects/${project.slug}`}
              className={`group relative w-full aspect-[3/4] overflow-hidden rounded-2xl border border-black/5 shadow-xl hover:shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-${Math.min(idx * 100, 500)} block`}
            >
              <img 
                alt={project.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                src={project.coverImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="absolute top-6 left-6 z-10">
                <span className="inline-block px-3 py-1 bg-black/40 backdrop-blur-md text-white font-label-caps text-[9px] uppercase tracking-[0.2em] rounded-sm">
                  {project.isPublished ? 'Available' : 'Sold Out'}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 z-10 flex flex-col justify-end transform transition-transform duration-700 group-hover:-translate-y-2">
                <p className="font-label-caps text-[11px] text-tertiary-fixed uppercase tracking-[0.3em] mb-3 drop-shadow-md">
                  {project.location}
                </p>
                <h3 className="font-display text-headline-md text-white leading-tight mb-6 drop-shadow-lg">
                  {project.name}
                </h3>
                <div className="flex items-center justify-between text-white group-hover:text-tertiary-fixed transition-colors duration-500">
                  <span className="font-label-caps text-[10px] uppercase tracking-[0.2em]">View Details</span>
                  <span className="material-symbols-outlined text-sm transform group-hover:translate-x-2 transition-transform duration-500">arrow_forward</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};
