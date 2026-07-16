import { useState, useEffect, useCallback } from 'react';
import { LeadService } from '../../infrastructure/services/lead.service';
import type { Lead, UpdateLeadStatusInput } from '../../domain/types/lead.types';

export function useLeads(initialFilter: string = 'all') {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>(initialFilter);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch all leads and filter on frontend since backend filter is broken
      const data = await LeadService.getAdminLeads('all');
      
      let filteredData = data;
      const now = new Date();
      
      if (filter === 'today') {
        filteredData = data.filter(lead => {
          const leadDate = new Date(lead.createdAt);
          return leadDate.toDateString() === now.toDateString();
        });
      } else if (filter === 'week') {
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filteredData = data.filter(lead => new Date(lead.createdAt) >= oneWeekAgo);
      } else if (filter === 'month') {
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filteredData = data.filter(lead => new Date(lead.createdAt) >= oneMonthAgo);
      }
      
      setLeads(filteredData);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch leads');
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const updateStatus = async (id: string, data: UpdateLeadStatusInput): Promise<boolean> => {
    try {
      await LeadService.updateLeadStatus(id, data);
      await fetchLeads(); // refresh leads
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to update lead');
      return false;
    }
  };

  const deleteLead = async (id: string): Promise<boolean> => {
    try {
      await LeadService.deleteLead(id);
      await fetchLeads(); // refresh leads
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to delete lead');
      return false;
    }
  };

  return {
    leads,
    isLoading,
    error,
    filter,
    setFilter,
    updateStatus,
    deleteLead,
    refetch: fetchLeads,
  };
}

export function useSubmitLead() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submitLead = async (data: { fullName: string; email?: string; phoneNumber: string; projectId?: string; notes?: string }) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Use LeadService to submit the lead
      await LeadService.submitLead(data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to submit lead');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitLead, isSubmitting, error };
}
