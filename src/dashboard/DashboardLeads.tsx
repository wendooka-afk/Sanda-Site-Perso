import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocalStorage } from './useLocalStorage';

interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  segment: string;
  date: string;
  status: 'active' | 'unsubscribed';
  opens: number;
  clicks: number;
}

const initialLeads: Lead[] = [
  { id: '1', name: 'Ahmed Konaté', email: 'ahmed.k@gmail.com', source: 'Newsletter popup', segment: 'Formations', date: '2025-01-28', status: 'active', opens: 12, clicks: 5 },
  { id: '2', name: 'Marie Lougou', email: 'marie.l@yahoo.fr', source: 'Lead magnet (eBook IA)', segment: 'IA Générative', date: '2025-01-27', status: 'active', opens: 8, clicks: 3 },
  { id: '3', name: 'Moussa Diallo', email: 'moussa.d@outlook.com', source: 'Page formation', segment: 'Formations', date: '2025-01-26', status: 'active', opens: 15, clicks: 7 },
  { id: '4', name: 'Fatima Bello', email: 'fatima.b@gmail.com', source: 'Blog article', segment: 'Contenu gratuit', date: '2025-01-25', status: 'active', opens: 6, clicks: 2 },
  { id: '5', name: 'Ibrahim Sow', email: 'ibrahim.s@gmail.com', source: 'Newsletter popup', segment: 'IA Générative', date: '2025-01-24', status: 'active', opens: 20, clicks: 9 },
  { id: '6', name: 'Aïcha Traoré', email: 'aicha.t@gmail.com', source: 'Lead magnet (checklist)', segment: 'Formations', date: '2025-01-23', status: 'unsubscribed', opens: 3, clicks: 1 },
  { id: '7', name: 'Paul Ndiaye', email: 'paul.n@hotmail.com', source: 'Contact form', segment: 'Agence', date: '2025-01-22', status: 'active', opens: 10, clicks: 4 },
  { id: '8', name: 'Christelle Manga', email: 'christelle.m@gmail.com', source: 'Blog article', segment: 'Contenu gratuit', date: '2025-01-21', status: 'active', opens: 5, clicks: 2 },
  { id: '9', name: 'TechAfrica Corp', email: 'contact@techafrica.io', source: 'Partenariat form', segment: 'B2B', date: '2025-01-20', status: 'active', opens: 4, clicks: 3 },
  { id: '10', name: 'Rachid Benmoussa', email: 'rachid.b@gmail.com', source: 'Newsletter popup', segment: 'IA Générative', date: '2025-01-19', status: 'active', opens: 18, clicks: 8 },
];

const segments = ['Tous', 'Formations', 'IA Générative', 'Contenu gratuit', 'Agence', 'B2B'];

export default function DashboardLeads() {
  const [leads] = useLocalStorage<Lead[]>('dashboard_leads', initialLeads);
  const [search, setSearch] = useState('');
  const [activeSegment, setActiveSegment] = useState('Tous');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const filtered = leads.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase());
    const matchSegment = activeSegment === 'Tous' || l.segment === activeSegment;
    return matchSearch && matchSegment;
  });

  const toggleSelect = (id: string) => {
    setSelectedLeads(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selectedLeads.length === filtered.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filtered.map(l => l.id));
    }
  };

  const activeCount = leads.filter(l => l.status === 'active').length;
  const avgOpens = Math.round(leads.reduce((s, l) => s + l.opens, 0) / leads.length);

  const handleExportCSV = () => {
    const toExport = selectedLeads.length > 0 ? leads.filter(l => selectedLeads.includes(l.id)) : leads;
    const headers = ['Nom', 'Email', 'Source', 'Segment', 'Date', 'Statut', 'Opens', 'Clicks'];
    const rows = toExport.map(l => [
      l.name, l.email, l.source, l.segment, l.date,
      l.status === 'active' ? 'Actif' : 'Désabonné',
      l.opens.toString(), l.clicks.toString(),
    ]);
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-white text-xl font-bold">Leads & Newsletter</h2>
          <p className="text-white/40 text-sm mt-1">Gérez vos abonnés et prospects</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white text-sm font-medium transition-all"
          >
            📥 Exporter CSV
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white text-sm font-medium transition-all">
            📤 Importer
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total abonnés', value: leads.length.toString(), icon: '📧', color: 'from-blue-500/20 to-blue-600/5 border-blue-500/20' },
          { label: 'Actifs', value: activeCount.toString(), icon: '✅', color: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20' },
          { label: 'Taux d\'ouverture moy.', value: `${avgOpens}%`, icon: '📬', color: 'from-amber-500/20 to-amber-600/5 border-amber-500/20' },
          { label: 'Désabonnés', value: leads.filter(l => l.status === 'unsubscribed').length.toString(), icon: '📭', color: 'from-red-500/20 to-red-600/5 border-red-500/20' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} border`}
          >
            <p className="text-white/50 text-xs">{stat.label}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-white text-2xl font-bold">{stat.value}</p>
              <span className="text-2xl opacity-60">{stat.icon}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px] flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
          <span className="text-white/30">🔍</span>
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-white text-sm placeholder:text-white/30 outline-none flex-1"
          />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 overflow-x-auto">
          {segments.map(s => (
            <button
              key={s}
              onClick={() => setActiveSegment(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeSegment === s ? 'bg-amber-500/20 text-amber-400' : 'text-white/40 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedLeads.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20"
        >
          <span className="text-amber-400 text-sm font-medium">{selectedLeads.length} sélectionné(s)</span>
          <button className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-medium">📧 Envoyer email</button>
          <button className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-medium">🏷️ Changer segment</button>
          <button className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-medium">🗑️ Supprimer</button>
        </motion.div>
      )}

      {/* Leads Table */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-white/30 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedLeads.length === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded bg-white/10 border-white/20 accent-amber-500"
                  />
                </th>
                <th className="text-left p-4 font-medium">Contact</th>
                <th className="text-left p-4 font-medium hidden md:table-cell">Source</th>
                <th className="text-left p-4 font-medium hidden lg:table-cell">Segment</th>
                <th className="text-center p-4 font-medium hidden lg:table-cell">Opens</th>
                <th className="text-center p-4 font-medium hidden lg:table-cell">Clicks</th>
                <th className="text-center p-4 font-medium">Statut</th>
                <th className="text-right p-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-all ${selectedLeads.includes(lead.id) ? 'bg-amber-500/5' : ''}`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => toggleSelect(lead.id)}
                      className="w-4 h-4 rounded bg-white/10 border-white/20 accent-amber-500"
                    />
                  </td>
                  <td className="p-4">
                    <p className="text-white text-sm font-medium">{lead.name}</p>
                    <p className="text-white/30 text-xs mt-0.5">{lead.email}</p>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="text-white/50 text-sm">{lead.source}</span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className="px-2 py-1 rounded-lg bg-white/5 text-white/60 text-xs border border-white/10">{lead.segment}</span>
                  </td>
                  <td className="p-4 text-center hidden lg:table-cell">
                    <span className="text-white/60 text-sm">{lead.opens}</span>
                  </td>
                  <td className="p-4 text-center hidden lg:table-cell">
                    <span className="text-white/60 text-sm">{lead.clicks}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium border ${
                      lead.status === 'active' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}>
                      {lead.status === 'active' ? 'Actif' : 'Désabonné'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-white/40 text-sm">
                      {new Date(lead.date).toLocaleDateString('fr-FR')}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
