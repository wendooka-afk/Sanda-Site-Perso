import { Link } from 'react-router-dom';
import { Reveal } from '../components/animations/Reveal';
import {
  ArrowRight, Youtube, Users, BookOpen, Zap,
  Video, Brain, Building2, Star, Clock,
  Calendar, Sparkles, Play, Globe, Settings,
  Briefcase, Mic, Book, Mail, Target, PenTool
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

/* ═══════════════════════ HERO ═══════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#fcfcfc]">
      <div className="absolute inset-0 bg-mesh-dark opacity-10" />
      <div className="absolute inset-0 bg-grid-premium opacity-30 mix-blend-overlay" />
      {/* Blobs : animate-pan désactivé sur mobile via CSS media query */}
      <div className="absolute top-[10%] left-[15%] w-[600px] h-[600px] bg-blue/5 rounded-full blur-[120px] animate-pan hidden lg:block" />
      <div className="absolute bottom-[0%] right-[5%] w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] animate-pan hidden lg:block" style={{ animationDelay: '-15s' }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-28 w-full z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-black/5 glass-premium mb-8 hover:border-gold/20 hover:bg-white/80 transition-all cursor-pointer shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
              </span>
              <span className="text-[11px] text-[#0a0a0a] font-bold tracking-[0.2em] uppercase">Le monde change. Vite.</span>
            </div>

            <h1 className="font-heading font-extrabold leading-[1.05] mb-8 tracking-tighter" style={{ fontSize: 'clamp(2.5rem, 3.8vw, 5rem)' }}>
              <span className="block text-[#050505]">Je t'apprends à utiliser l'IA</span>
              <span className="block text-[#050505]/90">pour bâtir un business</span>
              <span className="block text-gradient-gold">qui écrase la concurrence.</span>
            </h1>

            <p className="text-[#525252] text-base sm:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 mb-12 leading-[1.8] font-inter">
              Entrepreneur digital, expert en intelligence artificielle et formateur. J'ai aidé des centaines d'entrepreneurs et créateurs africains à transformer l'IA en machine à revenus. Formations, services, outils — tout est là pour <strong className="text-[#0a0a0a] font-bold">accélérer ta croissance.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link to="/formations" className="group relative px-8 py-4 bg-[#050505] text-white font-heading font-bold text-[14px] rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_32px_-6px_rgba(212,175,55,0.4)] hover:bg-gold transition-all duration-500 overflow-hidden tracking-wider uppercase">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Découvrir mes formations
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] bg-[position:200%_0,0_0] group-hover:animate-shimmer" />
              </Link>
              <a href="https://academy.oumarousanda.com/coaching-ia" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-gold text-[#0a0a0a] font-heading font-bold text-[13px] tracking-[0.1em] uppercase rounded-xl hover:bg-white hover:text-[#0a0a0a] transition-all duration-300 flex items-center justify-center shadow-[0_10px_30px_rgba(212,175,55,0.4)]">
                Travailler avec moi
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              <img src="/Oumarou Sanda CEO Wendooka 3.webp" alt="Oumarou Sanda" width={420} height={560} fetchPriority="high" className="w-80 lg:w-[420px] object-cover drop-shadow-2xl" />
              {/* Floating cards — animation CSS pure, plus de motion.div */}
              <div className="absolute -top-6 -right-6 lg:-top-8 lg:-right-10 card-luxury rounded-2xl px-5 py-4 shadow-xl hidden sm:block animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue/10 flex items-center justify-center"><Zap className="w-6 h-6 text-blue" /></div>
                  <div><p className="text-[#0a0a0a] font-bold text-[14px]">Wendooka</p><p className="text-[#737373] text-[11px] font-medium uppercase tracking-wider">Agence Digitale</p></div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 lg:-bottom-8 lg:-left-10 card-luxury rounded-2xl px-5 py-4 shadow-xl hidden sm:block animate-float" style={{ animationDelay: '-2s', animationDirection: 'reverse' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center"><Sparkles className="w-6 h-6 text-coral" /></div>
                  <div><p className="text-[#0a0a0a] font-bold text-[14px]">Sanda Vibe Code</p><p className="text-[#737373] text-[11px] font-medium uppercase tracking-wider">SaaS & Outils IA</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#fafafa] to-transparent pointer-events-none" />
    </section>
  );
}

