import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Language, Translations } from './types';
import { fr } from './fr';
import { en } from './en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  /** Returns '' for FR, '/en' for EN — prefix all internal paths with this */
  prefix: string;
  /** Prepend the language prefix to a path: localePath('/blog') → '/en/blog' or '/blog' */
  localePath: (path: string) => string;
}

const translations: Record<Language, Translations> = { fr, en };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/** Detect language from pathname: /en or /en/* → 'en', everything else → 'fr' */
function detectLangFromPath(pathname: string): Language {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [language, setLanguageState] = useState<Language>(() =>
    detectLangFromPath(window.location.pathname)
  );

  // Keep language in sync when URL changes (e.g. browser back/forward)
  useEffect(() => {
    const detected = detectLangFromPath(location.pathname);
    if (detected !== language) {
      setLanguageState(detected);
    }
  }, [location.pathname]);

  // Update <html lang> attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const prefix = language === 'en' ? '/en' : '';

  const localePath = useCallback(
    (path: string) => {
      if (language === 'fr') return path;
      // Already prefixed
      if (path.startsWith('/en')) return path;
      return '/en' + (path.startsWith('/') ? path : '/' + path);
    },
    [language]
  );

  const setLanguage = useCallback(
    (lang: Language) => {
      setLanguageState(lang);
      localStorage.setItem('lang', lang);
      // Navigate to equivalent path in new language
      const currentPath = location.pathname;
      let basePath: string;
      if (currentPath === '/en' || currentPath.startsWith('/en/')) {
        basePath = currentPath.replace(/^\/en/, '') || '/';
      } else {
        basePath = currentPath;
      }
      const newPath = lang === 'en' ? '/en' + (basePath === '/' ? '' : basePath) : basePath;
      navigate(newPath + location.search + location.hash, { replace: true });
    },
    [location, navigate]
  );

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  }, [language, setLanguage]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, prefix, localePath }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
