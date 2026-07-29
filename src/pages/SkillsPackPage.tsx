import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowDown, Check, X, ChevronDown, Shield, Zap, Clock,
  RefreshCw, Sparkles, Target, Layers, Wallet, Lock, Infinity as InfinityIcon,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

// ─── Paramètres de l'offre (à modifier ici uniquement) ───────────────────────
const CHECKOUT_URL = 'https://academy.oumarousanda.com/claude-skills/checkout';
const PRICE = '9 900 FCFA';
const PRICE_NUM = '9900';
const OLD_PRICE = '24 900 FCFA';
const PRICE_EUR = '≈ 15 €';
const TOTAL_VALUE = '80 000 FCFA';
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const staggerFast = { visible: { transition: { staggerChildren: 0.05 } } };

// ─── Données ──────────────────────────────────────────────────────────────────
const comparison = [
  {
    task: 'Un mois de contenu',
    manual: 'Un week-end entier qui ne revient pas',
    blank: '2 h de prompts, des posts génériques',
    pack: 'Une session : 30 jours planifiés, écrits, à ta ligne éditoriale',
  },
  {
    task: 'Une page de vente',
    manual: '300 000 FCFA à un copywriter, 2 semaines d\'attente',
    blank: 'Ça sent l\'IA, tu réécris la moitié',
    pack: 'Section par section, dans ta voix, cet après-midi',
  },
  {
    task: 'Une séquence de lancement',
    manual: '7 emails, 3 semaines de procrastination',
    blank: 'Un email correct, six plats',
    pack: 'De J-7 au dernier appel, tout est écrit et planifié',
  },
  {
    task: 'De la prospection',
    manual: 'Des relances au feeling, un fichier Excel mort',
    blank: 'Des templates que tout le monde utilise',
    pack: 'ICP + cold email + WhatsApp + relances + script de RDV',
  },
  {
    task: 'Une formation à vendre',
    manual: '3 mois à tourner en rond',
    blank: 'Un plan de cours générique',
    pack: 'Structure, scripts de modules, page de vente, lancement 7 j',
  },
  {
    task: 'Piloter ta trésorerie',
    manual: 'Un fichier que tu n\'ouvres plus',
    blank: 'Des conseils génériques, jamais chiffrés',
    pack: 'Plan de trésorerie, prix de revient, marges - chiffrés',
  },
  {
    task: 'Sonner humain',
    manual: '40 min de réécriture par post',
    blank: 'Ça reste robotique',
    pack: 'Ta voix de marque, vérifiée par un skill dédié',
  },
];

const firstWeek = [
  { emoji: '📅', text: 'Planifier, écrire et recycler un mois entier de contenu' },
  { emoji: '📝', text: 'Construire une page de vente longue, section par section' },
  { emoji: '🚀', text: 'Écrire tout ton lancement 7 jours : emails, posts, relances' },
  { emoji: '📧', text: 'Monter une séquence de bienvenue qui vend en automatique' },
  { emoji: '🎯', text: 'Définir ton ICP et lancer une campagne de cold email B2B' },
  { emoji: '💬', text: 'Prospecter en cold DM Instagram et en cold WhatsApp PME' },
  { emoji: '🎬', text: 'Scripter tes Reels, TikTok et vidéos YouTube longues' },
  { emoji: '🔍', text: 'Faire ta recherche de mots-clés et écrire un article SEO qui range' },
  { emoji: '💰', text: 'Fixer tes prix avec du vrai calcul : prix de revient, marge, stratégie de prix' },
  { emoji: '📊', text: 'Monter ton tableau de bord KPI et ton plan de trésorerie' },
  { emoji: '🎓', text: 'Structurer une formation en ligne et scripter chaque module' },
  { emoji: '🧲', text: 'Créer un quiz lead magnet et une landing page de conversion' },
  { emoji: '🤝', text: 'Écrire ton pitch deck investisseur ou ton dossier de financement bancaire' },
  { emoji: '⚖️', text: 'Sortir tes CGV produit digital et ton contrat de prestation' },
  { emoji: '🤖', text: 'Construire un assistant GPT, un agent IA ou un chatbot service client' },
  { emoji: '🔁', text: 'Auditer tes tâches automatisables et bâtir tes automatisations no-code' },
];

