import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getDashboardArticles } from '../hooks/useDashboardArticles';

/* ─── Stat Cards ─── */
const stats = [
  { label: 'Visiteurs ce mois', value: '12,847', change: '+18.2%', up: true, icon: '👥', color: 'from-blue-500/20 to-blue-600/5', border: 'border-blue-500/20', text: 'text-blue-400' },
  { label: 'Leads capturés', value: '1,234', change: '+24.5%', up: true, icon: '📧', color: 'from-emerald-500/20 to-emerald-600/5', border: 'border-emerald-500/20', text: 'text-emerald-400' },
  { label: 'Ventes formations', value: '89', change: '+12.3%', up: true, icon: '💰', color: 'from-amber-500/20 to-amber-600/5', border: 'border-amber-500/20', text: 'text-amber-400' },
  { label: 'Revenus (FCFA)', value: '4,250,000', change: '+31.7%', up: true, icon: '📊', color: 'from-violet-500/20 to-violet-600/5', border: 'border-violet-500/20', text: 'text-violet-400' },
];

/* ─── Traffic Data (simulated chart) ─── */
const trafficData = [
  { day: 'Lun', visits: 420, leads: 18 },
  { day: 'Mar', visits: 380, leads: 14 },
  { day: 'Mer', visits: 510, leads: 22 },
  { day: 'Jeu', visits: 470, leads: 20 },
  { day: 'Ven', visits: 620, leads: 28 },
  { day: 'Sam', visits: 540, leads: 24 },
  { day: 'Dim', visits: 350, leads: 12 },
];

const maxVisits = Math.max(...trafficData.map(d => d.visits));

/* ─── Recent Activity ─── */
const recentActivity = [
  { type: 'sale', message: 'Nouvelle vente — Protocole Vidéo IA', time: 'Il y a 12 min', icon: '💰', color: 'text-emerald-400' },
  { type: 'lead', message: 'Nouvel abonné newsletter — ahmed.k@gmail.com', time: 'Il y a 34 min', icon: '📧', color: 'text-blue-400' },
  { type: 'comment', message: 'Nouveau commentaire sur "Comment créer un blog"', time: 'Il y a 1h', icon: '💬', color: 'text-amber-400' },
  { type: 'sale', message: 'Nouvelle vente — Le Cerveau Augmenté', time: 'Il y a 2h', icon: '💰', color: 'text-emerald-400' },
  { type: 'visit', message: '150 visiteurs en ligne actuellement', time: 'Il y a 2h', icon: '👥', color: 'text-violet-400' },
  { type: 'lead', message: 'Demande de partenariat — TechAfrica Corp', time: 'Il y a 3h', icon: '🤝', color: 'text-pink-400' },
  { type: 'comment', message: 'Nouveau commentaire sur "Cloudways Review"', time: 'Il y a 4h', icon: '💬', color: 'text-amber-400' },
  { type: 'sale', message: 'Nouvelle vente — Offshore Empire', time: 'Il y a 5h', icon: '💰', color: 'text-emerald-400' },
];

/* ─── Top Pages ─── */
const topPages = [
  { page: '/formations/protocole-video-ia', title: 'Protocole Vidéo IA', views: 2340, conversion: '4.2%' },
  { page: '/blog/comment-creer-un-blog', title: 'Comment créer un blog rentable', views: 1890, conversion: '3.8%' },
  { page: '/formations/cerveau-augmente', title: 'Le Cerveau Augmenté', views: 1560, conversion: '3.5%' },
  { page: '/blog/cloudways-review', title: 'Cloudways Review', views: 1230, conversion: '2.9%' },
  { page: '/', title: 'Page d\'accueil', views: 4520, conversion: '5.1%' },
];

/* ─── Top Formations ─── */
const topFormations = [
  { name: 'Protocole Vidéo IA', sales: 42, revenue: '2,100,000 FCFA', progress: 85, color: 'bg-amber-400' },
  { name: 'Le Cerveau Augmenté', sales: 31, revenue: '1,395,000 FCFA', progress: 62, color: 'bg-blue-400' },
  { name: 'Offshore Empire', sales: 16, revenue: '755,000 FCFA', progress: 38, color: 'bg-violet-400' },
];

