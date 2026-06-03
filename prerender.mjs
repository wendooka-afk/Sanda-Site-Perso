/**
 * prerender.mjs — Génère du HTML statique pour chaque route SPA via Puppeteer.
 *
 * Pourquoi ?
 *   - Ahrefs/Google crawlers ne rendent pas le JS de façon fiable.
 *   - Sans prerendering, chaque route renvoie le même index.html quasi vide.
 *   - Avec prerendering, chaque route a son vrai H1, son vrai contenu, son vrai schema.
 *
 * Usage : lancé automatiquement après `vite build` via le script npm `build`.
 */

import puppeteer from 'puppeteer';
import sirv from 'sirv';
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');
const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;

// ═══════════════════════════════════════════════════════════════
//  ROUTES À PRERENDER
// ═══════════════════════════════════════════════════════════════

const BLOG_SLUGS_FR = [
  'bmo-banque-montreal-guide-services-bancaires-en-ligne',
  'creer-llc-usa-afrique-guide-complet',
  'vibe-coding-saas-sans-coder',
  'creer-videos-ia-google-veo',
  'societe-offshore-royaume-uni-afrique',
  'gagner-argent-ia-2026',
  'afrique-rate-ia-rate-futur',
  'creer-commentsticker-saas-ia',
  'sora-vs-veo-vs-wan-outil-video-ia',
  'productivite-chatgpt-cerveau-augmente',
  'ouvrir-stripe-cameroun-afrique',
  'creer-vendre-formation-ligne-afrique',
  'pourquoi-formations-ia-inutiles',
  'top-10-outils-ia-gratuits-entrepreneurs',
  'vendre-sites-web-ia-revenus',
  'no-code-vs-vibe-coding',
  'elevenlabs-cloner-voix-ia',
  'mobile-money-business-digital-afrique',
  'formateur-500-entrepreneurs-ia-lecons',
  'automatiser-business-ia-strategies',
  'freelance-afrique-statut-paiements',
  'ia-tuer-freelancing-analyse',
  'izimentor-avis-2025',
];

const BLOG_SLUGS_EN = [
  '7-ai-tools-profitable-side-hustle-2026',
  'ai-passive-income-stream-step-by-step',
  'ai-budget-automation-save-10-hours-week',
  'how-to-start-budgeting-beginners-guide-2026',
  '25-free-printable-diy-crafts-kids-adults',
];

const FORMATION_SLUGS = ['protocole-video-ia', 'cerveau-augmente', 'offshore-empire', 'challenge-30-jours'];

const RESOURCE_SLUGS_FR = [
  'outils-ia-entrepreneurs',
  'checklist-lancer-business-30-jours',
  'prompt-pack-50-chatgpt',
  'formation-video-premier-revenu-ia',
  'template-plan-contenu-30-jours',
  'checklist-seo-27-points',
  'glossaire-ia-150-termes',
  'template-page-de-vente',
  'ma-stack-complete',
];

const RESOURCE_SLUGS_EN = [
  'ai-tools-entrepreneurs',
  'checklist-launch-ai-business-30-days',
  'prompt-pack-50-chatgpt',
  'video-training-first-online-income-ai',
  'template-30-day-content-plan',
  'seo-checklist-27-points',
  'ai-glossary-150-terms',
  'sales-page-template',
  'my-complete-stack',
];

const GUIDE_SLUGS_FR = [
  'comment-avoir-claude-code-gratuitement',
  'comment-utiliser-veo-3-videos-publicitaires',
  'comment-utiliser-suno-ai-creer-musique',
];

const ROUTES = [
  // ── Pages principales FR ──
  '/',
  '/a-propos',
  '/services',
  '/formations',
  '/blog',
  '/guide',
  '/medias',
  '/livres',
  '/contact',
  '/ressources',
  '/kit-media',
  '/challenge-30-jours',
  '/links',
  '/quiz-ia',

  // ── Pages principales EN ──
  '/en/',
  '/en/a-propos',
  '/en/services',
  '/en/formations',
  '/en/blog',
  '/en/medias',
  '/en/livres',
  '/en/contact',
  '/en/ressources',
  '/en/kit-media',

  // ── Formations ──
  ...FORMATION_SLUGS.map((s) => `/formations/${s}`),
  ...FORMATION_SLUGS.map((s) => `/en/formations/${s}`),

  // ── Articles blog FR ──
  ...BLOG_SLUGS_FR.map((s) => `/blog/${s}`),

  // ── Articles blog EN ──
  ...BLOG_SLUGS_EN.map((s) => `/en/blog/${s}`),

  // ── Guides FR ──
  ...GUIDE_SLUGS_FR.map((s) => `/guide/${s}`),

  // ── Ressources ──
  ...RESOURCE_SLUGS_FR.map((s) => `/ressources/${s}`),
  ...RESOURCE_SLUGS_EN.map((s) => `/en/ressources/${s}`),
];

// ═══════════════════════════════════════════════════════════════
//  SERVEUR STATIQUE LOCAL
// ═══════════════════════════════════════════════════════════════

