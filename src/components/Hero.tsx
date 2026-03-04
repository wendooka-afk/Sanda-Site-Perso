import { motion } from 'framer-motion';
import { Play, ArrowRight, Youtube, Users, BookOpen, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#fcfcfc]">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-premium opacity-30" />
      <div className="absolute top-0 right-0 w-2/3 h-[500px] bg-gradient-to-bl from-gold/10 via-transparent to-transparent opacity-80 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-[400px] bg-gradient-to-tr from-blue/5 via-transparent to-transparent opacity-60 pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue/5 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-coral/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '4s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-black/5 shadow-sm mb-6 sm:mb-8"
            >
              <span className="w-2 h-2 bg-emerald rounded-full animate-pulse" />
              <span className="text-sm text-[#0a0a0a] font-medium tracking-wide">Expert N°1 en IA Générative — Afrique Francophone</span>
            </motion.div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
              <span className="text-[#0a0a0a]">L'IA au service de</span>
              <br />
              <span className="text-gradient-gold">votre business</span>
              <br />
              <span className="text-[#0a0a0a]/80">en Afrique</span>
            </h1>

            <p className="text-[#525252] text-base sm:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-[1.7] font-inter">
              Entrepreneur digital, créateur de contenus & formateur.
              J'aide les entrepreneurs africains à exploiter la puissance de
              l'IA générative pour <span className="text-[#0a0a0a] font-bold">transformer leurs idées en revenus.</span>
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <a
                href="#formations"
                className="group px-8 py-4 bg-[#0a0a0a] text-white font-bold text-[14px] uppercase tracking-[0.1em] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.3)] hover:bg-gold transition-all duration-300 flex items-center justify-center gap-3"
              >
                Découvrir mes formations
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </a>
              <a
                href="#apropos"
                className="group px-8 py-4 glass-premium text-[#0a0a0a] font-bold text-[14px] uppercase tracking-[0.1em] rounded-xl hover:bg-white transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Play className="w-5 h-5 text-[#0a0a0a] group-hover:scale-110 transition-transform" />
                Mon parcours
              </a>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0 pt-8 border-t border-black/5">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 mb-1.5">
                  <Youtube className="w-4 h-4 text-[#FF0000]" />
                  <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0a0a0a]">100K+</span>
                </div>
                <span className="text-[12px] font-bold tracking-widest text-[#737373] uppercase">Abonnés</span>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 mb-1.5">
                  <Users className="w-4 h-4 text-[#1877F2]" />
                  <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0a0a0a]">5K+</span>
                </div>
                <span className="text-[12px] font-bold tracking-widest text-[#737373] uppercase">Formés</span>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 mb-1.5">
                  <BookOpen className="w-4 h-4 text-gold" />
                  <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0a0a0a]">6+</span>
                </div>
                <span className="text-[12px] font-bold tracking-widest text-[#737373] uppercase">Formations</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Hero visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Main image container */}
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-[3rem] overflow-hidden bg-white shadow-[0_20px_80px_rgba(0,0,0,0.08)] border border-black/5 group">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  {/* Avatar Frame */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gold blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="w-36 h-36 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#f3e5ab] flex items-center justify-center shadow-2xl relative z-10 border-[6px] border-[#fcfcfc] transform group-hover:-translate-y-2 transition-transform duration-500">
                      <span className="font-heading font-extrabold text-5xl text-[#1a1a1a]">OS</span>
                    </div>
                  </div>

                  <h3 className="font-heading font-extrabold text-[#0a0a0a] text-3xl mb-1">Oumarou Sanda</h3>
                  <p className="text-gold font-bold tracking-[0.15em] text-sm uppercase">Expert IA Générative</p>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 sm:-right-10 card-luxury rounded-2xl p-5 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue" />
                  </div>
                  <div>
                    <p className="text-[#0a0a0a] font-bold text-[14px]">Wendooka</p>
                    <p className="text-[#737373] text-[12px] font-medium">Agence Digitale</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -left-6 sm:-left-10 card-luxury rounded-2xl p-5 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-coral" />
                  </div>
                  <div>
                    <p className="text-[#0a0a0a] font-bold text-[14px]">Sanda Vibe Code</p>
                    <p className="text-[#737373] text-[12px] font-medium">IA & No-Code</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fafafa] to-transparent" />
    </section>
  );
}
