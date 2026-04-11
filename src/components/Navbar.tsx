import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, ChevronRight, Globe } from 'lucide-react';
import { useLanguage } from '../i18n';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t, prefix, localePath } = useLanguage();

  const allNavLinks = [
    { label: t.nav.about, href: localePath(language === 'en' ? '/about' : '/a-propos') },
    { label: t.nav.ecosystem, href: localePath('/services') },
    { label: t.nav.formations, href: localePath('/formations'), frOnly: true },
    { label: t.nav.blog, href: localePath('/blog') },
    { label: t.nav.media, href: localePath(language === 'en' ? '/media' : '/medias'), frOnly: true },
    { label: t.nav.book, href: localePath(language === 'en' ? '/books' : '/livres'), frOnly: true },
    { label: t.nav.contact, href: localePath('/contact') },
  ];

  const navLinks = language === 'en'
    ? allNavLinks.filter(l => !l.frOnly)
    : allNavLinks;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    const path = location.pathname;
    if (href === prefix || href === prefix + '/') return path === prefix || path === prefix + '/';
    return path.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-white/10 shadow-lg'
          : 'bg-black/80 backdrop-blur-sm shadow-sm'
          }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to={localePath('/')} className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-gold/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-all duration-500 relative z-10 bg-white">
                  <img src="/logo-sm.webp" alt="Sanda" width={40} height={40} className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-heading font-bold text-white text-[15px] leading-tight tracking-tight group-hover:text-gold transition-colors duration-300">Oumarou Sanda</span>
                <span className="text-[10px] text-white/60 font-bold tracking-[0.2em] uppercase">
                  {language === 'en' ? 'Generative AI Expert' : 'Expert IA Générative'}
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2 text-[12px] rounded-lg transition-all duration-300 font-bold tracking-[0.1em] uppercase ${isActive(link.href)
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                    }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                  )}
                </Link>
              ))}
            </div>

            {/* Language + CTA + Mobile toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-lg text-[11px] font-bold text-white/70 hover:text-white hover:bg-white/[0.04] transition-all duration-300 border border-white/5 hover:border-white/10 uppercase tracking-widest glass-premium bg-white/5"
                aria-label={language === 'fr' ? 'Switch to English' : 'Passer en Français'}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === 'fr' ? 'EN' : 'FR'}</span>
              </button>

              {language === 'fr' && (
                <Link
                  to={localePath('/formations')}
                  className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-gold text-[#0a0a0a] font-bold text-[12px] uppercase tracking-[0.1em] rounded-xl hover:bg-white transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] group"
                >
                  <Sparkles className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  {t.nav.formations}
                </Link>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 sm:p-2.5 ml-1 text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10 glass-premium bg-white/5"
                aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl lg:hidden border-t border-white/5 mt-[72px] transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col h-full px-6 pt-10 pb-24 overflow-y-auto relative z-10">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center justify-between py-4 border-b border-white/[0.04] transition-all ${isActive(link.href)
                  ? 'text-white'
                  : 'text-white/70 hover:text-white'
                  }`}
              >
                <span className="font-heading text-2xl font-bold tracking-tight uppercase">{link.label}</span>
                <ChevronRight className={`w-5 h-5 transition-transform ${isActive(link.href) ? 'text-gold opacity-100 translate-x-1' : 'opacity-30'}`} />
              </Link>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => { toggleLanguage(); setMobileOpen(false); }}
              className="flex items-center justify-center gap-3 flex-1 py-4 border border-white/10 rounded-xl text-white font-bold text-[12px] uppercase tracking-[0.1em] glass-premium bg-white/5 active:scale-95 transition-all"
            >
              <Globe className="w-4 h-4" />
              {language === 'fr' ? 'Switch to English' : 'Passer en Français'}
            </button>
          </div>

          {language === 'fr' && (
            <div className="mt-4">
              <Link
                to={localePath('/formations')}
                className="flex items-center justify-center gap-3 w-full py-4 bg-gold text-black font-bold uppercase tracking-[0.1em] text-[13px] rounded-xl hover:bg-white transition-all active:scale-95 shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                {t.nav.discoverFormations}
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
