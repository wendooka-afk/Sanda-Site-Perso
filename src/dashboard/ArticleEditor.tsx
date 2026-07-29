import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import LinkExt from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import {
  X, Eye, Save, Send, Search, AlertCircle,
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3, List, ListOrdered,
  Quote, Code, Link, Image as ImageIcon,
  AlignLeft, AlignCenter, AlignRight,
  Undo2, Redo2, Minus, Highlighter, LayoutTemplate,
} from 'lucide-react';
import {
  DashboardArticle,
  computeSeoScore,
  slugify,
  estimateReadTime,
  formatDisplayDate,
} from '../hooks/useDashboardArticles';

/* ── Helpers ── */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Convertit Markdown → HTML si besoin (pour rétrocompat + TipTap) */
function toEditorHtml(content: string): string {
  if (!content) return '';
  const trimmed = content.trim();
  return trimmed.startsWith('<') ? trimmed : String(marked.parse(trimmed));
}

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
  { label: 'Bleu',   value: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  { label: 'Doré',   value: 'bg-amber-500/10 text-amber-700 border-amber-500/20' },
  { label: 'Vert',   value: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
  { label: 'Rouge',  value: 'bg-red-500/10 text-red-600 border-red-500/20' },
  { label: 'Violet', value: 'bg-violet-500/10 text-violet-600 border-violet-500/20' },
  { label: 'Cyan',   value: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20' },
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
  bodyMarkdown: string; // stores HTML from TipTap
  seo: { focusKeyword: string; metaTitle: string; metaDescription: string };
}

interface ArticleEditorProps {
  article?: DashboardArticle;
  onCreate: (data: Omit<DashboardArticle, 'id' | 'createdAt' | 'views' | 'commentsCount'>) => void;
  onUpdate: (id: string, data: Partial<DashboardArticle>) => void;
  onClose: () => void;
}

/* ── Toolbar Button ── */
function TBtn({
  onClick, active, title, children, disabled = false,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded-md transition-all disabled:opacity-30 ${
        active
          ? 'bg-amber-500/20 text-amber-400'
          : 'text-white/40 hover:text-white hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  );
}

/* ── Divider ── */
function TDiv() {
  return <div className="w-px h-5 bg-white/10 mx-0.5" />;
}

/* ── Main Component ── */
export default function ArticleEditor({ article, onCreate, onUpdate, onClose }: ArticleEditorProps) {
  const isEditing = !!article;
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const [seoTab, setSeoTab] = useState<'settings' | 'seo'>('settings');
  const [slugAutoSync, setSlugAutoSync] = useState(!isEditing);

  const [form, setForm] = useState<EditorForm>({
    title:       article?.title ?? '',
    slug:        article?.slug ?? '',
    excerpt:     article?.excerpt ?? '',
    category:    article?.category ?? CATEGORIES[0],
    tag:         article?.tag ?? 'Article',
    tagColor:    article?.tagColor ?? TAG_COLORS[0].value,
    image:       article?.image ?? '',
    status:      article?.status ?? 'draft',
    author:      article?.author ?? 'Oumarou Sanda',
    bodyMarkdown: article?.bodyMarkdown ?? '',
    seo: {
      focusKeyword:    article?.seo?.focusKeyword ?? '',
      metaTitle:       article?.seo?.metaTitle ?? '',
      metaDescription: article?.seo?.metaDescription ?? '',
    },
  });

  /* ── TipTap Editor ── */
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Image.configure({ inline: false, allowBase64: false }),
      LinkExt.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
      Placeholder.configure({ placeholder: 'Rédigez votre article ici...\n\nCommencez par un titre H2, puis développez votre contenu.' }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: false }),
    ],
    content: toEditorHtml(form.bodyMarkdown),
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setForm((prev) => ({ ...prev, bodyMarkdown: html }));
    },
    editorProps: {
      attributes: {
        class: 'prose-editor outline-none min-h-[400px] px-6 sm:px-10 py-6',
      },
    },
  });

  /* ── Sync initial content when article changes (Markdown ou HTML) ── */
  useEffect(() => {
    if (editor && article?.bodyMarkdown) {
      editor.commands.setContent(toEditorHtml(article.bodyMarkdown));
    }
  }, [article?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Auto-sync slug ── */
  useEffect(() => {
    if (slugAutoSync && form.title) {
      setForm((prev) => ({ ...prev, slug: slugify(prev.title) }));
    }
  }, [form.title, slugAutoSync]);

  /* ── Live SEO Score (HTML-aware) ── */
  const seoScore = useMemo(() => computeSeoScore({ ...form, seo: form.seo }), [form]);

  /* ── Read time (strip HTML) ── */
  const readTime = useMemo(() => estimateReadTime(stripHtml(form.bodyMarkdown)), [form.bodyMarkdown]);

  /* ── Plain text for SEO checks ── */
  const plainText = useMemo(() => stripHtml(form.bodyMarkdown).toLowerCase(), [form.bodyMarkdown]);
  const hasHeading = useMemo(
    () => /<h[1-3][\s>]/i.test(form.bodyMarkdown),
    [form.bodyMarkdown]
  );

  /* ── Toolbar actions ── */
  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('URL du lien :', prev ?? 'https://');
    if (!url) return editor.chain().focus().extendMarkRange('link').unsetLink().run();
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const insertImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('URL de l\'image :');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  /* ── Build payload ── */
  function buildData(status: 'draft' | 'published' | 'scheduled'): Omit<DashboardArticle, 'id' | 'createdAt' | 'views' | 'commentsCount'> {
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

  const seoBarColor   = seoScore >= 80 ? 'bg-emerald-500' : seoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500';
  const seoTextColor  = seoScore >= 80 ? 'text-emerald-400' : seoScore >= 60 ? 'text-yellow-400' : 'text-red-400';

  return (
    <>
      {/* ── Global TipTap styles ── */}
      <style>{`
        .prose-editor p { color: rgba(255,255,255,.75); line-height: 1.75; margin-bottom: 1rem; }
        .prose-editor h1 { color: #fff; font-size: 1.75rem; font-weight: 800; margin: 1.5rem 0 .75rem; }
        .prose-editor h2 { color: rgba(255,255,255,.9); font-size: 1.35rem; font-weight: 700; margin: 1.25rem 0 .6rem; }
        .prose-editor h3 { color: rgba(255,255,255,.8); font-size: 1.1rem; font-weight: 600; margin: 1rem 0 .5rem; }
        .prose-editor strong { color: #fff; font-weight: 700; }
        .prose-editor em { color: rgba(255,255,255,.7); }
        .prose-editor u  { text-decoration: underline; text-underline-offset: 3px; }
        .prose-editor s  { color: rgba(255,255,255,.4); }
        .prose-editor mark { background: rgba(245,158,11,.25); color: #fbbf24; padding: 0 3px; border-radius: 3px; }
        .prose-editor a  { color: #f59e0b; text-decoration: underline; text-underline-offset: 2px; }
        .prose-editor ul { color: rgba(255,255,255,.7); list-style: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        .prose-editor ol { color: rgba(255,255,255,.7); list-style: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
        .prose-editor li { margin-bottom: .3rem; }
        .prose-editor blockquote { border-left: 3px solid rgba(245,158,11,.4); padding-left: 1rem; color: rgba(255,255,255,.55); font-style: italic; margin: 1rem 0; }
        .prose-editor code { background: rgba(255,255,255,.08); color: #fbbf24; padding: 2px 6px; border-radius: 4px; font-size: .85em; font-family: monospace; }
        .prose-editor pre  { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 1rem; overflow-x: auto; margin: 1rem 0; }
        .prose-editor pre code { background: transparent; color: rgba(255,255,255,.8); padding: 0; font-size: .9em; }
        .prose-editor hr  { border: none; border-top: 1px solid rgba(255,255,255,.1); margin: 1.5rem 0; }
        .prose-editor img { max-width: 100%; border-radius: 12px; margin: 1rem 0; border: 1px solid rgba(255,255,255,.08); }
        .prose-editor p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: rgba(255,255,255,.2); pointer-events: none; float: left; height: 0; }
        .prose-editor .ProseMirror-focused { outline: none; }
        .tiptap-toolbar { display: flex; flex-wrap: wrap; gap: 2px; align-items: center; }
      `}</style>

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
                <div className={`h-full rounded-full ${seoBarColor} transition-all duration-500`} style={{ width: `${seoScore}%` }} />
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
                <LayoutTemplate className="w-3.5 h-3.5" />
                Éditeur visuel
              </button>
              <button
                onClick={() => setTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${tab === 'preview' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
              >
                <Eye className="w-3.5 h-3.5" />
                Aperçu lecture
              </button>
            </div>

            {/* ── TOOLBAR (visible only in write tab) ── */}
            {tab === 'write' && editor && (
              <div className="px-4 sm:px-6 py-2 border-b border-white/5 bg-[#0d0e13] overflow-x-auto">
                <div className="tiptap-toolbar min-w-max">
                  {/* Undo / Redo */}
                  <TBtn onClick={() => editor.chain().focus().undo().run()} title="Annuler" disabled={!editor.can().undo()}>
                    <Undo2 className="w-3.5 h-3.5" />
                  </TBtn>
                  <TBtn onClick={() => editor.chain().focus().redo().run()} title="Rétablir" disabled={!editor.can().redo()}>
                    <Redo2 className="w-3.5 h-3.5" />
                  </TBtn>
                  <TDiv />

                  {/* Headings */}
                  <TBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Titre H1">
                    <Heading1 className="w-3.5 h-3.5" />
                  </TBtn>
                  <TBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Titre H2">
                    <Heading2 className="w-3.5 h-3.5" />
                  </TBtn>
                  <TBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Titre H3">
                    <Heading3 className="w-3.5 h-3.5" />
                  </TBtn>
                  <TDiv />

                  {/* Inline formatting */}
                  <TBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Gras (Ctrl+B)">
                    <Bold className="w-3.5 h-3.5" />
                  </TBtn>
                  <TBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italique (Ctrl+I)">
                    <Italic className="w-3.5 h-3.5" />
                  </TBtn>
                  <TBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Souligné (Ctrl+U)">
                    <UnderlineIcon className="w-3.5 h-3.5" />
                  </TBtn>
                  <TBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Barré">
                    <Strikethrough className="w-3.5 h-3.5" />
                  </TBtn>
                  <TBtn onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')} title="Surligner">
                    <Highlighter className="w-3.5 h-3.5" />
                  </TBtn>
                  <TDiv />

                  {/* Lists */}
                  <TBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Liste à puces">
                    <List className="w-3.5 h-3.5" />
                  </TBtn>
                  <TBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Liste numérotée">
                    <ListOrdered className="w-3.5 h-3.5" />
                  </TBtn>
                  <TDiv />

                  {/* Blocks */}
                  <TBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Citation">
                    <Quote className="w-3.5 h-3.5" />
                  </TBtn>
                  <TBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Code inline">
                    <Code className="w-3.5 h-3.5" />
                  </TBtn>
                  <TBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Bloc de code">
                    <span className="text-[10px] font-mono font-bold px-0.5">{'</>'}</span>
                  </TBtn>
                  <TBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Séparateur horizontal">
                    <Minus className="w-3.5 h-3.5" />
                  </TBtn>
                  <TDiv />

                  {/* Align */}
                  <TBtn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Aligner à gauche">
                    <AlignLeft className="w-3.5 h-3.5" />
                  </TBtn>
                  <TBtn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Centrer">
                    <AlignCenter className="w-3.5 h-3.5" />
                  </TBtn>
                  <TBtn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Aligner à droite">
                    <AlignRight className="w-3.5 h-3.5" />
                  </TBtn>
                  <TDiv />

                  {/* Link & Image */}
                  <TBtn onClick={setLink} active={editor.isActive('link')} title="Insérer un lien">
                    <Link className="w-3.5 h-3.5" />
                  </TBtn>
                  <TBtn onClick={insertImage} title="Insérer une image par URL">
                    <ImageIcon className="w-3.5 h-3.5" />
                  </TBtn>
                </div>
              </div>
            )}

            {/* Editor / Preview Area */}
            <div className="flex-1 overflow-y-auto">
              {tab === 'write' ? (
                <EditorContent editor={editor} className="h-full" />
              ) : (
                <div
                  className="px-6 sm:px-10 py-6 prose-editor"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(form.bodyMarkdown || '<p style="color:rgba(255,255,255,.2);font-style:italic">Aucun contenu à prévisualiser.</p>'),
                  }}
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
                    <label className="text-white/40 text-[10px] uppercase tracking-widest mb-2 block font-bold">Image de couverture (URL)</label>
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
                      onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as EditorForm['status'] }))}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500/50 transition-colors"
                    >
                      <option value="draft"     className="bg-[#0d0e13]">Brouillon</option>
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
                      <div className={`h-full rounded-full ${seoBarColor} transition-all duration-700`} style={{ width: `${seoScore}%` }} />
                    </div>
                    <p className="text-white/30 text-[10px] mt-2">
                      {seoScore >= 80 ? '✓ Bon - article bien optimisé' : seoScore >= 60 ? '⚠ Moyen - améliorez le contenu' : '✗ Faible - optimisation nécessaire'}
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
                      onChange={(e) => setForm((prev) => ({ ...prev, seo: { ...prev.seo, focusKeyword: e.target.value } }))}
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
                      onChange={(e) => setForm((prev) => ({ ...prev, seo: { ...prev.seo, metaTitle: e.target.value } }))}
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
                      onChange={(e) => setForm((prev) => ({ ...prev, seo: { ...prev.seo, metaDescription: e.target.value } }))}
                      maxLength={170}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 text-xs placeholder:text-white/20 outline-none focus:border-amber-500/50 transition-colors resize-none"
                      placeholder="Description pour Google (120-160 car.)"
                    />
                  </div>

                  {/* SERP Preview */}
                  {(form.seo.metaTitle || form.title) && (
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <p className="text-white/30 text-[10px] mb-2 uppercase tracking-wider font-bold">Aperçu Google</p>
                      <p className="text-blue-400 text-sm font-medium leading-tight line-clamp-1">{form.seo.metaTitle || form.title}</p>
                      <p className="text-green-500/70 text-[10px] mt-0.5">oumarousanda.com/blog/{form.slug || 'url-article'}</p>
                      <p className="text-white/40 text-[11px] mt-1 line-clamp-2 leading-snug">{form.seo.metaDescription || form.excerpt}</p>
                    </div>
                  )}

                  {/* SEO Checklist (HTML-aware) */}
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3 font-bold">Checklist</p>
                    <div className="space-y-2">
                      {[
                        { label: 'Titre > 10 caractères', ok: form.title.length > 10 },
                        { label: 'Mot-clé dans le titre', ok: !!form.seo.focusKeyword && form.title.toLowerCase().includes(form.seo.focusKeyword.toLowerCase()) },
                        { label: 'Mot-clé dans le contenu', ok: !!form.seo.focusKeyword && plainText.includes(form.seo.focusKeyword.toLowerCase()) },
                        { label: 'Extrait > 50 caractères', ok: form.excerpt.length > 50 },
                        { label: 'Contenu > 500 mots', ok: plainText.split(/\s+/).filter(Boolean).length > 500 },
                        { label: 'Image définie', ok: !!form.image },
                        { label: 'Meta description (>80 car.)', ok: form.seo.metaDescription.length > 80 },
                        { label: 'Titre H2 dans le contenu', ok: hasHeading },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-2">
                          <span className={`text-xs leading-none ${item.ok ? 'text-emerald-400' : 'text-white/15'}`}>{item.ok ? '✓' : '○'}</span>
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
    </>
  );
}
