import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../components/useInView';
import {
  Download, Copy, CheckCircle2, ChevronDown, MonitorPlay, Mic,
  FileText, Presentation, Users, Briefcase, Laptop, Quote, BookOpen, Youtube
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';

export default function MediaPage() {
  const { ref: heroRef, isInView: heroInView } = useInView(0.1);
  const { ref: statsRef, isInView: statsInView } = useInView(0.1);
  const { ref: bioRef, isInView: bioInView } = useInView(0.1);
  const { ref: expertiseRef, isInView: expertiseInView } = useInView(0.1);
  const { ref: timelineRef, isInView: timelineInView } = useInView(0.1);

  const [copiedShort, setCopiedShort] = useState(false);
  const [copiedLong, setCopiedLong] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);


  const copyToClipboard = (text: string, type: 'short' | 'long') => {
    navigator.clipboard.writeText(text);
    if (type === 'short') {
      setCopiedShort(true);
      setTimeout(() => setCopiedShort(false), 2000);
    } else {
      setCopiedLong(true);
      setTimeout(() => setCopiedLong(false), 2000);
    }
  };

  const shortBio = "Oumarou Sanda est un entrepreneur digital, expert en intelligence artificielle et formateur basé au Cameroun. Fondateur de Wendooka (agence web), Sanda Vibe Code (écosystème IA & no-code) et CommentSticker (SaaS), il a formé plus de 500 entrepreneurs africains et fédère une communauté de 112 000+ abonnés. Correspondant pour Vision 4 TV, il est l'auteur de «Si l'Afrique rate l'IA, elle rate le Futur» (mai 2026).";
  const longBio = "Oumarou Sanda est un entrepreneur digital, expert en intelligence artificielle appliquée et créateur de contenus basé à Ngaoundéré, au Cameroun. Ancien journaliste devenu bâtisseur d'écosystèmes numériques, il est reconnu pour sa capacité à vulgariser des technologies complexes et à les transformer en leviers concrets de croissance, de monétisation et d'impact, en particulier en Afrique francophone.\n\nFondateur de Wendooka (agence web et digitale), Sanda Vibe Code (écosystème dédié au vibe coding et au no-code) et CommentSticker (SaaS), il a créé plusieurs programmes de formation suivis par des centaines d'apprenants, dont le Protocole Vidéo IA, Le Cerveau Augmenté et Offshore Empire. Sa communauté cumulée dépasse 112 000 abonnés sur YouTube, TikTok, Facebook, LinkedIn et Instagram. Correspondant régional pour Vision 4 TV dans l'Adamaoua, il est l'auteur de «Si l'Afrique rate l'intelligence artificielle, elle rate le Futur», un essai-manifeste sur la souveraineté numérique africaine (mai 2026) et de «Le Cerveau Augmenté», un ebook-système pour maîtriser l'IA au quotidien.";

  const faqs = [
    { q: "Qui est Oumarou Sanda ?", a: "Oumarou Sanda est un entrepreneur digital, expert en intelligence artificielle et formateur basé à Ngaoundéré, au Cameroun. Fondateur de Wendooka (agence web), Sanda Vibe Code (écosystème IA et no-code) et CommentSticker (SaaS), il a formé plus de 500 entrepreneurs et fédère 112 000+ abonnés. Correspondant pour Vision 4 TV, il est l'auteur de « Si l'Afrique rate l'IA, elle rate le Futur »." },
    { q: "Oumarou Sanda est-il disponible pour des interviews ou conférences ?", a: "Oui, Oumarou Sanda est disponible pour des interviews (presse, radio, TV, podcast), des keynotes, des panels, des ateliers et des tribunes écrites. Ses sujets d'expertise incluent l'intelligence artificielle appliquée, la souveraineté numérique africaine, le vibe coding et l'entrepreneuriat digital en Afrique francophone. Contact : presse@oumarousanda.com. Kit presse téléchargeable sur oumarousanda.com/medias." },
    { q: "Quels sont les sujets d'expertise d'Oumarou Sanda ?", a: "Oumarou Sanda intervient sur six sujets principaux : l'intelligence artificielle appliquée (vidéo IA, assistants IA, automatisation), la souveraineté numérique africaine, le vibe coding et la création de produits digitaux, l'entrepreneuriat digital en Afrique francophone, la création de contenu et les médias sociaux, ainsi que la formation et l'éducation numérique." },
    { q: "Où trouver le kit presse d'Oumarou Sanda ?", a: "Le kit presse d'Oumarou Sanda est téléchargeable gratuitement sur oumarousanda.com/medias. Il contient la biographie officielle (courte et longue), des photos haute résolution, les logos de ses entreprises (Wendooka, Sanda Vibe Code, CommentSticker), les chiffres clés et le contact presse direct." },
    { q: "Pour quel média travaille Oumarou Sanda ?", a: "Oumarou Sanda est correspondant régional pour Vision 4 TV dans la région de l'Adamaoua au Cameroun. Parallèlement, il est créateur de contenus sur YouTube, TikTok, LinkedIn, Facebook et Instagram avec une audience cumulée de 112 000+ abonnés, spécialisé dans l'intelligence artificielle et le business digital." }
  ];

  return (
    <>
      <SEOHead
        title="Médias & Presse | Oumarou Sanda — Expert IA, Conférences & Interviews"
        description="Retrouvez les apparitions médias, interviews, conférences et interventions d'Oumarou Sanda. Expert en intelligence artificielle, entrepreneuriat digital et souveraineté numérique africaine."
        canonical="/medias"
      />
    <div className="bg-[#050505] min-h-screen pt-24 pb-0">

      {/* SECTION 01 — HERO MÉDIAS */}
      <section className="relative py-20 lg:py-32 overflow-hidden border-b border-white/[0.04] section-dark">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid-dark opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.10)_0%,transparent_70%)] opacity-50 blur-3xl pointer-events-none" />

        <div ref={heroRef} className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-left">
              <span className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6">
                Médias & Presse
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[4rem] font-black tracking-tight text-white leading-[1.1] mb-6">
                L'IA racontée par quelqu'un<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] block mt-2">qui la construit.</span>
              </h1>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                Correspondant Vision 4 TV. Créateur suivi par 112 000+ personnes. Auteur de «Si l'Afrique rate l'IA, elle rate le Futur». Formateur de centaines d'entrepreneurs africains. Disponible pour interviews, conférences, panels et collaborations médias.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
                <Link to="/kit-media" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl font-heading font-bold text-sm transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Télécharger le kit presse
                </Link>
                <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] rounded-xl font-heading font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2">
                  <Mic className="w-4 h-4" /> Demander une interview
                </Link>
              </div>

              {/* Logos Bar */}
              <div className="pt-10 border-t border-white/10">
                <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-6">Ils m'ont fait confiance / Réseaux</p>
                <div className="flex flex-wrap items-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <span className="text-white font-heading font-bold text-xl tracking-tight">Vision 4 TV</span>
                  <span className="text-white font-heading font-bold text-xl tracking-tight flex items-center gap-2"><MonitorPlay className="w-6 h-6" /> YouTube</span>
                  <span className="text-white font-heading font-bold text-xl tracking-tight">TikTok</span>
                  <span className="text-white font-heading font-bold text-xl tracking-tight">LinkedIn</span>
                  <span className="text-white font-heading font-bold text-xl tracking-tight italic">Edimakor</span>
                </div>
              </div>
            </motion.div>

            {/* HER RIGHT CONTENT (IMAGE) */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={heroInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1, delay: 0.2 }} className="relative hidden lg:block h-[600px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5">
              <img src="/oumarou-sanda-16.webp" alt="Oumarou Sanda Media" width={600} height={600} loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
            </motion.div>
          </div>
        </div>
      </section>


      {/* SECTION 02 — CHIFFRES CLÉS */}
      <section className="py-12 bg-[#0a0a0a] border-b border-white/[0.04]">
        <div ref={statsRef} className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-2 divide-x divide-white/5"
          >
            <div className="text-center px-4">
              <div className="font-heading font-black text-3xl sm:text-4xl text-[#E84E0E] mb-2 tracking-tighter">125K+</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider">Abonnés multiplateforme</div>
            </div>
            <div className="text-center px-4">
              <div className="font-heading font-black text-3xl sm:text-4xl text-[#E84E0E] mb-2 tracking-tighter">500+</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider">Entrepreneurs formés</div>
            </div>
            <div className="text-center px-4">
              <div className="font-heading font-black text-3xl sm:text-4xl text-[#E84E0E] mb-2 tracking-tighter">6+</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider">Formations créées</div>
            </div>
            <div className="text-center px-4">
              <div className="font-heading font-black text-3xl sm:text-4xl text-[#E84E0E] mb-2 tracking-tighter">2</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider">Livres publiés/en cours</div>
            </div>
            <div className="text-center px-4 col-span-2 md:col-span-1">
              <div className="font-heading font-black text-3xl sm:text-4xl text-[#E84E0E] mb-2 tracking-tighter">3</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider">Entreprises fondées</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 03 — BIO MÉDIA */}
      <section className="py-24 bg-[#050505] relative overflow-hidden">
        <div ref={bioRef} className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={bioInView ? { opacity: 1, y: 0 } : {}} className="mb-12">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">Biographie Presse</h2>
            <p className="text-white/40">Biographies officielles libres de droits pour vos articles et événements.</p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10">
            {/* Photo Column */}
            <div className="lg:col-span-4">
              <div className="bg-[#0a0a0a] border border-white/5 p-4 rounded-3xl sticky top-28">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 relative">
                  <img src="/oumarou-sanda-12.webp" alt="Oumarou Sanda Edition Presse" className="w-full h-full object-cover object-top filter saturate-100" />
                </div>
                <p className="text-white/30 text-xs text-center italic">© Oumarou Sanda - Photo officielle</p>
              </div>
            </div>

            {/* Bios Column */}
            <div className="lg:col-span-8 space-y-8">
              {/* Short Bio */}
              <div className="bg-[#0a0a0a] border border-white/[0.04] p-8 rounded-3xl relative group">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold font-heading text-lg">Bio courte <span className="text-white/30 font-normal text-sm ml-2">(Pour articles et mentions)</span></h3>
                  <button onClick={() => copyToClipboard(shortBio, 'short')} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-all text-xs font-semibold">
                    {copiedShort ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    {copiedShort ? 'Copié !' : 'Copier'}
                  </button>
                </div>
                <p className="text-white/70 leading-relaxed">
                  {shortBio}
                </p>
              </div>

              {/* Long Bio */}
              <div className="bg-[#0a0a0a] border border-white/[0.04] p-8 rounded-3xl relative group">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold font-heading text-lg">Bio longue <span className="text-white/30 font-normal text-sm ml-2">(Pour introductions et keynotes)</span></h3>
                  <button onClick={() => copyToClipboard(longBio, 'long')} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-all text-xs font-semibold">
                    {copiedLong ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    {copiedLong ? 'Copié !' : 'Copier'}
                  </button>
                </div>
                <div className="text-white/70 leading-relaxed space-y-4">
                  {longBio.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04 — SUJETS D'EXPERTISE */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
        <div ref={expertiseRef} className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={expertiseInView ? { opacity: 1, y: 0 } : {}} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">Sujets d'intervention</h2>
            <p className="text-white/50">Les domaines précis sur lesquels je peux apporter une valeur immédiate, documentée et expérientielle à vos audiences.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Laptop, title: "Intelligence artificielle appliquée", desc: "L'IA comme outil concret de création, de productivité et de business — pas comme concept abstrait. Génération vidéo, assistants IA, automatisation des workflows. Regard de praticien." },
              { icon: Presentation, title: "Souveraineté numérique africaine", desc: "L'Afrique face à la révolution IA : dépendance aux GAFAM, infrastructure, données, fuite des cerveaux. Analyse documentée et plaidoyer (auteur de 'Si l'Afrique rate l'IA...')." },
              { icon: MonitorPlay, title: "Vibe coding & produits digitaux", desc: "Créer des SaaS et applications en combinant IA, no-code et logique produit. Fondateur de CommentSticker (SaaS créé par vibe coding) et de l'écosystème Sanda Vibe Code." },
              { icon: Briefcase, title: "Entrepreneuriat digital africain", desc: "Les défis spécifiques (paiement, structure juridique, accès aux plateformes) et les solutions concrètes. Expérience directe de création et de gestion depuis le continent." },
              { icon: Users, title: "Création de contenu & médias", desc: "Construction d'une audience de 112 000+ abonnés en partant de zéro depuis le Cameroun. Stratégies YouTube, TikTok, LinkedIn, monétisation et affiliation." },
              { icon: BookOpen, title: "Formation & éducation numérique", desc: "Conception et vente de programmes de formation en ligne adaptés au marché africain. Retour d'expérience sur plus de 500 apprenants et des tarifs adaptés au contexte local." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={expertiseInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }} className="bg-[#050505] border border-white/[0.05] p-6 rounded-2xl hover:border-gold/30 hover:bg-white/[0.02] transition-colors">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-5"><item.icon className="w-6 h-6 text-gold" /></div>
                <h3 className="font-heading font-bold text-white text-lg mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 05 — APPARITIONS MÉDIAS */}
      <section className="py-24 bg-[#050505] border-t border-white/5">
        <div ref={timelineRef} className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white mb-16 text-center">Dans les médias</h2>

          <div className="space-y-6">
            {/* TV Item */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={timelineInView ? { opacity: 1, x: 0 } : {}} className="bg-[#0a0a0a] border border-white/5 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-full sm:w-32 shrink-0 py-2 sm:py-0 border-b sm:border-b-0 sm:border-r border-white/10 flex flex-row sm:flex-col justify-between sm:justify-start">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2"><MonitorPlay className="inline w-3 h-3 mr-1" /> [TV]</span>
                <span className="text-white/80 font-heading font-semibold">Vision 4 TV</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white font-heading">Correspondant régional Adamaoua</h3>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold rounded">En cours</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">Correspondant régional pour Vision 4 TV. Reportages terrain, couverture d'actualités, production de contenus audiovisuels dans la région de l'Adamaoua.</p>
              </div>
            </motion.div>

            {/* YouTube Item */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={timelineInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] border border-white/5 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-full sm:w-32 shrink-0 py-2 sm:py-0 border-b sm:border-b-0 sm:border-r border-white/10 flex flex-row sm:flex-col justify-between sm:justify-start">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2"><Youtube className="inline w-3 h-3 mr-1" /> [YT]</span>
                <span className="text-white/80 font-heading font-semibold break-words">Oumarou Sanda</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white font-heading">Tutoriels IA & stratégies business</h3>
                  <span className="text-white/30 text-xs italic">2020 - présent</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">Création de contenu éducatif et avancé sur l'intelligence artificielle, la vidéo automatique avec l'IA, le vibe coding et l'entrepreneuriat digital continental.</p>
              </div>
            </motion.div>

            {/* Sponsoring Item */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={timelineInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }} className="bg-[#0a0a0a] border border-white/5 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-full sm:w-32 shrink-0 py-2 sm:py-0 border-b sm:border-b-0 sm:border-r border-white/10 flex flex-row sm:flex-col justify-between sm:justify-start">
                <span className="text-xs font-bold text-[#E84E0E] uppercase tracking-widest mb-2">[SPONSOR]</span>
                <span className="text-white/80 font-heading font-semibold">Edimakor / HitPaw</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white font-heading">Partenariat & Review Outil IA</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">Vidéo sponsorisée de tutoriel et review. Intégration organique dans le contenu éducatif pour présenter les capacités de montage IA aux abonnés.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 06 — KIT PRESSE & SECTION 07 — FORMATS */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Forms of Intervention */}
            <div className="lg:col-span-8">
              <h2 className="font-heading text-3xl font-bold text-white mb-8">Comment travailler avec moi</h2>
              <div className="bg-[#050505] border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02]">
                        <th className="p-5 text-white/50 font-bold text-[11px] uppercase tracking-wider">Format</th>
                        <th className="p-5 text-white/50 font-bold text-[11px] uppercase tracking-wider">Durée</th>
                        <th className="p-5 text-white/50 font-bold text-[11px] uppercase tracking-wider">Détail</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { f: "Interview presse", d: "15-45 min", t: "Presse écrite, radio, TV, podcast. En français ou anglais. Présentiel ou visio." },
                        { f: "Keynote", d: "20-45 min", t: "Conférence principale. Sujets : IA, souveraineté numérique, entrepreneuriat Afrique." },
                        { f: "Panel / Table ronde", d: "45-90 min", t: "Participation à des discussions sur la tech, IA, éducation, et numérique africain." },
                        { f: "Atelier / Workshop", d: "2-4 h", t: "Formation pratique sur l'IA appliquée, vidéo IA ou vibe coding. 10-50 personnes." },
                        { f: "Tribune / Op-ed", d: "500-1500 mots", t: "Contribution écrite pour médias, magazines. Sujets : IA Afrique, souveraineté." },
                        { f: "Podcast / Webinaire", d: "30-90 min", t: "Guest expert. Setup audio et vidéo professionnel directement disponible." },
                        { f: "Ambassadeur marque", d: "Long terme", t: "Partenariat intégré avec une marque ou plateforme IA/tech. Contenu multiplateforme." },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                          <td className="p-5 text-white font-heading font-semibold text-sm whitespace-nowrap">{row.f}</td>
                          <td className="p-5 text-gold text-sm whitespace-nowrap">{row.d}</td>
                          <td className="p-5 text-white/60 text-sm leading-relaxed">{row.t}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-white/40 text-sm mt-6 mb-8 italic">Tous les formats sont disponibles en présentiel ou à distance. Langues : français (natif), anglais (professionnel).</p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white font-bold text-sm transition-all border border-white/10">
                <Mic className="w-4 h-4" /> Demander une intervention
              </Link>
            </div>

            {/* Kit Presse Download */}
            <div className="lg:col-span-4">
              <div className="bg-[#050505] p-8 rounded-3xl border border-white/10 sticky top-28">
                <div className="w-16 h-16 bg-blue/10 rounded-2xl flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8 text-blue" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-4">Kit Presse</h3>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  Tout ce dont un journaliste, un organisateur d'événement ou un partenaire a besoin — en un seul fichier de moins de 20 Mo.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Biographies officielles (courte & longue)', 'Photos haute résolution', 'Logos vectoriels (SVG/PNG)', 'Fiche chiffres clés', 'Couvertures de livres HD'].map((item) => (
                    <li key={item} className="flex gap-3 text-white/70 text-sm items-start">
                      <CheckCircle2 className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href="/kit-presse-oumarou-sanda.zip" download className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-heading font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                  <Download className="w-4 h-4" /> Kit ZIP (Direct)
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 08 — TÉMOIGNAGES (PLACEHOLDER) */}
      <section className="py-24 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center border border-white/5 bg-white/[0.01] p-12 rounded-3xl border-dashed">
          <Quote className="w-12 h-12 text-white/10 mx-auto mb-6" />
          <h2 className="font-heading text-2xl font-bold text-white/30 mb-4">Espace Témoignages & Citations</h2>
          <p className="text-white/20 max-w-lg mx-auto text-sm">Cet espace est réservé pour afficher les retours des partenaires médias, journalistes et collaborateurs.</p>
        </div>
      </section>

      {/* SECTION 09 — CTA FINAL */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-[#0a0a0a] border-t border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#0a0a0a]/90 to-transparent" />
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 text-center">

          <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">
            Une histoire à raconter.<br />
            <span className="text-blue">Un expert disponible.</span>
          </h2>
          <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Que ce soit pour un plateau TV, un podcast, une conférence ou un article — je suis disponible pour partager mon expertise sur l'IA, le business digital et l'avenir numérique de l'Afrique.
          </p>
          <div className="mb-10">
            <span className="text-white/40 text-sm uppercase tracking-widest font-bold">Contact presse :</span>
            <a href="mailto:presse@oumarousanda.com" className="block text-2xl font-heading font-bold text-white hover:text-blue mt-2 transition-colors">presse@oumarousanda.com</a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/kit-presse-oumarou-sanda.zip" download className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl font-heading font-bold text-sm transition-all flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Kit Presse
            </a>
            <Link to="/kit-media" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-gold/20 text-gold hover:bg-gold/10 rounded-xl font-heading font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2">
              Kit Média Complet
            </Link>
            <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] rounded-xl font-heading font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2">
              <Mic className="w-4 h-4" /> Demander une interview
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 10 — FAQ */}
      <section className="py-24 bg-[#050505] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white text-center mb-12">FAQ Médias</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-semibold text-white/90 pr-8 text-sm">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-blue' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-white/60 leading-relaxed text-sm">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
    </>
  );
}
