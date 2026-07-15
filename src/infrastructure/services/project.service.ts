import { apiClient } from '../api/api-client';
import type { Project, CreateProjectInput, UpdateProjectInput } from '../../domain/types/project.types';

export const ProjectService = {
  // Public Endpoints
  getPublicProjects: async (): Promise<Project[]> => {
    const response = await apiClient.get<{ message: string; data: Project[] }>('/projects');
    return response.data.data;
  },
  
  getFeaturedProjects: async (): Promise<Project[]> => {
    const response = await apiClient.get<{ message: string; data: Project[] }>('/projects/featured');
    return response.data.data;
  },

  getProjectBySlug: async (slug: string): Promise<Project> => {
    const response = await apiClient.get<{ message: string; data: Project }>(`/projects/${slug}`);
    return response.data.data;
  },

  // Admin Endpoints
  getAdminProjects: async (): Promise<Project[]> => {
    const response = await apiClient.get<{ message: string; data: Project[] }>('/admin/projects');
    return response.data.data;
  },

  createProject: async (data: CreateProjectInput): Promise<Project> => {
    const response = await apiClient.post<{ message: string; data: Project }>('/admin/projects', data);
    return response.data.data;
  },

  updateProject: async (id: string, data: UpdateProjectInput): Promise<Project> => {
    const response = await apiClient.put<{ message: string; data: Project }>(`/admin/projects/${id}`, data);
    return response.data.data;
  },

  deleteProject: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/projects/${id}`);
  }
};
