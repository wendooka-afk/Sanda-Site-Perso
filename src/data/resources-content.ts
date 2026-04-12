export type ResourceSection =
  | { type: 'intro'; content: string }
  | { type: 'heading'; content: string }
  | { type: 'text'; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'numbered'; items: string[] }
  | { type: 'checklist'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'callout'; label: string; content: string }
  | { type: 'divider' }
  | { type: 'prompt-block'; label: string; prompt: string }
  | { type: 'tool-card'; name: string; category: string; price: string; use: string; free?: string };

export type ResourceContent = {
  slug: string;
  lang: 'fr' | 'en';
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  sections: ResourceSection[];
};

/* ══════════════════════════════════════════
   RESOURCE 1 — AI Tools PDF
══════════════════════════════════════════ */
const resource1_fr: ResourceContent = {
  slug: 'outils-ia-entrepreneurs',
  lang: 'fr',
  title: 'Les 10 outils IA indispensables pour entrepreneurs africains',
  subtitle: 'Une sélection rigoureuse des meilleurs outils IA disponibles en 2026, avec des cas d\'usage concrets, des prix, et des comparatifs.',
  badge: 'Guide PDF',
  icon: '🤖',
  sections: [
    { type: 'intro', content: 'L\'IA n\'est plus un luxe réservé aux grandes entreprises. En 2026, les meilleurs outils sont accessibles à moins de 20€/mois — et certains sont entièrement gratuits. Voici ma sélection rigoureuse des 10 outils qui ont le plus d\'impact pour un entrepreneur digital, testés et utilisés au quotidien.' },
    { type: 'heading', content: '🏆 Les 10 outils à maîtriser absolument' },
    { type: 'tool-card', name: 'ChatGPT (GPT-4o)', category: 'Rédaction & stratégie', price: 'Gratuit / $20/mois (Plus)', use: 'Créer du contenu, rédiger des emails, analyser des données, générer des idées de business', free: 'Oui (GPT-4o mini)' },
    { type: 'tool-card', name: 'Claude (Anthropic)', category: 'Rédaction longue & analyse', price: 'Gratuit / $20/mois (Pro)', use: 'Écrire des articles longs, analyser des documents PDF, coder des pages web', free: 'Oui (claude.ai)' },
    { type: 'tool-card', name: 'Midjourney v7', category: 'Création visuelle', price: '$10/mois (Basic)', use: 'Créer des visuels pour tes réseaux, couvertures de produits, illustrations d\'articles', free: 'Non' },
    { type: 'tool-card', name: 'Canva (avec Magic Studio)', category: 'Design & branding', price: 'Gratuit / $15/mois (Pro)', use: 'Créer des posts, carousels, présentations, miniatures YouTube, banners pub', free: 'Oui' },
    { type: 'tool-card', name: 'Notion AI', category: 'Productivité & organisation', price: 'Inclus dans Notion Business ($16/mois)', use: 'Gérer ses projets, rédiger avec l\'IA intégrée, créer des bases de données', free: 'Limité dans le plan gratuit' },
    { type: 'tool-card', name: 'ElevenLabs', category: 'Audio & voix off', price: 'Gratuit / $5/mois (Starter)', use: 'Cloner sa voix, créer des voix off pour vidéos YouTube et TikTok', free: '10 000 caractères/mois' },
    { type: 'tool-card', name: 'Descript', category: 'Montage vidéo IA', price: 'Gratuit / $24/mois (Hobbyist)', use: 'Monter des vidéos par texte, supprimer les silences, créer des sous-titres auto', free: 'Oui (1h/mois)' },
    { type: 'tool-card', name: 'Perplexity AI', category: 'Recherche & veille', price: 'Gratuit / $20/mois (Pro)', use: 'Faire de la veille, trouver des sources fiables, rechercher des tendances de marché', free: 'Oui' },
    { type: 'tool-card', name: 'Make (ex-Integromat)', category: 'Automatisation', price: 'Gratuit / $9/mois (Core)', use: 'Automatiser des tâches répétitives, connecter des apps entre elles, créer des workflows IA', free: '1 000 opérations/mois' },
    { type: 'tool-card', name: 'Beehiiv', category: 'Newsletter & email marketing', price: 'Gratuit / $39/mois (Scale)', use: 'Créer et monétiser une newsletter, envoyer des campagnes email, analyser les stats', free: 'Jusqu\'à 2 500 abonnés' },
    { type: 'heading', content: '💡 Comment choisir son premier outil IA' },
    { type: 'text', content: 'Si tu démarres, commence par **ChatGPT ou Claude** (les deux sont gratuits). Maîtrise bien l\'un d\'eux avant d\'en ajouter un second. L\'erreur classique : payer pour 5 outils sans en utiliser aucun à fond.' },
    { type: 'checklist', items: [
      'Tu crées du contenu → ChatGPT + Canva Pro',
      'Tu fais du YouTube → ElevenLabs + Descript',
      'Tu vends une formation → Notion AI + Beehiiv',
      'Tu veux automatiser → Make + ChatGPT API',
      'Tu as besoin de visuels premium → Midjourney v7',
    ]},
    { type: 'callout', label: '⚠️ Point d\'attention', content: 'Les prix indiqués sont ceux d\'avril 2026. Ils peuvent évoluer. Vérifie toujours sur le site officiel avant de t\'abonner.' },
  ],
};

const resource1_en: ResourceContent = {
  slug: 'ai-tools-entrepreneurs',
  lang: 'en',
  title: 'The 10 Essential AI Tools for Entrepreneurs (2026)',
  subtitle: 'A curated selection of the best AI tools available in 2026, with concrete use cases, pricing, and comparisons.',
  badge: 'PDF Guide',
  icon: '🤖',
  sections: [
    { type: 'intro', content: 'AI is no longer a luxury for big companies. In 2026, the best tools are accessible for under $20/month — and some are completely free. Here\'s my curated selection of the 10 highest-impact tools for a digital entrepreneur, tested and used daily.' },
    { type: 'heading', content: '🏆 The 10 tools you must master' },
    { type: 'tool-card', name: 'ChatGPT (GPT-4o)', category: 'Writing & strategy', price: 'Free / $20/month (Plus)', use: 'Create content, write emails, analyze data, generate business ideas', free: 'Yes (GPT-4o mini)' },
    { type: 'tool-card', name: 'Claude (Anthropic)', category: 'Long-form writing & analysis', price: 'Free / $20/month (Pro)', use: 'Write long articles, analyze PDF documents, code web pages', free: 'Yes (claude.ai)' },
    { type: 'tool-card', name: 'Midjourney v7', category: 'Visual creation', price: '$10/month (Basic)', use: 'Create visuals for social media, product covers, article illustrations', free: 'No' },
    { type: 'tool-card', name: 'Canva (with Magic Studio)', category: 'Design & branding', price: 'Free / $15/month (Pro)', use: 'Create posts, carousels, presentations, YouTube thumbnails, ad banners', free: 'Yes' },
    { type: 'tool-card', name: 'Notion AI', category: 'Productivity & organization', price: 'Included in Notion Business ($16/month)', use: 'Manage projects, write with built-in AI, create databases', free: 'Limited in free plan' },
    { type: 'tool-card', name: 'ElevenLabs', category: 'Audio & voice-over', price: 'Free / $5/month (Starter)', use: 'Clone your voice, create voice-overs for YouTube and TikTok videos', free: '10,000 characters/month' },
    { type: 'tool-card', name: 'Descript', category: 'AI video editing', price: 'Free / $24/month (Hobbyist)', use: 'Edit videos by text, remove silences, auto-generate subtitles', free: 'Yes (1h/month)' },
    { type: 'tool-card', name: 'Perplexity AI', category: 'Research & monitoring', price: 'Free / $20/month (Pro)', use: 'Stay current, find reliable sources, research market trends', free: 'Yes' },
    { type: 'tool-card', name: 'Make (ex-Integromat)', category: 'Automation', price: 'Free / $9/month (Core)', use: 'Automate repetitive tasks, connect apps together, build AI workflows', free: '1,000 operations/month' },
    { type: 'tool-card', name: 'Beehiiv', category: 'Newsletter & email marketing', price: 'Free / $39/month (Scale)', use: 'Create and monetize a newsletter, send email campaigns, analyze stats', free: 'Up to 2,500 subscribers' },
    { type: 'heading', content: '💡 How to choose your first AI tool' },
    { type: 'text', content: 'If you\'re just starting out, begin with **ChatGPT or Claude** (both are free). Master one well before adding a second. The classic mistake: paying for 5 tools without fully using any of them.' },
    { type: 'checklist', items: [
      'You create content → ChatGPT + Canva Pro',
      'You do YouTube → ElevenLabs + Descript',
      'You sell a course → Notion AI + Beehiiv',
      'You want to automate → Make + ChatGPT API',
      'You need premium visuals → Midjourney v7',
    ]},
    { type: 'callout', label: '⚠️ Note', content: 'Prices listed are as of April 2026. They may change. Always verify on the official website before subscribing.' },
  ],
};

