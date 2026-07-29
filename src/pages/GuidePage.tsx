import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, Calendar } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { guides } from '../data/guides';

export default function GuidePage() {
  return (
    <>
      <SEOHead
        title="Guides pratiques IA & Business Digital - Oumarou Sanda"
        description="Des guides complets et actionnables sur l'IA, la vidéo IA, le business digital et l'entrepreneuriat en Afrique. Tutoriels pas à pas, prompts prêts à copier."
        canonical="https://oumarousanda.com/guide"
      />

      {/* ── HERO ── */}
      <section className="relative bg-[#0C0B0B] overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(232,212,139,0.10)_0%,transparent_70%)]" />
        </div>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(232,212,139,0.3)] text-[#e8d48b] text-[11px] font-bold tracking-[0.12em] uppercase mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              Guides pratiques
            </span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight mb-6">
              Des guides pour{' '}
              <span className="text-[#e8d48b]">passer à l'action</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
              Chaque guide est une ressource complète - workflow étape par étape, prompts prêts à copier, erreurs à éviter. Pas de théorie creuse.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── GUIDES GRID ── */}
      <section className="bg-[#faf9f6] py-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          {guides.length === 0 ? (
            <p className="text-center text-[#7a7a7a] py-20">Aucun guide publié pour l'instant.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides.map((guide, i) => (
                <motion.a
                  key={guide.slug}
                  href={`/guide/${guide.slug}/`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group bg-white border border-black/5 hover:border-amber-400/40 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-400"
                >
                  {/* Accent bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-amber-400 to-amber-600 opacity-80 group-hover:opacity-100 transition-opacity" />

                  {guide.image && (
                    <div className="w-full aspect-[16/9] bg-[#f5f0e8] overflow-hidden">
                      <img
                        src={guide.image}
                        alt={guide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    <span className={'self-start px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border mb-3 ' + guide.tagColor}>
                      {guide.tag}
                    </span>

                    <h2 className="font-heading font-black text-[17px] text-[#0a0a0a] mb-3 group-hover:text-amber-700 transition-colors leading-snug line-clamp-2">
                      {guide.title}
                    </h2>
                    <p className="text-[#525252] text-[13px] leading-relaxed mb-5 line-clamp-3 flex-1">
                      {guide.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between text-[11px] font-bold text-[#9ca3af] tracking-wide pt-4 border-t border-black/5">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {guide.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {guide.readTime}</span>
                      </div>
                      <span className="text-amber-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Lire <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
