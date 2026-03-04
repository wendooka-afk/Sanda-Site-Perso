import { Link } from 'react-router-dom';
import { ArrowUp, Youtube, Music2, Facebook, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '../i18n';

const socialLinks = [
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@Oumarou_Sanda', color: 'hover:text-[#FF0000] hover:border-[#FF0000]/20 hover:bg-[#FF0000]/5 hover:shadow-[0_4px_15px_rgba(255,0,0,0.15)]' },
  { icon: Music2, label: 'TikTok', href: 'https://tiktok.com/@iamsanda', color: 'hover:text-[#000000] hover:border-black/20 hover:bg-black/5 hover:shadow-[0_4px_15px_rgba(0,0,0,0.15)]' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/iamoumarousanda', color: 'hover:text-[#1877F2] hover:border-[#1877F2]/20 hover:bg-[#1877F2]/5 hover:shadow-[0_4px_15px_rgba(24,119,242,0.15)]' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/benibsanda', color: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/20 hover:bg-[#0A66C2]/5 hover:shadow-[0_4px_15px_rgba(10,102,194,0.15)]' },
  { icon: Twitter, label: 'X', href: 'https://x.com/benibsanda', color: 'hover:text-[#000000] hover:border-black/20 hover:bg-black/5 hover:shadow-[0_4px_15px_rgba(0,0,0,0.15)]' },
];

export function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    [t.footer.ecosystem]: [
      { label: 'Wendooka', href: '/services' },
      { label: 'Sanda Vibe Code', href: '/services' },
      { label: t.nav.formations, href: '/formations' },
      { label: t.nav.blog, href: '/blog' },
    ],
    [t.footer.formations]: [
      { label: t.formationDetails.protocoleVideoIa.name, href: '/formations/protocole-video-ia' },
      { label: t.formationDetails.cerveauAugmente.name, href: '/formations/cerveau-augmente' },
      { label: t.formationDetails.offshoreEmpire.name, href: '/formations/offshore-empire' },
    ],
    [t.footer.usefulLinks]: [
      { label: t.nav.about, href: '/a-propos' },
      { label: t.nav.contact, href: '/contact' },
      { label: t.footer.freeResources, href: '/ressources' },
      { label: t.contactSection.mediaKit, href: '/kit-media' },
      { label: t.nav.book, href: '/livres' },
    ],
  };

  return (
    <footer className="relative border-t border-black/5 bg-[#fafafa] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[400px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-12 sm:pt-20 lg:pt-28 pb-8 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-20">
          {/* Logo + Description + Social */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-gold/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#f3e5ab] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-all duration-500 relative z-10">
                  <span className="text-dark-950 font-heading font-extrabold text-xl tracking-tight">OS</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-[#0a0a0a] text-[16px] tracking-tight group-hover:text-gold transition-colors duration-300">Oumarou Sanda</span>
                <span className="text-[10px] text-[#525252] font-bold tracking-[0.2em] uppercase mt-0.5">Expert IA Générative</span>
              </div>
            </Link>
            <p className="text-[#525252] text-[15px] leading-[1.8] max-w-sm mb-10 font-inter">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`w-11 h-11 rounded-xl glass-premium bg-white shadow-sm border border-black/10 flex items-center justify-center text-[#525252] transition-all duration-300 ${s.color}`}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:pl-8">
              <h3 className="font-heading font-bold text-[#0a0a0a] text-[12px] mb-6 tracking-[0.15em] uppercase">{title}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-[#525252] text-[14px] font-inter hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-gold/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <p className="text-[#737373] text-[13px] text-center sm:text-left font-inter">
              {t.footer.rights} {t.footer.madeWith}
            </p>
            <div className="w-1 h-1 rounded-full bg-black/10 hidden sm:block" />
            <Link
              to="/dashboard"
              className="text-[#737373] hover:text-[#0a0a0a] text-[13px] font-inter transition-colors duration-300 hover:underline underline-offset-4"
            >
              Admin
            </Link>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 rounded-xl glass-premium border border-black/10 bg-white shadow-sm text-[#525252] hover:text-gold hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 group flex items-center justify-center hover:shadow-[0_4px_15px_rgba(212,175,55,0.15)]"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer >
  );
}
