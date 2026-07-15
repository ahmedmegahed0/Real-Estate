import React, { useCallback, useState } from 'react';
import { useImageUpload } from '../../../application/hooks/use-image-upload';

interface GalleryUploadInputProps {
  label?: string;
  images: string[];
  onImagesChange: (newImages: string[]) => void;
}

export function GalleryUploadInput({
  label = 'Project Gallery',
  images,
  onImagesChange,
}: GalleryUploadInputProps) {
  const { handleUpload, isUploading, error } = useImageUpload();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFiles = async (files: FileList) => {
    const newUrls: string[] = [];
    // We upload them sequentially to avoid spamming the backend if many files, 
    // or we could use Promise.all. Using sequence to share the single hook state easily.
    // In a more robust setup, we might use a robust multi-upload hook.
    for (let i = 0; i < files.length; i++) {
      const url = await handleUpload(files[i]);
      if (url) newUrls.push(url);
    }
    
    if (newUrls.length > 0) {
      onImagesChange([...images, ...newUrls]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [handleUpload, images, onImagesChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const removeImage = (indexToRemove: number) => {
    onImagesChange(images.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="w-full">
      <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 mb-4 font-semibold">
        {label}
      </label>

      {error && (
        <div className="mb-4 p-3 border-l-2 border-red-500/50 bg-red-500/10 text-red-400 text-xs flex items-center space-x-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {images.map((url, idx) => (
          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 shadow-lg group bg-black/40">
            <img src={url} alt={`Gallery image ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/50 flex items-center justify-center transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
        ))}
        
        {/* Upload Zone Button */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed transition-all duration-300 ${
            isDragging 
              ? 'border-[#C8A96A] bg-[#C8A96A]/5' 
              : 'border-white/10 hover:border-[#C8A96A]/50 bg-black/20 hover:bg-black/40'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleChange}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          
          {isUploading ? (
            <div className="flex flex-col items-center text-[#C8A96A] space-y-2">
              <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span className="text-[9px] uppercase tracking-widest font-bold">Uploading</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-white/40 pointer-events-none">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`mb-2 ${isDragging ? "text-[#C8A96A]" : ""}`}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              <p className="text-[10px] font-medium text-white/80 uppercase tracking-wider">Add More</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