const categories = [
  {
    id: 'marketing',
    title: 'Marketing & Contenu',
    count: 23,
    color: 'from-amber-500 to-orange-600',
    skills: ['Article de blog SEO', 'Recherche de mots-clés', 'Calendrier éditorial mensuel', 'Carrousel LinkedIn/Instagram', 'Caption & stories', 'Post Facebook storytelling', 'Post LinkedIn thought leader', 'Hook d\'accroche vidéo', 'Titre accroche magique', 'Script Reel produit', 'Script TikTok viral', 'Script YouTube long', 'UGC créateur', 'Newsletter engagement', 'Newsletter de curation', 'Content repurposing', 'Batch de production', 'Workflow de création', 'Brief créatif publicitaire', 'Storytelling de marque', 'Brand voice checker', 'Ligne éditoriale', 'Visuels'],
  },
  {
    id: 'sales',
    title: 'Sales & Prospection',
    count: 19,
    color: 'from-rose-500 to-pink-600',
    skills: ['Cold email B2B', 'Cold DM Instagram', 'Cold WhatsApp PME', 'Définition d\'ICP', 'Qualification BANT', 'Script de RDV découverte', 'Argumentaire téléphone & closing', 'Traitement des objections', 'FAQ anti-objection', 'Proposition commerciale', 'Devis personnalisé', 'Négociation de prix', 'Offre irrésistible (Grand Slam)', 'Tunnel de vente VSL', 'Webinaire de vente', 'Landing page de conversion', 'Page de vente produit digital', 'Relance prospect froid', 'Relance panier abandonné', 'Follow-up de rendez-vous'],
  },
  {
    id: 'business',
    title: 'Business & Stratégie',
    count: 18,
    color: 'from-blue-500 to-indigo-600',
    skills: ['Validation d\'idée', 'Analyse de marché de niche', 'Analyse de concurrence', 'SWOT détaillé', 'Business plan light', 'Modèle économique canvas', 'Positionnement & différenciation', 'Étude de faisabilité', 'Analyse de rentabilité', 'Plan de croissance 90 jours', 'OKR trimestriels', 'Roadmap produit', 'Naming produit & offre', 'Pitch elevator', 'Pitch deck investisseur', 'Dossier de financement bancaire', 'Financement de projet en Afrique', 'Partenariat stratégique'],
  },
  {
    id: 'productivite',
    title: 'Productivité & Automatisation',
    count: 17,
    color: 'from-emerald-500 to-emerald-600',
    skills: ['Audit des tâches automatisables', 'Automatisation d\'une tâche récurrente', 'Blueprint automation no-code', 'CRM update automatique', 'SOP & procédures', 'Délégation d\'équipe', 'Agenda optimal', 'Priorisation Eisenhower', 'Revue hebdomadaire GTD', 'Rétro mensuelle', 'Brief matinal entrepreneur', 'Gestion de l\'énergie & focus', 'Inbox zero', 'Notes de réunion & actions', 'Organisation de projets', 'Checklist qualité livrable', 'Journaling business'],
  },
  {
    id: 'ia',
    title: 'IA & Prompt Engineering',
    count: 10,
    color: 'from-violet-500 to-purple-600',
    skills: ['Prompt engineering pro', 'Prompt image générative', 'Construire un assistant GPT', 'Agent IA & workflow', 'Base de connaissance RAG', 'Chatbot service client IA', 'Doc vers formation IA', 'Lire ses données business', 'Veille IA résumée', 'Dashboard KPI'],
  },
  {
    id: 'produits',
    title: 'Produits Digitaux & Formations',
    count: 8,
    color: 'from-cyan-500 to-teal-600',
    skills: ['Structurer une formation en ligne', 'Script de module', 'Création rapide d\'ebook', 'Plan de lancement produit', 'Lancement de formation 7 jours', 'Communauté & membership', 'Upsell & cross-sell', 'Quiz lead magnet'],
  },
  {
    id: 'finance',
    title: 'Finance & Admin',
    count: 6,
    color: 'from-lime-500 to-green-600',
    skills: ['Plan de trésorerie & cashflow', 'Prix de revient & marge', 'Budget prévisionnel', 'Tableau de bord financier', 'Stratégie de prix FCFA', 'Relance impayés'],
  },
  {
    id: 'service',
    title: 'Service Client & Opérations',
    count: 5,
    color: 'from-sky-500 to-blue-600',
    skills: ['Onboarding client', 'Gestion de réclamation', 'Réponse aux avis clients', 'Enquête satisfaction NPS', 'Case study client'],
  },
  {
    id: 'branding',
    title: 'Personal Branding & Création',
    count: 5,
    color: 'from-fuchsia-500 to-pink-600',
    skills: ['Positionnement personal brand', 'Bio réseaux optimisée', 'Média kit partenariat', 'Croissance d\'audience 90 j', 'Ligne éditoriale créateur'],
  },
  {
    id: 'recrutement',
    title: 'Recrutement & Équipe',
    count: 4,
    color: 'from-orange-500 to-red-600',
    skills: ['Fiche de poste & annonce', 'Guide d\'entretien', 'Onboarding collaborateur', 'Feedback & évaluation de performance'],
  },
  {
    id: 'juridique',
    title: 'Juridique & Croissance',
    count: 5,
    color: 'from-slate-500 to-gray-600',
    skills: ['CGV produit digital', 'Contrat de prestation', 'Programme d\'affiliation', 'Stratégie WhatsApp Business', 'Pricing stratégie'],
  },
];

