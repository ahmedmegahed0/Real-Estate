import type { DashboardStats } from '../../../domain/types/dashboard.types';
import type { LeadStatus } from '../../../domain/types/lead.types';

interface LatestOverviewProps {
  stats: DashboardStats | null;
  isLoading: boolean;
}

export function LatestOverviewGrid({ stats, isLoading }: LatestOverviewProps) {
  
  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case 'جديد': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'قيد التواصل': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'مهتم': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'غير مهتم': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'تم التعاقد': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Latest Projects Panel */}
      <div className="bg-[#1a1a1a]/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8A96A]/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex items-center justify-between mb-8 relative z-10">
          <h2 className="text-2xl font-['Playfair_Display'] text-white">Latest Projects</h2>
          <div className="p-2 rounded-xl bg-white/5 text-white/50">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M2 15h10"></path><path d="M9 18l3-3-3-3"></path></svg>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 animate-pulse border border-white/5">
                <div className="w-16 h-16 rounded-xl bg-white/10 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/10 rounded-full w-3/4" />
                  <div className="h-3 bg-white/5 rounded-full w-1/2" />
                </div>
              </div>
            ))
          ) : !stats?.latestProjects || stats.latestProjects.length === 0 ? (
            <div className="text-center py-10 text-white/40 font-['Inter'] text-sm">No recent projects found.</div>
          ) : (
            stats.latestProjects.map(project => (
              <div key={project._id} className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-300 group">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 relative">
                  {project.coverImage ? (
                    <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-[#111111] flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/20"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white truncate font-['Inter']">{project.name}</h3>
                  <div className="flex items-center text-xs text-white/50 mt-1 space-x-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span className="truncate">{project.location}</span>
                  </div>
                </div>
                <div className="text-[10px] text-white/30 whitespace-nowrap">
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Latest Leads Panel */}
      <div className="bg-[#1a1a1a]/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex items-center justify-between mb-8 relative z-10">
          <h2 className="text-2xl font-['Playfair_Display'] text-white">Latest Leads</h2>
          <div className="p-2 rounded-xl bg-white/5 text-white/50">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 animate-pulse border border-white/5">
                <div className="w-12 h-12 rounded-full bg-white/10 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/10 rounded-full w-1/2" />
                  <div className="h-3 bg-white/5 rounded-full w-1/3" />
                </div>
              </div>
            ))
          ) : !stats?.latestLeads || stats.latestLeads.length === 0 ? (
            <div className="text-center py-10 text-white/40 font-['Inter'] text-sm">No recent leads found.</div>
          ) : (
            stats.latestLeads.map(lead => (
              <div key={lead._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-300 gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <span className="text-lg font-bold text-[#C8A96A]">{lead.fullName.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-['Inter']">{lead.fullName}</h3>
                    <div className="text-xs text-white/50 mt-1">{lead.phoneNumber}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-end sm:space-y-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(lead.status)}`} dir="rtl">
                    {lead.status}
                  </span>
                  <div className="text-[10px] text-white/30 whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