/* ══════════════════════════════════════════
   RESOURCE 2 — 30-Day Launch Checklist
══════════════════════════════════════════ */
const resource2_fr: ResourceContent = {
  slug: 'checklist-lancer-business-30-jours',
  lang: 'fr',
  title: 'Checklist : Lancer son business en ligne avec l\'IA en 30 jours',
  subtitle: '47 actions concrètes organisées semaine par semaine pour lancer ton premier business digital.',
  badge: 'Checklist',
  icon: '✅',
  sections: [
    { type: 'intro', content: 'Cette checklist contient exactement ce que tu dois faire pour passer de zéro à un business digital qui génère ses premiers revenus — en 30 jours. Pas de théorie. Pas de cours infini. Juste les actions dans l\'ordre.' },
    { type: 'heading', content: '📅 Semaine 1 — Fondations (Jours 1–7)' },
    { type: 'checklist', items: [
      'Choisir sa niche (utilise ChatGPT pour valider : "est-ce que cette niche est rentable en 2026 ?")',
      'Définir son avatar client idéal (âge, problème, budget, plateforme utilisée)',
      'Analyser 3 concurrents directs : leurs offres, leurs prix, leurs points faibles',
      'Choisir UN seul canal d\'acquisition pour démarrer (YouTube, TikTok, Instagram ou blog)',
      'Créer son profil/compte sur ce canal avec une bio optimisée IA',
      'Définir son offre principale : quel problème tu résous, pour qui, à quel prix',
      'Installer Notion pour organiser tout ton business (template gratuit disponible)',
    ]},
    { type: 'heading', content: '📅 Semaine 2 — Création de contenu (Jours 8–14)' },
    { type: 'checklist', items: [
      'Créer 5 posts/vidéos de contenu de valeur (utilise le Prompt Pack ressource #3)',
      'Rédiger une page "À propos" qui convertit (problème → solution → crédibilité)',
      'Créer une landing page simple avec Carrd ou Systeme.io (gratuit)',
      'Configurer un autorépondeur email (Brevo ou Beehiiv — gratuit jusqu\'à 2 500 contacts)',
      'Créer un lead magnet (PDF gratuit, checklist, ou mini-formation)',
      'Publier 3 fois par semaine minimum sur ton canal principal',
      'Engager avec 10 comptes dans ta niche chaque jour',
    ]},
    { type: 'heading', content: '📅 Semaine 3 — Offre & tunnel (Jours 15–21)' },
    { type: 'checklist', items: [
      'Rédiger la page de vente de ton offre (utilise le Template ressource #8)',
      'Créer la séquence email de bienvenue (3 emails : valeur / histoire / offre)',
      'Configurer le paiement en ligne (Stripe, PayDunya pour l\'Afrique, ou Gumroad)',
      'Faire une story ou un post "Je lance quelque chose" pour créer de l\'anticipation',
      'Contacter 10 personnes dans ta liste/audience pour proposer un accès early bird',
      'Fixer ton prix de lancement (20–30% moins cher que le prix final)',
      'Préparer 3 témoignages ou preuves sociales (même si tu dois tester gratuitement)',
    ]},
    { type: 'heading', content: '📅 Semaine 4 — Lancement (Jours 22–30)' },
    { type: 'checklist', items: [
      'Envoyer l\'email de lancement à toute ta liste',
      'Faire un live ou une story de lancement sur ton canal principal',
      'Publier 5 posts pendant la semaine de lancement (témoignages, FAQ, dernière chance)',
      'Traiter chaque objection dans tes DMs ou commentaires personnellement',
      'Analyser tes stats à mi-lancement et ajuster si nécessaire',
      'Envoyer l\'email de "dernière chance" (J-24h)',
      'Clôturer, célébrer et noter ce qui a fonctionné / ce qui n\'a pas marché',
    ]},
    { type: 'callout', label: '💡 Conseil clé', content: 'Ne cherche pas la perfection. Un business imparfait lancé vaut infiniment plus qu\'un business parfait qui reste dans ta tête.' },
  ],
};

const resource2_en: ResourceContent = {
  slug: 'checklist-launch-ai-business-30-days',
  lang: 'en',
  title: 'Checklist: Launch Your AI-Powered Online Business in 30 Days',
  subtitle: '47 concrete actions organized week by week to launch your first digital business.',
  badge: 'Checklist',
  icon: '✅',
  sections: [
    { type: 'intro', content: 'This checklist contains exactly what you need to do to go from zero to a digital business generating its first revenue — in 30 days. No theory. No endless courses. Just the actions in order.' },
    { type: 'heading', content: '📅 Week 1 — Foundations (Days 1–7)' },
    { type: 'checklist', items: [
      'Choose your niche (use ChatGPT to validate: "is this niche profitable in 2026?")',
      'Define your ideal client avatar (age, problem, budget, platform they use)',
      'Analyze 3 direct competitors: their offers, prices, weaknesses',
      'Choose ONE acquisition channel to start (YouTube, TikTok, Instagram or blog)',
      'Create your profile/account on that channel with an AI-optimized bio',
      'Define your main offer: what problem you solve, for whom, at what price',
      'Set up Notion to organize your entire business (free template available)',
    ]},
    { type: 'heading', content: '📅 Week 2 — Content Creation (Days 8–14)' },
    { type: 'checklist', items: [
      'Create 5 value-packed posts/videos (use the Prompt Pack resource #3)',
      'Write an "About" page that converts (problem → solution → credibility)',
      'Create a simple landing page with Carrd or Systeme.io (free)',
      'Set up an email autoresponder (Brevo or Beehiiv — free up to 2,500 contacts)',
      'Create a lead magnet (free PDF, checklist, or mini-training)',
      'Publish at least 3 times per week on your main channel',
      'Engage with 10 accounts in your niche every day',
    ]},
    { type: 'heading', content: '📅 Week 3 — Offer & Funnel (Days 15–21)' },
    { type: 'checklist', items: [
      'Write your offer\'s sales page (use the Template resource #8)',
      'Create your welcome email sequence (3 emails: value / story / offer)',
      'Set up online payment (Stripe or Gumroad)',
      'Post a story or "I\'m launching something" post to build anticipation',
      'Reach out to 10 people in your audience to offer early bird access',
      'Set your launch price (20–30% less than final price)',
      'Prepare 3 testimonials or social proof (even if you test for free)',
    ]},
    { type: 'heading', content: '📅 Week 4 — Launch (Days 22–30)' },
    { type: 'checklist', items: [
      'Send the launch email to your entire list',
      'Go live or post a launch story on your main channel',
      'Publish 5 posts during launch week (testimonials, FAQ, last chance)',
      'Handle every objection in DMs or comments personally',
      'Analyze your mid-launch stats and adjust if needed',
      'Send the "last chance" email (24h before close)',
      'Close, celebrate and note what worked / what didn\'t',
    ]},
    { type: 'callout', label: '💡 Key advice', content: 'Don\'t chase perfection. An imperfect business that launches is infinitely more valuable than a perfect one that stays in your head.' },
  ],
};

