import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import {
  Youtube, BookOpen,
  Globe,
  Target, Sparkles, Quote, ChevronDown
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

/* ═══════════════════════ SEO SCHEMA ═══════════════════════ */
const ABOUT_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://oumarousanda.com/#person",
      "name": "Oumarou Sanda",
      "alternateName": "Oumarou Sanda Aboubakar",
      "jobTitle": "Expert Intelligence Artificielle, Formateur, Entrepreneur Digital",
      "description": "Entrepreneur digital et expert en intelligence artificielle basé à Ngaoundéré, Cameroun. Fondateur de Wendooka, Sanda Vibe Code et CommentSticker. Auteur et formateur pour entrepreneurs africains francophones.",
      "url": "https://oumarousanda.com/a-propos",
      "image": "https://oumarousanda.com/Oumarou Sanda 1.webp",
      "birthPlace": { "@type": "Place", "addressCountry": "CM", "addressRegion": "Adamaoua", "addressLocality": "Ngaoundéré" },
      "nationality": "Camerounaise",
      "knowsLanguage": ["fr", "en"],
      "sameAs": [
        "https://www.youtube.com/@Oumarou_Sanda",
        "https://tiktok.com/@iamsanda",
        "https://linkedin.com/in/benibsanda",
        "https://facebook.com/iamoumarousanda",
        "https://wendooka.com",
        "https://sandavibecode.com",
        "https://commentsticker.com"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://oumarousanda.com" },
        { "@type": "ListItem", "position": 2, "name": "À propos", "item": "https://oumarousanda.com/a-propos" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Qui est Oumarou Sanda ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Oumarou Sanda est un entrepreneur digital, expert en intelligence artificielle et formateur basé au Cameroun. Fondateur de Wendooka (agence web), Sanda Vibe Code et CommentSticker (SaaS). Auteur de deux livres dont «Si l'Afrique rate l'IA, elle rate le Futur», il fédère une communauté de plus de 112 000 abonnés." }
        },
        {
          "@type": "Question",
          "name": "Quelles formations Oumarou Sanda propose-t-il ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Il propose : Protocole Vidéo IA, Le Cerveau Augmenté et Offshore Empire. Toutes ses formations sont orientées résultats et adaptées au contexte africain et francophone." }
        },
        {
          "@type": "Question",
          "name": "C'est quoi Wendooka ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Wendooka est une agence web et digitale fondée par Oumarou Sanda en 2017, spécialisée dans WordPress, l'automatisation marketing et les solutions digitales." }
        },
        {
          "@type": "Question",
          "name": "Oumarou Sanda est-il basé au Cameroun ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Oui, Oumarou Sanda est basé à Ngaoundéré, dans la région de l'Adamaoua au Cameroun. Il opère à l'international grâce à ses activités en ligne." }
        }
      ]
    }
  ]
};