const audience = [
  { title: 'Entrepreneurs & solopreneurs', desc: 'Qui veulent abattre le travail de trois personnes' },
  { title: 'Créateurs de contenu', desc: 'Qui veulent produire plus sans s\'épuiser' },
  { title: 'Freelances & agences', desc: 'Qui veulent livrer plus pro en moins de temps' },
  { title: 'Coachs & formateurs', desc: 'Qui veulent créer et vendre leurs formations' },
];

const offerRows = [
  { label: '120 skills Claude pro, au standard SKILL.md', value: '60 000 FCFA' },
  { label: '11 catégories : marketing, sales, IA, finance, produits, juridique…', value: 'inclus' },
  { label: 'Guide d\'installation pas-à-pas (Claude.ai et Claude Code)', value: '10 000 FCFA' },
  { label: 'BONUS : 10 prompts IA prêts à l\'emploi', value: '10 000 FCFA' },
  { label: 'Mises à jour gratuites à vie', value: '∞' },
];

const faqs = [
  {
    q: 'Ça marche avec quel abonnement Claude ?',
    a: 'N\'importe quel plan payant Claude. L\'upload de skills n\'est pas disponible sur le plan gratuit. Un plan supérieur te donne juste plus de volume pour enchaîner beaucoup de tâches d\'affilée.',
  },
  {
    q: 'Je débute avec Claude, c\'est pour moi ?',
    a: 'Oui. Le guide d\'installation est pas-à-pas et ne demande aucun terminal - copier-coller dans Claude.ai suffit. Ensuite chaque skill te guide, tu n\'as qu\'à répondre à ses questions.',
  },
  {
    q: '120 skills, ce n\'est pas peu face aux packs à 2 000 ?',
    a: 'C\'est l\'argument de vente inverse. Les packs à 2 000 sont du remplissage généré en masse qui dégrade les performances de Claude. Ici chaque skill est trié, approfondi et réellement utilisable. Tu achètes des résultats, pas un compteur.',
  },
  {
    q: 'Ça marche avec ChatGPT ou une autre IA ?',
    a: 'Le format SKILL.md est conçu pour Claude. Mais le contenu - persona + méthode + structure - se colle aussi comme instruction système dans les autres IA. Le résultat est optimal sur Claude.',
  },
  {
    q: 'Comment je paie ?',
    a: 'Orange Money, Wave, MTN MoMo, carte bancaire ou PayPal. Tout est géré sur la page de paiement, l\'accès est immédiat.',
  },
  {
    q: 'C\'est vraiment du français, ou une traduction ?',
    a: '100 % écrit en français, aucune traduction automatique. Chaque skill a été rédigé et testé directement en français - le vocabulaire, les tournures et les exemples sonnent juste, tu n\'as rien à retoucher.',
  },
  {
    q: 'C\'est un abonnement ?',
    a: 'Non. Paiement unique. Tu télécharges, c\'est à toi pour toujours, y compris les futures mises à jour. Rien à résilier.',
  },
  {
    q: 'Comment c\'est livré ?',
    a: 'Instantanément. Dès le paiement validé, tu reçois le lien de téléchargement avec tout le pack et le guide.',
  },
];