/* ══════════════════════════════════════════
   RESOURCE 3 — 50 ChatGPT Prompts
══════════════════════════════════════════ */
const resource3_fr: ResourceContent = {
  slug: 'prompt-pack-50-chatgpt',
  lang: 'fr',
  title: 'Prompt Pack : 50 prompts ChatGPT pour créateurs de contenu',
  subtitle: '50 prompts testés et optimisés pour créer du contenu en quelques minutes.',
  badge: 'Pack Gratuit',
  icon: '💬',
  sections: [
    { type: 'intro', content: 'Ces 50 prompts sont le résultat de centaines d\'heures de tests. Chaque prompt a été optimisé pour produire un résultat utilisable directement — pas du contenu générique. Copie, colle, adapte à ton business.' },
    { type: 'heading', content: '✍️ Articles de blog (10 prompts)' },
    { type: 'prompt-block', label: 'Plan d\'article complet', prompt: 'Tu es un expert SEO spécialisé dans [ta niche]. Crée un plan d\'article complet pour le mot-clé "[mot-clé]". Inclus : titre accrocheur, méta-description, introduction, 5 sections H2 avec sous-parties H3, conclusion avec CTA. Format markdown.' },
    { type: 'prompt-block', label: 'Introduction captivante', prompt: 'Écris une introduction de 150 mots pour un article sur "[sujet]". Commence par une statistique choc ou une question provocatrice. Adresse le problème principal du lecteur et annonce ce qu\'il va apprendre. Ton : direct, sans jargon.' },
    { type: 'prompt-block', label: 'Section H2 développée', prompt: 'Développe la section "[titre H2]" pour un article sur "[sujet]". 300–400 mots. Inclus un exemple concret, une liste à puces et un conseil actionnable. Public cible : [décrire ton avatar].' },
    { type: 'prompt-block', label: 'Conclusion + CTA', prompt: 'Écris une conclusion de 100 mots pour l\'article "[titre]". Résume les 3 points clés, puis inclus un CTA pour [télécharger / s\'inscrire / acheter]. Rends-le urgent sans être agressif.' },
    { type: 'prompt-block', label: 'FAQ SEO (5 questions)', prompt: 'Génère 5 questions FAQ pour l\'article sur "[sujet]". Format : question en H3 + réponse de 50 mots. Optimise pour la recherche vocale et les featured snippets Google.' },
    { type: 'heading', content: '🎬 Scripts YouTube (10 prompts)' },
    { type: 'prompt-block', label: 'Hook vidéo (15 premières secondes)', prompt: 'Crée 3 versions de hook pour une vidéo YouTube sur "[sujet]". Chaque hook doit provoquer une curiosité ou une promesse forte en 2 phrases. Format : Version A / B / C.' },
    { type: 'prompt-block', label: 'Script complet 8 minutes', prompt: 'Écris un script YouTube de 8 minutes sur "[sujet]". Structure : Hook (15s) → Promesse (30s) → Contenu 5 points (6 min) → Récapitulatif (30s) → CTA (1 min). Ton : [professionnel/décontracté/éducatif]. Inclus les indications de coupe B-roll entre crochets.' },
    { type: 'prompt-block', label: 'Titre + miniature', prompt: 'Génère 5 titres YouTube pour une vidéo sur "[sujet]". Pour chaque titre, décris l\'image de miniature idéale (couleurs, texte, visage/émotion). Optimise pour le CTR.' },
    { type: 'prompt-block', label: 'Description YouTube SEO', prompt: 'Écris la description YouTube pour une vidéo sur "[sujet]". 250 mots. Inclus le mot-clé principal dans les 2 premières lignes, un résumé du contenu, les chapitres timestamps, et 3 liens (site, newsletter, formation).' },
    { type: 'prompt-block', label: 'Réponse aux commentaires', prompt: 'Je reçois ce commentaire sur ma vidéo YouTube : "[commentaire]". Écris 3 réponses différentes selon le ton : 1) chaleureux et engageant, 2) professionnel et informatif, 3) humoristique. Garde chaque réponse sous 100 mots.' },
    { type: 'heading', content: '📱 Posts LinkedIn (10 prompts)' },
    { type: 'prompt-block', label: 'Post storytelling', prompt: 'Écris un post LinkedIn storytelling sur [une leçon apprise / un échec / un succès]. Structure : accroche 1 ligne → histoire personnelle (3–4 paragraphes courts) → enseignement → question finale. 250–300 mots. Pas de hashtags sur les mots du texte.' },
    { type: 'prompt-block', label: 'Post liste "X choses que..."', prompt: 'Crée un post LinkedIn "5 choses que [ton public] ne sait pas encore sur [sujet]". Accroche choc → liste numérotée avec explication courte pour chaque point → CTA pour commenter. 200 mots max.' },
    { type: 'prompt-block', label: 'Post prise de position', prompt: 'Écris un post LinkedIn de prise de position sur "[opinion contraire à la norme]" dans [ta niche]. Défends ce point de vue avec 2 arguments + un exemple. Ton : confiant mais pas arrogant. 200 mots.' },
    { type: 'heading', content: '📧 Newsletters (10 prompts)' },
    { type: 'prompt-block', label: 'Email de bienvenue', prompt: 'Écris l\'email de bienvenue pour les nouveaux abonnés de ma newsletter sur [sujet]. Contenu : remerciement sincère, ce qu\'ils vont recevoir, une valeur immédiate (conseil ou ressource), et une question pour mieux les connaître. 250 mots. Objet : surprenant et personnalisé.' },
    { type: 'prompt-block', label: 'Newsletter hebdomadaire', prompt: 'Écris une newsletter de 400 mots sur le sujet de la semaine : "[sujet]". Structure : anecdote d\'intro → 3 insights actionnables numérotés → citation inspirante → CTA vers [article/produit/formulaire]. Ton : comme un ami expert qui écrit à un ami.' },
    { type: 'prompt-block', label: 'Email de vente (soft sell)', prompt: 'Écris un email de vente soft pour [produit/formation]. Ne mentionne le prix qu\'à la fin. Commence par raconter la transformation d\'un client, puis explique comment [produit] y a contribué. CTA final : bouton "Voir les détails". 300 mots.' },
    { type: 'heading', content: '🎵 Scripts TikTok (10 prompts)' },
    { type: 'prompt-block', label: 'Script TikTok éducatif 60s', prompt: 'Crée un script TikTok de 60 secondes sur "[sujet]". Structure : accroche choc (3s) → promesse (5s) → 3 points clés de 15s chacun → conclusion + CTA (7s). Format : texte parlé + [indication visuelle entre crochets].' },
    { type: 'prompt-block', label: 'Série TikTok 5 épisodes', prompt: 'Planifie une série TikTok de 5 épisodes sur "[thème général]". Pour chaque épisode : titre accrocheur, durée recommandée, hook d\'ouverture, 3 points couverts, tease pour l\'épisode suivant.' },
  ],
};

const resource3_en: ResourceContent = {
  slug: 'prompt-pack-50-chatgpt',
  lang: 'en',
  title: 'Prompt Pack: 50 ChatGPT Prompts for Content Creators',
  subtitle: '50 tested and optimized prompts to create content in minutes.',
  badge: 'Free Pack',
  icon: '💬',
  sections: [
    { type: 'intro', content: 'These 50 prompts are the result of hundreds of hours of testing. Each prompt has been optimized to produce directly usable output — not generic content. Copy, paste, adapt to your business.' },
    { type: 'heading', content: '✍️ Blog Articles (10 prompts)' },
    { type: 'prompt-block', label: 'Full article outline', prompt: 'You are an SEO expert specialized in [your niche]. Create a complete article outline for the keyword "[keyword]". Include: catchy title, meta description, introduction, 5 H2 sections with H3 sub-sections, conclusion with CTA. Format: markdown.' },
    { type: 'prompt-block', label: 'Captivating introduction', prompt: 'Write a 150-word introduction for an article on "[topic]". Start with a shocking statistic or provocative question. Address the reader\'s main problem and announce what they will learn. Tone: direct, no jargon.' },
    { type: 'prompt-block', label: 'Developed H2 section', prompt: 'Develop the section "[H2 title]" for an article on "[topic]". 300–400 words. Include a concrete example, a bullet list, and an actionable tip. Target audience: [describe your avatar].' },
    { type: 'prompt-block', label: 'Conclusion + CTA', prompt: 'Write a 100-word conclusion for the article "[title]". Summarize the 3 key points, then include a CTA to [download / sign up / buy]. Make it urgent without being aggressive.' },
    { type: 'prompt-block', label: 'SEO FAQ (5 questions)', prompt: 'Generate 5 FAQ questions for the article on "[topic]". Format: question as H3 + 50-word answer. Optimize for voice search and Google featured snippets.' },
    { type: 'heading', content: '🎬 YouTube Scripts (10 prompts)' },
    { type: 'prompt-block', label: 'Video hook (first 15 seconds)', prompt: 'Create 3 hook versions for a YouTube video on "[topic]". Each hook must spark curiosity or make a strong promise in 2 sentences. Format: Version A / B / C.' },
    { type: 'prompt-block', label: '8-minute full script', prompt: 'Write an 8-minute YouTube script on "[topic]". Structure: Hook (15s) → Promise (30s) → 5-point content (6 min) → Recap (30s) → CTA (1 min). Tone: [professional/casual/educational]. Include B-roll cut notes in brackets.' },
    { type: 'prompt-block', label: 'Title + thumbnail', prompt: 'Generate 5 YouTube titles for a video on "[topic]". For each title, describe the ideal thumbnail image (colors, text, face/emotion). Optimize for CTR.' },
    { type: 'prompt-block', label: 'SEO YouTube description', prompt: 'Write a YouTube description for a video on "[topic]". 250 words. Include the main keyword in the first 2 lines, a content summary, chapter timestamps, and 3 links (website, newsletter, course).' },
    { type: 'prompt-block', label: 'Comment replies', prompt: 'I received this comment on my YouTube video: "[comment]". Write 3 different replies: 1) warm and engaging, 2) professional and informative, 3) humorous. Keep each reply under 100 words.' },
    { type: 'heading', content: '📱 LinkedIn Posts (10 prompts)' },
    { type: 'prompt-block', label: 'Storytelling post', prompt: 'Write a LinkedIn storytelling post about [a lesson learned / a failure / a success]. Structure: 1-line hook → personal story (3–4 short paragraphs) → lesson → closing question. 250–300 words. No hashtags inside the text.' },
    { type: 'prompt-block', label: '"X things that..." list post', prompt: 'Create a LinkedIn post "5 things [your audience] doesn\'t know yet about [topic]". Shocking hook → numbered list with a short explanation for each point → CTA to comment. 200 words max.' },
    { type: 'prompt-block', label: 'Opinion/stance post', prompt: 'Write a LinkedIn opinion post on "[contrarian view]" in [your niche]. Defend this point of view with 2 arguments + one example. Tone: confident but not arrogant. 200 words.' },
    { type: 'heading', content: '📧 Newsletters (10 prompts)' },
    { type: 'prompt-block', label: 'Welcome email', prompt: 'Write the welcome email for new subscribers of my newsletter on [topic]. Content: sincere thanks, what they will receive, immediate value (tip or resource), and a question to learn more about them. 250 words. Subject line: surprising and personalized.' },
    { type: 'prompt-block', label: 'Weekly newsletter', prompt: 'Write a 400-word newsletter on this week\'s topic: "[topic]". Structure: intro anecdote → 3 numbered actionable insights → inspiring quote → CTA to [article/product/form]. Tone: like an expert friend writing to a friend.' },
    { type: 'prompt-block', label: 'Soft-sell email', prompt: 'Write a soft-sell email for [product/course]. Only mention the price at the end. Start by telling a client\'s transformation story, then explain how [product] contributed. Final CTA: "See the details" button. 300 words.' },
    { type: 'heading', content: '🎵 TikTok Scripts (10 prompts)' },
    { type: 'prompt-block', label: '60s educational TikTok', prompt: 'Create a 60-second TikTok script on "[topic]". Structure: shocking hook (3s) → promise (5s) → 3 key points of 15s each → conclusion + CTA (7s). Format: spoken text + [visual cue in brackets].' },
    { type: 'prompt-block', label: '5-episode TikTok series', prompt: 'Plan a 5-episode TikTok series on "[general theme]". For each episode: catchy title, recommended length, opening hook, 3 points covered, teaser for the next episode.' },
  ],
};

