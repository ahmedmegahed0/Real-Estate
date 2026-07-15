import { useState } from 'react';
import { ProjectService } from '../../infrastructure/services/project.service';
import type { CreateProjectInput, UpdateProjectInput } from '../../domain/types/project.types';

export function useProjectMutations(onSuccessCallback?: () => void) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProject = async (data: CreateProjectInput): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await ProjectService.createProject(data);
      if (onSuccessCallback) onSuccessCallback();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to create project');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProject = async (id: string, data: UpdateProjectInput): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await ProjectService.updateProject(id, data);
      if (onSuccessCallback) onSuccessCallback();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to update project');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await ProjectService.deleteProject(id);
      if (onSuccessCallback) onSuccessCallback();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to delete project');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createProject,
    updateProject,
    deleteProject,
    isLoading,
    error,
  };
}
