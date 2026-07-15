import { apiClient } from '../api/api-client';
import type { Setting } from '../../domain/types/setting.types';

export const SettingService = {
  getSettings: async (): Promise<Setting> => {
    const response = await apiClient.get<{ message: string; data: Setting }>('/settings');
    return response.data.data;
  },

  updateSettings: async (data: Partial<Setting>): Promise<Setting> => {
    const response = await apiClient.put<{ message: string; data: Setting }>('/admin/settings', data);
    return response.data.data;
  }
};
