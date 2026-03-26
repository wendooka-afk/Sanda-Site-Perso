import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── PAYMENT LINK (same as ChallengePage) ────────────────────────────────────
const LINK_CHECKOUT = '#'; // TODO: lien paiement 9 900 FCFA
// ─────────────────────────────────────────────────────────────────────────────

// ─── Quiz data ────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 'name',
    type: 'text' as const,
    question: 'Comment tu t\'appelles ?',
    placeholder: 'Ton prénom...',
  },
  {
    id: 'level',
    type: 'choice' as const,
    question: 'Où en es-tu avec l\'IA en ce moment ?',
    options: [
      { emoji: '😬', label: 'Complet débutant', sublabel: 'Je n\'ai jamais vraiment utilisé l\'IA' },
      { emoji: '🙂', label: 'J\'ai testé quelques outils', sublabel: 'ChatGPT, mais sans vraie méthode' },
      { emoji: '😎', label: 'Je me débrouille', sublabel: 'J\'utilise l\'IA régulièrement' },
      { emoji: '🚀', label: 'Je maîtrise bien', sublabel: 'Je cherche à aller plus loin' },
    ],
  },
  {
    id: 'goal',
    type: 'choice' as const,
    question: 'Quel est ton principal objectif ?',
    options: [
      { emoji: '💰', label: 'Générer des revenus', sublabel: 'Freelance, business, monétisation' },
      { emoji: '🎬', label: 'Créer du contenu', sublabel: 'Vidéos, images, textes IA' },
      { emoji: '⚡', label: 'Gagner du temps', sublabel: 'Automatiser mes tâches du quotidien' },
      { emoji: '📈', label: 'Progresser pro', sublabel: 'Être indispensable dans mon domaine' },
    ],
  },
  {
    id: 'blocker',
    type: 'choice' as const,
    question: 'Qu\'est-ce qui te bloque le plus ?',
    options: [
      { emoji: '🤯', label: 'Je ne sais pas par où commencer', sublabel: 'Trop d\'infos, zéro direction' },
      { emoji: '🌊', label: 'Trop d\'outils, je suis perdu', sublabel: 'VEO, Sora, Runway... c\'est le chaos' },
      { emoji: '⏰', label: 'Je manque de temps', sublabel: 'Ma vie est déjà bien chargée' },
      { emoji: '😨', label: 'Peur de ne pas comprendre', sublabel: 'Ce n\'est peut-être pas pour moi' },
    ],
  },
  {
    id: 'time',
    type: 'choice' as const,
    question: 'Combien de temps peux-tu consacrer par jour ?',
    options: [
      { emoji: '⚡', label: '10 minutes', sublabel: 'Vite fait mais régulier' },
      { emoji: '✅', label: '15 minutes', sublabel: 'Le format parfait pour ce challenge' },
      { emoji: '💪', label: '30 minutes', sublabel: 'Je veux avancer vite' },
      { emoji: '🔥', label: '1 heure et plus', sublabel: 'Je suis 100% motivé' },
    ],
  },
] as const;

type Answers = Record<string, string>;

