import { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { motion } from 'framer-motion';
import { Download, Play, FileText, CheckSquare, Wrench, ExternalLink, Mail, ArrowRight, BookOpen, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { resourcesTexts } from '../i18n/pages/resources';

/* ═══════════════════════ DATA ═══════════════════════ */
type ResourceMeta = {
  id: string;
  type: 'pdf' | 'video' | 'template' | 'checklist' | 'outil';
  badge: 'free' | 'signup' | 'instant';
  category: 'pdf' | 'checklist' | 'template' | 'video' | 'outil';
  icon: string;
  color: string;
  featured?: boolean;
};

const resourcesMeta: ResourceMeta[] = [
  { id: '1', type: 'pdf',       badge: 'signup',  category: 'pdf',       icon: '🤖', color: 'from-blue/10 to-blue/5 border-blue/20 hover:border-blue/40',         featured: true },
  { id: '2', type: 'checklist', badge: 'signup',  category: 'checklist', icon: '✅', color: 'from-emerald/10 to-emerald/5 border-emerald/20 hover:border-emerald/40' },
  { id: '3', type: 'pdf',       badge: 'free',    category: 'pdf',       icon: '💬', color: 'from-violet/10 to-violet/5 border-violet/20 hover:border-violet/40' },
  { id: '4', type: 'video',     badge: 'free',    category: 'video',     icon: '🎬', color: 'from-coral/10 to-coral/5 border-coral/20 hover:border-coral/40' },
  { id: '5', type: 'template',  badge: 'signup',  category: 'template',  icon: '📅', color: 'from-gold/10 to-gold/5 border-gold/20 hover:border-gold/40' },
  { id: '6', type: 'checklist', badge: 'free',    category: 'checklist', icon: '🔍', color: 'from-blue/10 to-blue/5 border-blue/20 hover:border-blue/40' },
  { id: '7', type: 'pdf',       badge: 'signup',  category: 'pdf',       icon: '📖', color: 'from-emerald/10 to-emerald/5 border-emerald/20 hover:border-emerald/40' },
  { id: '8', type: 'template',  badge: 'signup',  category: 'template',  icon: '💰', color: 'from-coral/10 to-coral/5 border-coral/20 hover:border-coral/40' },
  { id: '9', type: 'outil',     badge: 'instant', category: 'outil',     icon: '⚙️', color: 'from-violet/10 to-violet/5 border-violet/20 hover:border-violet/40' },
];

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  pdf: FileText,
  checklist: CheckSquare,
  template: BookOpen,
  video: Play,
  outil: Wrench,
};

// Maps badge key to Tailwind color classes
const badgeColorMap: Record<string, string> = {
  free:    'bg-emerald/10 text-emerald border-emerald/20',
  signup:  'bg-gold/10 text-gold border-gold/20',
  instant: 'bg-blue/10 text-blue border-blue/20',
};

// Maps resource category key to translation category label (index in the categories array)
const categoryIndexMap: Record<string, number> = {
  pdf:       1,
  checklist: 2,
  template:  3,
  video:     4,
  outil:     5,
};

/* ═══════════════════════ RESOURCE CARD ═══════════════════════ */
type ResourceCardProps = {
  meta: ResourceMeta;
  title: string;
  description: string;
  cta: string;
  tx: typeof resourcesTexts['fr'];
  i: number;
};

function ResourceCard({ meta, title, description, cta, tx, i }: ResourceCardProps) {
  const TypeIcon = typeIcons[meta.type] || FileText;
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const badgeLabel = tx.badges[meta.badge];
  const typeLabel = tx.types[meta.type];

  const handleAccess = () => {
    if (meta.badge === 'free') {
      setSubmitted(true);
    } else {
      setShowForm(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setShowForm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: i * 0.07 }}
      className={`relative bg-gradient-to-br ${meta.color} border rounded-2xl p-6 flex flex-col transition-all duration-300 group ${meta.featured ? 'lg:col-span-2 lg:flex-row lg:gap-8' : ''}`}
    >
      {/* Icon + type */}
      <div className={`flex items-start gap-4 ${meta.featured ? 'lg:flex-col lg:w-48 lg:shrink-0 lg:items-center lg:text-center' : 'mb-4'}`}>
        <div className="w-14 h-14 rounded-2xl bg-white/60 border border-white/40 flex items-center justify-center shadow-sm shrink-0">
          <span className="text-2xl">{meta.icon}</span>
        </div>
        <div className={meta.featured ? 'lg:hidden' : ''}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#737373]">
              <TypeIcon className="w-3 h-3" />
              {typeLabel}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badgeColorMap[meta.badge]}`}>
              {badgeLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        {meta.featured && (
          <div className="hidden lg:flex items-center gap-2 flex-wrap mb-3">
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#737373]">
              <TypeIcon className="w-3 h-3" />
              {typeLabel}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badgeColorMap[meta.badge]}`}>
              {badgeLabel}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gold/15 text-gold border border-gold/20">
              {tx.popular}
            </span>
          </div>
        )}
        <h3 className="font-heading font-bold text-[#0a0a0a] text-[17px] mb-3 leading-snug">
          {title}
        </h3>
        <p className="text-[#525252] text-[13px] leading-relaxed mb-5 flex-1">
          {description}
        </p>

        {submitted ? (
          <div className="flex items-center gap-2 text-emerald text-[13px] font-bold">
            <span>✓</span>
            <span>{meta.badge === 'free' ? tx.card.successFree : tx.card.successEmail}</span>
          </div>
        ) : showForm ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={tx.card.emailPlaceholder}
              required
              className="flex-1 bg-white border border-black/10 rounded-xl px-4 py-2.5 text-[#0a0a0a] placeholder:text-[#a3a3a3] focus:outline-none focus:border-blue/40 text-[13px]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0a0a0a] text-white font-bold rounded-xl text-[12px] hover:bg-blue transition-all whitespace-nowrap"
            >
              {tx.card.submit}
            </button>
          </form>
        ) : (
          <button
            onClick={handleAccess}
            className="self-start flex items-center gap-2 px-5 py-2.5 bg-[#0a0a0a] hover:bg-blue text-white font-bold rounded-xl text-[13px] transition-all duration-300 group/btn"
          >
            <Download className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            {cta}
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════ HERO ═══════════════════════ */
function RessourcesHero({ tx }: { tx: typeof resourcesTexts['fr'] }) {
  const pdfCount = resourcesMeta.filter(r => r.type === 'pdf').length;
  const checklistCount = resourcesMeta.filter(r => r.type === 'checklist').length;
  const templateCount = resourcesMeta.filter(r => r.type === 'template').length;

  return (
    <section className="relative pt-32 pb-20 section-dark overflow-hidden min-h-[45dvh] flex items-center border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald/10 via-[#050505] to-[#050505] opacity-70" />
      <div className="absolute inset-0 bg-grid-dark opacity-50" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald/30 bg-emerald/10 text-emerald font-bold text-[11px] tracking-wider uppercase mb-6">
            <Download className="w-3 h-3" />
            {tx.hero.badge}
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black mb-5 tracking-tight text-white leading-[1.2]">
            {tx.hero.h1_1}<br />
            <span className="text-gold">{tx.hero.h1_2}</span>
          </h1>
          <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-2xl">
            {tx.hero.desc_pre} <strong className="text-white">{tx.hero.descBold}</strong>
          </p>

          <div className="flex items-center gap-6 flex-wrap text-white/50 text-[13px] font-medium">
            <span className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-blue" /> {pdfCount} {tx.hero.stats.pdf}</span>
            <span className="flex items-center gap-1.5"><CheckSquare className="w-4 h-4 text-emerald" /> {checklistCount} {tx.hero.stats.checklists}</span>
            <span className="flex items-center gap-1.5"><Play className="w-4 h-4 text-coral" /> 1 {tx.hero.stats.video}</span>
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-gold" /> {templateCount} {tx.hero.stats.templates}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════ NEWSLETTER CTA ═══════════════════════ */
function NewsletterCTA({ tx }: { tx: typeof resourcesTexts['fr'] }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-20 max-w-3xl mx-auto"
    >
      <div className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] p-10 sm:p-14 border border-white/5">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-5">
            <Mail className="w-6 h-6 text-gold" />
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
            {tx.newsletter.title}
          </h3>
          <p className="text-white/50 text-[15px] mb-8 max-w-lg mx-auto">
            {tx.newsletter.desc}
          </p>
          {submitted ? (
            <div className="text-emerald font-bold text-lg flex items-center gap-2 justify-center">
              {tx.newsletter.success}
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={tx.newsletter.placeholder}
                  required
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-gold/40 transition-all text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-gradient-to-r from-gold to-gold-light text-[#0a0a0a] font-bold rounded-xl text-[13px] hover:shadow-lg hover:shadow-gold/20 transition-all whitespace-nowrap"
                >
                  {tx.newsletter.btn}
                </button>
              </form>
              <p className="text-white/25 text-[11px] mt-4 font-medium tracking-widest uppercase">{tx.newsletter.note}</p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════ PAGE EXPORT ═══════════════════════ */
export default function RessourcesPage() {
  const { language, localePath } = useLanguage();
  const tx = resourcesTexts[language];

  const [activeCategory, setActiveCategory] = useState(tx.categories[0]);

  // Build merged resource list (meta + translated text)
  const allResources = resourcesMeta.map((meta, idx) => ({
    meta,
    ...(tx.resources[idx] as { id: string; title: string; description: string; cta: string }),
  }));

  // Category filter: index 0 = "All/Tout"
  const filtered = activeCategory === tx.categories[0]
    ? allResources
    : allResources.filter(r => {
        const catIdx = categoryIndexMap[r.meta.category];
        return tx.categories[catIdx] === activeCategory;
      });

  return (
    <>
      <SEOHead
        title={tx.seo.title}
        description={tx.seo.description}
        canonical={tx.seo.canonical}
      />
      <RessourcesHero tx={tx} />

      <section className="relative py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {tx.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-[12px] font-bold tracking-wide transition-all ${
                  activeCategory === cat
                    ? 'bg-[#0a0a0a] text-white shadow-md'
                    : 'bg-white border border-black/10 text-[#737373] hover:text-[#0a0a0a] hover:border-black/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Resources grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((resource, i) => (
              <ResourceCard
                key={resource.meta.id}
                meta={resource.meta}
                title={resource.title}
                description={resource.description}
                cta={resource.cta}
                tx={tx}
                i={i}
              />
            ))}
          </div>

          {/* Newsletter */}
          <NewsletterCTA tx={tx} />

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-[#737373] text-[14px] mb-4">{tx.cta.prompt}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {language === 'fr' ? (
                <Link
                  to={localePath('/formations')}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-gold to-gold-light text-[#0a0a0a] font-bold rounded-xl hover:shadow-lg hover:shadow-gold/20 transition-all text-[14px]"
                >
                  <Zap className="w-4 h-4" />
                  {tx.cta.formations}
                </Link>
              ) : (
                <Link
                  to={localePath('/blog')}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-gold to-gold-light text-[#0a0a0a] font-bold rounded-xl hover:shadow-lg hover:shadow-gold/20 transition-all text-[14px]"
                >
                  <Zap className="w-4 h-4" />
                  {tx.cta.formations}
                </Link>
              )}
              <Link
                to={localePath('/blog')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white border border-black/10 text-[#0a0a0a] font-bold rounded-xl hover:border-black/20 transition-all text-[14px]"
              >
                <ExternalLink className="w-4 h-4" />
                {tx.cta.blog}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
