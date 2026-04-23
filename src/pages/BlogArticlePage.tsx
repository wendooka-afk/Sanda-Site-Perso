import DOMPurify from 'dompurify';
import { useParams, Link, Navigate } from 'react-router-dom';
import { AdUnit } from '../components/AdUnit';

/** Convertit une date humaine française en ISO 8601 pour les schemas SEO.
 *  "22 Fév 2026" → "2026-02-22" | "Mis à jour : Février 2026" → "2026-02-01" */
function parseFrenchDate(dateStr?: string): string | undefined {
  if (!dateStr) return undefined;
  const M: Record<string, string> = {
    jan:'01', fév:'02', fev:'02', mar:'03', avr:'04', mai:'05', juin:'06',
    juil:'07', aoû:'08', aou:'08', sep:'09', oct:'10', nov:'11', déc:'12', dec:'12',
    janvier:'01', février:'02', fevrier:'02', mars:'03', avril:'04',
    juillet:'07', août:'08', aout:'08', septembre:'09',
    octobre:'10', novembre:'11', décembre:'12', decembre:'12',
  };
  const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // "22 Fév 2026"
  const full = dateStr.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/);
  if (full) {
    const mm = M[normalize(full[2])];
    if (mm) return `${full[3]}-${mm}-${full[1].padStart(2,'0')}`;
  }
  // "Fév 2026" / "Mis à jour : Février 2026"
  const partial = dateStr.match(/(\w+)\s+(\d{4})/);
  if (partial) {
    const mm = M[normalize(partial[1])];
    if (mm) return `${partial[2]}-${mm}-01`;
  }
  return undefined;
}
import { motion } from 'framer-motion';
import { articles } from '../data/articles';
import { articlesEn } from '../data/articles-en';
import { getDashboardArticleBySlug } from '../hooks/useDashboardArticles';
import type { DashboardArticle } from '../hooks/useDashboardArticles';
import { marked } from 'marked';
import { applyAutoLinks } from '../utils/autoLink';
import { Calendar, Clock, ArrowLeft, ArrowRight, Home, ChevronRight, Share2, ExternalLink, CheckCircle2, XCircle, AlertTriangle, List, Play, Puzzle, Palette, DollarSign, MessageCircle, Send, User, Heart, Reply, Linkedin, Facebook, Globe, Youtube, BookOpen } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { SEOHead } from '../components/SEOHead';
import { useLanguage } from '../i18n';
import { blogTexts } from '../i18n/pages/blog';

/* ═══ Rich Section Renderers ═══ */

function RenderIntro({ content }: { content: string }) {
  return (
    <div className="text-[#404040] text-[16px] leading-relaxed mb-8 border-l-2 border-gold/40 pl-6" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
  );
}

function RenderHeading({ content, id }: { content: string; id?: string }) {
  return (
    <h2 id={id} className="font-heading font-bold !text-xl sm:!text-2xl text-[#0a0a0a] mt-12 mb-5 tracking-tight scroll-mt-28 flex items-center gap-3">
      <span className="w-1.5 h-8 bg-gradient-to-b from-gold to-gold-light rounded-full" />
      {content}
    </h2>
  );
}

function RenderText({ content }: { content: string }) {
  return (
    <div
      className="prose-custom text-[#525252] text-[15px] leading-[1.85] mb-5 [&_p]:mb-4 [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-gold-light [&_strong]:text-[#0a0a0a] [&_strong]:font-semibold"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  );
}

function RenderList({ items }: { items: (string | { title: string; desc: string })[] }) {
  return (
    <div className="space-y-3 mb-6">
      {items.map((item, i) => (
        typeof item === 'string'
          ? <div key={i} className="flex items-start gap-3 py-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-gold/60 shrink-0 mt-[7px]" />
              <p className="text-[#525252] text-[14px] leading-relaxed" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item) }} />
            </div>
          : <div key={i} className="bg-white border border-black/5 rounded-xl p-5 border-l-2 border-blue/20 shadow-sm">
              <h4 className="font-heading font-semibold text-[#0a0a0a] text-[14px] mb-1.5">{item.title}</h4>
              <p className="text-[#737373] text-[13px] leading-relaxed">{item.desc}</p>
            </div>
      ))}
    </div>
  );
}

function RenderCTA({ label, url, variant }: { label: string; url: string; variant: string }) {
  if (!url || url === '#') return null;
  return (
    <div className="my-8 flex justify-center">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={
          'inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-heading font-bold text-[14px] transition-all duration-500 ' +
          (variant === 'primary'
            ? 'bg-gradient-to-r from-gold to-gold-light text-dark-950 hover:shadow-[0_8px_30px_rgba(201,168,76,0.25)]'
            : 'bg-blue/10 border border-blue/20 text-blue hover:bg-blue/20')
        }
      >
        {label}
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}

function RenderCompetitors({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 my-6">
      {items.map((item) => (
        <div key={item} className="bg-white border border-black/5 rounded-lg px-3 py-2.5 text-center shadow-sm">
          <span className="text-[#a3a3a3] text-[12px] font-medium">{item}</span>
        </div>
      ))}
    </div>
  );
}

function RenderPros({ items }: { items: (string | { title: string; desc?: string })[] }) {
  return (
    <div className="space-y-2.5 my-6">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-emerald/5 border border-emerald/10 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
          <div>
            {typeof item === 'string'
              ? <p className="text-[#404040] text-[13px] leading-relaxed" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item) }} />
              : <>
                  <h4 className="font-heading font-semibold text-[#0a0a0a] text-[13px] mb-0.5">{item.title}</h4>
                  {item.desc && <p className="text-[#737373] text-[12px] leading-relaxed">{item.desc}</p>}
                </>
            }
          </div>
        </div>
      ))}
    </div>
  );
}

