import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Play, ExternalLink, Youtube, Clock, Eye } from 'lucide-react';
import { useLanguage } from '../i18n';

const videos = [
  {
    title: 'Comment j\'utilise l\'IA pour créer des vidéos qui génèrent 10 000€/mois',
    views: '125K vues',
    duration: '18:24',
    category: 'Business IA',
    thumb: 'from-accent-red/30 via-navy-700 to-navy-800',
  },
  {
    title: 'Vibe Coding : J\'ai créé une app complète en 30 minutes sans coder',
    views: '89K vues',
    duration: '22:15',
    category: 'Vibe Coding',
    thumb: 'from-accent-blue/30 via-navy-700 to-navy-800',
  },
  {
    title: 'Les 5 outils IA que tout entrepreneur africain doit connaître en 2026',
    views: '156K vues',
    duration: '14:42',
    category: 'Outils IA',
    thumb: 'from-accent-gold/30 via-navy-700 to-navy-800',
  },
  {
    title: 'J\'ai automatisé 80% de mon business avec l\'IA — voici comment',
    views: '98K vues',
    duration: '25:30',
    category: 'Automatisation',
    thumb: 'from-purple-500/30 via-navy-700 to-navy-800',
  },
  {
    title: 'De journaliste à entrepreneur IA : mon parcours sans filtre',
    views: '203K vues',
    duration: '32:10',
    category: 'Parcours',
    thumb: 'from-green-500/30 via-navy-700 to-navy-800',
  },
  {
    title: 'Formation gratuite : Créer son premier business en ligne avec l\'IA',
    views: '178K vues',
    duration: '45:00',
    category: 'Formation',
    thumb: 'from-cyan-500/30 via-navy-700 to-navy-800',
  },
];

const socials = [
  { name: 'YouTube', handle: '@OumarouSanda', followers: '50K+', color: 'bg-red-500/10 text-red-400 border-red-500/20', icon: '▶️' },
  { name: 'TikTok', handle: '@iamsanda', followers: '30K+', color: 'bg-pink-500/10 text-pink-400 border-pink-500/20', icon: '🎵' },
  { name: 'Facebook', handle: 'Oumarou Sanda', followers: '15K+', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: '👤' },
  { name: 'LinkedIn', handle: 'Oumarou Sanda', followers: '5K+', color: 'bg-sky-500/10 text-sky-400 border-sky-500/20', icon: '💼' },
  { name: 'Instagram', handle: '@oumarou.sanda', followers: '10K+', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', icon: '📸' },
];

export function YouTubeSection() {
  const { ref, isInView } = useInView();
  const { t } = useLanguage();

  return (
    <section id="youtube" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-charcoal to-navy-900" />
      
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-red-400/20 text-red-400 text-sm font-medium mb-4">
            <Youtube className="w-3 h-3" />
            {t.mediaSection.badge}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t.mediaSection.title}<span className="gradient-text-red">{t.mediaSection.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            {t.mediaSection.description}
          </p>
        </motion.div>

        {/* Video grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {videos.map((video, i) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className={`relative aspect-video bg-gradient-to-br ${video.thumb}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent-red/80 group-hover:scale-110 transition-all duration-300">
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  </div>
                </div>
                {/* Duration */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-white text-xs font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>
                {/* Category */}
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded text-white text-xs">
                  {video.category}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-heading font-semibold text-white text-sm line-clamp-2 group-hover:text-accent-gold transition-colors mb-2">
                  {video.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Eye className="w-3 h-3" />
                  <span>{video.views}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA YouTube */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mb-16"
        >
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 transition-all font-semibold text-sm"
          >
            <Youtube className="w-5 h-5" />
            {t.mediaSection.subscribeYoutube}
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
        >
          <h3 className="font-heading font-bold text-xl text-white text-center mb-6">{t.mediaSection.findMe}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {socials.map((s) => (
              <div
                key={s.name}
                className={`glass-card rounded-xl p-4 border ${s.color} text-center hover:bg-white/5 cursor-pointer transition-all group`}
              >
                <span className="text-2xl mb-2 block">{s.icon}</span>
                <p className="font-heading font-bold text-white text-sm">{s.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.handle}</p>
                <p className="font-heading font-bold text-lg text-white mt-2">{s.followers}</p>
                <p className="text-gray-500 text-xs">{t.mediaSection.followersLabel}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
