import { useState } from 'react';
import { LeadService } from '../../infrastructure/services/lead.service';
import type { SubmitLeadInput } from '../../domain/types/lead.types';

export function useSubmitLead() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitLead = async (data: SubmitLeadInput) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    
    try {
      await LeadService.submitLead(data);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to submit lead. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setSuccess(false);
    setError(null);
    setIsSubmitting(false);
  };

  return { submitLead, isSubmitting, success, error, reset };
}
