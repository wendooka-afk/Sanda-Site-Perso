import { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { motion } from 'framer-motion';
import { Download, Play, FileText, CheckSquare, Wrench, ExternalLink, Mail, ArrowRight, BookOpen, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ═══════════════════════ DATA ═══════════════════════ */
type Resource = {
  id: string;
  type: 'pdf' | 'video' | 'template' | 'checklist' | 'outil';
  title: string;
  description: string;
  cta: string;
  badge: 'Gratuit' | 'Gratuit sur inscription' | 'Accès immédiat';
  category: string;
  icon: string;
  color: string;
  featured?: boolean;
};

const resources: Resource[] = [
  {
    id: '1',
    type: 'pdf',
    title: 'Les 10 outils IA indispensables pour entrepreneurs africains',
    description: 'Une sélection rigoureuse des meilleurs outils IA disponibles en 2026, avec des cas d\'usage concrets, des prix, et des comparatifs adaptés aux entrepreneurs francophones.',
    cta: 'Télécharger le guide',
    badge: 'Gratuit sur inscription',
    category: 'Guides PDF',
    icon: '🤖',
    color: 'from-blue/10 to-blue/5 border-blue/20 hover:border-blue/40',
    featured: true,
  },
  {
    id: '2',
    type: 'checklist',
    title: 'Checklist : Lancer son business en ligne avec l\'IA en 30 jours',
    description: '47 actions concrètes organisées semaine par semaine pour lancer ton premier business digital. Zéro blabla. Que des étapes actionnables.',
    cta: 'Obtenir la checklist',
    badge: 'Gratuit sur inscription',
    category: 'Checklists',
    icon: '✅',
    color: 'from-emerald/10 to-emerald/5 border-emerald/20 hover:border-emerald/40',
  },
  {
    id: '3',
    type: 'pdf',
    title: 'Prompt Pack : 50 prompts ChatGPT pour créateurs de contenu',
    description: '50 prompts testés et optimisés pour créer des articles de blog, des scripts YouTube, des posts LinkedIn, des newsletters et des scripts TikTok en quelques minutes.',
    cta: 'Télécharger le pack',
    badge: 'Gratuit',
    category: 'Guides PDF',
    icon: '💬',
    color: 'from-violet/10 to-violet/5 border-violet/20 hover:border-violet/40',
  },
  {
    id: '4',
    type: 'video',
    title: 'Formation vidéo : Créer son premier revenu en ligne avec l\'IA',
    description: 'Une formation de 45 minutes qui couvre les fondations : choisir sa niche, créer son offre, attirer ses premiers clients — tout en utilisant l\'IA comme co-pilote.',
    cta: 'Regarder maintenant',
    badge: 'Gratuit',
    category: 'Vidéos',
    icon: '🎬',
    color: 'from-coral/10 to-coral/5 border-coral/20 hover:border-coral/40',
  },
  {
    id: '5',
    type: 'template',
    title: 'Template : Plan de contenu 30 jours (TikTok + YouTube + Blog)',
    description: 'Un tableau Google Sheets prêt à l\'emploi avec 30 idées de contenu par plateforme, organisées par pilier thématique. Adapté aux créateurs africains francophones.',
    cta: 'Copier le template',
    badge: 'Gratuit sur inscription',
    category: 'Templates',
    icon: '📅',
    color: 'from-gold/10 to-gold/5 border-gold/20 hover:border-gold/40',
  },
  {
    id: '6',
    type: 'checklist',
    title: 'Checklist SEO : 27 points essentiels pour bloggers africains',
    description: 'Les 27 vérifications incontournables avant de publier un article de blog. De la balise title à la vitesse de chargement, en passant par les liens internes et le balisage Schema.',
    cta: 'Télécharger la checklist',
    badge: 'Gratuit',
    category: 'Checklists',
    icon: '🔍',
    color: 'from-blue/10 to-blue/5 border-blue/20 hover:border-blue/40',
  },
  {
    id: '7',
    type: 'pdf',
    title: 'Glossaire IA : 150 termes expliqués simplement',
    description: 'Du LLM au RAG, en passant par le Fine-tuning et le Prompt Engineering — un lexique complet et accessible pour naviguer dans l\'univers de l\'IA sans se perdre.',
    cta: 'Télécharger le glossaire',
    badge: 'Gratuit sur inscription',
    category: 'Guides PDF',
    icon: '📖',
    color: 'from-emerald/10 to-emerald/5 border-emerald/20 hover:border-emerald/40',
  },
  {
    id: '8',
    type: 'template',
    title: 'Template : Page de vente qui convertit (structure complète)',
    description: 'La structure copywriting utilisée pour générer des milliers d\'euros de ventes en ligne. Avec exemples, formules et les hooks qui captivent l\'attention dès la première ligne.',
    cta: 'Accéder au template',
    badge: 'Gratuit sur inscription',
    category: 'Templates',
    icon: '💰',
    color: 'from-coral/10 to-coral/5 border-coral/20 hover:border-coral/40',
  },
  {
    id: '9',
    type: 'outil',
    title: 'Ma stack complète : les outils que j\'utilise au quotidien',
    description: 'La liste exhaustive de tous les outils SaaS, IA et logiciels que j\'utilise dans mon business au quotidien, avec les alternatives gratuites pour chaque catégorie.',
    cta: 'Voir la stack',
    badge: 'Accès immédiat',
    category: 'Outils',
    icon: '⚙️',
    color: 'from-violet/10 to-violet/5 border-violet/20 hover:border-violet/40',
  },
];

const categories = ['Tout', 'Guides PDF', 'Checklists', 'Templates', 'Vidéos', 'Outils'];

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  pdf: FileText,
  checklist: CheckSquare,
  template: BookOpen,
  video: Play,
  outil: Wrench,
};

const badgeColors: Record<string, string> = {
  'Gratuit': 'bg-emerald/10 text-emerald border-emerald/20',
  'Gratuit sur inscription': 'bg-gold/10 text-gold border-gold/20',
  'Accès immédiat': 'bg-blue/10 text-blue border-blue/20',
};

/* ═══════════════════════ RESOURCE CARD ═══════════════════════ */
function ResourceCard({ resource, i }: { resource: Resource; i: number }) {
  const TypeIcon = typeIcons[resource.type] || FileText;
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAccess = () => {
    if (resource.badge === 'Gratuit') {
      // Direct access — no email required
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
      className={`relative bg-gradient-to-br ${resource.color} border rounded-2xl p-6 flex flex-col transition-all duration-300 group ${resource.featured ? 'lg:col-span-2 lg:flex-row lg:gap-8' : ''}`}
    >
      {/* Icon + type */}
      <div className={`flex items-start gap-4 ${resource.featured ? 'lg:flex-col lg:w-48 lg:shrink-0 lg:items-center lg:text-center' : 'mb-4'}`}>
        <div className="w-14 h-14 rounded-2xl bg-white/60 border border-white/40 flex items-center justify-center shadow-sm shrink-0">
          <span className="text-2xl">{resource.icon}</span>
        </div>
        <div className={resource.featured ? 'lg:hidden' : ''}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#737373]">
              <TypeIcon className="w-3 h-3" />
              {resource.type === 'pdf' ? 'Guide PDF' : resource.type === 'video' ? 'Vidéo' : resource.type === 'template' ? 'Template' : resource.type === 'checklist' ? 'Checklist' : 'Outil'}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badgeColors[resource.badge]}`}>
              {resource.badge}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        {resource.featured && (
          <div className="hidden lg:flex items-center gap-2 flex-wrap mb-3">
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#737373]">
              <TypeIcon className="w-3 h-3" />
              Guide PDF
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badgeColors[resource.badge]}`}>
              {resource.badge}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gold/15 text-gold border border-gold/20">
              ✦ Populaire
            </span>
          </div>
        )}
        <h3 className="font-heading font-bold text-[#0a0a0a] text-[17px] mb-3 leading-snug">
          {resource.title}
        </h3>
        <p className="text-[#525252] text-[13px] leading-relaxed mb-5 flex-1">
          {resource.description}
        </p>

        {submitted ? (
          <div className="flex items-center gap-2 text-emerald text-[13px] font-bold">
            <span>✓</span>
            <span>{resource.badge === 'Gratuit' ? 'Accès débloqué — bonne lecture !' : 'Envoyé ! Vérifie ta boîte mail.'}</span>
          </div>
        ) : showForm ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.com"
              required
              className="flex-1 bg-white border border-black/10 rounded-xl px-4 py-2.5 text-[#0a0a0a] placeholder:text-[#a3a3a3] focus:outline-none focus:border-blue/40 text-[13px]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0a0a0a] text-white font-bold rounded-xl text-[12px] hover:bg-blue transition-all whitespace-nowrap"
            >
              Recevoir
            </button>
          </form>
        ) : (
          <button
            onClick={handleAccess}
            className="self-start flex items-center gap-2 px-5 py-2.5 bg-[#0a0a0a] hover:bg-blue text-white font-bold rounded-xl text-[13px] transition-all duration-300 group/btn"
          >
            <Download className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            {resource.cta}
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════ HERO ═══════════════════════ */
function RessourcesHero() {
  return (
    <section className="relative pt-32 pb-20 section-dark overflow-hidden min-h-[45dvh] flex items-center border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald/10 via-[#050505] to-[#050505] opacity-70" />
      <div className="absolute inset-0 bg-grid-dark opacity-50" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald/30 bg-emerald/10 text-emerald font-bold text-[11px] tracking-wider uppercase mb-6">
            <Download className="w-3 h-3" />
            Ressources gratuites
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black mb-5 tracking-tight text-white leading-[1.2]">
            Des outils pour passer<br />
            <span className="text-gold">à l'action dès maintenant.</span>
          </h1>
          <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-2xl">
            Guides PDF, checklists, templates, prompts et formations — tout le contenu que j'ai créé pour t'aider à lancer et développer ton business digital avec l'IA. <strong className="text-white">Gratuit. Sans blabla.</strong>
          </p>

          <div className="flex items-center gap-6 flex-wrap text-white/50 text-[13px] font-medium">
            <span className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-blue" /> {resources.filter(r => r.type === 'pdf').length} guides PDF</span>
            <span className="flex items-center gap-1.5"><CheckSquare className="w-4 h-4 text-emerald" /> {resources.filter(r => r.type === 'checklist').length} checklists</span>
            <span className="flex items-center gap-1.5"><Play className="w-4 h-4 text-coral" /> {resources.filter(r => r.type === 'video').length} vidéo formation</span>
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-gold" /> {resources.filter(r => r.type === 'template').length} templates</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════ NEWSLETTER CTA ═══════════════════════ */
function NewsletterCTA() {
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
            Reçois toutes les nouvelles ressources
          </h3>
          <p className="text-white/50 text-[15px] mb-8 max-w-lg mx-auto">
            Rejoins +10 000 entrepreneurs qui reçoivent mes stratégies IA, mes ressources exclusives et mes analyses business chaque semaine.
          </p>
          {submitted ? (
            <div className="text-emerald font-bold text-lg flex items-center gap-2 justify-center">
              <span>✓</span> Bienvenue ! Vérifie ta boîte mail.
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.com"
                  required
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-gold/40 transition-all text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-gradient-to-r from-gold to-gold-light text-[#0a0a0a] font-bold rounded-xl text-[13px] hover:shadow-lg hover:shadow-gold/20 transition-all whitespace-nowrap"
                >
                  S'inscrire
                </button>
              </form>
              <p className="text-white/25 text-[11px] mt-4 font-medium tracking-widest uppercase">Gratuit · Pas de spam · Désinscription en 1 clic</p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════ PAGE EXPORT ═══════════════════════ */
export default function RessourcesPage() {
  const [activeCategory, setActiveCategory] = useState('Tout');

  const filtered = activeCategory === 'Tout'
    ? resources
    : resources.filter(r => r.category === activeCategory);

  return (
    <>
      <SEOHead
        title="Ressources Gratuites | Guides, Templates & Outils IA — Oumarou Sanda"
        description="Téléchargez gratuitement les guides PDF, checklists, templates et outils sélectionnés par Oumarou Sanda pour lancer et développer ton business digital avec l'IA en Afrique."
        canonical="/ressources"
      />
      <RessourcesHero />

      <section className="relative py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {categories.map((cat) => (
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
              <ResourceCard key={resource.id} resource={resource} i={i} />
            ))}
          </div>

          {/* Newsletter */}
          <NewsletterCTA />

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-[#737373] text-[14px] mb-4">Tu veux aller encore plus loin ?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/formations"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-gold to-gold-light text-[#0a0a0a] font-bold rounded-xl hover:shadow-lg hover:shadow-gold/20 transition-all text-[14px]"
              >
                <Zap className="w-4 h-4" />
                Découvrir les formations
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white border border-black/10 text-[#0a0a0a] font-bold rounded-xl hover:border-black/20 transition-all text-[14px]"
              >
                <ExternalLink className="w-4 h-4" />
                Lire le blog
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
