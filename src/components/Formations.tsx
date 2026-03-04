import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Video, Brain, Building2, Star, Users, Clock, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

const formations = [
  {
    id: 'protocole-video-ia',
    name: 'Protocole Vidéo IA',
    tagline: 'Créez des vidéos publicitaires & cinématographiques avec l\'IA',
    description: 'La formation complète pour maîtriser la création de vidéos professionnelles avec l\'intelligence artificielle. De l\'idéation au rendu final.',
    icon: Video,
    gradient: 'from-accent-red to-orange-500',
    borderColor: 'border-accent-red/20',
    price: '149 000 FCFA',
    priceOld: '250 000 FCFA',
    duration: '12h de contenu',
    students: '2 000+',
    rating: '4.9',
    features: [
      'Génération de scripts IA optimisés',
      'Création de visuels cinématographiques',
      'Montage et post-production IA',
      'Templates et prompts exclusifs',
      'Communauté privée VIP',
      'Mises à jour à vie',
    ],
    badge: 'BEST-SELLER',
    badgeColor: 'bg-accent-red',
    link: 'https://academy.oumarousanda.com/veo3'
  },
  {
    id: 'cerveau-augmente',
    name: 'Le Cerveau Augmenté',
    tagline: 'Système d\'IA personnel pour la productivité et le business',
    description: 'Construisez votre propre système d\'intelligence artificielle pour automatiser vos tâches, booster votre productivité et accélérer votre business.',
    icon: Brain,
    gradient: 'from-accent-blue to-purple-500',
    borderColor: 'border-accent-blue/20',
    price: '99 000 FCFA',
    priceOld: '180 000 FCFA',
    duration: '8h de contenu',
    students: '1 500+',
    rating: '4.8',
    features: [
      'Configuration de votre IA personnelle',
      'Automatisation des tâches répétitives',
      'Systèmes de prise de décision IA',
      'Intégration avec vos outils existants',
      'Templates d\'automatisation',
      'Support et coaching',
    ],
    badge: 'POPULAIRE',
    badgeColor: 'bg-accent-blue',
    link: 'https://academy.oumarousanda.com/cerveau-augmente'
  },
  {
    id: 'offshore-empire',
    name: 'Offshore Empire',
    tagline: 'Structuration de sociétés offshore légales',
    description: 'Guide complet pour structurer juridiquement votre activité en ligne avec des entités offshore. Optimisation fiscale légale et protection d\'actifs.',
    icon: Building2,
    gradient: 'from-accent-gold to-yellow-500',
    borderColor: 'border-accent-gold/20',
    price: '199 000 FCFA',
    priceOld: '350 000 FCFA',
    duration: '10h de contenu',
    students: '800+',
    rating: '4.9',
    features: [
      'Juridictions optimales décryptées',
      'Processus de création step-by-step',
      'Ouverture de comptes bancaires',
      'Stratégies fiscales légales',
      'Templates juridiques inclus',
      'Accompagnement personnalisé',
    ],
    badge: 'PREMIUM',
    badgeColor: 'bg-accent-gold',
    link: 'https://academy.oumarousanda.com/offshore-empire'
  },
];

const testimonials = [
  {
    name: 'Abdoulaye K.',
    role: 'Entrepreneur, Sénégal',
    text: 'Grâce à Protocole Vidéo IA, j\'ai lancé mon agence de création vidéo. En 3 mois, j\'ai déjà 15 clients réguliers.',
    avatar: 'AK',
  },
  {
    name: 'Marie-Claire D.',
    role: 'Créatrice de contenus, Côte d\'Ivoire',
    text: 'Le Cerveau Augmenté a transformé ma productivité. Je gère maintenant 3 chaînes YouTube grâce à l\'automatisation IA.',
    avatar: 'MD',
  },
  {
    name: 'Ibrahim M.',
    role: 'Consultant, Cameroun',
    text: 'Oumarou est un vrai visionnaire. Ses formations sont concrètes et les résultats sont immédiats.',
    avatar: 'IM',
  },
];

export function Formations() {
  const { ref, isInView } = useInView();

  return (
    <section id="formations" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-charcoal to-navy-900" />
      <div className="absolute inset-0 bg-radial-gradient" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-accent-red/20 text-accent-red text-sm font-medium mb-4">
            <Sparkles className="w-3 h-3" />
            Formations Premium
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Maîtrisez l'IA, <span className="gradient-text-red">dominez votre marché</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Des formations pratiques, axées résultats, conçues pour les entrepreneurs africains
            qui veulent passer au niveau supérieur.
          </p>
        </motion.div>

        {/* Formation cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {formations.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className={`glass-card rounded-3xl overflow-hidden border ${f.borderColor} hover:border-white/15 transition-all duration-500 group relative flex flex-col`}
            >
              {/* Badge */}
              <div className={`absolute top-4 right-4 ${f.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full z-10`}>
                {f.badge}
              </div>

              {/* Header */}
              <div className={`p-6 sm:p-8 pb-0`}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-1">{f.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{f.tagline}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>

              {/* Stats */}
              <div className="px-6 sm:px-8 py-4 flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-accent-gold fill-accent-gold" />
                  <span className="text-white font-medium">{f.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{f.students} étudiants</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{f.duration}</span>
                </div>
              </div>

              {/* Features */}
              <div className="px-6 sm:px-8 pb-4 flex-1">
                <div className="space-y-2">
                  {f.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      <span className="text-gray-400 text-sm">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="p-6 sm:p-8 pt-4 border-t border-white/5">
                <div className="flex items-end gap-3 mb-4">
                  <span className="font-heading font-bold text-2xl sm:text-3xl text-white">{f.price}</span>
                  <span className="text-gray-500 text-sm line-through mb-1">{f.priceOld}</span>
                </div>
                <a
                  href={f.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 rounded-xl bg-gradient-to-r ${f.gradient} text-white font-heading font-bold text-sm hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn`}
                >
                  Accéder à la formation
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white text-center mb-10">
            Ce que disent <span className="gradient-text">nos étudiants</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                className="glass-card rounded-2xl p-6 border border-white/5 hover:border-accent-gold/20 transition-all"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-accent-gold fill-accent-gold" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-gold/30 to-accent-blue/30 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
