import { useState, useEffect, useRef } from 'react';
import { motion, useInView as useMotionInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, Lock, Star, Shield, Zap, ChevronDown,
  ArrowRight, Users, Clock, Award, RefreshCw, MessageCircle,
  BookOpen, Rocket, Target, Gift
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';

// ─── Tous les CTAs passent par le quiz avant d'afficher le tarif ──────────────
const QUIZ_URL = '/quiz-ia';
// ─────────────────────────────────────────────────────────────────────────────

// ─── Animated counter ────────────────────────────────────────────────────────
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useMotionInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  return <span ref={ref}>{display.toLocaleString('fr-FR')}{suffix}</span>;
}

// ─── Variants ────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};
const staggerFast = {
  visible: { transition: { staggerChildren: 0.07 } },
};

// ─── Programme data ───────────────────────────────────────────────────────────
const programme = [
  {
    id: 'fondations',
    color: 'from-emerald-500 to-emerald-600',
    emoji: '📗',
    title: 'Les 2 Fondations',
    days: 'Jours 1–2',
    lessons: [
      { day: 1, title: 'Fondation 01 : Comprendre l\'IA Générative', desc: 'Les 3 niveaux, comment ça fonctionne, ce que ça peut faire pour toi aujourd\'hui.', access: 'Gratuit', badge: '' },
      { day: 2, title: 'Fondation 02 : Master du Prompt R·C·T·F·C', desc: 'Le framework qui fait la différence entre une réponse médiocre et un résultat professionnel.', access: 'Gratuit', badge: '' },
    ],
  },
  {
    id: 's1',
    color: 'from-blue-500 to-indigo-600',
    emoji: '📘',
    title: 'Semaine 1 — Les Assistants IA de 2026',
    days: 'Jours 3–7',
    lessons: [
      { day: 3, title: 'Master 01 : ChatGPT', desc: 'Bien au-delà de la rédaction — analyse, images, vidéo, code.', access: 'Freemium', badge: '' },
      { day: 4, title: 'Master 02 : Claude AI', desc: 'Le meilleur pour analyser de longs documents, rédiger et raisonner.', access: 'Freemium', badge: '' },
      { day: 5, title: 'Master 03 : Gemini 2.5 Pro', desc: 'L\'IA de Google — multimodal, recherche web temps réel, VEO intégré.', access: 'Freemium · Essai 1 mois', badge: '' },
      { day: 6, title: 'Master 04 : Grok 3', desc: 'L\'IA de X — veille virale, actualité, génération images et vidéos.', access: 'Freemium', badge: 'NEW 2026' },
      { day: 7, title: 'Master 05 : Perplexity', desc: 'Remplace Google pour la recherche — sources citées, réponses vérifiées.', access: 'Freemium', badge: '' },
    ],
  },
  {
    id: 's2',
    color: 'from-violet-500 to-purple-600',
    emoji: '📙',
    title: 'Semaine 2 — Image IA : Les Nouveaux Standards',
    days: 'Jours 8–14',
    lessons: [
      { day: 8,  title: 'Master 06 : Higgsfield', desc: 'La plateforme qui réunit tous les meilleurs modèles image et vidéo en un seul endroit.', access: 'Freemium', badge: 'NEW 2026' },
      { day: 9,  title: 'Master 07 : Nano Banana Pro', desc: 'Images 4K natives avec texte lisible — le modèle qui a rendu Midjourney obsolète.', access: 'Freemium', badge: 'NEW 2026' },
      { day: 10, title: 'Master 08 : Seedream 4.5', desc: 'Photoréalisme 4K et cohérence de personnage — parfait pour les campagnes commerciales.', access: 'Freemium', badge: 'NEW 2026' },
      { day: 11, title: 'Master 09 : Flux Kontext', desc: 'Modifier une image existante sans la recréer — édition contextuelle avancée.', access: 'Freemium', badge: 'NEW 2026' },
      { day: 12, title: 'Master 10 : GPT Image', desc: 'Créer des visuels marketing directement dans ChatGPT — thumbnails, posts, affiches.', access: 'Freemium', badge: 'NEW 2026' },
      { day: 13, title: 'Master 11 : Canva AI', desc: 'Design augmenté par IA — posts, flyers, présentations en 1 clic.', access: 'Freemium', badge: '' },
      { day: 14, title: 'Master 12 : Leonardo AI', desc: 'Suite créative rachetée par Canva — images, vidéo, textures 3D.', access: 'Freemium', badge: '' },
    ],
  },
  {
    id: 's3',
    color: 'from-rose-500 to-pink-600',
    emoji: '📕',
    title: 'Semaine 3 — Vidéo IA : La Révolution Cinématographique',
    days: 'Jours 15–21',
    lessons: [
      { day: 15, title: 'Master 13 : VEO 3.1', desc: 'Google DeepMind — clips 60s ultra-réalistes avec audio natif.', access: 'Essai gratuit inclus', badge: 'NEW 2026' },
      { day: 16, title: 'Master 14 : Sora 2', desc: 'OpenAI — scènes complexes, physique réaliste, narration avancée.', access: 'Via Higgsfield', badge: 'NEW 2026' },
      { day: 17, title: 'Master 15 : Kling 3.0', desc: '22 millions d\'utilisateurs — clips jusqu\'à 3 minutes, audio natif.', access: 'Freemium', badge: 'NEW 2026' },
      { day: 18, title: 'Master 16 : Runway Gen-4.5', desc: '#1 mondial Video Arena — chorégraphie caméra, effets cinéma pro.', access: 'Freemium', badge: '' },
      { day: 19, title: 'Master 17 : HeyGen', desc: 'Avatar IA parlant en 175 langues — formations vidéo, marketing, doublage.', access: 'Freemium', badge: '' },
      { day: 20, title: 'Master 18 : CapCut IA', desc: 'Montage IA gratuit — sous-titres automatiques, effets viraux, avatars.', access: '100% Gratuit', badge: '' },
      { day: 21, title: 'Master 19 : Hailuo MiniMax', desc: 'Génération vidéo rapide — idéal pour les Shorts, Reels et TikToks.', access: 'Freemium', badge: 'NEW 2026' },
    ],
  },
  {
    id: 's4',
    color: 'from-amber-500 to-orange-600',
    emoji: '📓',
    title: 'Semaine 4 — Audio, Productivité, Code & Automatisation',
    days: 'Jours 22–30',
    lessons: [
      { day: 22, title: 'Master 20 : ElevenLabs', desc: 'Voix IA ultra-réalistes — narration, podcasts, doublage, e-learning.', access: 'Freemium', badge: '' },
      { day: 23, title: 'Master 21 : Suno v4', desc: 'Musique IA complète — jingles, génériques, fonds sonores.', access: 'Freemium', badge: '' },
      { day: 24, title: 'Master 22 : Notion AI', desc: 'Organise ton travail avec l\'IA — résumés, projets, base de connaissances.', access: 'Freemium', badge: '' },
      { day: 25, title: 'Master 23 : Gamma', desc: 'Présentations professionnelles générées en 30 secondes depuis un prompt.', access: 'Freemium', badge: '' },
      { day: 26, title: 'Master 24 : Mammouth AI', desc: 'GPT-5, Claude, Gemini, Grok en un seul abonnement à 10€/mois.', access: 'Payant · 10€/mois', badge: 'NEW' },
      { day: 27, title: 'Master 25 : Antigravity (Google)', desc: 'Vibe coding — décris ton app en français, l\'IA la construit et la déploie.', access: 'Gratuit', badge: 'NEW 2026' },
      { day: 28, title: 'Master 26 : N8N', desc: 'Automatisations puissantes — connecte tes apps, crée des workflows IA.', access: 'Self-hosted gratuit', badge: 'NEW' },
      { day: 29, title: 'Master 27 : Google AI Studio', desc: 'Le playground officiel de Gemini — tester, expérimenter, créer des agents.', access: '100% Gratuit', badge: '' },
      { day: 30, title: 'Master 28 : Bilan & Plan d\'Action', desc: 'Ton stack IA personnalisé selon ton métier. Certification. Bonus secrets débloqués.', access: '🏆 Certification offerte', badge: '' },
    ],
  },
];