// ─── Compute personalized result (always positive) ───────────────────────────
function computeResult(answers: Answers) {
  const level = answers['level'] ?? '';
  const goal = answers['goal'] ?? '';
  const blocker = answers['blocker'] ?? '';
  const name = answers['name'] ?? 'toi';

  // Niveau affiché
  const isAdvanced = level.includes('maîtrise') || level.includes('débrouille');
  const skillLabel = isAdvanced ? 'Intermédiaire' : 'Débutant';
  const skillPercent = isAdvanced ? 38 : 12; // barre toujours basse → signe de progression possible
  const potential = isAdvanced ? 94 : 91;

  // Objectif
  let goalContext = 'atteindre tes objectifs';
  if (goal.includes('revenus')) goalContext = 'générer tes premiers revenus avec l\'IA';
  else if (goal.includes('contenu')) goalContext = 'créer du contenu IA de qualité pro';
  else if (goal.includes('temps')) goalContext = 'automatiser tes tâches et reprendre du temps';
  else if (goal.includes('pro')) goalContext = 'devenir la référence IA dans ton domaine';

  // Message bloquant → rassurant
  let reassurance = 'Ce challenge est structuré pour toi : un outil par jour, 15 minutes, zéro prérequis.';
  if (blocker.includes('commencer')) reassurance = 'Bonne nouvelle : le Challenge 30 Jours commence exactement à zéro. Jour 1, outil 1, étape par étape.';
  else if (blocker.includes('outils')) reassurance = 'C\'est exactement pour ça que le challenge existe : une progression claire parmi les 28 meilleurs outils 2026.';
  else if (blocker.includes('temps')) reassurance = 'Le challenge est conçu pour 15 min/jour — pas besoin de te libérer des heures. Juste 15 minutes.';
  else if (blocker.includes('comprendre')) reassurance = 'Aucune notion technique requise. Si tu peux envoyer un WhatsApp, tu peux suivre ce challenge.';

  return { name, skillLabel, skillPercent, potential, goalContext, reassurance };
}

