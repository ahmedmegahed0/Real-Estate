import { useState } from 'react';
import { UploadService } from '../../infrastructure/services/upload.service';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'Please select a valid image file.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size exceeds the 5MB limit.';
    }
    return null;
  };

  const handleUpload = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    setError(null);
    setUploadedUrl(null);

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setIsUploading(false);
      return null;
    }

    try {
      const url = await UploadService.uploadImage(file);
      setUploadedUrl(url);
      return url;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to upload image';
      setError(errorMsg);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    handleUpload,
    isUploading,
    error,
    uploadedUrl,
  };
}
