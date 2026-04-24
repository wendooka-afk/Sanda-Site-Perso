import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Youtube, Linkedin, Twitter, Instagram, Music2 } from 'lucide-react';

type Lang = 'fr' | 'en';

interface LinkItem {
  id: number;
  emoji: string;
  badge?: string;
  badgeClass?: string;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
  meta?: Record<Lang, string>;
  href: string;
  external?: boolean;
  accent: string;
  borderRgb: string;
  bgRgb: string;
}

const LINKS: LinkItem[] = [
  {
    id: 1,
    emoji: '🎬',
    badge: 'BEST-SELLER',
    badgeClass: 'bg-[#f43f5e]/15 text-[#f43f5e] border border-[#f43f5e]/30',
    title: { fr: 'Protocole Vidéo IA', en: 'AI Video Protocol' },
    desc: { fr: 'Créez des vidéos cinématographiques avec l\'IA', en: 'Create cinematic ad videos with AI' },
    meta: { fr: '🎓 Formation', en: '🎓 Course' },
    href: 'https://academy.oumarousanda.com/veo3',
    external: true,
    accent: '#f43f5e',
    borderRgb: '244,63,94',
    bgRgb: '244,63,94',
  },
  {
    id: 2,
    emoji: '🧠',
    badge: 'POPULAIRE',
    badgeClass: 'bg-[#4f46e5]/15 text-[#818cf8] border border-[#4f46e5]/30',
    title: { fr: 'Le Cerveau Augmenté', en: 'The Augmented Brain' },
    desc: { fr: 'Système IA personnel pour x10 votre productivité', en: 'Personal AI system to 10x your productivity' },
    meta: { fr: '🎓 Formation', en: '🎓 Course' },
    href: 'https://academy.oumarousanda.com/cerveau-augmente',
    external: true,
    accent: '#818cf8',
    borderRgb: '79,70,229',
    bgRgb: '79,70,229',
  },
  {
    id: 3,
    emoji: '🌍',
    badge: 'NOUVEAU',
    badgeClass: 'bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30',
    title: { fr: 'Offshore Empire', en: 'Offshore Empire' },
    desc: { fr: 'Structurez votre société offshore légalement', en: 'Legally structure your offshore company' },
    meta: { fr: '🎓 Formation', en: '🎓 Course' },
    href: 'https://academy.oumarousanda.com/offshore-empire',
    external: true,
    accent: '#d4af37',
    borderRgb: '212,175,55',
    bgRgb: '212,175,55',
  },
  {
    id: 4,
    emoji: '📘',
    title: { fr: 'Mon Livre — IA & Afrique', en: 'My Book — AI & Africa' },
    desc: { fr: 'Si l\'Afrique rate l\'IA, elle rate le futur', en: 'If Africa misses AI, it misses the future' },
    meta: { fr: '📚 Essai · Disponible maintenant', en: '📚 Essay · Available now' },
    href: '/livres',
    accent: '#10b981',
    borderRgb: '16,185,129',
    bgRgb: '16,185,129',
  },
  {
    id: 5,
    emoji: '💼',
    title: { fr: 'Services & Consulting', en: 'Services & Consulting' },
    desc: { fr: 'Conférences, formations sur-mesure & stratégie IA', en: 'Speaking, custom training & AI strategy' },
    meta: { fr: '✨ Pour entreprises & organisations', en: '✨ For companies & organizations' },
    href: '/services',
    accent: '#8b5cf6',
    borderRgb: '139,92,246',
    bgRgb: '139,92,246',
  },
  {
    id: 6,
    emoji: '✍️',
    title: { fr: 'Blog & Articles', en: 'Blog & Articles' },
    desc: { fr: 'IA, business & entrepreneuriat africain', en: 'AI, business & African entrepreneurship' },
    href: '/blog',
    accent: '#06b6d4',
    borderRgb: '6,182,212',
    bgRgb: '6,182,212',
  },
  {
    id: 7,
    emoji: '📩',
    title: { fr: 'Me Contacter', en: 'Contact Me' },
    desc: { fr: 'Partenariats, presse & collaborations', en: 'Partnerships, press & collaborations' },
    href: '/contact',
    accent: '#a3a3a3',
    borderRgb: '163,163,163',
    bgRgb: '163,163,163',
  },
];

const SOCIALS = [
  { Icon: Youtube, href: 'https://www.youtube.com/@Oumarou_Sanda', label: 'YouTube' },
  { Icon: Music2, href: 'https://www.tiktok.com/@iamsanda', label: 'TikTok' },
  { Icon: Linkedin, href: 'https://linkedin.com/in/benibsanda', label: 'LinkedIn' },
  { Icon: Twitter, href: 'https://x.com/benibsanda', label: 'X' },
  { Icon: Instagram, href: 'https://instagram.com/iamsanda', label: 'Instagram' },
];

const STATS: Array<{ value: string; label: Record<Lang, string> }> = [
  { value: '112K+', label: { fr: 'abonnés', en: 'subscribers' } },
  { value: '500+', label: { fr: 'formés', en: 'trained' } },
  { value: '3+', label: { fr: 'formations', en: 'courses' } },
];

