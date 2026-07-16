import { useState } from 'react';
import { useProjects } from '../../../application/hooks/useProjects';
import { ProjectCardComponent } from './ProjectCardComponent';
import { ProjectFormModal } from './ProjectFormModal';
import type { Project } from '../../../domain/types/project.types';
import { useTranslation } from 'react-i18next';

export function ProjectsDashboard() {
  const { t } = useTranslation();
  const { projects, isLoading, refetch } = useProjects('admin');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleOpenModal = (project?: Project) => {
    setEditingProject(project || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSuccess = () => {
    handleCloseModal();
    refetch();
  };

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] text-white mb-2">{t('projectsDashboard.title')}</h2>
          <p className="text-xs md:text-sm font-['Inter'] text-white/40 tracking-wide">{t('projectsDashboard.subtitle')}</p>
        </div>
        <button onClick={() => handleOpenModal()} className="group flex items-center justify-center space-x-2 px-6 py-3.5 bg-white/5 border border-white/10 hover:border-[#C8A96A]/50 text-white hover:text-[#C8A96A] font-bold text-[10px] uppercase tracking-[0.2em] rounded-xl hover:shadow-[0_0_20px_rgba(200,169,106,0.15)] hover:bg-[#C8A96A]/10 transition-all duration-300 w-full md:w-auto">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-300"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          <span>{t('projectsDashboard.addNew')}</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-40">
          <div className="w-8 h-8 border-2 border-[#C8A96A]/20 border-t-[#C8A96A] rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 border border-white/5 border-dashed rounded-3xl bg-white/[0.02]">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 mb-4"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          <div className="text-white/40 font-['Inter'] text-sm tracking-wide">{t('projectsDashboard.noProjects')}</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCardComponent key={project._id} project={project} onViewDetails={() => handleOpenModal(project)} />
          ))}
        </div>
      )}

      <ProjectFormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        projectToEdit={editingProject} 
        onSuccess={handleSuccess} 
      />
    </div>
  );
}