async function startServer() {
  // Capture le SPA shell AVANT tout prerendering (sinon il serait écrasé par le rendu de `/`)
  const shellHtml = await fs.readFile(path.join(DIST, 'index.html'), 'utf-8');

  // Servir les assets réels, et TOUJOURS retomber sur le shell in-memory pour le SPA
  const serve = sirv(DIST, { single: false, dev: false, etag: false });
  const server = http.createServer((req, res) => {
    serve(req, res, () => {
      // Fallback : shell SPA original (jamais écrasé pendant la boucle)
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(shellHtml);
    });
  });
  return new Promise((resolve) => {
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

// ═══════════════════════════════════════════════════════════════
//  PRERENDER
// ═══════════════════════════════════════════════════════════════

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  try {
    const url = BASE_URL + route;

    // Bloquer les requêtes externes (YouTube, AdSense, Google Fonts) — elles ralentissent le prerender
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const u = req.url();
      if (
        u.includes('googlesyndication') ||
        u.includes('googletagmanager') ||
        u.includes('youtube.com') ||
        u.includes('youtu.be') ||
        u.includes('doubleclick') ||
        u.includes('google-analytics') ||
        u.includes('fonts.googleapis') ||
        u.includes('fonts.gstatic')
      ) {
        return req.abort();
      }
      req.continue();
    });

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });

    // Attendre que React ait monté l'arbre
    await page.waitForFunction(
      () => {
        const root = document.getElementById('root');
        return root && root.innerHTML.length > 2000;
      },
      { timeout: 20_000 }
    ).catch(() => {
      console.warn(`  ⚠ Content timeout for ${route}, saving partial`);
    });

    // Laisser react-helmet-async + lazy components finir
    await new Promise((r) => setTimeout(r, 1500));

    // Déduplication : si react-helmet-async a posé un tag (data-rh="true"),
    // supprimer les versions statiques du <head> pour éviter les tags dupliqués
    // (sinon Google/Ahrefs voient 2× meta description, 2× canonical, etc.)
    await page.evaluate((isHome) => {
      const dedupe = (selector) => {
        const els = Array.from(document.querySelectorAll(selector));
        const rh = els.filter((el) => el.hasAttribute('data-rh'));
        if (rh.length > 0) {
          els.forEach((el) => {
            if (!el.hasAttribute('data-rh')) el.remove();
          });
        }
      };
      [
        'meta[name="description"]',
        'meta[name="robots"]',
        'meta[name="keywords"]',
        'link[rel="canonical"]',
        'link[rel="alternate"]',
        'meta[property^="og:"]',
        'meta[property^="article:"]',
        'meta[name^="twitter:"]',
      ].forEach(dedupe);

      // JSON-LD static (dans index.html) = homepage schema.
      // Sur toute page NON-homepage, supprimer le JSON-LD statique, garder uniquement celui posé par SEOHead.
      if (!isHome) {
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        scripts.forEach((s) => {
          if (!s.hasAttribute('data-rh')) s.remove();
        });
      }
    }, route === '/');

    const html = await page.content();

    // Chemin de sortie : / → dist/index.html, /foo → dist/foo/index.html
    const relPath = route === '/' ? 'index.html' : path.join(route.replace(/^\//, ''), 'index.html');
    const outPath = path.join(DIST, relPath);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, html, 'utf-8');

    console.log(`  ✓ ${route}`);
  } catch (err) {
    console.error(`  ✗ ${route} — ${err.message}`);
  } finally {
    await page.close();
  }
}

// ═══════════════════════════════════════════════════════════════
//  GÉNÉRATION AUTOMATIQUE DU SITEMAP.XML
// ═══════════════════════════════════════════════════════════════

const SITE_URL = 'https://oumarousanda.com';

function priorityFor(route) {
  if (route === '/') return '1.0';
  if (route === '/blog' || route === '/formations') return '0.9';
  if (route.startsWith('/blog/') || route.startsWith('/formations/') || route.startsWith('/guide/')) return '0.8';
  if (route.startsWith('/en/')) return '0.6';
  return '0.7';
}

function changefreqFor(route) {
  if (route === '/' || route === '/blog' || route === '/en/blog') return 'weekly';
  if (route.startsWith('/blog/') || route.startsWith('/en/blog/')) return 'monthly';
  return 'monthly';
}

async function generateSitemap() {
  // Exclure les pages techniques qui ne doivent pas être indexées
  const excluded = new Set(['/links', '/quiz-ia', '/challenge-30-jours']);
  const today = new Date().toISOString().split('T')[0];

  const urls = ROUTES
    .filter((r) => !excluded.has(r))
    .map((route) => {
      // Normaliser /en/ → /en (sans slash final hors racine)
      const path = route === '/en/' ? '/en' : route;
      return `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreqFor(route)}</changefreq>
    <priority>${priorityFor(route)}</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  await fs.writeFile(path.join(DIST, 'sitemap.xml'), xml, 'utf-8');
  console.log(`\n📄 Sitemap generated with ${ROUTES.length - excluded.size} URLs`);
}

async function main() {
  console.log(`\n🔧 Prerendering ${ROUTES.length} routes...\n`);

  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  });

  try {
    // Prerender en parallèle par batch de 4 (évite de surcharger la RAM)
    const BATCH_SIZE = 4;
    for (let i = 0; i < ROUTES.length; i += BATCH_SIZE) {
      const batch = ROUTES.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map((r) => prerenderRoute(browser, r)));
    }
  } finally {
    await browser.close();
    server.close();
  }

  await generateSitemap();

  console.log(`\n✅ Prerendering done. ${ROUTES.length} routes processed.\n`);
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