export default function DashboardOverview() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('7d');

  // Real article stats from shared store
  const articles = useMemo(() => getDashboardArticles(), []);
  const publishedCount = articles.filter((a) => a.status === 'published').length;
  const draftCount = articles.filter((a) => a.status === 'draft').length;
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);

  // Recent articles for activity feed
  const recentArticles = [...articles]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Period Selector */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-white text-xl font-bold">Vue d'ensemble</h2>
          <p className="text-white/40 text-sm mt-1">Tableau de bord en temps réel</p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
          {(['7d', '30d', '90d'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                period === p
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-white/40 hover:text-white border border-transparent'
              }`}
            >
              {p === '7d' ? '7 jours' : p === '30d' ? '30 jours' : '90 jours'}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`
              relative p-5 rounded-2xl bg-gradient-to-br ${stat.color}
              border ${stat.border} overflow-hidden
            `}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/50 text-sm">{stat.label}</p>
                <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
                <p className={`text-sm mt-2 ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.up ? '↑' : '↓'} {stat.change}
                  <span className="text-white/30 ml-1">vs mois dernier</span>
                </p>
              </div>
              <span className="text-3xl opacity-60">{stat.icon}</span>
            </div>
            {/* Decorative */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/3 blur-xl" />
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Traffic Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-2 p-6 rounded-2xl bg-white/[0.02] border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-semibold">Trafic & Leads</h3>
              <p className="text-white/40 text-sm mt-1">Derniers 7 jours</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2 text-blue-400">
                <span className="w-3 h-3 rounded-full bg-blue-400" /> Visites
              </span>
              <span className="flex items-center gap-2 text-amber-400">
                <span className="w-3 h-3 rounded-full bg-amber-400" /> Leads
              </span>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end gap-3 h-48">
            {trafficData.map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center gap-1 relative" style={{ height: '160px' }}>
                  {/* Visits Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.visits / maxVisits) * 100}%` }}
                    transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-blue-500/30 to-blue-400/60 absolute bottom-0"
                  />
                  {/* Leads Dot */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.05 }}
                    className="absolute z-10 w-3 h-3 rounded-full bg-amber-400 border-2 border-[#0a0b0f] shadow-lg shadow-amber-400/30"
                    style={{ bottom: `${(d.leads / 30) * 100}%` }}
                  />
                </div>
                <span className="text-white/30 text-xs mt-1">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sales Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/5"
        >
          <h3 className="text-white font-semibold mb-1">Ventes par formation</h3>
          <p className="text-white/40 text-sm mb-6">Ce mois</p>

          <div className="space-y-5">
            {topFormations.map((f) => (
              <div key={f.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium">{f.name}</span>
                  <span className="text-white/50 text-sm">{f.sales} ventes</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${f.progress}%` }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className={`h-full rounded-full ${f.color}`}
                  />
                </div>
                <p className="text-white/30 text-xs mt-1">{f.revenue}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-sm">Total revenus</span>
              <span className="text-amber-400 font-bold">4,250,000 FCFA</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold">Activité récente</h3>
            <button className="text-amber-400 text-sm hover:underline">Voir tout</button>
          </div>

          <div className="space-y-1">
            {recentActivity.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-all group"
              >
                <span className="text-xl mt-0.5 flex-shrink-0">{activity.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white/80 text-sm group-hover:text-white transition-colors truncate">
                    {activity.message}
                  </p>
                  <p className="text-white/30 text-xs mt-0.5">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold">Pages les plus visitées</h3>
            <Link to="/dashboard/analytics" className="text-amber-400 text-sm hover:underline">Analytics</Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-white/30 text-xs uppercase tracking-wider border-b border-white/5">
                  <th className="text-left pb-3 font-medium">Page</th>
                  <th className="text-right pb-3 font-medium">Vues</th>
                  <th className="text-right pb-3 font-medium">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page, i) => (
                  <motion.tr
                    key={page.page}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.05 }}
                    className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-all"
                  >
                    <td className="py-3">
                      <p className="text-white text-sm font-medium truncate max-w-[200px]">{page.title}</p>
                      <p className="text-white/30 text-xs truncate max-w-[200px]">{page.page}</p>
                    </td>
                    <td className="text-right text-white/70 text-sm">{page.views.toLocaleString()}</td>
                    <td className="text-right">
                      <span className="text-emerald-400 text-sm font-medium">{page.conversion}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Blog Articles Stats */}
      {articles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/5"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white font-semibold">Blog — Articles</h3>
              <p className="text-white/40 text-sm mt-0.5">{articles.length} article{articles.length !== 1 ? 's' : ''} au total</p>
            </div>
            <Link to="/dashboard/articles" className="text-amber-400 text-sm hover:underline">Gérer</Link>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Publiés', value: publishedCount, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
              { label: 'Brouillons', value: draftCount, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
              { label: 'Vues totales', value: totalViews.toLocaleString(), color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
            ].map((stat) => (
              <div key={stat.label} className={`p-3 rounded-xl border text-center ${stat.bg}`}>
                <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {recentArticles.length > 0 && (
            <div className="space-y-2">
              <p className="text-white/30 text-xs uppercase tracking-wider font-medium mb-3">Derniers articles</p>
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
          )}
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-500/10"
      >
        <h3 className="text-white font-semibold mb-4">Actions rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Nouvel article', icon: '✏️', path: '/dashboard/articles' },
            { label: 'Ajouter formation', icon: '🎓', path: '/dashboard/formations' },
            { label: 'Voir commentaires', icon: '💬', path: '/dashboard/comments' },
            { label: 'Exporter leads', icon: '📥', path: '/dashboard/leads' },
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
