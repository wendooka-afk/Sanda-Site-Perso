import { useParams, Navigate } from 'react-router-dom';
import { guides } from '../data/guides';
import { useLanguage } from '../i18n';
import { useEffect } from 'react';

/**
 * GuideArticlePage — Redirects to the static HTML guide.
 *
 * Guide articles are standalone static HTML files stored in
 * public/guide/<slug>/index.html with their own design, SEO,
 * and structured data. This component simply performs a hard
 * redirect so the browser loads the static HTML directly,
 * preserving the original formatting exactly as intended.
 */
export default function GuideArticlePage() {
  const { slug } = useParams();
  const { localePath } = useLanguage();

  const guide = guides.find((g) => g.slug === slug);

  useEffect(() => {
    if (guide) {
      // Hard redirect to the static HTML file — bypasses React SPA
      window.location.replace(`/guide/${guide.slug}/`);
    }
  }, [guide]);

  if (!guide) {
    return <Navigate to={localePath('/guide')} replace />;
  }

  // Show minimal loading state while redirect happens
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#e8d48b] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#7a7a7a] text-sm font-medium">Chargement du guide…</p>
      </div>
    </div>
  );
}
