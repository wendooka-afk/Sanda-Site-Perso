import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { BookOpen, ArrowRight, Quote, Globe2, Lightbulb, Users } from 'lucide-react';

const chapters = [
  { icon: Globe2, title: 'L\'état de l\'IA en Afrique', desc: 'Diagnostic sans complaisance de l\'adoption technologique sur le continent' },
  { icon: Lightbulb, title: 'Opportunités manquées', desc: 'Pourquoi chaque année d\'attente coûte des milliards à l\'Afrique' },
  { icon: Users, title: 'Les pionniers africains', desc: 'Portraits d\'entrepreneurs qui montrent la voie de l\'IA made in Africa' },
];

export function Book() {
  const { ref, isInView } = useInView();

  return (
    <section id="livre" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-radial-gradient" />
      
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Book visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 via-accent-red/10 to-accent-blue/10 rounded-3xl blur-3xl scale-110" />
              
              {/* Book mockup */}
              <div className="relative w-64 sm:w-72 lg:w-80 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-accent-gold/30 glow-gold shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-navy-700 via-charcoal to-navy-900 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-1 bg-accent-gold rounded-full mb-6" />
                  <p className="text-accent-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Oumarou Sanda</p>
                  <h3 className="font-heading font-bold text-white text-lg sm:text-xl lg:text-2xl leading-tight mb-4">
                    Si l'Afrique rate l'intelligence artificielle,
                  </h3>
                  <p className="font-heading font-bold gradient-text text-xl sm:text-2xl lg:text-3xl">
                    elle rate le futur
                  </p>
                  <div className="w-16 h-1 bg-accent-gold rounded-full mt-6" />
                  <div className="mt-8 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-accent-gold" />
                    <span className="text-gray-400 text-xs">À paraître en 2026</span>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 glass-card rounded-xl p-3 border border-accent-gold/20"
              >
                <span className="text-accent-gold text-xs font-bold">📖 Pré-commande</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-accent-gold/20 text-accent-gold text-sm font-medium mb-6">
              <BookOpen className="w-3 h-3" />
              Livre à venir
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Si l'Afrique rate l'IA, <span className="gradient-text">elle rate le futur</span>
            </h2>

            <div className="glass-card rounded-2xl p-5 border border-white/5 mb-6">
              <Quote className="w-8 h-8 text-accent-gold/30 mb-3" />
              <p className="text-gray-300 leading-relaxed italic">
                "Ce livre est un cri d'alerte et un guide d'action. L'intelligence artificielle n'attend pas. 
                L'Afrique a le talent, la jeunesse et la créativité. Il ne lui manque que la prise de conscience 
                et les outils. Ce livre est conçu pour fournir les deux."
              </p>
              <p className="text-accent-gold font-semibold text-sm mt-3">- Oumarou Sanda</p>
            </div>

            {/* Chapters preview */}
            <div className="space-y-3 mb-8">
              {chapters.map((ch, i) => (
                <motion.div
                  key={ch.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-gold/10 flex items-center justify-center shrink-0">
                    <ch.icon className="w-5 h-5 text-accent-gold" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-white text-sm">{ch.title}</h4>
                    <p className="text-gray-500 text-xs mt-0.5">{ch.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pre-register form */}
            <div className="glass-card rounded-2xl p-6 border border-accent-gold/20">
              <h4 className="font-heading font-bold text-white mb-2">🔔 Soyez les premiers informés</h4>
              <p className="text-gray-400 text-sm mb-4">Inscrivez-vous pour recevoir un extrait gratuit et être notifié de la sortie du livre.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-accent-gold/40 transition-colors"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-accent-gold to-accent-gold-light text-navy-900 font-heading font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-accent-gold/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                  Pré-inscription
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
