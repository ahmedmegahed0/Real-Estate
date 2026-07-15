import { useState } from 'react';
import { LeadService } from '../../infrastructure/services/lead.service';
import type { SubmitLeadInput } from '../../domain/types/lead.types';

export function useSubmitLead() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitLead = async (input: SubmitLeadInput): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    if (!input.fullName || !input.fullName.trim()) {
      setError('Full name is required.');
      setIsLoading(false);
      return false;
    }
    if (!input.phoneNumber || !input.phoneNumber.trim()) {
      setError('Phone number is required.');
      setIsLoading(false);
      return false;
    }

    try {
      await LeadService.submitLead(input);
      setIsSuccess(true);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'An error occurred while submitting the lead.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitLead,
    isLoading,
    error,
    isSuccess,
  };
}