function RenderCons({ items }: { items: { title: string; desc: string }[] }) {
  return (
    <div className="space-y-2.5 my-6">
      {items.map((item) => (
        <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-coral/5 border border-coral/10 shadow-sm">
          <XCircle className="w-4 h-4 text-coral shrink-0 mt-0.5" />
          <div>
            <h4 className="font-heading font-semibold text-[#0a0a0a] text-[13px] mb-0.5">{item.title}</h4>
            {item.desc && <p className="text-[#737373] text-[12px] leading-relaxed">{item.desc}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

function RenderDisclaimer({ content }: { content: string }) {
  return (
    <div className="mt-8 p-5 rounded-xl bg-gold/5 border border-gold/15 flex items-start gap-3 shadow-sm">
      <AlertTriangle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
      <p className="text-[#737373] text-[12px] leading-relaxed italic" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
    </div>
  );
}

function RenderKeyPoints({ items }: { items: string[] }) {
  const { language } = useLanguage();
  const tx = blogTexts[language].article;
  return (
    <div className="my-10 p-6 sm:p-8 rounded-2xl bg-white border border-gold/20 relative overflow-hidden group shadow-lg shadow-gold/5">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <h3 className="font-heading font-bold text-gold text-sm tracking-widest mb-6 flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4" />
        {tx.keyPoints}
      </h3>
      <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald shrink-0 mt-1" />
            <p className="text-[#404040] text-[13px] leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RenderStats({ items }: { items: { num?: string; value?: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-10">
      {items.map((item, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 text-center border border-black/5 shadow-sm hover:shadow-md transition-shadow">
          <div className="font-heading font-bold text-2xl text-gold mb-1">{item.num ?? item.value}</div>
          <div className="text-[#a3a3a3] text-[10px] uppercase tracking-wider leading-tight font-medium">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

function RenderPlugin({ name, number, desc, plan, deal }: { name: string; number: number; desc: string; plan: string; deal: string }) {
  const planColors: Record<string, string> = {
    'Freemium': 'text-blue bg-blue/5 border-blue/10',
    'Premium': 'text-gold bg-gold/5 border-gold/10',
    'Gratuit': 'text-emerald bg-emerald/5 border-emerald/10',
  };
  const planStyle = planColors[plan] || 'text-[#737373] bg-black/5 border-black/5';

  return (
    <div className="bg-white rounded-2xl p-6 mb-5 border border-black/5 hover:border-gold/10 transition-all duration-500 group shadow-sm hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/10 to-transparent border border-gold/10 flex items-center justify-center shrink-0">
          <span className="text-gold font-heading font-bold text-lg">{number}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="font-heading font-bold text-[#0a0a0a] text-[16px] group-hover:text-gold transition-colors">{name}</h3>
            <span className={'px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ' + planStyle}>{plan}</span>
          </div>
          <p className="text-[#737373] text-[13px] leading-relaxed mb-3">{desc}</p>
          <div className="flex items-center gap-2">
            <Puzzle className="w-3.5 h-3.5 text-gold/40" />
            <span className="text-gold/60 text-[12px] font-medium">{deal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RenderThemes({ items }: { items: { title: string; desc: string; badge: string }[] }) {
  const badgeColors: Record<string, string> = {
    'Populaire': 'text-blue bg-blue/5',
    'Premium': 'text-gold bg-gold/5',
    '#1 Vendu': 'text-coral bg-coral/5',
    'News': 'text-violet bg-violet/5',
    'E-Commerce': 'text-emerald bg-emerald/5',
    'Éducation': 'text-orange-400 bg-orange-400/5',
  };

  return (
    <div className="grid sm:grid-cols-2 gap-4 my-6">
      {items.map((item) => (
        <div key={item.title} className="bg-white rounded-xl p-5 border border-black/5 hover:border-gold/10 transition-all duration-300 group shadow-sm hover:shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4 text-gold/40" />
            <h4 className="font-heading font-bold text-[#0a0a0a] text-[14px] group-hover:text-gold transition-colors">{item.title}</h4>
            <span className={'px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ' + (badgeColors[item.badge] || 'text-[#a3a3a3] bg-black/5')}>
              {item.badge}
            </span>
          </div>
          <p className="text-[#737373] text-[12px] leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

function RenderVideo({ url, title }: { url: string; title: string }) {
  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-white/[0.06] bg-dark-900/50">
      <div className="aspect-video relative">
        <iframe
          src={url}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="px-5 py-3 flex items-center gap-2 border-t border-white/[0.04]">
        <Play className="w-3.5 h-3.5 text-coral" />
        <span className="text-white/30 text-[12px] font-medium">{title}</span>
      </div>
    </div>
  );
}

function RenderMonetization({ items }: { items: { title: string; desc: string; icon: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3 my-6">
      {items.map((item, i) => (
        <div key={item.title} className="bg-white rounded-xl p-5 border border-black/5 hover:border-emerald/10 transition-all duration-300 group shadow-sm hover:shadow-md">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald/10 to-transparent border border-emerald/10 flex items-center justify-center shrink-0">
              <span className="text-lg">{item.icon}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <DollarSign className="w-3 h-3 text-emerald/40" />
                <h4 className="font-heading font-semibold text-[#0a0a0a] text-[13px] group-hover:text-emerald transition-colors">
                  {i + 1}. {item.title}
                </h4>
              </div>
              <p className="text-[#737373] text-[12px] leading-relaxed">{item.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RenderTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-black/5 bg-[#fafafa]">
      <table className="w-full text-[13px] border-collapse">
        <thead className="bg-black/5">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-5 py-3.5 text-left font-heading font-bold text-[#0a0a0a]/60 border-b border-black/5">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-black/[0.02] transition-colors">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-5 py-3.5 text-[#525252] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(cell) }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══ FAQ Renderer ═══ */
function RenderFAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-4 my-10">
      {items.map((item, i) => (
        <div key={i} className="bg-white rounded-2xl border border-black/5 overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div className="px-6 py-4 bg-black/[0.02] border-b border-black/5 flex gap-3">
            <span className="text-gold font-heading font-bold">Q —</span>
            <h4 className="font-heading font-bold text-[#0a0a0a] text-[14px] leading-snug">{item.q}</h4>
          </div>
          <div className="px-6 py-4 text-[#737373] text-[13px] leading-relaxed" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.a) }} />
        </div>
      ))}
    </div>
  );
}

/* ═══ Internal Links Renderer ═══ */
function RenderInternalLinks({ items }: { items: { label: string; url?: string; slug?: string }[] }) {
  const { language } = useLanguage();
  const tx = blogTexts[language].article;
  return (
    <div className="my-10 p-6 sm:p-8 rounded-2xl bg-[#fafafa] border border-black/5 shadow-inner">
      <h4 className="font-heading font-bold text-[#0a0a0a] text-[14px] mb-5 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-gold" />
        {tx.alsoRead}
      </h4>
      <ul className="space-y-3">
        {items
          .map((item) => ({ ...item, href: item.url ?? (item.slug ? '/blog/' + item.slug : null) }))
          .filter((item) => item.href && item.href !== '#')
          .map((item, i) => (
            <li key={i} className="flex items-start gap-3 group">
              <ArrowRight className="w-3.5 h-3.5 text-gold/40 mt-1 transition-transform group-hover:translate-x-0.5" />
              <a href={item.href!} className="text-gold/70 text-[13px] hover:text-gold transition-colors underline decoration-gold/20 underline-offset-4 font-medium">
                {item.label}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

/* ═══ Table of Contents ═══ */
function TableOfContents({ items, className = '' }: { items: { id: string; label: string }[]; className?: string }) {
  const { language } = useLanguage();
  const tx = blogTexts[language].article;
  return (
    <div className={`bg-white rounded-2xl p-6 mb-10 border border-black/5 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <List className="w-4 h-4 text-gold" />
        <h3 className="font-heading font-bold text-[#0a0a0a] text-[14px]">{tx.toc}</h3>
      </div>
      <nav className="space-y-1.5">
        {items.map((item, i) => (
          <a
            key={item.id}
            href={'#' + item.id}
            className="flex items-center gap-3 py-1.5 text-[13px] text-[#737373] hover:text-gold transition-colors group"
          >
            <span className="text-gold/40 font-mono text-[11px] w-5 text-right">{String(i + 1).padStart(2, '0')}</span>
            <span className="group-hover:translate-x-0.5 transition-transform">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

/* ═══ SEO Keywords Badge ═══ */
function SEOKeywords({ keywords }: { keywords: string[] }) {
  return (
    <div className="mt-8 pt-6 border-t border-black/5">
      <p className="text-[#a3a3a3] text-[11px] uppercase tracking-wider mb-3 font-semibold">Sujets connexes</p>
      <div className="flex flex-wrap gap-1.5">
        {keywords.map((kw) => (
          <span key={kw} className="px-2.5 py-1 bg-black/5 border border-black/5 rounded-full text-[#737373] text-[10px] font-medium">
            {kw}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══ Rich Article Renderer ═══ */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RichArticleContent({ article }: { article: any }) {
  return (
    <div>
      {article.tableOfContents && <TableOfContents items={article.tableOfContents} className="xl:hidden" />}

      {article.sections.map((section: Record<string, unknown>, i: number) => {
        switch (section.type) {
          case 'intro':
            return <RenderIntro key={i} content={section.content as string || ''} />;
          case 'heading':
            return <RenderHeading key={i} content={section.content as string || ''} id={section.id as string} />;
          case 'text':
            return <RenderText key={i} content={section.content as string || ''} />;
          case 'list':
            return <RenderList key={i} items={section.items as (string | { title: string; desc: string })[]} />;
          case 'cta':
            return <RenderCTA key={i} label={section.label as string || ''} url={section.url as string || ''} variant={section.variant as string || 'primary'} />;
          case 'competitors':
            return <RenderCompetitors key={i} items={section.items as string[]} />;
          case 'pros':
            return <RenderPros key={i} items={section.items as (string | { title: string; desc?: string })[]} />;
          case 'cons':
            return <RenderCons key={i} items={section.items as { title: string; desc: string }[]} />;
          case 'disclaimer':
            return <RenderDisclaimer key={i} content={section.content as string || ''} />;
          case 'plugin':
            return <RenderPlugin key={i} name={section.name as string} number={section.number as number} desc={section.desc as string} plan={section.plan as string} deal={section.deal as string} />;
          case 'themes':
            return <RenderThemes key={i} items={section.items as { title: string; desc: string; badge: string }[]} />;
          case 'video':
            return <RenderVideo key={i} url={section.url as string} title={section.title as string} />;
          case 'monetization':
            return <RenderMonetization key={i} items={section.items as { title: string; desc: string; icon: string }[]} />;
          case 'table':
            return <RenderTable key={i} headers={section.headers as string[]} rows={section.rows as string[][]} />;
          case 'key-points':
            return <RenderKeyPoints key={i} items={section.items as string[]} />;
          case 'stats-grid':
            return <RenderStats key={i} items={section.items as { num?: string; value?: string; label: string }[]} />;
          case 'faq-rich':
            return <RenderFAQ key={i} items={section.items as { q: string; a: string }[]} />;
          case 'internal-links':
            return <RenderInternalLinks key={i} items={section.items as { label: string; url?: string; slug?: string }[]} />;
          default:
            return null;
        }
      })}

      {article.seo?.secondaryKeywords && <SEOKeywords keywords={article.seo.secondaryKeywords} />}
    </div>
  );
}

/* ═══ Plain Article Renderer (markdown-like) ═══ */
function PlainArticleContent({ content }: { content: string }) {
  return (
    <div className="max-w-none">
      {content.split('\n\n').map((block, i) => {
        const trimmed = block.trim();
        if (trimmed.startsWith('## ')) return <h2 key={i} className="font-heading font-bold !text-xl text-[#0a0a0a] mt-10 mb-4 tracking-tight">{trimmed.replace('## ', '')}</h2>;
        if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
          return <p key={i} className="text-[#404040] font-semibold leading-relaxed mb-4 text-[15px]">{trimmed.replace(/\*\*/g, '')}</p>;
        }
        if (trimmed.startsWith('- ')) {
          const listItems = trimmed.split('\n').filter(l => l.trim().startsWith('- '));
          return (
            <ul key={i} className="space-y-2 mb-6 ml-4">
              {listItems.map((li, j) => (
                <li key={j} className="text-[#737373] text-[15px] leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/40 mt-2 shrink-0" />
                  {li.replace(/^- /, '')}
                </li>
              ))}
            </ul>
          );
        }
        return <p key={i} className="text-[#737373] leading-relaxed mb-4 text-[15px]">{trimmed}</p>;
      })}
    </div>
  );
}

/* ═══ Author Bio (Section 09 copy) ═══ */
function AuthorBio() {
  const { language, localePath } = useLanguage();
  const tx = blogTexts[language].article;
  const socials = [
    { icon: Youtube, label: 'YouTube', url: 'https://www.youtube.com/@Oumarou_Sanda', color: 'hover:text-red-500 hover:border-red-500/20 hover:bg-red-500/5' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/benibsanda', color: 'hover:text-blue hover:border-blue/20 hover:bg-blue/5' },
    { icon: Facebook, label: 'Facebook', url: 'https://facebook.com/iamoumarousanda', color: 'hover:text-blue hover:border-blue/20 hover:bg-blue/5' },
    { icon: Globe, label: 'Site Web', url: '/', color: 'hover:text-gold hover:border-gold/20 hover:bg-gold/5' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl p-7 sm:p-8 mt-8 border border-black/5 shadow-luxury"
    >
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-1 h-5 bg-gradient-to-b from-gold to-gold-light rounded-full" />
        <h3 className="font-heading font-bold text-[#0a0a0a] text-[15px] tracking-tight">{tx.aboutAuthor}</h3>
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="shrink-0">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gold/20 via-gold/10 to-transparent border border-gold/15 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-gold font-heading font-bold text-2xl relative z-10">OS</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h4 className="font-heading font-bold text-[#0a0a0a] text-lg">Oumarou Sanda</h4>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gold/10 text-gold border border-gold/20">
              {tx.expertTitle}
            </span>
          </div>

          <p className="text-[#737373] text-[13px] leading-relaxed mb-4">
            {tx.authorBio} <span className="text-gold/70 font-semibold">Wendooka</span> {language === 'en' ? 'and' : 'et'} <span className="text-blue/80 font-semibold">Sanda Vibe Code</span>{tx.authorBioEnd}
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className={'w-8 h-8 rounded-lg bg-black/5 border border-black/10 flex items-center justify-center text-[#737373] transition-all duration-300 ' + s.color}
                >
                  <s.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
            <Link
              to={localePath('/blog')}
              className="text-gold/60 text-[12px] font-medium hover:text-gold transition-colors flex items-center gap-1.5 group"
            >
              {tx.viewAllArticles}
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══ Related Articles (Section 09 — Articles Liés) ═══ */
function RelatedArticles({ currentSlug, category }: { currentSlug: string; category: string }) {
  const isEn = articlesEn.some(a => a.slug === currentSlug);
  const source = isEn ? (articlesEn as typeof articles) : articles;
  const related = source
    .filter(a => a.slug !== currentSlug && a.category === category)
    .slice(0, 3);

  if (related.length === 0) {
    const fallback = source.filter(a => a.slug !== currentSlug).slice(0, 3);
    if (fallback.length === 0) return null;
    return <RelatedGrid items={fallback} />;
  }

  return <RelatedGrid items={related} />;
}

function RelatedGrid({ items }: { items: typeof articles }) {
  const { language, localePath } = useLanguage();
  const tx = blogTexts[language].article;
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-12"
    >
      <h3 className="font-heading font-bold text-[#0a0a0a] text-lg mb-6 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-gold" />
        {tx.relatedArticles}
      </h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {items.map((a) => (
          <Link key={a.slug} to={localePath('/blog/' + a.slug)} className="bg-white border border-black/5 rounded-xl overflow-hidden group shadow-sm hover:shadow-md transition-all">
            {'image' in a && a.image && (
              <div className="w-full aspect-[16/9] overflow-hidden">
                <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
            )}
            <div className="p-4">
              <span className={'px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider mb-2 inline-block ' + (a.tagColor || '')}>{a.category}</span>
              <h4 className="font-heading font-semibold text-[#0a0a0a] text-[13px] group-hover:text-gold transition-colors line-clamp-2">{a.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══ CTA contextuel (milieu/fin de l'article) ═══ */
function ArticleCTABlock({ category }: { category: string }) {
  const { language, localePath } = useLanguage();
  const tx = blogTexts[language].article;
  let ctaText: string = tx.ctaTitle;
  let ctaDesc: string = tx.ctaDesc;
  let ctaLink: string = language === 'en' ? '/services' : '/formations';
  let ctaLabel: string = tx.ctaLabel;

  if (language === 'fr') {
    if (category === 'IA & Outils' || category === 'Vidéo IA') {
      ctaDesc = 'Maîtrise 28 outils IA en 15 min/jour — le Challenge 30 Jours IA, c\'est fait pour toi.';
      ctaLabel = 'Voir le Challenge 30 Jours IA';
      ctaLink = '/challenge-30-jours';
    } else if (category === 'Vibe Coding') {
      ctaDesc = 'Apprends à créer des applications et SaaS sans coder grâce à Sanda Vibe Code.';
      ctaLabel = 'Découvrir Sanda Vibe Code';
      ctaLink = '/services';
    } else if (category === 'Entrepreneuriat Afrique') {
      ctaDesc = 'Crée ta société au UK, ouvre Stripe, et vends partout dans le monde avec Offshore Empire.';
      ctaLabel = 'Voir Offshore Empire';
    } else if (category === 'Analyses & Opinions') {
      ctaDesc = 'Lis le livre manifeste « Si l\'Afrique rate l\'IA, elle rate le Futur », disponible maintenant.';
      ctaLabel = 'Découvrir le livre';
    }
  } else {
    if (category === 'AI & Tools' || category === 'Automation') {
      ctaDesc = 'Explore Oumarou Sanda\'s services and see how AI can transform your business.';
      ctaLabel = 'View services';
      ctaLink = '/services';
    } else if (category === 'Digital Business') {
      ctaDesc = 'Learn how to build a digital business with AI — from strategy to execution.';
      ctaLabel = 'View services';
      ctaLink = '/services';
    }
  }

  return (
    <div className="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue/[0.06] to-blue/[0.02] border border-blue/15 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue/5 rounded-full blur-3xl" />
      <div className="relative z-10">
        <h4 className="font-heading font-bold text-[#0a0a0a] text-lg mb-2">🚀 {ctaText}</h4>
        <p className="text-[#525252] text-[14px] mb-5 leading-relaxed">{ctaDesc}</p>
        <Link to={localePath(ctaLink)} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-dark-950 font-heading font-bold text-[13px] rounded-xl hover:shadow-lg hover:shadow-gold/15 transition-all">
          {ctaLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

/* ═══ Newsletter CTA — Premium ═══ */
function NewsletterCTA() {
  const { language } = useLanguage();
  const tx = blogTexts[language].article;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl bg-[#0c0c0c] shadow-2xl"
    >
      {/* Ambient glow */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-amber-400/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/25 to-transparent" />

      <div className="relative z-10 px-8 sm:px-14 py-12 sm:py-14 flex flex-col sm:flex-row items-start sm:items-center gap-10">
        {/* Left */}
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[10px] font-black uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {tx.newsletterBadge}
          </div>
          <h3 className="font-heading font-black text-white text-2xl sm:text-3xl leading-tight mb-3">
            {tx.newsletterTitle}
          </h3>
          <p className="text-white/45 text-[14px] leading-relaxed max-w-md">
            {tx.newsletterDesc}
          </p>
        </div>
        {/* Right — form */}
        <div className="w-full sm:w-auto shrink-0">
          <div className="flex flex-col gap-3 min-w-[300px]">
            <input
              type="email"
              placeholder={tx.newsletterPlaceholder}
              className="w-full bg-white/[0.07] border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-amber-400/40 transition-all"
            />
            <button className="w-full px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black text-[13px] uppercase tracking-wider rounded-xl hover:shadow-xl hover:shadow-amber-500/30 transition-all">
              {tx.newsletterBtn}
            </button>
          </div>
          <p className="text-white/20 text-[10px] text-center mt-2.5">{tx.newsletterNote}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══ Comments Section ═══ */
interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  date: string;
  likes: number;
  replies: Comment[];
}

function CommentsSection({ articleSlug }: { articleSlug: string }) {
  const { language } = useLanguage();
  const tx = blogTexts[language].article;
  const storageKey = 'comments_' + articleSlug;

  const loadComments = useCallback((): Comment[] => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }, [storageKey]);

  const [comments, setComments] = useState<Comment[]>(loadComments);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyName, setReplyName] = useState('');
  const [replyEmail, setReplyEmail] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(comments));
  }, [comments, storageKey]);

  const generateId = () => Date.now() + '_' + Math.random().toString(36).slice(2, 8);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    const newComment: Comment = {
      id: generateId(),
      name: name.trim(),
      email: email.trim(),
      content: content.trim(),
      date: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    setComments([newComment, ...comments]);
    setName('');
    setEmail('');
    setContent('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleReplySubmit = (parentId: string) => {
    if (!replyName.trim() || !replyContent.trim()) return;

    const newReply: Comment = {
      id: generateId(),
      name: replyName.trim(),
      email: replyEmail.trim(),
      content: replyContent.trim(),
      date: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    setComments(comments.map(c =>
      c.id === parentId
        ? { ...c, replies: [...c.replies, newReply] }
        : c
    ));
    setReplyTo(null);
    setReplyName('');
    setReplyEmail('');
    setReplyContent('');
  };

  const handleLike = (commentId: string) => {
    setComments(comments.map(c =>
      c.id === commentId
        ? { ...c, likes: c.likes + 1 }
        : { ...c, replies: c.replies.map(r => r.id === commentId ? { ...r, likes: r.likes + 1 } : r) }
    ));
  };

  const getInitials = (n: string) => {
    const parts = n.trim().split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : n.slice(0, 2).toUpperCase();
  };

  const avatarColors = [
    'from-gold/30 to-gold/10 text-gold',
    'from-blue/30 to-blue/10 text-blue',
    'from-emerald/30 to-emerald/10 text-emerald',
    'from-coral/30 to-coral/10 text-coral',
    'from-violet/30 to-violet/10 text-violet-400',
    'from-pink-400/30 to-pink-400/10 text-pink-400',
  ];

  const getAvatarColor = (n: string) => {
    let hash = 0;
    for (let i = 0; i < n.length; i++) hash = n.charCodeAt(i) + ((hash << 5) - hash);
    return avatarColors[Math.abs(hash) % avatarColors.length];
  };

  const CommentCard = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={isReply ? 'ml-8 sm:ml-12 pl-5 border-l-2 border-black/5' : ''}
    >
      <div className={(isReply ? 'py-4' : 'bg-white rounded-2xl p-5 sm:p-6 border border-black/5 shadow-sm hover:shadow-md transition-shadow') + ' group'}>
        <div className="flex items-start gap-3.5">
          <div className={'w-10 h-10 rounded-xl bg-gradient-to-br ' + getAvatarColor(comment.name) + ' flex items-center justify-center shrink-0'}>
            <span className="font-heading font-bold text-[11px]">{getInitials(comment.name)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-2 flex-wrap">
              <span className="font-heading font-semibold text-[#0a0a0a] text-[13px]">{comment.name}</span>
              <span className="text-black/10 text-[11px]">•</span>
              <span className="text-[#a3a3a3] text-[11px]">{formatDate(comment.date)}</span>
            </div>
            <p className="text-[#737373] text-[13px] leading-relaxed mb-3 whitespace-pre-wrap">{comment.content}</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleLike(comment.id)}
                className="flex items-center gap-1.5 text-[#a3a3a3] text-[11px] hover:text-coral transition-colors group/like"
              >
                <Heart className={'w-3.5 h-3.5 ' + (comment.likes > 0 ? 'text-coral fill-coral' : 'group-hover/like:text-coral shadow-sm') + ' transition-colors'} />
                {comment.likes > 0 && <span className="text-coral">{comment.likes}</span>}
                <span>{comment.likes > 0 ? '' : "J'aime"}</span>
              </button>
              {!isReply && (
                <button
                  onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                  className="flex items-center gap-1.5 text-[#a3a3a3] text-[11px] hover:text-blue transition-colors"
                >
                  <Reply className="w-3.5 h-3.5" />
                  Répondre
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {replyTo === comment.id && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="ml-8 sm:ml-12 pl-5 border-l-2 border-blue/10 mt-3 mb-4"
        >
          <div className="bg-blue/[0.02] border border-blue/10 rounded-xl p-4">
            <p className="text-blue/50 text-[11px] mb-3 font-medium">{language === 'en' ? 'Reply to' : 'Répondre à'} {comment.name}</p>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder={tx.namePlaceholder}
                value={replyName}
                onChange={(e) => setReplyName(e.target.value)}
                className="w-full bg-black/5 border border-black/10 rounded-lg px-3.5 py-2.5 text-[#0a0a0a] text-[13px] placeholder:text-[#a3a3a3] focus:outline-none focus:border-blue/30 transition-colors"
              />
              <input
                type="email"
                placeholder={tx.emailPlaceholder}
                value={replyEmail}
                onChange={(e) => setReplyEmail(e.target.value)}
                className="w-full bg-black/5 border border-black/10 rounded-lg px-3.5 py-2.5 text-[#0a0a0a] text-[13px] placeholder:text-[#a3a3a3] focus:outline-none focus:border-blue/30 transition-colors"
              />
            </div>
            <textarea
              placeholder={language === 'en' ? 'Your reply...' : 'Votre réponse...'}
              rows={3}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="w-full bg-black/5 border border-black/10 rounded-xl px-3.5 py-2.5 text-[#0a0a0a] text-[13px] placeholder:text-[#a3a3a3] focus:outline-none focus:border-blue/30 transition-colors resize-none mb-3"
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleReplySubmit(comment.id)}
                disabled={!replyName.trim() || !replyContent.trim()}
                className="px-4 py-2 bg-blue/10 border border-blue/20 text-blue text-[12px] font-semibold rounded-lg hover:bg-blue/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <Send className="w-3 h-3" /> {language === 'en' ? 'Send' : 'Envoyer'}
              </button>
              <button
                onClick={() => setReplyTo(null)}
                className="px-4 py-2 text-[#a3a3a3] text-[12px] hover:text-[#737373] transition-colors"
              >
                {language === 'en' ? 'Cancel' : 'Annuler'}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {comment.replies.length > 0 && (
        <div className="space-y-0">
          {comment.replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <MessageCircle className="w-5 h-5 text-gold" />
          <h3 className="font-heading font-bold text-[#0a0a0a] text-lg">
            {tx.comments}
            {comments.length > 0 && (
              <span className="ml-2 text-[13px] text-[#a3a3a3] font-normal">({comments.length})</span>
            )}
          </h3>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 mb-8 shadow-luxury">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/15 to-transparent border border-gold/10 flex items-center justify-center">
            <User className="w-4 h-4 text-gold/60" />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-[#0a0a0a] text-[14px]">{tx.leaveComment}</h4>
            <p className="text-[#a3a3a3] text-[11px]">{tx.commentSubtitle}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#a3a3a3] text-[11px] font-bold uppercase tracking-wider mb-1.5 block">{tx.nameLabel}</label>
              <input
                type="text"
                placeholder={tx.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#fafafa] border border-black/5 rounded-xl px-4 py-3 text-[#0a0a0a] text-[13px] placeholder:text-[#a3a3a3] focus:outline-none focus:border-gold/30 transition-all shadow-inner"
              />
            </div>
            <div>
              <label className="text-[#a3a3a3] text-[11px] font-bold uppercase tracking-wider mb-1.5 block">{tx.emailLabel}</label>
              <input
                type="email"
                placeholder={tx.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#fafafa] border border-black/5 rounded-xl px-4 py-3 text-[#0a0a0a] text-[13px] placeholder:text-[#a3a3a3] focus:outline-none focus:border-gold/30 transition-all shadow-inner"
              />
            </div>
          </div>
          <div>
            <label className="text-[#a3a3a3] text-[11px] font-bold uppercase tracking-wider mb-1.5 block">{tx.commentLabel}</label>
            <textarea
              placeholder={tx.commentPlaceholder}
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full bg-[#fafafa] border border-black/5 rounded-xl px-4 py-3 text-[#0a0a0a] text-[13px] placeholder:text-[#a3a3a3] focus:outline-none focus:border-gold/30 transition-all resize-none shadow-inner"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#a3a3a3] text-[11px] font-medium">{tx.requiredFields}</p>
            <button
              type="submit"
              disabled={!name.trim() || !content.trim()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-dark-950 font-heading font-bold text-[13px] rounded-xl hover:shadow-[0_8px_30px_rgba(201,168,76,0.2)] transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              <Send className="w-3.5 h-3.5" />
              {tx.publishComment}
            </button>
          </div>
        </form>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-xl bg-emerald/[0.05] border border-emerald/15 flex items-center gap-2.5"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
            <p className="text-emerald text-[13px]">{tx.commentSuccess}</p>
          </motion.div>
        )}
      </div>

      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-10 text-center border border-black/5 shadow-sm">
          <MessageCircle className="w-10 h-10 text-black/5 mx-auto mb-3" />
          <h4 className="font-heading font-semibold text-[#a3a3a3] text-[14px] mb-1">{tx.noComments}</h4>
          <p className="text-[#d1d1d1] text-[12px]">{tx.noCommentsDesc}</p>
        </div>
      )}
    </motion.div>
  );
}


/* ═══ Dashboard Article Renderer — Premium Design ═══ */
function DashboardArticleRenderer({ article }: { article: DashboardArticle }) {
  const { language, localePath } = useLanguage();
  const tx = blogTexts[language].article;
  const [readProgress, setReadProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const prog = el.scrollHeight - el.clientHeight;
      setReadProgress(prog > 0 ? Math.min(100, (window.scrollY / prog) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const rawBody = article.bodyMarkdown || '';
  const baseHtml = rawBody.trim().startsWith('<') ? rawBody : String(marked.parse(rawBody));
  const htmlContent = applyAutoLinks(baseHtml);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const circumference = 2 * Math.PI * 22;

  return (
    <>
      <style>{`
        .ap-body { font-size: 1.05rem; }
        .ap-body h1 { font-weight: 900; color: #080808; font-size: clamp(1.8rem,3.5vw,2.4rem); line-height: 1.15; margin: 3.5rem 0 1.25rem; }
        .ap-body h2 { font-weight: 800; color: #080808; font-size: clamp(1.25rem,2.4vw,1.65rem); line-height: 1.25; margin: 3.5rem 0 1.25rem; padding-left: 1.1rem; border-left: 3px solid #f59e0b; }
        .ap-body h3 { font-weight: 700; color: #111; font-size: 1.15rem; line-height: 1.35; margin: 2.5rem 0 0.9rem; }
        .ap-body h4 { font-weight: 700; color: #222; font-size: 1rem; line-height: 1.4; margin: 2rem 0 0.75rem; }
        .ap-body p { color: #3a3a3a; line-height: 1.9; margin-bottom: 1.4rem; }
        .ap-body ul { list-style: none; padding: 0; margin-bottom: 1.75rem; }
        .ap-body ul li { position: relative; padding-left: 1.4rem; color: #3a3a3a; line-height: 1.85; margin-bottom: 0.55rem; }
        .ap-body ul li::before { content: ''; position: absolute; left: 0; top: 0.68em; width: 6px; height: 6px; border-radius: 50%; background: #f59e0b; }
        .ap-body ol { padding: 0; margin-bottom: 1.75rem; list-style: none; counter-reset: ol-counter; }
        .ap-body ol li { counter-increment: ol-counter; position: relative; padding-left: 2.25rem; color: #3a3a3a; line-height: 1.85; margin-bottom: 0.55rem; }
        .ap-body ol li::before { content: counter(ol-counter); position: absolute; left: 0; top: 0.05em; font-weight: 800; font-size: 0.78rem; color: #f59e0b; background: rgba(245,158,11,0.1); width: 1.5rem; height: 1.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-align: center; line-height: 1.5rem; }
        .ap-body a { color: #b45309; text-decoration: none; border-bottom: 1px solid rgba(180,83,9,0.28); transition: border-color .2s, color .2s; }
        .ap-body a:hover { color: #92400e; border-color: #92400e; }
        .ap-body strong { color: #080808; font-weight: 700; }
        .ap-body em { color: #525252; font-style: italic; }
        .ap-body u { text-decoration: underline; text-underline-offset: 3px; }
        .ap-body s { color: #a3a3a3; text-decoration: line-through; }
        .ap-body mark { background: rgba(245,158,11,0.18); color: #92400e; padding: 1px 4px; border-radius: 3px; }
        .ap-body code { background: #f3f0ff; color: #6d28d9; padding: 2px 7px; border-radius: 5px; font-size: 0.875em; font-family: 'JetBrains Mono','Fira Code',monospace; }
        .ap-body pre { background: #0c0c0c; border: 1px solid rgba(255,255,255,0.07); border-radius: 18px; padding: 1.75rem; overflow-x: auto; margin: 0.5rem 0 2.25rem; box-shadow: 0 24px 60px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.04); }
        .ap-body pre code { background: transparent; color: #e2e8f0; padding: 0; font-size: 0.875em; }
        .ap-body blockquote { margin: 2.75rem 0; padding: 2rem 2rem 2rem 2.5rem; background: #fffdf5; border-left: 3px solid #f59e0b; border-radius: 0 18px 18px 0; position: relative; box-shadow: inset 0 0 0 1px rgba(245,158,11,0.12); }
        .ap-body blockquote::before { content: '"'; position: absolute; top: -0.75rem; left: 1.25rem; font-size: 5rem; color: #f59e0b; opacity: 0.25; font-family: Georgia,serif; line-height: 1; pointer-events: none; }
        .ap-body blockquote p { color: #525252; font-size: 1.08rem; font-style: italic; line-height: 1.75; margin-bottom: 0; }
        .ap-body hr { border: none; height: 1px; background: linear-gradient(90deg,transparent,rgba(0,0,0,0.08),transparent); margin: 3.5rem 0; }
        .ap-body img { width: 100%; border-radius: 18px; box-shadow: 0 20px 60px rgba(0,0,0,0.1),0 1px 3px rgba(0,0,0,0.06); border: 1px solid rgba(0,0,0,0.04); margin: 2.25rem 0; display: block; }
        .ap-body table { width: 100%; border-collapse: collapse; margin-bottom: 2.25rem; border-radius: 14px; overflow: hidden; box-shadow: 0 1px 8px rgba(0,0,0,0.06),0 0 0 1px rgba(0,0,0,0.04); }
        .ap-body thead th { background: #0c0c0c; color: #fff; padding: 0.9rem 1.25rem; text-align: left; font-weight: 700; font-size: 0.82rem; letter-spacing: 0.04em; text-transform: uppercase; }
        .ap-body tbody td { padding: 0.9rem 1.25rem; color: #3a3a3a; font-size: 0.94rem; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .ap-body tbody tr:nth-child(even) td { background: #fafafa; }
        .ap-body tbody tr:last-child td { border-bottom: none; }
        .ap-body tbody tr:hover td { background: #fffbf0; transition: background .15s; }
      `}</style>

      <SEOHead
        title={article.seo?.metaTitle || (article.title + ' | Oumarou Sanda')}
        description={article.seo?.metaDescription || article.excerpt}
        canonical={'/blog/' + article.slug}
        ogType="article"
        ogImage={article.image || undefined}
        articlePublishedTime={article.createdAt}
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "BlogPosting", "headline": article.title, "author": { "@type": "Person", "name": article.author || "Oumarou Sanda", "url": "https://oumarousanda.com" }, "publisher": { "@type": "Person", "name": "Oumarou Sanda" }, "datePublished": article.createdAt, "mainEntityOfPage": "https://oumarousanda.com/blog/" + article.slug },
            { "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://oumarousanda.com" }, { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://oumarousanda.com/blog" }, { "@type": "ListItem", "position": 3, "name": article.title, "item": "https://oumarousanda.com/blog/" + article.slug } ] }
          ]
        }}
        adsense
      />

      {/* ── Reading progress bar ── */}
      <div className="fixed top-0 left-0 z-[100] w-full h-[3px] pointer-events-none bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 transition-[width] duration-75 ease-linear"
          style={{ width: `${readProgress}%`, boxShadow: readProgress > 2 ? '0 0 10px rgba(251,191,36,0.65)' : 'none' }}
        />
      </div>

      {/* ══════════════════════════════════════════
          HERO — Fond blanc, titre + méta centrés
      ══════════════════════════════════════════ */}
      <section className="relative bg-white pt-32 sm:pt-40 pb-12 sm:pb-14 border-b border-black/[0.06]">
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

        <div className="max-w-[1120px] mx-auto px-5 sm:px-8">

          {/* Breadcrumbs — alignés à gauche */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-[11px] text-[#a3a3a3] font-medium mb-10"
          >
            <Link to={localePath('/')} className="hover:text-[#d4af37] transition-colors flex items-center gap-1"><Home className="w-3 h-3" /> {tx.home}</Link>
            <ChevronRight className="w-3 h-3 opacity-30" />
            <Link to={localePath('/blog')} className="hover:text-[#d4af37] transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3 opacity-30" />
            <span className="text-[#737373]">{article.category}</span>
          </motion.nav>

          {/* Contenu centré */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            {/* Tag + catégorie */}
            <div className="inline-flex items-center gap-3 mb-6 flex-wrap justify-center">
              <span className={'inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ' + article.tagColor}>
                {article.tag}
              </span>
              <span className="text-[#a3a3a3] text-[11px] font-semibold uppercase tracking-widest">{article.category}</span>
            </div>

            {/* Titre */}
            <h1
              className="font-heading font-black text-[#080808] tracking-tight mb-5"
              style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.8rem)', lineHeight: '1.1' }}
            >
              {article.title}
            </h1>

            {/* Excerpt */}
            <p
              className="text-[#737373] leading-relaxed mb-10 max-w-xl mx-auto font-light"
              style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}
            >
              {article.excerpt}
            </p>

            {/* Meta strip — centré */}
            <div className="inline-flex items-center flex-wrap gap-x-5 gap-y-3 justify-center pt-7 border-t border-black/[0.07]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/20 flex items-center justify-center">
                  <span className="text-[#d4af37] font-black text-[8px]">OS</span>
                </div>
                <div className="text-left">
                  <p className="text-[#0a0a0a] text-[12px] font-semibold leading-none mb-0.5">{article.author}</p>
                  <p className="text-[#a3a3a3] text-[10px] uppercase tracking-wider">{tx.expertIa}</p>
                </div>
              </div>
              <div className="w-px h-5 bg-black/10" />
              <span className="flex items-center gap-1.5 text-[#737373] text-[12px]"><Calendar className="w-3.5 h-3.5 text-[#d4af37]" />{article.date}</span>
              <span className="flex items-center gap-1.5 text-[#737373] text-[12px]"><Clock className="w-3.5 h-3.5 text-[#d4af37]" />{article.readTime} {language === 'en' ? 'read' : 'de lecture'}</span>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black/10 text-[#737373] hover:text-[#0a0a0a] hover:border-black/20 transition-all text-[10px] font-bold uppercase tracking-wider"
              >
                <Share2 className="w-3 h-3" />{copied ? tx.copied : tx.share}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED IMAGE
      ══════════════════════════════════════════ */}
      {article.image && (
        <div className="bg-white py-8">
          <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl shadow-black/10 border border-black/[0.05]"
            >
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          CONTENT — Article (55fr) + Sidebar (15fr)
      ══════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="h-px bg-gradient-to-r from-transparent via-black/5 to-transparent" />

        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-[55fr_25fr] gap-12 items-start">

            {/* ── Main article body ── */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div
                className="ap-body"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlContent) }}
              />

              {/* Share footer */}
              <div className="mt-16 pt-10 border-t border-black/5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <div>
                    <p className="font-heading font-bold text-[#080808] text-[15px] mb-1">{tx.helpedYou}</p>
                    <p className="text-[#a3a3a3] text-[13px]">{tx.shareIt}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.href)}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A66C2] text-white text-[12px] font-bold shadow-md hover:shadow-xl hover:shadow-[#0A66C2]/25 transition-all"
                    >
                      <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                    </a>
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-black/10 text-[#525252] text-[12px] font-bold hover:bg-[#f8f8f8] transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5" /> {copied ? tx.copied : tx.copyLink}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Sticky Sidebar ── */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-4">

                {/* Progress ring */}
                <div className="bg-white border border-black/[0.07] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="relative w-[54px] h-[54px] shrink-0">
                      <svg className="w-[54px] h-[54px] -rotate-90" viewBox="0 0 54 54">
                        <circle cx="27" cy="27" r="22" fill="none" stroke="#f5f5f5" strokeWidth="3.5" />
                        <circle
                          cx="27" cy="27" r="22" fill="none" stroke="#f59e0b" strokeWidth="3.5"
                          strokeDasharray={circumference}
                          strokeDashoffset={circumference * (1 - readProgress / 100)}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dashoffset 0.35s ease', filter: readProgress > 5 ? 'drop-shadow(0 0 4px rgba(245,158,11,0.5))' : 'none' }}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-[#0a0a0a]">
                        {Math.round(readProgress)}%
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#0a0a0a] text-[13px] leading-none mb-1">{language === 'en' ? 'Progress' : 'Progression'}</p>
                      <p className="text-[#b3b3b3] text-[11px]">{article.readTime} {language === 'en' ? 'read' : 'de lecture'}</p>
                    </div>
                  </div>
                </div>

                {/* Author card */}
                <div className="bg-white border border-black/[0.07] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/5 border border-amber-400/15 flex items-center justify-center">
                      <span className="font-black text-[#0a0a0a] text-xs">OS</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#0a0a0a] text-[13px] leading-none mb-0.5">{article.author}</p>
                      <p className="text-[#b3b3b3] text-[10px] uppercase tracking-wider">{tx.expertIa}</p>
                    </div>
                  </div>
                  <p className="text-[#737373] text-[11px] leading-[1.7]">
                    {language === 'en' ? 'Founder of Wendooka & Sanda Vibe Code. AI expert for African entrepreneurs.' : 'Fondateur de Wendooka & Sanda Vibe Code. Expert en IA générative pour entrepreneurs africains.'}
                  </p>
                  <Link to={localePath(language === 'en' ? '/about' : '/a-propos')} className="mt-3.5 flex items-center gap-1.5 text-amber-600 text-[11px] font-bold hover:text-amber-700 transition-colors group">
                    {language === 'en' ? 'View profile' : 'Voir le profil'} <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                {/* Back */}
                <Link to={localePath('/blog')} className="flex items-center gap-2 px-4 py-3 rounded-xl border border-black/[0.07] bg-[#fafafa] text-[#737373] text-[12px] font-medium hover:bg-white hover:shadow-sm transition-all">
                  <ArrowLeft className="w-3.5 h-3.5" /> {language === 'en' ? 'Back to blog' : 'Retour au blog'}
                </Link>

                {/* CTA sidebar */}
                {language === 'fr' && (
                  <div className="rounded-2xl overflow-hidden">
                    <div className="bg-[#0c0c0c] p-5 relative overflow-hidden">
                      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-amber-400/8 blur-2xl" />
                      <p className="text-amber-400 text-[9px] font-black uppercase tracking-[0.2em] mb-2">Formations IA</p>
                      <p className="text-white font-bold text-[13px] leading-snug mb-2.5">
                        Transforme l'IA en revenus concrets.
                      </p>
                      <p className="text-white/35 text-[10px] leading-relaxed mb-4">
                        Formations pratiques. Résultats prouvés. Communauté active.
                      </p>
                      <Link
                        to="/formations"
                        className="flex items-center gap-2 justify-center w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black text-[11px] uppercase tracking-wider rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all"
                      >
                        Découvrir <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}

              </div>
            </aside>

          </div>

          {/* Newsletter */}
          <div className="mt-20 border-t border-black/5 pt-16">
            <NewsletterCTA />
          </div>

          {/* Comments */}
          <div className="mt-12">
            <CommentsSection articleSlug={article.slug} />
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══ MAIN PAGE ═══ */
export default function BlogArticlePage() {
  const { slug } = useParams();
  const { language, localePath } = useLanguage();
  const tx = blogTexts[language].article;
  // Check dashboard articles first (created via admin)
  const dashboardArticle = getDashboardArticleBySlug(slug ?? '');
  const isEnArticle = articlesEn.some((a) => a.slug === slug);
  const article = articles.find((a) => a.slug === slug) || (articlesEn.find((a) => a.slug === slug) as typeof articles[number] | undefined);
  const [copied, setCopied] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  if (!dashboardArticle && !article) return <Navigate to={localePath('/blog')} replace />;
  // Route dashboard articles to the markdown renderer
  if (dashboardArticle) return <DashboardArticleRenderer article={dashboardArticle} />;
  // TypeScript narrowing: article is guaranteed to exist here
  if (!article) return <Navigate to={localePath('/blog')} replace />;

  const sourceList = isEnArticle ? (articlesEn as typeof articles) : articles;
  const idx = sourceList.findIndex((a) => a.slug === slug);
  const prev = idx > 0 ? sourceList[idx - 1] : null;
  const next = idx < sourceList.length - 1 ? sourceList[idx + 1] : null;
  const isRich: boolean = !!(
    'richContent' in article &&
    (article as Record<string, unknown>).richContent &&
    'sections' in article
  );
  const hasImage = 'image' in article && Boolean((article as Record<string, unknown>).image);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── SEO helpers ────────────────────────────────────────────────
  const isoDate = parseFrenchDate(article.date);
  const articleImage = typeof article.image === 'string' ? article.image : 'https://oumarousanda.com/Oumarou Sanda 1.webp';

  // Extrait les FAQ pour le schema FAQPage (sections type "faq-rich")
  type FaqItem = { q: string; a: string };
  const rawSections = isRich && 'sections' in article
    ? (article as Record<string, unknown>).sections as Array<{ type: string; items?: unknown[] }>
    : [];
  const faqItems: FaqItem[] = rawSections
    .filter(s => s.type === 'faq-rich')
    .flatMap(s => (s.items ?? []) as FaqItem[]);

  const schemaGraph: object[] = [
    {
      "@type": "BlogPosting",
      "@id": `https://oumarousanda.com/blog/${article.slug}#article`,
      "headline": article.title,
      "description": article.seo?.metaDescription || article.excerpt,
      "inLanguage": "fr",
      "url": `https://oumarousanda.com/blog/${article.slug}`,
      "mainEntityOfPage": `https://oumarousanda.com/blog/${article.slug}`,
      "image": articleImage,
      "datePublished": isoDate,
      "dateModified": isoDate,
      "author": { "@type": "Person", "@id": "https://oumarousanda.com/#person", "name": "Oumarou Sanda", "url": "https://oumarousanda.com/a-propos" },
      "publisher": { "@type": "Person", "@id": "https://oumarousanda.com/#person", "name": "Oumarou Sanda" },
      "keywords": article.seo?.focusKeyword,
      "articleSection": article.category,
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "h2", "h3"],
      },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://oumarousanda.com" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://oumarousanda.com/blog" },
        { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://oumarousanda.com/blog/${article.slug}` },
      ],
    },
    ...(faqItems.length > 0 ? [{
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a },
      })),
    }] : []),
  ];

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 z-[100] w-full h-[2px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-gold via-gold-light to-amber-300 transition-[width] duration-75 ease-linear"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <SEOHead
        title={(article.seo?.metaTitle) || (article.title + ' | Oumarou Sanda')}
        description={(article.seo?.metaDescription) || article.excerpt}
        canonical={'/blog/' + article.slug}
        ogType="article"
        ogImage={articleImage}
        articlePublishedTime={isoDate}
        schema={{ "@context": "https://schema.org", "@graph": schemaGraph }}
        adsense
      />
      {/* ═══ HERO — Fond blanc, centré ═══ */}
      <section className="relative bg-white pt-32 sm:pt-40 pb-12 sm:pb-14 border-b border-black/[0.06]">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

        <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-[11px] text-[#a3a3a3] font-medium mb-10">
            <Link to={localePath('/')} className="hover:text-[#d4af37] transition-colors flex items-center gap-1"><Home className="w-3.5 h-3.5" /> {tx.home}</Link>
            <ChevronRight className="w-3 h-3 opacity-30" />
            <Link to={localePath('/blog')} className="hover:text-[#d4af37] transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3 opacity-30" />
            <span className="text-[#737373]">{article.category}</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-center">
            {/* Tags */}
            <div className="inline-flex items-center gap-3 mb-6 flex-wrap justify-center">
              <span className={'inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ' + article.tagColor}>{article.tag}</span>
              <span className="text-[#a3a3a3] text-[11px] font-semibold uppercase tracking-widest">{article.category}</span>
            </div>

            {/* Title */}
            <h1
              className="font-heading font-black text-[#080808] tracking-tight mb-5"
              style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.8rem)', lineHeight: '1.1' }}
            >
              {article.title}
            </h1>

            {/* Excerpt / meta description */}
            {article.seo ? (
              <p className="text-[#737373] leading-relaxed mb-10 max-w-xl mx-auto font-light" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}>
                {article.seo.metaDescription}
              </p>
            ) : (
              <p className="text-[#737373] leading-relaxed mb-10 max-w-xl mx-auto font-light" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}>
                {article.excerpt}
              </p>
            )}

            {/* Meta strip — centré */}
            <div className="inline-flex items-center flex-wrap gap-x-5 gap-y-3 justify-center pt-7 border-t border-black/[0.07]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/20 flex items-center justify-center">
                  <span className="text-[#d4af37] font-black text-[8px]">OS</span>
                </div>
                <div className="text-left">
                  <p className="text-[#0a0a0a] text-[12px] font-semibold leading-none mb-0.5">{article.author || 'Oumarou Sanda'}</p>
                  <p className="text-[#a3a3a3] text-[10px] uppercase tracking-wider">{tx.expertIa}</p>
                </div>
              </div>
              <div className="w-px h-5 bg-black/10" />
              <span className="flex items-center gap-1.5 text-[#737373] text-[12px]"><Calendar className="w-3.5 h-3.5 text-[#d4af37]" />{article.date}</span>
              <span className="flex items-center gap-1.5 text-[#737373] text-[12px]"><Clock className="w-3.5 h-3.5 text-[#d4af37]" />{article.readTime}</span>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black/10 text-[#737373] hover:text-[#0a0a0a] hover:border-black/20 transition-all text-[10px] font-bold uppercase tracking-wider"
              >
                <Share2 className="w-3 h-3" />{copied ? tx.copied : tx.share}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FEATURED IMAGE ═══ */}
      {hasImage && (
        <div className="bg-white py-8">
          <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl shadow-black/10 border border-black/[0.05]"
            >
              <img src={(article as Record<string, unknown>).image as string} alt={article.title} className="w-full h-full object-cover" loading="eager" />
            </motion.div>
          </div>
        </div>
      )}

      {/* ═══ ARTICLE BODY — 55fr + 15fr ═══ */}
      <section className="bg-white">
        <div className="h-px bg-gradient-to-r from-transparent via-black/5 to-transparent" />

        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-[55fr_25fr] gap-12 items-start">

            {/* ── MAIN CONTENT ── */}
            <div className="min-w-0">
              <motion.article
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {isRich ? (
                  <RichArticleContent article={article} />
                ) : (
                  <PlainArticleContent content={((article as Record<string, unknown>).content as string | undefined) ?? ''} />
                )}

                <ArticleCTABlock category={article.category} />

                <AdUnit slot="7070630877" format="fluid" layout="in-article" className="my-8" />

                {/* Share footer */}
                <div className="mt-14 pt-8 border-t border-black/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-heading font-bold text-[#080808] text-[15px] mb-1">{tx.helpedYou}</p>
                    <p className="text-[#a3a3a3] text-[13px]">{tx.shareIt}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a href={'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.href)} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A66C2] text-white text-[12px] font-bold shadow-md hover:shadow-xl hover:shadow-[#0A66C2]/20 transition-all">
                      <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                    </a>
                    <button onClick={handleShare}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-black/10 text-[#525252] text-[12px] font-bold hover:bg-[#f8f8f8] transition-all">
                      <Share2 className="w-3.5 h-3.5" /> {copied ? tx.copied : tx.copyLink}
                    </button>
                  </div>
                </div>
              </motion.article>

              <AuthorBio />
              <NewsletterCTA />
              <RelatedArticles currentSlug={article.slug} category={article.category} />
              <CommentsSection articleSlug={article.slug} />

              <AdUnit slot="9367115017" format="auto" className="my-6" />

              {/* Prev/Next */}
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {prev ? (
                  <Link to={localePath('/blog/' + prev.slug)} className="bg-white rounded-xl p-5 border border-black/5 group hover:border-amber-300/40 transition-all shadow-sm">
                    <span className="text-[11px] text-[#a3a3a3] flex items-center gap-1 mb-2 font-bold"><ArrowLeft className="w-3 h-3" /> {tx.prev}</span>
                    <h4 className="font-heading font-semibold text-[#0a0a0a] text-[13px] group-hover:text-[#d4af37] transition-colors line-clamp-2">{prev.title}</h4>
                  </Link>
                ) : <div />}
                {next && (
                  <Link to={localePath('/blog/' + next.slug)} className="bg-white rounded-xl p-5 border border-black/5 group text-right hover:border-amber-300/40 transition-all shadow-sm">
                    <span className="text-[11px] text-[#a3a3a3] flex items-center gap-1 mb-2 justify-end font-bold">{tx.next} <ArrowRight className="w-3 h-3" /></span>
                    <h4 className="font-heading font-semibold text-[#0a0a0a] text-[13px] group-hover:text-[#d4af37] transition-colors line-clamp-2">{next.title}</h4>
                  </Link>
                )}
              </div>
            </div>

            {/* ── STICKY SIDEBAR — 15fr ── */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-4">

                {/* Progress ring */}
                <div className="bg-white border border-black/[0.07] rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="relative w-[48px] h-[48px] shrink-0">
                      <svg className="w-[48px] h-[48px] -rotate-90" viewBox="0 0 48 48">
                        <circle cx="24" cy="24" r="19" fill="none" stroke="#f5f5f5" strokeWidth="3" />
                        <circle cx="24" cy="24" r="19" fill="none" stroke="#d4af37" strokeWidth="3"
                          strokeDasharray={2 * Math.PI * 19}
                          strokeDashoffset={2 * Math.PI * 19 * (1 - readProgress / 100)}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dashoffset 0.35s ease' }}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-[#0a0a0a]">{Math.round(readProgress)}%</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#0a0a0a] text-[12px] leading-none mb-1">{language === 'en' ? 'Progress' : 'Progression'}</p>
                      <p className="text-[#b3b3b3] text-[10px]">{article.readTime}</p>
                    </div>
                  </div>
                </div>

                {/* ToC if available */}
                {isRich && 'tableOfContents' in article && !!(article as Record<string, unknown>).tableOfContents && (
                  <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden shadow-sm">
                    <div className="px-4 py-3 border-b border-black/5 flex items-center gap-2 bg-[#fafafa]">
                      <List className="w-3 h-3 text-[#d4af37]" />
                      <span className="font-bold text-[#0a0a0a] text-[11px] uppercase tracking-wider">Sommaire</span>
                    </div>
                    <nav className="px-2 py-2 space-y-0.5 max-h-[50vh] overflow-y-auto">
                      {((article as Record<string, unknown>).tableOfContents as { id: string; label: string }[]).map((item, i) => (
                        <a key={item.id} href={'#' + item.id}
                          className="flex items-start gap-2 py-1.5 px-2 text-[10px] text-[#737373] hover:text-[#d4af37] hover:bg-amber-50 rounded-lg transition-all group block">
                          <span className="text-[#d4af37]/30 font-mono text-[9px] shrink-0 mt-[2px] w-4 text-right">{String(i + 1).padStart(2, '0')}</span>
                          <span className="group-hover:translate-x-0.5 transition-transform leading-snug">{item.label}</span>
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Author */}
                <div className="bg-white border border-black/[0.07] rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/5 border border-amber-400/15 flex items-center justify-center">
                      <span className="font-black text-[#0a0a0a] text-[10px]">OS</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#0a0a0a] text-[12px] leading-none mb-0.5">Oumarou Sanda</p>
                      <p className="text-[#b3b3b3] text-[9px] uppercase tracking-wider">{tx.expertIa}</p>
                    </div>
                  </div>
                  <p className="text-[#737373] text-[10px] leading-[1.7]">{language === 'en' ? 'Founder of Wendooka & Sanda Vibe Code.' : 'Fondateur de Wendooka & Sanda Vibe Code.'}</p>
                  <Link to={localePath(language === 'en' ? '/about' : '/a-propos')} className="mt-3 flex items-center gap-1 text-amber-600 text-[10px] font-bold hover:text-amber-700 transition-colors">
                    {language === 'en' ? 'View profile' : 'Voir le profil'} <ArrowRight className="w-2.5 h-2.5" />
                  </Link>
                </div>

                <Link to={localePath('/blog')} className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-black/[0.07] bg-[#fafafa] text-[#737373] text-[11px] font-medium hover:bg-white hover:shadow-sm transition-all">
                  <ArrowLeft className="w-3 h-3" /> {language === 'en' ? 'Back to blog' : 'Retour au blog'}
                </Link>

                {/* CTA Formation (FR only) */}
                {language === 'fr' && (
                  <div className="rounded-2xl overflow-hidden">
                    <div className="bg-[#0c0c0c] p-4 relative overflow-hidden">
                      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-amber-400/8 blur-2xl" />
                      <p className="text-amber-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1.5">Formations IA</p>
                      <p className="text-white font-bold text-[12px] leading-snug mb-3">Maîtrise l'IA et génère des revenus.</p>
                      <Link to="/formations"
                        className="flex items-center gap-1.5 justify-center w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black text-[10px] uppercase tracking-wider rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all">
                        Découvrir <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}

              </div>
            </aside>

          </div>
        </div>
      </section>
    </>
  );
}
