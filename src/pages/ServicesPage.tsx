import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import {
    ArrowRight, Globe, Settings, Video, Target,
    CheckCircle2, MessageCircle, Star, ChevronDown
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { useLanguage } from '../i18n';
import { servicesTexts } from '../i18n/pages/services';

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
    const { language, localePath } = useLanguage();
    const tx = servicesTexts[language];

    return (
        <section id="hero-services" className="relative min-h-[85dvh] flex items-center overflow-hidden section-dark pt-32 pb-20 border-b border-white/5">
            <div className="absolute inset-0 bg-grid-dark opacity-60" />
            <div className="absolute inset-0 bg-noise mix-blend-luminosity opacity-[0.03]" />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-left">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/15 text-gold font-bold text-[11px] tracking-wider uppercase mb-8 shadow-sm">
                            {tx.hero.badge}
                        </div>
                        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.2] mb-8 tracking-tight text-white">
                            {tx.hero.heading}<br />
                            {tx.hero.headingLine2} <span className="text-gold block mt-2">{tx.hero.headingHighlight}</span>
                        </h1>
                        <p className="text-white/65 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10 font-inter">
                            {tx.hero.description} <strong className="text-white">{tx.hero.descriptionBold}</strong>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to={localePath('/contact')} className="group px-8 py-4 bg-gold text-[#0a0a0a] font-bold text-[14px] rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 uppercase tracking-wider shadow-md hover:shadow-[0_8px_25px_rgba(212,175,55,0.4)]">
                                {tx.hero.ctaPrimary} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to={localePath('/contact')} className="px-8 py-4 border-2 border-white/25 text-white font-bold text-[14px] rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center uppercase tracking-wider">
                                {tx.hero.ctaSecondary}
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative h-[400px] lg:h-[600px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl bg-white/5">
                        <img src="/oumarou-sanda-8.webp" alt={tx.hero.imgAlt} className="absolute inset-0 w-full h-full object-cover object-top" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-40" />
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
    const { language } = useLanguage();
    const tx = servicesTexts[language];

    const icons = [Globe, Settings, Video, Target];
    const colors = ["text-blue-600", "text-gold-dark", "text-emerald-600", "text-coral-600"];

    return (
        <section className="relative py-16 bg-[#fafafa] border-b border-black/5">
            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tx.overview.cards.map((o, i) => (
                        <Reveal key={i} direction="up" delay={i * 0.1}>
                            <div className="p-6 rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/5 hover:border-black/15 group cursor-pointer transition-all hover:shadow-md card-hover-lift" onClick={() => document.getElementById(`service-${o.id}`)?.scrollIntoView({ behavior: 'smooth' })}>
                                <div className="flex justify-between items-start mb-4">
                                    {(() => { const Icon = icons[i]; return <Icon className={`w-6 h-6 ${colors[i]}`} />; })()}
                                    <span className="text-[#a3a3a3] font-bold text-lg">{o.id}</span>
                                </div>
                                <h3 className="font-heading font-black text-[#0a0a0a] text-[15px] mb-2">{o.title}</h3>
                                <p className="text-[#525252] text-[13px] mb-6 line-clamp-2 leading-relaxed">{o.desc}</p>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#737373] group-hover:text-gold-dark transition-colors inline-flex items-center gap-1">
                                    {tx.overview.learnMore} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
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
    const { language, localePath } = useLanguage();
    const tx = servicesTexts[language];

    return (
        <section id="service-01" className="relative py-24 sm:py-32 bg-white overflow-hidden border-b border-black/5">
            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    <Reveal direction="left" delay={0.1}>
                        <div>
                            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">{tx.service01.label}</span>
                            <h2 className="font-heading text-4xl sm:text-5xl font-black mb-8 leading-tight text-[#0a0a0a]">
                                {tx.service01.headingLine1}<br />
                                <span className="text-blue-600">{tx.service01.headingHighlight}</span>
                            </h2>
                            <div className="space-y-6 text-[#525252] text-lg mb-10 font-inter">
                                <p>{tx.service01.descParagraph1}</p>
                                <p>{tx.service01.descParagraph2Start}<strong className="text-[#0a0a0a]">{tx.service01.descParagraph2Bold}</strong>{tx.service01.descParagraph2End}</p>
                            </div>

                            <div className="mb-10">
                                <h3 className="font-bold text-[#0a0a0a] text-xl mb-6">{tx.service01.featuresTitle}</h3>
                                <ul className="space-y-4">
                                    {tx.service01.features.map((f, i) => (
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
                                <h3 className="font-bold text-[#0a0a0a] text-xl mb-4">{tx.service01.whyTitle}</h3>
                                <p className="text-[#525252] text-[15px] leading-relaxed">
                                    {tx.service01.whyText} <strong className="text-[#0a0a0a]">{tx.service01.whyBold}</strong>
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Link to={localePath('/contact')} className="btn-premium px-8 py-4 bg-[#0a0a0a] text-white font-bold text-[14px] rounded-xl hover:bg-blue-600 hover:shadow-[0_15px_40px_rgba(37,99,235,0.4)] transition-all uppercase tracking-wider glow-hover">
                                    {tx.service01.ctaPrimary}
                                </Link>
                                <a href="https://wendooka.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white border-2 border-black/10 text-[#0a0a0a] font-bold text-[14px] rounded-xl hover:border-black/30 hover:bg-black/5 transition-colors uppercase tracking-wider flex items-center gap-2">
                                    {tx.service01.ctaSecondary} <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal direction="right" delay={0.1}>
                        <div className="bg-[#fafafa] rounded-[2rem] p-8 lg:p-12 text-[#0a0a0a] shadow-[0_20px_60px_rgba(0,0,0,0.06)] relative border border-black/5 card-luxury card-hover-lift glow-hover">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent blur-2xl rounded-tr-[2rem]" />
                            <Globe className="w-12 h-12 text-blue-500 mb-8" />
                            <h3 className="text-2xl font-black mb-6">{tx.service01.idealTitle}</h3>
                            <ul className="space-y-4 mb-10">
                                {tx.service01.idealItems.map((item, i) => (
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
    const { language, localePath } = useLanguage();
    const tx = servicesTexts[language];

    return (
        <section id="service-02" className="relative py-24 sm:py-32 bg-[#fafafa] overflow-hidden border-b border-black/5">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-50" />
            <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
                <Reveal direction="up" delay={0.1}>
                    <div className="text-center mb-16">
                        <span className="text-gold-dark font-bold tracking-widest uppercase text-sm mb-4 block">{tx.service02.label}</span>
                        <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#0a0a0a] mb-8 leading-tight">
                            {tx.service02.heading}
                        </h2>
                        <p className="text-[#525252] text-lg max-w-2xl mx-auto font-inter">
                            {tx.service02.descStart} <strong className="text-[#0a0a0a]">{tx.service02.descBold}</strong>
                        </p>
                    </div>
                </Reveal>

                <div className="mb-20">
                    <h3 className="font-bold text-2xl text-[#0a0a0a] mb-8 text-center tracking-widest text-sm">{tx.service02.approachTitle} <span className="text-gold-dark">{tx.service02.approachHighlight}</span></h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {tx.service02.phases.map((p, i) => (
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
                            <h3 className="font-bold text-xl text-[#0a0a0a] mb-6">{tx.service02.expertiseTitle}</h3>
                            <ul className="space-y-4">
                                {tx.service02.expertiseItems.map((item, i) => (
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
                                <h3 className="font-bold text-lg text-red-600 mb-3 tracking-wider">{tx.service02.notForYouTitle}</h3>
                                <p className="text-[#525252] text-[15px] leading-relaxed">
                                    {tx.service02.notForYouText}
                                </p>
                            </div>
                            <div className="bg-gold/5 border border-gold/20 p-8 rounded-2xl flex-1">
                                <h3 className="font-bold text-lg text-gold-dark mb-3 tracking-wider">{tx.service02.idealTitle}</h3>
                                <ul className="space-y-3">
                                    {tx.service02.idealItems.map((item, i) => (
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
                    <Link to={localePath('/contact')} className="btn-premium inline-flex items-center justify-center px-10 py-5 bg-[#0a0a0a] text-white font-bold text-[15px] rounded-xl hover:bg-gold transition-all uppercase tracking-wider shadow-[0_10px_30px_rgba(10,10,10,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] glow-hover">
                        {tx.service02.cta}
                    </Link>
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════ SERVICE 03 ═══════════════════════ */
function ServiceVideo() {
    const { language, localePath } = useLanguage();
    const tx = servicesTexts[language];

    return (
        <section id="service-03" className="relative py-24 sm:py-32 bg-white border-b border-black/5">
            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-5 gap-16 items-center">
                    <Reveal direction="left" delay={0.1} className="lg:col-span-2">
                        <div>
                            <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-4 block">{tx.service03.label}</span>
                            <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#0a0a0a] mb-6 leading-[1.1]">
                                {tx.service03.headingLine1}<br />{tx.service03.headingLine2}<br />{tx.service03.headingLine3}
                            </h2>
                            <div className="space-y-6 text-[#525252] text-lg mb-10 font-inter">
                                <p>{tx.service03.descParagraph1}</p>
                                <p>{tx.service03.descParagraph2Start} <strong className="text-[#0a0a0a]">{tx.service03.descParagraph2Bold}</strong>{tx.service03.descParagraph2End}</p>
                            </div>

                            <div className="bg-[#fafafa] border border-black/5 shadow-sm p-8 rounded-2xl mb-10">
                                <h3 className="font-bold text-[#0a0a0a] mb-4 text-xl">{tx.service03.toolsTitle}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {["Google VEO", "Sora", "Wan", "Higgsfield", "ElevenLabs", "Midjourney", "Runway"].map(tool => (
                                        <span key={tool} className="px-3 py-1.5 bg-white border border-black/5 shadow-sm rounded-lg text-[12px] font-bold text-[#737373] uppercase tracking-widest">{tool}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Link to={localePath('/contact')} className="btn-premium px-8 py-4 bg-emerald-600 text-white font-bold text-[14px] rounded-xl hover:bg-emerald-700 transition-all uppercase tracking-wider text-center shadow-[0_10px_30px_rgba(5,150,105,0.3)] glow-hover">
                                    {tx.service03.cta}
                                </Link>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal direction="right" delay={0.1} className="lg:col-span-3">
                        <div>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {tx.service03.productions.map((p, i) => (
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
                                <h3 className="font-bold text-emerald-700 mb-3 text-lg">{tx.service03.whyTitle}</h3>
                                <p className="text-emerald-900/80 text-[15px] leading-relaxed font-medium">{tx.service03.whyText}</p>
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
    const { language } = useLanguage();
    const tx = servicesTexts[language];

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
                                    <p className="text-[#737373] text-[14px] font-bold tracking-widest uppercase">{tx.service04.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal direction="right" delay={0.1}>
                        <div>
                            <span className="text-coral-600 font-bold tracking-widest uppercase text-sm mb-4 block">{tx.service04.label}</span>
                            <h2 className="font-heading text-4xl sm:text-5xl font-black mb-8 leading-[1.1] text-[#0a0a0a]">
                                {tx.service04.headingStart} <span className="text-coral-600">{tx.service04.headingHighlight}</span> {tx.service04.headingEnd}<br />{tx.service04.headingLine2}
                            </h2>
                            <div className="space-y-6 text-[#525252] text-lg mb-10 font-inter">
                                <p>{tx.service04.descParagraph1}</p>
                                <p>{tx.service04.descParagraph2}</p>
                            </div>

                            <div className="bg-coral-50 border border-coral-200 p-8 rounded-2xl mb-10">
                                <h3 className="font-bold text-coral-600 mb-3 text-lg tracking-wider">{tx.service04.whyTitle}</h3>
                                <p className="text-coral-900/80 text-[15px] font-medium leading-relaxed">{tx.service04.whyText}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="https://commentsticker.com" target="_blank" rel="noopener noreferrer" className="btn-premium px-8 py-4 bg-coral-600 text-white font-bold text-[14px] rounded-xl hover:bg-coral-700 transition-all uppercase tracking-wider text-center shadow-[0_10px_30px_rgba(244,114,102,0.3)] glow-hover">
                                    {tx.service04.cta}
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
    const { language } = useLanguage();
    const tx = servicesTexts[language];

    return (
        <section className="relative py-24 sm:py-32 section-blue border-b border-blue-200/60">
            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                <Reveal direction="up" delay={0.1}>
                    <div className="text-center mb-16">
                        <span className="text-blue-700 font-bold tracking-widest uppercase text-sm mb-4 block">{tx.process.label}</span>
                        <h2 className="font-heading text-3xl sm:text-5xl font-black text-[#0a0a0a] mb-6">
                            {tx.process.headingLine1}<br /><span className="text-gold-dark">{tx.process.headingHighlight}</span>
                        </h2>
                    </div>
                </Reveal>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tx.process.steps.map((step, i) => (
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
    const { language } = useLanguage();
    const tx = servicesTexts[language];

    return (
        <section className="relative py-24 sm:py-32 section-dark overflow-hidden border-b border-white/5">
            <div className="absolute inset-0 bg-grid-dark opacity-60" />
            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                <Reveal direction="up" delay={0.1}>
                    <div className="text-center mb-16">
                        <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">{tx.testimonials.label}</span>
                        <h2 className="font-heading text-3xl sm:text-5xl font-black text-white mb-6">
                            {tx.testimonials.heading}<br />{tx.testimonials.headingLine2}
                        </h2>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {tx.testimonials.items.map((t, i) => (
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
    const { language } = useLanguage();
    const tx = servicesTexts[language];

    return (
        <section className="relative py-24 sm:py-32 bg-white border-b border-black/5">
            <div className="relative max-w-4xl mx-auto px-5 sm:px-6">
                <Reveal direction="up" delay={0.1}>
                    <div className="text-center mb-16">
                        <span className="text-gold-dark font-bold tracking-widest uppercase text-sm mb-4 block">{tx.pricing.label}</span>
                        <h2 className="font-heading text-3xl sm:text-5xl font-black text-[#0a0a0a] mb-6">
                            {tx.pricing.headingLine1}<br />{tx.pricing.headingLine2}
                        </h2>
                    </div>
                </Reveal>

                <Reveal direction="up" delay={0.2}>
                    <div className="overflow-x-auto rounded-2xl border border-black/10 mb-8 bg-[#fafafa] shadow-[0_10px_40px_rgba(0,0,0,0.04)] card-hover-lift">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black/5 border-b border-black/10 uppercase tracking-widest text-[11px] font-bold text-[#737373]">
                                    <th className="p-5 min-w-[200px]">{tx.pricing.tableHeaders.service}</th>
                                    <th className="p-5">{tx.pricing.tableHeaders.price}</th>
                                    <th className="p-5">{tx.pricing.tableHeaders.delay}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tx.pricing.rows.map((r, i) => (
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
                            {tx.pricing.footnote}
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* ═══════════════════════ CTA FINAL ═══════════════════════ */
function CTAFinalServices() {
    const { language, localePath } = useLanguage();
    const tx = servicesTexts[language];

    return (
        <section className="relative py-16 sm:py-24 lg:py-32 section-dark overflow-hidden text-center border-b border-white/5">
            <div className="absolute inset-0 bg-grid-dark opacity-60" />
            <div className="relative max-w-3xl mx-auto px-5 sm:px-6">
                <Reveal direction="up" delay={0.1}>
                    <div>
                        <h2 className="font-heading text-5xl sm:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                            {tx.ctaFinal.headingLine1}<br /><span className="text-gold">{tx.ctaFinal.headingHighlight}</span>
                        </h2>
                        <p className="text-white/65 text-xl font-medium mb-12 max-w-2xl mx-auto">
                            {tx.ctaFinal.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to={localePath('/contact')} className="btn-premium px-10 py-5 bg-gold text-[#0a0a0a] font-bold text-[15px] rounded-xl hover:bg-white transition-all uppercase tracking-wider shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] glow-hover">
                                {tx.ctaFinal.ctaPrimary}
                            </Link>
                            <a href="mailto:contact@oumarousanda.com" className="px-10 py-5 bg-white/10 border border-white/20 text-white font-bold text-[15px] rounded-xl hover:bg-white/20 transition-colors uppercase tracking-wider">
                                {tx.ctaFinal.ctaSecondary}
                            </a>
                        </div>
                        <div className="mt-6 pt-6 border-t border-white/10 text-center">
                            <p className="text-white/40 text-[13px] mb-3">{tx.ctaFinal.selfLearnText}</p>
                            <Link to={localePath('/formations')} className="text-gold font-bold text-[14px] hover:text-white transition-colors underline underline-offset-4">
                                {tx.ctaFinal.selfLearnLink}
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* ═══════════════════════ FAQ SCHEMA ═══════════════════════ */
function FAQServices() {
    const { language } = useLanguage();
    const tx = servicesTexts[language];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-20 bg-white border-t border-black/5">
            <div className="max-w-3xl mx-auto px-5 sm:px-6">
                <h2 className="text-2xl font-black text-[#0a0a0a] mb-8 text-center tracking-widest text-sm uppercase">{tx.faq.title}</h2>
                <div className="space-y-4">
                    {tx.faq.items.map((faq, i) => (
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
    const { language } = useLanguage();
    const tx = servicesTexts[language];

    return (
        <>
        <SEOHead
            title={tx.seo.title}
            description={tx.seo.description}
            canonical="/services"
            ogTitle={tx.seo.ogTitle}
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
