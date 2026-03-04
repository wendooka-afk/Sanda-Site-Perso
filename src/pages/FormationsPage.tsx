import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import {
  ArrowRight, Globe, CheckCircle2,
  Star, ChevronDown
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

/* ═══════════════════════ SEO SCHEMA ═══════════════════════ */
const FORMATIONS_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Course", "name": "Protocole Vidéo IA", "provider": { "@type": "Person", "name": "Oumarou Sanda", "url": "https://oumarousanda.com" }, "inLanguage": "fr", "offers": { "@type": "Offer", "price": "7590", "priceCurrency": "XAF" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "reviewCount": "113" }, "educationalLevel": "Beginner/Intermediate", "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online" } },
    { "@type": "Course", "name": "Offshore Empire", "provider": { "@type": "Person", "name": "Oumarou Sanda", "url": "https://oumarousanda.com" }, "inLanguage": "fr", "offers": { "@type": "Offer", "price": "97750", "priceCurrency": "XAF" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "reviewCount": "20" }, "educationalLevel": "Intermediate", "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online" } },
    { "@type": "Product", "name": "Le Cerveau Augmenté", "description": "Système mental pour penser et produire avec l'IA", "offers": { "@type": "Offer", "price": "4900", "priceCurrency": "XAF" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "reviewCount": "3" }, "brand": "Oumarou Sanda" },
    { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://oumarousanda.com" }, { "@type": "ListItem", "position": 2, "name": "Formations", "item": "https://oumarousanda.com/formations" }] },
    {
      "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "Quelles formations propose Oumarou Sanda ?", "acceptedAnswer": { "@type": "Answer", "text": "Protocole Vidéo IA (7 590 FCFA), Le Cerveau Augmenté (4 900 FCFA) et Offshore Empire (97 750 FCFA)." } },
        { "@type": "Question", "name": "C'est quoi le Protocole Vidéo IA ?", "acceptedAnswer": { "@type": "Answer", "text": "Une formation pour créer des vidéos ultra-réalistes avec l'IA : Google VEO, Sora et Wan." } },
        { "@type": "Question", "name": "Comment créer une société au Royaume-Uni depuis l'Afrique ?", "acceptedAnswer": { "@type": "Answer", "text": "La formation Offshore Empire montre comment créer une Private Limited Company (Ltd) UK depuis l'Afrique pour activer Stripe ou PayPal." } }
      ]
    }
  ]
};

