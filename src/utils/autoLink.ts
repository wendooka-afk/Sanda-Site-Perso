/**
 * autoLink.ts — Transforme automatiquement les mots-clés définis dans les
 * PrettyLinks du dashboard en hyperliens dans le contenu HTML des articles.
 *
 * Règles :
 *  - Seul le PREMIER occurrence de chaque mot-clé dans l'article est liée
 *    (évite le sur-balisage).
 *  - Les mots-clés sont insensibles à la casse.
 *  - Les mots-clés qui se trouvent déjà à l'intérieur d'une balise <a> ou
 *    d'un attribut HTML ne sont PAS modifiés.
 *  - Trie les mots-clés par longueur décroissante pour matcher les plus longs
 *    en premier (ex: "hébergement cloud" avant "hébergement").
 */

import DOMPurify from 'dompurify';

const LINKS_STORAGE_KEY = 'dashboard_links';

interface PrettyLinkLite {
  slug: string;
  destination: string;
  keywords: string[];
  status: string;
  attributes: {
    nofollow: boolean;
    sponsored: boolean;
    newTab: boolean;
  };
}

/** Charge les liens depuis localStorage */
function loadLinks(): PrettyLinkLite[] {
  try {
    const raw = localStorage.getItem(LINKS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PrettyLinkLite[]) : [];
  } catch {
    return [];
  }
}

/** Construit rel="..." selon les attributs du lien */
function buildRel(attrs: PrettyLinkLite['attributes']): string {
  const parts: string[] = [];
  if (attrs.nofollow) parts.push('nofollow');
  if (attrs.sponsored) parts.push('sponsored');
  parts.push('noopener');
  return parts.join(' ');
}

/**
 * Applique l'auto-linking à un bloc HTML.
 * À appeler avant `DOMPurify.sanitize()` ou après, sur la chaîne brute.
 *
 * @param html - Contenu HTML de l'article
 * @returns HTML avec les mots-clés transformés en liens
 */
export function applyAutoLinks(html: string): string {
  if (!html) return html;

  const links = loadLinks().filter(
    (l) => l.status === 'active' && Array.isArray(l.keywords) && l.keywords.length > 0
  );

  if (links.length === 0) return html;

  // Construire une liste plate [(keyword, link)] triée par longueur desc
  const pairs: Array<{ keyword: string; link: PrettyLinkLite }> = [];
  for (const link of links) {
    for (const kw of link.keywords) {
      if (kw.trim()) pairs.push({ keyword: kw.trim(), link });
    }
  }
  pairs.sort((a, b) => b.keyword.length - a.keyword.length);

  if (pairs.length === 0) return html;

  // Utiliser DOMParser côté navigateur pour manipuler le DOM sans risque
  // (évite les faux positifs dans les attributs HTML)
  if (typeof window === 'undefined') return html; // SSR safety

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<body>${html}</body>`, 'text/html');
  const body = doc.body;

  // Ensemble des mots-clés déjà liés (first-occurrence only)
  const linked = new Set<string>();

  // Parcourir tous les noeuds texte en dehors des balises <a>
  const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      // Ignorer les noeuds dans <a>, <code>, <pre>
      let parent = node.parentElement;
      while (parent && parent !== body) {
        const tag = parent.tagName.toLowerCase();
        if (tag === 'a' || tag === 'code' || tag === 'pre') {
          return NodeFilter.FILTER_REJECT;
        }
        parent = parent.parentElement;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    textNodes.push(node as Text);
  }

  for (const textNode of textNodes) {
    let text = textNode.nodeValue || '';
    if (!text.trim()) continue;

    let modified = false;
    let result = text;

    for (const { keyword, link } of pairs) {
      const kwLower = keyword.toLowerCase();
      if (linked.has(kwLower)) continue;

      // Regex: mot-clé entier, insensible à la casse, hors balise
      // On ne traite que du texte brut ici — pas de risque d'attribut HTML
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`(${escaped})`, 'i');
      const match = re.exec(result);
      if (!match) continue;

      const rel = buildRel(link.attributes);
      const target = link.attributes.newTab ? ' target="_blank"' : '';
      const href = `https://oumarousanda.com/go/${link.slug}`;

      // Remplacer uniquement la première occurrence dans ce nœud
      result = result.replace(
        re,
        `<a href="${href}" rel="${rel}"${target} class="auto-link">${match[0]}</a>`
      );
      linked.add(kwLower);
      modified = true;
    }

    if (modified && textNode.parentNode) {
      // Remplacer le noeud texte par le HTML généré
      const wrapper = document.createElement('span');
      wrapper.innerHTML = DOMPurify.sanitize(result, { ADD_ATTR: ['target', 'rel'] });
      const frag = document.createDocumentFragment();
      while (wrapper.firstChild) frag.appendChild(wrapper.firstChild);
      textNode.parentNode.replaceChild(frag, textNode);
    }
  }

  return body.innerHTML;
}