/* ══════════════════════════════════════════
   RESOURCE 4 — Video Training
══════════════════════════════════════════ */
const resource4_fr: ResourceContent = {
  slug: 'formation-video-premier-revenu-ia',
  lang: 'fr',
  title: 'Formation vidéo : Créer son premier revenu en ligne avec l\'IA',
  subtitle: 'Une formation de 45 minutes qui couvre les fondations pour générer tes premiers revenus digitaux.',
  badge: 'Formation Vidéo',
  icon: '🎬',
  sections: [
    { type: 'intro', content: 'Cette formation de 45 minutes est la version condensée de tout ce que j\'aurais voulu savoir quand j\'ai démarré. Pas de théorie abstraite : du concret, des exemples, des outils, et une feuille de route claire.' },
    { type: 'heading', content: '🎯 Ce que tu vas apprendre' },
    { type: 'checklist', items: [
      'Identifier ta niche rentable en moins de 24h (méthode des 3 cercles)',
      'Choisir ton modèle de revenu : formation, service, affiliation, ou produit digital',
      'Créer ton premier contenu de valeur qui attire des clients sans payer de publicité',
      'Utiliser l\'IA pour produire 10x plus vite sans perdre en authenticité',
      'Configurer ton premier tunnel de vente en moins de 2h (outils gratuits uniquement)',
      'Générer tes 100 premiers euros en ligne — sans audience préexistante',
    ]},
    { type: 'heading', content: '📋 Programme (45 min)' },
    { type: 'table', headers: ['Module', 'Durée', 'Contenu'], rows: [
      ['Module 1', '8 min', 'Mindset & réalité du business digital en 2026'],
      ['Module 2', '10 min', 'Trouver ta niche + valider l\'idée avec l\'IA'],
      ['Module 3', '12 min', 'Créer ta première offre (même sans expertise perçue)'],
      ['Module 4', '10 min', 'Attirer tes premiers clients avec du contenu gratuit'],
      ['Module 5', '5 min', 'Feuille de route 30 jours + ressources complémentaires'],
    ]},
    { type: 'heading', content: '👤 Pour qui est cette formation ?' },
    { type: 'list', items: [
      'Tu veux créer un revenu complémentaire depuis chez toi',
      'Tu n\'as pas encore d\'audience ni de produit',
      'Tu es attiré par l\'IA mais tu ne sais pas par où commencer',
      'Tu as essayé des formations mais tu n\'as jamais lancé quoi que ce soit',
    ]},
    { type: 'callout', label: '🎬 Accès immédiat', content: 'La formation est hébergée sur YouTube (non répertoriée). Clique sur le bouton ci-dessus pour accéder à la vidéo directement. Aucune inscription requise.' },
  ],
};

const resource4_en: ResourceContent = {
  slug: 'video-training-first-online-income-ai',
  lang: 'en',
  title: 'Video Training: Create Your First Online Income with AI (45 min)',
  subtitle: 'A 45-minute training covering the foundations to generate your first digital revenue.',
  badge: 'Video Training',
  icon: '🎬',
  sections: [
    { type: 'intro', content: 'This 45-minute training is the condensed version of everything I wish I had known when I started. No abstract theory: concrete steps, real examples, tools, and a clear roadmap.' },
    { type: 'heading', content: '🎯 What you will learn' },
    { type: 'checklist', items: [
      'Identify your profitable niche in less than 24h (the 3 circles method)',
      'Choose your income model: course, service, affiliate, or digital product',
      'Create your first value content that attracts clients without paid ads',
      'Use AI to produce 10x faster without losing authenticity',
      'Set up your first sales funnel in under 2h (free tools only)',
      'Generate your first $100 online — without a pre-existing audience',
    ]},
    { type: 'heading', content: '📋 Curriculum (45 min)' },
    { type: 'table', headers: ['Module', 'Duration', 'Content'], rows: [
      ['Module 1', '8 min', 'Mindset & reality of digital business in 2026'],
      ['Module 2', '10 min', 'Find your niche + validate the idea with AI'],
      ['Module 3', '12 min', 'Create your first offer (even without perceived expertise)'],
      ['Module 4', '10 min', 'Attract your first clients with free content'],
      ['Module 5', '5 min', '30-day roadmap + additional resources'],
    ]},
    { type: 'heading', content: '👤 Who is this training for?' },
    { type: 'list', items: [
      'You want to create a side income from home',
      'You don\'t yet have an audience or a product',
      'You\'re drawn to AI but don\'t know where to start',
      'You\'ve tried courses before but never actually launched anything',
    ]},
    { type: 'callout', label: '🎬 Instant access', content: 'The training is hosted on YouTube (unlisted). Click the button above to access the video directly. No sign-up required.' },
  ],
};

