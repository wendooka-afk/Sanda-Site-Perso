import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, ExternalLink, QrCode, Copy, Edit, Trash, Plus, Check } from 'lucide-react';
import { useLocalStorage } from './useLocalStorage';

interface PrettyLink {
  id: string;
  title: string;
  slug: string;
  destination: string;
  clicks: number;
  uniqueClicks: number;
  category: string;
  tags: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  attributes: {
    nofollow: boolean;
    sponsored: boolean;
    newTab: boolean;
  };
}

const initialLinks: PrettyLink[] = [
  { 
    id: '1', 
    title: 'Hostinger Affiliate', 
    slug: 'hostinger', 
    destination: 'https://hostinger.com/?referral=oumarou', 
    clicks: 1245, 
    uniqueClicks: 890, 
    category: 'Hébergement', 
    tags: ['hosting', 'wordpress'], 
    status: 'active', 
    createdAt: '2024-01-15',
    attributes: { nofollow: true, sponsored: true, newTab: true }
  },
  { 
    id: '2', 
    title: 'Cloudways Promo', 
    slug: 'cloudways', 
    destination: 'https://cloudways.com/promo/sanda20', 
    clicks: 856, 
    uniqueClicks: 620, 
    category: 'Hébergement', 
    tags: ['cloud', 'vps'], 
    status: 'active', 
    createdAt: '2024-02-10',
    attributes: { nofollow: true, sponsored: true, newTab: true }
  },
  { 
    id: '3', 
    title: 'Brevo Emailing', 
    slug: 'brevo', 
    destination: 'https://brevo.com/partner/sanda', 
    clicks: 432, 
    uniqueClicks: 310, 
    category: 'Outils', 
    tags: ['marketing', 'email'], 
    status: 'active', 
    createdAt: '2024-03-05',
    attributes: { nofollow: true, sponsored: false, newTab: true }
  },
  { 
    id: '4', 
    title: 'Formation Vidéo IA', 
    slug: 'go-video-ia', 
    destination: 'https://oumarousanda.com/formations/protocole-video-ia', 
    clicks: 2100, 
    uniqueClicks: 1540, 
    category: 'Formations', 
    tags: ['interne', 'promo'], 
    status: 'active', 
    createdAt: '2024-01-01',
    attributes: { nofollow: false, sponsored: false, newTab: false }
  },
  { 
    id: '5', 
    title: 'YouTube Channel', 
    slug: 'youtube', 
    destination: 'https://youtube.com/@iamsanda', 
    clicks: 5600, 
    uniqueClicks: 4200, 
    category: 'Réseaux Sociaux', 
    tags: ['social', 'bio'], 
    status: 'active', 
    createdAt: '2023-12-15',
    attributes: { nofollow: false, sponsored: false, newTab: true }
  },
];

const categories = ['Tous', 'Hébergement', 'Formations', 'Outils', 'Réseaux Sociaux', 'Affiliations'];

