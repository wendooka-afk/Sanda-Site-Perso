import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from './useLocalStorage';

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  article: string;
  date: string;
  status: 'approved' | 'pending' | 'spam';
  likes: number;
}

const initialComments: Comment[] = [
  { id: '1', author: 'Joseph Yannick', email: 'nkoajoseph@gmail.com', content: 'Très bon post. Grand j\'aimerai vous contacter, j\'ai vivement besoin de vos services', article: 'Comment créer un blog rentable', date: '2024-05-30', status: 'approved', likes: 3 },
  { id: '2', author: 'Didier Akokpon', email: 'didierakokpon@gmail.com', content: 'C\'est bon', article: 'Comment créer un blog rentable', date: '2024-02-12', status: 'approved', likes: 1 },
  { id: '3', author: 'chirurgie esthetique', email: 'chirurgienfr@gmail.com', content: 'Joli post merciiii', article: 'Comment créer un blog rentable', date: '2023-04-18', status: 'approved', likes: 0 },
  { id: '4', author: 'Ahmed K.', email: 'ahmed.k@gmail.com', content: 'Article très complet sur l\'IA générative ! J\'ai appris beaucoup de choses. Est-ce que vous pouvez faire un article sur l\'utilisation de Claude pour le marketing ?', article: 'Comment l\'IA transforme le marketing', date: '2025-01-20', status: 'pending', likes: 5 },
  { id: '5', author: 'Marie L.', email: 'marie.l@yahoo.fr', content: 'Excellent contenu comme toujours. J\'ai suivi le Protocole Vidéo IA et je le recommande à 100%.', article: 'Cloudways Review', date: '2025-01-15', status: 'approved', likes: 8 },
  { id: '6', author: 'TechSpammer', email: 'spam@fake.com', content: 'Buy cheap followers now! Visit our site...', article: 'Comment créer un blog rentable', date: '2025-01-18', status: 'spam', likes: 0 },
  { id: '7', author: 'Moussa D.', email: 'moussa.d@outlook.com', content: 'Sanda, tu es une vraie inspiration pour nous les jeunes entrepreneurs africains. Continue comme ça !', article: '5 outils IA entrepreneurs', date: '2025-01-22', status: 'pending', likes: 12 },
  { id: '8', author: 'Fatima B.', email: 'fatima.b@gmail.com', content: 'J\'aimerais savoir si Le Cerveau Augmenté est adapté pour quelqu\'un qui débute complètement en IA ?', article: 'Le Cerveau Augmenté', date: '2025-01-25', status: 'pending', likes: 2 },
];

const statusConfig = {
  approved: { label: 'Approuvé', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: '✅' },
  pending: { label: 'En attente', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: '⏳' },
  spam: { label: 'Spam', color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: '🚫' },
};

export default function DashboardComments() {
  const [comments, setComments] = useLocalStorage<Comment[]>('dashboard_comments', initialComments);
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending' | 'spam'>('all');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const filtered = comments.filter(c => filter === 'all' || c.status === filter);

  const counts = {
    all: comments.length,
    approved: comments.filter(c => c.status === 'approved').length,
    pending: comments.filter(c => c.status === 'pending').length,
    spam: comments.filter(c => c.status === 'spam').length,
  };

  const updateStatus = (id: string, status: Comment['status']) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  const deleteComment = (id: string) => {
    setComments(prev => prev.filter(c => c.id !== id));
  };

  const getAvatarColor = (name: string) => {
    const colors = ['from-amber-400 to-amber-600', 'from-blue-400 to-blue-600', 'from-emerald-400 to-emerald-600', 'from-violet-400 to-violet-600', 'from-pink-400 to-pink-600', 'from-cyan-400 to-cyan-600'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white text-xl font-bold">Commentaires</h2>
        <p className="text-white/40 text-sm mt-1">Modérez et gérez les commentaires</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 w-fit">
        {(['all', 'pending', 'approved', 'spam'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              filter === s
                ? 'bg-amber-500/20 text-amber-400'
                : 'text-white/40 hover:text-white'
            }`}
          >
            {s === 'all' ? 'Tous' : statusConfig[s].label}
            <span className={`px-1.5 py-0.5 rounded-md text-xs ${
              filter === s ? 'bg-amber-500/30' : 'bg-white/10'
            }`}>
              {counts[s]}
            </span>
          </button>
        ))}
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {filtered.map((comment, i) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`
              p-5 rounded-2xl bg-white/[0.02] border transition-all
              ${comment.status === 'pending' ? 'border-yellow-500/20' : comment.status === 'spam' ? 'border-red-500/10' : 'border-white/5'}
            `}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getAvatarColor(comment.author)} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                {comment.author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium text-sm">{comment.author}</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${statusConfig[comment.status].color}`}>
                      {statusConfig[comment.status].icon} {statusConfig[comment.status].label}
                    </span>
                  </div>
                  <span className="text-white/30 text-xs">
                    {new Date(comment.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>

                {/* Meta */}
                <p className="text-white/30 text-xs mt-1">
                  📧 {comment.email} • 📄 {comment.article} • ❤️ {comment.likes} likes
                </p>

                {/* Content */}
                <p className="text-white/70 text-sm mt-3 leading-relaxed">{comment.content}</p>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 flex-wrap">
                  {comment.status !== 'approved' && (
                    <button
                      onClick={() => updateStatus(comment.id, 'approved')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium transition-all"
                    >
                      ✅ Approuver
                    </button>
                  )}
                  {comment.status !== 'spam' && (
                    <button
                      onClick={() => updateStatus(comment.id, 'spam')}
                      className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium transition-all"
                    >
                      🚫 Spam
                    </button>
                  )}
                  <button
                    onClick={() => { setReplyTo(replyTo === comment.id ? null : comment.id); setReplyText(''); }}
                    className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-medium transition-all"
                  >
                    💬 Répondre
                  </button>
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/10 text-white/30 hover:text-red-400 text-xs font-medium transition-all"
                  >
                    🗑️ Supprimer
                  </button>
                </div>

                {/* Reply Form */}
                <AnimatePresence>
                  {replyTo === comment.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-amber-500/50 resize-none"
                          placeholder="Votre réponse..."
                        />
                        <div className="flex items-center justify-end gap-2 mt-3">
                          <button onClick={() => setReplyTo(null)} className="px-3 py-1.5 rounded-lg text-white/40 text-xs">Annuler</button>
                          <button
                            onClick={() => { setReplyTo(null); setReplyText(''); }}
                            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-semibold"
                          >
                            Envoyer
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="p-12 text-center text-white/30 rounded-2xl bg-white/[0.02] border border-white/5">
            Aucun commentaire dans cette catégorie
          </div>
        )}
      </div>
    </div>
  );
}
