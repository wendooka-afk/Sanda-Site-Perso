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
const ResourceDetailPage = lazy(() => import('./pages/ResourceDetailPage'));
const MediaKitPage = lazy(() => import('./pages/MediaKitPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const LinksPage = lazy(() => import('./pages/LinksPage'));
const ChallengePage = lazy(() => import('./pages/ChallengePage'));
const QuizIAPage = lazy(() => import('./pages/QuizIAPage'));

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
const DashboardLogin = lazy(() => import('./dashboard/DashboardAuth').then(m => ({ default: m.DashboardLogin })));
const ProtectedRoute = lazy(() => import('./dashboard/DashboardAuth').then(m => ({ default: m.ProtectedRoute })));

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

/** Public site routes — shared between FR (/) and EN (/en) */
function PublicRoutes() {
  return (
    <>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="a-propos" element={<AboutPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="formations" element={<FormationsPage />} />
        <Route path="formations/:slug" element={<FormationDetailPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogArticlePage />} />
        <Route path="medias" element={<MediaPage />} />
        <Route path="media" element={<MediaPage />} />
        <Route path="livres" element={<BookPage />} />
        <Route path="books" element={<BookPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="ressources" element={<RessourcesPage />} />
        <Route path="ressources/:slug" element={<ResourceDetailPage />} />
        <Route path="resources" element={<RessourcesPage />} />
        <Route path="resources/:slug" element={<ResourceDetailPage />} />
        <Route path="kit-media" element={<MediaKitPage />} />
        <Route path="media-kit" element={<MediaKitPage />} />
        <Route path="challenge-30-jours" element={<ChallengePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <LanguageProvider>
          <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Standalone pages (no navbar/footer) */}
            <Route path="/links" element={<LinksPage />} />
            <Route path="/quiz-ia" element={<QuizIAPage />} />

            {/* English site — /en/* */}
            <Route path="/en/*">
              {PublicRoutes()}
            </Route>

            {/* French site (default) — /* */}
            <Route path="/*">
              {PublicRoutes()}
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
        </LanguageProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
