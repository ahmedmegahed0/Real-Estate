import React, { useState, useEffect } from 'react';
import type { Project, CreateProjectInput } from '../../../domain/types/project.types';
import { useProjectMutations } from '../../../application/hooks/useProjectMutations';
import { ImageDropzoneInput } from '../upload/ImageDropzoneInput';
import { GalleryUploadInput } from '../upload/GalleryUploadInput';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { useTranslation } from 'react-i18next';

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectToEdit?: Project | null;
  onSuccess: () => void;
}

export function ProjectFormModal({ isOpen, onClose, projectToEdit, onSuccess }: ProjectFormModalProps) {
  const { t } = useTranslation();
  const { createProject, updateProject, deleteProject, isLoading, error } = useProjectMutations(onSuccess);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const [formData, setFormData] = useState<CreateProjectInput>({
    name: '',
    location: '',
    shortDescription: '',
    fullDescription: '',
    coverImage: '',
    gallery: [],
    amenities: [],
    googleMapsUrl: '',
    whatsappNumber: '',
    phoneNumber: '',
    isPublished: false,
    isFeatured: false,
  });

  const [amenityInput, setAmenityInput] = useState('');

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        name: projectToEdit.name,
        location: projectToEdit.location,
        shortDescription: projectToEdit.shortDescription,
        fullDescription: projectToEdit.fullDescription,
        coverImage: projectToEdit.coverImage,
        gallery: projectToEdit.gallery,
        amenities: projectToEdit.amenities,
        googleMapsUrl: projectToEdit.googleMapsUrl || '',
        whatsappNumber: projectToEdit.whatsappNumber,
        phoneNumber: projectToEdit.phoneNumber,
        isPublished: projectToEdit.isPublished,
        isFeatured: projectToEdit.isFeatured,
      });
    } else {
      setFormData({
        name: '', location: '', shortDescription: '', fullDescription: '',
        coverImage: '', gallery: [], amenities: [], googleMapsUrl: '',
        whatsappNumber: '', phoneNumber: '', isPublished: false, isFeatured: false,
      });
    }
  }, [projectToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddAmenity = () => {
    if (amenityInput.trim() && !formData.amenities.includes(amenityInput.trim())) {
      setFormData(prev => ({ ...prev, amenities: [...prev.amenities, amenityInput.trim()] }));
      setAmenityInput('');
    }
  };

  const handleRemoveAmenity = (amenity: string) => {
    setFormData(prev => ({ ...prev, amenities: prev.amenities.filter(a => a !== amenity) }));
  };

  const handleCoverUploadSuccess = (url: string) => {
    setFormData(prev => ({ ...prev, coverImage: url }));
  };

  const handleCoverRemove = () => {
    setFormData(prev => ({ ...prev, coverImage: '' }));
  };

  const handleGalleryChange = (urls: string[]) => {
    setFormData(prev => ({ ...prev, gallery: urls }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (projectToEdit) {
      await updateProject(projectToEdit._id, formData);
    } else {
      await createProject(formData);
    }
  };

  const handleConfirmDelete = async () => {
    if (projectToEdit) {
      await deleteProject(projectToEdit._id);
      setIsConfirmDeleteOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Animated Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-all duration-500" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-4xl bg-gradient-to-b from-[#1a1a1a]/90 to-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_0_80px_rgba(200,169,106,0.15)] max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-500">
        
        {/* Glow Effects inside modal */}
        <div className="absolute top-0 left-1/4 w-1/2 h-32 bg-[#C8A96A]/10 blur-[80px] pointer-events-none" />
        
        <div className="p-8 border-b border-white/5 flex justify-between items-center relative z-20">
          <div>
            <h2 className="text-3xl font-['Playfair_Display'] text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96A] to-[#E5D09C] mb-1">
              {projectToEdit ? t('projectForm.editTitle') : t('projectForm.addTitle')}
            </h2>
            <p className="text-white/40 text-xs font-['Inter'] tracking-[0.2em] uppercase">{t('projectForm.subtitle')}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto font-['Inter'] relative z-20 custom-scrollbar">
          {error && (
            <div className="mb-8 p-4 border-l-4 border-red-500/50 bg-red-500/10 text-red-400 rounded-r-xl text-sm font-medium flex items-center space-x-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <span>{error}</span>
            </div>
          )}
          <form id="project-form" onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group">
                <input required type="text" name="name" id="name" placeholder=" " value={formData.name} onChange={handleChange} className="block w-full px-0 py-3 pt-6 text-white bg-transparent border-0 border-b border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-[#C8A96A] peer transition-colors" />
                <label htmlFor="name" className="absolute text-[10px] tracking-[0.2em] font-semibold uppercase text-white/40 duration-300 transform -translate-y-4 top-5 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-[#C8A96A]">{t('projectForm.name')}</label>
              </div>
              <div className="relative group">
                <input required type="text" name="location" id="location" placeholder=" " value={formData.location} onChange={handleChange} className="block w-full px-0 py-3 pt-6 text-white bg-transparent border-0 border-b border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-[#C8A96A] peer transition-colors" />
                <label htmlFor="location" className="absolute text-[10px] tracking-[0.2em] font-semibold uppercase text-white/40 duration-300 transform -translate-y-4 top-5 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-[#C8A96A]">{t('projectForm.location')}</label>
              </div>
            </div>

            <div className="relative group">
              <textarea required name="shortDescription" id="shortDescription" placeholder=" " value={formData.shortDescription} onChange={handleChange} rows={2} className="block w-full px-0 py-3 pt-6 text-white bg-transparent border-0 border-b border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-[#C8A96A] peer transition-colors resize-none" />
              <label htmlFor="shortDescription" className="absolute text-[10px] tracking-[0.2em] font-semibold uppercase text-white/40 duration-300 transform -translate-y-4 top-5 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-[#C8A96A]">{t('projectForm.shortDescription')}</label>
            </div>

            <div className="relative group">
              <textarea required name="fullDescription" id="fullDescription" placeholder=" " value={formData.fullDescription} onChange={handleChange} rows={4} className="block w-full px-0 py-3 pt-6 text-white bg-transparent border-0 border-b border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-[#C8A96A] peer transition-colors resize-none" />
              <label htmlFor="fullDescription" className="absolute text-[10px] tracking-[0.2em] font-semibold uppercase text-white/40 duration-300 transform -translate-y-4 top-5 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-[#C8A96A]">{t('projectForm.fullDescription')}</label>
            </div>


            <div className="relative group">
              <input type="url" name="googleMapsUrl" id="googleMapsUrl" placeholder=" " value={formData.googleMapsUrl} onChange={handleChange} className="block w-full px-0 py-3 pt-6 text-white bg-transparent border-0 border-b border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-[#C8A96A] peer transition-colors" />
              <label htmlFor="googleMapsUrl" className="absolute text-[10px] tracking-[0.2em] font-semibold uppercase text-white/40 duration-300 transform -translate-y-4 top-5 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-[#C8A96A]">{t('projectForm.googleMapsUrl')}</label>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <ImageDropzoneInput 
                  label={t('projectForm.coverImage')}
                  onUploadSuccess={handleCoverUploadSuccess}
                  onRemove={handleCoverRemove}
                  currentImageUrl={formData.coverImage}
                />
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <GalleryUploadInput 
                  label={t('projectForm.gallery')}
                  images={formData.gallery}
                  onImagesChange={handleGalleryChange}
                />
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 mb-4 font-semibold">{t('projectForm.amenities')}</label>
              <div className="flex space-x-4 mb-4">
                <input 
                  type="text" 
                  value={amenityInput} 
                  onChange={(e) => setAmenityInput(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAmenity())}
                  className="flex-grow px-0 py-2 bg-transparent border-0 border-b border-white/20 text-white focus:border-[#C8A96A] focus:ring-0 outline-none placeholder-white/20 rtl:ml-4 rtl:mr-0" 
                  placeholder={t('projectForm.amenityPlaceholder')}
                />
                <button type="button" onClick={handleAddAmenity} className="px-6 py-2 bg-[#111] border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white text-[10px] tracking-[0.2em] font-bold uppercase">{t('projectForm.add')}</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {formData.amenities.map(amenity => (
                  <span key={amenity} className="px-4 py-2 bg-[#C8A96A]/10 text-[#C8A96A] rounded-xl text-xs flex items-center border border-[#C8A96A]/20 shadow-sm">
                    {amenity}
                    <button type="button" onClick={() => handleRemoveAmenity(amenity)} className="ml-3 hover:text-white hover:scale-110 transition-transform">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-12 pt-2">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 rounded border border-white/20 bg-white/5 group-hover:border-[#C8A96A]/50 transition-colors">
                  <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} className="peer absolute w-full h-full opacity-0 cursor-pointer" />
                  <div className="w-full h-full bg-[#C8A96A] rounded-[3px] scale-0 peer-checked:scale-100 transition-transform flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                </div>
                <span className="text-sm font-light text-white/70 group-hover:text-white transition-colors rtl:pr-3">{t('projectForm.published')}</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 rounded border border-white/20 bg-white/5 group-hover:border-[#C8A96A]/50 transition-colors">
                  <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="peer absolute w-full h-full opacity-0 cursor-pointer" />
                  <div className="w-full h-full bg-[#C8A96A] rounded-[3px] scale-0 peer-checked:scale-100 transition-transform flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                </div>
                <span className="text-sm font-light text-white/70 group-hover:text-white transition-colors rtl:pr-3">{t('projectForm.featured')}</span>
              </label>
            </div>

          </form>
        </div>

        <div className="p-8 border-t border-white/5 flex justify-between items-center relative z-20 bg-black/20">
          <div>
            {projectToEdit && (
              <button type="button" onClick={() => setIsConfirmDeleteOpen(true)} disabled={isLoading} className="flex items-center space-x-2 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 px-4 py-2 rounded-xl transition-colors text-[10px] uppercase tracking-[0.25em] font-bold disabled:opacity-50">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                <span className="rtl:pr-2">{t('projectForm.delete')}</span>
              </button>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button type="button" onClick={onClose} className="px-8 py-3.5 text-white/50 hover:text-white font-['Inter'] text-[10px] uppercase tracking-[0.25em] font-semibold transition-colors hover:bg-white/5 rounded-xl rtl:ml-4 rtl:mr-0">
              {t('projectForm.cancel')}
            </button>
            <button form="project-form" type="submit" disabled={isLoading} className="px-10 py-3.5 bg-gradient-to-r from-[#C8A96A] to-[#E5D09C] text-black font-['Inter'] font-bold text-[10px] uppercase tracking-[0.3em] rounded-xl hover:shadow-[0_0_20px_rgba(200,169,106,0.3)] transition-all duration-300 disabled:opacity-50 disabled:grayscale flex items-center space-x-3 group">
              {isLoading && <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />}
              <span>{isLoading ? t('projectForm.saving') : t('projectForm.save')}</span>
              {!isLoading && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>}
            </button>
          </div>
        </div>
        
      </div>

      <ConfirmationModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t('projectForm.deleteTitle')}
        message={t('projectForm.deleteMessage')}
        confirmText={t('projectForm.confirmDelete')}
        cancelText={t('projectForm.keepIt')}
        isLoading={isLoading}
        type="danger"
      />
    </div>
  );
}