export default function DashboardLinks() {
  const [links, setLinks] = useLocalStorage<PrettyLink[]>('dashboard_links', initialLinks);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Tous');
  const [showModal, setShowModal] = useState(false);
  const [currentLink, setCurrentLink] = useState<Partial<PrettyLink>>({});
  const [showQR, setShowQR] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = links.filter(l => {
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase()) || l.slug.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'Tous' || l.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);
  const avgCTR = '4.2%'; // Simulated

  const handleCopy = (slug: string, id: string) => {
    navigator.clipboard.writeText(`https://oumarousanda.com/go/${slug}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = () => {
    if (!currentLink.title || !currentLink.destination) return;
    
    if (currentLink.id) {
      setLinks(prev => prev.map(l => l.id === currentLink.id ? { ...l, ...currentLink } as PrettyLink : l));
    } else {
      const newLink: PrettyLink = {
        id: Date.now().toString(),
        title: currentLink.title || '',
        slug: currentLink.slug || (currentLink.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        destination: currentLink.destination || '',
        clicks: 0,
        uniqueClicks: 0,
        category: currentLink.category || 'Non classé',
        tags: [],
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        attributes: { nofollow: true, sponsored: false, newTab: true, ...(currentLink.attributes || {}) }
      };
      setLinks(prev => [newLink, ...prev]);
    }
    setShowModal(false);
    setCurrentLink({});
  };

  const handleDelete = (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer ce lien ?')) {
      setLinks(prev => prev.filter(l => l.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setLinks(prev => prev.map(l => l.id === id ? { ...l, status: l.status === 'active' ? 'inactive' : 'active' } : l));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-white text-xl font-bold flex items-center gap-2">
            <Link className="w-6 h-6 text-amber-400" />
            Gestionnaire de Liens
          </h2>
          <p className="text-white/40 text-sm mt-1">Créez, suivez et gérez vos liens courts (PrettyLinks)</p>
        </div>
        <button
          onClick={() => { setCurrentLink({}); setShowModal(true); }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Nouveau lien
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/20">
          <p className="text-white/50 text-xs uppercase tracking-wider">Total Liens</p>
          <p className="text-white text-2xl font-bold mt-1">{links.length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 border border-emerald-500/20">
          <p className="text-white/50 text-xs uppercase tracking-wider">Total Clics</p>
          <p className="text-white text-2xl font-bold mt-1">{totalClicks.toLocaleString()}</p>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/20">
          <p className="text-white/50 text-xs uppercase tracking-wider">Liens Actifs</p>
          <p className="text-white text-2xl font-bold mt-1">{links.filter(l => l.status === 'active').length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-600/5 border border-violet-500/20">
          <p className="text-white/50 text-xs uppercase tracking-wider">CTR Moyen</p>
          <p className="text-white text-2xl font-bold mt-1">{avgCTR}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px] flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
          <span className="text-white/30">🔍</span>
          <input
            type="text"
            placeholder="Rechercher un lien..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-white text-sm placeholder:text-white/30 outline-none flex-1"
          />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-white/40 hover:text-white border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Links List */}
      <div className="space-y-3">
        {filtered.map((link, i) => (
          <motion.div
            key={link.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`
              p-5 rounded-2xl bg-white/[0.02] border transition-all hover:bg-white/[0.04]
              ${link.status === 'active' ? 'border-white/5' : 'border-red-500/10 opacity-70'}
            `}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Icon & Info */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/10 flex items-center justify-center shrink-0">
                  <span className="text-xl">🔗</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold text-sm truncate">{link.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${link.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                      {link.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-white/40 border border-white/10">
                      {link.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono mb-1">
                    <span className="text-amber-400">oumarousanda.com/go/{link.slug}</span>
                    <button 
                      onClick={() => handleCopy(link.slug, link.id)}
                      className="text-white/20 hover:text-white transition-colors"
                      title="Copier"
                    >
                      {copiedId === link.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                    <a href={link.destination} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors ml-1">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-white/30 text-xs truncate max-w-md">
                    → {link.destination}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 lg:border-l lg:border-r border-white/5 lg:px-6">
                <div className="text-center">
                  <p className="text-white font-bold text-lg">{link.clicks.toLocaleString()}</p>
                  <p className="text-white/30 text-[10px] uppercase">Clics</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-lg">{link.uniqueClicks.toLocaleString()}</p>
                  <p className="text-white/30 text-[10px] uppercase">Uniques</p>
                </div>
                <div className="hidden sm:block text-center">
                  <div className="flex gap-1 mb-1">
                    {link.attributes.nofollow && <span className="w-2 h-2 rounded-full bg-blue-400" title="NoFollow" />}
                    {link.attributes.sponsored && <span className="w-2 h-2 rounded-full bg-amber-400" title="Sponsored" />}
                  </div>
                  <p className="text-white/30 text-[10px] uppercase">Attrs</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => setShowQR(link.slug)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                  title="QR Code"
                >
                  <QrCode className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setCurrentLink(link); setShowModal(true); }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 text-white/60 hover:text-blue-400 transition-all"
                  title="Modifier"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleStatus(link.id)}
                  className={`p-2 rounded-lg bg-white/5 transition-all ${link.status === 'active' ? 'hover:bg-yellow-500/20 hover:text-yellow-400' : 'hover:bg-emerald-500/20 hover:text-emerald-400'}`}
                  title={link.status === 'active' ? 'Désactiver' : 'Activer'}
                >
                  <div className={`w-4 h-4 rounded-full border-2 ${link.status === 'active' ? 'border-emerald-400 bg-emerald-400' : 'border-white/30'}`} />
                </button>
                <button
                  onClick={() => handleDelete(link.id)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-all"
                  title="Supprimer"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        
        {filtered.length === 0 && (
          <div className="p-12 text-center text-white/30 rounded-2xl bg-white/[0.02] border border-white/5">
            Aucun lien trouvé
          </div>
        )}
      </div>

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#12131a] border border-white/10 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-white font-bold text-lg">
                  {currentLink.id ? 'Modifier le lien' : 'Nouveau lien'}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white">✕</button>
              </div>
              
              <div className="p-6 space-y-5">
                <div>
                  <label className="text-white/60 text-xs uppercase font-bold tracking-wider mb-2 block">Titre interne</label>
                  <input
                    type="text"
                    value={currentLink.title || ''}
                    onChange={(e) => setCurrentLink(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-amber-500/50"
                    placeholder="Ex: Hostinger Affiliate"
                  />
                </div>

                <div>
                  <label className="text-white/60 text-xs uppercase font-bold tracking-wider mb-2 block">URL de destination</label>
                  <input
                    type="text"
                    value={currentLink.destination || ''}
                    onChange={(e) => setCurrentLink(prev => ({ ...prev, destination: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-amber-500/50"
                    placeholder="https://..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-xs uppercase font-bold tracking-wider mb-2 block">Slug (Pretty Link)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-white/30 text-sm">/go/</span>
                      <input
                        type="text"
                        value={currentLink.slug || ''}
                        onChange={(e) => setCurrentLink(prev => ({ ...prev, slug: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-amber-500/50"
                        placeholder="mon-lien"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/60 text-xs uppercase font-bold tracking-wider mb-2 block">Catégorie</label>
                    <select
                      value={currentLink.category || categories[1]}
                      onChange={(e) => setCurrentLink(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-amber-500/50 appearance-none"
                    >
                      {categories.filter(c => c !== 'Tous').map(c => <option key={c} value={c} className="bg-[#12131a]">{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-xs uppercase font-bold tracking-wider mb-3 block">Options SEO & Comportement</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] cursor-pointer hover:bg-white/[0.06] transition-colors">
                      <input
                        type="checkbox"
                        checked={currentLink.attributes?.nofollow}
                        onChange={(e) => setCurrentLink(prev => ({ ...prev, attributes: { ...prev.attributes!, nofollow: e.target.checked } }))}
                        className="w-4 h-4 rounded border-white/20 bg-white/10 accent-amber-500"
                      />
                      <div>
                        <p className="text-white text-sm font-medium">NoFollow</p>
                        <p className="text-white/30 text-xs">Indique aux moteurs de recherche de ne pas suivre ce lien (recommandé pour l'affiliation)</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] cursor-pointer hover:bg-white/[0.06] transition-colors">
                      <input
                        type="checkbox"
                        checked={currentLink.attributes?.sponsored}
                        onChange={(e) => setCurrentLink(prev => ({ ...prev, attributes: { ...prev.attributes!, sponsored: e.target.checked } }))}
                        className="w-4 h-4 rounded border-white/20 bg-white/10 accent-amber-500"
                      />
                      <div>
                        <p className="text-white text-sm font-medium">Sponsored</p>
                        <p className="text-white/30 text-xs">Marque le lien comme sponsorisé (attribut rel="sponsored")</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] cursor-pointer hover:bg-white/[0.06] transition-colors">
                      <input
                        type="checkbox"
                        checked={currentLink.attributes?.newTab}
                        onChange={(e) => setCurrentLink(prev => ({ ...prev, attributes: { ...prev.attributes!, newTab: e.target.checked } }))}
                        className="w-4 h-4 rounded border-white/20 bg-white/10 accent-amber-500"
                      />
                      <div>
                        <p className="text-white text-sm font-medium">Nouvel onglet</p>
                        <p className="text-white/30 text-xs">Ouvre le lien dans une nouvelle fenêtre (target="_blank")</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/5 flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 text-white/60 hover:text-white text-sm font-medium transition-all"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all"
                >
                  {currentLink.id ? 'Mettre à jour' : 'Créer le lien'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowQR(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-8 rounded-3xl text-center max-w-sm w-full"
            >
              <h3 className="text-black font-bold text-xl mb-6">QR Code du lien</h3>
              <div className="aspect-square bg-gray-100 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                {/* Simulated QR Code */}
                <div className="w-48 h-48 bg-black pattern-dots relative">
                  <div className="absolute inset-0 border-[16px] border-white"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center text-white font-bold text-xl border-4 border-white">OS</div>
                  </div>
                  {/* Fake QR Pattern */}
                  <div className="absolute top-4 left-4 w-10 h-10 border-4 border-black bg-white flex items-center justify-center"><div className="w-4 h-4 bg-black"></div></div>
                  <div className="absolute top-4 right-4 w-10 h-10 border-4 border-black bg-white flex items-center justify-center"><div className="w-4 h-4 bg-black"></div></div>
                  <div className="absolute bottom-4 left-4 w-10 h-10 border-4 border-black bg-white flex items-center justify-center"><div className="w-4 h-4 bg-black"></div></div>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-6 font-mono">oumarousanda.com/go/{showQR}</p>
              <button
                onClick={() => setShowQR(null)}
                className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
