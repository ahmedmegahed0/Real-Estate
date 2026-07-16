import type { DashboardStats } from '../../../domain/types/dashboard.types';

interface StatsGridProps {
  stats: DashboardStats | null;
  isLoading: boolean;
}

export function StatsGridComponent({ stats, isLoading }: StatsGridProps) {
  const statCards = [
    {
      title: 'Total Projects',
      value: stats?.counters?.totalProjects || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M2 15h10"></path><path d="M9 18l3-3-3-3"></path></svg>
      ),
      color: 'from-blue-500/20 to-blue-500/5',
      textColor: 'text-blue-400'
    },
    {
      title: 'Published Projects',
      value: stats?.counters?.publishedProjects || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      ),
      color: 'from-green-500/20 to-green-500/5',
      textColor: 'text-green-400'
    },
    {
      title: 'Featured Projects',
      value: stats?.counters?.featuredProjects || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      ),
      color: 'from-yellow-500/20 to-yellow-500/5',
      textColor: 'text-yellow-400'
    },
    {
      title: 'Total Leads',
      value: stats?.counters?.totalLeads || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      ),
      color: 'from-[#C8A96A]/20 to-[#C8A96A]/5',
      textColor: 'text-[#C8A96A]'
    },
    {
      title: 'New Leads',
      value: stats?.counters?.newLeads || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
      ),
      color: 'from-purple-500/20 to-purple-500/5',
      textColor: 'text-purple-400'
    },
    {
      title: 'Processed Leads',
      value: stats?.counters?.processedLeads || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      ),
      color: 'from-pink-500/20 to-pink-500/5',
      textColor: 'text-pink-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {isLoading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-[#1a1a1a]/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 shadow-2xl animate-pulse">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5" />
              <div className="h-4 bg-white/5 rounded-full w-24" />
            </div>
            <div className="h-10 bg-white/5 rounded-lg w-16" />
          </div>
        ))
      ) : (
        statCards.map((card, index) => (
          <div 
            key={index} 
            className="group bg-[#1a1a1a]/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-1"
          >
            {/* Ambient Background Glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} rounded-full blur-[50px] opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10 flex items-center justify-between mb-4">
              <h3 className="text-sm font-['Inter'] font-medium text-white/50 tracking-wide uppercase">{card.title}</h3>
              <div className={`p-2 rounded-xl bg-gradient-to-br ${card.color} ${card.textColor} shadow-inner`}>
                {card.icon}
              </div>
            </div>
            
            <div className="relative z-10 flex items-end justify-between">
              <h2 className="text-4xl font-['Playfair_Display'] font-bold text-white tracking-tight">
                {card.value.toLocaleString()}
              </h2>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
