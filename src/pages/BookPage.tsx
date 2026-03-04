import { motion } from 'framer-motion';
import { useInView } from '../components/useInView';
import { SEOHead } from '../components/SEOHead';
import { BookOpen, Download, CheckCircle2, Star, Quote, Zap, Target, Book, ChevronRight } from 'lucide-react';

export default function BookPage() {
  const { ref: section1Ref, isInView: section1InView } = useInView(0.1);
  const { ref: section2Ref, isInView: section2InView } = useInView(0.1);
  const { ref: compareRef, isInView: compareInView } = useInView(0.1);


  return (
    <>
      <SEOHead
        title="Livres | Si l'Afrique rate l'IA & Le Cerveau Augmenté — Oumarou Sanda"
        description="Découvrez les livres d'Oumarou Sanda : «Si l'Afrique rate l'IA, elle rate le Futur», l'essai-manifeste sur la souveraineté numérique africaine (mai 2026), et «Le Cerveau Augmenté», le système mental pour maîtriser l'IA."
        canonical="/livres"
        schema={{ "@context": "https://schema.org", "@graph": [ { "@type": "Book", "name": "Si l'Afrique rate l'IA, elle rate le Futur", "author": { "@type": "Person", "name": "Oumarou Sanda" }, "inLanguage": "fr", "genre": "Non-fiction" }, { "@type": "Book", "name": "Le Cerveau Augmenté", "author": { "@type": "Person", "name": "Oumarou Sanda" }, "inLanguage": "fr", "genre": "Non-fiction" } ] }}
      />
    <div className="bg-[#fafafa] min-h-screen">

      {/* SECTION 01 — HERO LIVRES */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-white/5 section-dark">
        <div className="absolute inset-0 bg-grid-dark opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.10)_0%,transparent_70%)] opacity-50 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <span className="inline-block px-4 py-1.5 bg-gold/15 border border-gold/30 text-gold rounded-full text-[11px] font-bold uppercase tracking-widest mb-8 shadow-sm">
                Mes Livres
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[4rem] text-white font-black leading-[1.1] mb-6 tracking-tight">
                Les idées qui changent<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] block mt-2">des vies et des continents.</span>
              </h1>
              <p className="text-white/70 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
                Deux ouvrages. Deux ambitions. L'un te donne un système mental pour dominer l'IA au quotidien. L'autre est un cri d'alerte pour tout un continent. Les deux sont écrits avec la même obsession : que tu passes de spectateur à acteur.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 relative"
            >
              <div className="absolute inset-0 bg-gold/5 blur-[100px] rounded-full" />
              <div className="relative w-[240px] md:w-[280px] -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out z-10">
                <div className="absolute -inset-2 bg-gradient-to-br from-gold/30 to-transparent rounded-2xl blur-lg opacity-50"></div>
                <img
                  src="/Le Cerveau Augmenté .webp"
                  alt="Livre Cerveau Augmenté"
                  width={280}
                  height={380}
                  loading="lazy"
                  className="relative w-full h-auto drop-shadow-2xl rounded-r-lg"
                />
              </div>

              <div className="relative w-[240px] md:w-[280px] rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out md:-ml-12 z-20">
                <div className="absolute -inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-2xl blur-lg opacity-50"></div>
                <img
                  src="/Couverture livre si lafrique rate lia elle rate le futur .webp"
                  alt="Livre Si l'Afrique rate l'IA, elle rate le Futur"
                  width={280}
                  height={380}
                  loading="lazy"
                  className="relative w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg"
                />
                <div className="absolute -top-4 -right-4 bg-white text-[#0a0a0a] text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                  Bientôt
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LIVRE 01 — ESSAI-MANIFESTE */}
      < section id="livre-01" className="py-24 relative overflow-hidden bg-[#fafafa] border-b border-black/5" >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/3 to-transparent pointer-events-none" />
        <div ref={section1Ref} className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-20">
            {/* Content Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={section1InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 text-gold-dark rounded-full text-[11px] font-bold uppercase tracking-wider mb-6">
                <Star className="w-3.5 h-3.5" /> Précommande • Sortie Mai 2026 • Ebook + Physique
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl leading-[1.1] font-black text-[#0a0a0a] mb-4">
                SI L'AFRIQUE RATE L'INTELLIGENCE ARTIFICIELLE, <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">ELLE RATE LE FUTUR</span>
              </h2>
              <p className="text-xl text-[#525252] italic mb-8">
                Alerte aux décideurs et à la jeunesse du continent
              </p>

              <div className="prose prose-lg max-w-none mb-10 text-[#525252]">
                <p className="text-[#0a0a0a] font-semibold text-xl mb-6">
                  L'Afrique reçoit 0,02% du financement IA mondial. Ce livre explique pourquoi — et comment changer ça.
                </p>
                <p className="mb-4">
                  Pendant que les États-Unis investissent 109 milliards de dollars par an dans l'IA et que la Chine dépose 70% des brevets mondiaux, l'Afrique regarde passer le train. Encore une fois.
                </p>
                <p className="mb-4">
                  Après le coton. Après le pétrole. Après le coltan. Après le mobile. Après les réseaux sociaux. Après le cloud. Le schéma se répète : l'Afrique adopte la technologie comme consommatrice, mais ne construit ni les outils, ni la propriété intellectuelle, ni l'infrastructure. Et quand la vague suivante arrive, elle repart de zéro.
                </p>
                <p className="mb-6">
                  Avec l'IA, les enjeux sont 100 fois plus grands. Parce que l'intelligence artificielle n'est pas une technologie de plus. C'est la technologie qui façonne toutes les autres.
                </p>
              </div>

              <div className="bg-white shadow-sm rounded-2xl p-6 sm:p-8 mb-10 border border-gold/20 relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 text-gold" />
                </div>
                <p className="text-xl sm:text-2xl text-[#0a0a0a] font-heading font-bold italic text-center">
                  "Vous avez 5 ans pour tout changer.<br /> Après, c'est trop tard."
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <button className="flex-1 px-8 py-4 bg-[#0a0a0a] text-white font-heading font-black text-sm uppercase tracking-wider rounded-xl hover:bg-black hover:shadow-lg transition-all flex items-center justify-center gap-3">
                  <BookOpen className="w-5 h-5" />
                  Précommander le livre
                </button>
                <button className="flex-1 px-8 py-4 bg-white border border-black/10 text-[#0a0a0a] font-heading font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-[#fafafa] transition-all flex items-center justify-center gap-3">
                  <Download className="w-5 h-5 text-gold" />
                  Recevoir Un Extrait gratuit
                </button>
              </div>
            </motion.div>

            {/* Right Side / Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={section1InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1"
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-heading font-black text-[#0a0a0a] mb-6">Ce que ce livre démontre :</h3>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-[#fafafa] border border-black/10 flex items-center justify-center text-gold font-bold text-sm">1</div>
                      <div>
                        <h4 className="text-[#0a0a0a] font-bold mb-2">LE DIAGNOSTIC</h4>
                        <p className="text-[#525252] text-sm leading-relaxed">Comment des algorithmes conçus à San Francisco et Shanghai gouvernent déjà les vies africaines. Le scoring de crédit qui décide de ton avenir sans ton consentement. Les GAFAM comme nouveaux maîtres invisibles. Les 2 144 langues africaines ignorées par l'IA mondiale. L'infrastructure physique de la dépendance.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-[#fafafa] border border-black/10 flex items-center justify-center text-gold font-bold text-sm">2</div>
                      <div>
                        <h4 className="text-[#0a0a0a] font-bold mb-2">LES RESPONSABLES</h4>
                        <p className="text-[#525252] text-sm leading-relaxed">Les États qui sous-investissent (0,33% du PIB en R&D, en baisse). Le secteur privé qui consomme au lieu de créer. Les 70 000 professionnels qualifiés qui quittent l'Afrique chaque année — et pourquoi ils partent. Ce chapitre nomme les coupables, données à l'appui.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-[#fafafa] border border-black/10 flex items-center justify-center text-gold font-bold text-sm">3</div>
                      <div>
                        <h4 className="text-[#0a0a0a] font-bold mb-2">L'ANTIDOTE</h4>
                        <p className="text-[#525252] text-sm leading-relaxed">Les 5 urgences absolues : former 1 million d'ingénieurs IA, construire 1 000 data centers souverains, réguler sans brider, investir 10 milliards $ en 5 ans, ramener la diaspora. Avec des modèles réels : comment Israël, l'Inde et l'Estonie ont réussi — et comment l'Afrique peut les surpasser.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-[#fafafa] border border-black/10 flex items-center justify-center text-gold font-bold text-sm">4</div>
                      <div>
                        <h4 className="text-[#0a0a0a] font-bold mb-2">LA VISION</h4>
                        <p className="text-[#525252] text-sm leading-relaxed">Ce qui est possible d'ici 2035. Les opportunités invisibles en santé, agriculture, langues et finance. Les histoires de ceux qui n'ont pas attendu. Et un épilogue-manifeste avec 10 engagements collectifs pour la souveraineté IA africaine.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-black/5 shadow-sm">
                  <h4 className="text-[#0a0a0a] font-bold mb-4 font-heading">Le livre en chiffres :</h4>
                  <ul className="space-y-3">
                    {[
                      "150-180 pages documentées avec des sources vérifiables",
                      "12 chapitres en 4 parties structurées",
                      "200+ données chiffrées citées (Stanford HAI, MIT, FMI)",
                      "Cas réels : Zipline, Ubenwa, Hello Tractor, Masakhane...",
                      "Modèles comparés : Israël, Inde, Estonie, Corée du Sud",
                      "Un épilogue-manifeste avec 10 engagements collectifs"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                        <span className="text-[#525252] text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 border-t border-black/5 pt-16">
            <div>
              <h3 className="text-2xl font-heading font-black text-[#0a0a0a] mb-6">Pour qui ?</h3>
              <ul className="space-y-3">
                <li className="flex gap-3"><ChevronRight className="w-5 h-5 text-gold shrink-0 mt-0.5" /><span className="text-[#525252] text-sm">Décideurs politiques africains qui négocient avec les GAFAM et la Chine sans comprendre les enjeux.</span></li>
                <li className="flex gap-3"><ChevronRight className="w-5 h-5 text-gold shrink-0 mt-0.5" /><span className="text-[#525252] text-sm">Entrepreneurs et investisseurs qui veulent comprendre où se trouvent les opportunités IA en Afrique.</span></li>
                <li className="flex gap-3"><ChevronRight className="w-5 h-5 text-gold shrink-0 mt-0.5" /><span className="text-[#525252] text-sm">Jeunes africains (60%+ de la pop a &lt;25 ans) qui veulent construire, pas subir.</span></li>
                <li className="flex gap-3"><ChevronRight className="w-5 h-5 text-gold shrink-0 mt-0.5" /><span className="text-[#525252] text-sm">Chercheurs, journalistes et activistes de la souveraineté numérique.</span></li>
                <li className="flex gap-3"><ChevronRight className="w-5 h-5 text-gold shrink-0 mt-0.5" /><span className="text-[#525252] text-sm">Diaspora africaine qui hésite entre rester et rentrer.</span></li>
                <li className="flex gap-3"><ChevronRight className="w-5 h-5 text-gold shrink-0 mt-0.5" /><span className="text-[#525252] text-sm">Toute personne qui pense que l'Afrique mérite mieux que 0,02% du financement IA mondial.</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-heading font-black text-[#0a0a0a] mb-6">Pourquoi cet auteur ?</h3>
              <p className="text-[#525252] text-sm mb-4 leading-relaxed">
                Oumarou Sanda n'est pas un théoricien qui écrit depuis une université occidentale. C'est un entrepreneur africain, basé à Ngaoundéré, au Cameroun, qui utilise l'IA chaque jour pour créer des businesses, former des centaines d'entrepreneurs et produire du contenu suivi par plus de 125 000 personnes.
              </p>
              <p className="text-[#525252] text-sm leading-relaxed">
                Ce livre est né d'un constat vécu de l'intérieur : l'Afrique a le talent, la jeunesse et la faim. Il ne lui manque que la stratégie, l'infrastructure et la volonté politique. Ce livre est à la fois un diagnostic et un plan de bataille.
              </p>
            </div>
          </div>
        </div>
      </section >


      {/* LIVRE 02 — EBOOK SYSTÈME */}
      < section id="livre-02" className="py-24 relative overflow-hidden bg-white text-[#0a0a0a]" >
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div ref={section2Ref} className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={section2InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-10 bg-gradient-to-tr from-gray-200 to-white rounded-full blur-3xl opacity-80" />
                <div className="relative w-64 sm:w-80 aspect-[3/4] rounded-xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-gray-200 bg-white p-8 px-10 flex flex-col justify-center items-center text-center transform -rotate-2">
                  <span className="text-[#0a0a0a] font-black text-3xl font-heading mb-4 leading-tight tracking-tight uppercase">LE CERVEAU<br />AUGMENTÉ</span>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6" />
                  <p className="text-[#737373] text-sm font-bold uppercase mb-4 tracking-wider">Oumarou Sanda</p>
                  <p className="text-[#333333] text-sm font-medium">Le système mental pour penser, décider et produire avec l'IA</p>
                  <div className="mt-8">
                    <Book className="w-8 h-8 text-blue-600/20" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={section2InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-[11px] font-bold uppercase tracking-wider mb-6">
                DISPONIBLE MAINTENANT • 100% avis positifs • 17+ achats
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#0a0a0a] mb-6 tracking-tight">
                LE CERVEAU AUGMENTÉ™
              </h2>
              <h3 className="text-xl text-[#737373] font-semibold mb-6">Le système mental pour penser, décider et produire avec l'IA.</h3>

              <p className="text-[#333333] font-bold text-lg mb-4">
                ChatGPT ne te rend pas intelligent. Il amplifie la manière dont tu penses.
              </p>
              <p className="text-[#525252] leading-relaxed mb-4">
                On t'a appris à copier des prompts. À poser des questions. À attendre des réponses. Mais personne ne t'a appris à PENSER avec une IA. Résultat : confusion, dépendance, productivité artificielle. Le Cerveau Augmenté corrige ça.
              </p>
              <p className="text-[#525252] leading-relaxed mb-8">
                Ce n'est pas un ebook de motivation. C'est un système mental clair, structuré et actionnable, conçu spécifiquement pour le contexte africain.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 mb-8">
                <h4 className="font-heading font-bold text-[#0a0a0a] mb-4 tracking-wide">Contenu inclus :</h4>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <BookOpen className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <span className="font-bold text-[#0a0a0a] text-sm">EBOOK PRINCIPAL (34 pages)</span>
                      <p className="text-[#737373] text-sm mt-1">Comment penser AVANT d'utiliser l'IA. Comment transformer ChatGPT en assistant stratégique. Comment produire plus sans t'épuiser.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Zap className="w-5 h-5 text-gold shrink-0" />
                    <div>
                      <span className="font-bold text-[#0a0a0a] text-sm">CATALOGUE DE PROMPTS (83 pages)</span>
                      <p className="text-[#737373] text-sm mt-1">200 prompts stratégiques — pas des prompts génériques, des prompts qui font travailler ChatGPT à ta place.</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-blue-600 shrink-0" />
                    <span className="text-[#050505]/80 text-sm font-medium">Vidéo exclusive + PowerPoint de synthèse</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-[#050505] text-white rounded-2xl shadow-xl">
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1 line-through">19 900 FCFA</p>
                  <p className="text-3xl font-black text-gold">4 900 FCFA</p>
                  <p className="text-white/40 text-[10px] mt-2">Accès immédiat. Garantie 30 jours.</p>
                </div>
                <a href="https://academy.oumarousanda.com/cerveau-augmente" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-[#050505] font-heading font-black text-sm uppercase tracking-wider rounded-xl hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] transition-all shrink-0 text-center">
                  Télécharger
                </a>
              </div>

            </motion.div>
          </div>

          <div className="mt-20">
            <h3 className="font-heading text-2xl font-bold text-center mb-10">Ce qu'en disent les lecteurs</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Mohamadou Nouroudini H.", text: "Voici le guide qu'il faut pour faire travailler l'IA à notre place. Un point de départ pour gagner de l'argent avec les IA." },
                { name: "Amira A.", text: "Votre ebook est vraiment wow. Très explicite, même quelqu'un qui n'a jamais entendu parler d'IA pourrait suivre." },
                { name: "Sakinatou Y.", text: "Clair, motivant et très utile. Il m'a aidé à mieux comprendre comment penser et décider dans le monde de l'IA." }
              ].map((t, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-[#525252] text-sm italic mb-4 leading-relaxed">"{t.text}"</p>
                  <p className="text-[#0a0a0a] font-bold text-xs">— {t.name}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section >


      {/* SECTION BONUS — COMPARATIF */}
      < section className="py-24 bg-white border-t border-black/5 relative" >
        <div ref={compareRef} className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={compareInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#0a0a0a] mb-4">
                QUEL LIVRE EST FAIT POUR TOI ?
              </h2>
              <p className="text-[#525252] text-lg">Un comparatif simple pour t'aider à choisir.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap lg:whitespace-normal">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="p-4 bg-[#fafafa] font-semibold text-[#a3a3a3] w-1/4 rounded-tl-xl">Critère</th>
                    <th className="p-4 bg-[#fafafa] font-black text-lg text-[#0a0a0a] w-2/5 border-l border-black/5">Si l'Afrique rate l'IA</th>
                    <th className="p-4 bg-[#fafafa] font-black text-lg text-[#0a0a0a] w-2/5 border-l border-black/5 rounded-tr-xl">Le Cerveau Augmenté</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-black/5">
                    <td className="p-4 font-semibold text-[#a3a3a3] bg-[#fafafa]">Type</td>
                    <td className="p-4 text-[#525252] border-l border-black/5 bg-white">Essai-manifeste (150-180 pages)</td>
                    <td className="p-4 text-[#525252] border-l border-black/5 bg-white">Ebook système (34 pages + bonus)</td>
                  </tr>
                  <tr className="border-b border-black/5">
                    <td className="p-4 font-semibold text-[#a3a3a3] bg-[#fafafa]">Tu veux...</td>
                    <td className="p-4 text-[#525252] border-l border-black/5 bg-white whitespace-normal">Comprendre les enjeux IA pour l'Afrique et agir</td>
                    <td className="p-4 text-[#525252] border-l border-black/5 bg-white whitespace-normal">Maîtriser l'IA au quotidien et produire plus</td>
                  </tr>
                  <tr className="border-b border-black/5">
                    <td className="p-4 font-semibold text-[#a3a3a3] bg-[#fafafa]">Format</td>
                    <td className="p-4 text-[#525252] border-l border-black/5 bg-white">Ebook + Livre physique</td>
                    <td className="p-4 text-[#525252] border-l border-black/5 bg-white">Ebook (PDF + Vidéo + PPT)</td>
                  </tr>
                  <tr className="border-b border-black/5">
                    <td className="p-4 font-semibold text-[#a3a3a3] bg-[#fafafa]">Prix</td>
                    <td className="p-4 text-gold font-bold border-l border-black/5 bg-white">19,99 €</td>
                    <td className="p-4 text-gold font-bold border-l border-black/5 bg-white">4 900 FCFA</td>
                  </tr>
                  <tr className="border-b border-black/5">
                    <td className="p-4 font-semibold text-[#a3a3a3] bg-[#fafafa]">Disponibilité</td>
                    <td className="p-4 text-[#525252] border-l border-black/5 bg-white">Précommande (mai 2026)</td>
                    <td className="p-4 text-emerald-600 font-bold border-l border-black/5 bg-white">Disponible maintenant</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-[#a3a3a3] bg-[#fafafa] rounded-bl-xl">Public</td>
                    <td className="p-4 text-[#525252] border-l border-black/5 bg-white whitespace-normal">Décideurs, entrepreneurs, jeunesse, diaspora</td>
                    <td className="p-4 text-[#525252] border-l border-black/5 bg-white whitespace-normal rounded-br-xl">Entrepreneurs, créateurs, étudiants</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 bg-gold/5 border border-gold/10 rounded-2xl text-center">
              <p className="text-[#525252] text-sm leading-relaxed">
                <span className="text-gold-dark font-bold">Les deux se complètent parfaitement :</span> Le Cerveau Augmenté te donne le système pour agir maintenant. Si l'Afrique rate l'IA te donne la vision pour comprendre pourquoi agir est urgent.
              </p>
            </div>
          </motion.div>
        </div>
      </section >

      {/* SECTION FINALE — CTA */}
      < section className="py-24 bg-[#fafafa] relative overflow-hidden border-t border-black/5" >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-40" />
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#0a0a0a] mb-6">
            Lire, c'est bien.<br />
            <span className="text-gold">Agir après avoir lu, c'est transformer.</span>
          </h2>
          <p className="text-[#525252] text-lg mb-12">
            Chaque page de ces livres est écrite pour provoquer un passage à l'action. Pas de la littérature. Du carburant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#livre-01" className="px-8 py-4 bg-white border border-black/10 text-[#0a0a0a] font-heading font-black text-sm uppercase tracking-wider rounded-xl hover:bg-[#fafafa] hover:border-black/20 transition-all shadow-sm">
              Précommander "Si l'Afrique rate l'IA"
            </a>
            <a href="#livre-02" className="px-8 py-4 bg-[#0a0a0a] text-white font-heading font-black text-sm uppercase tracking-wider rounded-xl hover:bg-black hover:shadow-lg transition-all">
              Télécharger Le Cerveau Augmenté
            </a>
          </div>
        </div>
      </section >

    </div >
    </>
  );
}