/* ═══════════════════════ HERO ═══════════════════════ */
function FormationsHero() {
  return (
    <section className="relative pt-32 pb-20 section-dark overflow-hidden min-h-[70dvh] flex items-center border-b border-white/5">
      <div className="absolute inset-0 bg-grid-dark opacity-60" />
      <div className="absolute inset-0 bg-noise mix-blend-luminosity opacity-[0.03]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/15 text-gold font-medium text-[11px] tracking-wider uppercase mb-8 shadow-sm">
              MES FORMATIONS
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.2] mb-6 tracking-tight text-white">
              Apprends. Applique.<br />
              <span className="text-gold block mt-2">Génère des revenus.</span>
            </h1>
            <p className="text-white/65 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10 font-inter">
              Chaque formation résout un problème précis et délivre un résultat concret. Pas de remplissage. Pas de théorie inutile. <strong className="text-white font-bold">Tu apprends, tu fais, tu gagnes.</strong> Prix adaptés au marché africain. Accès immédiat.
            </p>
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-white/50 text-[13px] font-bold tracking-widest uppercase">
              <span>130+ apprenants</span>
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              <span>100% avis positifs</span>
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              <span>5 programmes</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative h-[400px] lg:h-[600px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl bg-white/5">
            <img src="/Oumarou Sanda CEO Wendooka 12.webp" alt="Oumarou Sanda Formations" className="absolute inset-0 w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ FORMATION 01 : VIDÉO IA ═══════════════════════ */
function FormationVideoIA() {
  const modules = [
    { title: "MODULE 1 : L'Arsenal", desc: "Setup & Accès. Configure tes outils et accède aux plateformes avant tout le monde." },
    { title: "MODULE 2 : Le Code Source", desc: "Prompting Avancé. Comment parler à l'IA pour qu'elle obéisse au doigt et à l'œil. La méthode Neuronal Prompting." },
    { title: "MODULE 3 : Le Workflow Business", desc: "Créer des vidéos pour l'e-commerce, les services, les clients. Transformation en machine à revenus." },
    { title: "MODULE 4 : Viralité & Réseaux Sociaux", desc: "Les formats qui cartonnent. Vidéos choc, paranormal, scènes impossibles. Exploser sur TikTok et Reels." },
    { title: "MODULE 5 : Études de Cas", desc: "Dans les coulisses. Je crée une campagne rentable sous tes yeux, de A à Z." },
    { title: "MISES À JOUR FUTURES", desc: "Sora 2, Wan 2.5 et nouveaux outils. Inclus gratuitement à vie." }
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#fafafa] overflow-hidden border-t border-black/5">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          <Reveal direction="left" delay={0.1}>
            <span className="text-coral-600 font-bold tracking-widest uppercase text-sm mb-4 block">FORMATION 01</span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-black mb-4 leading-[1.1] tracking-tighter text-[#0a0a0a]">
              PROTOCOLE<br />VIDÉO IA™
            </h2>
            <p className="text-xl font-bold text-coral-600 mb-8">Créez des vidéos ultra-réalistes avec l'IA (VEO, Sora, Wan)</p>

            <div className="text-lg text-[#525252] mb-10 space-y-6 font-inter">
              <p className="font-bold text-xl text-[#0a0a0a]">Arrête de payer des caméramen. L'IA fait mieux, plus vite, et pour 100x moins cher.</p>
              <p>Le monde de la vidéo a changé. Définitivement. Aujourd'hui, tu n'as plus besoin de matériel à 2 millions de FCFA, d'acteurs capricieux ou de compétences complexes en montage pour produire des vidéos spectaculaires. Il te suffit de l'intelligence artificielle et du bon protocole.</p>
            </div>

            <div className="bg-coral-500/5 border border-coral-500/20 rounded-2xl p-8 mb-10 shadow-sm">
              <h3 className="font-bold text-coral-600 tracking-wider text-sm mb-4">Le problème avec les autres formations :</h3>
              <p className="text-[#525252] italic text-[15px] leading-relaxed mb-4">La plupart des formations sont périmées. Elles t'apprennent un outil qui sera dépassé dans 3 mois. Tu paies, tu apprends, l'outil change, tu es perdu.</p>
              <p className="font-medium text-[#0a0a0a] text-[15px]">"Le Protocole Vidéo IA est la première formation évolutive en Afrique. Tu n'apprends pas un outil. Tu apprends un système."</p>
            </div>

            <div className="mb-10">
              <h3 className="font-bold text-xl mb-6 text-[#0a0a0a]">Ce que tu vas maîtriser :</h3>
              <ul className="space-y-4">
                {[
                  "Générer des vidéos 'Qualité Cinéma' en moins de 15 minutes sans caméra ni acteurs",
                  "Maîtriser l'écosystème IA complet : Google VEO + mises à jour futures (Sora, Wan)",
                  "La méthode 'Neuronal Prompting' : structures exactes pour forcer l'IA au photoréalisme",
                  "Créer des publicités et des VSL qui vendent et génèrent des revenus",
                  "Lancer ton agence vidéo IA et vendre tes vidéos 10x le prix de la formation"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-[15px] text-[#525252]">
                    <CheckCircle2 className="w-5 h-5 text-coral-600 shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: item.replace(/'([^']+)'/g, "<strong>'$1'</strong>") }} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <div className="bg-white text-[#0a0a0a] rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-black/5 relative overflow-hidden mb-10 card-luxury card-hover-lift glow-hover">
              <div className="absolute top-0 right-0 w-32 h-32 bg-coral-500/10 blur-[50px] rounded-full" />
              <h3 className="font-heading text-2xl font-bold mb-8">Le programme <span className="text-coral-600">(5 modules + MàJ à vie)</span></h3>
              <div className="space-y-6">
                {modules.map((m, i) => (
                  <div key={i} className="border-l-2 border-coral-500/30 pl-5 relative">
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-coral-600" />
                    <h4 className="font-bold text-[#0a0a0a] mb-1.5 text-[15px]">{m.title}</h4>
                    <p className="text-[#525252] text-[14px] leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border-2 border-coral-300 shadow-xl rounded-[1.5rem] p-6 sm:p-8 text-[#0a0a0a] relative card-luxury card-hover-lift glow-hover">
              <div className="absolute -top-4 left-8 bg-coral-600 text-white font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                Tarif Early Adopter
              </div>
              <h3 className="font-bold text-xl mb-4">Prix de lancement évolutif</h3>
              <p className="text-[#525252] text-[14px] mb-6">Le prix actuel est bas. Au fur et à mesure que les modules Sora et Wan 2.5 seront ajoutés, le prix augmentera (valeur : 25 000+ FCFA). Achète maintenant et bloque ce tarif À VIE.</p>
              <div className="flex items-end gap-4 mb-6">
                <span className="font-heading font-black text-4xl sm:text-5xl text-coral-600 tracking-tighter">7 590 FCFA</span>
                <span className="text-[#737373] text-lg line-through mb-1">25 000 FCFA</span>
              </div>
              <p className="text-[13px] text-[#525252] mb-8 flex items-center justify-center gap-4">
                <span>Accès à vie</span> • <span>MàJ gratuites</span> • <span>0 abonnement</span>
              </p>
              <a href="https://academy.oumarousanda.com/veo3" target="_blank" rel="noopener noreferrer" className="btn-premium block w-full py-5 bg-[#0a0a0a] text-white font-heading font-bold text-[15px] text-center rounded-xl hover:bg-coral-600 transition-all uppercase tracking-wider shadow-[0_10px_30px_rgba(10,10,10,0.3)] hover:shadow-[0_10px_30px_rgba(244,114,102,0.3)] glow-hover">
                REJOINDRE PROTOCOLE VIDÉO IA
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ FORMATION 02 : CERVEAU AUGMENTÉ ═══════════════════════ */
function FormationCerveau() {
  return (
    <section className="relative py-24 sm:py-32 section-dark border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-60" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal direction="up" delay={0.1}>
            <div className="order-2 lg:order-1">
              <div className="relative max-w-md mx-auto">
                <img src="/Le Cerveau Augmenté .webp" alt="Le Cerveau Augmenté" className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]" />
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <div className="order-1 lg:order-2">
              <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">FORMATION 02</span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-4 leading-[1.1] tracking-tighter">
                LE CERVEAU<br />AUGMENTÉ™
              </h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full mb-8">
                <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                <span className="text-white/70 text-[12px] font-bold uppercase tracking-wider">100% avis positifs</span>
              </div>

              <div className="text-lg text-white/70 mb-10 space-y-6 font-inter">
                <p className="font-bold text-xl text-white">ChatGPT ne te rend pas intelligent. Il amplifie la manière dont tu penses.</p>
                <p>On t'a appris à poser des questions à l'IA. À copier des prompts. Mais personne ne t'a appris à PENSER avec une IA. Résultat : confusion mentale, dépendance, productivité artificielle.</p>
                <p className="italic text-blue-300 font-medium">"Le Cerveau Augmenté corrige ça. Ce n'est pas un ebook de motivation. C'est un système mental clair, conçu pour le contexte africain."</p>
              </div>

              <div className="mb-10">
                <h3 className="font-bold text-white text-xl mb-6">Ce que ce système va changer :</h3>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Structurer ta pensée AVANT d'utiliser l'IA",
                    "Donner des ordres clairs au lieu de questions vagues",
                    "Décider plus vite sans fatigue mentale",
                    "Utiliser l'IA comme un exécutant, pas un cerveau",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-[14px] text-white/70">
                      <ArrowRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Offre Spéciale</h4>
                    <p className="text-white/50 text-[13px]">Valeur réelle : 35 000 FCFA. Prix cassé pour l'accessibilité.</p>
                  </div>
                  <div className="text-right">
                    <span className="block font-heading font-black text-3xl text-blue-400">4 900 FCFA</span>
                    <span className="text-white/40 text-sm line-through">19 900 FCFA</span>
                  </div>
                </div>
                <a href="https://academy.oumarousanda.com/cerveau-augmente" target="_blank" rel="noopener noreferrer" className="btn-premium block w-full py-4 bg-blue-600 text-white font-heading font-bold text-[14px] text-center rounded-xl hover:bg-blue-500 transition-all uppercase tracking-wider shadow-[0_10px_30px_rgba(37,99,235,0.4)] glow-hover">
                  TÉLÉCHARGER LE CERVEAU AUGMENTÉ
                </a>
                <p className="text-center text-white/40 text-[12px] mt-4 font-medium uppercase tracking-wider">
                  Accès immédiat • Compatible téléphone • Garantie 30 jours
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ FORMATION 03 : OFFSHORE EMPIRE ═══════════════════════ */
function FormationOffshore() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#fafafa] overflow-hidden border-t border-black/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-white to-[#fafafa]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <Reveal direction="left" delay={0.1}>
            <span className="text-gold-dark font-bold tracking-widest uppercase text-sm mb-4 block">FORMATION 03</span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-black text-[#0a0a0a] mb-4 leading-[1.1] tracking-tighter">
              OFFSHORE<br />EMPIRE™
            </h2>
            <p className="text-xl font-bold text-gold-dark mb-8">Créer une société offshore au Royaume-Uni depuis l'Afrique</p>

            <div className="text-lg text-[#525252] mb-10 space-y-6 font-inter">
              <p className="font-bold text-xl text-[#0a0a0a]">Tu veux lancer ton business en ligne ? Tu es bloqué à l'étape 1 : la structure légale.</p>
              <p>Tu ne peux pas ouvrir Stripe. Ton pays n'est pas reconnu. Tu as suivi des formations e-commerce mais aucune ne t'a donné la base pour encaisser légalement.</p>
              <p className="text-gold-dark font-medium">"Ce n'est pas une formation e-commerce de plus. C'est LA pièce manquante."</p>
            </div>

            <div className="mb-10">
              <h3 className="font-bold text-[#0a0a0a] text-xl mb-6">Ce que tu vas voir concrètement :</h3>
              <ul className="space-y-4">
                {[
                  "Créer une Private Limited Company (Ltd) au UK pas à pas",
                  "Utiliser une adresse locale britannique sans y vivre",
                  "Passer la vérification KYC depuis un pays non-éligible",
                  "Recevoir tes documents officiels d'incorporation",
                  "Activer Stripe, PayPal ou Wise avec ta nouvelle structure"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-[15px] text-[#525252]">
                    <Globe className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-6 items-center p-6 bg-white border border-black/5 shadow-sm rounded-2xl">
              <div className="text-center">
                <span className="block font-black text-3xl text-[#0a0a0a]">20+</span>
                <span className="text-[10px] text-[#737373] uppercase tracking-widest">Sociétés Créées</span>
              </div>
              <div className="w-px h-10 bg-black/10" />
              <div className="text-center">
                <span className="block font-black text-3xl text-gold-dark">0</span>
                <span className="text-[10px] text-[#737373] uppercase tracking-widest">Rejet</span>
              </div>
              <div className="w-px h-10 bg-black/10 hidden sm:block" />
              <div className="text-center hidden sm:block">
                <span className="block font-black text-3xl text-[#0a0a0a]">50k+</span>
                <span className="text-[10px] text-[#737373] uppercase tracking-widest">Vues YouTube</span>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <div className="bg-white border border-black/5 rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-xl relative card-luxury card-hover-lift glow-hover">
              <div className="flex justify-center mb-8">
                <img src="/OFFSHORE EMPIRE BOX.webp" alt="Offshore Empire" className="w-64 object-contain drop-shadow-xl" />
              </div>
              <h3 className="text-[#0a0a0a] font-bold text-2xl mb-2">PRIX DE LANCEMENT MVP</h3>
              <p className="text-[#737373] text-[14px] mb-8">Accès à vie. Aucun abonnement. Aucun frais caché.</p>

              <div className="flex flex-col gap-2 mb-8">
                <span className="text-[#a3a3a3] text-xl font-bold line-through">250 000 FCFA</span>
                <span className="font-heading font-black text-5xl sm:text-6xl text-gradient-gold tracking-tighter">97 750 FCFA</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex gap-3 text-[#525252] text-[14px]">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0" /> Étude de cas filmée (100% pratique)
                </div>
                <div className="flex gap-3 text-[#525252] text-[14px]">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0" /> Support direct via l'espace membre
                </div>
              </div>

              <a href="https://formations.oumarousanda.com/offshore-empire" target="_blank" rel="noopener noreferrer" className="btn-premium block w-full py-5 bg-[#0a0a0a] text-white font-heading font-bold text-[15px] text-center rounded-xl hover:bg-gold transition-all uppercase tracking-wider shadow-[0_10px_30px_rgba(10,10,10,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] glow-hover">
                REJOINDRE OFFSHORE EMPIRE
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ TEASERS ═══════════════════════ */
function FormationTeasers() {
  return (
    <section className="relative py-24 bg-white border-y border-black/5">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Teaser 1 */}
          <Reveal direction="up" delay={0.1}>
            <div className="bg-[#fafafa] border border-black/10 border-dashed rounded-[2rem] p-8 sm:p-10 relative overflow-hidden group card-hover-lift">
              <div className="absolute top-6 right-6 px-3 py-1 bg-white border border-black/5 shadow-sm rounded-md text-[10px] font-bold text-[#737373] uppercase tracking-widest">BIENTÔT DISPONIBLE</div>
              <span className="text-[#737373] font-bold tracking-widest uppercase text-xs mb-3 block">FORMATION 04</span>
              <h3 className="font-heading font-black text-2xl text-[#0a0a0a] mb-4">INITIATION À L'IA GÉNÉRATIVE</h3>
              <p className="text-[#525252] text-[15px] leading-relaxed mb-8">Ta porte d'entrée dans le monde de l'intelligence artificielle. Un parcours structuré, progressif, accessible à 100% aux débutants. De 'je n'y comprends rien' à 'je sais quoi faire avec'.</p>
              <button className="w-full py-4 bg-transparent border-2 border-black/10 text-[#737373] font-bold text-[13px] rounded-xl hover:bg-white hover:text-[#0a0a0a] transition-colors uppercase tracking-wider">
                REJOINDRE LA LISTE D'ATTENTE
              </button>
            </div>
          </Reveal>

          {/* Teaser 2 */}
          <Reveal direction="up" delay={0.2}>
            <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-[2rem] p-8 sm:p-10 relative overflow-hidden card-hover-lift">
              <div className="absolute top-6 right-6 px-3 py-1 bg-emerald-100/50 text-emerald-700 rounded-md text-[10px] font-bold uppercase tracking-widest animate-pulse border border-emerald-200">EN COURS DE PRODUCTION</div>
              <span className="text-emerald-700/70 font-bold tracking-widest uppercase text-xs mb-3 block">FORMATION 05</span>
              <h3 className="font-heading font-black text-2xl text-[#0a0a0a] mb-4">30 JOURS POUR GAGNER 1M FCFA</h3>
              <p className="text-[#0a0a0a] font-bold text-lg mb-4 text-emerald-700">En vendant des sites web créés avec l'IA</p>
              <p className="text-[#525252] text-[15px] leading-relaxed mb-8">Et si dans 30 jours, tu avais généré ton premier million en vendant des sites web pro créés avec l'IA ? Pas besoin d'être développeur. Un plan d'action jour par jour.</p>
              <button className="w-full py-4 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[13px] rounded-xl hover:bg-emerald-100 transition-colors uppercase tracking-wider">
                REJOINDRE LA LISTE D'ATTENTE
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ COMPARATIF ═══════════════════════ */
function FormationsCompare() {
  const headers = ["", "PROTOCOLE VIDÉO IA", "CERVEAU AUGMENTÉ", "OFFSHORE EMPIRE", "30 JOURS / 1M"];
  const rows = [
    { label: "Tu veux...", cols: ["Créer des vidéos pro avec l'IA", "Maîtriser ta pensée avec l'IA", "Créer une société UK", "Vendre des sites web IA"] },
    { label: "Format", cols: ["Vidéo (5 modules)", "Ebook + Bonus", "Vidéo (étude de cas)", "Bientôt"] },
    { label: "Prix", cols: ["7 590 FCFA", "4 900 FCFA", "97 750 FCFA", "TBA"] },
    { label: "Niveau", cols: ["Tous niveaux", "Tous niveaux", "Intermédiaire", "Débutant"] }
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#fafafa]">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <span className="text-[#737373] font-bold tracking-widest uppercase text-sm mb-4 block">COMPARATIF</span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-5xl font-bold text-[#0a0a0a] mb-6">
              Quelle formation est<br /><span className="text-gold">faite pour toi ?</span>
            </h2>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] mb-8 pb-4 card-hover-lift">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#f5f5f7] border-b border-black/5">
                  {headers.map((h, i) => (
                    <th key={i} className={`p-5 font-heading font-bold text-[#525252] text-[13px] uppercase tracking-wider ${i === 0 ? 'w-48' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-black/5 hover:bg-black/[0.02]">
                    <td className="p-5 font-bold text-[#525252] text-[14px] uppercase">{r.label}</td>
                    {r.cols.map((c, j) => (
                      <td key={j} className={`p-5 text-[14px] ${r.label === 'Prix' ? 'text-gold-dark font-bold' : 'text-[#0a0a0a]'}`}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <div className="bg-white border border-black/5 shadow-sm rounded-2xl p-6 text-center max-w-3xl mx-auto">
          <p className="text-[#525252] text-[15px] mb-4">
            <strong className="text-[#0a0a0a]">Tu hésites ?</strong> Commence par <span className="text-blue-600 font-bold">Le Cerveau Augmenté</span> pour poser les bases, puis passe à <span className="text-coral-600 font-bold">Protocole Vidéo IA</span> pour monétiser immédiatement.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ CTA FINAL ═══════════════════════ */
function CTAFinalFormations() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 section-dark overflow-hidden text-center border-t border-white/5">
      <div className="absolute inset-0 bg-grid-dark opacity-60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] bg-gold/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 z-10 text-center">
        <Reveal direction="up" delay={0.1}>
          <h2 className="font-heading text-4xl sm:text-6xl font-black text-white mb-4 leading-[1.1] tracking-tight">
            Le savoir sans action,<br />c'est du divertissement.
          </h2>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-gold mb-10">
            Le savoir avec action, c'est de la transformation.
          </h3>
          <p className="text-white/65 text-lg font-medium mb-12 max-w-2xl mx-auto">
            Chaque jour que tu passes sans te former, quelqu'un d'autre prend ta place. Les outils sont là. Les méthodes sont là. La seule variable, c'est toi.
          </p>
          <div className="flex justify-center">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn-premium px-12 py-5 bg-gold text-[#0a0a0a] font-bold text-[15px] rounded-xl hover:bg-white transition-all uppercase tracking-wider shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] glow-hover">
              CHOISIR MA FORMATION
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════ FAQ ═══════════════════════ */
function FAQFormations() {
  const faqs = [
    { q: "Quelles formations propose Oumarou Sanda ?", a: "Oumarou Sanda propose plusieurs formations en ligne : Protocole Vidéo IA (création de vidéos professionnelles avec l'intelligence artificielle, 7 590 FCFA), Le Cerveau Augmenté (système mental pour maîtriser et penser avec l'IA, 4 900 FCFA), Offshore Empire (création de société Ltd au Royaume-Uni depuis l'Afrique, 97 750 FCFA), et des formations à venir sur l'initiation à l'IA générative et la vente de sites web avec l'IA." },
    { q: "C'est quoi le Protocole Vidéo IA ?", a: "Le Protocole Vidéo IA est une formation qui enseigne comment créer des vidéos ultra-réalistes avec l'intelligence artificielle en utilisant des outils comme Google VEO, Sora et Wan. C'est la première formation évolutive sur la vidéo générative en Afrique francophone." },
    { q: "Comment créer une société au Royaume-Uni depuis l'Afrique ?", a: "La formation Offshore Empire d'Oumarou Sanda montre pas à pas comment créer une Private Limited Company (Ltd) au Royaume-Uni depuis l'Afrique. La formation couvre le choix du nom, l'utilisation d'une adresse, la vérification KYC, et la préparation pour activer Stripe ou PayPal." },
    { q: "Les formations sont-elles accessibles depuis un téléphone ?", a: "Oui, toutes les formations d'Oumarou Sanda sont accessibles depuis un téléphone ou un ordinateur. Les prix sont adaptés au marché africain et le paiement est possible par Mobile Money ou carte bancaire. L'accès est immédiat après paiement." },
    { q: "C'est quoi Le Cerveau Augmenté ?", a: "Le Cerveau Augmenté est un ebook et système mental créé par Oumarou Sanda pour apprendre à penser, décider et produire avec l'intelligence artificielle. Il inclut un ebook de 34 pages, un catalogue de 200 prompts stratégiques et une vidéo exclusive." }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-[#fafafa] border-t border-black/5">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gold-dark mb-10 text-center tracking-wider">Questions Fréquentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-black/5 rounded-2xl bg-white shadow-sm overflow-hidden card-luxury">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-[#0a0a0a] hover:bg-black/[0.02] transition-colors">
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

/* ═══════════════════════ PAGE EXPORT ═══════════════════════ */
export default function FormationsPage() {
  return (
    <>
      <SEOHead
        title="Formations IA & Business Digital | Oumarou Sanda — Vidéo IA, Productivité, Offshore"
        description="Découvrez les formations d'Oumarou Sanda : Protocole Vidéo IA (création vidéo avec l'IA), Le Cerveau Augmenté (système mental IA), Offshore Empire (créer une société UK depuis l'Afrique). Prix adaptés au marché africain."
        canonical="/formations"
        schema={FORMATIONS_SCHEMA}
      />
      <FormationsHero />
      <FormationVideoIA />
      <FormationCerveau />
      <FormationOffshore />
      <FormationTeasers />
      <FormationsCompare />
      <CTAFinalFormations />
      <FAQFormations />
    </>
  );
}
