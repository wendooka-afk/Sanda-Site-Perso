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
import { useLanguage } from '../i18n';
import { aboutTexts } from '../i18n/pages/about';

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
      "image": "https://oumarousanda.com/oumarou-sanda-1.webp",
      "birthPlace": { "@type": "Place", "addressCountry": "CM", "addressRegion": "Adamaoua", "addressLocality": "Ngaoundéré" },
      "nationality": "Camerounaise",
      "knowsLanguage": ["fr", "en"],
      "sameAs": [
        "https://www.youtube.com/@Oumarou_Sanda",
        "https://www.tiktok.com/@iamsanda",
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
  const { language } = useLanguage();
  const tx = aboutTexts[language];

  return (
    <section className="relative min-h-[90dvh] flex items-center overflow-hidden section-dark border-b border-white/5">
      <div className="absolute inset-0 bg-grid-dark opacity-60" />
      <div className="absolute inset-0 bg-noise mix-blend-luminosity opacity-[0.03]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/15 text-gold font-bold text-[11px] tracking-wider uppercase mb-8 shadow-sm">
              {tx.hero.badge}
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.2] mb-8 tracking-tight text-white">
              {tx.hero.headingLine1}<br />
              <span className="text-gold block mt-2">{tx.hero.headingLine2}</span>
            </h1>
            <p className="text-white/65 text-lg sm:text-xl leading-relaxed max-w-xl font-inter">
              {tx.hero.description}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative h-[500px] lg:h-[700px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl bg-white/5">
            <img src="/oumarou-sanda-5.webp" alt="Oumarou Sanda" className="absolute inset-0 w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ CHAPITRE 1 : L'ORIGINE ═══════════════════════ */
function ChapterOne() {
  const { language } = useLanguage();
  const tx = aboutTexts[language];

  return (
    <section className="relative py-24 sm:py-32 bg-[#fafafa] border-b border-black/5">
      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={0.1}>
          <span className="text-coral-600 font-bold tracking-widest uppercase text-sm mb-4 block">{tx.chapter1.label}</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#0a0a0a] mb-8 leading-tight">
            {tx.chapter1.heading}
          </h2>
          <div className="prose max-w-none prose-lg text-[#525252] font-inter space-y-6">
            <p>
              {tx.chapter1.p1}
            </p>
            <p>
              {tx.chapter1.p2}
            </p>
            <blockquote className="border-l-4 border-gold bg-gold/5 p-6 rounded-r-xl my-10 italic text-[#0a0a0a] font-medium text-xl shadow-sm">
              <Quote className="w-8 h-8 text-gold-dark mb-3" />
              {tx.chapter1.quote}
            </blockquote>
            <p className="text-[#0a0a0a] font-bold">
              {tx.chapter1.bold}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════ CHAPITRE 2 : LA TRANSITION ═══════════════════════ */
function ChapterTwo() {
  const { language } = useLanguage();
  const tx = aboutTexts[language];

  return (
    <section className="relative py-24 sm:py-32 bg-white border-b border-black/5 overflow-hidden">
      <div className="absolute -left-1/4 top-1/2 -translate-y-1/2 w-1/2 h-[500px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={0.1}>
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">{tx.chapter2.label}</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#0a0a0a] mb-8 leading-tight">
            {tx.chapter2.heading}
          </h2>
          <div className="prose max-w-none prose-lg text-[#525252] font-inter space-y-6">
            <p dangerouslySetInnerHTML={{ __html: tx.chapter2.p1 }} />
            <p>
              {tx.chapter2.p2}
            </p>
            <p>
              {tx.chapter2.p3} <strong className="text-gold-dark">{tx.chapter2.p3Bold}</strong>
            </p>
            <div className="bg-[#fafafa] border border-black/5 p-6 rounded-2xl inline-block mt-4 shadow-sm">
              <p className="text-2xl font-black text-[#0a0a0a] m-0">{tx.chapter2.proofBox}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════ CHAPITRE 3 : LE DÉCLIC IA ═══════════════════════ */
function ChapterThree() {
  const { language } = useLanguage();
  const tx = aboutTexts[language];

  return (
    <section className="relative py-24 sm:py-32 bg-white border-b border-black/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent opacity-60" />
      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <Reveal direction="up" delay={0.1}>
          <span className="text-violet-600 font-bold tracking-widest uppercase text-sm mb-6 block">{tx.chapter3.label}</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-black text-[#0a0a0a] mb-10 leading-[1.1] tracking-tight">
            {tx.chapter3.headingLine1}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">{tx.chapter3.headingLine2}</span>
          </h2>
          <div className="prose max-w-none prose-lg text-[#525252] font-inter space-y-6 mx-auto text-left sm:text-center mt-12 bg-[#fafafa] p-8 sm:p-12 rounded-[2rem] border border-black/5 shadow-xl">
            <p>
              {tx.chapter3.p1}
            </p>
            <p className="font-black text-[#0a0a0a] text-2xl py-4">{tx.chapter3.bold}</p>
            <p>
              {tx.chapter3.p2}
            </p>
            <p className="text-gold-dark font-bold">{tx.chapter3.coursesIntro}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════ ÉCOSYSTÈME ═══════════════════════ */
function Ecosystem() {
  const { language } = useLanguage();
  const tx = aboutTexts[language];

  const icons = [Globe, Sparkles, Target, BookOpen, Youtube];
  const colors = ["text-blue-600", "text-coral-600", "text-emerald-600", "text-gold-dark", "text-[#FF0000]"];
  const bgs = ["bg-blue-500/10", "bg-coral-500/10", "bg-emerald-500/10", "bg-gold/10", "bg-[#FF0000]/10"];
  const links = ["https://wendooka.com", "https://sandavibecode.com", "https://commentsticker.com", undefined, undefined];

  const pillars = tx.ecosystem.pillars.map((p, i) => ({
    ...p,
    icon: icons[i],
    color: colors[i],
    bg: bgs[i],
    link: links[i],
  }));

  return (
    <section className="relative py-24 sm:py-32 bg-[#fafafa] overflow-hidden border-b border-black/5">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <span className="text-gold-dark font-bold tracking-widest uppercase text-sm mb-4 block">{tx.ecosystem.label}</span>
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-[#0a0a0a] mb-6">
              {tx.ecosystem.headingLine1}<br /><span className="text-gold-dark">{tx.ecosystem.headingLine2}</span>
            </h2>
            <p className="text-[#525252] text-lg max-w-2xl mx-auto">{tx.ecosystem.subtitle}</p>
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
                <span className={`${p.color} text-[12px] font-bold uppercase tracking-wider mb-4 block`}>- {p.subtitle}</span>
                <p className="text-[#525252] text-[14px] leading-relaxed mb-6 flex-1">{p.desc}</p>
                {p.link && ('linkText' in p) && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#a3a3a3] hover:text-[#0a0a0a] font-bold text-[13px] transition-colors group">
                    → {(p as typeof p & { linkText: string }).linkText}
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
  const { language } = useLanguage();
  const tx = aboutTexts[language];

  const events = tx.timeline.events;

  return (
    <section className="relative py-24 sm:py-32 bg-white border-b border-black/5">
      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#0a0a0a] mb-4">{tx.timeline.heading}</h2>
            <p className="text-[#525252] text-lg font-medium">{tx.timeline.subtitle}</p>
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
  const { language } = useLanguage();
  const tx = aboutTexts[language];

  const values = tx.values.items;

  return (
    <section className="relative py-24 sm:py-32 bg-[#fafafa]">
      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#0a0a0a] mb-4">{tx.values.heading}</h2>
            <p className="text-[#525252] text-xl font-medium">{tx.values.subtitle}</p>
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
  const { language } = useLanguage();
  const tx = aboutTexts[language];

  const stats = tx.stats;

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
  const { language, localePath } = useLanguage();
  const tx = aboutTexts[language];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 section-dark overflow-hidden text-center border-b border-white/5">
      <div className="absolute inset-0 bg-grid-dark opacity-60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[600px] bg-blue/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal direction="up" delay={0.1}>
          <span className="text-gold font-bold tracking-widest uppercase text-sm mb-6 block">{tx.vision.label}</span>
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-10 leading-tight">
            {tx.vision.headingLine1}<br /><span className="text-gold">{tx.vision.headingLine2}</span>
          </h2>
          <blockquote className="text-lg sm:text-2xl text-[#525252] font-medium italic leading-relaxed mb-12 border-l-4 border-blue-500 pl-6 text-left shadow-sm">
            {tx.vision.quote}
          </blockquote>
          <p className="text-[#525252] text-lg mb-16 text-left">
            {tx.vision.paragraph}
          </p>

          <div className="pt-16 border-t border-white/10">
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-white mb-4">{tx.vision.ctaHeadingLine1}<br />{tx.vision.ctaHeadingLine2}</h3>
            <p className="text-white/60 mb-10">{tx.vision.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={localePath('/formations')} className="btn-premium group px-8 py-5 bg-gold text-[#0a0a0a] font-bold text-[14px] rounded-xl hover:bg-white transition-all flex items-center justify-center uppercase tracking-wider shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] glow-hover">
                {tx.vision.btnCourses}
              </Link>
              <Link to={localePath('/contact')} className="px-8 py-5 border-2 border-white/25 text-white font-bold text-[14px] rounded-xl hover:bg-white/10 transition-colors uppercase tracking-wider">
                {tx.vision.btnWork}
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <a href="https://www.youtube.com/@Oumarou_Sanda" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#FF0000]/5 text-[#FF0000] font-bold text-[14px] rounded-xl hover:bg-[#FF0000]/10 transition-colors uppercase tracking-wider flex items-center justify-center gap-2 border border-[#FF0000]/10">
                <Youtube className="w-5 h-5" /> {tx.vision.btnYoutube}
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
  const { language } = useLanguage();
  const tx = aboutTexts[language];

  const faqs = tx.faq.items;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-[#fafafa] border-t border-black/5">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <h2 className="font-black text-[#0a0a0a] mb-8 text-center tracking-widest text-sm uppercase">{tx.faq.heading}</h2>
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
  const { language } = useLanguage();
  const tx = aboutTexts[language];

  return (
    <>
      <SEOHead
        title={tx.seo.title}
        description={tx.seo.description}
        canonical="/a-propos"
        ogTitle={tx.seo.ogTitle}
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
