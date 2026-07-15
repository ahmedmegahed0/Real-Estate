import { useState } from 'react';
import { LeadService } from '../../infrastructure/services/lead.service';

export function useExportLeads() {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportLeads = async () => {
    setIsExporting(true);
    setError(null);
    try {
      const blob = await LeadService.exportLeadsToExcel();
      
      // Create an invisible anchor element to trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to export leads');
    } finally {
      setIsExporting(false);
    }
  };

  return { exportLeads, isExporting, error };
}
