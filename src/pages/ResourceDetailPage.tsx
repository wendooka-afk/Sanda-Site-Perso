import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, CheckSquare, FileText, Play, BookOpen, Wrench, Check } from 'lucide-react';
import { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { useLanguage } from '../i18n';
import { resourceBySlug, type ResourceSection } from '../data/resources-content';

/* ══════════════════════════════════════
   SECTION RENDERERS
══════════════════════════════════════ */
function renderText(content: string) {
  // Bold: **text**
  const parts = content.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
  );
}

function SectionRenderer({ section }: { section: ResourceSection }) {
  switch (section.type) {
    case 'intro':
      return (
        <p className="text-[#525252] text-[16px] leading-[1.8] mb-8 font-medium border-l-4 border-blue/30 pl-5 py-1">
          {section.content}
        </p>
      );

    case 'heading':
      return (
        <h2 className="font-heading text-[20px] font-bold text-[#0a0a0a] mt-10 mb-4">
          {section.content}
        </h2>
      );

    case 'text':
      return (
        <p className="text-[#525252] text-[15px] leading-[1.8] mb-5">
          {renderText(section.content)}
        </p>
      );

    case 'list':
      return (
        <ul className="mb-6 space-y-2">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[#525252] text-[14px] leading-relaxed">
              <span className="mt-1 text-blue shrink-0">•</span>
              {renderText(item)}
            </li>
          ))}
        </ul>
      );

    case 'numbered':
      return (
        <ol className="mb-6 space-y-3">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[#525252] text-[14px] leading-relaxed">
              <span className="shrink-0 w-6 h-6 rounded-full bg-blue/10 text-blue text-[11px] font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span>{renderText(item)}</span>
            </li>
          ))}
        </ol>
      );

    case 'checklist':
      return (
        <ul className="mb-6 space-y-2.5">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[#525252] text-[14px] leading-relaxed">
              <CheckSquare className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
              <span>{renderText(item)}</span>
            </li>
          ))}
        </ul>
      );

    case 'table':
      return (
        <div className="overflow-x-auto mb-6 rounded-xl border border-black/8">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#f5f5f5] border-b border-black/8">
                {section.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left font-bold text-[#0a0a0a] whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-[#525252] leading-relaxed">
                      {renderText(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'callout':
      return (
        <div className="mb-6 rounded-2xl bg-gold/5 border border-gold/20 p-5">
          <p className="font-bold text-[#0a0a0a] text-[13px] mb-1">{section.label}</p>
          <p className="text-[#525252] text-[13px] leading-relaxed">{section.content}</p>
        </div>
      );

    case 'prompt-block':
      return (
        <div className="mb-5 rounded-xl border border-blue/20 bg-blue/3 overflow-hidden">
          <div className="px-4 py-2 border-b border-blue/15 bg-blue/5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue">{section.label}</span>
          </div>
          <pre className="px-4 py-4 text-[13px] text-[#333] leading-[1.7] whitespace-pre-wrap font-mono">
            {section.prompt}
          </pre>
        </div>
      );

    case 'tool-card':
      return (
        <div className="mb-4 rounded-xl border border-black/8 bg-white p-4 flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-bold text-[#0a0a0a] text-[14px]">{section.name}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#f5f5f5] text-[#737373] text-[10px] font-semibold">
                {section.category}
              </span>
            </div>
            <p className="text-[#737373] text-[12px] mb-2">{section.use}</p>
            {section.free && (
              <p className="text-emerald text-[11px] font-medium flex items-center gap-1">
                <Check className="w-3 h-3" /> Alternative gratuite : {section.free}
              </p>
            )}
          </div>
          <div className="shrink-0">
            <span className="inline-block px-3 py-1.5 rounded-lg bg-[#0a0a0a] text-white text-[12px] font-bold whitespace-nowrap">
              {section.price}
            </span>
          </div>
        </div>
      );

    case 'divider':
      return <hr className="my-8 border-black/8" />;

    default:
      return null;
  }
}

/* ══════════════════════════════════════
   GATED ACCESS FORM
══════════════════════════════════════ */
function GatedAccess({ badge, isFree, lang }: { badge: string; isFree: boolean; lang: 'fr' | 'en' }) {
  const [email, setEmail] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  if (isFree || unlocked) return null;

  const label = lang === 'fr'
    ? { title: 'Accéder gratuitement', desc: 'Entre ton email pour recevoir cette ressource.', placeholder: 'ton@email.com', btn: 'Recevoir', note: 'Gratuit · Pas de spam' }
    : { title: 'Get free access', desc: 'Enter your email to receive this resource.', placeholder: 'you@email.com', btn: 'Get it', note: 'Free · No spam' };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setUnlocked(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky bottom-6 z-20 mx-auto max-w-lg mt-10"
    >
      <div className="bg-[#0a0a0a] rounded-2xl p-6 shadow-2xl border border-white/10">
        <p className="text-white font-bold text-[15px] mb-1">{label.title}</p>
        <p className="text-white/50 text-[12px] mb-4">{label.desc}</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={label.placeholder}
            required
            className="flex-1 bg-white/8 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 text-[13px]"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-gradient-to-r from-gold to-gold-light text-[#0a0a0a] font-bold rounded-xl text-[12px] whitespace-nowrap hover:shadow-lg hover:shadow-gold/20 transition-all"
          >
            {label.btn}
          </button>
        </form>
        <p className="text-white/25 text-[10px] mt-3 text-center tracking-wider uppercase">{label.note}</p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   TYPE ICON MAP
══════════════════════════════════════ */
const typeIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  pdf: FileText,
  checklist: CheckSquare,
  template: BookOpen,
  video: Play,
  outil: Wrench,
};

const badgeColorMap: Record<string, string> = {
  'Guide PDF': 'bg-blue/10 text-blue border-blue/20',
  'PDF Guide': 'bg-blue/10 text-blue border-blue/20',
  'Checklist': 'bg-emerald/10 text-emerald border-emerald/20',
  'Pack Gratuit': 'bg-violet/10 text-violet border-violet/20',
  'Free Pack': 'bg-violet/10 text-violet border-violet/20',
  'Formation Vidéo': 'bg-coral/10 text-coral border-coral/20',
  'Video Training': 'bg-coral/10 text-coral border-coral/20',
  'Template': 'bg-gold/10 text-gold border-gold/20',
  'Accès immédiat': 'bg-blue/10 text-blue border-blue/20',
  'Instant access': 'bg-blue/10 text-blue border-blue/20',
};

/* ══════════════════════════════════════
   PAGE EXPORT
══════════════════════════════════════ */
export default function ResourceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language, localePath } = useLanguage();

  const resource = slug ? resourceBySlug[language]?.[slug] : undefined;

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="text-center">
          <p className="text-[#737373] text-[15px] mb-4">
            {language === 'fr' ? 'Ressource introuvable.' : 'Resource not found.'}
          </p>
          <Link
            to={localePath('/resources')}
            className="inline-flex items-center gap-2 text-blue font-medium text-[14px] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'fr' ? 'Retour aux ressources' : 'Back to resources'}
          </Link>
        </div>
      </div>
    );
  }

  const isFree = resource.badge === 'Pack Gratuit' || resource.badge === 'Free Pack'
    || resource.badge === 'Accès immédiat' || resource.badge === 'Instant access'
    || resource.badge === 'Formation Vidéo' || resource.badge === 'Video Training';

  const backPath = language === 'fr' ? '/ressources' : '/en/resources';
  const backLabel = language === 'fr' ? 'Ressources gratuites' : 'Free Resources';

  const badgeClass = badgeColorMap[resource.badge] ?? 'bg-blue/10 text-blue border-blue/20';

  return (
    <>
      <SEOHead
        title={`${resource.title} — Oumarou Sanda`}
        description={resource.subtitle}
        canonical={language === 'fr' ? `/ressources/${slug}` : `/en/resources/${slug}`}
      />

      {/* Hero */}
      <section className="relative pt-28 pb-14 section-dark border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald/8 via-[#050505] to-[#050505]" />
        <div className="absolute inset-0 bg-grid-dark opacity-40" />
        <div className="relative max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 z-10">
          <Link
            to={backPath}
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-[12px] font-medium transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {backLabel}
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className="text-4xl">{resource.icon}</span>
              <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${badgeClass}`}>
                {resource.badge}
              </span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 leading-[1.2]">
              {resource.title}
            </h1>
            <p className="text-white/60 text-[15px] leading-relaxed max-w-2xl">
              {resource.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 bg-[#fafafa]">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {resource.sections.map((section, i) => (
              <SectionRenderer key={i} section={section} />
            ))}
          </motion.div>

          {/* Access button */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <button className="flex items-center gap-2.5 px-7 py-3.5 bg-[#0a0a0a] hover:bg-blue text-white font-bold rounded-xl text-[14px] transition-all duration-300">
              <Download className="w-4 h-4" />
              {language === 'fr' ? 'Télécharger / Accéder' : 'Download / Access'}
            </button>
            <Link
              to={backPath}
              className="flex items-center gap-2.5 px-7 py-3.5 bg-white border border-black/10 text-[#0a0a0a] font-bold rounded-xl text-[14px] hover:border-black/20 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              {backLabel}
            </Link>
          </div>

          <GatedAccess badge={resource.badge} isFree={isFree} lang={language} />
        </div>
      </section>
    </>
  );
}
