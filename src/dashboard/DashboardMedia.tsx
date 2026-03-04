import { useState } from 'react';
import { motion } from 'framer-motion';

interface MediaItem {
  id: string;
  title: string;
  type: 'video' | 'image' | 'document';
  platform: string;
  date: string;
  views: number;
  size: string;
  url: string;
}

const mediaItems: MediaItem[] = [
  { id: '1', title: 'Comment créer des vidéos IA avec Sora', type: 'video', platform: 'YouTube', date: '2025-01-25', views: 15400, size: '245 MB', url: '#' },
  { id: '2', title: 'ChatGPT vs Claude - Le comparatif ultime', type: 'video', platform: 'YouTube', date: '2025-01-20', views: 12800, size: '180 MB', url: '#' },
  { id: '3', title: 'Automatiser son business avec l\'IA', type: 'video', platform: 'YouTube', date: '2025-01-15', views: 9200, size: '320 MB', url: '#' },
  { id: '4', title: 'Vibe Coding : Construire une app en 30min', type: 'video', platform: 'YouTube', date: '2025-01-10', views: 8100, size: '290 MB', url: '#' },
  { id: '5', title: 'Photo profil - Oumarou Sanda', type: 'image', platform: 'Site', date: '2025-01-01', views: 0, size: '2.4 MB', url: '#' },
  { id: '6', title: 'Kit Média - Oumarou Sanda 2025', type: 'document', platform: 'Site', date: '2025-01-05', views: 340, size: '5.8 MB', url: '#' },
  { id: '7', title: 'Logo Wendooka HD', type: 'image', platform: 'Site', date: '2024-12-20', views: 0, size: '1.2 MB', url: '#' },
  { id: '8', title: 'Logo Sanda Vibe Code', type: 'image', platform: 'Site', date: '2024-12-20', views: 0, size: '890 KB', url: '#' },
  { id: '9', title: 'Midjourney pour les entrepreneurs', type: 'video', platform: 'TikTok', date: '2025-01-18', views: 45000, size: '45 MB', url: '#' },
];

const typeConfig = {
  video: { icon: '🎬', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  image: { icon: '🖼️', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  document: { icon: '📄', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
};

export default function DashboardMedia() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'video' | 'image' | 'document'>('all');

  const filtered = mediaItems.filter(m => filter === 'all' || m.type === filter);
  const totalViews = mediaItems.reduce((s, m) => s + m.views, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-white text-xl font-bold">Médias</h2>
          <p className="text-white/40 text-sm mt-1">{mediaItems.length} fichiers • {totalViews.toLocaleString()} vues totales</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-sm">
          + Ajouter un média
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Vidéos', value: mediaItems.filter(m => m.type === 'video').length, icon: '🎬', color: 'from-red-500/20 to-red-600/5 border-red-500/20' },
          { label: 'Images', value: mediaItems.filter(m => m.type === 'image').length, icon: '🖼️', color: 'from-blue-500/20 to-blue-600/5 border-blue-500/20' },
          { label: 'Documents', value: mediaItems.filter(m => m.type === 'document').length, icon: '📄', color: 'from-amber-500/20 to-amber-600/5 border-amber-500/20' },
          { label: 'Vues YouTube', value: `${(totalViews / 1000).toFixed(1)}K`, icon: '👁️', color: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} border`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/50 text-xs">{stat.label}</p>
                <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <span className="text-2xl opacity-60">{stat.icon}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters & View Toggle */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
          {(['all', 'video', 'image', 'document'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === f ? 'bg-amber-500/20 text-amber-400' : 'text-white/40 hover:text-white'
              }`}
            >
              {f === 'all' ? 'Tous' : f === 'video' ? '🎬 Vidéos' : f === 'image' ? '🖼️ Images' : '📄 Documents'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
          <button
            onClick={() => setView('grid')}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${view === 'grid' ? 'bg-white/10 text-white' : 'text-white/40'}`}
          >▦ Grille</button>
          <button
            onClick={() => setView('list')}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${view === 'list' ? 'bg-white/10 text-white' : 'text-white/40'}`}
          >☰ Liste</button>
        </div>
      </div>

      {/* Media Grid/List */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden hover:border-white/10 transition-all group"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center relative">
                <span className="text-5xl opacity-30">{typeConfig[item.type].icon}</span>
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white text-xl ml-1">▶</span>
                    </div>
                  </div>
                )}
                <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-md text-xs font-medium border ${typeConfig[item.type].color}`}>
                  {item.type}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <h4 className="text-white text-sm font-medium line-clamp-2">{item.title}</h4>
                <div className="flex items-center justify-between mt-3 text-white/30 text-xs">
                  <span>{item.platform} • {item.size}</span>
                  {item.views > 0 && <span>👁️ {item.views.toLocaleString()}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-white/30 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="text-left p-4 font-medium">Fichier</th>
                <th className="text-left p-4 font-medium hidden md:table-cell">Type</th>
                <th className="text-left p-4 font-medium hidden lg:table-cell">Plateforme</th>
                <th className="text-right p-4 font-medium hidden sm:table-cell">Taille</th>
                <th className="text-right p-4 font-medium hidden sm:table-cell">Vues</th>
                <th className="text-right p-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-all">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{typeConfig[item.type].icon}</span>
                      <span className="text-white text-sm font-medium line-clamp-1">{item.title}</span>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className={`px-2 py-0.5 rounded-md text-xs border ${typeConfig[item.type].color}`}>{item.type}</span>
                  </td>
                  <td className="p-4 hidden lg:table-cell text-white/50 text-sm">{item.platform}</td>
                  <td className="p-4 text-right hidden sm:table-cell text-white/50 text-sm">{item.size}</td>
                  <td className="p-4 text-right hidden sm:table-cell text-white/50 text-sm">{item.views > 0 ? item.views.toLocaleString() : '—'}</td>
                  <td className="p-4 text-right text-white/40 text-sm">{new Date(item.date).toLocaleDateString('fr-FR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
