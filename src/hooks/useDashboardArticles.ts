/**
 * useDashboardArticles — Store partagé entre le dashboard et le blog public.
 * Les articles créés dans le dashboard sont stockés dans localStorage et
 * rendus disponibles sur les pages BlogPage et BlogArticlePage.
 */

import { useState, useCallback } from 'react';

export const DASHBOARD_ARTICLES_KEY = 'sanda_articles_v2';

export interface DashboardArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tag: string;
  tagColor: string;
  image: string;
  status: 'published' | 'draft' | 'scheduled';
  /** Date affichée sur le blog (ex: "15 Mars 2026") */
  date: string;
  /** ISO string pour le tri */
  createdAt: string;
  scheduledAt?: string;
  readTime: string;
  author: string;
  /** Contenu de l'article en Markdown */
  bodyMarkdown: string;
  seo: {
    focusKeyword: string;
    metaTitle: string;
    metaDescription: string;
  };
  seoScore: number;
  views: number;
  commentsCount: number;
}

function readFromStorage(): DashboardArticle[] {
  try {
    const raw = localStorage.getItem(DASHBOARD_ARTICLES_KEY);
    return raw ? (JSON.parse(raw) as DashboardArticle[]) : [];
  } catch {
    return [];
  }
}

function writeToStorage(articles: DashboardArticle[]): void {
  try {
    localStorage.setItem(DASHBOARD_ARTICLES_KEY, JSON.stringify(articles));
  } catch (e) {
    console.error('useDashboardArticles: write error', e);
  }
}

/** Calcule automatiquement le score SEO (0-100) */
export function computeSeoScore(article: Partial<DashboardArticle>): number {
  let score = 0;
  const kw = (article.seo?.focusKeyword || '').toLowerCase();
  const body = (article.bodyMarkdown || '').toLowerCase();
  const title = (article.title || '').toLowerCase();
  const excerpt = (article.excerpt || '').toLowerCase();

  if (title.length > 10) score += 10;
  if (kw && title.includes(kw)) score += 20;
  if (kw && body.includes(kw)) score += 15;
  if (excerpt.length > 50) score += 10;
  if (kw && excerpt.includes(kw)) score += 10;
  if (body.length > 500) score += 10;
  if (body.length > 1500) score += 10;
  if (article.image) score += 10;
  if ((article.seo?.metaTitle || '').length > 30) score += 5;
  if ((article.seo?.metaDescription || '').length > 80) score += 5;
  // Headings
  if (body.includes('## ') || body.includes('# ')) score += 5;
  return Math.min(100, score);
}

/** Génère un slug depuis un titre */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/** Estime le temps de lecture (~200 mots/min) */
export function estimateReadTime(markdown: string): string {
  const words = markdown.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

/** Formate une date ISO en chaîne lisible */
export function formatDisplayDate(isoDate: string): string {
  try {
    return new Date(isoDate).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return isoDate;
  }
}

/** Hook principal — utilisé par le dashboard ET les pages publiques */
export function useDashboardArticles() {
  const [articles, setArticles] = useState<DashboardArticle[]>(() => readFromStorage());

  const save = useCallback((updated: DashboardArticle[]) => {
    writeToStorage(updated);
    setArticles(updated);
  }, []);

  const create = useCallback(
    (data: Omit<DashboardArticle, 'id' | 'createdAt' | 'views' | 'commentsCount'>): DashboardArticle => {
      const now = new Date().toISOString();
      const article: DashboardArticle = {
        ...data,
        id: `da_${Date.now()}`,
        createdAt: now,
        views: 0,
        commentsCount: 0,
      };
      const updated = [article, ...readFromStorage()];
      writeToStorage(updated);
      setArticles(updated);
      return article;
    },
    []
  );

  const update = useCallback(
    (id: string, data: Partial<DashboardArticle>): void => {
      const current = readFromStorage();
      const updated = current.map((a) => (a.id === id ? { ...a, ...data } : a));
      writeToStorage(updated);
      setArticles(updated);
    },
    []
  );

  const remove = useCallback((id: string): void => {
    const current = readFromStorage();
    const updated = current.filter((a) => a.id !== id);
    writeToStorage(updated);
    setArticles(updated);
  }, []);

  const publish = useCallback((id: string): void => {
    update(id, { status: 'published', date: formatDisplayDate(new Date().toISOString()) });
  }, [update]);

  /** Articles publiés uniquement (pour le blog public) */
  const published = articles.filter((a) => a.status === 'published');

  return { articles, published, save, create, update, remove, publish };
}

/** Version légère sans state React — pour lecture directe (BlogPage, BlogArticlePage) */
export function getDashboardArticles(): DashboardArticle[] {
  return readFromStorage();
}

export function getDashboardArticleBySlug(slug: string): DashboardArticle | undefined {
  return readFromStorage().find((a) => a.slug === slug);
}
