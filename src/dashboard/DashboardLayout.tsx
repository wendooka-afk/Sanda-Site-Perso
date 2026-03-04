import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { path: '/dashboard', icon: '📊', label: 'Vue d\'ensemble', end: true },
  { path: '/dashboard/articles', icon: '📝', label: 'Articles' },
  { path: '/dashboard/formations', icon: '🎓', label: 'Formations' },
  { path: '/dashboard/links', icon: '🔗', label: 'Gestionnaire Liens' },
  { path: '/dashboard/comments', icon: '💬', label: 'Commentaires' },
  { path: '/dashboard/leads', icon: '📧', label: 'Leads & Newsletter' },
  { path: '/dashboard/media', icon: '🎬', label: 'Médias' },
  { path: '/dashboard/analytics', icon: '📈', label: 'Analytics' },
  { path: '/dashboard/settings', icon: '⚙️', label: 'Paramètres' },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string, end?: boolean) => {
    if (end) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const currentPage = menuItems.find(item => isActive(item.path, item.end));

  return (
    <div className="min-h-screen bg-[#0a0b0f] flex">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen
          ${sidebarOpen ? 'w-64' : 'w-20'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-[#0d0e14] border-r border-white/5
          transition-all duration-300 ease-in-out
          flex flex-col
        `}
      >
        {/* Logo */}
        <div className={`p-4 border-b border-white/5 flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
          {sidebarOpen && (
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-sm">
                OS
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Dashboard</p>
                <p className="text-white/40 text-xs">Admin Panel</p>
              </div>
            </Link>
          )}
          <button
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
              if (window.innerWidth < 1024) setMobileOpen(false);
            }}
            className="hidden lg:flex w-8 h-8 rounded-lg bg-white/5 items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const active = isActive(item.path, item.end);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                  ${active
                    ? 'bg-gradient-to-r from-amber-500/15 to-transparent text-amber-400 border border-amber-500/20'
                    : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'
                  }
                `}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                {sidebarOpen && (
                  <span className="text-sm font-medium truncate">{item.label}</span>
                )}
                {active && sidebarOpen && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className={`p-4 border-t border-white/5 ${sidebarOpen ? '' : 'flex justify-center'}`}>
          <button
            onClick={() => navigate('/')}
            className={`
              flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
              text-white/40 hover:text-white hover:bg-white/5 transition-all
              ${sidebarOpen ? '' : 'justify-center'}
            `}
          >
            <span className="text-lg">🏠</span>
            {sidebarOpen && <span className="text-sm">Retour au site</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#0a0b0f]/80 backdrop-blur-xl border-b border-white/5 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-white"
              >
                ☰
              </button>
              <div>
                <h1 className="text-white font-semibold text-lg">
                  {currentPage?.label || 'Dashboard'}
                </h1>
                <p className="text-white/40 text-xs">
                  Bienvenue, Oumarou Sanda
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 w-64">
                <span className="text-white/30">🔍</span>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="bg-transparent text-white text-sm placeholder:text-white/30 outline-none flex-1"
                />
              </div>

              {/* Notifications */}
              <button className="relative w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
                🔔
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">3</span>
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-sm">
                  OS
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
