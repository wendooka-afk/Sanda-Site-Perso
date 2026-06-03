import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { articles as staticArticles } from '../data/articles';
import { articlesEn } from '../data/articles-en';
import { getDashboardArticles } from '../hooks/useDashboardArticles';
import { Calendar, ArrowRight, Search, BookOpen, Clock } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { AdUnit } from '../components/AdUnit';
import { useLanguage } from '../i18n';
import { blogTexts } from '../i18n/pages/blog';

/* ══ Shared article type (covers both static & dashboard articles) ══ */
export interface BlogArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tag: string;
  tagColor: string;
  image?: string;
  date: string;
  readTime: string;
  isDashboard?: boolean;
}

/* ══ Merge static + published dashboard articles ══ */
function getAllArticles(lang: 'fr' | 'en'): BlogArticleMeta[] {
  if (lang === 'en') {
    // English: only show English articles
    return [...articlesEn].reverse().map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      category: a.category,
      tag: a.tag,
      tagColor: a.tagColor,
      image: 'image' in a ? String(a.image) : undefined,
      date: a.date,
      readTime: a.readTime,
      isDashboard: false,
    }));
  }

  // French: static FR articles + dashboard articles
  const staticOnes: BlogArticleMeta[] = staticArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    tag: a.tag,
    tagColor: a.tagColor,
    image: 'image' in a ? String(a.image) : undefined,
    date: a.date,
    readTime: a.readTime,
    isDashboard: false,
  }));

  const dashboardOnes: BlogArticleMeta[] = getDashboardArticles()
    .filter((a) => a.status === 'published')
    .map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      category: a.category,
      tag: a.tag,
      tagColor: a.tagColor,
      image: a.image || undefined,
      date: a.date,
      readTime: a.readTime,
      isDashboard: true,
    }));

  return [...dashboardOnes, ...staticOnes];
}

/* Categories used for filtering */
const frCategories = blogTexts.fr.categories;
const enCategories = blogTexts.en.categories;

