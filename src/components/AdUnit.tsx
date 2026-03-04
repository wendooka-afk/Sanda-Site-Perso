import { useEffect, useRef } from 'react';

const AD_CLIENT = 'ca-pub-4434058814138910';
const AD_SCRIPT_URL = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;

/** Charge le script AdSense une seule fois, après window.load */
let adScriptLoaded = false;
function loadAdSenseScript() {
  if (adScriptLoaded || document.querySelector(`script[src*="adsbygoogle"]`)) {
    adScriptLoaded = true;
    return;
  }
  adScriptLoaded = true;
  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = AD_SCRIPT_URL;
  document.head.appendChild(script);
}

// Initialise après window.load pour ne pas bloquer le LCP
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    // Page déjà chargée (navigation SPA)
    setTimeout(loadAdSenseScript, 1500);
  } else {
    window.addEventListener('load', () => setTimeout(loadAdSenseScript, 1500), { once: true });
  }
}

interface AdUnitProps {
  /** Slot ID fourni par Google AdSense */
  slot: string;
  /** data-ad-format */
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  /** data-ad-layout — uniquement "in-article" pour l'instant */
  layout?: 'in-article';
  /** data-ad-layout-key (In-Feed) */
  layoutKey?: string;
  /** Classe CSS wrapper */
  className?: string;
}

/**
 * AdUnit — Composant Google AdSense (unités manuelles)
 *
 * Supporte 3 types :
 *  - Display  : <AdUnit slot="9367115017" format="auto" />
 *  - In-Article : <AdUnit slot="7070630877" format="fluid" layout="in-article" />
 *  - In-Feed  : <AdUnit slot="9419753190" format="fluid" layoutKey="-ef+6k-30-ac+ty" />
 */
export function AdUnit({ slot, format = 'auto', layout, layoutKey, className = '' }: AdUnitProps) {
  const pushed = useRef(false);

  useEffect(() => {
    // Évite le double push en React 18 StrictMode
    if (pushed.current) return;

    // Attendre que le script soit chargé avant de pusher
    const tryPush = () => {
      if (pushed.current) return;
      pushed.current = true;
      try {
        // @ts-ignore — injecté globalement via script dynamique
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (_) {
        // Silencieux si bloqueur de pub actif
      }
    };

    if (adScriptLoaded) {
      // Script déjà injecté — attendre un peu pour qu'il se charge
      setTimeout(tryPush, 100);
    } else {
      // Attendre l'événement load
      if (document.readyState === 'complete') {
        setTimeout(tryPush, 1600);
      } else {
        window.addEventListener('load', () => setTimeout(tryPush, 1600), { once: true });
      }
    }
  }, []);

  const isInArticle = layout === 'in-article';

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...(isInArticle ? { textAlign: 'center' } : {}) }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        {...(layout ? { 'data-ad-layout': layout } : {})}
        {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
        {...(!isInArticle ? { 'data-full-width-responsive': 'true' } : {})}
      />
    </div>
  );
}
