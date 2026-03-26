import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from './useLocalStorage';

interface Formation {
  id: string;
  name: string;
  price: string;
  priceFCFA: string;
  sales: number;
  revenue: string;
  students: number;
  rating: number;
  status: 'active' | 'draft' | 'archived';
  description?: string;
}

const initialFormations: Formation[] = [
  { id: '1', name: 'Protocole Vidéo IA', price: '97$', priceFCFA: '50,000 FCFA', sales: 142, revenue: '7,100,000 FCFA', students: 142, rating: 4.9, status: 'active' },
  { id: '2', name: 'Le Cerveau Augmenté', price: '67$', priceFCFA: '45,000 FCFA', sales: 98, revenue: '4,410,000 FCFA', students: 98, rating: 4.8, status: 'active' },
  { id: '3', name: 'Offshore Empire', price: '197$', priceFCFA: '97,000 FCFA', sales: 45, revenue: '4,365,000 FCFA', students: 45, rating: 4.7, status: 'active' },
  { id: '4', name: 'IA Mastery Pro', price: '297$', priceFCFA: '150,000 FCFA', sales: 0, revenue: '0 FCFA', students: 0, rating: 0, status: 'draft' },
];

const statusConfig = {
  active: { label: 'Active', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  draft: { label: 'Brouillon', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  archived: { label: 'Archivée', color: 'bg-white/10 text-white/40 border-white/10' },
};

export default function DashboardFormations() {
  const [formations, setFormations] = useLocalStorage<Formation[]>('dashboard_formations', initialFormations);
  const [showEditor, setShowEditor] = useState(false);
  const [editing, setEditing] = useState<Partial<Formation> | null>(null);

  const totalRevenue = formations.reduce((sum, f) => sum + parseInt(f.revenue.replace(/[^0-9]/g, '') || '0'), 0);
  const totalStudents = formations.reduce((sum, f) => sum + f.students, 0);
  const totalSales = formations.reduce((sum, f) => sum + f.sales, 0);

  const handleSave = () => {
    if (!editing?.name) return;
    if (editing.id) {
      setFormations(prev => prev.map(f => f.id === editing.id ? { ...f, ...editing } as Formation : f));
    } else {
      const newF: Formation = {
        id: Date.now().toString(),
        name: editing.name || '',
        price: editing.price || '0$',
        priceFCFA: editing.priceFCFA || '0 FCFA',
        description: editing.description || '',
        sales: 0, revenue: '0 FCFA', students: 0, rating: 0,
        status: (editing.status as Formation['status']) || 'draft',
      };
      setFormations(prev => [newF, ...prev]);
    }
    setShowEditor(false);
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-white text-xl font-bold">Formations</h2>
          <p className="text-white/40 text-sm mt-1">Gérez vos cours et programmes</p>
        </div>
        <button
          onClick={() => { setEditing({}); setShowEditor(true); }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all"
        >
          + Nouvelle formation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Revenus totaux', value: `${totalRevenue.toLocaleString()} FCFA`, icon: '💰', color: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20' },
          { label: 'Ventes totales', value: totalSales.toString(), icon: '📦', color: 'from-blue-500/20 to-blue-600/5 border-blue-500/20' },
          { label: 'Étudiants actifs', value: totalStudents.toString(), icon: '🎓', color: 'from-violet-500/20 to-violet-600/5 border-violet-500/20' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-5 rounded-2xl bg-gradient-to-br ${stat.color} border`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/50 text-sm">{stat.label}</p>
                <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <span className="text-3xl opacity-60">{stat.icon}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Formations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formations.map((formation, i) => (
          <motion.div
            key={formation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0 mr-3">
                <h3 className="text-white font-semibold text-lg">{formation.name}</h3>
                {formation.description && (
                  <p className="text-white/40 text-xs mt-1 line-clamp-2 leading-relaxed">{formation.description}</p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium border ${statusConfig[formation.status].color}`}>
                    {statusConfig[formation.status].label}
                  </span>
                  {formation.rating > 0 && (
                    <span className="text-amber-400 text-sm">★ {formation.rating}</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-amber-400 font-bold text-lg">{formation.price}</p>
                <p className="text-white/30 text-xs">{formation.priceFCFA}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-white/[0.03] text-center">
                <p className="text-white/40 text-xs">Ventes</p>
                <p className="text-white font-bold mt-1">{formation.sales}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] text-center">
                <p className="text-white/40 text-xs">Étudiants</p>
                <p className="text-white font-bold mt-1">{formation.students}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] text-center">
                <p className="text-white/40 text-xs">Revenus</p>
                <p className="text-emerald-400 font-bold mt-1 text-xs">{formation.revenue}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => { setEditing(formation); setShowEditor(true); }}
                className="flex-1 px-4 py-2 rounded-xl bg-white/5 hover:bg-blue-500/15 text-white/60 hover:text-blue-400 text-sm font-medium transition-all"
              >
                ✏️ Modifier
              </button>
              <button className="flex-1 px-4 py-2 rounded-xl bg-white/5 hover:bg-amber-500/15 text-white/60 hover:text-amber-400 text-sm font-medium transition-all">
                📊 Stats
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {showEditor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowEditor(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#12131a] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-white font-semibold text-lg">
                  {editing?.id ? 'Modifier la formation' : 'Nouvelle formation'}
                </h3>
                <button onClick={() => setShowEditor(false)} className="text-white/40 hover:text-white text-xl">✕</button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Nom de la formation *</label>
                  <input
                    type="text"
                    value={editing?.name || ''}
                    onChange={(e) => setEditing(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-amber-500/50"
                    placeholder="Nom de la formation..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Prix (USD)</label>
                    <input
                      type="text"
                      value={editing?.price || ''}
                      onChange={(e) => setEditing(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-amber-500/50"
                      placeholder="97$"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Prix (FCFA)</label>
                    <input
                      type="text"
                      value={editing?.priceFCFA || ''}
                      onChange={(e) => setEditing(prev => ({ ...prev, priceFCFA: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-amber-500/50"
                      placeholder="50,000 FCFA"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-2 block">Statut</label>
                  <select
                    value={editing?.status || 'draft'}
                    onChange={(e) => setEditing(prev => ({ ...prev, status: e.target.value as Formation['status'] }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-amber-500/50"
                  >
                    <option value="draft" className="bg-[#12131a]">Brouillon</option>
                    <option value="active" className="bg-[#12131a]">Active</option>
                    <option value="archived" className="bg-[#12131a]">Archivée</option>
                  </select>
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-2 block">Description</label>
                  <textarea
                    rows={4}
                    value={editing?.description || ''}
                    onChange={(e) => setEditing(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-amber-500/50 resize-none"
                    placeholder="Description de la formation..."
                  />
                </div>
              </div>

              <div className="p-6 border-t border-white/5 flex items-center justify-end gap-3">
                <button onClick={() => setShowEditor(false)} className="px-5 py-2.5 rounded-xl bg-white/5 text-white/60 text-sm font-medium">Annuler</button>
                <button onClick={handleSave} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-sm">
                  {editing?.id ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
