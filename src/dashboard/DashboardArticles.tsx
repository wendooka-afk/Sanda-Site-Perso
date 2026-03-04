import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardArticles } from '../hooks/useDashboardArticles';
import type { DashboardArticle } from '../hooks/useDashboardArticles';
import ArticleEditor from './ArticleEditor';

const statusConfig = {
  published: { label: 'Publié', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  draft: { label: 'Brouillon', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  scheduled: { label: 'Planifié', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
};

export default function DashboardArticles() {
  const { articles, create, update, remove, publish } = useDashboardArticles();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'scheduled'>('all');
  const [showEditor, setShowEditor] = useState(false);
  const [editingArticle, setEditingArticle] = useState<DashboardArticle | undefined>(undefined);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const filtered = articles.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.seo?.focusKeyword ?? '').toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const getSeoColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSeoBar = (score: number) => {
    if (score >= 80) return 'bg-emerald-400';
    if (score >= 60) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  const openEditor = (article?: DashboardArticle) => {
    setEditingArticle(article);
    setShowEditor(true);
  };

  const closeEditor = () => {
    setShowEditor(false);
    setEditingArticle(undefined);
  };

  /* ── EDITOR: full-screen overlay ── */
  if (showEditor) {
    return (
      <AnimatePresence>
        <ArticleEditor
          article={editingArticle}
          onCreate={create}
          onUpdate={update}
          onClose={closeEditor}
        />
      </AnimatePresence>
    );
  }

  /* ── LIST VIEW ── */
  const totalPublished = articles.filter((a) => a.status === 'published').length;
  const totalDraft = articles.filter((a) => a.status === 'draft').length;
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-white text-xl font-bold">Articles</h2>
          <p className="text-white/40 text-sm mt-1">
            {articles.length} article{articles.length !== 1 ? 's' : ''} au total
          </p>
        </div>
        <button
          onClick={() => openEditor()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all"
        >
          <span className="text-base leading-none">+</span>
          Nouvel article
        </button>
      </div>

      {/* Stats mini */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: articles.length, color: 'text-white', bg: 'bg-white/5', border: 'border-white/10' },
          { label: 'Publiés', value: totalPublished, color: 'text-emerald-400', bg: 'bg-emerald-500/5', border: 'border-emerald-500/15' },
          { label: 'Brouillons', value: totalDraft, color: 'text-yellow-400', bg: 'bg-yellow-500/5', border: 'border-yellow-500/15' },
          { label: 'Vues totales', value: totalViews.toLocaleString('fr-FR'), color: 'text-blue-400', bg: 'bg-blue-500/5', border: 'border-blue-500/15' },
        ].map((stat) => (
          <div key={stat.label} className={`p-4 rounded-xl ${stat.bg} border ${stat.border} text-center`}>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-white/30 text-xs mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[200px] flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
          <span className="text-white/30 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-white text-sm placeholder:text-white/30 outline-none flex-1"
          />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
          {(['all', 'published', 'draft', 'scheduled'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterStatus === s ? 'bg-amber-500/20 text-amber-400' : 'text-white/40 hover:text-white'
              }`}
            >
              {s === 'all' ? 'Tous' : statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Table */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-white/30 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="text-left p-4 font-medium">Article</th>
                <th className="text-left p-4 font-medium hidden md:table-cell">Catégorie</th>
                <th className="text-center p-4 font-medium hidden lg:table-cell">SEO</th>
                <th className="text-center p-4 font-medium">Statut</th>
                <th className="text-right p-4 font-medium hidden sm:table-cell">Vues</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((article, i) => (
                <motion.tr
                  key={article.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-all"
                >
                  <td className="p-4">
                    <p className="text-white text-sm font-medium line-clamp-1">{article.title}</p>
                    <p className="text-white/30 text-xs mt-1">
                      {article.date} • 💬 {article.commentsCount}
                    </p>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 text-white/60 text-xs border border-white/10">
                      {article.category}
                    </span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`text-sm font-bold ${getSeoColor(article.seoScore)}`}>
                        {article.seoScore}
                      </span>
                      <div className="w-12 h-1 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getSeoBar(article.seoScore)}`}
                          style={{ width: `${article.seoScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium border ${statusConfig[article.status].color}`}
                    >
                      {statusConfig[article.status].label}
                    </span>
                  </td>
                  <td className="p-4 text-right hidden sm:table-cell">
                    <span className="text-white/60 text-sm">{article.views.toLocaleString()}</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {article.status !== 'published' && (
                        <button
                          onClick={() => publish(article.id)}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-emerald-500/20 flex items-center justify-center text-white/40 hover:text-emerald-400 transition-all"
                          title="Publier maintenant"
                        >
                          🚀
                        </button>
                      )}
                      <button
                        onClick={() => openEditor(article)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-blue-500/20 flex items-center justify-center text-white/40 hover:text-blue-400 transition-all"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(article.id)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-white/40 hover:text-red-400 transition-all"
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-14 text-center">
                    <p className="text-3xl mb-3">📝</p>
                    <p className="text-white/40 text-sm mb-4">
                      {search || filterStatus !== 'all'
                        ? 'Aucun article trouvé avec ces filtres'
                        : 'Aucun article pour le moment'}
                    </p>
                    {!search && filterStatus === 'all' && (
                      <button
                        onClick={() => openEditor()}
                        className="px-5 py-2.5 rounded-xl bg-amber-500/20 text-amber-400 text-sm border border-amber-500/30 hover:bg-amber-500/30 transition-all font-medium"
                      >
                        Créer le premier article
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteConfirm(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#12131a] border border-red-500/20 rounded-2xl p-6 max-w-sm w-full text-center"
            >
              <span className="text-4xl block mb-4">⚠️</span>
              <h3 className="text-white font-semibold text-lg mb-2">Supprimer l'article ?</h3>
              <p className="text-white/50 text-sm mb-6">
                Cette action est irréversible. L'article sera retiré du blog public.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 text-white/60 text-sm font-medium hover:bg-white/10 transition-all"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    remove(showDeleteConfirm);
                    setShowDeleteConfirm(null);
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 text-sm font-medium hover:bg-red-500/30 transition-all"
                >
                  Supprimer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