/* ═══════════════════════ PARTNERS ═══════════════════════ */
function PartnersSection() {
  const partners = [
    { name: 'Higgsfield AI' },
    { name: 'Hitpaw Edimakor' },
    { name: 'Doola' },
    { name: '1st Formations' },
    { name: 'Flowith AI' }
  ];

  return (
    <section className="py-12 bg-white border-b border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-10">
          <p className="text-[#767676] font-bold text-[10px] uppercase tracking-[0.2em] text-center whitespace-normal sm:whitespace-nowrap shrink-0">Partenaires & sponsors</p>
          <div className="w-px h-8 bg-black/8 hidden md:block shrink-0" />
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-10">
            {partners.map((p) => (
              <span
                key={p.name}
                className="font-heading font-black text-sm sm:text-base md:text-lg text-[#767676] hover:text-[#0a0a0a] transition-colors duration-300 cursor-default tracking-tight text-center"
              >
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ STATS ═══════════════════════ */
function StatsBar() {
  const stats = [
    { icon: Youtube, value: '125 000+', label: 'abonnés', color: 'text-[#FF0000]', bg: 'bg-[#FF0000]/10' },
    { icon: Users, value: '200+', label: 'apprenants', color: 'text-[#1877F2]', bg: 'bg-[#1877F2]/10' },
    { icon: BookOpen, value: '6+', label: 'formations', color: 'text-gold', bg: 'bg-gold/10' },
    { icon: Briefcase, value: '3', label: 'entreprises', color: 'text-emerald', bg: 'bg-emerald/10' },
    { icon: Book, value: '2', label: 'livres', color: 'text-violet', bg: 'bg-violet/10' }
  ];
  return (
    <section className="relative py-10 sm:py-14 overflow-hidden section-dark border-y border-white/5">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-10 items-center justify-items-center">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} direction="up" delay={i * 0.1}>
              <div className="flex items-center gap-4 group">
                <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center border border-white/10 group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-left">
                  <div className="font-heading font-extrabold text-2xl text-white tracking-tight leading-none mb-1">{stat.value}</div>
                  <div className="text-white/50 font-inter text-[11px] uppercase font-extrabold tracking-[0.2em]">{stat.label}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ PITCH ═══════════════════════ */
function PitchTeaser() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-[#fafafa] overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-[600px] bg-blue/5 rounded-full blur-[150px] animate-pulse-slow" />
      <div className="absolute left-0 top-0 w-1/4 h-[400px] bg-gold/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal direction="left" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/5 glass-premium text-[#0a0a0a] text-[10px] font-bold tracking-[0.2em] uppercase mb-8 shadow-sm">
              <span className="w-1.5 h-1.5 bg-blue rounded-full animate-pulse" /> Qui est Oumarou Sanda ?
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0a0a0a] tracking-tight mb-8 leading-[1.05]">
              Ancien journaliste.<br />
              <span className="text-blue block mt-2">Entrepreneur.</span>
              <span className="block mt-2">Obsédé par l'IA.</span>
            </h2>

            <div className="space-y-6 text-[#525252] text-[16px] sm:text-[17px] leading-[1.8] font-inter">
              <p>
                J'ai quitté le journalisme le jour où j'ai compris que l'information la plus puissante n'était pas celle qu'on diffuse à la télé — mais celle qui permet de créer des business.
              </p>
              <div className="pl-6 border-l-2 border-gold/30 relative py-2">
                <p className="leading-relaxed text-[#404040]">
                  Aujourd'hui, je dirige <strong className="text-[#0a0a0a] font-bold">Wendooka</strong> (agence web), je développe <strong className="text-[#0a0a0a] font-bold">Sanda Vibe Code</strong> (SaaS et IA), j'ai lancé <strong className="text-[#0a0a0a] font-bold">CommentSticker</strong>, et je forme des centaines d'entrepreneurs africains à transformer l'intelligence artificielle en <strong className="text-[#0a0a0a] font-bold">avantage compétitif concret</strong>.
                </p>
              </div>
              <p className="font-extrabold text-gold tracking-[0.15em] uppercase text-[12px] pt-4 leading-relaxed">
                Pas de théorie. Pas de bla-bla tech.<br />Des systèmes. Des résultats. Des revenus.
              </p>
            </div>

            <div className="mt-12">
              <Link to="/a-propos" className="inline-flex items-center gap-3 text-[#0a0a0a] font-bold text-[13px] hover:text-gold transition-colors duration-300 group uppercase tracking-[0.1em] pb-2 border-b border-black/10 hover:border-gold">
                En savoir plus sur mon parcours
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <div className="relative mt-12 lg:mt-0">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue/10 to-gold/10 rounded-[2.5rem] blur-2xl opacity-50 transition-opacity duration-700 glow-hover" />
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-black/5 bg-white relative card-luxury group cursor-pointer shadow-[0_20px_60px_rgba(0,0,0,0.05)] card-hover-lift">

                {/* Image Placeholder - A template for their professional photo */}
                <div className="w-full h-full bg-[#f5f5f7] flex items-center justify-center overflow-hidden">
                  <img src="/Oumarou Sanda CEO Wendooka 10.webp" alt="Oumarou Sanda profil" width={480} height={600} loading="lazy" className="w-full h-full object-cover filter grayscale-[20%] contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center z-30">
                  <div className="w-20 h-20 rounded-full glass-premium border border-black/10 flex items-center justify-center group-hover:scale-110 group-hover:border-gold/50 transition-all duration-500 shadow-[0_10px_40px_rgba(212,175,55,0.3)] bg-white/90">
                    <Play className="w-8 h-8 text-[#0a0a0a] ml-2" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ PROBLEM ═══════════════════════ */
function ProblemSection() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-white border-y border-black/5">
      <div className="absolute inset-0 bg-grid-premium opacity-50 mix-blend-overlay" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <div className="relative order-2 lg:order-1">
            <Reveal direction="left" delay={0.1}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-coral/5 rounded-full blur-[100px] -z-10 animate-pulse-slow" />
              <div className="aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden border border-black/5 card-luxury shadow-xl relative group bg-white card-hover-lift glow-hover">

                <div className="w-full h-full bg-[#fafafa] flex items-center justify-center overflow-hidden">
                  <img src="/Oumarou Sanda CEO Wendooka 8.webp" alt="Productivité IA" width={480} height={600} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
                </div>

                <div className="absolute -bottom-8 -right-8 sm:bottom-12 sm:-right-8 bg-white border border-black/5 rounded-2xl p-6 shadow-xl z-30 card-luxury animate-float">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl bg-coral/10 flex items-center justify-center border border-coral/20">
                      <Target className="w-6 h-6 text-coral" />
                    </div>
                    <div>
                      <div className="text-[#737373] font-bold text-[11px] uppercase tracking-[0.2em] mb-1">Gain de temps</div>
                      <div className="text-[#0a0a0a] font-heading font-extrabold text-4xl">x10</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="text-left order-1 lg:order-2">
            <Reveal direction="right" delay={0.2}>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-coral/20 glass-premium text-coral text-[10px] font-bold tracking-[0.2em] uppercase mb-8 shadow-sm">
                <span className="w-1.5 h-1.5 bg-coral rounded-full animate-pulse" /> L'urgence est réelle
              </div>


              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0a0a0a] mb-8 tracking-tight leading-[1.05]">
                Pendant que tu réfléchis, <span className="text-gradient-coral mt-2 block sm:inline">l'IA avance.</span>
              </h2>

              <div className="text-[#404040] text-[16px] sm:text-[18px] leading-[1.8] font-inter space-y-8">
                <p>
                  Quelqu'un dans ton domaine utilise déjà l'IA pour créer du contenu <strong className="text-[#0a0a0a]">10x plus vite que toi</strong>. Pour lancer des produits digitaux pendant que tu planifies encore. Pour automatiser ce qui te prend des heures.
                </p>

                <div className="p-6 rounded-2xl border border-black/5 bg-[#fafafa] relative overflow-hidden card-luxury shadow-sm">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-coral to-coral-dark" />
                  <p className="font-medium text-[#0a0a0a] italic text-lg leading-relaxed shadow-sm p-4 bg-white/50 rounded-lg">
                    "Ce n'est pas une menace.<br />C'est un fait."
                  </p>
                </div>

                <p>
                  L'IA ne va pas te remplacer. Mais les gens qui savent l'utiliser vont te dépasser. Et l'écart se creuse chaque jour.
                </p>

                <div className="pt-8 mt-10 border-t border-black/10">
                  <p className="text-xl text-[#0a0a0a] font-bold leading-snug">
                    La question n'est pas SI tu dois maîtriser l'IA.<br />
                    <span className="text-coral mt-2 block">C'est COMBIEN tu vas perdre en attendant.</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ FORMATIONS ═══════════════════════ */
function FormationsVitrine() {
  const formations = [
    {
      id: 'protocole-video-ia',
      title: 'PROTOCOLE VIDÉO IA',
      desc: "Crée des vidéos publicitaires et cinématographiques de niveau professionnel avec l'intelligence artificielle. VEO, Sora, Wan, Higgsfield — maîtrise les outils que les agences facturent des milliers d'euros.",
      target: "Créateurs de contenu, marketeurs, entrepreneurs qui veulent des vidéos pro sans équipe ni budget.",
      icon: Video,
      accent: 'coral',
      gradient: 'from-[#f43f5e] to-[#be123c]',
      badge: 'Bestseller',
    },
    {
      id: 'cerveau-augmente',
      title: 'LE CERVEAU AUGMENTÉ',
      desc: "Construis ton système personnel d'intelligence artificielle. Un cerveau numérique qui travaille pour toi 24h/24 : création de contenu, productivité, stratégie business, automatisation. Tout, centralisé.",
      target: "Entrepreneurs et professionnels qui veulent multiplier leur productivité par 10 avec l'IA.",
      icon: Brain,
      accent: 'blue',
      gradient: 'from-[#818cf8] to-[#4f46e5]',
      badge: 'Le plus populaire',
    },
    {
      id: 'offshore-empire',
      title: 'OFFSHORE EMPIRE',
      desc: "Structure ton business à l'international. Crée ta société au Royaume-Uni depuis l'Afrique, ouvre un compte bancaire business, et accède aux marchés mondiaux — légalement.",
      target: "Entrepreneurs africains qui veulent scaler au-delà des frontières locales.",
      icon: Building2,
      accent: 'gold',
      gradient: 'from-[#f3e5ab] to-[#d4af37]',
      badge: 'Premium',
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-[#fafafa]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={0.1}>
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gold/20 glass-premium text-gold-dark text-[10px] font-bold tracking-[0.2em] uppercase mb-8 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Mes Formations
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0a0a0a] tracking-tight mb-8">
              Apprends. Applique. <span className="text-gradient-gold">Génère des revenus.</span>
            </h2>
            <p className="text-[#525252] text-[16px] sm:text-[18px] leading-[1.8] font-inter">
              Chaque formation est conçue pour un objectif précis : te donner une compétence monétisable immédiatement. Pas de remplissage. Pas de théorie inutile. <strong className="text-[#0a0a0a] font-bold">Tu apprends, tu fais, tu gagnes.</strong>
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {formations.map((f, i) => (
            <Reveal key={f.id} direction="up" delay={i * 0.15}>
              <div className="card-luxury bg-white rounded-[2.5rem] p-8 sm:p-10 group relative flex flex-col h-full overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.06)] card-hover-lift glow-hover">

                <div className={`absolute top-0 right-0 w-48 h-48 bg-${f.accent}/5 rounded-bl-[100px] pointer-events-none transition-transform duration-700 group-hover:scale-150 group-hover:bg-${f.accent}/10`} />

                <div className={`absolute top-8 right-8 border border-${f.accent}/20 bg-${f.accent}/10 text-${f.accent}-dark font-bold text-[10px] px-4 py-2 rounded-full tracking-[0.2em] uppercase shadow-sm bg-white/80 backdrop-blur-md z-10`}>
                  {f.badge}
                </div>

                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-10 shadow-[0_10px_30px_rgba(0,0,0,0.15)] relative z-10 group-hover:scale-110 transition-transform duration-500`}>
                  <f.icon className={`w-7 h-7 ${f.accent === 'gold' ? 'text-white' : 'text-white'}`} />
                </div>

                <h3 className="font-heading font-extrabold text-2xl text-[#0a0a0a] mb-5 tracking-tight z-10 relative group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#0a0a0a] group-hover:to-[#525252] transition-all">{f.title}</h3>
                <p className="text-[#525252] text-[15px] leading-[1.7] mb-8 flex-1 z-10 relative font-inter">{f.desc}</p>

                <div className="bg-[#f5f5f7] rounded-2xl p-5 mb-10 border border-black/5 z-10 relative group-hover:border-[#0a0a0a]/10 transition-colors">
                  <p className="text-[10px] text-[#737373] uppercase font-bold mb-2 tracking-[0.2em]">Pour qui :</p>
                  <p className="text-[13px] text-[#0a0a0a] leading-[1.6] font-medium">{f.target}</p>
                </div>

                <Link to={`/formations/${f.id}`} className="btn-premium w-full py-4.5 rounded-xl bg-white hover:bg-[#0a0a0a] text-[#0a0a0a] hover:text-white border border-black/10 hover:border-[#0a0a0a] font-bold text-[13px] tracking-[0.1em] uppercase flex items-center justify-center gap-3 transition-all duration-400 group/btn z-10 relative shadow-sm">
                  Rejoindre la formation <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="text-center">
          <Link to="/formations" className="inline-flex items-center gap-3 text-[#0a0a0a] font-bold text-[14px] hover:text-gold transition-colors duration-300 group uppercase tracking-[0.1em] pb-2 border-b border-black/20 hover:border-gold">
            Voir toutes mes formations <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ SERVICES ═══════════════════════ */
function ServicesSection() {
  const services = [
    {
      title: 'AGENCE WEB & DIGITALE — WENDOOKA',
      desc: "Sites web professionnels, tunnels de vente, SEO, automatisation marketing. On ne crée pas des sites vitrines. On crée des machines à clients.",
      icon: Globe,
      color: 'text-blue-light',
      bg: 'bg-blue/10',
      border: 'border-blue/20',
      cta: 'DEMANDER UN DEVIS',
      link: '/contact'
    },
    {
      title: 'CONSULTING & STRATÉGIE IA',
      desc: "Tu veux intégrer l'IA dans ton business mais tu ne sais pas par où commencer ? Je t'accompagne : audit, stratégie, implémentation. Du diagnostic à l'action.",
      icon: Settings,
      color: 'text-gold-light',
      bg: 'bg-gold/10',
      border: 'border-gold/20',
      cta: 'RÉSERVER UN APPEL',
      link: '/contact'
    },
    {
      title: 'PRODUCTION VIDÉO IA',
      desc: "Spots publicitaires, vidéos corporate, contenus cinématographiques — produits entièrement avec l'intelligence artificielle. Qualité studio, budget divisé par 10.",
      icon: Video,
      color: 'text-coral-light',
      bg: 'bg-coral/10',
      border: 'border-coral/20',
      cta: 'VOIR MES RÉALISATIONS',
      link: '/services/video-ia'
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-white border-y border-black/5 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-blue/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none animate-pulse-slow" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-5 lg:sticky top-32">
            <Reveal direction="left">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-blue/20 glass-premium text-blue text-[10px] font-bold tracking-[0.2em] uppercase mb-8 shadow-sm">
                Mes Services
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#0a0a0a] tracking-tight mb-8 leading-[1.1]">
                Tu n'as pas besoin de<br /><span className="text-gradient-blue block mt-2">tout faire seul.</span>
              </h2>
              <p className="text-[#525252] text-[16px] sm:text-[18px] leading-[1.8] mb-10 font-inter">
                Tu veux que quelqu'un fasse le travail pour toi ? Ou avec toi ? Que ce soit pour un site web ultra-performant, une stratégie IA sur mesure, ou un système d'automatisation complet — <strong className="text-[#0a0a0a] font-bold">mon équipe et moi, on délivre.</strong>
              </p>

              <div className="hidden lg:block w-32 h-px bg-gradient-to-r from-blue/20 to-transparent" />
            </Reveal>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {services.map((s, i) => (
              <Reveal key={i} direction="up" delay={i * 0.1}>
                <div className="card-luxury bg-[#fafafa] rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row gap-8 sm:items-center group hover:-translate-y-1 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-black/5 card-hover-lift glow-hover">
                  <div className={`w-20 h-20 shrink-0 rounded-2xl ${s.bg} border ${s.border} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm bg-white glow-white`}>
                    <s.icon className={`w-10 h-10 ${s.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-extrabold text-xl text-[#0a0a0a] mb-4 tracking-tight leading-tight">{s.title}</h3>
                    <p className="text-[#525252] text-[15px] leading-[1.7] mb-8 font-inter">{s.desc}</p>
                    <Link to={s.link} className="btn-premium inline-flex items-center gap-3 text-[#0a0a0a] hover:text-[#0a0a0a] font-bold text-[12px] group/btn tracking-[0.1em] uppercase border border-black/10 px-6 py-3 rounded-lg bg-white shadow-sm hover:bg-gold hover:border-gold hover:shadow-md transition-all duration-400">
                      {s.cta} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */
function TestimonialsSection() {
  const testimonials = [
    { name: 'Abdoulaye K.', role: 'Sénégal', formation: 'Protocole Vidéo IA', text: "Grâce à Protocole Vidéo IA, j'ai décroché mon premier client à 500 000 FCFA en 3 semaines. La qualité de ce qu'on peut produire bluffe tout le monde.", avatar: 'AK' },
    { name: 'Marie-Claire D.', role: 'Côte d\'Ivoire', formation: 'Le Cerveau Augmenté', text: "Le Cerveau Augmenté a libéré 15h dans ma semaine. Je gère ma boîte et ma création de contenu sans être épuisée. Un système redoutable.", avatar: 'MD' },
    { name: 'Ibrahim M.', role: 'Cameroun', formation: 'Offshore Empire', text: "J'ai pu créer ma boîte au UK et ouvrir mon compte Stripe depuis Douala en quelques jours sans prise de tête. Oumarou va droit au but.", avatar: 'IM' },
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden section-dark">
      <div className="absolute inset-0 bg-grid-dark opacity-60" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/10 blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={0.1}>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/15 bg-white/10 text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase mb-8 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-gold text-gold" /> Success Stories
            </div>
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-6">
              Ils ont franchi <span className="text-gold">le pas.</span>
            </h2>
            <p className="text-white/65 text-[16px] sm:text-[18px] max-w-2xl mx-auto font-inter">Ce que disent ceux qui sont passés de l'idée à l'<strong className="text-white font-bold">exécution</strong>.</p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <Reveal key={i} direction="up" delay={i * 0.15}>
              <div className="bg-white/8 backdrop-blur-sm border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl p-10 group flex flex-col h-full relative overflow-hidden hover:border-gold/30 transition-all card-hover-lift glow-hover">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center gap-1.5 mb-8">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-gold fill-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]" />)}
                </div>

                <p className="text-white/85 font-medium text-[16px] leading-[1.8] mb-10 flex-1 font-inter italic relative z-10">"{item.text}"</p>

                <div className="flex gap-4 items-center pt-6 border-t border-white/10 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/15 shrink-0 group-hover:border-gold/50 group-hover:bg-gold/20 transition-colors">
                    <span className="text-white font-extrabold text-[14px]">{item.avatar}</span>
                  </div>
                  <div>
                    <p className="text-white font-extrabold text-[15px]">{item.name}</p>
                    <p className="text-white/50 text-[12px] uppercase tracking-wider font-bold">{item.role} • <span className="text-gold">{item.formation}</span></p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ BOOKS & PRODUCTS ═══════════════════════ */
function BooksProducts() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden border-t border-black/5">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/4 h-[500px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={0.1}>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-10 mb-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gold/20 glass-premium text-gold-dark text-[10px] font-bold tracking-[0.2em] uppercase mb-8 shadow-sm">
                <Book className="w-3.5 h-3.5" /> Livres & Guides
              </div>
              <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#0a0a0a] tracking-tight mb-6">L'expertise, <span className="text-gradient-gold">condensée.</span></h2>
              <p className="text-[#525252] text-[16px] sm:text-[18px] leading-[1.8] font-inter">
                Des guides pratiques écrits pour ceux qui n'ont pas le temps. Chaque livre résout un problème précis et donne un plan d'action immédiat.
              </p>
            </div>
            <Link to="/livres" className="btn-premium inline-flex shrink-0 items-center justify-center gap-3 border border-black/10 glass-premium text-[#0a0a0a] font-bold text-[12px] tracking-[0.1em] uppercase px-8 py-4.5 rounded-xl hover:bg-white hover:text-[#0a0a0a] shadow-sm hover:border-gold transition-all duration-300 group/btn">
              Voir tous mes livres <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
          {/* Product 1 */}
          <Reveal direction="up" delay={0.2}>
            <div className="card-luxury bg-[#fafafa] border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-3xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8 group card-hover-lift glow-hover h-full">
              <div className="w-32 h-44 bg-white rounded-xl shrink-0 border border-black/5 flex items-center justify-center text-[#0a0a0a]/30 shadow-md group-hover:-translate-y-2 group-hover:rotate-2 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <img src="/Le Cerveau Augmenté .webp" alt="Livre Le Cerveau Augmenté" width={128} height={176} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="text-center sm:text-left flex-1 flex flex-col h-full">
                <div className="mb-4">
                  <h3 className="text-[#0a0a0a] font-heading font-extrabold text-2xl mb-2 leading-tight tracking-tight">Le Cerveau Augmenté</h3>
                  <div className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold uppercase tracking-wider mb-2">Disponible</div>
                  <p className="text-[#525252] text-sm leading-relaxed font-inter">Le système mental complet pour maîtriser l'IA, incluant un catalogue de 200 prompts stratégiques.</p>
                </div>
                <div className="mt-auto">
                  <p className="text-gold font-mono font-bold text-[18px] mb-4">4 900 FCFA</p>
                  <a href="https://academy.oumarousanda.com/cerveau-augmente" target="_blank" rel="noopener noreferrer" className="btn-premium inline-block w-full sm:w-auto text-[12px] font-bold uppercase tracking-[0.1em] text-white bg-[#0a0a0a] shadow-md px-6 py-3 rounded-lg hover:bg-gold transition-colors text-center">Télécharger</a>
                </div>
              </div>
            </div>
          </Reveal>
          {/* Product 2 */}
          <Reveal direction="up" delay={0.3}>
            <div className="card-luxury bg-[#fafafa] border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-3xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8 group card-hover-lift glow-hover h-full">
              <div className="w-32 h-44 bg-white rounded-xl shrink-0 border border-black/5 flex items-center justify-center text-[#0a0a0a]/30 shadow-md group-hover:-translate-y-2 group-hover:rotate-2 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <img src="/Mockup livre.webp" alt="Livre Si l'Afrique rate l'IA" width={128} height={176} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="text-center sm:text-left flex-1 flex flex-col h-full">
                <div className="mb-4">
                  <h3 className="text-[#0a0a0a] font-heading font-extrabold text-2xl mb-2 leading-tight tracking-tight">Si l'Afrique rate l'IA...</h3>
                  <div className="inline-block px-2 py-0.5 bg-gold/15 text-gold-dark rounded text-[10px] font-bold uppercase tracking-wider mb-2">En précommande</div>
                  <p className="text-[#525252] text-sm leading-relaxed font-inter">Un essai-manifeste sur la souveraineté numérique africaine (Sortie en mai 2026).</p>
                </div>
                <div className="mt-auto">
                  <p className="text-gold font-mono font-bold text-[18px] mb-4">19,99 €</p>
                  <Link to="/livres#livre-01" className="btn-premium inline-block w-full sm:w-auto text-[12px] font-bold uppercase tracking-[0.1em] text-white bg-[#0a0a0a] shadow-md px-6 py-3 rounded-lg hover:bg-gold transition-colors text-center">Précommander</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ MEDIA & PODCAST ═══════════════════════ */
function MediaPodcast() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-[#fafafa]">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={0.2}>
          <div className="bg-white border border-black/5 rounded-[3rem] p-10 sm:p-16 lg:p-20 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)] card-luxury">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FF0000]/5 to-transparent pointer-events-none" />

            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-black/5 glass-premium text-[#0a0a0a] text-[10px] font-bold tracking-[0.2em] uppercase mb-8 shadow-sm">
                  <Mic className="w-3.5 h-3.5 text-[#FF0000]" /> Dans les médias
                </div>
                <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-5xl text-[#0a0a0a] tracking-tight mb-8 leading-[1.1]">
                  Pas juste un formateur.<br /><span className="text-[#FF0000]">Une voix.</span>
                </h2>
                <div className="text-[#525252] text-[16px] sm:text-[17px] leading-[1.8] mb-10 font-inter space-y-4">
                  <p>
                    Correspondant pour <strong className="text-[#0a0a0a] font-bold">Vision 4 TV</strong> dans la région de l'Adamaoua depuis 2020.
                  </p>
                  <p>
                    Présent sur YouTube, TikTok, Facebook, Instagram et X avec plus de <strong className="text-[#0a0a0a] font-bold">125 000 abonnés</strong>. Quand l'Afrique francophone veut comprendre où va l'IA et le business digital, c'est ici que ça se passe.
                  </p>
                </div>
                <a href="https://www.youtube.com/channel/UCHWKK_ss4JWCdhnr3TinFuA?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#FF0000] text-white hover:bg-[#CC0000] font-bold px-8 py-4.5 rounded-xl transition-all shadow-[0_10px_30px_rgba(255,0,0,0.3)] uppercase tracking-[0.1em] text-[13px] group">
                  <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" /> S'abonner sur YouTube
                </a>
              </div>

              {/* Vignette YouTube — lien direct sans charger img.youtube.com (3rd-party hit) */}
              <a
                href="https://youtu.be/WPSXX6Bg6Ks?si=3AMzY765vlTpbdMD"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Voir la dernière vidéo YouTube d'Oumarou Sanda"
                className="bg-[#f5f5f7] rounded-[2rem] aspect-video border border-black/5 flex flex-col items-center justify-center relative overflow-hidden group shadow-xl cursor-pointer no-underline"
              >
                <div className="w-20 h-20 bg-[#FF0000] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,0,0,0.4)] group-hover:scale-110 transition-transform duration-500">
                  <Play className="w-8 h-8 text-white ml-2 fill-white" />
                </div>
                <p className="mt-6 text-[#525252] text-[13px] font-bold uppercase tracking-[0.15em]">Voir la vidéo</p>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════ BLOG PREVIEW ═══════════════════════ */
function BlogPreview() {
  const latestPosts = [
    { slug: 'vibe-coding-saas-sans-coder', title: "Vibe Coding : c'est quoi et comment créer un SaaS sans coder", category: 'Vibe Coding', date: '20 Fév 2026', readTime: '15 min', tagColor: 'text-blue bg-blue/10 border-blue/20' },
    { slug: 'creer-videos-ia-google-veo', title: "Créer des vidéos publicitaires avec Google VEO (Guide)", category: 'IA & Outils', date: '18 Fév 2026', readTime: '20 min', tagColor: 'text-coral bg-coral/10 border-coral/20' },
    { slug: 'gagner-argent-ia-2026', title: "5 manières de gagner de l'argent avec l'IA en 2026", category: 'Business', date: '12 Fév 2026', readTime: '18 min', tagColor: 'text-emerald bg-emerald/10 border-emerald/20' },
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-white border-t border-black/5">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={0.1}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald/20 glass-premium text-emerald-600 text-[10px] font-bold tracking-[0.2em] uppercase mb-8 shadow-sm">
                <PenTool className="w-3.5 h-3.5" /> Le Blog
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#0a0a0a] tracking-tight mb-6 leading-[1.1]">
                Analyses. Tutoriels.<br />Stratégies. <span className="text-[#0a0a0a]/30">Sans filtre.</span>
              </h2>
              <p className="text-[#525252] text-[16px] sm:text-[18px] leading-[1.8] font-inter">
                Je décrypte les dernières avancées de l'IA, je partage des stratégies business testées, et je montre comment les appliquer concrètement.
              </p>
            </div>
            <Link to="/blog" className="btn-premium inline-flex shrink-0 items-center gap-3 text-[#0a0a0a] font-bold text-[13px] hover:text-[#0a0a0a] transition-colors duration-300 group uppercase tracking-[0.1em] border border-black/10 px-8 py-4.5 rounded-xl glass-premium hover:bg-white hover:border-gold shadow-sm">
              Lire les articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {latestPosts.map((post, i) => (
            <Reveal key={post.slug} direction="up" delay={i * 0.1}>
              <Link to={`/blog/${post.slug}`} className="card-luxury bg-[#fafafa] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-black/5 rounded-[2rem] p-8 group block h-full relative overflow-hidden hover:bg-white transition-colors card-hover-lift glow-hover">
                <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-bl-[100px] pointer-events-none group-hover:scale-150 transition-transform duration-700" />

                <div className={`inline-flex px-4 py-1.5 bg-white shadow-sm rounded-full text-[10px] font-bold tracking-[0.15em] uppercase border mb-8 ${post.tagColor}`}>
                  {post.category}
                </div>

                <h3 className="font-heading font-extrabold text-2xl text-[#0a0a0a] mb-8 group-hover:text-gold transition-colors duration-300 leading-snug tracking-tight">
                  {post.title}
                </h3>

                <div className="flex items-center gap-6 mt-auto pt-6 border-t border-black/10">
                  <span className="flex items-center gap-2 text-[#737373] text-[12px] font-bold tracking-wider uppercase">
                    <Calendar className="w-4 h-4 text-[#0a0a0a]/30" /> {post.date}
                  </span>
                  <span className="flex items-center gap-2 text-[#737373] text-[12px] font-bold tracking-wider uppercase">
                    <Clock className="w-4 h-4 text-[#0a0a0a]/30" /> {post.readTime}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ CTA FINAL ═══════════════════════ */
function CTAFinal() {
  return (
    <section className="relative py-20 sm:py-32 lg:py-40 overflow-hidden section-dark border-t border-white/5 border-b border-white/5">
      <div className="absolute inset-0 bg-grid-dark opacity-60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] bg-gold/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 text-center z-10">
        <Reveal direction="up" delay={0.2} once={false}>
          <div className="flex flex-col items-center">
            <h2 className="font-heading font-extrabold text-5xl sm:text-7xl text-white mb-8 tracking-tight leading-[1.05] text-center">
              L'IA n'attend pas. <span className="text-gold">Toi non plus.</span>
            </h2>
          </div>
          <p className="text-white/65 text-[18px] sm:text-[20px] mb-14 max-w-2xl mx-auto font-inter">
            Que tu veuilles te former, lancer un business digital, ou intégrer l'IA dans ton activité existante — le moment, c'est maintenant. <strong className="text-white font-bold">Pas lundi. Maintenant.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link to="/formations" className="btn-premium group px-10 py-5 bg-gold text-[#0a0a0a] font-bold text-[14px] rounded-xl hover:bg-white transition-all flex items-center justify-center gap-3 uppercase tracking-[0.1em] shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] glow-hover">
              Commencer maintenant <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <Link to="/contact" className="px-10 py-5 border border-white/20 text-white font-bold text-[14px] rounded-xl hover:bg-white/10 transition-colors shadow-sm flex items-center justify-center uppercase tracking-[0.1em]">
              Discuter d'un projet
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════ NEWSLETTER ═══════════════════════ */
function Newsletter() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-blue/5 blur-[100px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 lg:p-16 rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-r from-blue/5 to-violet/5 border border-black/5 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] bg-white/80 backdrop-blur-xl">
          <div className="flex-1 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start items-center gap-4 text-[#0a0a0a] font-heading font-extrabold text-3xl sm:text-4xl mb-6">
              <Mail className="w-10 h-10 text-blue" />
              Rejoins +10 000 visionnaires
            </div>
            <p className="text-[#525252] text-[16px] sm:text-[18px] max-w-2xl lg:max-w-xl font-inter">
              Reçois mes stratégies IA chaque semaine. Pas de spam. Pas de blabla. Juste des tactiques, des outils et des opportunités introuvables ailleurs.
            </p>
          </div>
          <div className="w-full lg:w-auto">
            <form className="flex flex-col sm:flex-row w-full lg:w-[450px] gap-3 p-2 bg-white/80 backdrop-blur-md rounded-2xl border border-black/5 shadow-sm" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Ton adresse email premium"
                className="flex-1 bg-transparent text-[#0a0a0a] px-6 py-4 outline-none text-[15px] font-inter placeholder:text-[#a3a3a3]"
                required
              />
              <button type="submit" className="bg-[#0a0a0a] hover:bg-gold text-white font-bold text-[13px] tracking-[0.1em] uppercase px-8 py-4 rounded-xl transition-colors whitespace-nowrap shadow-md">
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ HOME ═══════════════════════ */
export default function HomePage() {
  return (
    <>
      <SEOHead
        title="Oumarou Sanda | Expert IA, Formateur & Entrepreneur Digital"
        description="Oumarou Sanda aide les entrepreneurs et créateurs africains à maîtriser l'IA pour générer des revenus. Formations, services, outils et stratégies pour bâtir un business digital rentable."
        canonical="/"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": "https://oumarousanda.com/#person",
              "name": "Oumarou Sanda",
              "jobTitle": "Expert Intelligence Artificielle, Formateur, Entrepreneur Digital",
              "url": "https://oumarousanda.com",
              "image": "https://oumarousanda.com/SANDA.webp",
              "sameAs": ["https://www.youtube.com/@Oumarou_Sanda", "https://tiktok.com/@iamsanda", "https://linkedin.com/in/benibsanda", "https://facebook.com/iamoumarousanda"]
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "Qui est Oumarou Sanda ?", "acceptedAnswer": { "@type": "Answer", "text": "Ancien journaliste devenu entrepreneur digital, expert en intelligence artificielle et formateur. Il aide les entrepreneurs et créateurs africains à transformer l'IA en revenus." } },
                { "@type": "Question", "name": "Quelles formations propose-t-il ?", "acceptedAnswer": { "@type": "Answer", "text": "Protocole Vidéo IA, Le Cerveau Augmenté et Offshore Empire pour maîtriser l'IA, la vidéo, et le business délocalisé." } },
                { "@type": "Question", "name": "C'est quoi le vibe coding ?", "acceptedAnswer": { "@type": "Answer", "text": "Une méthode pour créer des produits digitaux en s'appuyant activement sur l'IA et le NLP, sans écrire de code complexe." } }
              ]
            }
          ]
        }}
      />
      <Hero />
      <PartnersSection />
      <StatsBar />
      <PitchTeaser />
      <ProblemSection />
      <FormationsVitrine />
      <ServicesSection />
      <TestimonialsSection />
      <BooksProducts />
      <MediaPodcast />
      <BlogPreview />
      <CTAFinal />
      <Newsletter />
    </>
  );
}