const faqs = [
  { q: "J'ai 40 ou 50 ans. Est-ce que ce challenge est fait pour moi ?", a: "Oui — et tu es exactement la personne pour qui ce challenge est conçu. 15 minutes par jour, un outil à la fois, aucun prérequis technique. L'âge n'est pas un frein. Le manque d'un guide clair l'est — et c'est exactement ce problème que ce challenge résout." },
  { q: "Est-ce que je dois payer des abonnements aux outils en plus ?", a: "Non. Pour chaque outil, je te montre comment accéder à sa version gratuite ou son essai. VEO 3 est accessible via Gemini avec un essai d'un mois gratuit. Sora 2 est accessible via Higgsfield. CapCut et Google AI Studio sont 100% gratuits. Tu peux suivre tout le challenge sans dépenser un centime supplémentaire." },
  { q: "15 minutes par jour, c'est vraiment possible ?", a: "Chaque leçon est conçue pour être terminée en 15 à 20 minutes exactement. Pas de vidéo de 2 heures. Pas de rembourrage. Tu regardes, tu pratiques immédiatement sur l'outil, tu passes au suivant. Le jour où tu n'as pas le temps, tu reprends le lendemain — l'accès est permanent." },
  { q: "Quels moyens de paiement acceptes-tu ?", a: "Orange Money, MTN MoMo, Wave, carte bancaire (Visa/Mastercard) et PayPal. L'accès est immédiat après paiement. Si tu veux payer en plusieurs fois, contacte-moi directement sur WhatsApp — on trouve une solution." },
  { q: "Que sont les 2 bonus secrets exactement ?", a: "Je ne les révèle pas avant la fin — c'est voulu, et c'est l'une des raisons pour lesquelles les apprenants terminent le challenge. Ces 2 outils te donnent accès à des IA premium normalement payantes à 80–200$/mois, gratuitement." },
  { q: "La formation sera-t-elle mise à jour si les outils changent ?", a: "Oui. Les mises à jour sont trimestrielles. L'IA évolue vite — cette formation aussi. Tu ne paies pas pour du contenu obsolète en 6 mois." },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function ChallengePage() {
  const [openWeek, setOpenWeek] = useState<string | null>('fondations');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEOHead
        title="Challenge 30 Jours IA — Maîtrise 28 Outils en 15 min/jour | Oumarou Sanda"
        description="Passe du niveau zéro aux 28 outils IA que les pros utilisent vraiment en 2026. VEO 3, Sora 2, Nano Banana, Antigravity. 15 min/jour. 30 jours. 9 900 FCFA."
        canonical="/challenge-30-jours"
        schema={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "Challenge 30 Jours IA",
          "description": "Maîtrise 28 outils IA en 15 minutes par jour pendant 30 jours.",
          "provider": { "@type": "Person", "name": "Oumarou Sanda", "url": "https://oumarousanda.com" },
          "inLanguage": "fr",
          "offers": { "@type": "Offer", "price": "9900", "priceCurrency": "XAF" },
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050505] pt-28 sm:pt-32">
        {/* Animated background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gold/10 via-[#050505] to-[#050505]" />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-20 w-[700px] h-[700px] bg-gold rounded-full blur-[160px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-blue rounded-full blur-[140px] pointer-events-none"
        />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-24 z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — copy */}
            <div className="text-center lg:text-left">
              {/* Badge */}
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
                Challenge 30 Jours · Ouverture Officielle
              </motion.div>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="font-heading font-black text-white leading-[1.08] tracking-tight mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                Tu es coincé au niveau zéro en IA ?<br />
                <span className="text-gold whitespace-nowrap">C'est l'heure de changer ça</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22 }}
                className="text-white/70 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-5 leading-relaxed"
              >
                ChatGPT, c'est le niveau débutant. Ce challenge te fait passer aux{' '}
                <strong className="text-white">28 outils que les meilleurs utilisent vraiment en 2026</strong>{' '}
                — 15 minutes par jour, pendant 30 jours.
              </motion.p>

              {/* Social proof inline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-white/40 text-[12px] mb-10"
              >
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-gold" />100K+ abonnés</span>
                <span className="text-white/15">·</span>
                <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-gold" />500+ apprenants</span>
                <span className="text-white/15">·</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gold" />6 ans d'expertise</span>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              >
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: '0 20px 60px rgba(212,175,55,0.6)' }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-xl overflow-hidden"
                >
                  <Link
                    to={QUIZ_URL}
                    className="group relative px-8 py-4 bg-gold text-[#050505] font-heading font-black text-[15px] rounded-xl shadow-[0_10px_40px_rgba(212,175,55,0.4)] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
                  >
                    <Rocket className="w-5 h-5" />
                    Je passe au niveau suivant
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] bg-[position:200%_0] group-hover:animate-shimmer" />
                  </Link>
                </motion.div>
                <a
                  href="#programme"
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white font-heading font-semibold text-[14px] rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Voir le programme <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>

              {/* Trust */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-white/30 text-[11px]"
              >
                <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Paiement sécurisé</span>
                <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Accès immédiat</span>
                <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3" /> Garantie 30j</span>
                <span>📱 Orange Money · MTN MoMo · Wave</span>
              </motion.div>
            </div>

            {/* Right — image flottante */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:flex justify-center"
            >
              {/* Glow derrière la photo */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent blur-[60px] pointer-events-none" />

              {/* Floating card — tools */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute -bottom-4 -right-4 z-20 bg-[#0f0f0f] border border-white/10 rounded-2xl px-5 py-3 shadow-xl"
              >
                <p className="text-white/50 text-[10px] mb-1">Ce challenge couvre</p>
                <p className="text-white font-heading font-bold text-[15px]">28 outils IA</p>
                <div className="flex gap-1 mt-1.5">
                  {['🤖', '🎬', '🖼️', '🎵', '⚡'].map((e, i) => (
                    <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 + i * 0.1 }} className="text-[14px]">{e}</motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Photo principale */}
              <div className="relative w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 rounded-3xl pointer-events-none" />
                <img
                  src="/Oumarou Sanda 1.webp"
                  alt="Oumarou Sanda — Expert IA"
                  width={400}
                  height={520}
                  className="w-full h-auto rounded-3xl object-cover shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/5"
                />
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20"
        >
          <span className="text-[10px] font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ── LES 3 NIVEAUX ─────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 bg-[#070707] overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-6 z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="text-center mb-14">
            <h2 className="font-heading font-black text-white leading-tight tracking-tight mb-4" style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.9rem)' }}>
              L'IA a <span className="text-gold">3 niveaux.</span><br />
              La plupart restent bloqués au premier.
            </h2>
            <p className="text-white/50 text-[15px] max-w-xl mx-auto">Voici exactement où tu en es — et où ce challenge t'emmène en 30 jours.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="grid md:grid-cols-3 gap-5">
            {[
              { num: '01', title: 'Les LLMs', tools: 'ChatGPT · Claude · Gemini · Grok', desc: 'Tu poses des questions, tu obtiens des réponses. C\'est du traitement de texte intelligent — puissant, mais c\'est le début. 90% des gens s\'arrêtent ici.', label: '← Où tu es aujourd\'hui', labelColor: 'text-white/40', border: 'border-white/10', grad: 'from-white/4 to-transparent', active: false },
              { num: '02', title: 'Les Outils Spécialisés', tools: 'VEO 3 · Sora 2 · Nano Banana · ElevenLabs · N8N', desc: 'Des outils qui créent des vidéos, des images 4K, des musiques, des automatisations. C\'est ici que l\'IA génère de la vraie valeur — et de l\'argent.', label: '← Ce challenge t\'y emmène', labelColor: 'text-gold font-semibold', border: 'border-gold/30', grad: 'from-gold/8 to-transparent', active: true },
              { num: '03', title: 'Les Agents IA', tools: 'Antigravity · Cursor · Claude Code · Windsurf', desc: 'Des systèmes qui perçoivent, décident et agissent seuls. Ils livrent des applications entières pendant que tu dors. Le futur est déjà là.', label: '← Introduit au Jour 27', labelColor: 'text-violet-400 font-semibold', border: 'border-violet/30', grad: 'from-violet/5 to-transparent', active: false },
            ].map((level) => (
              <motion.div key={level.num} variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative rounded-2xl p-6 border bg-gradient-to-b ${level.grad} ${level.border} ${level.active ? 'shadow-[0_0_40px_rgba(212,175,55,0.14)]' : ''}`}
              >
                {level.active && (
                  <motion.div
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-[#050505] text-[10px] font-black tracking-widest uppercase rounded-full whitespace-nowrap"
                  >
                    ⚡ Ton objectif
                  </motion.div>
                )}
                <div className={`text-[44px] font-heading font-black mb-3 ${level.active ? 'text-gold' : 'text-white/8'}`}>{level.num}</div>
                <h3 className="font-heading font-bold text-white text-[17px] mb-1 tracking-tight">{level.title}</h3>
                <p className="text-white/25 text-[11px] mb-3 font-mono">{level.tools}</p>
                <p className="text-white/60 text-[13px] leading-relaxed mb-5">{level.desc}</p>
                <span className={`text-[12px] ${level.labelColor}`}>{level.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MIROIR ─────────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 bg-white border-b border-black/5">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="text-center mb-14">
            <h2 className="font-heading font-black text-[#050505] tracking-tight mb-3" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.6rem)' }}>
              Si tu te reconnais dans une de ces phrases…
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger} className="space-y-4">
            {[
              { cartoon: '😰', bg: 'bg-red-50',   border: 'border-red-100',   quote: '"Je suis au niveau zéro. Je ne sais même pas par où commencer."', resp: "Tu as l'impression que tout le monde avance sauf toi. Ce challenge commence exactement là où tu en es." },
              { cartoon: '🤔', bg: 'bg-blue-50',  border: 'border-blue-100',  quote: '"J\'utilise ChatGPT mais je sens que je n\'utilise que 10% de ce que l\'IA peut faire."', resp: "Tu as le bon feeling. ChatGPT, c'est juste la porte d'entrée. Ce challenge t'ouvre les 27 portes suivantes." },
              { cartoon: '👀', bg: 'bg-violet-50', border: 'border-violet-100', quote: '"Je vois des gens créer des vidéos, des images, des applications avec l\'IA. Moi je ne sais pas comment."', resp: "VEO 3, Nano Banana, Sora — ces noms te semblent lointains. Dans 30 jours, ce sera ton quotidien." },
              { cartoon: '🧓', bg: 'bg-amber-50',  border: 'border-amber-100',  quote: '"J\'ai 40, 50 ans. Est-ce que c\'est encore possible pour moi ?"', resp: "Oui. Ce challenge est fait pour toi. 15 minutes par jour, un outil à la fois. Aucun prérequis technique." },
              { cartoon: '💼', bg: 'bg-emerald-50', border: 'border-emerald-100', quote: '"Je veux utiliser l\'IA dans mon travail mais je ne sais pas quel outil choisir."', resp: "Comptable, fonctionnaire, commerçant, créateur — il y a un outil IA fait pour ton métier. Je te le montre." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                whileHover={{ x: 4, transition: { duration: 0.18 } }}
                className="rounded-2xl border border-black/5 bg-[#fafafa] p-5 flex gap-5 cursor-default"
              >
                {/* Cartoon avatar */}
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 220 }}
                  className={`w-14 h-14 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center shrink-0 text-3xl`}
                >
                  {item.cartoon}
                </motion.div>
                <div className="pt-1">
                  <p className="font-heading font-semibold text-[#0a0a0a] text-[14px] mb-1.5 leading-snug">{item.quote}</p>
                  <p className="text-[#525252] text-[13px] leading-relaxed">{item.resp}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── LA SOLUTION ────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 bg-[#fafafa] border-b border-black/5">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="text-center mb-14">
            <h2 className="font-heading font-black text-[#050505] tracking-tight mb-4" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.7rem)' }}>
              Un outil par jour. 15 minutes. 30 jours.<br />
              <span className="text-gold">Un niveau au-dessus.</span>
            </h2>
            <p className="text-[#525252] text-[15px] max-w-2xl mx-auto leading-relaxed">
              J'ai construit ce challenge parce que des centaines de commentaires me disent tous la même chose :{' '}
              <strong className="text-[#0a0a0a]">vous savez que l'IA peut changer votre vie. Vous ne savez pas comment démarrer.</strong>
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Zap,           title: '28 outils 2026',             desc: 'VEO 3, Sora 2, Nano Banana Pro, Kling 3.0, Flux Kontext, Antigravity, N8N.' },
              { icon: Clock,         title: '15 min/jour — vraiment',      desc: 'Chaque leçon est conçue pour être terminée en un quart d\'heure. Pas de rembourrage.' },
              { icon: Target,        title: 'Exemples africains concrets', desc: 'Des cas d\'usage camerounais, sénégalais, ivoiriens, congolais — pas des copies US.' },
              { icon: CheckCircle2,  title: 'Accès gratuit à chaque outil',desc: 'Je te montre comment accéder à chaque outil sans payer d\'abonnements supplémentaires.' },
              { icon: BookOpen,      title: 'Applicable à ton métier',     desc: 'Comptable, enseignant, créateur, commerçant — je te montre comment l\'IA s\'adapte.' },
              { icon: RefreshCw,     title: 'Mises à jour trimestrielles', desc: 'L\'IA évolue vite. Cette formation aussi. Tu ne paies pas pour du contenu obsolète.' },
            ].map((feat, i) => (
              <motion.div key={feat.title} variants={fadeUp}
                whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(0,0,0,0.08)', transition: { duration: 0.2 } }}
                className="flex gap-4 p-5 bg-white rounded-2xl border border-black/5 shadow-sm cursor-default"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05, type: 'spring', stiffness: 200 }}
                  className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0"
                >
                  <feat.icon className="w-5 h-5 text-gold" />
                </motion.div>
                <div>
                  <h3 className="font-heading font-bold text-[#0a0a0a] text-[14px] mb-1 tracking-tight">✅ {feat.title}</h3>
                  <p className="text-[#525252] text-[13px] leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── POURQUOI CE CHALLENGE ──────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 bg-[#050505] overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/6 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 z-10">

          {/* Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-14">
            <p className="text-gold text-[11px] font-bold tracking-widest uppercase mb-3">Ce qui nous rend différents</p>
            <h2 className="font-heading font-black text-white tracking-tight mb-4" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.7rem)' }}>
              Pourquoi 500+ apprenants ont choisi<br />
              <span className="text-gold">ce challenge plutôt qu'un autre</span>
            </h2>
            <p className="text-white/50 text-[15px] max-w-2xl leading-relaxed">
              Des centaines d'entrepreneurs et créateurs africains apprennent l'IA avec Oumarou Sanda.
              Voici ce qui rend cette expérience réellement différente.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">

            {/* Left — 4 feature cards */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger} className="space-y-4">
              {[
                {
                  icon: '⚡',
                  title: 'Micro-learning — vraiment',
                  desc: '15 minutes par jour, un outil, une pratique immédiate. Adapté à tout âge, tout niveau, toute activité. Pas de vidéo de 2h, pas de théorie sans pratique.',
                },
                {
                  icon: '📦',
                  title: 'Multiformat pour apprendre à ta façon',
                  desc: 'Vidéo leçon + PDF récap téléchargeable + 50 prompts prêts à l\'emploi par métier. Tu regardes, tu appliques, tu gardes une trace.',
                },
                {
                  icon: '📱',
                  title: 'Accessible depuis n\'importe où',
                  desc: 'Depuis ton téléphone, ta tablette ou ton PC. Au bureau, dans le taxi, le soir avant de dormir. L\'accès est immédiat et permanent.',
                },
                {
                  icon: '🎯',
                  title: 'Applicable dès le premier jour',
                  desc: 'Chaque outil appris le Jour N est utilisé le Jour N. Des exemples africains concrets — pas des cas d\'usage américains qui ne te parlent pas.',
                },
              ].map((feat) => (
                <motion.div key={feat.title} variants={fadeUp}
                  className="flex gap-4 p-5 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/5 transition-colors cursor-default"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/15 flex items-center justify-center text-2xl shrink-0">
                    {feat.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-[14px] mb-1.5 tracking-tight">{feat.title}</h3>
                    <p className="text-white/50 text-[13px] leading-relaxed">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Right — mock phone/lesson card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="hidden lg:flex justify-center items-center"
            >
              <div className="relative w-72">
                {/* Phone frame */}
                <div className="rounded-[2.5rem] border-2 border-white/10 bg-[#0c0c0c] shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden">
                  {/* Status bar */}
                  <div className="flex justify-between items-center px-6 pt-4 pb-2">
                    <span className="text-white/40 text-[10px]">9:41</span>
                    <div className="w-16 h-4 bg-black rounded-full" />
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, k) => <div key={k} className="w-1 h-1 rounded-full bg-white/30" />)}
                    </div>
                  </div>
                  {/* App content */}
                  <div className="px-4 pb-6 space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white/40 text-[10px] font-medium tracking-wider uppercase">Jour 15 sur 30</p>
                      <span className="px-2 py-0.5 bg-gold/20 text-gold text-[9px] font-bold rounded-full">50%</span>
                    </div>
                    {/* Progress */}
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-4">
                      <div className="h-full w-1/2 bg-gradient-to-r from-gold to-amber-400 rounded-full" />
                    </div>
                    {/* Lesson card */}
                    <div className="rounded-2xl bg-white/5 border border-gold/20 p-4">
                      <div className="w-full h-28 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-600/20 border border-rose-500/20 flex items-center justify-center mb-3">
                        <span className="text-4xl">🎬</span>
                      </div>
                      <p className="text-gold text-[9px] font-bold tracking-wider uppercase mb-1">Master 13 · Vidéo IA</p>
                      <p className="text-white font-heading font-bold text-[13px] mb-1">VEO 3.1 — Google DeepMind</p>
                      <p className="text-white/40 text-[10px]">Clips 60s ultra-réalistes · Audio natif</p>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex-1 h-1 bg-white/10 rounded-full">
                          <div className="h-full w-1/3 bg-gold rounded-full" />
                        </div>
                        <span className="text-white/30 text-[9px]">5:20 / 15:00</span>
                      </div>
                    </div>
                    {/* Next lessons */}
                    {[
                      { emoji: '🎭', title: 'Sora 2', day: 16 },
                      { emoji: '📹', title: 'Kling 3.0', day: 17 },
                    ].map((l) => (
                      <div key={l.day} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/3 border border-white/5">
                        <div className="w-7 h-7 rounded-lg bg-white/8 flex items-center justify-center text-sm shrink-0">{l.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white/60 text-[11px] font-medium truncate">{l.title}</p>
                          <p className="text-white/25 text-[9px]">Jour {l.day}</p>
                        </div>
                        <Lock className="w-3 h-3 text-white/20 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-5 -right-6 bg-[#0f0f0f] border border-gold/25 rounded-2xl px-4 py-2.5 shadow-xl"
                >
                  <p className="text-gold font-bold text-[12px]">✅ 15 min</p>
                  <p className="text-white/40 text-[10px]">par leçon</p>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-4 -left-6 bg-[#0f0f0f] border border-white/10 rounded-2xl px-4 py-2.5 shadow-xl"
                >
                  <p className="text-white font-bold text-[12px]">28 outils</p>
                  <p className="text-white/40 text-[10px]">inclus</p>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── PROGRAMME ──────────────────────────────────────────────────────── */}
      <section id="programme" className="relative py-20 sm:py-28 bg-white border-b border-black/5 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-12">
            <h2 className="font-heading font-black text-[#050505] tracking-tight mb-2" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.7rem)' }}>
              30 jours. <span className="text-gold">Un outil par jour.</span>
            </h2>
            <p className="text-[#a3a3a3] text-[13px]">28 outils · 30 leçons micro-format · 15 min/jour</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-3">
            {programme.map((week) => (
              <motion.div key={week.id} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUp}
                className="border border-black/5 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenWeek(openWeek === week.id ? null : week.id)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 bg-[#fafafa] hover:bg-white transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${week.color} flex items-center justify-center text-[20px] shrink-0`}>
                      {week.emoji}
                    </div>
                    <div>
                      <p className="font-heading font-bold text-[#0a0a0a] text-[14px] tracking-tight">{week.title}</p>
                      <p className="text-[#a3a3a3] text-[11px]">{week.days} · {week.lessons.length} leçons</p>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: openWeek === week.id ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="w-4 h-4 text-[#a3a3a3] shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openWeek === week.id && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid sm:grid-cols-2">
                      {week.lessons.map((lesson, li) => (
                        <motion.div
                          key={lesson.day}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: li * 0.04 }}
                          className="px-5 py-3.5 bg-white flex gap-4 items-start border-t border-black/5"
                        >
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${week.color} flex items-center justify-center text-white font-heading font-bold text-[11px] shrink-0 mt-0.5`}>
                            {String(lesson.day).padStart(2, '0')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 flex-wrap">
                              <span className="font-heading font-semibold text-[#0a0a0a] text-[13px] tracking-tight">{lesson.title}</span>
                              {lesson.badge && (
                                <span className="px-2 py-0.5 bg-gold/10 text-gold text-[9px] font-bold rounded-full shrink-0">{lesson.badge}</span>
                              )}
                            </div>
                            <p className="text-[#525252] text-[12px] leading-relaxed mt-0.5">{lesson.desc}</p>
                            <span className="text-emerald-600 text-[11px] font-medium mt-1 inline-block">{lesson.access}</span>
                          </div>
                        </motion.div>
                      ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BONUS ──────────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 bg-[#050505] overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gold/6 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-5 sm:px-6 z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="text-center mb-14">
            <h2 className="font-heading font-black text-white tracking-tight mb-3" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.7rem)' }}>
              Les bonus qui <span className="text-gold">changent tout.</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="grid sm:grid-cols-2 gap-5 mb-8">
            {[
              { title: 'Bonus Secret 01', desc: 'Une plateforme qui donne accès à 800+ modèles IA premium — OpenAI, Google, Anthropic — sans payer plusieurs abonnements. Ce que tu paierais normalement 80 à 200$/mois.', value: 'Valeur : jusqu\'à 200$/mois → gratuit' },
              { title: 'Bonus Secret 02', desc: 'Une plateforme pour tester et comparer tous les grands modèles IA en duel anonyme. Tu découvres exactement quel outil utiliser pour chaque tâche — sans compte ni abonnement.', value: 'Valeur : inestimable pour ta stratégie IA' },
            ].map((b, i) => (
              <motion.div key={b.title} variants={fadeUp}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="rounded-2xl border border-gold/20 bg-gold/5 p-6 relative overflow-hidden cursor-default"
              >
                <motion.div
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 2 }}
                  className="absolute top-4 right-4"
                >
                  <Lock className="w-5 h-5 text-gold/30" />
                </motion.div>
                <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center mb-4">
                  <Gift className="w-5 h-5 text-gold" />
                </div>
                <p className="text-gold text-[10px] font-bold tracking-widest uppercase mb-2">🔒 Débloqué au Jour 30</p>
                <h3 className="font-heading font-bold text-white text-[15px] mb-2 tracking-tight">{b.title}</h3>
                <p className="text-white/60 text-[13px] leading-relaxed mb-4">{b.desc}</p>
                <span className="text-gold text-[12px] font-semibold">{b.value}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: BookOpen,      title: '50 Prompts prêts à l\'emploi', desc: 'Organisés par métier (RH, marketing, enseignant, commerçant...)' },
              { icon: MessageCircle, title: 'Communauté WhatsApp',           desc: 'Support entre pairs + Q&A mensuel en live avec Oumarou' },
              { icon: Award,         title: 'Certificat de complétion',      desc: 'Badge numérique vérifiable pour LinkedIn' },
              { icon: RefreshCw,     title: 'Mises à jour 1 an',            desc: 'La formation évolue avec les outils IA' },
            ].map((b) => (
              <motion.div key={b.title} variants={fadeUp}
                className="flex gap-4 p-4 rounded-xl border border-white/8 bg-white/3"
              >
                <div className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
                  <b.icon className="w-4 h-4 text-white/60" />
                </div>
                <div>
                  <span className="font-heading font-semibold text-white text-[13px] block mb-0.5">{b.title}</span>
                  <p className="text-white/40 text-[12px]">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FORMATEUR ──────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 bg-[#fafafa] border-b border-black/5 overflow-hidden">
        {/* Decorative background photo blurred */}
        <div className="absolute inset-0 opacity-3 pointer-events-none overflow-hidden">
          <img src="/Oumarou Sanda homepage about section.webp" alt="" aria-hidden className="w-full h-full object-cover blur-[80px] scale-110 opacity-20" />
        </div>
        <div className="relative max-w-5xl mx-auto px-5 sm:px-6 z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="flex flex-col lg:flex-row gap-12 items-center"
          >
            {/* Photo */}
            <motion.div variants={fadeIn} className="shrink-0 relative">
              <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent blur-[40px] pointer-events-none" />
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative w-52 sm:w-64 rounded-3xl overflow-hidden border-2 border-gold/20 shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
              >
                <img
                  src="/Oumarou Sanda Homepage hero .webp"
                  alt="Oumarou Sanda"
                  width={256}
                  height={320}
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </motion.div>
              {/* Badge flottant */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -right-4 bg-white border border-black/5 shadow-xl rounded-xl px-4 py-2"
              >
                <p className="text-[#0a0a0a] font-heading font-black text-[13px]">100K+</p>
                <p className="text-[#a3a3a3] text-[10px]">abonnés</p>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div variants={fadeUp} className="text-center lg:text-left flex-1">
              <p className="text-gold text-[11px] font-bold tracking-widest uppercase mb-2">Ton formateur</p>
              <h2 className="font-heading font-black text-[#050505] tracking-tight mb-2" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                Oumarou Sanda
              </h2>
              <p className="text-[#a3a3a3] text-[13px] mb-6">Expert IA · Fondateur Wendooka & Sanda Vibe Code · Correspondant Vision 4</p>
              <p className="text-[#525252] text-[15px] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                Ancien journaliste reconverti en expert IA, je vulgarise les technologies d'intelligence artificielle pour les entrepreneurs et créateurs africains francophones depuis 2020. J'ai fondé <strong className="text-[#0a0a0a]">Wendooka</strong> et <strong className="text-[#0a0a0a]">Sanda Vibe Code</strong>. Mes formations précédentes — <em>Protocole Vidéo IA</em> et <em>Le Cerveau Augmenté</em> — ont transformé des centaines d'apprenants.
              </p>

              {/* Stats animées */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={staggerFast}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {[
                  { val: 100, suffix: 'K+', lbl: 'abonnés' },
                  { val: 500, suffix: '+',  lbl: 'apprenants formés' },
                  { val: 6,   suffix: ' ans', lbl: 'expertise IA' },
                  { val: 28,  suffix: '',  lbl: 'outils enseignés' },
                ].map(({ val, suffix, lbl }) => (
                  <motion.div key={lbl} variants={fadeUp}
                    className="bg-white border border-black/5 rounded-xl px-4 py-3 text-center shadow-sm"
                  >
                    <p className="font-heading font-black text-[#0a0a0a] text-[22px] tracking-tight">
                      <Counter target={val} suffix={suffix} />
                    </p>
                    <p className="text-[#a3a3a3] text-[11px] mt-0.5">{lbl}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 bg-white border-b border-black/5">
        <div className="max-w-4xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-heading font-black text-[#050505] tracking-tight" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)' }}>
              Ce qu'ils disent <span className="text-gold">après le challenge</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger} className="grid sm:grid-cols-3 gap-5">
            {[
              { name: 'Aboubakar K.', role: 'Freelance vidéo · Yaoundé', avatar: 'AK', img: '/Oumarou Sanda 8.webp', text: '"Je disais que j\'étais au niveau zéro. Au Jour 20, j\'ai créé une vidéo publicitaire avec VEO 3 pour un client. Il m\'a payé 150 000 FCFA."', highlight: '150 000 FCFA au Jour 20' },
              { name: 'Marcel B.', role: 'Cadre administratif · Douala', avatar: 'MB', img: '/Oumarou Sanda 9 .webp', text: '"J\'avais 50 ans et je pensais que c\'était trop tard pour moi. Au Jour 30 j\'ai mon propre stack IA qui m\'aide dans mon travail quotidien."', highlight: 'Stack IA personnel au Jour 30' },
              { name: 'Fatou D.', role: 'Créatrice de contenu · Dakar', avatar: 'FD', img: '/Oumarou Sanda 10 .webp', text: '"Le Bonus secret du Jour 30 vaut à lui seul 10 fois le prix. J\'utilise maintenant des outils à 200$/mois gratuitement."', highlight: 'Outils 200$/mois → gratuit' },
            ].map((t) => (
              <motion.div key={t.name} variants={fadeUp}
                whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.1)', transition: { duration: 0.25 } }}
                className="bg-white border border-black/5 shadow-sm rounded-2xl p-6 flex flex-col cursor-default"
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <motion.div key={j} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + j * 0.06 }}>
                      <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-[#525252] text-[13px] leading-relaxed flex-1 mb-5">{t.text}</p>
                <div className="pt-4 border-t border-black/5">
                  <div className="px-3 py-1.5 bg-gold/8 rounded-lg mb-4">
                    <p className="text-gold text-[11px] font-semibold">✓ {t.highlight}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gold/20 bg-gradient-to-br from-gold/10 to-gold/5 shrink-0">
                      <span className="w-full h-full flex items-center justify-center text-[#0a0a0a] text-[11px] font-bold">{t.avatar}</span>
                    </div>
                    <div>
                      <p className="text-[#0a0a0a] text-[13px] font-semibold">{t.name}</p>
                      <p className="text-[#a3a3a3] text-[11px]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRICING UNIQUE ─────────────────────────────────────────────────── */}
      <section id="tarifs" className="relative py-20 sm:py-28 bg-[#050505] overflow-hidden border-t border-white/5 scroll-mt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/6 via-transparent to-transparent pointer-events-none" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.07, 0.03] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold rounded-full blur-[150px] pointer-events-none"
        />

        <div className="relative max-w-xl mx-auto px-5 sm:px-6 z-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-12">
            <h2 className="font-heading font-black text-white tracking-tight mb-3" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.7rem)' }}>
              Investis en toi.<br /><span className="text-gold">Commence aujourd'hui.</span>
            </h2>
            <p className="text-white/40 text-[14px]">Réponds à 5 questions rapides — je construis ton plan personnalisé.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
            className="relative rounded-3xl border border-gold/35 bg-gradient-to-b from-gold/8 via-white/3 to-transparent p-8 sm:p-10 shadow-[0_0_80px_rgba(212,175,55,0.18)]"
          >
            {/* Emoji illustration */}
            <div className="flex justify-center gap-3 text-4xl mb-6">
              {['🤖','🎬','🖼️','⚡','🚀'].map((e, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0, y: 10 }}
                  whileInView={{ scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07, type: 'spring', stiffness: 200 }}
                >
                  {e}
                </motion.span>
              ))}
            </div>

            <p className="text-white/70 text-[15px] leading-relaxed mb-8 max-w-sm mx-auto">
              Avant de te montrer ton tarif, dis-moi qui tu es. 5 questions, 2 minutes —
              je personnalise ton parcours selon <span className="text-white font-semibold">ton profil et tes objectifs.</span>
            </p>

            {/* Micro features */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { icon: '⏱️', text: '2 min' },
                { icon: '🎯', text: 'Résultat personnalisé' },
                { icon: '💳', text: 'Tarif révélé à la fin' },
              ].map((f) => (
                <span key={f.text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/6 border border-white/10 text-white/50 text-[12px]">
                  {f.icon} {f.text}
                </span>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: '0 20px 60px rgba(212,175,55,0.55)' }}
              whileTap={{ scale: 0.97 }}
              className="rounded-2xl overflow-hidden"
            >
              <Link
                to={QUIZ_URL}
                className="group relative w-full py-5 rounded-2xl bg-gold text-[#050505] font-heading font-black text-[16px] shadow-[0_10px_40px_rgba(212,175,55,0.4)] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
              >
                <Rocket className="w-5 h-5" />
                Découvrir mon profil IA
                <ArrowRight className="w-5 h-5" />
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] bg-[position:200%_0] group-hover:animate-shimmer" />
              </Link>
            </motion.div>

            <p className="text-white/25 text-[11px] mt-5">
              🔒 Satisfait ou remboursé 30 jours · Orange Money · MTN MoMo · Wave · Visa · PayPal
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── GARANTIE ───────────────────────────────────────────────────────── */}
      <section className="py-12 bg-emerald-950 border-y border-emerald-900">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}
          className="max-w-3xl mx-auto px-5 sm:px-6 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0"
          >
            <Shield className="w-8 h-8 text-emerald-400" />
          </motion.div>
          <div>
            <h3 className="font-heading font-black text-white text-[18px] tracking-tight mb-2">Garantie Satisfait ou Remboursé — 30 jours</h3>
            <p className="text-emerald-200/70 text-[13px] leading-relaxed">
              Tu as 30 jours pour tester le challenge. Si tu n'es pas satisfait pour quelque raison que ce soit, un email suffit et je te rembourse intégralement.{' '}
              <strong className="text-emerald-300">Zéro question. Zéro justification.</strong> Ton investissement est 100% protégé.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 bg-white border-b border-black/5">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-10">
            <h2 className="font-heading font-black text-[#050505] tracking-tight" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)' }}>
              Tu te poses des <span className="text-gold">questions ?</span>
            </h2>
          </motion.div>
          <div className="space-y-2">
            {faqs.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUp}
                className="bg-[#fafafa] border border-black/5 shadow-sm rounded-xl overflow-hidden"
              >
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white transition-colors gap-4"
                >
                  <span className="font-heading font-semibold text-[#0a0a0a] text-[14px] leading-snug">{item.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="w-4 h-4 text-[#a3a3a3] shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="ans"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-[#525252] text-[13px] leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ──────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/8 via-[#050505] to-[#050505] pointer-events-none" />
        {/* Particules flottantes */}
        {[...Array(6)].map((_, i) => (
          <motion.div key={i}
            animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0], x: [0, (i % 2 === 0 ? 10 : -10), 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
            className="absolute w-1 h-1 rounded-full bg-gold pointer-events-none"
            style={{ left: `${15 + i * 15}%`, top: `${40 + (i % 3) * 15}%` }}
          />
        ))}

        <div className="relative max-w-5xl mx-auto px-5 sm:px-6 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ── Colonne gauche : texte ── */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>

              {/* Photo formateur */}
              <div className="flex items-center gap-4 mb-8">
                <div className="relative shrink-0">
                  <img
                    src="/Oumarou Sanda 2.webp"
                    alt="Oumarou Sanda"
                    width={56}
                    height={56}
                    loading="lazy"
                    className="w-14 h-14 rounded-full object-cover border-2 border-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-gold/20 pointer-events-none"
                  />
                </div>
                <div>
                  <p className="text-white font-heading font-semibold text-[14px]">Oumarou Sanda</p>
                  <p className="text-white/40 text-[12px]">Expert IA · Formateur depuis 2019</p>
                </div>
              </div>

              <h2 className="font-heading font-black text-white leading-tight tracking-tight mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                <span className="whitespace-nowrap">Dans 30 jours,</span><br />
                <span className="whitespace-nowrap">tu seras au <span className="text-gold">niveau 2.</span></span>
              </h2>
              <p className="text-white/60 text-[15px] mb-10 leading-relaxed">
                Des centaines d'apprenants africains ont déjà fait ce saut.<br />Rejoins-les aujourd'hui.
              </p>

              <motion.div
                whileHover={{ scale: 1.04, boxShadow: '0 24px 70px rgba(212,175,55,0.65)' }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex rounded-2xl overflow-hidden"
              >
                <Link
                  to={QUIZ_URL}
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-gold text-[#050505] font-heading font-black text-[17px] rounded-2xl shadow-[0_12px_50px_rgba(212,175,55,0.45)] transition-all duration-300 overflow-hidden relative"
                >
                  <Rocket className="w-5 h-5" />
                  Je passe au niveau suivant
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.25)_50%,transparent_75%)] bg-[length:250%_250%] bg-[position:200%_0] group-hover:animate-shimmer" />
                </Link>
              </motion.div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/25 text-[11px] mt-6">
                <span className="flex items-center gap-1.5"><Shield className="w-3 h-3" /> Sécurisé</span>
                <span>Orange Money · MTN MoMo · Wave · Visa · Mastercard · PayPal</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" /> Garantie 30j</span>
              </div>
            </motion.div>

            {/* ── Colonne droite : illustration muscles ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex justify-center items-center"
            >
              <div className="relative">
                {/* Halo gold derrière */}
                <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent blur-[60px] pointer-events-none" />

                {/* Photo */}
                <div className="relative w-[390px] xl:w-[432px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent z-10 pointer-events-none rounded-3xl" />
                  <img
                    src="/Oumarou Sanda 2.webp"
                    alt="Oumarou Sanda — Challenge 30 Jours IA"
                    width={320}
                    height={420}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Badges flottants */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-5 -right-6 bg-[#0f0f0f] border border-gold/25 rounded-2xl px-3 py-2 shadow-xl z-20"
                >
                  <p className="text-gold font-bold text-[13px]">🚀 Jour 30</p>
                  <p className="text-white/40 text-[10px]">Objectif atteint</p>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                  className="absolute -bottom-4 -left-6 bg-[#0f0f0f] border border-emerald-500/25 rounded-2xl px-3 py-2 shadow-xl z-20"
                >
                  <p className="text-emerald-400 font-bold text-[13px]">⭐ Certifié</p>
                  <p className="text-white/40 text-[10px]">LinkedIn ready</p>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </>
  );
}
