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
    slug: 'comment-utiliser-veo-3-videos-publicitaires',
    title: 'Comment utiliser VEO 3 pour créer des vidéos publicitaires (Guide 2026)',
    excerpt: 'Guide complet pour débutants : apprenez à créer des vidéos publicitaires professionnelles avec Google VEO 3. Prompts prêts à copier, workflow étape par étape, et erreurs à éviter.',
    tag: 'VEO 3',
    tagColor: 'bg-amber-500/10 text-amber-700 border border-amber-500/20',
    image: '',
    date: '28 Avril 2026',
    readTime: '18 min',
    author: 'Oumarou Sanda',
  },
];
