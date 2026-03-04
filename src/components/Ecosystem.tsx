import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Globe, Code, Palette, BarChart3, Cpu, Blocks, Wand2, Layers, ArrowUpRight } from 'lucide-react';

const ecosystems = [
  {
    name: 'Wendooka',
    tagline: 'Agence Web & Digitale',
    description: 'Création de sites web, stratégie digitale, branding et marketing pour les entreprises qui veulent se démarquer dans l\'ère de l\'IA.',
    gradient: 'from-accent-blue to-blue-600',
    glowClass: 'glow-blue',
    borderColor: 'border-accent-blue/20',
    hoverBorder: 'hover:border-accent-blue/40',
    services: [
      { icon: Globe, label: 'Sites Web & E-commerce' },
      { icon: Palette, label: 'Branding & Design' },
      { icon: BarChart3, label: 'Marketing Digital' },
      { icon: Wand2, label: 'Stratégie IA' },
    ],
  },
  {
    name: 'Sanda Vibe Code',
    tagline: 'Écosystème IA & No-Code',
    description: 'L\'écosystème complet pour maîtriser l\'IA générative, le no-code et le vibe coding. De la formation à la mise en pratique, tout pour créer avec l\'IA.',
    gradient: 'from-accent-red to-red-600',
    glowClass: 'glow-red',
    borderColor: 'border-accent-red/20',
    hoverBorder: 'hover:border-accent-red/40',
    services: [
      { icon: Cpu, label: 'IA Générative' },
      { icon: Code, label: 'Vibe Coding' },
      { icon: Blocks, label: 'No-Code / Low-Code' },
      { icon: Layers, label: 'Automatisation' },
    ],
  },
];

export function Ecosystem() {
  const { ref, isInView } = useInView();

  return (
    <section id="ecosysteme" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-accent-blue/20 text-accent-blue text-sm font-medium mb-4">
            Écosystème
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Deux marques, <span className="gradient-text-blue">une vision</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Un écosystème complet pour accompagner les entrepreneurs africains 
            dans leur transformation digitale et leur adoption de l'IA.
          </p>
        </motion.div>

        {/* Ecosystem cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {ecosystems.map((eco, i) => (
            <motion.div
              key={eco.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className={`glass-card rounded-3xl p-6 sm:p-8 border ${eco.borderColor} ${eco.hoverBorder} transition-all duration-500 group relative overflow-hidden`}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${eco.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${eco.gradient} mb-3`}>
                      <span className="text-white text-xs font-bold font-heading">{eco.name}</span>
                    </div>
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-2">{eco.tagline}</h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{eco.description}</p>
                  </div>
                </div>

                {/* Services */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {eco.services.map((service) => (
                    <div
                      key={service.label}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors"
                    >
                      <service.icon className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="text-sm text-gray-300">{service.label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white group/btn transition-colors">
                  En savoir plus
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 glass-card rounded-2xl px-6 sm:px-8 py-4 border border-accent-gold/20">
            <div className="w-3 h-3 bg-accent-blue rounded-full" />
            <span className="text-gray-400 text-sm">Propulsé par</span>
            <span className="font-heading font-bold gradient-text text-lg">Oumarou Sanda</span>
            <span className="text-gray-400 text-sm">depuis le Cameroun</span>
            <div className="w-3 h-3 bg-accent-red rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
