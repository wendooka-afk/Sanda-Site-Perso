import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../i18n';

interface PageHeaderProps {
  badge: string;
  badgeColor?: string;
  title: string;
  titleHighlight: string;
  description: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHeader({
  badge,
  badgeColor = 'border-gold/20 text-gold',
  title,
  titleHighlight,
  description,
  breadcrumbs = [],
}: PageHeaderProps) {
  const { t } = useLanguage();

  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-mesh-1" />
      <div className="absolute inset-0 bg-grid-subtle opacity-50" />
      <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-blue/[0.03] rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-[20%] w-[300px] h-[300px] bg-gold/[0.02] rounded-full blur-[80px]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 text-[13px] text-white/30 mb-10"
          >
            <Link to="/" className="hover:text-gold transition-colors flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5" />
              <span>{t.common.home}</span>
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3 opacity-40" />
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-gold transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/60">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${badgeColor} text-[12px] font-medium tracking-wider uppercase mb-6 bg-white/[0.02]`}>
            {badge}
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-white mb-6 leading-[1.2] tracking-tight">
            {title}<span className="text-gradient-gold block mt-2">{titleHighlight}</span>
          </h1>
          <p className="text-white/40 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
            {description}
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent" />
    </section>
  );
}