// ─── Bouton d'achat réutilisable ──────────────────────────────────────────────
function BuyButton({ label, className = '' }: { label: string; className?: string }) {
  return (
    <motion.a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-[#050505] font-heading font-black text-[15px] rounded-xl shadow-[0_10px_40px_rgba(212,175,55,0.4)] transition-all duration-300 overflow-hidden ${className}`}
    >
      {label}
      <ArrowRight className="w-4 h-4" />
      <span className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] bg-[position:200%_0] group-hover:animate-shimmer" />
    </motion.a>
  );
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function SkillsPackPage() {
  const [openCat, setOpenCat] = useState<string | null>('marketing');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEOHead
        title="Claude Skills Pack FR - 120 skills Claude en français"
        description="120 skills Claude professionnels, 100 % en français : copywriting, prospection, contenu, finance, formation. Chacun encode une vraie méthode. Installation en moins d'une minute. Paiement unique 9 900 FCFA."
        canonical="/claude-skills-pack"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Claude Skills Pack FR',
          description:
            '120 skills Claude professionnels en français, répartis en 11 catégories : marketing, sales, business, productivité, IA, produits digitaux, finance, service client, personal branding, recrutement, juridique. Chaque skill contient une persona experte, une méthode étape par étape et une structure de livrable.',
          brand: { '@type': 'Brand', name: 'Sanda Vibe Code' },
          inLanguage: 'fr',
          offers: {
            '@type': 'Offer',
            price: PRICE_NUM,
            priceCurrency: 'XAF',
            availability: 'https://schema.org/InStock',
            url: CHECKOUT_URL,
          },
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#050505] pt-28 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gold/10 via-[#050505] to-[#050505]" />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-20 w-[700px] h-[700px] bg-gold rounded-full blur-[160px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue rounded-full blur-[140px] pointer-events-none"
        />

        <div className="relative max-w-4xl mx-auto px-5 sm:px-6 py-16 sm:py-24 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[11px] font-bold tracking-widest uppercase mb-8"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
            </span>
            Claude Skills Pack · 120 skills · 100 % en français
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-heading font-black text-white leading-[1.08] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4.2vw, 3.2rem)' }}
          >
            Transforme Claude en une équipe de{' '}
            <span className="text-gold">120 experts.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Copywriter, closer, community manager, DAF, formateur, growth marketer… 120 spécialistes
            que tu ne pourrais jamais te payer. Installés dans Claude en moins d'une minute. Qui
            travaillent dans <strong className="text-white">ta</strong> voix, sur{' '}
            <strong className="text-white">ton</strong> business.
          </motion.p>

          {/* Prix */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="inline-flex flex-col items-center mb-8"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-white/30 text-xl line-through">{OLD_PRICE}</span>
              <span className="font-heading font-black text-gold text-4xl sm:text-5xl">{PRICE}</span>
            </div>
            <p className="text-white/40 text-[13px] mt-2">
              Économise 15 000 FCFA · soit 82 FCFA par skill
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
            <BuyButton label="Je veux les 120 skills" />
            <a
              href="#catalogue"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-heading font-semibold text-[14px] rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Voir ce qu'il y a dedans <ArrowDown className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid sm:grid-cols-2 gap-2 max-w-xl mx-auto text-left text-white/50 text-[13px]"
          >
            {[
              'Accès à vie, mises à jour futures incluses',
              'Paiement unique. Pas d\'abonnement, rien à résilier',
              'Garantie satisfait ou remboursé 14 jours',
              'Orange Money · Wave · MTN MoMo · Carte · PayPal',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── LE MÉCANISME ─────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 bg-white border-t border-black/5">
        <div className="relative max-w-4xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="text-center mb-12">
            <h2
              className="font-heading font-black text-[#111111] leading-tight tracking-tight mb-5"
              style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.7rem)' }}
            >
              Un skill, ce n'est pas un prompt.<br />
              <span className="text-gold-dark">C'est un mode d'emploi installé dans Claude.</span>
            </h2>
            <p className="text-[#555555] text-[15px] max-w-2xl mx-auto leading-relaxed">
              Un prompt, tu le retapes à chaque fois, tu réexpliques ton business, tu corriges la
              sortie générique. Un skill, tu l'installes <strong className="text-[#111111]">une fois</strong>.
              Ensuite tu demandes en français normal - « rédige la page de vente de ma formation » - et
              Claude charge le bon expert tout seul et déroule sa méthode.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid sm:grid-cols-2 gap-4 mb-10"
          >
            {[
              { emoji: '🎭', title: 'Une persona experte', desc: 'Pas « un assistant », mais un copywriter senior, un closer, un contrôleur de gestion' },
              { emoji: '📐', title: 'Une méthode étape par étape', desc: 'Le process réel d\'un pro, encodé' },
              { emoji: '📄', title: 'Une structure de livrable', desc: 'Tu reçois un document fini, pas un pavé à retravailler' },
              { emoji: '✅', title: 'Exemples et anti-patterns', desc: 'Ce qu\'il faut faire, et surtout ce qu\'il ne faut pas' },
              { emoji: '🎯', title: 'Du concret, pas de la théorie', desc: 'Des chiffres, des canaux et des cas d\'usage réels, directement applicables' },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="bg-[#faf9f7] border border-black/8 rounded-2xl p-5 hover:border-gold-dark/40 transition-colors"
              >
                <div className="text-2xl mb-2">{item.emoji}</div>
                <h3 className="font-heading font-bold text-[#111111] text-[15px] mb-1">{item.title}</h3>
                <p className="text-[#666666] text-[13px] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.blockquote
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="border-l-2 border-gold-dark pl-5 text-[#333333] font-heading text-lg sm:text-xl italic"
          >
            Tu ne pilotes plus l'IA. Tu lui demandes. Elle sait déjà comment faire.
          </motion.blockquote>
        </div>
      </section>

      {/* ── COMPARATIF ───────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 bg-[#050505] border-t border-white/5">
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="text-center mb-12">
            <h2
              className="font-heading font-black text-white leading-tight tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.7rem)' }}
            >
              La différence, <span className="text-gold">concrètement</span>
            </h2>
            <p className="text-white/50 text-[15px]">Les mêmes tâches, trois façons de les faire.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
            className="overflow-x-auto rounded-2xl border border-white/10"
          >
            <table className="w-full min-w-[760px] text-left text-[13px]">
              <thead>
                <tr className="bg-white/[0.04] text-white/50 text-[11px] uppercase tracking-wider">
                  <th className="p-4 font-semibold">La tâche</th>
                  <th className="p-4 font-semibold">Toi, à la main</th>
                  <th className="p-4 font-semibold">Claude, fenêtre vide</th>
                  <th className="p-4 font-semibold text-gold">Avec le Skills Pack</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.task} className="border-t border-white/5">
                    <td className="p-4 font-heading font-bold text-white align-top">{row.task}</td>
                    <td className="p-4 text-white/40 align-top">{row.manual}</td>
                    <td className="p-4 text-white/40 align-top">{row.blank}</td>
                    <td className="p-4 text-white/85 align-top bg-gold/[0.04]">{row.pack}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <div className="text-center mt-10">
            <BuyButton label={`Je prends les 120 skills · ${PRICE}`} />
            <p className="text-white/35 text-[12px] mt-3">Paiement unique · Garantie 14 jours</p>
          </div>
        </div>
      </section>

      {/* ── AVANT / APRÈS ────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 bg-white border-t border-black/5">
        <div className="relative max-w-5xl mx-auto px-5 sm:px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="font-heading font-black text-[#111111] leading-tight tracking-tight mb-12 text-center"
            style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.7rem)' }}
          >
            Avant / <span className="text-gold-dark">Après</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Avant */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              className="bg-[#fdf7f7] border border-rose-500/25 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <X className="w-4 h-4 text-rose-500" />
                <h3 className="font-heading font-bold text-[#111111] text-[15px]">
                  Sans le pack - la roulette du prompt
                </h3>
              </div>
              <div className="space-y-2 mb-5">
                {[
                  '« écris-moi une page de vente »',
                  '« hmm, plus court »',
                  '« rajoute de l\'urgence »',
                  '« trop vendeur, recommence »',
                  '« change le titre »',
                  '« … laisse tomber »',
                ].map((line) => (
                  <p key={line} className="text-[#666666] text-[13px] bg-black/[0.04] rounded-lg px-3 py-2">
                    {line}
                  </p>
                ))}
              </div>
              <p className="text-rose-600 text-[13px] italic">
                Une heure de bricolage. Toujours pas ça.
              </p>
            </motion.div>

            {/* Après */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              className="bg-gold/[0.08] border border-gold-dark/30 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <Check className="w-4 h-4 text-gold-dark" />
                <h3 className="font-heading font-bold text-[#111111] text-[15px]">
                  Avec le pack - une seule demande
                </h3>
              </div>
              <div className="space-y-3 mb-5">
                <p className="text-[#222222] text-[13px] bg-white/70 rounded-lg px-3 py-2">
                  « Rédige la page de vente de ma formation. »
                </p>
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-gold-dark text-[12px] font-mono">
                  <Zap className="w-3.5 h-3.5 shrink-0" />
                  Skill <code className="bg-gold-dark/10 px-1.5 py-0.5 rounded break-all">page-vente-produit-digital</code> chargé
                </p>
                <p className="text-[#555555] text-[13px] bg-white/70 rounded-lg px-3 py-2 leading-relaxed">
                  « C'est parti. Je cadre ton offre, puis j'écris l'accroche, le problème, le
                  mécanisme, la pile de valeur, la preuve et le close - dans ta voix. »
                </p>
              </div>
              <p className="text-gold-dark text-[13px] italic">
                Une page complète, structurée, à ta marque. Du premier coup.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PREMIÈRE SEMAINE ─────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 bg-[#050505] border-t border-white/5">
        <div className="relative max-w-4xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="text-center mb-12">
            <h2
              className="font-heading font-black text-white leading-tight tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.7rem)' }}
            >
              Ce que tu peux sortir dès ta <span className="text-gold">première semaine</span>
            </h2>
            <p className="text-white/50 text-[15px]">
              Chaque ligne = un skill réel du pack. Pas une promesse, pas un « avec un peu de config ».
            </p>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={staggerFast}
            className="grid sm:grid-cols-2 gap-3"
          >
            {firstWeek.map((item) => (
              <motion.li
                key={item.text}
                variants={fadeUp}
                className="flex items-start gap-3 bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3 text-white/70 text-[13.5px] leading-relaxed"
              >
                <span className="text-[15px] shrink-0">{item.emoji}</span>
                {item.text}
              </motion.li>
            ))}
          </motion.ul>

          <p className="text-center text-white/35 text-[13px] mt-8 italic">
            …et ce n'est que 16 skills sur 120.
          </p>
        </div>
      </section>

      {/* ── EN CHIFFRES ──────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-24 bg-[#070707] border-t border-white/5">
        <div className="relative max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {[
              { icon: Layers, num: '120', label: 'skills Claude professionnels, triés à la main' },
              { icon: Target, num: '11', label: 'catégories : de la prospection à la trésorerie' },
              { icon: Clock, num: '< 1 min', label: 'pour installer un skill. Sans terminal' },
              { icon: InfinityIcon, num: '∞', label: 'mises à jour gratuites, à vie' },
              { icon: Wallet, num: '0 FCFA', label: 'par mois. Pas d\'abonnement, pas de limite' },
            ].map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-center"
              >
                <s.icon className="w-5 h-5 text-gold mx-auto mb-3" />
                <p className="font-heading font-black text-white text-2xl sm:text-3xl mb-2">{s.num}</p>
                <p className="text-white/45 text-[12px] leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── POURQUOI 120 ─────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 bg-white border-t border-black/5">
        <div className="relative max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <h2
              className="font-heading font-black text-[#111111] leading-tight tracking-tight mb-6"
              style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.7rem)' }}
            >
              Pourquoi 120 et pas{' '}
              <span className="line-through decoration-red-600 decoration-[3px]">2 000</span>
            </h2>
            <p className="text-[#444444] text-[15px] leading-relaxed mb-5">
              Parce que <strong className="text-gold-dark">le tri, c'est la valeur.</strong>
            </p>
            <p className="text-[#555555] text-[15px] leading-relaxed mb-5">
              Les packs à « 2 000 prompts » que tu vois passer à 5 000 FCFA sont générés en masse.
              Personne n'ouvre 2 000 fichiers. Pire : trop de skills chargés en même temps dégradent
              les performances de Claude - la documentation officielle déconseille d'installer des
              packs entiers sans tri.
            </p>
            <p className="text-[#555555] text-[15px] leading-relaxed mb-8">
              Ici c'est l'inverse. 120 skills approfondis, chacun encodant une vraie méthode, chacun
              testé. Tu n'as pas besoin de 2 000 fichiers. Tu as besoin du bon expert au bon moment.
            </p>
            <blockquote className="font-heading text-[#111111] text-lg sm:text-xl italic border-t border-black/10 pt-8">
              120 skills que tu utilises vraiment &gt; 2 000 que tu n'ouvriras jamais.
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* ── CATALOGUE ────────────────────────────────────────────────────── */}
      <section id="catalogue" className="relative py-20 sm:py-28 bg-[#070707] border-t border-white/5 scroll-mt-24">
        <div className="relative max-w-4xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="text-center mb-12">
            <h2
              className="font-heading font-black text-white leading-tight tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.7rem)' }}
            >
              Les 120 skills, <span className="text-gold">par catégorie</span>
            </h2>
            <p className="text-white/50 text-[15px]">Clique sur une catégorie pour voir le détail.</p>
          </motion.div>

          <div className="space-y-3">
            {categories.map((cat) => {
              const isOpen = openCat === cat.id;
              return (
                <motion.div
                  key={cat.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={fadeUp}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenCat(isOpen ? null : cat.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.03] transition-colors"
                  >
                    <span className={`w-1.5 h-10 rounded-full bg-gradient-to-b ${cat.color} shrink-0`} />
                    <span className="flex-1">
                      <span className="block font-heading font-bold text-white text-[15px]">
                        {cat.title}
                      </span>
                      <span className="block text-white/40 text-[12px] mt-0.5">
                        {cat.count} skills
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-white/40 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1">
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((s) => (
                          <span
                            key={s}
                            className="text-white/60 text-[12.5px] bg-white/[0.04] border border-white/8 rounded-lg px-2.5 py-1.5"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ZOOM SUR UN SKILL ────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 bg-[#050505] border-t border-white/5">
        <div className="relative max-w-3xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}>
            <p className="text-gold text-[11px] font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Zoom sur un skill
            </p>
            <h2
              className="font-heading font-black text-white leading-tight tracking-tight mb-3"
              style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.3rem)' }}
            >
              <code className="text-gold">offre-irresistible-grand-slam</code>
            </h2>
            <p className="text-white/50 text-[15px] mb-8">
              Pour montrer le niveau de détail, voici ce qu'il y a{' '}
              <strong className="text-white">dans un seul</strong> des 120 fichiers.
            </p>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-5">
              <p className="text-white/60 text-[14px] leading-relaxed">
                Tu lui donnes ton offre actuelle. Il te fait passer par la méthode complète :
                identification du résultat rêvé du client, inventaire des obstacles perçus,
                construction de la pile de valeur (chaque obstacle → une solution incluse), ancrage de
                la valeur totale, choix du prix, design de la garantie, et création de la rareté et de
                l'urgence.
              </p>
              <p className="text-white/60 text-[14px] leading-relaxed">
                Il ressort avec : ton offre reformulée, ta pile de valeur chiffrée, tes 3 niveaux de
                prix, ta garantie rédigée, et les arguments à copier tels quels dans ta page de vente.
                Avec les anti-patterns - pourquoi une garantie molle tue la conversion, pourquoi une
                fausse urgence te coûte des clients.
              </p>
              <p className="font-heading font-bold text-gold text-[15px]">Et il y en a 119 autres.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── POUR QUI ─────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 bg-white border-t border-black/5">
        <div className="relative max-w-4xl mx-auto px-5 sm:px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="font-heading font-black text-[#111111] leading-tight tracking-tight mb-12 text-center"
            style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.7rem)' }}
          >
            Pour <span className="text-gold-dark">qui</span>
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid sm:grid-cols-2 gap-4 mb-10"
          >
            {audience.map((a) => (
              <motion.div
                key={a.title}
                variants={fadeUp}
                className="bg-[#faf9f7] border border-black/8 rounded-2xl p-5"
              >
                <h3 className="font-heading font-bold text-[#111111] text-[15px] mb-1.5">{a.title}</h3>
                <p className="text-[#666666] text-[13px] leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <p className="text-center text-[#555555] text-[15px]">
            Si tu écris, vends, prospectes ou pilotes des chiffres - c'est pour toi.
          </p>
        </div>
      </section>

      {/* ── QUI EST DERRIÈRE ─────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 bg-[#050505] border-t border-white/5">
        <div className="relative max-w-4xl mx-auto px-5 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
            className="grid sm:grid-cols-[180px_1fr] gap-8 items-center"
          >
            <img
              src="/oumarou-sanda-1.webp"
              alt="Oumarou Sanda"
              width={180}
              height={220}
              loading="lazy"
              className="w-full max-w-[180px] mx-auto rounded-2xl object-cover border border-white/10"
            />
            <div>
              <h2 className="font-heading font-black text-white text-2xl sm:text-3xl mb-4">
                Qui est derrière
              </h2>
              <p className="text-white/55 text-[14.5px] leading-relaxed mb-4">
                Je suis <strong className="text-white">Oumarou Sanda</strong> - Sanda Vibe Code &
                Wendooka. J'aide les entrepreneurs à utiliser l'IA pour automatiser et faire grandir
                leur business, sans être techniques.
              </p>
              <p className="text-white/55 text-[14.5px] leading-relaxed">
                Ces 120 skills, ce sont les systèmes que j'utilise au quotidien - sur mes propres
                lancements, mes propres pages de vente, mes propres clients. Pas des fichiers générés
                pour faire du volume. <strong className="text-gold">Des méthodes qui tournent déjà.</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3 ÉTAPES ─────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 bg-[#070707] border-t border-white/5">
        <div className="relative max-w-4xl mx-auto px-5 sm:px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="font-heading font-black text-white leading-tight tracking-tight mb-12 text-center"
            style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.7rem)' }}
          >
            C'est tout ce qu'il y a <span className="text-gold">à faire</span>
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-5"
          >
            {[
              { n: '1', title: 'Tu télécharges', desc: 'Le pack - accès immédiat après paiement' },
              { n: '2', title: 'Tu installes', desc: 'Moins d\'une minute par skill, sans terminal' },
              { n: '3', title: 'Tu demandes en français', desc: 'Claude charge le bon expert et exécute' },
            ].map((s) => (
              <motion.div
                key={s.n}
                variants={fadeUp}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gold text-[#050505] font-heading font-black text-[15px] mb-4">
                  {s.n}
                </span>
                <h3 className="font-heading font-bold text-white text-[15px] mb-1.5">{s.title}</h3>
                <p className="text-white/45 text-[13px] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── L'OFFRE ──────────────────────────────────────────────────────── */}
      <section id="offre" className="relative py-20 sm:py-28 bg-[#050505] border-t border-white/5 scroll-mt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gold/8 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} className="text-center mb-10">
            <h2
              className="font-heading font-black text-white leading-tight tracking-tight mb-3"
              style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.7rem)' }}
            >
              Ton équipe complète, <span className="text-gold">payée une fois</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
            className="bg-white/[0.03] border border-gold/20 rounded-3xl p-6 sm:p-8"
          >
            <ul className="space-y-3 mb-6">
              {offerRows.map((r) => (
                <li
                  key={r.label}
                  className="flex items-start justify-between gap-4 border-b border-white/5 pb-3 last:border-0"
                >
                  <span className="flex items-start gap-2.5 text-white/70 text-[13.5px] leading-relaxed">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    {r.label}
                  </span>
                  <span className="text-white/35 text-[13px] whitespace-nowrap shrink-0">{r.value}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 mb-8">
              <span className="font-heading font-bold text-white text-[15px]">Valeur totale</span>
              <span className="font-heading font-bold text-white text-[15px]">{TOTAL_VALUE}</span>
            </div>

            <div className="text-center">
              <p className="text-white/40 text-[12px] uppercase tracking-widest mb-3">
                Prix de lancement
              </p>
              <div className="flex items-baseline justify-center gap-3 mb-2">
                <span className="text-white/30 text-xl line-through">{OLD_PRICE}</span>
                <span className="font-heading font-black text-gold text-4xl sm:text-5xl">{PRICE}</span>
              </div>
              <p className="text-white/40 text-[13px] mb-6">{PRICE_EUR}</p>

              <p className="text-white/60 text-[14px] mb-6">
                Paiement unique. Accès à vie. Mises à jour incluses.
              </p>

              <BuyButton label="Je débloque mes 120 skills maintenant" className="w-full sm:w-auto" />

              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-white/35 text-[11.5px] mt-6">
                <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Paiement sécurisé</span>
                <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Livraison instantanée</span>
                <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3" /> Garantie 14 jours</span>
              </div>
              <p className="text-white/30 text-[11.5px] mt-3">
                💳 Orange Money · Wave · MTN MoMo · Carte bancaire · PayPal
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── GARANTIE ─────────────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-20 bg-[#070707] border-t border-white/5">
        <div className="relative max-w-2xl mx-auto px-5 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <Shield className="w-8 h-8 text-gold mx-auto mb-5" />
            <h2 className="font-heading font-black text-white text-2xl sm:text-3xl mb-4">
              Satisfait ou remboursé, 14 jours
            </h2>
            <p className="text-white/55 text-[15px] leading-relaxed">
              Installe les skills, teste-les sur ton vrai business. Si tu estimes que ça ne t'a rien
              apporté, tu écris, on te rembourse. Sans discuter.{' '}
              <strong className="text-white">Le risque est de mon côté, pas du tien.</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 bg-white border-t border-black/5">
        <div className="relative max-w-3xl mx-auto px-5 sm:px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="font-heading font-black text-[#111111] leading-tight tracking-tight mb-12 text-center"
            style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.7rem)' }}
          >
            Questions <span className="text-gold-dark">fréquentes</span>
          </motion.h2>

          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={f.q}
                  className="bg-[#faf9f7] border border-black/8 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-black/[0.03] transition-colors"
                  >
                    <span className="font-heading font-semibold text-[#111111] text-[14.5px]">{f.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-black/40 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <p className="px-5 pb-5 text-[#555555] text-[13.5px] leading-relaxed">{f.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DERNIER APPEL ────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 bg-[#070707] border-t border-white/5 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold rounded-full blur-[160px] pointer-events-none"
        />
        <div className="relative max-w-3xl mx-auto px-5 sm:px-6 text-center z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}>
            <h2
              className="font-heading font-black text-white leading-tight tracking-tight mb-8"
              style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.9rem)' }}
            >
              Tu as <span className="text-gold">deux options</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left">
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
                <p className="text-white/35 text-[11px] uppercase tracking-widest mb-2">Option 1</p>
                <p className="text-white/50 text-[13.5px] leading-relaxed">
                  Continuer à réécrire les mêmes prompts, produire du contenu plat, et repousser les
                  tâches qui rapportent vraiment.
                </p>
              </div>
              <div className="bg-gold/[0.05] border border-gold/25 rounded-2xl p-5">
                <p className="text-gold text-[11px] uppercase tracking-widest mb-2">Option 2</p>
                <p className="text-white/70 text-[13.5px] leading-relaxed">
                  Installer 120 systèmes d'experts une bonne fois pour toutes, et faire tourner ton
                  business avec une longueur d'avance - pour le prix d'un repas.
                </p>
              </div>
            </div>

            <p className="text-white/60 text-[15px] italic mb-8">
              Ton seul regret, ce seront les mois passés à tout faire toi-même.
            </p>

            <BuyButton label={`Je veux les 120 skills · ${PRICE}`} />

            <p className="text-white/35 text-[12px] mt-5">
              Paiement unique · Accès à vie · Garantie 14 jours · Mises à jour gratuites
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
