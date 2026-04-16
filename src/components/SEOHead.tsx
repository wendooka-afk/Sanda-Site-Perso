import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useLanguage } from '../i18n';

const SITE_URL = 'https://oumarousanda.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/Oumarou Sanda 1.webp`;
const SITE_NAME = 'Oumarou Sanda';

interface SEOHeadProps {
  /** Titre de la page — "|Oumarou Sanda" ajouté automatiquement si absent */
  title: string;
  /** Meta description (150-160 caractères recommandés) */
  description: string;
  /** Chemin canonique, ex: "/blog/mon-article" ou URL complète */
  canonical?: string;
  /** Titre Open Graph (og:title) — fallback sur `title` */
  ogTitle?: string;
  /** Description OG — fallback sur `description` */
  ogDescription?: string;
  /** Image OG — fallback sur SANDA.webp (1200×630) */
  ogImage?: string;
  /** Type OG — 'website' par défaut, 'article' pour les articles de blog */
  ogType?: 'website' | 'article' | 'profile';
  /** ISO date de publication pour les articles (article:published_time) */
  articlePublishedTime?: string;
  /** ISO date de dernière modification (article:modified_time) */
  articleModifiedTime?: string;
  /** Mettre noindex (pour dashboard, pages privées) */
  noindex?: boolean;
  /** Schema.org JSON-LD — objet ou tableau d'objets */
  schema?: object | object[];
}

/**
 * SEOHead — Composant SEO centralisé via react-helmet-async.
 *
 * Remplace tous les anciens hooks useXXXSEO() qui manipulaient le DOM manuellement.
 * Gère : title, meta description, canonical, robots, Open Graph complet,
 * Twitter/X Card, og:locale, article:published_time, JSON-LD Schema.org.
 *
 * @example
 * <SEOHead
 *   title="Blog | IA & Business Digital"
 *   description="Stratégies IA et entrepreneuriat africain."
 *   canonical="/blog"
 *   ogType="website"
 *   schema={{ "@context": "https://schema.org", "@type": "Blog", ... }}
 * />
 */
export function SEOHead({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  articlePublishedTime,
  articleModifiedTime,
  noindex = false,
  schema,
}: SEOHeadProps) {
  const { language } = useLanguage();

  // Ajoute "| Oumarou Sanda" uniquement si non présent
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const resolvedOgTitle = ogTitle ?? fullTitle;
  const resolvedOgDesc = ogDescription ?? description;

  // Construit l'URL canonique absolue
  const canonicalHref = canonical
    ? canonical.startsWith('http')
      ? canonical
      : `${SITE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}`
    : undefined;

  // Construit les URLs alternates FR ↔ EN à partir de la canonical
  // FR: https://oumarousanda.com/blog → EN: https://oumarousanda.com/en/blog
  const { frHref, enHref } = (() => {
    if (!canonicalHref) return { frHref: undefined, enHref: undefined };
    try {
      const u = new URL(canonicalHref);
      const isEn = u.pathname === '/en' || u.pathname.startsWith('/en/');
      const frPath = isEn ? (u.pathname.replace(/^\/en/, '') || '/') : u.pathname;
      const enPath = isEn ? u.pathname : ('/en' + (u.pathname === '/' ? '' : u.pathname));
      return {
        frHref: `${SITE_URL}${frPath}${u.search}`,
        enHref: `${SITE_URL}${enPath}${u.search}`,
      };
    } catch {
      return { frHref: undefined, enHref: undefined };
    }
  })();

  const ogLocale = language === 'en' ? 'en_US' : 'fr_CM';
  const ogLocaleAlt = language === 'en' ? 'fr_CM' : 'en_US';

  // Sérialisation JSON-LD (ne sérialise qu'une fois, stabilisé)
  const schemaStr = schema ? JSON.stringify(schema) : null;

  // Injection JSON-LD directement dans <head> (react-helmet-async 2.x ne rend pas
  // correctement les <script> children avec React 19 — on contourne).
  useEffect(() => {
    if (!schemaStr) return;
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-schema', 'page');
    el.textContent = schemaStr;
    document.head.appendChild(el);
    return () => {
      if (el.parentNode) el.parentNode.removeChild(el);
    };
  }, [schemaStr]);

  // Override robots meta dynamiquement (helmet-async n'override pas le meta statique
  // de index.html de manière fiable — on prend le contrôle via useEffect).
  useEffect(() => {
    const content = noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    let el = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const prev = el?.content;
    if (!el) {
      el = document.createElement('meta');
      el.name = 'robots';
      document.head.appendChild(el);
    }
    el.content = content;
    return () => {
      // Restaure la valeur par défaut si la page se démonte (sécurise les navigations SPA)
      if (el && prev !== undefined) el.content = prev;
    };
  }, [noindex]);

  return (
    <Helmet htmlAttributes={{ lang: language === 'en' ? 'en' : 'fr-CM' }}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Indexation */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* Canonical */}
      {canonicalHref && <link rel="canonical" href={canonicalHref} />}

      {/* ── Hreflang (FR ↔ EN réciproques + x-default FR) ── */}
      {!noindex && frHref && enHref && (
        <>
          <link rel="alternate" hrefLang="fr" href={frHref} />
          <link rel="alternate" hrefLang="fr-CM" href={frHref} />
          <link rel="alternate" hrefLang="en" href={enHref} />
          <link rel="alternate" hrefLang="x-default" href={frHref} />
        </>
      )}

      {/* ── Open Graph ── */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDesc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={resolvedOgTitle} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlt} />
      {canonicalHref && <meta property="og:url" content={canonicalHref} />}
      {articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {ogType === 'article' && (
        <meta property="article:author" content="https://oumarousanda.com/a-propos" />
      )}

      {/* ── Twitter / X Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@oumarou_sanda" />
      <meta name="twitter:creator" content="@oumarou_sanda" />
      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDesc} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={resolvedOgTitle} />

      {/* ── JSON-LD Schema.org ── injecté via useEffect ci-dessus (bypass helmet-async) ── */}
    </Helmet>
  );
}
