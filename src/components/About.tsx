import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Mic, Laptop, Brain, Rocket, ChevronRight } from 'lucide-react';

const timeline = [
  {
    year: '2014-2018',
    title: 'Journaliste & Correspondant',
    description: 'Correspondant régional pour Vision 4 TV dans l\'Adamaoua. Formation en rigueur journalistique et communication.',
    icon: Mic,
    color: 'border-accent-blue',
    iconColor: 'text-accent-blue',
    bgColor: 'bg-accent-blue/10',
  },
  {
    year: '2019-2021',
    title: 'Transition Digitale',
    description: 'Plongée dans le marketing digital, le freelancing et la création de contenus. Naissance de la vision entrepreneuriale.',
    icon: Laptop,
    color: 'border-green-400',
    iconColor: 'text-green-400',
    bgColor: 'bg-green-400/10',
  },
  {
    year: '2022-2024',
    title: 'Expert IA & Fondateur',
    description: 'Création de Wendooka (agence digitale) et lancement des premières formations sur l\'IA générative appliquée au business.',
    icon: Brain,
    color: 'border-accent-gold',
    iconColor: 'text-accent-gold',
    bgColor: 'bg-accent-gold/10',
  },
  {
    year: '2025+',
    title: 'Écosystème & Impact',
    description: 'Lancement de Sanda Vibe Code, 112K+ abonnés, formations premium et positionnement comme référence IA en Afrique francophone.',
    icon: Rocket,
    color: 'border-accent-red',
    iconColor: 'text-accent-red',
    bgColor: 'bg-accent-red/10',
  },
];

const values = [
  { title: 'Innovation', desc: 'Toujours à la pointe de la technologie IA' },
  { title: 'Impact', desc: 'Transformer concrètement des vies en Afrique' },
  { title: 'Accessibilité', desc: 'Rendre l\'IA compréhensible pour tous' },
  { title: 'Excellence', desc: 'La qualité dans chaque contenu produit' },
];

export function About() {
  const { ref, isInView } = useInView();

  return (
    <section id="apropos" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient" />
      
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-accent-gold/20 text-accent-gold text-sm font-medium mb-4">
            Mon Parcours
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Du journalisme à l'<span className="gradient-text">IA générative</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Un parcours atypique porté par la curiosité, l'ambition et la conviction que la technologie 
            peut transformer l'Afrique.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/5 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-gold to-accent-gold-light flex items-center justify-center shadow-lg">
                  <span className="font-heading font-bold text-2xl text-navy-900">OS</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">Oumarou Sanda</h3>
                  <p className="text-accent-gold text-sm">Entrepreneur Digital & Expert IA</p>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Ancien journaliste devenu bâtisseur d'écosystèmes digitaux, je fédère aujourd'hui 
                  une communauté de plus de <span className="text-white font-semibold">112 000 abonnés</span> sur
                  YouTube, TikTok, Facebook, LinkedIn et Instagram.
                </p>
                <p>
                  Fondateur de <span className="text-accent-blue font-semibold">Wendooka</span> (agence web et digitale) 
                  et de <span className="text-accent-red font-semibold">Sanda Vibe Code</span> (écosystème IA, no-code 
                  et vibe coding), je combine rigueur journalistique et vision entrepreneuriale.
                </p>
                <p>
                  Ma mission : <span className="text-accent-gold font-semibold">démocratiser l'IA générative</span> et 
                  aider les entrepreneurs africains francophones à en faire un levier de croissance concret.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="glass-card rounded-xl p-4 border border-white/5 hover:border-accent-gold/20 transition-all group"
                >
                  <h4 className="font-heading font-semibold text-white text-sm mb-1 group-hover:text-accent-gold transition-colors">{v.title}</h4>
                  <p className="text-gray-500 text-xs">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue via-accent-gold to-accent-red opacity-30" />
            
            <div className="space-y-6 sm:space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                  className="relative pl-16 group"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-1 w-12 h-12 ${item.bgColor} rounded-xl flex items-center justify-center border ${item.color} border-opacity-30 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  
                  <div className="glass-card rounded-2xl p-5 sm:p-6 border border-white/5 group-hover:border-white/10 transition-all">
                    <span className={`text-xs font-bold ${item.iconColor} font-heading`}>{item.year}</span>
                    <h4 className="font-heading font-bold text-white text-lg mt-1 mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="mt-8 pl-16"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-accent-gold hover:text-accent-gold-light font-semibold transition-colors group"
              >
                Travaillons ensemble
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
