import { useParams, Navigate } from 'react-router-dom';
import { guides } from '../data/guides';
import { useLanguage } from '../i18n';
import { SEOHead } from '../components/SEOHead';

/**
 * GuideArticlePage — Displays static HTML guides in a full-page iframe.
 *
 * Guide articles are standalone HTML files in public/guide/<slug>/index.html
 * with their own design, SEO, and structured data. This component loads them
 * via iframe to preserve the original formatting exactly as intended,
 * without causing redirect loops.
 */
export default function GuideArticlePage() {
  const { slug } = useParams();
  const { localePath } = useLanguage();

  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    return <Navigate to={localePath('/guide')} replace />;
  }

  return (
    <>
      <SEOHead
        title={guide.title + ' | Oumarou Sanda'}
        description={guide.excerpt}
        canonical={'/guide/' + guide.slug}
        ogType="article"
      />
      <iframe
        src={`/guide/${guide.slug}/index.html`}
        title={guide.title}
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          display: 'block',
          overflow: 'auto',
        }}
      />
    </>
  );
}
