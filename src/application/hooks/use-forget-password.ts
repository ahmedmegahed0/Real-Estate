import { useState } from 'react';
import { AuthService } from '../../infrastructure/services/auth.service';

export const useForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tempToken, setTempToken] = useState<string | null>(null);

  const submitForgetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuthService.forgetPassword({ email });
      setTempToken(response.tempToken);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to request password reset.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitForgetPassword, isLoading, error, tempToken };
};
