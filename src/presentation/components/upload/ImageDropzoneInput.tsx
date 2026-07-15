import React, { useCallback, useState } from 'react';
import { useImageUpload } from '../../../application/hooks/use-image-upload';

interface ImageDropzoneInputProps {
  label?: string;
  onUploadSuccess: (url: string) => void;
  onRemove: () => void;
  currentImageUrl?: string;
}

export function ImageDropzoneInput({
  label = 'Cover Image',
  onUploadSuccess,
  onRemove,
  currentImageUrl,
}: ImageDropzoneInputProps) {
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

  const processFile = async (file: File) => {
    const url = await handleUpload(file);
    if (url) {
      onUploadSuccess(url);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [handleUpload, onUploadSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
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

      {!currentImageUrl ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed transition-all duration-300 ${
            isDragging 
              ? 'border-[#C8A96A] bg-[#C8A96A]/5' 
              : 'border-white/10 hover:border-[#C8A96A]/50 bg-black/20 hover:bg-black/40'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          
          {isUploading ? (
            <div className="flex flex-col items-center text-[#C8A96A] space-y-3">
              <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-white/40 space-y-3 pointer-events-none">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={isDragging ? "text-[#C8A96A]" : ""}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              <div className="text-center">
                <p className="text-sm font-medium text-white/80">Click or drag image here</p>
                <p className="text-[10px] mt-1">SVG, PNG, JPG or GIF (Max. 5MB)</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-white/10 shadow-lg group bg-black/40">
          <img src={currentImageUrl} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
            <button
              type="button"
              onClick={onRemove}
              className="px-6 py-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/50 rounded-xl text-xs uppercase tracking-widest font-bold transition-colors flex items-center space-x-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              <span>Remove Image</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