/* ══════════════════════════════════════════
   RESOURCE 5 — 30-Day Content Plan Template
══════════════════════════════════════════ */
const resource5_fr: ResourceContent = {
  slug: 'template-plan-contenu-30-jours',
  lang: 'fr',
  title: 'Template : Plan de contenu 30 jours (TikTok + YouTube + Blog)',
  subtitle: 'Un Google Sheets prêt à l\'emploi avec 30 idées de contenu par plateforme.',
  badge: 'Template',
  icon: '📅',
  sections: [
    { type: 'intro', content: 'Ce template Google Sheets te fait gagner des heures de planification. Chaque semaine est organisée par pilier thématique, avec des idées adaptées aux trois plateformes principales. Tu n\'as plus qu\'à personnaliser avec ta niche.' },
    { type: 'heading', content: '📊 Structure du template' },
    { type: 'table', headers: ['Onglet', 'Contenu'], rows: [
      ['Vue calendrier', 'Calendrier mensuel avec les 30 jours remplis'],
      ['TikTok (30 idées)', 'Format court, hooks, angles, durées recommandées'],
      ['YouTube (30 idées)', 'Titres + angles + durées + idées de miniatures'],
      ['Blog (30 idées)', 'Mots-clés + titres H1 + angles SEO'],
      ['Banque d\'idées', '100+ idées supplémentaires classées par catégorie'],
      ['Tracker de publication', 'Suivi des publications, vues, engagement'],
    ]},
    { type: 'heading', content: '🗂️ Les 5 piliers thématiques inclus' },
    { type: 'numbered', items: [
      '**Éducation** — Apprendre quelque chose d\'utile à ton audience (tutoriels, explications)',
      '**Inspiration** — Histoires, success stories, motivations, citations commentées',
      '**Promotion** — Présenter ton offre, tes services, tes ressources (20% max)',
      '**Engagement** — Questions, sondages, controverses légères, challenges',
      '**Coulisses** — Montrer ton processus, tes outils, ta journée type',
    ]},
    { type: 'heading', content: '📝 Exemple de semaine type' },
    { type: 'table', headers: ['Jour', 'Plateforme', 'Type', 'Exemple d\'idée'], rows: [
      ['Lundi', 'TikTok', 'Éducation', '"3 outils IA que tu n\'utilises pas encore"'],
      ['Mardi', 'Blog', 'SEO', '"Comment utiliser ChatGPT pour écrire un article de blog"'],
      ['Mercredi', 'TikTok', 'Engagement', '"Quel outil IA préfères-tu ? Vote en commentaire"'],
      ['Jeudi', 'YouTube', 'Tutoriel', '"Tuto complet : créer un business en 30 jours avec l\'IA"'],
      ['Vendredi', 'TikTok', 'Coulisses', '"Ma routine matinale de créateur de contenu IA"'],
      ['Samedi', 'Blog', 'Inspiration', '"Comment j\'ai généré mes 100 premiers euros en ligne"'],
    ]},
    { type: 'callout', label: '💡 Comment l\'utiliser', content: 'Fais une copie du Google Sheets (Fichier → Faire une copie). Remplace les exemples par tes idées personnalisées. Coche les cases au fur et à mesure que tu publies.' },
  ],
};

const resource5_en: ResourceContent = {
  slug: 'template-30-day-content-plan',
  lang: 'en',
  title: 'Template: 30-Day Content Plan (TikTok + YouTube + Blog)',
  subtitle: 'A ready-to-use Google Sheets with 30 content ideas per platform.',
  badge: 'Template',
  icon: '📅',
  sections: [
    { type: 'intro', content: 'This Google Sheets template saves you hours of planning. Each week is organized by thematic pillar, with ideas adapted to the three main platforms. All you need to do is customize it for your niche.' },
    { type: 'heading', content: '📊 Template structure' },
    { type: 'table', headers: ['Tab', 'Content'], rows: [
      ['Calendar view', 'Monthly calendar with all 30 days filled in'],
      ['TikTok (30 ideas)', 'Short format, hooks, angles, recommended lengths'],
      ['YouTube (30 ideas)', 'Titles + angles + lengths + thumbnail ideas'],
      ['Blog (30 ideas)', 'Keywords + H1 titles + SEO angles'],
      ['Idea bank', '100+ extra ideas organized by category'],
      ['Publishing tracker', 'Track publications, views, engagement'],
    ]},
    { type: 'heading', content: '🗂️ The 5 included thematic pillars' },
    { type: 'numbered', items: [
      '**Education** — Teach your audience something useful (tutorials, explanations)',
      '**Inspiration** — Stories, success stories, motivations, commented quotes',
      '**Promotion** — Showcase your offer, services, resources (max 20%)',
      '**Engagement** — Questions, polls, light controversy, challenges',
      '**Behind the scenes** — Show your process, tools, typical day',
    ]},
    { type: 'heading', content: '📝 Example week' },
    { type: 'table', headers: ['Day', 'Platform', 'Type', 'Example idea'], rows: [
      ['Monday', 'TikTok', 'Education', '"3 AI tools you\'re not using yet"'],
      ['Tuesday', 'Blog', 'SEO', '"How to use ChatGPT to write a blog post"'],
      ['Wednesday', 'TikTok', 'Engagement', '"Which AI tool do you prefer? Vote in comments"'],
      ['Thursday', 'YouTube', 'Tutorial', '"Full tutorial: build a business in 30 days with AI"'],
      ['Friday', 'TikTok', 'Behind scenes', '"My morning routine as an AI content creator"'],
      ['Saturday', 'Blog', 'Inspiration', '"How I made my first $100 online"'],
    ]},
    { type: 'callout', label: '💡 How to use it', content: 'Make a copy of the Google Sheets (File → Make a copy). Replace the examples with your own personalized ideas. Check the boxes as you publish.' },
  ],
};

/* ══════════════════════════════════════════
   RESOURCE 6 — SEO Checklist
══════════════════════════════════════════ */
const resource6_fr: ResourceContent = {
  slug: 'checklist-seo-27-points',
  lang: 'fr',
  title: 'Checklist SEO : 27 points essentiels avant de publier',
  subtitle: 'Les 27 vérifications incontournables avant de publier un article de blog.',
  badge: 'Checklist',
  icon: '🔍',
  sections: [
    { type: 'intro', content: 'La plupart des articles de blog ne rankent jamais parce que des erreurs SEO basiques ont été manquées à la publication. Cette checklist en 27 points te garantit de ne rien oublier d\'essentiel.' },
    { type: 'heading', content: '🔤 SEO On-Page (10 points)' },
    { type: 'checklist', items: [
      'Le mot-clé principal est dans le titre H1 (de préférence au début)',
      'La balise title fait moins de 60 caractères et inclut le mot-clé',
      'La méta-description fait 150–160 caractères et inclut le mot-clé + CTA',
      'Le mot-clé principal apparaît dans les 100 premiers mots de l\'article',
      'Les sous-titres H2/H3 contiennent des mots-clés secondaires naturellement',
      'La densité du mot-clé est entre 0,5% et 1,5% (pas de keyword stuffing)',
      'L\'URL est courte, lisible, et contient le mot-clé (ex: /checklist-seo)',
      'Le contenu fait minimum 1 200 mots pour un article informatif',
      'Les mots LSI (synonymes sémantiques) sont utilisés naturellement',
      'Le balisage Schema Article est configuré (via plugin SEO ou manuel)',
    ]},
    { type: 'heading', content: '🖼️ Images & médias (5 points)' },
    { type: 'checklist', items: [
      'Toutes les images ont un attribut alt descriptif avec le mot-clé si pertinent',
      'Les images sont compressées (WebP ou JPEG optimisé, < 100 KB si possible)',
      'Les attributs width/height sont définis sur chaque image (évite le CLS)',
      'L\'image featured / OG image est de 1200×630px avec un titre lisible',
      'Pas de droits d\'auteur manquants sur les images utilisées',
    ]},
    { type: 'heading', content: '🔗 Liens (5 points)' },
    { type: 'checklist', items: [
      '2–5 liens internes vers des articles connexes de ton site',
      '1–3 liens externes vers des sources fiables et à jour (évite les concurrents directs)',
      'Tous les liens ouvrent correctement (pas de 404)',
      'Les ancres de liens sont descriptives (pas "cliquer ici")',
      'Les liens externes sont en nofollow si nécessaire',
    ]},
    { type: 'heading', content: '⚡ Performance & technique (7 points)' },
    { type: 'checklist', items: [
      'La page se charge en moins de 3 secondes (test via PageSpeed Insights)',
      'Le site est mobile-friendly (test via Google Mobile-Friendly Test)',
      'Pas d\'erreur console JavaScript bloquante',
      'Le canonical tag est correctement configuré',
      'La date de publication / mise à jour est visible et correcte',
      'L\'article est ajouté au sitemap XML',
      'Le titre est partageable sur les réseaux sociaux (test prévisualisation Twitter/OG)',
    ]},
    { type: 'callout', label: '🚀 Bonus', content: 'Après publication, soumets l\'URL dans Google Search Console (Inspection d\'URL → Demander l\'indexation). Ça accélère l\'indexation de quelques jours à quelques heures.' },
  ],
};