// ─── Variants ────────────────────────────────────────────────────────────────
const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.25 } },
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function QuizIAPage() {
  const [step, setStep] = useState(0); // 0..N-1 = questions, N = loading, N+1 = result
  const [answers, setAnswers] = useState<Answers>({});
  const [textInput, setTextInput] = useState('');
  const [loadingPct, setLoadingPct] = useState(0);

  const totalQuestions = QUESTIONS.length;
  const isLoading = step === totalQuestions;
  const isResult = step === totalQuestions + 1;
  const currentQuestion = !isLoading && !isResult ? QUESTIONS[step] : null;

  // Progress bar (only during questions)
  const progress = isResult ? 100 : Math.round(((step) / totalQuestions) * 100);

  // Loading animation
  useEffect(() => {
    if (!isLoading) return;
    setLoadingPct(0);
    const intervals = [
      setTimeout(() => setLoadingPct(23), 300),
      setTimeout(() => setLoadingPct(47), 800),
      setTimeout(() => setLoadingPct(71), 1400),
      setTimeout(() => setLoadingPct(89), 2000),
      setTimeout(() => setLoadingPct(100), 2600),
      setTimeout(() => setStep(totalQuestions + 1), 3000),
    ];
    return () => intervals.forEach(clearTimeout);
  }, [isLoading, totalQuestions]);

  function handleChoice(label: string) {
    const q = QUESTIONS[step];
    setAnswers(prev => ({ ...prev, [q.id]: label }));
    setStep(s => s + 1);
  }

  function handleTextNext() {
    const val = textInput.trim();
    if (!val) return;
    setAnswers(prev => ({ ...prev, ['name']: val }));
    setTextInput('');
    setStep(s => s + 1);
  }

  const result = isResult ? computeResult(answers) : null;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      {/* Progress bar */}
      {!isResult && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/10">
          <motion.div
            className="h-full bg-[#d4af37]"
            animate={{ width: `${isLoading ? loadingPct : progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}

      {/* Header minimal */}
      {!isResult && (
        <div className="pt-8 pb-4 flex justify-center">
          <span className="text-[#d4af37] font-bold text-lg tracking-tight">Challenge 30 Jours IA</span>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-8">
        <AnimatePresence mode="wait">

          {/* ── QUESTION ── */}
          {currentQuestion && (
            <motion.div
              key={`q-${step}`}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full max-w-md"
            >
              {/* Step counter */}
              <p className="text-white/40 text-sm text-center mb-3">
                Question {step + 1} sur {totalQuestions}
              </p>

              {/* Question text */}
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 leading-tight">
                {currentQuestion.question}
              </h2>

              {/* Text input */}
              {currentQuestion.type === 'text' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={textInput}
                    onChange={e => setTextInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleTextNext()}
                    placeholder={currentQuestion.placeholder}
                    autoFocus
                    className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-4 text-white text-lg placeholder-white/30 outline-none focus:border-[#d4af37]/60 transition-colors"
                  />
                  <button
                    onClick={handleTextNext}
                    disabled={!textInput.trim()}
                    className="w-full py-4 rounded-2xl bg-[#d4af37] text-[#050505] font-bold text-lg disabled:opacity-40 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2"
                  >
                    Continuer <ArrowRight size={20} />
                  </button>
                </div>
              )}

              {/* Choice options */}
              {currentQuestion.type === 'choice' && (
                <div className="space-y-3">
                  {currentQuestion.options.map((opt) => (
                    <motion.button
                      key={opt.label}
                      onClick={() => handleChoice(opt.label)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d4af37]/40 rounded-2xl px-5 py-4 text-left transition-all"
                    >
                      <span className="text-2xl flex-shrink-0">{opt.emoji}</span>
                      <div>
                        <div className="text-white font-semibold">{opt.label}</div>
                        <div className="text-white/50 text-sm">{opt.sublabel}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── LOADING ── */}
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-md text-center space-y-8"
            >
              {/* Circular progress */}
              <div className="relative w-28 h-28 mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                  <motion.circle
                    cx="50" cy="50" r="42" fill="none"
                    stroke="#d4af37" strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    strokeDashoffset={`${2 * Math.PI * 42 * (1 - loadingPct / 100)}`}
                    style={{ transition: 'stroke-dashoffset 0.4s ease' }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-[#d4af37]">
                  {loadingPct}%
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-2">Création de ton profil IA...</h2>
                <p className="text-white/50 text-sm">Analyse de tes réponses en cours</p>
              </div>

              {/* Social proof */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left">
                <p className="text-[#d4af37] font-bold text-lg mb-1">500+ apprenants</p>
                <p className="text-white/60 text-sm">ont déjà transformé leur rapport à l'IA en 30 jours</p>
              </div>
            </motion.div>
          )}

          {/* ── RESULT ── */}
          {isResult && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
              className="w-full max-w-md"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-[#d4af37]/15 border border-[#d4af37]/30 rounded-full px-4 py-1.5 text-[#d4af37] text-sm font-semibold mb-4">
                  Ton profil IA personnalisé
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {result.name}, tu es exactement<br />
                  <span className="text-[#d4af37]">au bon endroit.</span>
                </h1>
              </div>

              {/* Score cards */}
              <div className="space-y-3 mb-6">
                {/* Niveau actuel */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white/60 text-sm font-medium">Niveau actuel</span>
                    <span className="text-white font-bold">{result.skillLabel}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${result.skillPercent}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-white/30 mt-1">
                    <span>Débutant</span><span>Expert</span>
                  </div>
                </div>

                {/* Potentiel */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white/60 text-sm font-medium">Ton potentiel</span>
                    <motion.span
                      className="text-[#d4af37] font-bold text-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {result.potential}%
                    </motion.span>
                  </div>
                  <div className="flex items-start gap-3 bg-[#d4af37]/10 rounded-xl p-3">
                    <span className="text-lg">💡</span>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Tes réponses montrent un fort potentiel pour{' '}
                      <span className="text-white font-semibold">{result.goalContext}</span>.
                    </p>
                  </div>
                </div>

                {/* Blocage → solution */}
                <div className="bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#d4af37] flex-shrink-0 mt-0.5" />
                    <p className="text-white/80 text-sm leading-relaxed">{result.reassurance}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-4">
                <a
                  href={LINK_CHECKOUT}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#d4af37] text-[#050505] font-bold text-lg hover:bg-[#c9a227] transition-colors"
                >
                  Démarrer le Challenge — 9 900 FCFA <ArrowRight size={20} />
                </a>
                <Link
                  to="/challenge-30-jours"
                  className="w-full flex items-center justify-center py-3 rounded-2xl border border-white/15 text-white/60 text-sm hover:text-white hover:border-white/30 transition-colors"
                >
                  En savoir plus sur le challenge
                </Link>
              </div>

              {/* Guarantee */}
              <p className="text-center text-white/40 text-xs mt-5">
                🔒 Satisfait ou remboursé 7 jours — Accès immédiat après paiement
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
