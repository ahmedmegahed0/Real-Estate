import { useState, useEffect, useCallback } from 'react';
import { ProjectService } from '../../infrastructure/services/project.service';
import type { Project } from '../../domain/types/project.types';

export function useProject(idOrSlug: string | undefined) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = useCallback(async () => {
    if (!idOrSlug) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await ProjectService.getProjectBySlug(idOrSlug);
      setProject(data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch project');
    } finally {
      setIsLoading(false);
    }
  }, [idOrSlug]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return {
    project,
    isLoading,
    error,
    refetch: fetchProject,
  };
}
