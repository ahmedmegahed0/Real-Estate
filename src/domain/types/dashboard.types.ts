import type { Project } from './project.types';
import type { Lead } from './lead.types';

export interface DashboardStats {
  totalProjects: number;
  totalLeads: number;
  todayLeads: number;
  weeklyLeads: number;
  monthlyLeads: number;
  yearlyLeads: number;
  latestProjects: Project[];
  latestLeads: Lead[];
}