export default function LinksPage() {
  const [lang, setLang] = useState<Lang>('fr');

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-10 px-4"
      style={{
        background:
          'radial-gradient(ellipse 90% 50% at 50% -5%, rgba(212,175,55,0.14) 0%, transparent 55%), ' +
          'linear-gradient(160deg, #07070e 0%, #0c0c18 50%, #08080f 100%)',
      }}
    >
      {/* Subtle grid texture */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), ' +
            'linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Language toggle */}
      <div className="fixed top-4 right-4 z-20">
        <button
          onClick={() => setLang((l) => (l === 'fr' ? 'en' : 'fr'))}
          className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-200"
          style={{
            color: 'rgba(255,255,255,0.55)',
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.04)',
          }}
        >
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>
      </div>

      <div className="relative z-10 w-full max-w-[460px] flex flex-col items-center gap-5">

        {/* ── PROFILE ── */}
        <motion.div
          className="flex flex-col items-center gap-4 pt-2"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Avatar */}
          <div className="relative">
            {/* Gold glow ring */}
            <div
              className="absolute -inset-1.5 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #d4af37, #f3e5ab, #996515, #d4af37)',
                opacity: 0.6,
              }}
            />
            <div
              className="relative w-24 h-24 rounded-full overflow-hidden border-2"
              style={{
                borderColor: 'rgba(212,175,55,0.5)',
                boxShadow: '0 0 40px rgba(212,175,55,0.3), 0 0 80px rgba(212,175,55,0.1)',
              }}
            >
              <img
                src="/Oumarou Sanda 1.webp"
                alt="Oumarou Sanda"
                width={96}
                height={96}
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Verified check */}
            <div
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shadow-lg z-10"
              style={{ background: '#d4af37', color: '#000' }}
            >
              ✓
            </div>
          </div>

          {/* Name & title */}
          <div className="text-center">
            <h1
              className="text-[22px] font-black tracking-tight text-white"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Oumarou Sanda
            </h1>
            <p
              className="mt-1 text-[13px] font-semibold"
              style={{ color: 'rgba(212,175,55,0.9)' }}
            >
              {lang === 'fr'
                ? 'Expert N°1 IA Générative · Afrique'
                : "Africa's #1 Generative AI Expert"}
            </p>
            <p
              className="mt-2 text-[13px] leading-relaxed max-w-[300px] mx-auto"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              {lang === 'fr'
                ? 'Auteur · Entrepreneur · CEO @Wendooka · Je forme l\'Afrique à l\'IA'
                : 'Author · Entrepreneur · CEO @Wendooka · Training Africa in AI'}
            </p>
          </div>

          {/* Stats */}
          <div
            className="flex items-center gap-1 mt-1 px-5 py-3 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {STATS.map((stat, i) => (
              <div key={stat.value} className="flex items-center gap-1">
                {i > 0 && (
                  <span
                    className="w-px h-6 mx-3"
                    style={{ background: 'rgba(255,255,255,0.1)' }}
                  />
                )}
                <div className="text-center px-2">
                  <div className="text-[15px] font-black text-white leading-tight">{stat.value}</div>
                  <div
                    className="text-[10px] uppercase tracking-wider mt-0.5"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    {stat.label[lang]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── LINKS ── */}
        <div className="w-full flex flex-col gap-3">
          {LINKS.map((link, i) => {
            const cardProps = {
              className: "group flex items-center gap-4 w-full rounded-2xl px-4 py-3.5 transition-all duration-300 hover:scale-[1.015] hover:-translate-y-0.5",
              style: {
                background: `rgba(${link.bgRgb}, 0.05)`,
                border: `1px solid rgba(${link.borderRgb}, 0.2)`,
                boxShadow: '0 2px 24px rgba(0,0,0,0.4)',
              } as React.CSSProperties,
              onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.background = `rgba(${link.bgRgb}, 0.09)`;
                e.currentTarget.style.borderColor = `rgba(${link.borderRgb}, 0.35)`;
                e.currentTarget.style.boxShadow = `0 4px 32px rgba(${link.bgRgb}, 0.15)`;
              },
              onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.background = `rgba(${link.bgRgb}, 0.05)`;
                e.currentTarget.style.borderColor = `rgba(${link.borderRgb}, 0.2)`;
                e.currentTarget.style.boxShadow = '0 2px 24px rgba(0,0,0,0.4)';
              },
            };

            const inner = (
              <>
                {/* Emoji icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-[21px] shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `rgba(${link.bgRgb}, 0.12)` }}
                >
                  {link.emoji}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[14px] text-white leading-tight">
                      {link.title[lang]}
                    </span>
                    {link.badge && (
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${link.badgeClass}`}>
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] mt-0.5 leading-snug" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {link.desc[lang]}
                  </p>
                  {link.meta && (
                    <p className="text-[11px] mt-1 font-semibold" style={{ color: `${link.accent}bb` }}>
                      {link.meta[lang]}
                    </p>
                  )}
                </div>

                {/* Arrow */}
                <ExternalLink
                  size={13}
                  className="shrink-0 transition-all duration-300 group-hover:translate-x-0.5 opacity-35 group-hover:opacity-80"
                  style={{ color: link.accent }}
                />
              </>
            );

            return (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.18 + i * 0.07, ease: 'easeOut' }}
              >
                {link.external ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" {...cardProps}>{inner}</a>
                ) : (
                  <Link to={link.href} {...cardProps}>{inner}</Link>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ── SOCIAL ICONS ── */}
        <motion.div
          className="flex items-center gap-3 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.6 }}
        >
          {SOCIALS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-250 hover:scale-115 hover:brightness-125"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Icon size={16} style={{ color: 'rgba(255,255,255,0.6)' }} />
            </a>
          ))}
        </motion.div>

        {/* ── FOOTER ── */}
        <motion.div
          className="text-center pb-8 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <a
            href="/"
            className="text-[11px] transition-colors duration-200 hover:opacity-60"
            style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Outfit, sans-serif' }}
          >
            oumarousanda.com
          </a>
        </motion.div>
      </div>
    </div>
  );
}
