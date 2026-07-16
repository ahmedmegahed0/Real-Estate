import { useState } from 'react';
import type { Lead, LeadStatus } from '../../../domain/types/lead.types';
import { useLeads } from '../../../application/hooks/useLeads';
import { useExportLeads } from '../../../application/hooks/useExportLeads';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { useTranslation } from 'react-i18next';

export function LeadsDashboardTable() {
  const { t } = useTranslation();
  const { leads, isLoading, error, filter, setFilter, updateStatus, deleteLead, refetch } = useLeads('all');
  const { exportLeads, isExporting } = useExportLeads();
  const [editingNoteLead, setEditingNoteLead] = useState<Lead | null>(null);
  const [deletingLeadId, setDeletingLeadId] = useState<string | null>(null);

  const statusOptions: LeadStatus[] = ['جديد', 'قيد التواصل', 'مهتم', 'غير مهتم', 'تم التعاقد'];

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    await updateStatus(id, { status: newStatus });
  };

  const handleSaveNotes = async (notes: string) => {
    if (editingNoteLead) {
      await updateStatus(editingNoteLead._id, { status: editingNoteLead.status, notes });
      setEditingNoteLead(null);
    }
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
        <h2 className="text-3xl font-['Playfair_Display'] text-[#C8A96A]">{t('leadsDashboard.title')}</h2>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-hidden">
            {['all', 'today', 'week', 'month'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-['Inter'] font-semibold uppercase tracking-widest rounded-lg transition-all ${
                  filter === f ? 'bg-[#C8A96A] text-black font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                {t(`leadsDashboard.filters.${f}`)}
              </button>
            ))}
            <button onClick={refetch} className="px-4 py-2 ml-2 rtl:ml-0 rtl:mr-2 text-sm text-white/50 hover:text-white transition-colors">
              ↻ {t('leadsDashboard.refresh')}
            </button>
          </div>
          
          <button 
            onClick={exportLeads} 
            disabled={isExporting}
            className="flex items-center justify-center space-x-2 px-6 py-2 bg-[#1e7e34]/20 border border-[#1e7e34]/50 text-[#28a745] hover:bg-[#1e7e34]/40 transition-colors rounded-xl text-sm uppercase tracking-widest font-bold disabled:opacity-50"
          >
            {isExporting ? (
              <div className="w-5 h-5 border-2 border-[#28a745] border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            )}
            <span>{t('leadsDashboard.exportExcel')}</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-[#C8A96A] text-lg">{t('leadsDashboard.loading')}</div>
      ) : error ? (
        <div className="text-red-500 bg-red-500/10 p-4 rounded-xl border border-red-500/20 text-lg">{error}</div>
      ) : leads.length === 0 ? (
        <div className="text-center py-20 text-white/40 font-['Inter'] text-lg">{t('leadsDashboard.noLeads')}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-sm uppercase tracking-widest text-white/50">
                <th className="pb-6 font-semibold">{t('leadsDashboard.columns.date')}</th>
                <th className="pb-6 font-semibold">{t('leadsDashboard.columns.contact')}</th>
                <th className="pb-6 font-semibold">{t('leadsDashboard.columns.project')}</th>
                <th className="pb-6 font-semibold">{t('leadsDashboard.columns.status')}</th>
                <th className="pb-6 font-semibold">{t('leadsDashboard.columns.notes')}</th>
                <th className="pb-6 font-semibold text-right rtl:text-left">{t('leadsDashboard.columns.actions')}</th>
              </tr>
            </thead>
            <tbody className="text-base font-['Inter']">
              {leads.map(lead => (
                <tr key={lead._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-6 text-white/80">
                    <div>{new Date(lead.createdAt).toLocaleDateString()}</div>
                    <div className="text-sm text-white/50 mt-1">{new Date(lead.createdAt).toLocaleTimeString()}</div>
                  </td>
                  <td className="py-6">
                    <div className="font-bold text-lg text-white mb-1">{lead.fullName}</div>
                    <div className="text-white/70 text-sm">{lead.phoneNumber}</div>
                    {lead.email && <div className="text-white/50 text-xs mt-1">{lead.email}</div>}
                  </td>
                  <td className="py-6 text-[#C8A96A] font-medium text-base">
                    {typeof lead.projectId === 'object' && lead.projectId !== null 
                      ? (lead.projectId as any).name 
                      : lead.projectId || '-'}
                  </td>
                  <td className="py-6">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead._id, e.target.value as LeadStatus)}
                      className={`text-sm font-bold px-4 py-2 rounded-full border border-white/10 outline-none appearance-none cursor-pointer ${getStatusColor(lead.status)}`}
                      dir="rtl"
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status} className="bg-[#1a1a1a] text-white">{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-6">
                    <div 
                      className="text-white/70 text-sm cursor-pointer hover:text-white hover:bg-white/5 p-3 rounded-xl transition-colors flex items-center group min-h-[3rem] w-64 border border-transparent hover:border-white/10"
                      onClick={() => setEditingNoteLead(lead)}
                      title="Click to edit"
                      dir="auto"
                    >
                      {lead.notes ? (
                        <span className="line-clamp-2">{lead.notes}</span>
                      ) : (
                        <span className="text-white/30 italic group-hover:text-white/60 flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">edit_note</span>
                          {t('leadsDashboard.actions.addNote')}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-6 text-right rtl:text-left">
                    <button 
                      onClick={() => setDeletingLeadId(lead._id)}
                      className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                      title={t('leadsDashboard.deleteTitle')}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Note Modal */}
      {editingNoteLead && (
        <NoteModal 
          lead={editingNoteLead} 
          onClose={() => setEditingNoteLead(null)} 
          onSave={handleSaveNotes} 
          t={t}
        />
      )}

      <ConfirmationModal
        isOpen={!!deletingLeadId}
        onClose={() => setDeletingLeadId(null)}
        onConfirm={handleConfirmDelete}
        title={t('leadsDashboard.deleteTitle')}
        message={t('leadsDashboard.deleteMessage')}
        confirmText={t('leadsDashboard.deleteConfirm')}
        type="danger"
      />
    </div>
  );
}

function NoteModal({ lead, onClose, onSave, t }: { lead: Lead, onClose: () => void, onSave: (notes: string) => void, t: any }) {
  const [notes, setNotes] = useState(lead.notes || '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#1a1a1a] rounded-2xl border border-white/10 p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-['Playfair_Display'] text-[#C8A96A] mb-2">{t('leadsDashboard.actions.addNote')}</h3>
            <p className="text-sm text-white/50 font-['Inter']">{lead.fullName}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-40 bg-white/5 border border-white/20 rounded-xl p-4 text-base text-white focus:border-[#C8A96A] focus:ring-1 focus:ring-[#C8A96A] outline-none resize-none transition-all"
          placeholder={t('leadsDashboard.actions.addNote')}
          dir="auto"
          autoFocus
        />
        
        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-6 py-3 text-sm font-bold text-white/60 hover:text-white transition-colors uppercase tracking-widest rtl:tracking-normal">{t('leadsDashboard.actions.cancel')}</button>
          <button onClick={() => onSave(notes)} className="px-8 py-3 bg-[#C8A96A] text-black text-sm font-bold rounded-xl hover:bg-[#d4b77a] hover:scale-105 transition-all shadow-lg shadow-[#C8A96A]/20 uppercase tracking-widest rtl:tracking-normal">{t('leadsDashboard.actions.save')}</button>
        </div>
      </div>
    </div>
  );
}
