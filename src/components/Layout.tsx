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
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
  );
}
