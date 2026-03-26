import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from '../components/useInView';
import { formations } from '../data/formations';
import { Star, Users, Clock, CheckCircle2, ArrowRight, Play, BookOpen, ChevronDown, ChevronRight, Home, Shield, Zap } from 'lucide-react';
import { useState } from 'react';
import { SEOHead } from '../components/SEOHead';

export default function FormationDetailPage() {
  const { slug } = useParams();
  const formation = formations.find((f) => f.id === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { ref: featRef, isInView: featInView } = useInView();
  const { ref: currRef, isInView: currInView } = useInView();

  if (!formation) return <Navigate to="/formations" replace />;
  const otherFormations = formations.filter((f) => f.id !== formation.id);

  return (
    <>
      <SEOHead
        title={`${formation.name} | Formation — Oumarou Sanda`}
        description={formation.longDescription || formation.tagline}
        canonical={`/formations/${formation.id}`}
        ogType="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": formation.name,
          "description": formation.longDescription,
          "provider": { "@type": "Person", "name": "Oumarou Sanda", "url": "https://oumarousanda.com" },
          "inLanguage": "fr",
          "url": `https://oumarousanda.com/formations/${formation.id}`
        }}
      />
      {/* Hero */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden section-dark border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-[#050505] to-[#050505] opacity-80" />
        <div className="absolute inset-0 bg-grid-dark opacity-60" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 z-10">
          <nav className="flex items-center gap-2 text-[13px] text-white/40 mb-10">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5"><Home className="w-3.5 h-3.5" /> Accueil</Link>
            <ChevronRight className="w-3 h-3 opacity-40" />
            <Link to="/formations" className="hover:text-white transition-colors">Formations</Link>
            <ChevronRight className="w-3 h-3 opacity-40" />
            <span className="text-white/80">{formation.name}</span>
          </nav>

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-3">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${formation.badgeColor} text-white text-[10px] font-bold tracking-wider mb-5`}>
                {formation.badge}
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight tracking-tight">{formation.name}</h1>
              <p className="text-xl text-white/80 font-light mb-5">{formation.tagline}</p>
              <p className="text-white/60 text-[15px] leading-relaxed mb-8">{formation.longDescription}</p>
              <div className="flex flex-wrap items-center gap-6">
                {[
                  { icon: Star, label: `${formation.rating} / 5`, color: 'text-gold' },
                  { icon: Users, label: `${formation.students} étudiants`, color: 'text-white/65' },
                  { icon: Clock, label: formation.duration, color: 'text-white/65' },
                  { icon: BookOpen, label: `${formation.modules} modules`, color: 'text-white/65' },
                ].map((m) => (
                  <div key={m.label} className={`flex items-center gap-1.5 text-[13px] ${m.color}`}>
                    <m.icon className="w-4 h-4" />
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-2">
              <div className={`bg-[#050505] shadow-xl rounded-2xl p-6 sm:p-7 border border-white/10 sticky top-28`}>
                <div className={`w-full aspect-video rounded-xl bg-gradient-to-br ${formation.gradient} flex items-center justify-center mb-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all">
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-end gap-2 mb-1">
                    <span className="font-heading font-bold text-2xl text-white tracking-tight">{formation.price}</span>
                    <span className="text-white/40 text-[12px] line-through mb-0.5">{formation.priceOld}</span>
                  </div>
                  <p className="text-emerald-500 text-[12px] font-medium">💰 Économisez {parseInt(formation.priceOld.replace(/\D/g, '')) - parseInt(formation.price.replace(/\D/g, ''))} FCFA</p>
                </div>
                <button className={`w-full py-3.5 rounded-xl bg-gradient-to-r ${formation.gradient} text-white font-heading font-bold text-[14px] hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-all duration-500 flex items-center justify-center gap-2 mb-3 glow-hover`}>
                  <Zap className="w-4 h-4" /> Acheter maintenant
                </button>
                <p className="text-white/40 text-[11px] text-center mb-5">Paiement sécurisé • Accès immédiat • Garantie 30 jours</p>
                <div className="space-y-3 pt-5 border-t border-white/10">
                  {[
                    { icon: Shield, text: 'Garantie satisfait ou remboursé 30 jours' },
                    { icon: Zap, text: 'Accès immédiat après paiement' },
                    { icon: BookOpen, text: `${formation.modules} modules • ${formation.duration}` },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 text-[12px] text-white/70">
                      <item.icon className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-[#fafafa] border-b border-black/5">
        <div ref={featRef} className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={featInView ? { opacity: 1, y: 0 } : {}} className="font-heading text-2xl sm:text-3xl font-black text-[#0a0a0a] mb-10 tracking-tight">
            Ce que vous allez <span className="text-gold">apprendre</span>
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {formation.features.map((feat, i) => (
              <motion.div key={feat} initial={{ opacity: 0, y: 10 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.05 + i * 0.04 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-white border border-black/5 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-[#525252] text-[13px]">{feat}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-white border-b border-black/5">
        <div ref={currRef} className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={currInView ? { opacity: 1, y: 0 } : {}}>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#0a0a0a] mb-3 tracking-tight">Programme <span className="text-gold">détaillé</span></h2>
            <p className="text-[#a3a3a3] text-[13px] mb-10">{formation.modules} modules • {formation.duration}</p>
          </motion.div>
          <div className="space-y-2.5">
            {formation.curriculum.map((mod, i) => (
              <motion.div key={mod.title} initial={{ opacity: 0, y: 10 }} animate={currInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
                className="bg-[#fafafa] border border-black/5 shadow-sm rounded-xl p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${formation.gradient} flex items-center justify-center text-white font-heading font-bold text-[12px]`}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-[#0a0a0a] text-[14px]">{mod.title}</h4>
                    <p className="text-[#a3a3a3] text-[11px]">{mod.lessons} leçons</p>
                  </div>
                </div>
                <BookOpen className="w-4 h-4 text-[#a3a3a3]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-[#fafafa] border-b border-black/5">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-black text-[#0a0a0a] mb-10 tracking-tight">Témoignages <span className="text-gold">étudiants</span></h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {formation.testimonials.map((t) => (
              <div key={t.name} className="bg-white border border-black/5 shadow-sm rounded-2xl p-6">
                <div className="flex items-center gap-0.5 mb-4">{[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-gold fill-gold" />)}</div>
                <p className="text-[#525252] text-[13px] leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold/20 to-blue/20 flex items-center justify-center border border-black/5">
                    <span className="text-[#0a0a0a] text-[10px] font-bold">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-[#0a0a0a] text-[13px] font-semibold">{t.name}</p>
                    <p className="text-[#a3a3a3] text-[11px]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-white border-b border-black/5">
        <div className="relative max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-black text-[#0a0a0a] mb-10 tracking-tight">Questions <span className="text-gold">fréquentes</span></h2>
          <div className="space-y-2">
            {formation.faq.map((item, i) => (
              <div key={i} className="bg-[#fafafa] border border-black/5 shadow-sm rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white transition-colors">
                  <span className="font-heading font-semibold text-[#0a0a0a] text-[14px] pr-4">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#a3a3a3] shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-5 pb-5">
                    <p className="text-[#525252] text-[13px] leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other formations */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-black text-[#0a0a0a] mb-10 tracking-tight">Autres <span className="text-gold">formations</span></h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {otherFormations.map((f) => (
              <Link key={f.id} to={(f as { customUrl?: string }).customUrl ?? `/formations/${f.id}`} className="bg-white border border-black/5 shadow-sm rounded-2xl p-6 group flex items-start gap-4 hover:shadow-md transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-[15px] text-[#0a0a0a] mb-1 group-hover:text-gold transition-colors duration-300 tracking-tight">{f.name}</h3>
                  <p className="text-[#a3a3a3] text-[12px] mb-2">{f.tagline}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-[#0a0a0a] text-[14px]">{f.price}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
