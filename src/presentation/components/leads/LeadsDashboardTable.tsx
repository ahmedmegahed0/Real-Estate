import { useState } from 'react';
import type { Lead, LeadStatus } from '../../../domain/types/lead.types';
import { useLeads } from '../../../application/hooks/useLeads';
import { useExportLeads } from '../../../application/hooks/useExportLeads';
import { ConfirmationModal } from '../common/ConfirmationModal';

export function LeadsDashboardTable() {
  const { leads, isLoading, error, filter, setFilter, updateStatus, deleteLead, refetch } = useLeads('all');
  const { exportLeads, isExporting } = useExportLeads();
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');
  const [deletingLeadId, setDeletingLeadId] = useState<string | null>(null);

  const statusOptions: LeadStatus[] = ['جديد', 'قيد التواصل', 'مهتم', 'غير مهتم', 'تم التعاقد'];

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    await updateStatus(id, { status: newStatus });
  };

  const handleSaveNotes = async (lead: Lead) => {
    const success = await updateStatus(lead._id, { status: lead.status, notes: tempNotes });
    if (success) {
      setEditingNotesId(null);
    }
  };

  const startEditingNotes = (lead: Lead) => {
    setEditingNotesId(lead._id);
    setTempNotes(lead.notes || '');
  };

  const handleConfirmDelete = async () => {
    if (deletingLeadId) {
      await deleteLead(deletingLeadId);
      setDeletingLeadId(null);
    }
  };

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case 'جديد': return 'bg-blue-500/20 text-blue-400';
      case 'قيد التواصل': return 'bg-purple-500/20 text-purple-400';
      case 'مهتم': return 'bg-yellow-500/20 text-yellow-400';
      case 'غير مهتم': return 'bg-gray-500/20 text-gray-400';
      case 'تم التعاقد': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-['Playfair_Display'] text-[#C8A96A]">Leads Management</h2>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-hidden">
            {['all', 'today', 'week', 'month'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-xs font-['Inter'] uppercase tracking-widest rounded-lg transition-all ${
                  filter === f ? 'bg-[#C8A96A] text-black font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
            <button onClick={refetch} className="px-4 py-2 ml-2 text-xs text-white/50 hover:text-white transition-colors">
              ↻ Refresh
            </button>
          </div>
          
          <button 
            onClick={exportLeads} 
            disabled={isExporting}
            className="flex items-center justify-center space-x-2 px-6 py-2 bg-[#1e7e34]/20 border border-[#1e7e34]/50 text-[#28a745] hover:bg-[#1e7e34]/40 transition-colors rounded-xl text-xs uppercase tracking-widest font-bold disabled:opacity-50"
          >
            {isExporting ? (
              <div className="w-4 h-4 border-2 border-[#28a745] border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            )}
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-[#C8A96A]">Loading leads...</div>
      ) : error ? (
        <div className="text-red-500 bg-red-500/10 p-4 rounded-xl border border-red-500/20">{error}</div>
      ) : leads.length === 0 ? (
        <div className="text-center py-20 text-white/40 font-['Inter']">No leads found for the selected period.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-white/50">
                <th className="pb-4 font-normal">Date</th>
                <th className="pb-4 font-normal">Contact</th>
                <th className="pb-4 font-normal">Project</th>
                <th className="pb-4 font-normal">Status</th>
                <th className="pb-4 font-normal">Notes</th>
                <th className="pb-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-['Inter']">
              {leads.map(lead => (
                <tr key={lead._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 text-white/70">
                    {new Date(lead.createdAt).toLocaleDateString()}
                    <div className="text-xs text-white/40">{new Date(lead.createdAt).toLocaleTimeString()}</div>
                  </td>
                  <td className="py-4">
                    <div className="font-semibold text-white">{lead.fullName}</div>
                    <div className="text-white/60 text-xs mt-1">{lead.phoneNumber}</div>
                    {lead.email && <div className="text-white/40 text-[10px] mt-1">{lead.email}</div>}
                  </td>
                  <td className="py-4 text-[#C8A96A]">
                    {lead.projectId}
                  </td>
                  <td className="py-4">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead._id, e.target.value as LeadStatus)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 outline-none appearance-none cursor-pointer ${getStatusColor(lead.status)}`}
                      dir="rtl"
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status} className="bg-[#1a1a1a] text-white">{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-4">
                    {editingNotesId === lead._id ? (
                      <div className="flex items-center space-x-2 w-48">
                        <input
                          type="text"
                          value={tempNotes}
                          onChange={(e) => setTempNotes(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveNotes(lead)}
                          className="w-full bg-white/5 border border-white/20 rounded px-2 py-1 text-white text-xs focus:border-[#C8A96A] outline-none"
                          autoFocus
                          dir="auto"
                        />
                        <button onClick={() => handleSaveNotes(lead)} className="text-[#C8A96A] text-xs hover:text-white">Save</button>
                        <button onClick={() => setEditingNotesId(null)} className="text-white/50 text-xs hover:text-white">Cancel</button>
                      </div>
                    ) : (
                      <div 
                        className="text-white/60 text-xs cursor-pointer hover:text-white flex items-center group min-h-[1.5rem] w-48"
                        onClick={() => startEditingNotes(lead)}
                        title="Click to edit"
                        dir="auto"
                      >
                        {lead.notes || <span className="text-white/20 italic group-hover:text-white/50">+ Add note</span>}
                      </div>
                    )}
                  </td>
                  <td className="py-4 text-right">
                    <button 
                      onClick={() => setDeletingLeadId(lead._id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                      title="Delete Lead"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmationModal
        isOpen={!!deletingLeadId}
        onClose={() => setDeletingLeadId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Lead"
        message="Are you sure you want to permanently delete this lead? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
}
