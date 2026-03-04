import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

export function CTABanner() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/5 via-accent-red/5 to-accent-blue/5" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <div ref={ref} className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative glass-card rounded-3xl p-8 sm:p-12 lg:p-16 border border-accent-gold/15 overflow-hidden text-center"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-gold/8 rounded-full blur-3xl" />
          
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-gold to-accent-gold-light mb-6 shadow-2xl shadow-accent-gold/20"
            >
              <Zap className="w-8 h-8 text-navy-900" />
            </motion.div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 max-w-2xl mx-auto leading-tight">
              Prêt à transformer votre business avec l'<span className="gradient-text">IA générative</span> ?
            </h2>
            
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8">
              Rejoignez plus de 5 000 entrepreneurs qui utilisent déjà l'IA pour 
              créer, automatiser et scaler leur activité.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#formations"
                className="group px-8 py-4 bg-gradient-to-r from-accent-gold to-accent-gold-light text-navy-900 font-heading font-bold text-base rounded-2xl hover:shadow-2xl hover:shadow-accent-gold/30 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Commencer maintenant
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 glass-card border border-white/10 text-white font-heading font-semibold text-base rounded-2xl hover:border-accent-gold/30 hover:bg-white/5 transition-all flex items-center justify-center"
              >
                Discuter de votre projet
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
