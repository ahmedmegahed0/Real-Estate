
import type { Project } from '../../../domain/types/project.types';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (projectId: string) => void;
}

export function ProjectCardComponent({ project, onViewDetails }: ProjectCardProps) {
  return (
    <div className="group relative bg-[#1a1a1a]/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden hover:border-[#C8A96A]/30 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(200,169,106,0.15)] flex flex-col h-full transform hover:-translate-y-2">
      <div className="relative h-72 overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/30 group-hover:opacity-80 transition-opacity duration-700 z-10" />
        <img
          src={project.coverImage || 'https://via.placeholder.com/600x400?text=No+Image'}
          alt={project.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
        />
        {project.isFeatured && (
          <div className="absolute top-5 right-5 z-20 bg-gradient-to-r from-[#C8A96A] to-[#D4AF37] text-black text-[9px] font-bold tracking-[0.25em] px-4 py-1.5 uppercase rounded-full shadow-[0_4px_12px_rgba(200,169,106,0.3)] backdrop-blur-md">
            Featured
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col flex-grow relative z-20 -mt-12 bg-gradient-to-b from-transparent to-[#1a1a1a]/40">
        <h3 className="text-3xl font-['Playfair_Display'] text-white group-hover:text-[#C8A96A] transition-colors duration-500 mb-3 drop-shadow-md">{project.name}</h3>
        <p className="text-[#C8A96A]/80 text-[10px] font-['Inter'] uppercase tracking-[0.2em] mb-5 flex items-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          {project.location}
        </p>
        
        <p className="text-white/50 font-['Inter'] text-sm leading-relaxed mb-8 flex-grow line-clamp-3 font-light">
          {project.shortDescription}
        </p>

        <button
          onClick={() => onViewDetails(project._id)}
          className="w-full group/btn relative overflow-hidden bg-white/5 border border-white/10 text-white font-['Inter'] font-semibold text-[10px] tracking-[0.25em] uppercase py-4 rounded-xl hover:bg-[#C8A96A] hover:text-black hover:border-[#C8A96A] transition-all duration-500 flex items-center justify-center space-x-2"
        >
          <span>View Details</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/btn:translate-x-1 transition-transform duration-300"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      </div>
    </div>
  );
}
