import { apiClient } from '../api/api-client';
import type { Lead, SubmitLeadInput, UpdateLeadStatusInput } from '../../domain/types/lead.types';

export const LeadService = {
  // Public Endpoints
  submitLead: async (data: SubmitLeadInput): Promise<void> => {
    await apiClient.post('/leads', data);
  },

  // Admin Endpoints
  getAdminLeads: async (filter?: string): Promise<Lead[]> => {
    const response = await apiClient.get<{ message: string; data: Lead[] }>('/admin/leads', {
      params: filter && filter !== 'all' ? { filter } : undefined
    });
    return response.data.data;
  },

  updateLeadStatus: async (id: string, data: UpdateLeadStatusInput): Promise<Lead> => {
    const response = await apiClient.put<{ message: string; data: Lead }>(`/admin/leads/${id}/status`, data);
    return response.data.data;
  },

  deleteLead: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/leads/${id}`);
  },

  exportLeadsToExcel: async (): Promise<Blob> => {
    const response = await apiClient.get('/admin/leads/export/excel', {
      responseType: 'blob'
    });
    return response.data;
  }
};
