import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { marked } from 'marked';
import { X, Eye, Code2, Save, Send, Search, AlertCircle } from 'lucide-react';
import {
  DashboardArticle,
  computeSeoScore,
  slugify,
  estimateReadTime,
  formatDisplayDate,
} from '../hooks/useDashboardArticles';

const CATEGORIES = [
  'IA Générative',
  'Business Digital',
  'Vibe Coding',
  'Automatisation',
  'Entrepreneuriat Afrique',
  'Analyses & Opinions',
  'Tutoriels',
  'Reviews',
  'Blogging',
];

const TAG_COLORS = [
  { label: 'Bleu', value: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  { label: 'Doré', value: 'bg-amber-500/10 text-amber-700 border-amber-500/20' },
  { label: 'Vert', value: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
  { label: 'Rouge', value: 'bg-red-500/10 text-red-600 border-red-500/20' },
  { label: 'Violet', value: 'bg-violet-500/10 text-violet-600 border-violet-500/20' },
  { label: 'Cyan', value: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20' },
];

interface EditorForm {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tag: string;
  tagColor: string;
  image: string;
  status: 'published' | 'draft' | 'scheduled';
  author: string;
  bodyMarkdown: string;
  seo: { focusKeyword: string; metaTitle: string; metaDescription: string };
}

interface ArticleEditorProps {
  article?: DashboardArticle;
  onCreate: (data: Omit<DashboardArticle, 'id' | 'createdAt' | 'views' | 'commentsCount'>) => void;
  onUpdate: (id: string, data: Partial<DashboardArticle>) => void;
  onClose: () => void;
}

export default function ArticleEditor({ article, onCreate, onUpdate, onClose }: ArticleEditorProps) {
  const isEditing = !!article;
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const [seoTab, setSeoTab] = useState<'settings' | 'seo'>('settings');
  const [slugAutoSync, setSlugAutoSync] = useState(!isEditing);

  const [form, setForm] = useState<EditorForm>({
    title: article?.title ?? '',
    slug: article?.slug ?? '',
    excerpt: article?.excerpt ?? '',
    category: article?.category ?? CATEGORIES[0],
    tag: article?.tag ?? 'Article',
    tagColor: article?.tagColor ?? TAG_COLORS[0].value,
    image: article?.image ?? '',
    status: article?.status ?? 'draft',
    author: article?.author ?? 'Oumarou Sanda',
    bodyMarkdown: article?.bodyMarkdown ?? '',
    seo: {
      focusKeyword: article?.seo?.focusKeyword ?? '',
      metaTitle: article?.seo?.metaTitle ?? '',
      metaDescription: article?.seo?.metaDescription ?? '',
    },
  });

  /* ── Auto-sync slug ── */
  useEffect(() => {
    if (slugAutoSync && form.title) {
      setForm((prev) => ({ ...prev, slug: slugify(prev.title) }));
    }
  }, [form.title, slugAutoSync]);

  /* ── Live SEO Score ── */
  const seoScore = useMemo(
    () => computeSeoScore({ ...form, seo: form.seo }),
    [form]
  );

  /* ── Markdown Preview ── */
  const preview = useMemo(() => {
    if (tab !== 'preview' || !form.bodyMarkdown) return '';
    return String(marked.parse(form.bodyMarkdown));
  }, [tab, form.bodyMarkdown]);

  const readTime = useMemo(() => estimateReadTime(form.bodyMarkdown), [form.bodyMarkdown]);

  /* ── Build payload ── */
  function buildData(
    status: 'draft' | 'published' | 'scheduled'
  ): Omit<DashboardArticle, 'id' | 'createdAt' | 'views' | 'commentsCount'> {
    const now = new Date().toISOString();
    return {
      ...form,
      status,
      date: formatDisplayDate(article?.createdAt ?? now),
      readTime,
      seoScore,
    };
  }

  const handleSaveDraft = () => {
    if (!form.title.trim()) return;
    if (isEditing) onUpdate(article.id, buildData('draft'));
    else onCreate(buildData('draft'));
    onClose();
  };

  const handlePublish = () => {
    if (!form.title.trim()) return;
    if (isEditing) onUpdate(article.id, buildData('published'));
    else onCreate(buildData('published'));
    onClose();
  };

  const seoBarColor =
    seoScore >= 80 ? 'bg-emerald-500' : seoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500';
  const seoTextColor =
    seoScore >= 80 ? 'text-emerald-400' : seoScore >= 60 ? 'text-yellow-400' : 'text-red-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 bg-[#0a0b0f] flex flex-col overflow-hidden"
    >
      {/* ── TOP BAR ── */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 shrink-0 bg-[#0f1015]">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-white font-semibold text-sm leading-none">
              {isEditing ? "Modifier l'article" : 'Nouvel article'}
            </h2>
            <p className="text-white/30 text-[11px] mt-0.5">
              {form.status === 'published' ? '● Publié' : form.status === 'scheduled' ? '◎ Planifié' : '○ Brouillon'}
            </p>
          </div>
        </div>

        {/* SEO Score */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-white/30 text-xs">SEO</span>
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full ${seoBarColor} transition-all duration-500`}
                style={{ width: `${seoScore}%` }}
              />
            </div>
            <span className={`text-sm font-bold ${seoTextColor}`}>{seoScore}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveDraft}
            disabled={!form.title.trim()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-white/70 hover:text-white hover:bg-white/10 text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:block">Brouillon</span>
          </button>
          <button
            onClick={handlePublish}
            disabled={!form.title.trim()}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
            Publier
          </button>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT — Editor */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Title Area */}
          <div className="px-6 sm:px-10 pt-7 pb-4 border-b border-white/5">
            <textarea
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Titre de l'article..."
              rows={2}
              className="w-full bg-transparent text-white text-2xl sm:text-3xl font-bold placeholder:text-white/20 outline-none border-none resize-none leading-tight"
            />
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span className="text-white/30 text-xs shrink-0">slug :</span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => {
                  setSlugAutoSync(false);
                  setForm((prev) => ({ ...prev, slug: e.target.value }));
                }}
                className="text-white/40 text-xs bg-transparent outline-none border-b border-white/10 focus:border-amber-500/50 focus:text-white/70 transition-all min-w-[160px] max-w-xs"
                placeholder="url-de-larticle"
              />
              <span className="text-white/20 text-xs">• {readTime} de lecture</span>
            </div>
          </div>

          {/* Write / Preview Tabs */}
          <div className="flex items-center gap-1 px-6 sm:px-10 py-2 border-b border-white/5 bg-[#0d0e13]">
            <button
              onClick={() => setTab('write')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${tab === 'write' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Écrire
            </button>
            <button
              onClick={() => setTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${tab === 'preview' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
            >
              <Eye className="w-3.5 h-3.5" />
              Aperçu
            </button>
          </div>

          {/* Editor / Preview Area */}
          <div className="flex-1 overflow-y-auto">
            {tab === 'write' ? (
              <textarea
                value={form.bodyMarkdown}
                onChange={(e) => setForm((prev) => ({ ...prev, bodyMarkdown: e.target.value }))}
                placeholder={`Rédigez votre article en Markdown...\n\n# Titre principal\n\n## Sous-titre\n\nVotre contenu ici...\n\n**Gras** _italique_ \`code\``}
                className="w-full h-full min-h-[400px] px-6 sm:px-10 py-6 bg-transparent text-white/80 text-sm leading-relaxed font-mono placeholder:text-white/20 outline-none resize-none"
              />
            ) : (
              <div
                className="px-6 sm:px-10 py-6 prose prose-sm prose-invert max-w-none
                  [&_h1]:text-white [&_h1]:font-bold [&_h1]:text-2xl [&_h1]:mt-6 [&_h1]:mb-3
                  [&_h2]:text-white/90 [&_h2]:font-semibold [&_h2]:text-xl [&_h2]:mt-5 [&_h2]:mb-2
                  [&_h3]:text-white/80 [&_h3]:font-semibold [&_h3]:text-lg [&_h3]:mt-4 [&_h3]:mb-2
                  [&_p]:text-white/70 [&_p]:leading-relaxed [&_p]:mb-4
                  [&_ul]:text-white/70 [&_ul]:pl-6 [&_ul]:mb-4
                  [&_ol]:text-white/70 [&_ol]:pl-6 [&_ol]:mb-4
                  [&_li]:mb-1
                  [&_code]:bg-white/10 [&_code]:text-amber-400 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs
                  [&_pre]:bg-white/5 [&_pre]:border [&_pre]:border-white/10 [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto
                  [&_blockquote]:border-l-2 [&_blockquote]:border-amber-500/40 [&_blockquote]:pl-4 [&_blockquote]:text-white/60 [&_blockquote]:italic
                  [&_a]:text-amber-400 [&_a]:underline [&_a]:underline-offset-2
                  [&_strong]:text-white [&_strong]:font-semibold
                  [&_hr]:border-white/10"
                dangerouslySetInnerHTML={{ __html: preview || '<p class="text-white/20 italic">Aucun contenu à prévisualiser.</p>' }}
              />
            )}
          </div>
        </div>

        {/* RIGHT — Sidebar */}
        <div className="w-72 xl:w-80 border-l border-white/5 flex flex-col overflow-hidden bg-[#0d0e13] shrink-0">
          {/* Sidebar Tabs */}
          <div className="flex border-b border-white/5 shrink-0">
            <button
              onClick={() => setSeoTab('settings')}
              className={`flex-1 py-3 text-xs font-semibold tracking-wider uppercase transition-all ${seoTab === 'settings' ? 'text-white border-b-2 border-amber-500' : 'text-white/30 hover:text-white/60'}`}
            >
              Paramètres
            </button>
            <button
              onClick={() => setSeoTab('seo')}
              className={`flex-1 py-3 text-xs font-semibold tracking-wider uppercase transition-all ${seoTab === 'seo' ? 'text-white border-b-2 border-amber-500' : 'text-white/30 hover:text-white/60'}`}
            >
              SEO
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {seoTab === 'settings' ? (
              <>
                {/* Excerpt */}
                <div>
                  <label className="text-white/40 text-[10px] uppercase tracking-widest mb-2 block font-bold">Extrait</label>
                  <textarea
                    rows={3}
                    value={form.excerpt}
                    onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 text-xs placeholder:text-white/20 outline-none focus:border-amber-500/50 transition-colors resize-none"
                    placeholder="Description courte de l'article..."
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-white/40 text-[10px] uppercase tracking-widest mb-2 block font-bold">Catégorie</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500/50 transition-colors"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} className="bg-[#0d0e13]">{c}</option>
                    ))}
                  </select>
                </div>

                {/* Tag */}
                <div>
                  <label className="text-white/40 text-[10px] uppercase tracking-widest mb-2 block font-bold">Tag</label>
                  <input
                    type="text"
                    value={form.tag}
                    onChange={(e) => setForm((prev) => ({ ...prev, tag: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/20 outline-none focus:border-amber-500/50 transition-colors"
                    placeholder="Guide, Tutoriel, Analyse..."
                  />
                </div>

                {/* Tag Color */}
                <div>
                  <label className="text-white/40 text-[10px] uppercase tracking-widest mb-2 block font-bold">Couleur du tag</label>
                  <div className="grid grid-cols-3 gap-2">
                    {TAG_COLORS.map((tc) => (
                      <button
                        key={tc.value}
                        onClick={() => setForm((prev) => ({ ...prev, tagColor: tc.value }))}
                        className={`px-2 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${tc.value} ${
                          form.tagColor === tc.value
                            ? 'ring-1 ring-amber-500 ring-offset-1 ring-offset-[#0d0e13] opacity-100'
                            : 'opacity-50 hover:opacity-80'
                        }`}
                      >
                        {tc.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="text-white/40 text-[10px] uppercase tracking-widest mb-2 block font-bold">Image (URL)</label>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/20 outline-none focus:border-amber-500/50 transition-colors"
                    placeholder="https://..."
                  />
                  {form.image && (
                    <div className="mt-2 w-full h-20 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                      <img
                        src={form.image}
                        alt="preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                  )}
                </div>

                {/* Author */}
                <div>
                  <label className="text-white/40 text-[10px] uppercase tracking-widest mb-2 block font-bold">Auteur</label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/20 outline-none focus:border-amber-500/50 transition-colors"
                    placeholder="Nom de l'auteur"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="text-white/40 text-[10px] uppercase tracking-widest mb-2 block font-bold">Statut</label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, status: e.target.value as EditorForm['status'] }))
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500/50 transition-colors"
                  >
                    <option value="draft" className="bg-[#0d0e13]">Brouillon</option>
                    <option value="published" className="bg-[#0d0e13]">Publié</option>
                    <option value="scheduled" className="bg-[#0d0e13]">Planifié</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                {/* SEO Score */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/50 text-xs font-medium">Score SEO</span>
                    <span className={`text-xl font-black ${seoTextColor}`}>{seoScore}<span className="text-xs text-white/30">/100</span></span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${seoBarColor} transition-all duration-700`}
                      style={{ width: `${seoScore}%` }}
                    />
                  </div>
                  <p className="text-white/30 text-[10px] mt-2">
                    {seoScore >= 80
                      ? '✓ Bon — article bien optimisé'
                      : seoScore >= 60
                      ? '⚠ Moyen — améliorez le contenu'
                      : '✗ Faible — optimisation nécessaire'}
                  </p>
                </div>

                {/* Focus Keyword */}
                <div>
                  <label className="text-white/40 text-[10px] uppercase tracking-widest mb-2 flex items-center gap-1.5 font-bold">
                    <Search className="w-3 h-3" /> Mot-clé principal
                  </label>
                  <input
                    type="text"
                    value={form.seo.focusKeyword}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, seo: { ...prev.seo, focusKeyword: e.target.value } }))
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/20 outline-none focus:border-amber-500/50 transition-colors"
                    placeholder="ex : IA générative marketing..."
                  />
                </div>

                {/* Meta Title */}
                <div>
                  <label className="text-white/40 text-[10px] uppercase tracking-widest mb-1 flex items-center justify-between font-bold">
                    Meta Title
                    <span className={`text-[10px] ${form.seo.metaTitle.length > 30 ? 'text-emerald-400' : 'text-white/20'}`}>
                      {form.seo.metaTitle.length}/60
                    </span>
                  </label>
                  <input
                    type="text"
                    value={form.seo.metaTitle}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, seo: { ...prev.seo, metaTitle: e.target.value } }))
                    }
                    maxLength={70}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/20 outline-none focus:border-amber-500/50 transition-colors"
                    placeholder="Titre pour Google (50-60 car.)"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <label className="text-white/40 text-[10px] uppercase tracking-widest mb-1 flex items-center justify-between font-bold">
                    Meta Description
                    <span className={`text-[10px] ${form.seo.metaDescription.length > 80 ? 'text-emerald-400' : 'text-white/20'}`}>
                      {form.seo.metaDescription.length}/160
                    </span>
                  </label>
                  <textarea
                    rows={3}
                    value={form.seo.metaDescription}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, seo: { ...prev.seo, metaDescription: e.target.value } }))
                    }
                    maxLength={170}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 text-xs placeholder:text-white/20 outline-none focus:border-amber-500/50 transition-colors resize-none"
                    placeholder="Description pour Google (120-160 car.)"
                  />
                </div>

                {/* SERP Preview */}
                {(form.seo.metaTitle || form.title) && (
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <p className="text-white/30 text-[10px] mb-2 uppercase tracking-wider font-bold">Aperçu Google</p>
                    <p className="text-blue-400 text-sm font-medium leading-tight line-clamp-1">
                      {form.seo.metaTitle || form.title}
                    </p>
                    <p className="text-green-500/70 text-[10px] mt-0.5">
                      oumarousanda.com/blog/{form.slug || 'url-article'}
                    </p>
                    <p className="text-white/40 text-[11px] mt-1 line-clamp-2 leading-snug">
                      {form.seo.metaDescription || form.excerpt}
                    </p>
                  </div>
                )}

                {/* SEO Checklist */}
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3 font-bold">Checklist</p>
                  <div className="space-y-2">
                    {[
                      { label: 'Titre > 10 caractères', ok: form.title.length > 10 },
                      {
                        label: 'Mot-clé dans le titre',
                        ok: !!form.seo.focusKeyword && form.title.toLowerCase().includes(form.seo.focusKeyword.toLowerCase()),
                      },
                      {
                        label: 'Mot-clé dans le contenu',
                        ok: !!form.seo.focusKeyword && form.bodyMarkdown.toLowerCase().includes(form.seo.focusKeyword.toLowerCase()),
                      },
                      { label: 'Extrait > 50 caractères', ok: form.excerpt.length > 50 },
                      { label: 'Contenu > 500 mots', ok: form.bodyMarkdown.split(/\s+/).length > 500 },
                      { label: 'Image définie', ok: !!form.image },
                      { label: 'Meta description (>80 car.)', ok: form.seo.metaDescription.length > 80 },
                      {
                        label: 'Titre H2 dans le contenu',
                        ok: form.bodyMarkdown.includes('## ') || form.bodyMarkdown.includes('# '),
                      },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <span className={`text-xs leading-none ${item.ok ? 'text-emerald-400' : 'text-white/15'}`}>
                          {item.ok ? '✓' : '○'}
                        </span>
                        <span className={`text-xs ${item.ok ? 'text-white/60' : 'text-white/25'}`}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {!form.seo.focusKeyword && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-amber-400/80 text-[10px] leading-relaxed">
                      Définissez un mot-clé principal pour obtenir des suggestions SEO précises.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
