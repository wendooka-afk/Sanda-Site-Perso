import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

const ChatWidget = lazy(() => import('./ChatWidget').then(m => ({ default: m.ChatWidget })));

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-dark-950 text-[#333333]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#0a0a0a] focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
      >
        Aller au contenu principal
      </a>
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
  );
}
