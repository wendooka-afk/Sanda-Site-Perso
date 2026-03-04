import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, Component, type ReactNode } from 'react';
import { LanguageProvider } from './i18n';
import { Layout } from './components/Layout';

// ─── Lazy-loaded pages ────────────────────────────────────────────────────────
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const FormationsPage = lazy(() => import('./pages/FormationsPage'));
const FormationDetailPage = lazy(() => import('./pages/FormationDetailPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage'));
const MediaPage = lazy(() => import('./pages/MediaPage'));
const BookPage = lazy(() => import('./pages/BookPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const RessourcesPage = lazy(() => import('./pages/RessourcesPage'));
const MediaKitPage = lazy(() => import('./pages/MediaKitPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// ─── Lazy-loaded dashboard ────────────────────────────────────────────────────
const DashboardLayout = lazy(() => import('./dashboard/DashboardLayout'));
const DashboardOverview = lazy(() => import('./dashboard/DashboardOverview'));
const DashboardArticles = lazy(() => import('./dashboard/DashboardArticles'));
const DashboardFormations = lazy(() => import('./dashboard/DashboardFormations'));
const DashboardComments = lazy(() => import('./dashboard/DashboardComments'));
const DashboardLeads = lazy(() => import('./dashboard/DashboardLeads'));
const DashboardMedia = lazy(() => import('./dashboard/DashboardMedia'));
const DashboardAnalytics = lazy(() => import('./dashboard/DashboardAnalytics'));
const DashboardSettings = lazy(() => import('./dashboard/DashboardSettings'));
const DashboardLinks = lazy(() => import('./dashboard/DashboardLinks'));
import { ProtectedRoute, DashboardLogin } from './dashboard/DashboardAuth';

// ─── Global Error Boundary ─────────────────────────────────────────────────
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white p-8 text-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Une erreur est survenue</h1>
            <p className="text-gray-500 mb-6">Rechargez la page ou revenez à l'accueil.</p>
            <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors">
              Retour à l'accueil
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
// ───────────────────────────────────────────────────────────────────────────

// Minimal fallback shown during lazy-load (no layout shift)
function PageLoader() {
  return <div className="min-h-screen bg-white" aria-hidden="true" />;
}

export function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Site */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/a-propos" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/formations" element={<FormationsPage />} />
              <Route path="/formations/:slug" element={<FormationDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogArticlePage />} />
              <Route path="/medias" element={<MediaPage />} />
              <Route path="/livres" element={<BookPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/ressources" element={<RessourcesPage />} />
              <Route path="/kit-media" element={<MediaKitPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Admin Dashboard — Login page (public) */}
            <Route path="/dashboard/login" element={<DashboardLogin />} />

            {/* Admin Dashboard — Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="articles" element={<DashboardArticles />} />
                <Route path="formations" element={<DashboardFormations />} />
                <Route path="links" element={<DashboardLinks />} />
                <Route path="comments" element={<DashboardComments />} />
                <Route path="leads" element={<DashboardLeads />} />
                <Route path="media" element={<DashboardMedia />} />
                <Route path="analytics" element={<DashboardAnalytics />} />
                <Route path="settings" element={<DashboardSettings />} />
              </Route>
            </Route>
          </Routes>
          </Suspense>
        </BrowserRouter>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
