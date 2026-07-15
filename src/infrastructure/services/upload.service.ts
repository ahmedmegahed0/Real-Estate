import { apiClient } from '../api/api-client';

export const UploadService = {
  // Admin Endpoints
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file); // default key for typical nestjs upload

    const response = await apiClient.post<{ message: string; data: { url: string } }>('/admin/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    // Assumes backend returns { data: { url: 'https://...' } }
    return response.data.data.url;
  }
};
