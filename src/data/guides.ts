export interface GuideArticle {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  tagColor: string;
  image?: string;
  date: string;
  readTime: string;
  author: string;
}

export const guides: GuideArticle[] = [
  {
    slug: 'comment-avoir-claude-code-gratuitement',
    title: 'Comment avoir Claude Code gratuitement (Guide 2026)',
    excerpt: 'La méthode 100% légale pour utiliser Claude Code gratuitement : le faire tourner sur des modèles IA open-source en local avec Ollama. Tutoriel pas à pas, sans carte bancaire.',
    tag: 'Claude Code',
    tagColor: 'bg-indigo-500/10 text-indigo-700 border border-indigo-500/20',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
    date: '3 Juin 2026',
    readTime: '14 min',
    author: 'Oumarou Sanda',
  },
  {
    slug: 'comment-utiliser-veo-3-videos-publicitaires',
    title: 'Comment utiliser VEO 3 pour créer des vidéos publicitaires (Guide 2026)',
    excerpt: 'Guide complet pour débutants : apprenez à créer des vidéos publicitaires professionnelles avec Google VEO 3. Prompts prêts à copier, workflow étape par étape, et erreurs à éviter.',
    tag: 'VEO 3',
    tagColor: 'bg-amber-500/10 text-amber-700 border border-amber-500/20',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80',
    date: '28 Avril 2026',
    readTime: '18 min',
    author: 'Oumarou Sanda',
  },
  {
    slug: 'comment-utiliser-suno-ai-creer-musique',
    title: 'Comment utiliser Suno AI pour créer de la musique (Guide 2026)',
    excerpt: 'Guide complet Suno AI : créez des chansons, jingles et musiques de fond avec l\'IA. Prompts prêts à copier, prix, workflow et erreurs à éviter.',
    tag: 'Suno AI',
    tagColor: 'bg-purple-500/10 text-purple-700 border border-purple-500/20',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80',
    date: '1 Mai 2026',
    readTime: '18 min',
    author: 'Oumarou Sanda',
  },
];
