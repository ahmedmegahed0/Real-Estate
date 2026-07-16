import type { Project } from './project.types';
import type { Lead } from './lead.types';

export interface DashboardStats {
  counters: {
    totalProjects: number;
    publishedProjects: number;
    draftProjects: number;
    featuredProjects: number;
    totalLeads: number;
    newLeads: number;
    processedLeads: number;
  };
  leadsStatusDistribution: Record<string, number>;
  recentLeads: Lead[];
  recentProjects: Project[];
}
