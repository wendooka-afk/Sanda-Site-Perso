import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Calendar, Clock, ArrowRight, Tag, BookOpen } from 'lucide-react';

const articles = [
  {
    title: 'Comment l\'IA Générative révolutionne l\'entrepreneuriat en Afrique',
    excerpt: 'Découvrez comment les entrepreneurs africains utilisent ChatGPT, Midjourney et d\'autres outils IA pour créer des business rentables depuis le continent.',
    category: 'IA Générative',
    date: '15 Fév 2026',
    readTime: '8 min',
    tag: 'Pillar Content',
    tagColor: 'bg-accent-red/10 text-accent-red',
    gradient: 'from-accent-red/20 to-transparent',
  },
  {
    title: 'Guide complet du Vibe Coding : coder sans coder avec l\'IA',
    excerpt: 'Le vibe coding change la donne. Apprenez à créer des applications complètes en décrivant simplement ce que vous voulez à une IA.',
    category: 'Vibe Coding',
    date: '12 Fév 2026',
    readTime: '12 min',
    tag: 'Tutorial',
    tagColor: 'bg-accent-blue/10 text-accent-blue',
    gradient: 'from-accent-blue/20 to-transparent',
  },
  {
    title: 'Créer des vidéos publicitaires professionnelles avec l\'IA en 2026',
    excerpt: 'Sora, Runway, Kling AI... Les outils de vidéo IA sont désormais assez puissants pour créer du contenu broadcast-quality. Voici comment.',
    category: 'Vidéo IA',
    date: '10 Fév 2026',
    readTime: '10 min',
    tag: 'Guide',
    tagColor: 'bg-purple-400/10 text-purple-400',
    gradient: 'from-purple-400/20 to-transparent',
  },
  {
    title: 'Automatiser son business en ligne : les 10 workflows IA essentiels',
    excerpt: 'De la génération de contenu à la gestion client, découvrez les 10 automatisations IA que tout entrepreneur digital devrait mettre en place.',
    category: 'Automatisation',
    date: '8 Fév 2026',
    readTime: '15 min',
    tag: 'Pillar Content',
    tagColor: 'bg-accent-gold/10 text-accent-gold',
    gradient: 'from-accent-gold/20 to-transparent',
  },
  {
    title: 'Si l\'Afrique rate l\'IA, elle rate le futur : analyse complète',
    excerpt: 'Pourquoi l\'adoption de l\'intelligence artificielle est un enjeu civilisationnel pour le continent africain et comment s\'y préparer.',
    category: 'Vision',
    date: '5 Fév 2026',
    readTime: '20 min',
    tag: 'Essai',
    tagColor: 'bg-green-400/10 text-green-400',
    gradient: 'from-green-400/20 to-transparent',
  },
];

const resources = [
  { title: 'eBook : 50 Prompts IA pour Entrepreneurs', type: 'PDF Gratuit', icon: '📘' },
  { title: 'Checklist : Lancer son Business IA', type: 'PDF Gratuit', icon: '✅' },
  { title: 'Templates Notion pour Productivité IA', type: 'Templates', icon: '📋' },
];

export function Blog() {
  const { ref, isInView } = useInView();

  return (
    <section id="blog" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-green-400/20 text-green-400 text-sm font-medium mb-4">
            <BookOpen className="w-3 h-3" />
            Blog & Ressources
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Apprenez, <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">évoluez</span>, dominez
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Articles de fond, tutoriels et ressources gratuites pour maîtriser l'IA générative 
            et le business en ligne.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Articles */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {articles.map((article, i) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="glass-card rounded-2xl p-5 sm:p-6 border border-white/5 hover:border-white/10 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Color accent */}
                  <div className={`hidden sm:block w-1 self-stretch rounded-full bg-gradient-to-b ${article.gradient}`} />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${article.tagColor}`}>
                        {article.tag}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {article.category}
                      </span>
                    </div>
                    
                    <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-accent-gold transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                      <span className="text-accent-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        Lire <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card rounded-2xl p-6 border border-accent-gold/20 animate-pulse-glow"
            >
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                📬 Newsletter IA & Business
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Recevez chaque semaine mes meilleures stratégies IA directement dans votre boîte mail.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-accent-gold/40 transition-colors"
                />
                <button className="w-full py-3 bg-gradient-to-r from-accent-gold to-accent-gold-light text-navy-900 font-heading font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-accent-gold/20 transition-all">
                  S'inscrire gratuitement
                </button>
              </div>
              <p className="text-gray-600 text-xs mt-3 text-center">
                +2 000 abonnés • Pas de spam, promis
              </p>
            </motion.div>

            {/* Free resources */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-card rounded-2xl p-6 border border-white/5"
            >
              <h3 className="font-heading font-bold text-lg text-white mb-4">
                🎁 Ressources Gratuites
              </h3>
              <div className="space-y-3">
                {resources.map((r) => (
                  <div
                    key={r.title}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/3 hover:bg-white/5 cursor-pointer transition-colors group"
                  >
                    <span className="text-2xl">{r.icon}</span>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium group-hover:text-accent-gold transition-colors">{r.title}</p>
                      <p className="text-gray-500 text-xs">{r.type}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-accent-gold transition-colors" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
