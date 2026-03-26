import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Youtube, Users, GraduationCap, Globe, Award, TrendingUp } from 'lucide-react';
import { useLanguage } from '../i18n';

export function Stats() {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  const stats = [
    { icon: Youtube, value: '112K+', label: t.stats.subscribers, color: 'text-accent-red', bg: 'bg-accent-red/10' },
    { icon: Users, value: '500+', label: t.stats.studentsTrained, color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
    { icon: GraduationCap, value: '6+', label: t.stats.trainingsCreated, color: 'text-accent-gold', bg: 'bg-accent-gold/10' },
    { icon: Globe, value: '15+', label: t.stats.countries, color: 'text-green-400', bg: 'bg-green-400/10' },
    { icon: Award, value: '10+', label: t.stats.yearsExp, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { icon: TrendingUp, value: '2M+', label: t.stats.views, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  ];

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/50 to-navy-900" />
      
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-4 sm:p-6 text-center hover:bg-white/5 transition-all duration-300 group"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
              </div>
              <div className="font-heading font-bold text-xl sm:text-2xl text-white mb-1">{stat.value}</div>
              <div className="text-gray-500 text-xs sm:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
