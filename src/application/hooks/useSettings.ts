import { useState, useEffect, useCallback } from 'react';
import { SettingService } from '../../infrastructure/services/setting.service';
import type { Setting } from '../../domain/types/setting.types';

export function useSettings() {
  const [settings, setSettings] = useState<Setting | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await SettingService.getSettings();
      setSettings(data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch settings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = async (data: Partial<Setting>): Promise<boolean> => {
    setIsUpdating(true);
    setError(null);
    try {
      const updatedData = await SettingService.updateSettings(data);
      setSettings(updatedData);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to update settings');
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    settings,
    isLoading,
    isUpdating,
    error,
    updateSettings,
    refetch: fetchSettings,
  };
}