const resource6_en: ResourceContent = {
  slug: 'seo-checklist-27-points',
  lang: 'en',
  title: 'SEO Checklist: 27 Essential Points Before You Publish',
  subtitle: 'The 27 must-check items before publishing a blog post.',
  badge: 'Checklist',
  icon: '🔍',
  sections: [
    { type: 'intro', content: 'Most blog articles never rank because basic SEO errors were missed at publication. This 27-point checklist guarantees you won\'t miss anything essential.' },
    { type: 'heading', content: '🔤 On-Page SEO (10 points)' },
    { type: 'checklist', items: [
      'The main keyword is in the H1 title (preferably at the beginning)',
      'The title tag is under 60 characters and includes the keyword',
      'The meta description is 150–160 characters and includes the keyword + CTA',
      'The main keyword appears in the first 100 words of the article',
      'H2/H3 subheadings naturally contain secondary keywords',
      'Keyword density is between 0.5% and 1.5% (no keyword stuffing)',
      'The URL is short, readable, and contains the keyword (e.g., /seo-checklist)',
      'Content is at least 1,200 words for an informational article',
      'LSI words (semantic synonyms) are used naturally',
      'Article Schema markup is configured (via SEO plugin or manually)',
    ]},
    { type: 'heading', content: '🖼️ Images & media (5 points)' },
    { type: 'checklist', items: [
      'All images have a descriptive alt attribute with the keyword if relevant',
      'Images are compressed (WebP or optimized JPEG, < 100 KB if possible)',
      'Width/height attributes are set on every image (prevents CLS)',
      'Featured / OG image is 1200×630px with a readable title',
      'No missing copyright on images used',
    ]},
    { type: 'heading', content: '🔗 Links (5 points)' },
    { type: 'checklist', items: [
      '2–5 internal links to related articles on your site',
      '1–3 external links to reliable, up-to-date sources (avoid direct competitors)',
      'All links open correctly (no 404s)',
      'Link anchors are descriptive (not "click here")',
      'External links are nofollow where necessary',
    ]},
    { type: 'heading', content: '⚡ Performance & technical (7 points)' },
    { type: 'checklist', items: [
      'Page loads in under 3 seconds (test via PageSpeed Insights)',
      'Site is mobile-friendly (test via Google Mobile-Friendly Test)',
      'No blocking JavaScript console errors',
      'Canonical tag is correctly configured',
      'Publication / update date is visible and correct',
      'Article is added to the XML sitemap',
      'Title is shareable on social media (test Twitter/OG preview)',
    ]},
    { type: 'callout', label: '🚀 Bonus', content: 'After publishing, submit the URL in Google Search Console (URL Inspection → Request indexing). It speeds up indexing from days to hours.' },
  ],
};

/* ══════════════════════════════════════════
   RESOURCE 7 — AI Glossary
══════════════════════════════════════════ */
const resource7_fr: ResourceContent = {
  slug: 'glossaire-ia-150-termes',
  lang: 'fr',
  title: 'Glossaire IA : 150 termes expliqués simplement',
  subtitle: 'Un lexique complet pour naviguer dans l\'univers de l\'IA sans se perdre.',
  badge: 'Guide PDF',
  icon: '📖',
  sections: [
    { type: 'intro', content: 'L\'IA a son propre vocabulaire — et il évolue vite. Ce glossaire couvre les 150 termes les plus importants que tu vas rencontrer dans les articles, podcasts et outils IA. Classés par catégorie, expliqués sans jargon inutile.' },
    { type: 'heading', content: '🧠 Termes fondamentaux (extrait)' },
    { type: 'table', headers: ['Terme', 'Définition simple'], rows: [
      ['LLM', 'Large Language Model — un modèle d\'IA entraîné sur des milliards de textes pour comprendre et générer du langage naturel (ex: GPT-4, Claude)'],
      ['Prompt', 'L\'instruction que tu donnes à une IA. La qualité du prompt détermine directement la qualité de la réponse.'],
      ['Fine-tuning', 'Processus d\'entraînement supplémentaire d\'un LLM sur des données spécifiques pour le spécialiser dans un domaine.'],
      ['RAG', 'Retrieval-Augmented Generation — technique qui permet à un LLM de chercher dans une base de données externe avant de répondre.'],
      ['Token', 'Unité de texte utilisée par les LLMs. Environ 1 token ≈ 0,75 mot en anglais. Les prix des APIs sont calculés en tokens.'],
      ['Hallucination', 'Quand une IA invente des informations fausses mais les présente avec confiance. Toujours vérifier les faits importants.'],
      ['Embedding', 'Représentation mathématique (vecteur) d\'un texte, permettant de comparer la similarité entre documents.'],
      ['Agent IA', 'Système IA capable d\'effectuer des actions autonomes en utilisant des outils (navigation web, écriture de code, etc.)'],
      ['Context window', 'Quantité maximale de texte qu\'un LLM peut traiter en une seule fois. GPT-4o : 128k tokens. Claude 3.7 : 200k tokens.'],
      ['Multimodal', 'Un modèle IA capable de traiter plusieurs types de données : texte, image, audio, vidéo.'],
    ]},
    { type: 'heading', content: '🎨 Termes IA générative (extrait)' },
    { type: 'table', headers: ['Terme', 'Définition simple'], rows: [
      ['Diffusion model', 'Architecture d\'IA utilisée pour générer des images (Stable Diffusion, Midjourney). Part du bruit pour créer une image.'],
      ['Negative prompt', 'Instructions disant à l\'IA ce qu\'il NE FAUT PAS inclure dans l\'image générée.'],
      ['CFG Scale', 'Paramètre contrôlant à quel point l\'IA suit ton prompt (vs sa propre créativité). Plus haut = plus fidèle au prompt.'],
      ['LORA', 'Technique de fine-tuning légère pour entraîner un style visuel personnalisé sur un modèle de diffusion.'],
      ['Inpainting', 'Modifier une zone spécifique d\'une image existante avec l\'IA sans toucher au reste.'],
    ]},
    { type: 'heading', content: '⚙️ Termes techniques business (extrait)' },
    { type: 'table', headers: ['Terme', 'Définition simple'], rows: [
      ['API', 'Interface permettant à deux logiciels de communiquer. L\'API ChatGPT permet d\'intégrer GPT-4 dans ton propre outil.'],
      ['Webhook', 'Notification automatique envoyée par un service à un autre quand un événement se produit.'],
      ['Prompt injection', 'Attaque où un utilisateur malveillant insère des instructions cachées dans un prompt pour manipuler l\'IA.'],
      ['AI wrapper', 'Application construite "par-dessus" un modèle IA existant (ex: Jasper est un wrapper autour de GPT).'],
      ['Zero-shot', 'Demander à une IA d\'effectuer une tâche sans lui donner d\'exemple. Opposé de "few-shot" (avec exemples).'],
    ]},
    { type: 'callout', label: '📥 Télécharger le glossaire complet', content: 'La version complète avec les 150 termes, des exemples d\'utilisation et des ressources complémentaires est disponible en PDF après inscription.' },
  ],
};

const resource7_en: ResourceContent = {
  slug: 'ai-glossary-150-terms',
  lang: 'en',
  title: 'AI Glossary: 150 Terms Explained Simply',
  subtitle: 'A complete lexicon to navigate the AI world without getting lost.',
  badge: 'PDF Guide',
  icon: '📖',
  sections: [
    { type: 'intro', content: 'AI has its own vocabulary — and it evolves fast. This glossary covers the 150 most important terms you\'ll encounter in articles, podcasts and AI tools. Organized by category, explained without unnecessary jargon.' },
    { type: 'heading', content: '🧠 Core terms (excerpt)' },
    { type: 'table', headers: ['Term', 'Simple definition'], rows: [
      ['LLM', 'Large Language Model — an AI model trained on billions of texts to understand and generate natural language (e.g., GPT-4, Claude)'],
      ['Prompt', 'The instruction you give to an AI. The quality of the prompt directly determines the quality of the response.'],
      ['Fine-tuning', 'The process of further training an LLM on specific data to specialize it in a domain.'],
      ['RAG', 'Retrieval-Augmented Generation — a technique that allows an LLM to search an external database before responding.'],
      ['Token', 'Unit of text used by LLMs. Approximately 1 token ≈ 0.75 words in English. API prices are calculated in tokens.'],
      ['Hallucination', 'When an AI invents false information but presents it confidently. Always verify important facts.'],
      ['Embedding', 'Mathematical representation (vector) of text, enabling comparison of similarity between documents.'],
      ['AI Agent', 'AI system capable of autonomous actions using tools (web browsing, code writing, etc.)'],
      ['Context window', 'Maximum amount of text an LLM can process at once. GPT-4o: 128k tokens. Claude 3.7: 200k tokens.'],
      ['Multimodal', 'An AI model capable of processing multiple data types: text, image, audio, video.'],
    ]},
    { type: 'heading', content: '🎨 Generative AI terms (excerpt)' },
    { type: 'table', headers: ['Term', 'Simple definition'], rows: [
      ['Diffusion model', 'AI architecture used to generate images (Stable Diffusion, Midjourney). Starts from noise to create an image.'],
      ['Negative prompt', 'Instructions telling the AI what NOT to include in the generated image.'],
      ['CFG Scale', 'Parameter controlling how closely the AI follows your prompt (vs. its own creativity). Higher = more faithful to prompt.'],
      ['LORA', 'Lightweight fine-tuning technique to train a custom visual style on a diffusion model.'],
      ['Inpainting', 'Modifying a specific area of an existing image with AI without touching the rest.'],
    ]},
    { type: 'heading', content: '⚙️ Business technical terms (excerpt)' },
    { type: 'table', headers: ['Term', 'Simple definition'], rows: [
      ['API', 'Interface allowing two software programs to communicate. The ChatGPT API lets you integrate GPT-4 into your own tool.'],
      ['Webhook', 'Automatic notification sent by one service to another when an event occurs.'],
      ['Prompt injection', 'Attack where a malicious user inserts hidden instructions into a prompt to manipulate the AI.'],
      ['AI wrapper', 'Application built "on top of" an existing AI model (e.g., Jasper is a wrapper around GPT).'],
      ['Zero-shot', 'Asking an AI to perform a task without giving it examples. Opposite of "few-shot" (with examples).'],
    ]},
    { type: 'callout', label: '📥 Download the full glossary', content: 'The complete version with all 150 terms, usage examples and additional resources is available as a PDF after sign-up.' },
  ],
};

