import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { guides } from '../data/guides';
import { useLanguage } from '../i18n';
import { SEOHead } from '../components/SEOHead';

/**
 * GuideArticlePage — Displays static HTML guides embedded in the site shell.
 *
 * Guide articles are standalone HTML files in public/guide/<slug>/index.html
 * with their own design. They are embedded via a same-origin iframe whose
 * height is synced to its content (no inner scrollbar), so the shared site
 * Navbar (from Layout, fixed) stays visible on top and the Footer renders
 * naturally below — letting visitors navigate back to the rest of the site.
 */
export default function GuideArticlePage() {
  const { slug } = useParams();
  const { localePath } = useLanguage();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(0);

  const guide = guides.find((g) => g.slug === slug);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let observer: ResizeObserver | null = null;

    const syncHeight = () => {
      try {
        const doc = iframe.contentDocument;
        if (doc) setHeight(doc.documentElement.scrollHeight);
      } catch {
        /* cross-origin guard — guides are same-origin so this won't trigger */
      }
    };

    const onLoad = () => {
      syncHeight();
      try {
        const doc = iframe.contentDocument;
        if (doc) {
          observer = new ResizeObserver(syncHeight);
          observer.observe(doc.documentElement);
        }
      } catch { /* noop */ }
      // Fallbacks for late-loading images/fonts inside the guide
      window.setTimeout(syncHeight, 600);
      window.setTimeout(syncHeight, 1500);
    };

    iframe.addEventListener('load', onLoad);
    window.addEventListener('resize', syncHeight);
    return () => {
      iframe.removeEventListener('load', onLoad);
      window.removeEventListener('resize', syncHeight);
      observer?.disconnect();
    };
  }, [slug]);

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
      {/* pt offset clears the fixed Navbar; dark bg matches the guide + navbar */}
      <div className="bg-[#0C0B0B] pt-[72px]">
        <iframe
          ref={iframeRef}
          src={`/guide/${guide.slug}/index.html`}
          title={guide.title}
          scrolling="no"
          style={{
            width: '100%',
            height: height ? `${height}px` : '100vh',
            border: 'none',
            display: 'block',
            overflow: 'hidden',
          }}
        />
      </div>
    </>
  );
}
