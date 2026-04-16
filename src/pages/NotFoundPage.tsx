import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { useLanguage } from '../i18n';
import { SEOHead } from '../components/SEOHead';

export default function NotFoundPage() {
  const { t } = useLanguage();
  return (
    <>
    <SEOHead
      title={t.notFound.title + ' — 404'}
      description={t.notFound.description}
      canonical="/404"
      noindex
    />
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-60" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gold/5 rounded-full blur-[100px]" />

      <div className="relative max-w-2xl mx-auto px-5 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-8">
            <Search className="w-8 h-8 text-gold" />
          </div>
          <h1 className="font-heading text-7xl sm:text-8xl font-black text-gold mb-4">404</h1>
          <h2 className="font-heading text-2xl font-black text-[#0a0a0a] mb-4 tracking-tight">{t.notFound.title}</h2>
          <p className="text-[#a3a3a3] text-[15px] mb-10 max-w-md mx-auto">{t.notFound.description}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="px-7 py-3.5 bg-[#0a0a0a] text-white font-heading font-bold rounded-2xl hover:bg-black hover:shadow-lg transition-all flex items-center justify-center gap-2 text-[14px]">
              <Home className="w-4 h-4" /> {t.notFound.goHome}
            </Link>
            <button onClick={() => window.history.back()} className="px-7 py-3.5 border border-black/10 text-[#525252] font-heading font-semibold rounded-2xl hover:bg-[#fafafa] transition-all flex items-center justify-center gap-2 text-[14px]">
              <ArrowLeft className="w-4 h-4" /> {t.notFound.goBack}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
}