/* ═══════════════════════ HERO ═══════════════════════ */
function HeroAbout() {
  return (
    <section className="relative min-h-[90dvh] flex items-center overflow-hidden section-dark border-b border-white/5">
      <div className="absolute inset-0 bg-grid-dark opacity-60" />
      <div className="absolute inset-0 bg-noise mix-blend-luminosity opacity-[0.03]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/15 text-gold font-bold text-[11px] tracking-wider uppercase mb-8 shadow-sm">
              MON HISTOIRE
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.2] mb-8 tracking-tight text-white">
              Je ne suis pas né expert.<br />
              <span className="text-gold block mt-2">Je le suis devenu en refusant de rester à ma place.</span>
            </h1>
            <p className="text-white/65 text-lg sm:text-xl leading-relaxed max-w-xl font-inter">
              Du micro de journaliste aux systèmes d'intelligence artificielle. De Ngaoundéré au monde entier. Voici comment un gars de l'Adamaoua est devenu la référence IA en Afrique francophone — avec 112 000 abonnés, plusieurs entreprises et un SaaS à son actif.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative h-[500px] lg:h-[700px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl bg-white/5">
            <img src="/Oumarou Sanda 5.webp" alt="Oumarou Sanda" className="absolute inset-0 w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ CHAPITRE 1 : L'ORIGINE ═══════════════════════ */
function ChapterOne() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#fafafa] border-b border-black/5">
      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={0.1}>
          <span className="text-coral-600 font-bold tracking-widest uppercase text-sm mb-4 block">Chapitre 1 : Là où tout a commencé</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#0a0a0a] mb-8 leading-tight">
            Avant l'IA, il y avait un micro et une ambition.
          </h2>
          <div className="prose max-w-none prose-lg text-[#525252] font-inter space-y-6">
            <p>
              Je viens de Ngaoundéré, dans la région de l'Adamaoua au Cameroun. Pas de Silicon Valley ici. Ni de fonds d'investissement. Encore moins de réseau dans la tech. Juste une conviction : que l'information est le pouvoir, et que celui qui la maîtrise peut tout changer.
            </p>
            <p>
              C'est cette conviction qui m'a mené au journalisme. Correspondant pour Vision 4 TV depuis 2020 dans la région de l'Adamaoua, j'ai couvert l'actualité sur le terrain. J'ai appris à poser les bonnes questions, à décrypter la complexité, à raconter des histoires qui comptent. Mais très vite, j'ai réalisé quelque chose.
            </p>
            <blockquote className="border-l-4 border-gold bg-gold/5 p-6 rounded-r-xl my-10 italic text-[#0a0a0a] font-medium text-xl shadow-sm">
              <Quote className="w-8 h-8 text-gold-dark mb-3" />
              “L'information la plus puissante n'est pas celle qu'on diffuse à la télé. C'est celle qui permet de bâtir quelque chose.”
            </blockquote>
            <p className="text-[#0a0a0a] font-bold">
              Le journalisme m'a donné la rigueur. L'entrepreneuriat m'a donné la liberté. Et l'intelligence artificielle m'a donné le levier pour tout multiplier.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════ CHAPITRE 2 : LA TRANSITION ═══════════════════════ */
function ChapterTwo() {
  return (
    <section className="relative py-24 sm:py-32 bg-white border-b border-black/5 overflow-hidden">
      <div className="absolute -left-1/4 top-1/2 -translate-y-1/2 w-1/2 h-[500px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={0.1}>
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Chapitre 2 : Le Pivot</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#0a0a0a] mb-8 leading-tight">
            Du terrain à l'écran. Du reportage au revenu.
          </h2>
          <div className="prose max-w-none prose-lg text-[#525252] font-inter space-y-6">
            <p>
              En 2017, j'ai fondé <strong className="text-[#0a0a0a]">Wendooka</strong>. Pas parce que c'était tendance de créer une agence web. Parce que je voyais des entreprises camerounaises et africaines perdre des opportunités chaque jour — simplement parce qu'elles n'existaient pas en ligne. Ou pire : elles existaient mal.
            </p>
            <p>
              Wendooka est devenu bien plus qu'une agence. C'est devenu un laboratoire. J'ai testé des tunnels de vente, des systèmes d'automatisation, des stratégies SEO et de marketing digital — d'abord pour mes clients, puis pour moi-même.
            </p>
            <p>
              Ensuite est venue la création de contenu. YouTube, TikTok, Facebook, LinkedIn, Instagram. Pas pour la célébrité — pour la légitimité. Pour prouver, vidéo après vidéo, que les outils que je recommande fonctionnent. Que les stratégies que j'enseigne génèrent des résultats. <strong className="text-gold-dark">Réel. Tangible. Mesurable.</strong>
            </p>
            <div className="bg-[#fafafa] border border-black/5 p-6 rounded-2xl inline-block mt-4 shadow-sm">
              <p className="text-2xl font-black text-[#0a0a0a] m-0">112 000 abonnés plus tard, la preuve est faite.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════ CHAPITRE 3 : LE DÉCLIC IA ═══════════════════════ */
function ChapterThree() {
  return (
    <section className="relative py-24 sm:py-32 bg-white border-b border-black/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent opacity-60" />
      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <Reveal direction="up" delay={0.1}>
          <span className="text-violet-600 font-bold tracking-widest uppercase text-sm mb-6 block">Chapitre 3 : Quand l'IA a tout changé</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-black text-[#0a0a0a] mb-10 leading-[1.1] tracking-tight">
            L'IA n'est pas arrivée dans ma vie.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">Je suis allé la chercher.</span>
          </h2>
          <div className="prose max-w-none prose-lg text-[#525252] font-inter space-y-6 mx-auto text-left sm:text-center mt-12 bg-[#fafafa] p-8 sm:p-12 rounded-[2rem] border border-black/5 shadow-xl">
            <p>
              Quand les premiers outils d'intelligence artificielle grand public sont apparus, la plupart des gens ont vu un gadget. Moi, j'ai vu un tsunami. Un tsunami qui allait balayer les business modèles traditionnels, redéfinir les compétences qui comptent, et créer un fossé entre ceux qui s'adaptent et ceux qui disparaissent.
            </p>
            <p className="font-black text-[#0a0a0a] text-2xl py-4">Je n'ai pas attendu. J'ai plongé.</p>
            <p>
              J'ai testé chaque outil. Démonté chaque workflow. Créé des systèmes complets de production de contenu, de vidéo, d'automatisation business — alimentés par l'IA. Et surtout, j'ai documenté tout ce que j'apprenais pour le rendre accessible à ceux qui n'avaient pas le temps, les ressources ou le background technique pour faire la même chose.
            </p>
            <p className="text-gold-dark font-bold">C'est comme ça que sont nées mes formations.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════ ÉCOSYSTÈME ═══════════════════════ */
function Ecosystem() {

  const pillars = [
    {
      title: "WENDOOKA", subtitle: "L'Agence", icon: Globe, color: "text-blue-600", bg: "bg-blue-500/10",
      desc: "Agence web et digitale spécialisée dans WordPress, l'automatisation et les solutions orientées performance. On crée des sites qui convertissent, pas des vitrines qui prennent la poussière. On accompagne des PME, des entrepreneurs et des organisations à passer au digital — intelligemment.",
      linkText: "wendooka.com", link: "https://wendooka.com"
    },
    {
      title: "SANDA VIBE CODE", subtitle: "L'Écosystème", icon: Sparkles, color: "text-coral-600", bg: "bg-coral-500/10",
      desc: "Le vibe coding, c'est la nouvelle manière de créer des produits digitaux. Pas besoin d'être développeur. Tu combines IA, no-code et logique produit pour créer des SaaS, des applications web et mobiles, des outils — et les monétiser. Sanda Vibe Code, c'est l'écosystème complet pour y arriver.",
      linkText: "sandavibecode.com", link: "https://sandavibecode.com"
    },
    {
      title: "COMMENTSTICKER", subtitle: "Le SaaS", icon: Target, color: "text-emerald-600", bg: "bg-emerald-500/10",
      desc: "CommentSticker est mon premier SaaS lancé en 2026. La preuve concrète que le vibe coding fonctionne : un produit bâti avec l'IA, qui résout un vrai problème, et qui génère des revenus. Ce n'est pas de la théorie — c'est ce que j'enseigne, appliqué à mon propre business.",
      linkText: "commentsticker.com", link: "https://commentsticker.com"
    },
    {
      title: "FORMATIONS & LIVRES", subtitle: "Le Savoir", icon: BookOpen, color: "text-gold-dark", bg: "bg-gold/10",
      desc: "Protocole Vidéo IA pour la production vidéo. Le Cerveau Augmenté pour la productivité. Offshore Empire pour structurer à l'international. Livres : «Cerveau Augmenté» (2025) et «Si l'Afrique rate l'IA, elle rate le Futur» (2026). Chaque ressource répond à un problème et livre un résultat concret."
    },
    {
      title: "MES CONTENUS", subtitle: "La Voix", icon: Youtube, color: "text-[#FF0000]", bg: "bg-[#FF0000]/10",
      desc: "112 000+ abonnés (YouTube, TikTok, Facebook, LinkedIn, Instagram). Correspondant pour Vision 4 TV dans la région de l'Adamaoua depuis 2020. Je ne crée pas du contenu pour divertir. Je crée du contenu pour armer. Chaque vidéo, chaque article, chaque post est une arme que tu peux utiliser pour ton business."
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#fafafa] overflow-hidden border-b border-black/5">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <span className="text-gold-dark font-bold tracking-widest uppercase text-sm mb-4 block">Chapitre 4 : Ce que je construis aujourd'hui</span>
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-[#0a0a0a] mb-6">
              Un écosystème.<br /><span className="text-gold-dark">Pas juste une marque personnelle.</span>
            </h2>
            <p className="text-[#525252] text-lg max-w-2xl mx-auto">Aujourd'hui, mon travail repose sur cinq piliers :</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <Reveal key={i} direction="up" delay={i * 0.1}>
              <div className="p-8 rounded-3xl bg-white border border-black/5 hover:border-black/15 flex flex-col h-full shadow-sm hover:shadow-md transition-all card-hover-lift glow-hover">
                <div className={`w-14 h-14 ${p.bg} rounded-2xl flex items-center justify-center mb-6`}>
                  <p.icon className={`w-7 h-7 ${p.color}`} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-heading font-black text-xl text-[#0a0a0a]">{p.title}</h3>
                </div>
                <span className={`${p.color} text-[12px] font-bold uppercase tracking-wider mb-4 block`}>— {p.subtitle}</span>
                <p className="text-[#525252] text-[14px] leading-relaxed mb-6 flex-1">{p.desc}</p>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#a3a3a3] hover:text-[#0a0a0a] font-bold text-[13px] transition-colors group">
                    → {p.linkText}
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ TIMELINE ═══════════════════════ */
function Timeline() {
  const events = [
    { year: '2017', title: 'Fondation de Wendooka', desc: "Lancement de l'agence web et digitale. Premiers clients, premiers sites, premières automatisations." },
    { year: '2020', title: 'Journalisme + Création de contenu', desc: "Correspondant régional pour Vision 4 TV dans l'Adamaoua. Lancement simultané sur YouTube et les réseaux sociaux. Premières vidéos sur le business digital et l'IA." },
    { year: '2022', title: "Explosion de l'audience", desc: "Passage du cap des 50 000 abonnés. Lancement des premières formations en ligne." },
    { year: '2024', title: "Structuration Formations", desc: "Lancement des premières formations structurées en ligne répondant aux nouveaux besoins digitaux." },
    { year: '2025', title: "Protocole Vidéo IA", desc: "Lancement de la formation phare sur la création vidéo avec l'intelligence artificielle. Centaines d'apprenants inscrits." },
    { year: '2025', title: 'Le Cerveau Augmenté & Offshore Empire', desc: "Déploiement de deux nouvelles formations. Structuration de l'écosystème de produits digitaux." },
    { year: '2025', title: 'Sanda Vibe Code + Livre Cerveau Augmenté', desc: "Lancement de l'écosystème vibe coding. Publication du livre «Cerveau Augmenté» — guide pour construire son système d'IA personnel." },
    { year: '2026', title: 'CommentSticker + Livre sur l\'IA en Afrique', desc: "Lancement de CommentSticker (SaaS). Publication de «Si l'Afrique rate l'IA, elle rate le Futur». 112 000+ abonnés. Positionnement consolidé comme référence IA." }
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-white border-b border-black/5">
      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#0a0a0a] mb-4">LES ÉTAPES CLÉS</h2>
            <p className="text-[#525252] text-lg font-medium">De là à ici. Rapidement.</p>
          </div>
        </Reveal>
        <div className="relative border-l-2 border-black/10 ml-4 sm:ml-0 md:mx-auto md:w-full md:border-l-0">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white via-black/10 to-white -translate-x-1/2" />
          <div className="space-y-12">
            {events.map((event, i) => (
              <Reveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                <div className={`relative pl-8 sm:pl-10 md:pl-0 flex flex-col md:flex-row items-center justify-between group ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Marker */}
                  <div className="absolute left-[-5px] md:left-1/2 top-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-gold border-4 border-white shadow-sm z-10 group-hover:scale-125 transition-transform" />

                  {/* Content */}
                  <div className={`w-full md:w-[45%] ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="p-6 rounded-2xl bg-[#fafafa] border border-black/5 hover:border-black/15 transition-all shadow-sm hover:shadow-md">
                      <span className="text-gold-dark font-black text-2xl mb-2 block">{event.year}</span>
                      <h4 className="font-bold text-[#0a0a0a] text-lg mb-3 leading-tight">{event.title}</h4>
                      <p className="text-[#525252] text-[14px] leading-relaxed">{event.desc}</p>
                    </div>
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

/* ═══════════════════════ VALEURS ═══════════════════════ */
function ValuesSection() {
  const values = [
    { id: '01', title: "L'action bat la théorie. Toujours.", desc: "Je ne vends pas des idées. Je vends des systèmes qui marchent. Chaque formation, chaque service, chaque contenu que je crée est testé sur le terrain avant d'être partagé. Si ça ne génère pas de résultats, ça ne sort pas." },
    { id: '02', title: "L'Afrique n'est pas en retard. Elle est en position.", desc: "Pendant que les marchés occidentaux sont saturés, le continent africain est un terrain vierge pour l'IA, le digital et l'entrepreneuriat technologique. Ceux qui agissent maintenant écriront les règles du jeu. Je veux que ce soit nous." },
    { id: '03', title: "La technologie sans stratégie est du bruit.", desc: "L'IA est un outil. Un outil puissant, mais un outil quand même. Ce qui fait la différence, c'est la stratégie derrière. C'est pour ça que mes formations ne sont pas des tutos YouTube glorifiés — ce sont des systèmes complets orientés revenus." },
    { id: '04', title: "Pas de complexe. Pas de permission.", desc: "Personne ne t'a demandé d'attendre que quelqu'un te valide pour commencer. Le monde change pour ceux qui osent bouger. Pas pour ceux qui attendent un signal." },
    { id: '05', title: "Souveraineté numérique.", desc: "Construire ses propres systèmes. Posséder ses outils. Ne dépendre d'aucune plateforme unique. C'est la philosophie derrière tout ce que je fais — et tout ce que j'enseigne." },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#fafafa]">
      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#0a0a0a] mb-4">MES CONVICTIONS</h2>
            <p className="text-[#525252] text-xl font-medium">Ce n'est pas juste du business. C'est une vision.</p>
          </div>
        </Reveal>
        <div className="space-y-6">
          {values.map((v, i) => (
            <Reveal key={v.id} direction="up" delay={i * 0.1}>
              <div className="group">
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 p-8 rounded-3xl bg-white border border-black/5 hover:border-black/15 transition-colors items-start shadow-sm hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] card-hover-lift glow-hover">
                  <span className="text-gold/30 font-heading font-black text-5xl md:text-6xl group-hover:text-gold-dark transition-colors">{v.id}.</span>
                  <div>
                    <h3 className="text-[#0a0a0a] font-bold text-xl md:text-2xl mb-4 leading-tight">{v.title}</h3>
                    <p className="text-[#525252] text-base leading-relaxed">{v.desc}</p>
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

/* ═══════════════════════ CHIFFRES CLÉS ═══════════════════════ */
function StatsGrid() {
  const stats = [
    { value: "112 000+", label: "abonnés sur les réseaux sociaux" },
    { value: "200+", label: "entrepreneurs et créateurs formés" },
    { value: "6+", label: "formations et programmes créés" },
    { value: "3", label: "entreprises fondées (Wendooka, Sanda Vibe Code, CommentSticker)" },
    { value: "5+", label: "plateformes actives (YouTube, TikTok, Facebook, LinkedIn, Instagram)" },
    { value: "2", label: "livres publiés" },
  ];
  return (
    <section className="relative py-16 bg-gold border-y border-black/5 shadow-inner">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((s, i) => (
            <Reveal key={i} direction="up" delay={i * 0.05}>
              <div className="text-center">
                <h4 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white drop-shadow-sm mb-2">{s.value}</h4>
                <p className="text-[#0a0a0a] text-[13px] font-bold uppercase tracking-wide leading-tight px-4">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ VISION & CTA ═══════════════════════ */
function VisionCTA() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 section-dark overflow-hidden text-center border-b border-white/5">
      <div className="absolute inset-0 bg-grid-dark opacity-60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[600px] bg-blue/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={0.1}>
          <span className="text-gold font-bold tracking-widest uppercase text-sm mb-6 block">OÙ JE VAIS</span>
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-10 leading-tight">
            Ce que je construis<br /><span className="text-gold">dépasse le business.</span>
          </h2>
          <blockquote className="text-lg sm:text-2xl text-[#525252] font-medium italic leading-relaxed mb-12 border-l-4 border-blue-500 pl-6 text-left shadow-sm">
            “Démocratiser l'accès aux technologies avancées. Transformer les compétences locales en opportunités globales. Positionner l'Afrique francophone comme un acteur crédible de l'économie numérique mondiale.”
          </blockquote>
          <p className="text-[#525252] text-lg mb-16 text-left">
            Mon objectif n'est pas d'avoir le plus gros nombre d'abonnés ou la formation la plus vendue. C'est de prouver quelque chose. Prouver qu'un entrepreneur africain, armé des bons outils et de la bonne stratégie, peut rivaliser avec n'importe qui sur la planète. Prouver que la technologie n'est pas un luxe réservé à la Silicon Valley. Chaque entrepreneur que j'aide à réussir est une preuve de plus que c'est possible.
          </p>

          <div className="pt-16 border-t border-white/10">
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-white mb-4">Tu connais mon histoire.<br />Maintenant, écrivons la tienne.</h3>
            <p className="text-white/60 mb-10">Que tu veuilles te former, collaborer ou simplement rester connecté — choisis ton prochain pas.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/formations" className="btn-premium group px-8 py-5 bg-gold text-[#0a0a0a] font-bold text-[14px] rounded-xl hover:bg-white transition-all flex items-center justify-center uppercase tracking-wider shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] glow-hover">
                DÉCOUVRIR MES FORMATIONS
              </Link>
              <Link to="/contact" className="px-8 py-5 border-2 border-white/25 text-white font-bold text-[14px] rounded-xl hover:bg-white/10 transition-colors uppercase tracking-wider">
                TRAVAILLER AVEC MOI
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <a href="https://www.youtube.com/@Oumarou_Sanda" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#FF0000]/5 text-[#FF0000] font-bold text-[14px] rounded-xl hover:bg-[#FF0000]/10 transition-colors uppercase tracking-wider flex items-center justify-center gap-2 border border-[#FF0000]/10">
                <Youtube className="w-5 h-5" /> ME SUIVRE SUR YOUTUBE
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════ FAQ SCHEMA ═══════════════════════ */
function FAQAbout() {
  const faqs = [
    {
      q: "Qui est Oumarou Sanda ?",
      a: "Oumarou Sanda est un entrepreneur digital, expert en intelligence artificielle et formateur basé au Cameroun. Correspondant pour Vision 4 TV dans la région de l'Adamaoua depuis 2020, il est le fondateur de Wendooka (agence web et digitale), de Sanda Vibe Code (écosystème de vibe coding) et de CommentSticker (SaaS). Auteur de deux livres dont «Si l'Afrique rate l'IA, elle rate le Futur», il a formé des centaines d'entrepreneurs africains à utiliser l'IA pour générer des revenus, et fédère une communauté de plus de 112 000 abonnés."
    },
    {
      q: "Quelles formations Oumarou Sanda propose-t-il ?",
      a: "Oumarou Sanda propose plusieurs formations en ligne : le Challenge 30 Jours IA (maîtriser 28 outils IA en 15 min/jour — oumarousanda.com/challenge-30-jours), Protocole Vidéo IA (création de vidéos professionnelles avec l'IA), Le Cerveau Augmenté (système personnel d'IA pour la productivité et le business), et Offshore Empire (création de sociétés offshore au Royaume-Uni depuis l'Afrique). Toutes ses formations sont orientées résultats et adaptées au contexte africain et francophone."
    },
    {
      q: "C'est quoi Wendooka ?",
      a: "Wendooka est une agence web et digitale fondée par Oumarou Sanda en 2017. Spécialisée dans WordPress, l'automatisation marketing et la création de solutions digitales, Wendooka accompagne des PME, entrepreneurs et organisations à développer leur présence en ligne et à générer des résultats concrets."
    },
    {
      q: "C'est quoi le vibe coding et Sanda Vibe Code ?",
      a: "Le vibe coding est une nouvelle approche de création de produits digitaux qui combine l'intelligence artificielle, le no-code et la logique produit. Sanda Vibe Code est l'écosystème créé par Oumarou Sanda pour accompagner les entrepreneurs qui veulent créer des SaaS, applications web et mobiles, et outils digitaux — sans avoir besoin de coder."
    },
    {
      q: "Oumarou Sanda est-il basé au Cameroun ?",
      a: "Oui, Oumarou Sanda est basé à Ngaoundéré, dans la région de l'Adamaoua au Cameroun. Il opère à l'international grâce à ses activités en ligne et ses entreprises digitales, tout en restant ancré dans le contexte africain et francophone."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-[#fafafa] border-t border-black/5">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <h2 className="font-black text-[#0a0a0a] mb-8 text-center tracking-widest text-sm uppercase">Questions Fréquentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-black/5 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-[#0a0a0a] hover:bg-black/5 transition-colors"
              >
                {faq.q}
                <ChevronDown className={`w-5 h-5 text-[#a3a3a3] transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-[#525252] text-[15px] leading-relaxed"
                  >
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

/* ═══════════════════════ ABOUT PAGE ═══════════════════════ */
export default function AboutPage() {

  return (
    <>
      <SEOHead
        title="À propos d'Oumarou Sanda | Du journalisme à l'empire digital IA"
        description="Découvrez le parcours d'Oumarou Sanda : ancien journaliste devenu expert en intelligence artificielle, fondateur de Wendooka, Sanda Vibe Code et CommentSticker, auteur et formateur de centaines d'entrepreneurs africains. Son histoire, sa vision, ses résultats."
        canonical="/a-propos"
        ogTitle="L'histoire d'Oumarou Sanda — De la télé à la révolution IA en Afrique"
        schema={ABOUT_SCHEMA}
      />
      <HeroAbout />
      <ChapterOne />
      <ChapterTwo />
      <ChapterThree />
      <Ecosystem />
      <Timeline />
      <ValuesSection />
      <StatsGrid />
      <VisionCTA />
      <FAQAbout />
    </>
  );
}
