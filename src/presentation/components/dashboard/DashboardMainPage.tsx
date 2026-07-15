import { useDashboardStats } from '../../../application/hooks/use-dashboard-stats';
import { StatsGridComponent } from './StatsGridComponent';
import { LatestOverviewGrid } from './LatestOverviewGrid';

export function DashboardMainPage() {
  const { stats, isLoading, error, refreshStats } = useDashboardStats();

  return (
    <div className="animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] text-white mb-2 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm font-['Inter'] text-white/50 tracking-wide">
            Welcome back. Here's what's happening with your projects and leads today.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block text-right">
            <div className="text-sm font-medium text-white">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div className="text-xs text-white/40">Real-time statistics</div>
          </div>
          <button 
            onClick={refreshStats}
            disabled={isLoading}
            className="flex items-center space-x-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 disabled:opacity-50 group"
          >
            <svg 
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
              className={`text-[#C8A96A] ${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`}
            >
              <polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            <span className="text-xs font-bold uppercase tracking-widest text-white">Refresh</span>
          </button>
        </div>
      </div>

      {error ? (
        <div className="p-6 mb-8 border-l-4 border-red-500/50 bg-red-500/10 text-red-400 rounded-r-2xl text-sm font-medium flex items-center space-x-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <div>
            <div className="font-bold">Error Loading Dashboard</div>
            <div className="text-red-400/80 mt-1">{error}</div>
          </div>
        </div>
      ) : null}

      <StatsGridComponent stats={stats} isLoading={isLoading} />
      
      <LatestOverviewGrid stats={stats} isLoading={isLoading} />

    </div>
  );
}
