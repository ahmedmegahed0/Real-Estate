import { useState } from 'react';
import { Routes, Route, useNavigate, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from './application/hooks/use-auth';
import { ClientLayout } from './presentation/components/public/ClientLayout';
import { HomePage } from './presentation/components/public/HomePage';
import { ProjectDetailsPage } from './presentation/components/public/ProjectDetailsPage';
import { ProjectsPage } from './presentation/components/public/ProjectsPage';
import { LoginPage } from './presentation/components/auth/LoginPage';
import { OtpVerificationPage } from './presentation/components/auth/OtpVerificationPage';
import { ForgetPasswordPage } from './presentation/components/auth/ForgetPasswordPage';
import { ResetPasswordPage } from './presentation/components/auth/ResetPasswordPage';
import { ProtectedRoute } from './presentation/components/auth/ProtectedRoute';
import { ProjectsDashboard } from './presentation/components/projects/ProjectsDashboard';
import { LeadsDashboardTable } from './presentation/components/leads/LeadsDashboardTable';
import { SettingsPage } from './presentation/components/settings/SettingsPage';
import { DashboardMainPage } from './presentation/components/dashboard/DashboardMainPage';

function DashboardLayout() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div 
      className="min-h-screen font-['Inter'] flex flex-col md:flex-row relative overflow-hidden bg-cover bg-center bg-fixed"
      style={{ backgroundImage: 'url(/bg.png)' }}
    >
      {/* Heavy Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-[10px] z-0" />

      {/* Background Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#C8A96A]/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#C8A96A]/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-6 bg-[#111111]/80 backdrop-blur-xl border-b border-white/10 z-40 relative">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 bg-black">
            <img src="/logo.png" alt="Creative Eye" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-lg font-['Playfair_Display'] text-[#C8A96A] tracking-wide">Creative Eye</h2>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white/80 hover:text-white"
        >
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* Mobile Overlay Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Glassmorphism */}
      <div className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 z-50 w-72 bg-[#111111]/90 md:bg-[#111111]/60 backdrop-blur-3xl border-r border-white/5 p-8 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-in-out`}>
        <div 
          className="hidden md:flex flex-col items-center mb-12 cursor-pointer group" 
          onClick={() => navigate('/dashboard')}
        >
          <div className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 mb-4 overflow-hidden border border-white/10 group-hover:border-[#C8A96A]/50 group-hover:shadow-[0_0_20px_rgba(200,169,106,0.2)] bg-black">
            <img src="/logo.png" alt="Creative Eye Logo" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
          </div>
          <h2 className="text-xl font-['Playfair_Display'] text-white tracking-wide group-hover:text-[#C8A96A] transition-colors">Creative Eye</h2>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96A] mt-1">Admin Portal</span>
        </div>

        <nav className="flex flex-col space-y-3 mt-8 md:mt-0">
          <button 
            onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }} 
            className="flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 text-white/60 hover:text-white hover:bg-white/5 active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <span className="text-xs uppercase tracking-widest font-medium">Overview</span>
          </button>

          <button 
            onClick={() => { navigate('/dashboard/projects'); setIsMobileMenuOpen(false); }} 
            className="flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 text-white/60 hover:text-white hover:bg-white/5 active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M2 15h10"></path><path d="M9 18l3-3-3-3"></path></svg>
            <span className="text-xs uppercase tracking-widest font-medium">Projects</span>
          </button>
          
          <button 
            onClick={() => { navigate('/dashboard/leads'); setIsMobileMenuOpen(false); }} 
            className="flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 text-white/60 hover:text-white hover:bg-white/5 active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span className="text-xs uppercase tracking-widest font-medium">Leads</span>
          </button>

          <button 
            onClick={() => { navigate('/dashboard/settings'); setIsMobileMenuOpen(false); }} 
            className="flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 text-white/60 hover:text-white hover:bg-white/5 active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            <span className="text-xs uppercase tracking-widest font-medium">Settings</span>
          </button>
        </nav>

        <div className="mt-auto">
          <button 
            onClick={() => navigate('/')} 
            className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-xl border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span className="text-[10px] uppercase tracking-widest">Sign Out</span>
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto h-[calc(100vh-89px)] md:h-screen relative z-10 custom-scrollbar">
        <div className="max-w-7xl mx-auto pb-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function AuthLayout() {
  return (
    <div 
      className="min-h-screen bg-[#111111] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: 'url(/bg.png)' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#111111]/75 backdrop-blur-[2px] z-0"></div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center p-4">
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  const navigate = useNavigate();

  return (
    <AuthProvider>
      <Routes>
        {/* Public Client Routes */}
        <Route element={<ClientLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        </Route>

        {/* Admin Auth Routes */}
        <Route element={<AuthLayout />}>
          
          <Route path="/login" element={
            <LoginPage 
              onSuccess={() => navigate('/verify')}
              onNavigateToForgetPassword={() => navigate('/forget-password')}
            />
          } />
          
          <Route path="/verify" element={<OtpVerificationPage />} />
          
          <Route path="/forget-password" element={
            <ForgetPasswordPage 
              onBackToLogin={() => navigate('/login')}
              onSuccess={() => navigate('/reset-password')}
            />
          } />
          
          <Route path="/reset-password" element={
            <ResetPasswordPage 
              tempToken="temp_token_mock" // In a real flow, this is passed via state/context
              onSuccess={() => navigate('/login')}
            />
          } />
          
          </Route>
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardMainPage />} />
            <Route path="projects" element={<ProjectsDashboard />} />
            <Route path="leads" element={<LeadsDashboardTable />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Catch-all route to redirect unknown URLs to Home Page */}
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
