import { useState, useEffect, useCallback } from 'react';
import { ProjectService } from '../../infrastructure/services/project.service';
import type { Project } from '../../domain/types/project.types';

export function useProjects(type: 'public' | 'admin' | 'featured' = 'public') {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let data: Project[] = [];
      if (type === 'admin') {
        data = await ProjectService.getAdminProjects();
      } else if (type === 'featured') {
        data = await ProjectService.getFeaturedProjects();
      } else {
        data = await ProjectService.getPublicProjects();
      }
      setProjects(data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch projects');
    } finally {
      setIsLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    isLoading,
    error,
    refetch: fetchProjects,
  };
}
