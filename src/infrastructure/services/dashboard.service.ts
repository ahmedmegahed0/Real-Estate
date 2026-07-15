import { apiClient } from '../api/api-client';
import type { DashboardStats } from '../../domain/types/dashboard.types';

export const DashboardService = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<any>('/admin/dashboard/stats');
    console.log('Dashboard API Raw Response:', response.data);
    return response.data.data || response.data;
  }
};
