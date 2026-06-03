import { useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { guides } from '../data/guides';
import { useLanguage } from '../i18n';
import { SEOHead } from '../components/SEOHead';
import '../styles/guide.css';

/**
 * GuideArticlePage — renders a guide article INSIDE the React site shell.
 *
 * The article body lives in src/data/guides-html/<slug>.html (content only —
 * no <head>, no nav, no footer). It is injected here so the page uses the
 * SAME <Navbar> and <Footer> as every other page (this route is under <Layout>).
 * The guide's CSS is scoped under `.guide-content` (src/styles/guide.css) so it
 * cannot leak onto the rest of the site.
 *
 * eager glob = content is bundled synchronously → present at first paint → the
 * prerender step captures the full article (SEO preserved).
 */
const guideHtml = import.meta.glob('../data/guides-html/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function getHtml(slug: string): string | undefined {
  const entry = Object.entries(guideHtml).find(([path]) => path.endsWith(`/${slug}.html`));
  return entry?.[1];
}

export default function GuideArticlePage() {
  const { slug } = useParams();
  const { localePath } = useLanguage();

  const guide = guides.find((g) => g.slug === slug);
  const html = slug ? getHtml(slug) : undefined;

  useEffect(() => {
    if (!html) return;

    // Fonts utilisées par les articles guide (Poppins + Source Serif 4)
    if (!document.getElementById('guide-fonts')) {
      const link = document.createElement('link');
      link.id = 'guide-fonts';
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap';
      document.head.appendChild(link);
    }

    // Charge le script AdSense si absent (les <script> inline du HTML ne s'exécutent
    // pas via dangerouslySetInnerHTML — on pousse les pubs manuellement)
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
      const s = document.createElement('script');
      s.async = true;
      s.crossOrigin = 'anonymous';
      s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4434058814138910';
      document.head.appendChild(s);
    }

    const timer = window.setTimeout(() => {
      const ads = document.querySelectorAll('.guide-content ins.adsbygoogle');
      ads.forEach(() => {
        try {
          // @ts-expect-error — injecté globalement par le script AdSense
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch {
          /* bloqueur de pub actif — silencieux */
        }
      });
    }, 600);

    return () => window.clearTimeout(timer);
  }, [html]);

  if (!guide || !html) {
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
      <article className="guide-content" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