/* ══════════════════════════════════════════
   RESOURCE 8 — Sales Page Template
══════════════════════════════════════════ */
const resource8_fr: ResourceContent = {
  slug: 'template-page-de-vente',
  lang: 'fr',
  title: 'Template : Page de vente qui convertit (structure complète)',
  subtitle: 'La structure copywriting utilisée pour générer des milliers d\'euros de ventes en ligne.',
  badge: 'Template',
  icon: '💰',
  sections: [
    { type: 'intro', content: 'Une page de vente suit toujours la même structure psychologique. Ce template te donne exactement quoi écrire dans chaque section — avec des formules testées et des exemples concrets.' },
    { type: 'heading', content: '📐 Structure complète (12 blocs)' },
    { type: 'numbered', items: [
      '**Headline principale** — Promesse de transformation en 1 ligne (formule : [Résultat désiré] + [Délai] + [Sans objection principale])',
      '**Sous-titre** — Développe la promesse, cible le problème principal, 2 lignes max',
      '**Section "Pour qui"** — 3–5 bullets qui font dire "c\'est exactement pour moi"',
      '**Histoire / Credibilité** — Ton parcours en lien avec le problème du client (pas ton CV)',
      '**Le problème** — Agite la douleur, montre que tu comprends mieux que quiconque',
      '**La solution** — Présente ton offre comme LA réponse logique au problème',
      '**Contenu / ce que tu reçois** — Détaille chaque module/livrable avec la valeur perçue',
      '**Témoignages** — 3 minimum, avec photo + prénom + résultat spécifique',
      '**FAQ** — 5–8 questions qui lèvent les objections restantes',
      '**Garantie** — Réduit le risque perçu (satisfait ou remboursé, accès à vie, etc.)',
      '**Prix + CTA** — Présente le prix après la valeur, jamais avant',
      '**Urgence/Rareté** — Raison légitime d\'agir maintenant (date limite, bonus early)',
    ]},
    { type: 'heading', content: '✍️ Formules de copywriting incluses' },
    { type: 'prompt-block', label: 'Formule Headline (PAS)', prompt: 'Problème : [Ce que le client veut éviter]\nAgitation : [Conséquences si le problème persiste]\nSolution : [Ce que tu proposes]\n\nEx: "Tu travailles 60h/semaine et tu n\'avances pas ? Découvre comment utiliser l\'IA pour diviser ton temps de travail par 3 en 30 jours."' },
    { type: 'prompt-block', label: 'Formule Bénéfice (FAB)', prompt: 'Feature (Caractéristique) → Advantage (Avantage) → Benefit (Bénéfice)\n\nEx: "Accès à vie [F] → Tu peux regarder les vidéos quand tu veux [A] → Tu apprends à ton rythme sans aucune pression [B]"' },
    { type: 'prompt-block', label: 'Formule Témoignage', prompt: '"Avant [produit], j\'avais [problème]. Après [durée], j\'ai obtenu [résultat spécifique]. Ce qui m\'a le plus surpris c\'est [insight inattendu]." — [Prénom], [Ville/Pays]' },
    { type: 'callout', label: '💡 Règle d\'or', content: 'Ne parle jamais de toi. Parle toujours de ton client. Remplace chaque "Je/Mon/Ma" par "Tu/Ton/Ta" et vois la différence de connexion émotionnelle.' },
  ],
};

const resource8_en: ResourceContent = {
  slug: 'sales-page-template',
  lang: 'en',
  title: 'Template: Sales Page That Converts (Complete Structure)',
  subtitle: 'The copywriting structure used to generate thousands of dollars in online sales.',
  badge: 'Template',
  icon: '💰',
  sections: [
    { type: 'intro', content: 'A sales page always follows the same psychological structure. This template tells you exactly what to write in each section — with tested formulas and concrete examples.' },
    { type: 'heading', content: '📐 Complete structure (12 blocks)' },
    { type: 'numbered', items: [
      '**Main headline** — Transformation promise in 1 line (formula: [Desired result] + [Timeline] + [Without main objection])',
      '**Subtitle** — Develops the promise, targets the main problem, 2 lines max',
      '"**For who" section** — 3–5 bullets that make them say "that\'s exactly for me"',
      '**Story / Credibility** — Your journey related to the client\'s problem (not your CV)',
      '**The problem** — Agitate the pain, show you understand better than anyone',
      '**The solution** — Present your offer as THE logical response to the problem',
      '**Content / what they receive** — Detail each module/deliverable with perceived value',
      '**Testimonials** — Minimum 3, with photo + name + specific result',
      '**FAQ** — 5–8 questions that remove remaining objections',
      '**Guarantee** — Reduces perceived risk (money-back, lifetime access, etc.)',
      '**Price + CTA** — Present the price after the value, never before',
      '**Urgency/Scarcity** — Legitimate reason to act now (deadline, early bonus)',
    ]},
    { type: 'heading', content: '✍️ Included copywriting formulas' },
    { type: 'prompt-block', label: 'Headline formula (PAS)', prompt: 'Problem: [What the client wants to avoid]\nAgitation: [Consequences if the problem persists]\nSolution: [What you offer]\n\nEx: "Working 60h/week and not moving forward? Discover how to use AI to cut your work time by 3x in 30 days."' },
    { type: 'prompt-block', label: 'Benefit formula (FAB)', prompt: 'Feature → Advantage → Benefit\n\nEx: "Lifetime access [F] → Watch the videos whenever you want [A] → Learn at your own pace with zero pressure [B]"' },
    { type: 'prompt-block', label: 'Testimonial formula', prompt: '"Before [product], I had [problem]. After [time], I achieved [specific result]. What surprised me most was [unexpected insight]." — [First name], [City/Country]' },
    { type: 'callout', label: '💡 Golden rule', content: 'Never talk about yourself. Always talk about your client. Replace every "I/My/Mine" with "You/Your/Yours" and see the difference in emotional connection.' },
  ],
};

