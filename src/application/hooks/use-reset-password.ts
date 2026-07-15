import { useState } from 'react';
import { AuthService } from '../../infrastructure/services/auth.service';
import type { ResetPasswordInput } from '../../domain/types/auth.types';

export const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitResetPassword = async (data: ResetPasswordInput): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await AuthService.resetPassword(data);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitResetPassword, isLoading, error };
};
