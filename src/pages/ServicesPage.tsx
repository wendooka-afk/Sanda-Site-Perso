import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import {
    ArrowRight, Globe, Settings, Video, Target,
    CheckCircle2, MessageCircle, Star, ChevronDown
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

/* ═══════════════════════ SEO SCHEMA ═══════════════════════ */
const SERVICES_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "provider": { "@type": "Person", "name": "Oumarou Sanda" },
      "serviceType": "Web Development",
      "areaServed": ["Afrique francophone", "International"],
      "description": "Création de sites web et solutions digitales via l'agence Wendooka (WordPress, tunnels de vente, automatisation, SEO)."
    },
    {
      "@type": "Service",
      "provider": { "@type": "Person", "name": "Oumarou Sanda" },
      "serviceType": "AI Consulting",
      "areaServed": ["Afrique francophone", "International"],
      "description": "Consulting et stratégie IA pour entrepreneurs et entreprises."
    },
    {
      "@type": "Service",
      "provider": { "@type": "Person", "name": "Oumarou Sanda" },
      "serviceType": "AI Video Production",
      "areaServed": ["Afrique francophone", "International"],
      "description": "Production vidéo professionnelle réalisée avec l'intelligence artificielle (Google VEO, Sora, Wan, Higgsfield, ElevenLabs)."
    },
    {
      "@type": "Service",
      "provider": { "@type": "Person", "name": "Oumarou Sanda" },
      "serviceType": "SaaS",
      "areaServed": ["Afrique francophone", "International"],
      "description": "CommentSticker, un SaaS dédié à l'engagement sur les réseaux sociaux."
    },
    {
      "@type": "Organization",
      "name": "Wendooka",
      "url": "https://wendooka.com",
      "founder": { "@type": "Person", "name": "Oumarou Sanda" },
      "foundingDate": "2017",
      "description": "Agence web et digitale spécialisée WordPress, automatisation et solutions orientées performance",
      "areaServed": ["Cameroun", "Afrique francophone"]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://oumarousanda.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://oumarousanda.com/services" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quels services propose Oumarou Sanda ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Oumarou Sanda propose quatre pôles : agence Wendooka (sites web), consulting IA, production vidéo IA, et CommentSticker (SaaS)." }
        },
        {
          "@type": "Question",
          "name": "C'est quoi Wendooka ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Wendooka est une agence web fondée en 2017, spécialisée dans WordPress, tunnels de vente, automatisation et SEO pour PME africaines et internationales." }
        },
        {
          "@type": "Question",
          "name": "Peut-on faire produire des vidéos avec l'IA ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Oui, Oumarou Sanda propose un service de production vidéo entièrement réalisé avec l'IA (Google VEO, Sora, Wan, ElevenLabs) pour spots publicitaires et vidéos corporate." }
        }
      ]
    }
  ]
};