/* ═══════════════════════ HERO BLOG ═══════════════════════ */
function BlogHero({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory
}: {
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  activeCategory: string;
  setActiveCategory: (c: string) => void;
}) {
  const { language } = useLanguage();
  const tx = blogTexts[language];

  const activeCats = language === 'en' ? enCategories : frCategories;

  /* Map category key → display label for current language */
  const categoryMap: Record<string, string> = {};
  activeCats.forEach((cat, i) => {
    categoryMap[cat] = tx.categories[i];
  });

  return (
    <section className="relative pt-32 pb-16 section-dark overflow-hidden min-h-[50dvh] flex items-center justify-center border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-[#050505] to-[#050505] opacity-60" />
      <div className="absolute inset-0 bg-grid-dark opacity-60" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-left w-full">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-bold text-[11px] tracking-wider uppercase mb-6 shadow-sm">
              {tx.hero.badge}
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black mb-6 tracking-tight text-white leading-[1.2]">
              {tx.hero.h1_1}<br />
              <span className="text-gold block mt-2">{tx.hero.h1_2}</span>
            </h1>
            <p className="text-white/65 text-lg sm:text-lg leading-relaxed mb-12 font-inter max-w-xl">
              {tx.hero.desc_pre} <strong className="text-white font-bold">{tx.hero.descBold}</strong>
            </p>

            {/* SEARCH BAR */}
            <div className="w-full max-w-lg mb-8 relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/40 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-sm font-medium shadow-sm"
                placeholder={tx.hero.searchPlaceholder}
              />
            </div>

            {/* CATEGORIES FILTERS */}
            <div className="flex flex-wrap justify-start gap-2 max-w-lg">
              {activeCats.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={
                      'px-3 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-[12px] font-bold tracking-wider uppercase transition-all flex-shrink-0 sm:flex-shrink-1 ' +
                      (isActive
                        ? 'bg-white text-[#0a0a0a] shadow-md'
                        : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10')
                    }
                  >
                    {categoryMap[cat] || cat}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* HER RIGHT CONTENT (IMAGE) */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative hidden lg:block h-[500px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5">
            <img src="/oumarou-sanda-13.webp" alt="Blog Oumarou Sanda" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ FEATURED CARD ═══════════════════════ */
function FeaturedCard({ article }: { article: BlogArticleMeta }) {
  const { language, localePath } = useLanguage();
  const tx = blogTexts[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <Link
        to={localePath('/blog/' + article.slug)}
        className="group flex flex-col md:flex-row bg-white border border-black/5 hover:border-blue-500/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
      >
        {article.image && (
          <div className="md:w-[45%] relative overflow-hidden aspect-[16/10] md:aspect-auto min-h-[220px] md:min-h-[260px]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
              <span className={'px-2.5 py-1 sm:px-3 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest uppercase shadow-sm ' + (article.tagColor || 'bg-white text-[#0a0a0a]')}>
                {article.category}
              </span>
            </div>
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-[9px] sm:text-[10px] font-bold tracking-wide">
              {tx.featured}
            </div>
          </div>
        )}
        <div className={`${article.image ? 'md:w-[55%]' : 'w-full'} p-5 sm:p-7 lg:p-10 flex flex-col justify-center`}>
          <span className={'px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border mb-4 self-start ' + article.tagColor}>
            {article.tag}
          </span>
          <h2 className="font-heading font-black text-xl sm:text-2xl lg:text-[clamp(1.5rem,1.5vw,3.25rem)] text-[#0a0a0a] mb-4 group-hover:text-blue-600 transition-colors leading-tight line-clamp-3">
            {article.title}
          </h2>
          <p className="text-[#525252] text-[15px] leading-relaxed mb-6 line-clamp-3">{article.excerpt}</p>
          <div className="flex items-center flex-wrap gap-4 text-[#737373] text-[12px] font-bold tracking-wide pt-4 border-t border-black/5">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
            <span className="ml-auto text-blue-600 flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              {tx.readArticle} <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════ ARTICLES GRID ═══════════════════════ */
function BlogGrid({ filteredArticles }: { filteredArticles: BlogArticleMeta[] }) {
  const { language, localePath } = useLanguage();
  const tx = blogTexts[language];
  const [featured, ...rest] = filteredArticles;

  return (
    <section className="relative py-20 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {filteredArticles.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <Search className="w-12 h-12 text-[#a3a3a3] mx-auto mb-4" />
              <h3 className="text-xl text-[#0a0a0a] font-bold mb-2">{tx.empty.title}</h3>
              <p className="text-[#525252]">{tx.empty.desc}</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            >
              {/* Featured first article */}
              <FeaturedCard article={featured} />

              {/* ── Publicité AdSense — In-Feed (entre featured et grille) ── */}
              <AdUnit
                slot="9419753190"
                format="fluid"
                layoutKey="-ef+6k-30-ac+ty"
                className="my-8"
              />

              {/* Rest of articles in grid */}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((article, i) => (
                    <motion.div
                      key={article.slug}
                      initial={{ opacity: 0, scale: 0.96 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.03 }}
                      className="h-full"
                    >
                      <Link to={localePath('/blog/' + article.slug)} className="bg-white border border-black/5 hover:border-blue-500/30 transition-all duration-500 rounded-2xl overflow-hidden group flex flex-col h-full shadow-sm hover:shadow-xl">
                        {/* IMAGE */}
                        {article.image && (
                          <div className="w-full aspect-[16/9] bg-[#f5f5f5] relative overflow-hidden border-b border-black/5">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70" />
                            <div className="absolute top-3 left-3">
                              <span className={'px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase shadow-sm ' + (article.tagColor || 'bg-white text-[#0a0a0a]')}>
                                {article.category}
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="p-4 sm:p-6 flex flex-col flex-1">
                          <span className={'px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase border self-start mb-3 ' + article.tagColor}>{article.tag}</span>
                          <h2 className="font-heading font-black text-lg sm:text-xl text-[#0a0a0a] mb-3 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                            {article.title}
                          </h2>
                          <p className="text-[#525252] text-[13px] leading-relaxed mb-5 line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="mt-auto flex items-center justify-between text-[#737373] text-[11px] font-bold tracking-wide pt-4 border-t border-black/5">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
                              <span className="flex items-center gap-1 text-[#a3a3a3]"><Clock className="w-3 h-3" /> {article.readTime}</span>
                            </div>
                            <span className="text-blue-600 flex items-center gap-1 group-hover:gap-1.5 transition-all text-[11px]">{tx.read} <ArrowRight className="w-3 h-3" /></span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* NEWSLETTER CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-3xl mx-auto text-center"
        >
          <div className="bg-[#fafafa] border border-black/5 rounded-3xl p-10 sm:p-14 relative overflow-hidden shadow-sm">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <span className="text-3xl mb-4 block">📬</span>
              <h3 className="font-heading text-2xl font-black text-[#0a0a0a] mb-3">{tx.newsletter.title}</h3>
              <p className="text-[#525252] text-[15px] mb-8 max-w-lg mx-auto">{tx.newsletter.desc}</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={tx.newsletter.placeholder}
                  className="flex-1 bg-white border border-black/10 rounded-xl px-5 py-3.5 text-[#0a0a0a] placeholder:text-[#a3a3a3] focus:outline-none focus:border-blue-500/40 transition-all text-sm shadow-sm"
                />
                <button className="px-6 py-3.5 bg-blue-600 text-white font-bold tracking-wider text-[13px] rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all whitespace-nowrap uppercase">
                  {tx.newsletter.subscribe}
                </button>
              </div>
              <p className="text-[#a3a3a3] text-[11px] mt-4 font-medium uppercase tracking-widest">{tx.newsletter.note}</p>
            </div>
          </div>
        </motion.div>

        {/* CTA FORMATIONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link to={localePath('/formations')} className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-4 bg-[#0a0a0a] text-white font-bold rounded-xl hover:bg-gold hover:shadow-md hover:shadow-gold/30 transition-all shadow-sm uppercase tracking-wider text-[12px] sm:text-[14px] leading-snug">
            <BookOpen className="w-5 h-5 shrink-0" />
            {tx.ctaFormations}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════ AUTHOR BIO (récurrent) ═══════════════════════ */
function AuthorSidebar() {
  const { language } = useLanguage();
  const tx = blogTexts[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto px-5 sm:px-6 mb-20 -mt-10 relative z-20"
    >
      <div className="bg-white border border-black/5 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left shadow-lg">
        <div className="w-20 h-20 rounded-2xl bg-[#fafafa] border border-black/5 flex items-center justify-center shrink-0 shadow-sm">
          <span className="text-[#0a0a0a] font-heading font-black text-2xl">OS</span>
        </div>
        <div>
          <h4 className="font-heading font-black text-[#0a0a0a] text-lg mb-1">Oumarou Sanda</h4>
          <p className="text-[#525252] text-[13px] leading-relaxed font-medium">
            {tx.author.desc} <span className="font-bold text-blue-600">Wendooka</span> et <span className="font-bold text-gold-dark">Sanda Vibe Code</span>{tx.author.descEnd}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════ PAGE EXPORT ═══════════════════════ */
export default function BlogPage() {
  const { language } = useLanguage();
  const tx = blogTexts[language];

  const [searchQuery, setSearchQuery] = useState('');
  const cats = language === 'en' ? enCategories : frCategories;
  const [activeCategory, setActiveCategory] = useState<string>(cats[0]);

  // Reset category filter when language changes
  useEffect(() => {
    setActiveCategory(language === 'en' ? enCategories[0] : frCategories[0]);
  }, [language]);

  // Get all articles (static + published dashboard), filtered by language
  const allArticles = useMemo(() => getAllArticles(language as 'fr' | 'en'), [language]);

  const filteredArticles = useMemo(() => {
    let result = [...allArticles];

    // Filter by Category
    const allCat = language === 'en' ? enCategories[0] : frCategories[0];
    if (activeCategory !== allCat) {
      if (activeCategory === 'Tutoriels' || activeCategory === 'Tutorials') {
        result = result.filter((a) => a.tag === 'Tutoriel' || a.tag === 'Guide' || a.tag === 'Tutorial');
      } else {
        result = result.filter((a) => a.category === activeCategory);
      }
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [searchQuery, activeCategory, allArticles]);

  return (
    <>
      <SEOHead
        title={tx.seo.title}
        description={tx.seo.description}
        canonical="/blog"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Blog",
              "name": "Blog Oumarou Sanda",
              "url": "https://oumarousanda.com/blog",
              "description": tx.seo.description,
              "author": { "@type": "Person", "name": "Oumarou Sanda", "url": "https://oumarousanda.com" },
              "inLanguage": "fr"
            },
            {
              "@type": "ItemList",
              "name": "Articles récents — Blog Oumarou Sanda",
              "url": "https://oumarousanda.com/blog",
              "itemListElement": staticArticles.slice(0, 10).map((a, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "name": a.title,
                "url": `https://oumarousanda.com/blog/${a.slug}`
              }))
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://oumarousanda.com" },
                { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://oumarousanda.com/blog" }
              ]
            }
          ]
        }}
        adsense
      />
      <BlogHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <BlogGrid filteredArticles={filteredArticles} />
      <AuthorSidebar />
    </>
  );
}
