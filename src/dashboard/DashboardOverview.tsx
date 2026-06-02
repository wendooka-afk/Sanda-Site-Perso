import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getDashboardArticles } from '../hooks/useDashboardArticles';

export default function DashboardOverview() {
  // Vraies données du store partagé (localStorage navigateur)
  const articles = useMemo(() => getDashboardArticles(), []);
  const publishedCount = articles.filter((a) => a.status === 'published').length;
  const draftCount = articles.filter((a) => a.status === 'draft').length;
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);

  const recentArticles = [...articles]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-white text-xl font-bold">Vue d'ensemble</h2>
        <p className="text-white/40 text-sm mt-1">Gestion de contenu — site statique</p>
      </div>

      {/* Honesty banner — explique le fonctionnement réel */}
      <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
        <span className="text-xl mt-0.5">ℹ️</span>
        <div>
          <p className="text-white/90 text-sm font-medium">Stockage local (ce navigateur uniquement)</p>
          <p className="text-white/50 text-sm mt-1 leading-relaxed">
            Le site est hébergé en statique (Coolify/nginx) sans base de données. Les articles
            créés ici sont enregistrés dans le <code className="text-blue-300">localStorage</code> de
            ce navigateur et ne sont visibles que sur cet appareil. Pour publier réellement sur
            oumarousanda.com, le contenu doit être ajouté aux fichiers du dépôt
            (<code className="text-blue-300">src/data/articles.ts</code>) puis redéployé.
          </p>
        </div>
      </div>

      {/* Stats articles — réelles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Articles publiés', value: publishedCount, icon: '✅', color: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20', text: 'text-emerald-400' },
          { label: 'Brouillons', value: draftCount, icon: '📝', color: 'from-yellow-500/20 to-yellow-600/5 border-yellow-500/20', text: 'text-yellow-400' },
          { label: 'Articles au total', value: articles.length, icon: '📚', color: 'from-blue-500/20 to-blue-600/5 border-blue-500/20', text: 'text-blue-400' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative p-5 rounded-2xl bg-gradient-to-br ${stat.color} border overflow-hidden`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/50 text-sm">{stat.label}</p>
                <p className={`text-3xl font-bold mt-1 ${stat.text}`}>{stat.value}</p>
              </div>
              <span className="text-3xl opacity-60">{stat.icon}</span>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/3 blur-xl" />
          </motion.div>
        ))}
      </div>

      {/* Derniers articles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl bg-white/[0.02] border border-white/5"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-white font-semibold">Articles récents</h3>
            <p className="text-white/40 text-sm mt-0.5">
              {totalViews > 0 ? `${totalViews.toLocaleString()} vues cumulées` : 'Aucune vue enregistrée'}
            </p>
          </div>
          <Link to="/dashboard/articles" className="text-amber-400 text-sm hover:underline">Gérer</Link>
        </div>

        {recentArticles.length > 0 ? (
          <div className="space-y-2">
            {recentArticles.map((article) => (
              <div key={article.id} className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                <div className="flex-1 min-w-0">
                  <p className="text-white/80 text-sm truncate">{article.title}</p>
                  <p className="text-white/30 text-xs mt-0.5">{article.date}</p>
                </div>
                <span className={`ml-3 shrink-0 px-2 py-0.5 rounded-lg text-[10px] font-medium border ${
                  article.status === 'published'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                }`}>
                  {article.status === 'published' ? 'Publié' : 'Brouillon'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/40 text-sm py-6 text-center">
            Aucun article créé pour l'instant. Commencez par en rédiger un.
          </p>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-500/10"
      >
        <h3 className="text-white font-semibold mb-4">Actions rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Nouvel article', icon: '✏️', path: '/dashboard/articles' },
            { label: 'Formations', icon: '🎓', path: '/dashboard/formations' },
            { label: 'Gestionnaire liens', icon: '🔗', path: '/dashboard/links' },
            { label: 'Médias', icon: '🎬', path: '/dashboard/media' },
          ].map((action) => (
            <Link
              key={action.label}
              to={action.path}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-amber-500/20 transition-all group"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-white/70 text-sm group-hover:text-white transition-colors">{action.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