/* ═══════════════════════ HERO ═══════════════════════ */
function HeroServices() {
    return (
        <section id="hero-services" className="relative min-h-[85dvh] flex items-center overflow-hidden section-dark pt-32 pb-20 border-b border-white/5">
            <div className="absolute inset-0 bg-grid-dark opacity-60" />
            <div className="absolute inset-0 bg-noise mix-blend-luminosity opacity-[0.03]" />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-left">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/15 text-gold font-bold text-[11px] tracking-wider uppercase mb-8 shadow-sm">
                            MES SERVICES
                        </div>
                        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.2] mb-8 tracking-tight text-white">
                            Tu n'as pas besoin d'un prestataire.<br />
                            Tu as besoin d'un partenaire qui comprend <span className="text-gold block mt-2">l'IA et le business.</span>
                        </h1>
                        <p className="text-white/65 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10 font-inter">
                            Que tu aies besoin d'un site web qui convertit, d'une stratégie IA sur mesure, de vidéos professionnelles produites avec l'intelligence artificielle, ou d'un outil SaaS — je ne livre pas des fichiers. <strong className="text-white">Je livre des résultats.</strong>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/contact" className="group px-8 py-4 bg-gold text-[#0a0a0a] font-bold text-[14px] rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 uppercase tracking-wider shadow-md hover:shadow-[0_8px_25px_rgba(212,175,55,0.4)]">
                                DEMANDER UN DEVIS GRATUIT <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/contact" className="px-8 py-4 border-2 border-white/25 text-white font-bold text-[14px] rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center uppercase tracking-wider">
                                RÉSERVER UN APPEL STRATÉGIQUE
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative h-[400px] lg:h-[600px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl bg-white/5">
                        <img src="/Oumarou Sanda 8.webp" alt="Oumarou Sanda Services" className="absolute inset-0 w-full h-full object-cover object-center" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex items-center justify-center z-10 w-full">
                <div onClick={() => document.getElementById('service-01')?.scrollIntoView({ behavior: 'smooth' })} className="cursor-pointer">
                    <ChevronDown className="w-6 h-6 text-white/40 hover:text-white transition-colors" />
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════ APERÇU ═══════════════════════ */
function ServicesOverview() {
    const overviews = [
        { id: "01", title: "AGENCE WEB WENDOOKA", desc: "Sites web, tunnels de vente, automatisation", icon: Globe, color: "text-blue-600" },
        { id: "02", title: "CONSULTING & STRATÉGIE IA", desc: "Audit, stratégie, implémentation IA", icon: Settings, color: "text-gold-dark" },
        { id: "03", title: "PRODUCTION VIDÉO IA", desc: "Spots, corporate, cinématographique", icon: Video, color: "text-emerald-600" },
        { id: "04", title: "COMMENTSTICKER (SAAS)", desc: "Engagement réseaux sociaux automatisé", icon: Target, color: "text-coral-600" },
    ];
    return (
        <section className="relative py-16 bg-[#fafafa] border-b border-black/5">
            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {overviews.map((o, i) => (
                        <Reveal key={i} direction="up" delay={i * 0.1}>
                            <div className="p-6 rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/5 hover:border-black/15 group cursor-pointer transition-all hover:shadow-md card-hover-lift" onClick={() => document.getElementById(`service-${o.id}`)?.scrollIntoView({ behavior: 'smooth' })}>
                                <div className="flex justify-between items-start mb-4">
                                    <o.icon className={`w-6 h-6 ${o.color}`} />
                                    <span className="text-[#a3a3a3] font-bold text-lg">{o.id}</span>
                                </div>
                                <h3 className="font-heading font-black text-[#0a0a0a] text-[15px] mb-2">{o.title}</h3>
                                <p className="text-[#525252] text-[13px] mb-6 line-clamp-2 leading-relaxed">{o.desc}</p>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#737373] group-hover:text-gold-dark transition-colors inline-flex items-center gap-1">
                                    En savoir plus <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════ SERVICE 01 ═══════════════════════ */
function ServiceWendo() {
    const features = [
        { title: "Création de sites web professionnels", desc: "WordPress, Elementor, design sur mesure, responsive, optimisé vitesse et conversion. Pas de templates génériques." },
        { title: "Tunnels de vente", desc: "Pages de capture, séquences email, upsells, downsells. Tout le système pour transformer un visiteur en client payant." },
        { title: "Automatisation marketing", desc: "Workflows email, chatbots, CRM, intégrations. On automatise tout ce qui peut l'être pour que tu te concentres sur ton business." },
        { title: "SEO & Référencement", desc: "Audit technique, optimisation on-page, stratégie de contenu, maillage interne. Être visible quand tes clients te cherchent." },
        { title: "Maintenance & Support", desc: "Sécurité, mises à jour, sauvegardes, monitoring. Ton site tourne 24/7 sans que tu y penses." }
    ];

    return (
        <section id="service-01" className="relative py-24 sm:py-32 bg-white overflow-hidden border-b border-black/5">
            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    <Reveal direction="left" delay={0.1}>
                        <div>
                            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">SERVICE 01</span>
                            <h2 className="font-heading text-4xl sm:text-5xl font-black mb-8 leading-tight text-[#0a0a0a]">
                                On ne crée pas des sites vitrines.<br />
                                <span className="text-blue-600">On crée des machines à clients.</span>
                            </h2>
                            <div className="space-y-6 text-[#525252] text-lg mb-10 font-inter">
                                <p>La plupart des entreprises africaines ont un problème. Elles n'existent pas en ligne — ou pire, elles existaient mal. Un site lent, pas optimisé, qui ne convertit personne. Un marketing digital au hasard, sans stratégie ni automatisation.</p>
                                <p><strong className="text-[#0a0a0a]">Wendooka existe pour régler ça.</strong> Depuis 2017, mon agence accompagne des PME, entrepreneurs et organisations à construire une présence digitale qui génère concrètement des clients et des revenus.</p>
                            </div>

                            <div className="mb-10">
                                <h3 className="font-bold text-[#0a0a0a] text-xl mb-6">Ce qu'on fait :</h3>
                                <ul className="space-y-4">
                                    {features.map((f, i) => (
                                        <li key={i} className="flex gap-4 items-start">
                                            <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                                            <div>
                                                <strong className="block text-[#0a0a0a]">{f.title}</strong>
                                                <span className="text-[#737373] text-[14px] leading-relaxed">{f.desc}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-[#f0f4f8] p-8 rounded-2xl mb-10 border border-blue-500/10 shadow-inner">
                                <h3 className="font-bold text-[#0a0a0a] text-xl mb-4">Pourquoi Wendooka et pas une autre agence ?</h3>
                                <p className="text-[#525252] text-[15px] leading-relaxed">
                                    Parce qu'on ne se contente pas de livrer un site. On comprend ton business, tes objectifs, ton marché — et on construit un système digital qui s'intègre dans ta stratégie globale. Et parce que derrière l'agence, il y a un entrepreneur qui utilise exactement les mêmes outils pour son propre business. <strong className="text-[#0a0a0a]">Si ça ne marchait pas, je ne le vendrais pas.</strong>
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Link to="/contact" className="btn-premium px-8 py-4 bg-[#0a0a0a] text-white font-bold text-[14px] rounded-xl hover:bg-blue-600 hover:shadow-[0_15px_40px_rgba(37,99,235,0.4)] transition-all uppercase tracking-wider glow-hover">
                                    DEMANDER UN DEVIS GRATUIT
                                </Link>
                                <a href="https://wendooka.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white border-2 border-black/10 text-[#0a0a0a] font-bold text-[14px] rounded-xl hover:border-black/30 hover:bg-black/5 transition-colors uppercase tracking-wider flex items-center gap-2">
                                    VOIR NOS RÉALISATIONS <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal direction="right" delay={0.1}>
                        <div className="bg-[#fafafa] rounded-[2rem] p-8 lg:p-12 text-[#0a0a0a] shadow-[0_20px_60px_rgba(0,0,0,0.06)] relative border border-black/5 card-luxury card-hover-lift glow-hover">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent blur-2xl rounded-tr-[2rem]" />
                            <Globe className="w-12 h-12 text-blue-500 mb-8" />
                            <h3 className="text-2xl font-black mb-6">Idéal pour :</h3>
                            <ul className="space-y-4 mb-10">
                                {[
                                    "PME et entreprises qui veulent passer au digital (ou y passer correctement)",
                                    "Entrepreneurs et freelances qui ont besoin d'un site qui convertit",
                                    "Organisations et ONG qui veulent une présence professionnelle en ligne",
                                    "Formateurs et coachs qui veulent un tunnel de vente qui génère des inscriptions"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-[#525252] font-medium leading-relaxed">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto">
                                <a href="https://wendooka.com" target="_blank" rel="noopener noreferrer" className="text-[#737373] hover:text-blue-600 transition-colors text-[13px] font-bold tracking-widest uppercase inline-flex items-center gap-1 group">
                                    → wendooka.com <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════ SERVICE 02 ═══════════════════════ */
function ServiceConsulting() {
    const phases = [
        { id: "PHASE 1 : AUDIT", desc: "Où en est ton business aujourd'hui ? Quels processus peuvent être automatisés ? Où l'IA peut avoir le plus d'impact immédiat ? Je fais un diagnostic complet de ton activité pour identifier les leviers IA les plus rentables." },
        { id: "PHASE 2 : STRATÉGIE", desc: "On construit ensemble un plan d'action clair. Quels outils adopter, dans quel ordre, avec quel budget. Pas une présentation PowerPoint — une feuille de route opérationnelle que tu peux exécuter dès le lendemain." },
        { id: "PHASE 3 : IMPLÉMENTATION", desc: "Si tu veux, je reste pour exécuter. Mise en place des outils IA, création des workflows d'automatisation, formation de tes équipes. Le résultat : un business qui tourne plus vite, avec moins de friction, et plus de marge." }
    ];

    return (
        <section id="service-02" className="relative py-24 sm:py-32 bg-[#fafafa] overflow-hidden border-b border-black/5">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-50" />
            <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
                <Reveal direction="up" delay={0.1}>
                    <div className="text-center mb-16">
                        <span className="text-gold-dark font-bold tracking-widest uppercase text-sm mb-4 block">SERVICE 02</span>
                        <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#0a0a0a] mb-8 leading-tight">
                            L'IA ne sert à rien si tu ne sais pas quoi en faire.
                        </h2>
                        <p className="text-[#525252] text-lg max-w-2xl mx-auto font-inter">
                            Tout le monde parle d'intelligence artificielle. Peu de gens savent concrètement comment l'intégrer dans un business existant pour générer plus de revenus, réduire les coûts, et prendre de l'avance sur la concurrence. C'est exactement là que j'interviens. Pas avec de la théorie. <strong className="text-[#0a0a0a]">Avec un diagnostic précis, une stratégie actionnable, et une implémentation concrète.</strong>
                        </p>
                    </div>
                </Reveal>

                <div className="mb-20">
                    <h3 className="font-bold text-2xl text-[#0a0a0a] mb-8 text-center tracking-widest text-sm">Mon approche en <span className="text-gold-dark">3 phases</span></h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {phases.map((p, i) => (
                            <Reveal key={i} direction="up" delay={i * 0.1}>
                                <div className="bg-white border border-black/5 shadow-sm rounded-2xl p-8 hover:border-gold/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all relative group card-hover-lift glow-hover h-full">
                                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-white border border-gold/20 text-gold-dark font-bold rounded-full flex items-center justify-center text-xl shadow-lg z-10 group-hover:scale-110 transition-transform">
                                        {i + 1}
                                    </div>
                                    <h4 className="font-bold text-[#0a0a0a] mb-4 text-lg tracking-wide">{p.id}</h4>
                                    <p className="text-[#525252] text-[14px] leading-relaxed">{p.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-16">
                    <Reveal direction="left" delay={0.1}>
                        <div className="bg-white shadow-sm p-8 md:p-10 rounded-2xl border border-black/5 card-hover-lift">
                            <h3 className="font-bold text-xl text-[#0a0a0a] mb-6">Domaines d'expertise :</h3>
                            <ul className="space-y-4">
                                {[
                                    "Automatisation des workflows business avec l'IA",
                                    "Stratégie de contenu IA (texte, vidéo, audio)",
                                    "Intégration d'outils IA dans les processus existants",
                                    "Vibe coding : création de SaaS et d'outils internes sans code",
                                    "Formation et montée en compétence des équipes sur l'IA"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-[#525252] text-[15px]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-2.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>

                    <Reveal direction="right" delay={0.1}>
                        <div className="flex flex-col gap-6">
                            <div className="bg-red-50 border border-red-100 p-8 rounded-2xl">
                                <h3 className="font-bold text-lg text-red-600 mb-3 tracking-wider">Ce n'est PAS pour toi si :</h3>
                                <p className="text-[#525252] text-[15px] leading-relaxed">
                                    Tu cherches quelqu'un pour te faire un ChatGPT custom en 10 minutes. Mon consulting est pour les entrepreneurs et les organisations qui veulent un avantage compétitif durable — pas un gadget.
                                </p>
                            </div>
                            <div className="bg-gold/5 border border-gold/20 p-8 rounded-2xl flex-1">
                                <h3 className="font-bold text-lg text-gold-dark mb-3 tracking-wider">Idéal pour :</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Entrepreneurs qui atteignent un plafond et veulent scaler avec l'IA",
                                        "PME qui sentent le train passer et veulent agir",
                                        "Organisations, médias et ONG",
                                        "Agences et freelances"
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-2 text-[#0a0a0a] font-medium text-[14px]">
                                            <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Reveal>
                </div>

                <div className="text-center">
                    <Link to="/contact" className="btn-premium inline-flex items-center justify-center px-10 py-5 bg-[#0a0a0a] text-white font-bold text-[15px] rounded-xl hover:bg-gold transition-all uppercase tracking-wider shadow-[0_10px_30px_rgba(10,10,10,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] glow-hover">
                        RÉSERVER UN APPEL STRATÉGIQUE
                    </Link>
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════ SERVICE 03 ═══════════════════════ */
function ServiceVideo() {
    const productions = [
        { title: "Spots publicitaires", desc: "Vidéos de 15 à 60 secondes pour les réseaux sociaux, YouTube Ads, Facebook Ads. Accrocheuses, professionnelles, conçues pour convertir." },
        { title: "Vidéos corporate", desc: "Présentations d'entreprise, vidéos institutionnelles, contenus pour sites web. Positionne ton business comme un acteur sérieux et professionnel." },
        { title: "Contenus cinématographiques", desc: "Courts-métrages, contenus narratifs, vidéos immersives. La puissance émotionnelle du cinéma, alimentée par l'IA." },
        { title: "Vidéos produit / UGC", desc: "Démonstrations de produits, témoignages clients, unboxing. Contenu authentique à grande échelle." }
    ];

    return (
        <section id="service-03" className="relative py-24 sm:py-32 bg-white border-b border-black/5">
            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-5 gap-16 items-center">
                    <Reveal direction="left" delay={0.1} className="lg:col-span-2">
                        <div>
                            <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-4 block">SERVICE 03</span>
                            <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#0a0a0a] mb-6 leading-[1.1]">
                                Qualité studio.<br />Budget divisé par 10.<br />Délai divisé par 5.
                            </h2>
                            <div className="space-y-6 text-[#525252] text-lg mb-10 font-inter">
                                <p>Le monde de la vidéo a changé. L'intelligence artificielle permet aujourd'hui de produire des vidéos publicitaires, corporate et cinématographiques d'une qualité qui aurait coûté des dizaines de milliers d'euros il y a deux ans — en une fraction du temps et du budget.</p>
                                <p>Je ne le dis pas en théorie. C'est ce que je fais au quotidien. C'est ce que j'enseigne dans <strong className="text-[#0a0a0a]">Protocole Vidéo IA</strong>. Et c'est ce que je propose comme service.</p>
                            </div>

                            <div className="bg-[#fafafa] border border-black/5 shadow-sm p-8 rounded-2xl mb-10">
                                <h3 className="font-bold text-[#0a0a0a] mb-4 text-xl">Les outils IA de pointe utilisés :</h3>
                                <div className="flex flex-wrap gap-2">
                                    {["Google VEO", "Sora", "Wan", "Higgsfield", "ElevenLabs", "Midjourney", "Runway"].map(tool => (
                                        <span key={tool} className="px-3 py-1.5 bg-white border border-black/5 shadow-sm rounded-lg text-[12px] font-bold text-[#737373] uppercase tracking-widest">{tool}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Link to="/contact" className="btn-premium px-8 py-4 bg-emerald-600 text-white font-bold text-[14px] rounded-xl hover:bg-emerald-700 transition-all uppercase tracking-wider text-center shadow-[0_10px_30px_rgba(5,150,105,0.3)] glow-hover">
                                    DEMANDER UN DEVIS VIDÉO
                                </Link>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal direction="right" delay={0.1} className="lg:col-span-3">
                        <div>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {productions.map((p, i) => (
                                    <div key={i} className="bg-white shadow-sm border border-emerald-600/10 p-8 rounded-2xl hover:border-emerald-600/30 transition-all card-hover-lift glow-hover">
                                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                                            <Video className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <h4 className="text-[#0a0a0a] font-bold text-lg mb-3">{p.title}</h4>
                                        <p className="text-[#525252] text-[14px] leading-relaxed">{p.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 bg-emerald-50 border border-emerald-100 p-8 rounded-2xl">
                                <h3 className="font-bold text-emerald-700 mb-3 text-lg">Pourquoi me choisir ?</h3>
                                <p className="text-emerald-900/80 text-[15px] leading-relaxed font-medium">Parce que je ne suis pas juste un monteur qui clique sur 'générer'. Je suis un producteur qui comprend le storytelling, le marketing et la stratégie derrière chaque vidéo. Chaque production est pensée pour un objectif business précis.</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════ SERVICE 04 ═══════════════════════ */
function ServiceSaaS() {
    return (
        <section id="service-04" className="relative py-24 sm:py-32 bg-[#fafafa] overflow-hidden border-b border-black/5">
            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <Reveal direction="up" delay={0.1}>
                        <div className="relative">
                            <div className="aspect-square md:aspect-[4/3] bg-white rounded-[2rem] shadow-xl border border-black/5 flex items-center justify-center p-8 text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-coral-500/10 to-transparent opacity-50" />
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-20 h-20 bg-coral-500 rounded-2xl flex items-center justify-center shadow-lg shadow-coral-500/30 mb-6">
                                        <MessageCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-[#0a0a0a] font-black text-3xl mb-4">CommentSticker</h3>
                                    <p className="text-[#737373] text-[14px] font-bold tracking-widest uppercase">SaaS propulsé par l'IA</p>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal direction="right" delay={0.1}>
                        <div>
                            <span className="text-coral-600 font-bold tracking-widest uppercase text-sm mb-4 block">SERVICE 04 / PRODUIT SAAS</span>
                            <h2 className="font-heading text-4xl sm:text-5xl font-black mb-8 leading-[1.1] text-[#0a0a0a]">
                                La preuve que le <span className="text-coral-600">vibe coding</span> fonctionne.<br />Et qu'il peut fonctionner pour toi.
                            </h2>
                            <div className="space-y-6 text-[#525252] text-lg mb-10 font-inter">
                                <p>CommentSticker n'est pas juste un outil. C'est la démonstration vivante de ce que j'enseigne : qu'on peut créer un SaaS fonctionnel, utile et rentable avec l'IA et le no-code, sans être développeur.</p>
                                <p>C'est un produit que j'ai construit moi-même en utilisant exactement les méthodes que j'enseigne dans Sanda Vibe Code. Si tu veux une preuve concrète que le vibe coding n'est pas du bullshit — la voilà.</p>
                            </div>

                            <div className="bg-coral-50 border border-coral-200 p-8 rounded-2xl mb-10">
                                <h3 className="font-bold text-coral-600 mb-3 text-lg tracking-wider">Pourquoi c'est sur cette page :</h3>
                                <p className="text-coral-900/80 text-[15px] font-medium leading-relaxed">CommentSticker n'est pas seulement un produit SaaS. C'est aussi un service. Parce qu'il résout un problème concret pour les créateurs de contenu et les entrepreneurs (engagement automatisé, gestion de communauté). Et parce qu'il prouve que les méthodes de l'écosystème Sanda Vibe Code fonctionnent dans la réalité.</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="https://commentsticker.com" target="_blank" rel="noopener noreferrer" className="btn-premium px-8 py-4 bg-coral-600 text-white font-bold text-[14px] rounded-xl hover:bg-coral-700 transition-all uppercase tracking-wider text-center shadow-[0_10px_30px_rgba(244,114,102,0.3)] glow-hover">
                                    DÉCOUVRIR COMMENTSTICKER
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════ PROCESS ═══════════════════════ */
function ProcessSection() {
    const steps = [
        { id: "01", title: "APPEL DÉCOUVERTE", desc: "On parle de ton projet, de tes objectifs, de tes contraintes. Pas un pitch de vente — un vrai échange pour comprendre si on est les bons pour toi. 30 minutes. Gratuit. Sans engagement." },
        { id: "02", title: "PROPOSITION & DEVIS", desc: "Tu reçois une proposition détaillée : scope précis, livrables, délais, tarif. Tout est écrit noir sur blanc. Pas de frais cachés, pas de surprises." },
        { id: "03", title: "EXÉCUTION & SUIVI", desc: "On bosse. Tu as un point de contact dédié, des mises à jour régulières, et un accès direct pour tes retours. Pas de téléphone arabe — communication directe." },
        { id: "04", title: "LIVRAISON & SUPPORT", desc: "Livraison dans les délais convenus. Formation à l'utilisation si nécessaire. Et un support post-livraison pour s'assurer que tout fonctionne parfaitement." },
    ];

    return (
        <section className="relative py-24 sm:py-32 section-blue border-b border-blue-200/60">
            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                <Reveal direction="up" delay={0.1}>
                    <div className="text-center mb-16">
                        <span className="text-blue-700 font-bold tracking-widest uppercase text-sm mb-4 block">LE PROCESSUS</span>
                        <h2 className="font-heading text-3xl sm:text-5xl font-black text-[#0a0a0a] mb-6">
                            Simple. Clair.<br /><span className="text-gold-dark">Sans mauvaise surprise.</span>
                        </h2>
                    </div>
                </Reveal>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, i) => (
                        <Reveal key={i} direction="up" delay={i * 0.1}>
                            <div className="relative">
                                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-px bg-blue-200 -z-10" />
                                <div className="bg-white border border-blue-100 rounded-3xl p-8 hover:border-blue-300 shadow-sm h-full flex flex-col items-center text-center transition-all hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] card-hover-lift glow-hover">
                                    <div className="w-16 h-16 bg-white border border-gold/20 rounded-2xl flex items-center justify-center text-gold-dark font-black text-2xl mb-8 shadow-sm">
                                        {step.id}
                                    </div>
                                    <h3 className="text-[#0a0a0a] font-bold text-lg mb-4">{step.title}</h3>
                                    <p className="text-[#525252] text-[14px] leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════ TESTIMONIALS SERVICES ═══════════════════════ */
function TestimonialsServices() {
    const testimonials = [
        { name: "Entreprise E-commerce", service: "Agence Wendooka", text: "Wendooka a créé notre site e-commerce en 3 semaines. Nos ventes en ligne ont augmenté de 200% le premier mois. Un travail d'une précision et d'une rapidité redoutables.", logo: "E" },
        { name: "CEO Cabinet de Conseil", service: "Consulting IA", text: "L'audit IA d'Oumarou nous a permis de diviser notre temps de traitement de dossiers par deux. Sa stratégie n'est pas abstraite, elle s'applique le jour même.", logo: "C" },
        { name: "Fondateur Startup", service: "Production Vidéo IA", text: "Notre spot publicitaire généré par IA coûte une fraction de ce que les agences classiques demandaient, avec un rendu visuel bluffant qui a fait exploser notre ROAS.", logo: "S" }
    ];

    return (
        <section className="relative py-24 sm:py-32 section-dark overflow-hidden border-b border-white/5">
            <div className="absolute inset-0 bg-grid-dark opacity-60" />
            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                <Reveal direction="up" delay={0.1}>
                    <div className="text-center mb-16">
                        <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">TÉMOIGNAGES</span>
                        <h2 className="font-heading text-3xl sm:text-5xl font-black text-white mb-6">
                            Les résultats parlent mieux<br />que les promesses.
                        </h2>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {testimonials.map((t, i) => (
                        <Reveal key={i} direction="up" delay={i * 0.1}>
                            <div className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:border-gold/30 transition-all shadow-[0_10px_40px_rgba(0,0,0,0.1)] card-hover-lift glow-hover h-full">
                                <div>
                                    <div className="flex items-center gap-1 mb-6">
                                        {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-gold fill-gold" />)}
                                    </div>
                                    <p className="text-white/80 text-[15px] italic leading-relaxed mb-8 font-serif">"{t.text}"</p>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/15 shrink-0">
                                        <span className="font-bold text-white">{t.logo}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{t.name}</h4>
                                        <p className="text-gold text-[12px] uppercase tracking-wider font-bold">{t.service}</p>
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

/* ═══════════════════════ TARIFICATION ═══════════════════════ */
function PricingPhilosophy() {
    const rows = [
        { service: "Site web professionnel", price: "Sur devis", delay: "2-4 semaines" },
        { service: "Tunnel de vente complet", price: "Sur devis", delay: "1-3 semaines" },
        { service: "Consulting IA (audit + stratégie)", price: "Sur devis", delay: "1-2 semaines" },
        { service: "Accompagnement IA (3 mois)", price: "Sur devis", delay: "3 mois" },
        { service: "Spot publicitaire IA (30-60s)", price: "Sur devis", delay: "3-7 jours" },
        { service: "Vidéo corporate IA", price: "Sur devis", delay: "1-2 semaines" },
    ];

    return (
        <section className="relative py-24 sm:py-32 bg-white border-b border-black/5">
            <div className="relative max-w-4xl mx-auto px-5 sm:px-6">
                <Reveal direction="up" delay={0.1}>
                    <div className="text-center mb-16">
                        <span className="text-gold-dark font-bold tracking-widest uppercase text-sm mb-4 block">INVESTISSEMENT</span>
                        <h2 className="font-heading text-3xl sm:text-5xl font-black text-[#0a0a0a] mb-6">
                            Pas de prix cachés.<br />Pas de mauvaises surprises.
                        </h2>
                    </div>
                </Reveal>

                <Reveal direction="up" delay={0.2}>
                    <div className="overflow-x-auto rounded-2xl border border-black/10 mb-8 bg-[#fafafa] shadow-[0_10px_40px_rgba(0,0,0,0.04)] card-hover-lift">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black/5 border-b border-black/10 uppercase tracking-widest text-[11px] font-bold text-[#737373]">
                                    <th className="p-5 min-w-[200px]">Service</th>
                                    <th className="p-5">Prérequis / Investissement</th>
                                    <th className="p-5">Délai moyen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((r, i) => (
                                    <tr key={i} className="border-b border-black/5 hover:bg-black/[0.02] transition-colors last:border-b-0">
                                        <td className="p-5 font-bold text-[#0a0a0a] text-[15px]">{r.service}</td>
                                        <td className="p-5 text-gold-dark font-black">{r.price}</td>
                                        <td className="p-5 text-[#525252] font-medium">{r.delay}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
                        <p className="text-blue-900/80 text-[14px] leading-relaxed font-medium">
                            Chaque projet est unique. Les tarifs sont déterminés sur devis car le tarif final dépend de la complexité, du volume et de tes objectifs spécifiques. L'appel découverte est gratuit et sans engagement.
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* ═══════════════════════ CTA FINAL ═══════════════════════ */
function CTAFinalServices() {
    return (
        <section className="relative py-16 sm:py-24 lg:py-32 section-dark overflow-hidden text-center border-b border-white/5">
            <div className="absolute inset-0 bg-grid-dark opacity-60" />
            <div className="relative max-w-3xl mx-auto px-5 sm:px-6">
                <Reveal direction="up" delay={0.1}>
                    <div>
                        <h2 className="font-heading text-5xl sm:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                            Tu as un projet ?<br /><span className="text-gold">Parlons-en.</span>
                        </h2>
                        <p className="text-white/65 text-xl font-medium mb-12 max-w-2xl mx-auto">
                            Que ce soit pour un site web, une stratégie IA, une vidéo ou un SaaS — la première étape, c'est un appel. 30 minutes. Gratuit. Et tu sauras exactement comment on peut t'aider.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact" className="btn-premium px-10 py-5 bg-gold text-[#0a0a0a] font-bold text-[15px] rounded-xl hover:bg-white transition-all uppercase tracking-wider shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] glow-hover">
                                RÉSERVER MON APPEL GRATUIT
                            </Link>
                            <a href="mailto:contact@oumarousanda.com" className="px-10 py-5 bg-white/10 border border-white/20 text-white font-bold text-[15px] rounded-xl hover:bg-white/20 transition-colors uppercase tracking-wider">
                                ME CONTACTER PAR EMAIL
                            </a>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* ═══════════════════════ FAQ SCHEMA ═══════════════════════ */
function FAQServices() {
    const faqs = [
        { q: "Quels services propose Oumarou Sanda ?", a: "Oumarou Sanda propose quatre pôles de services : la création de sites web et solutions digitales via son agence Wendooka (WordPress, tunnels de vente, automatisation, SEO), le consulting et la stratégie IA pour entrepreneurs et entreprises, la production vidéo professionnelle réalisée avec l'intelligence artificielle, et CommentSticker, un SaaS dédié à l'engagement sur les réseaux sociaux." },
        { q: "C'est quoi Wendooka ?", a: "Wendooka est une agence web et digitale fondée par Oumarou Sanda en 2017. Spécialisée dans la création de sites web professionnels sous WordPress, les tunnels de vente, l'automatisation marketing et le SEO, elle accompagne des PME, entrepreneurs et organisations en Afrique francophone et à l'international." },
        { q: "Peut-on faire produire des vidéos avec l'intelligence artificielle ?", a: "Oui, Oumarou Sanda propose un service de production vidéo entièrement réalisé avec l'intelligence artificielle. Il utilise des outils de pointe comme Google VEO, Sora, Wan, Higgsfield et ElevenLabs pour produire des spots publicitaires, vidéos corporate et contenus cinématographiques de qualité professionnelle, à une fraction du coût traditionnel." },
        { q: "C'est quoi CommentSticker ?", a: "CommentSticker est un SaaS (logiciel en ligne) créé par Oumarou Sanda en 2026. C'est un outil d'engagement pour les réseaux sociaux, construit avec les méthodes du vibe coding (IA + no-code). Il est disponible sur commentsticker.com." },
        { q: "Comment réserver un appel stratégique avec Oumarou Sanda ?", a: "Tu peux réserver un appel découverte gratuit de 30 minutes directement sur la page Services de oumarousanda.com. Cet appel permet de discuter de ton projet, d'identifier tes besoins et de voir comment Oumarou et son équipe peuvent t'aider." },
        { q: "Oumarou Sanda travaille-t-il avec des clients hors du Cameroun ?", a: "Oui, Oumarou Sanda travaille avec des clients dans toute l'Afrique francophone et à l'international. Ses services sont 100% digitaux : sites web, consulting IA, production vidéo et SaaS sont accessibles depuis n'importe où dans le monde." }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-20 bg-white border-t border-black/5">
            <div className="max-w-3xl mx-auto px-5 sm:px-6">
                <h2 className="text-2xl font-black text-[#0a0a0a] mb-8 text-center tracking-widest text-sm uppercase">Questions Fréquentes</h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-black/5 rounded-2xl bg-[#fafafa] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-[#0a0a0a] hover:bg-black/5 transition-colors">
                                {faq.q}
                                <ChevronDown className={`w-5 h-5 text-[#a3a3a3] transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-[#525252] text-[15px] leading-relaxed">
                                        <div className="pt-2 border-t border-black/5">{faq.a}</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════ SERVICES PAGE ═══════════════════════ */
export default function ServicesPage() {
    return (
        <>
        <SEOHead
            title="Services | Agence Web, Consulting IA & Production Vidéo — Oumarou Sanda"
            description="Besoin d'un site web professionnel, d'une stratégie IA ou de vidéos produites avec l'intelligence artificielle ? Découvrez les services d'Oumarou Sanda : agence Wendooka, consulting IA, production vidéo IA et CommentSticker."
            canonical="/services"
            ogTitle="Services d'Oumarou Sanda — Agence Web IA, Consulting & Production Vidéo"
            schema={SERVICES_SCHEMA}
        />
            <HeroServices />
            <ServicesOverview />
            <ServiceWendo />
            <ServiceConsulting />
            <ServiceVideo />
            <ServiceSaaS />
            <ProcessSection />
            <TestimonialsServices />
            <PricingPhilosophy />
            <CTAFinalServices />
            <FAQServices />
        </>
    );
}
