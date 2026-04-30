import { useParams, Navigate, Link } from 'react-router-dom';
import { guides } from '../data/guides';
import { useLanguage } from '../i18n';
import { SEOHead } from '../components/SEOHead';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * GuideArticlePage — Renders individual guide articles.
 *
 * Guide articles have their full content stored as standalone static HTML files
 * in public/guide/<slug>/index.html. In production, nginx serves these files
 * directly via try_files before React ever loads.
 *
 * This React component serves as a fallback for SPA navigation (e.g. when a user
 * clicks a <Link> to a guide) and for the prerender. It renders a proper page
 * with SEO metadata and the guide content, ensuring search engines and users
 * always see a meaningful page regardless of how they arrive.
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

      {/* ── Reading progress bar ── */}
      <div className="fixed top-0 left-0 z-[100] w-full h-[3px] pointer-events-none bg-transparent">
        <div className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" style={{ width: '100%' }} />
      </div>

      {/* ══════════════════════════════════════════
          HERO HEADER
      ══════════════════════════════════════════ */}
      <section className="relative bg-[#fafaf8] border-b border-black/[0.06] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-[11px] text-[#a3a3a3] font-medium mb-10"
          >
            <Link to={localePath('/')} className="hover:text-[#d4af37] transition-colors">Accueil</Link>
            <span className="opacity-30">›</span>
            <Link to={localePath('/guide')} className="hover:text-[#d4af37] transition-colors">Guides</Link>
            <span className="opacity-30">›</span>
            <span className="text-[#737373]">{guide.tag}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 mb-6 flex-wrap justify-center">
              <span className={'inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ' + guide.tagColor}>
                {guide.tag}
              </span>
              <span className="text-[#a3a3a3] text-[11px] font-semibold uppercase tracking-widest">Guide</span>
            </div>

            <h1
              className="font-heading font-black text-[#080808] tracking-tight mb-5"
              style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.8rem)', lineHeight: '1.1' }}
            >
              {guide.title}
            </h1>

            <p
              className="text-[#737373] leading-relaxed mb-10 max-w-xl mx-auto font-light"
              style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}
            >
              {guide.excerpt}
            </p>

            <div className="inline-flex items-center flex-wrap gap-x-5 gap-y-3 justify-center pt-7 border-t border-black/[0.07]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/20 flex items-center justify-center">
                  <span className="text-[#d4af37] font-black text-[8px]">OS</span>
                </div>
                <div className="text-left">
                  <p className="text-[#0a0a0a] text-[12px] font-semibold leading-none mb-0.5">{guide.author}</p>
                  <p className="text-[#a3a3a3] text-[10px] uppercase tracking-wider">Expert IA</p>
                </div>
              </div>
              <div className="w-px h-5 bg-black/10" />
              <span className="flex items-center gap-1.5 text-[#737373] text-[12px]"><Calendar className="w-3.5 h-3.5 text-[#d4af37]" />{guide.date}</span>
              <span className="flex items-center gap-1.5 text-[#737373] text-[12px]"><Clock className="w-3.5 h-3.5 text-[#d4af37]" />{guide.readTime} de lecture</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTENT — Link to full guide
      ══════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className="prose-custom text-[#525252] text-[15px] leading-[1.85] space-y-6">
            <p>
              Ce guide complet vous accompagne étape par étape pour maîtriser VEO 3, le modèle
              de génération vidéo IA de Google DeepMind. Vous y trouverez des prompts prêts à copier,
              un workflow détaillé, et les erreurs les plus courantes à éviter.
            </p>

            <div className="bg-amber-50 border border-amber-200/50 rounded-2xl p-6 sm:p-8 text-center">
              <p className="text-amber-800 font-heading font-bold text-lg mb-3">📖 Accéder au guide complet</p>
              <p className="text-amber-700/70 text-sm mb-5">
                Le guide est disponible avec son format intégral, incluant les prompts, tableaux comparatifs et FAQ.
              </p>
              <a
                href={`/guide/${guide.slug}/`}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `/guide/${guide.slug}/`;
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-heading font-bold text-[14px] rounded-xl hover:shadow-lg hover:shadow-amber-500/20 transition-all"
              >
                Lire le guide complet →
              </a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-black/5">
            <Link
              to={localePath('/guide')}
              className="inline-flex items-center gap-2 text-[#737373] text-sm hover:text-[#d4af37] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
