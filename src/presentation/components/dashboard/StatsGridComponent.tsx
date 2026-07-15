import type { DashboardStats } from '../../../domain/types/dashboard.types';

interface StatsGridProps {
  stats: DashboardStats | null;
  isLoading: boolean;
}

export function StatsGridComponent({ stats, isLoading }: StatsGridProps) {
  const statCards = [
    {
      title: 'Total Projects',
      value: stats?.totalProjects || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M2 15h10"></path><path d="M9 18l3-3-3-3"></path></svg>
      ),
      color: 'from-blue-500/20 to-blue-500/5',
      textColor: 'text-blue-400'
    },
    {
      title: 'Total Leads',
      value: stats?.totalLeads || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      ),
      color: 'from-[#C8A96A]/20 to-[#C8A96A]/5',
      textColor: 'text-[#C8A96A]'
    },
    {
      title: "Today's Leads",
      value: stats?.todayLeads || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
      ),
      color: 'from-green-500/20 to-green-500/5',
      textColor: 'text-green-400'
    },
    {
      title: 'Weekly Leads',
      value: stats?.weeklyLeads || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
      ),
      color: 'from-purple-500/20 to-purple-500/5',
      textColor: 'text-purple-400'
    },
    {
      title: 'Monthly Leads',
      value: stats?.monthlyLeads || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
      ),
      color: 'from-orange-500/20 to-orange-500/5',
      textColor: 'text-orange-400'
    },
    {
      title: 'Yearly Leads',
      value: stats?.yearlyLeads || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
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