/* ══════════════════════════════════════════
   RESOURCE 9 — My Complete Stack
══════════════════════════════════════════ */
const resource9_fr: ResourceContent = {
  slug: 'ma-stack-complete',
  lang: 'fr',
  title: 'Ma stack complète : les outils que j\'utilise au quotidien',
  subtitle: 'La liste exhaustive de tous les outils que j\'utilise dans mon business, avec les alternatives gratuites.',
  badge: 'Accès immédiat',
  icon: '⚙️',
  sections: [
    { type: 'intro', content: 'Voici exactement les outils que j\'utilise pour gérer mon business digital — contenu, formation, newsletter, réseaux sociaux, automatisation. J\'ai inclus le prix réel que je paie et une alternative gratuite pour chaque catégorie.' },
    { type: 'heading', content: '✍️ Création de contenu' },
    { type: 'tool-card', name: 'Claude Pro (Anthropic)', category: 'Rédaction principale', price: '$20/mois', use: 'Articles de blog longs, scripts, analyses, code', free: 'Claude.ai (limité)' },
    { type: 'tool-card', name: 'ChatGPT Plus', category: 'Idéation & recherche', price: '$20/mois', use: 'Brainstorming, recherches rapides, images DALL-E 3', free: 'ChatGPT gratuit (GPT-4o mini)' },
    { type: 'tool-card', name: 'Canva Pro', category: 'Visuels & design', price: '$15/mois', use: 'Posts Instagram, miniatures YouTube, slides formations', free: 'Canva gratuit' },
    { type: 'tool-card', name: 'Midjourney v7', category: 'Illustrations', price: '$10/mois', use: 'Couvertures d\'articles, visuels de marque premium', free: 'Stable Diffusion (local)' },
    { type: 'heading', content: '📧 Email & Newsletter' },
    { type: 'tool-card', name: 'Beehiiv (Scale)', category: 'Newsletter principale', price: '$39/mois', use: 'Envoi newsletter, segmentation, analytics avancés', free: 'Beehiiv gratuit (jusqu\'à 2 500 abonnés)' },
    { type: 'tool-card', name: 'Brevo (ex-Sendinblue)', category: 'Emails transactionnels', price: 'Gratuit', use: 'Emails de bienvenue, notifications, confirmations commande', free: 'Gratuit jusqu\'à 300 emails/jour' },
    { type: 'heading', content: '🎬 Vidéo & Audio' },
    { type: 'tool-card', name: 'Descript', category: 'Montage vidéo', price: '$24/mois', use: 'Montage par texte, suppression silences, sous-titres auto', free: 'Descript gratuit (1h/mois)' },
    { type: 'tool-card', name: 'ElevenLabs (Starter)', category: 'Voix off', price: '$5/mois', use: 'Voix off YouTube, clone vocal, narration PDF', free: 'ElevenLabs gratuit (10k chars)' },
    { type: 'heading', content: '⚙️ Automatisation & Business' },
    { type: 'tool-card', name: 'Make (Core)', category: 'Automatisation', price: '$9/mois', use: 'Workflows : Beehiiv → Notion, Gumroad → email, etc.', free: 'Make gratuit (1 000 ops/mois)' },
    { type: 'tool-card', name: 'Notion (Business)', category: 'Gestion de projet', price: '$16/mois', use: 'Base de données articles, CRM clients, planning contenu', free: 'Notion gratuit' },
    { type: 'tool-card', name: 'Gumroad', category: 'Vente de produits digitaux', price: '10% de commission', use: 'Vente de formations, PDF, templates', free: 'Gumroad (gratuit, commission 10%)' },
    { type: 'heading', content: '🌐 Site web & SEO' },
    { type: 'tool-card', name: 'Vercel (Pro)', category: 'Hébergement', price: '$20/mois', use: 'Deploy du site React, domaines, edge functions', free: 'Vercel gratuit (hobby)' },
    { type: 'tool-card', name: 'Ahrefs (Lite)', category: 'SEO & recherche mots-clés', price: '$29/mois', use: 'Analyse de backlinks, recherche mots-clés, audit site', free: 'Google Search Console + Ubersuggest' },
    { type: 'callout', label: '💰 Budget total mensuel', content: 'Mon budget outils : ~$183/mois. En utilisant toutes les alternatives gratuites listées, tu peux démarrer avec $0/mois et passer aux payants uniquement quand tu génères des revenus.' },
  ],
};

const resource9_en: ResourceContent = {
  slug: 'my-complete-stack',
  lang: 'en',
  title: 'My Complete Stack: Tools I Use Every Day',
  subtitle: 'The full list of every tool I use in my business, with free alternatives for every category.',
  badge: 'Instant access',
  icon: '⚙️',
  sections: [
    { type: 'intro', content: 'Here are exactly the tools I use to run my digital business — content, courses, newsletter, social media, automation. I\'ve included the real price I pay and a free alternative for every category.' },
    { type: 'heading', content: '✍️ Content Creation' },
    { type: 'tool-card', name: 'Claude Pro (Anthropic)', category: 'Main writing', price: '$20/month', use: 'Long blog articles, scripts, analyses, code', free: 'Claude.ai (limited)' },
    { type: 'tool-card', name: 'ChatGPT Plus', category: 'Ideation & research', price: '$20/month', use: 'Brainstorming, quick research, DALL-E 3 images', free: 'Free ChatGPT (GPT-4o mini)' },
    { type: 'tool-card', name: 'Canva Pro', category: 'Visuals & design', price: '$15/month', use: 'Instagram posts, YouTube thumbnails, course slides', free: 'Free Canva' },
    { type: 'tool-card', name: 'Midjourney v7', category: 'Illustrations', price: '$10/month', use: 'Article covers, premium brand visuals', free: 'Stable Diffusion (local)' },
    { type: 'heading', content: '📧 Email & Newsletter' },
    { type: 'tool-card', name: 'Beehiiv (Scale)', category: 'Main newsletter', price: '$39/month', use: 'Newsletter sending, segmentation, advanced analytics', free: 'Free Beehiiv (up to 2,500 subscribers)' },
    { type: 'tool-card', name: 'Brevo (ex-Sendinblue)', category: 'Transactional emails', price: 'Free', use: 'Welcome emails, notifications, order confirmations', free: 'Free up to 300 emails/day' },
    { type: 'heading', content: '🎬 Video & Audio' },
    { type: 'tool-card', name: 'Descript', category: 'Video editing', price: '$24/month', use: 'Text-based editing, silence removal, auto subtitles', free: 'Free Descript (1h/month)' },
    { type: 'tool-card', name: 'ElevenLabs (Starter)', category: 'Voice-over', price: '$5/month', use: 'YouTube voice-overs, voice clone, PDF narration', free: 'Free ElevenLabs (10k chars)' },
    { type: 'heading', content: '⚙️ Automation & Business' },
    { type: 'tool-card', name: 'Make (Core)', category: 'Automation', price: '$9/month', use: 'Workflows: Beehiiv → Notion, Gumroad → email, etc.', free: 'Free Make (1,000 ops/month)' },
    { type: 'tool-card', name: 'Notion (Business)', category: 'Project management', price: '$16/month', use: 'Article database, client CRM, content planning', free: 'Free Notion' },
    { type: 'tool-card', name: 'Gumroad', category: 'Digital product sales', price: '10% commission', use: 'Sell courses, PDFs, templates', free: 'Gumroad (free, 10% commission)' },
    { type: 'heading', content: '🌐 Website & SEO' },
    { type: 'tool-card', name: 'Vercel (Pro)', category: 'Hosting', price: '$20/month', use: 'React site deploy, domains, edge functions', free: 'Free Vercel (hobby)' },
    { type: 'tool-card', name: 'Ahrefs (Lite)', category: 'SEO & keyword research', price: '$29/month', use: 'Backlink analysis, keyword research, site audit', free: 'Google Search Console + Ubersuggest' },
    { type: 'callout', label: '💰 Total monthly budget', content: 'My tool budget: ~$183/month. Using all the free alternatives listed, you can start at $0/month and upgrade to paid only once you\'re generating revenue.' },
  ],
};

/* ══════════════════════════════════════════
   EXPORTS
══════════════════════════════════════════ */
export const resourceContents: ResourceContent[] = [
  resource1_fr, resource1_en,
  resource2_fr, resource2_en,
  resource3_fr, resource3_en,
  resource4_fr, resource4_en,
  resource5_fr, resource5_en,
  resource6_fr, resource6_en,
  resource7_fr, resource7_en,
  resource8_fr, resource8_en,
  resource9_fr, resource9_en,
];

// Map: [lang][slug] → content
export const resourceBySlug: Record<string, Record<string, ResourceContent>> = {
  fr: {},
  en: {},
};
for (const r of resourceContents) {
  resourceBySlug[r.lang][r.slug] = r;
}

// Map: resource id (1–9) → slugs
export const resourceSlugById: Record<string, { fr: string; en: string }> = {
  '1': { fr: 'outils-ia-entrepreneurs',             en: 'ai-tools-entrepreneurs' },
  '2': { fr: 'checklist-lancer-business-30-jours',  en: 'checklist-launch-ai-business-30-days' },
  '3': { fr: 'prompt-pack-50-chatgpt',              en: 'prompt-pack-50-chatgpt' },
  '4': { fr: 'formation-video-premier-revenu-ia',   en: 'video-training-first-online-income-ai' },
  '5': { fr: 'template-plan-contenu-30-jours',      en: 'template-30-day-content-plan' },
  '6': { fr: 'checklist-seo-27-points',             en: 'seo-checklist-27-points' },
  '7': { fr: 'glossaire-ia-150-termes',             en: 'ai-glossary-150-terms' },
  '8': { fr: 'template-page-de-vente',              en: 'sales-page-template' },
  '9': { fr: 'ma-stack-complete',                   en: 'my-complete-stack' },
};
