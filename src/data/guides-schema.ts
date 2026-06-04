// Auto-généré depuis les anciens fichiers guide HTML (schemas JSON-LD HowTo + FAQPage).
// Réinjecté via SEOHead dans GuideArticlePage pour conserver les rich results Google.
export const guidesSchema: Record<string, object[]> = {
  "comment-avoir-claude-code-gratuitement": [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "Comment avoir Claude Code gratuitement avec Ollama",
      "description": "Méthode étape par étape pour utiliser Claude Code gratuitement en le branchant sur des modèles IA open-source en local via Ollama.",
      "datePublished": "2026-06-03",
      "dateModified": "2026-06-03",
      "author": {
        "@type": "Person",
        "name": "Oumarou Sanda",
        "url": "https://oumarousanda.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Oumarou Sanda",
        "url": "https://oumarousanda.com"
      },
      "totalTime": "PT20M",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Installer Claude Code",
          "text": "Installez l'outil en ligne de commande Claude Code avec npm."
        },
        {
          "@type": "HowToStep",
          "name": "Installer Ollama",
          "text": "Téléchargez et installez Ollama, le moteur qui fait tourner les modèles IA en local."
        },
        {
          "@type": "HowToStep",
          "name": "Télécharger un modèle open-source",
          "text": "Récupérez un modèle de code open-source comme Qwen2.5-Coder avec la commande ollama pull."
        },
        {
          "@type": "HowToStep",
          "name": "Installer le routeur claude-code-router",
          "text": "Installez le proxy qui traduit les requêtes de Claude Code vers Ollama."
        },
        {
          "@type": "HowToStep",
          "name": "Configurer le routeur",
          "text": "Pointez le routeur vers Ollama dans son fichier de configuration."
        },
        {
          "@type": "HowToStep",
          "name": "Lancer Claude Code",
          "text": "Démarrez Claude Code via le routeur avec la commande ccr code."
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Est-ce légal d'utiliser Claude Code avec Ollama ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui. Claude Code autorise les points d'accès personnalisés via la variable ANTHROPIC_BASE_URL. Vous utilisez des modèles open-source sous licence ouverte, pas les modèles Claude d'Anthropic. Il n'y a aucun piratage ni contournement de paiement."
          }
        },
        {
          "@type": "Question",
          "name": "Claude Code avec Ollama est-il vraiment 100% gratuit ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, hors coût d'électricité. Ollama et les modèles open-source sont gratuits. Vous n'avez besoin d'aucun abonnement, d'aucune clé API payante et d'aucune carte bancaire."
          }
        },
        {
          "@type": "Question",
          "name": "Quelle configuration faut-il pour faire tourner un modèle en local ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Comptez environ 8 Go de RAM pour un modèle 7B, 16 Go pour un 14B et 32 Go ou un GPU pour un 32B. Sans carte graphique dédiée, la génération est plus lente mais reste utilisable pour apprendre."
          }
        },
        {
          "@type": "Question",
          "name": "La qualité est-elle la même que le vrai Claude ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Non. Les modèles open-source en local sont nettement moins puissants que Claude Sonnet ou Opus. Cette méthode est idéale pour apprendre, coder hors ligne et préserver sa vie privée, pas pour égaler la qualité de Claude sur des tâches complexes."
          }
        },
        {
          "@type": "Question",
          "name": "Ça marche sur Windows, Mac et Linux ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui. Ollama, Node.js et claude-code-router fonctionnent sur les trois systèmes. La méthode est identique."
          }
        },
        {
          "@type": "Question",
          "name": "Peut-on utiliser le vrai Claude Code gratuitement ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le seul accès gratuit officiel à Claude est claude.ai (chat web), qui n'inclut pas Claude Code. Claude Code nécessite un abonnement Claude Pro/Max ou des crédits API. La méthode Ollama est la seule façon d'obtenir l'expérience Claude Code sans payer."
          }
        }
      ]
    }
  ],
  "comment-utiliser-veo-3-videos-publicitaires": [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "Comment utiliser VEO 3 pour créer des vidéos publicitaires",
      "description": "Guide étape par étape pour créer des vidéos publicitaires professionnelles avec Google VEO 3, le modèle de génération vidéo IA de Google DeepMind.",
      "image": "https://oumarousanda.com/images/veo3-videos-publicitaires-og.jpg",
      "datePublished": "2026-04-28",
      "dateModified": "2026-04-28",
      "author": {
        "@type": "Person",
        "name": "Oumarou Sanda",
        "url": "https://oumarousanda.com",
        "jobTitle": "Expert IA & Créateur de contenus",
        "sameAs": [
          "https://youtube.com/channel/UCHWKK_ss4JWCdhnr3TinFuA",
          "https://tiktok.com/@iamsanda"
        ]
      },
      "publisher": {
        "@type": "Organization",
        "name": "Oumarou Sanda",
        "url": "https://oumarousanda.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://oumarousanda.com/images/logo.png"
        }
      },
      "totalTime": "PT45M",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Un compte Google (Gmail suffit)"
        },
        {
          "@type": "HowToSupply",
          "name": "Un abonnement Google AI Pro (19,99 $/mois) ou AI Ultra (249,99 $/mois)"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "Google AI Studio ou Google Flow"
        },
        {
          "@type": "HowToTool",
          "name": "Un logiciel de montage basique (CapCut, DaVinci Resolve)"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "name": "Accéder à VEO 3",
          "text": "Créez un compte sur Google AI Studio ou abonnez-vous à Google AI Pro/Ultra pour accéder à VEO 3 via Flow."
        },
        {
          "@type": "HowToStep",
          "name": "Rédiger votre prompt publicitaire",
          "text": "Structurez votre prompt en incluant le sujet, le cadrage caméra, le style visuel, l'éclairage, l'audio et l'action principale."
        },
        {
          "@type": "HowToStep",
          "name": "Générer et itérer",
          "text": "Lancez la génération, analysez le résultat, et affinez votre prompt en ajustant les paramètres qui ne correspondent pas à votre vision."
        },
        {
          "@type": "HowToStep",
          "name": "Assembler votre vidéo publicitaire",
          "text": "Combinez vos clips de 8 secondes dans un logiciel de montage pour créer une publicité complète de 15 à 30 secondes."
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "VEO 3 est-il gratuit ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "VEO 3 propose un accès limité gratuit via Google Vids (10 clips par mois avec VEO 3.1). Pour un usage régulier, Google AI Pro coûte 19,99 $/mois (environ 50 à 90 vidéos VEO 3.1 Fast) et AI Ultra coûte 249,99 $/mois pour un accès complet à VEO 3 avec audio natif."
          }
        },
        {
          "@type": "Question",
          "name": "Quelle est la durée maximale d'une vidéo VEO 3 ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Chaque génération VEO 3 produit un clip de 4, 6 ou 8 secondes selon les paramètres choisis. Pour créer des vidéos publicitaires plus longues, vous devez combiner plusieurs clips dans un logiciel de montage."
          }
        },
        {
          "@type": "Question",
          "name": "Peut-on utiliser les vidéos VEO 3 pour des publicités commerciales ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui. Les abonnés payants (Google AI Pro et Ultra) obtiennent les droits commerciaux complets sur les vidéos générées, sans obligation d'attribution à Google. Les vidéos peuvent être utilisées dans des campagnes publicitaires, sur les réseaux sociaux et pour tout usage commercial."
          }
        },
        {
          "@type": "Question",
          "name": "VEO 3 peut-il générer l'audio de ma publicité ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, c'est l'un des avantages majeurs de VEO 3 par rapport à ses concurrents. Le modèle génère nativement du son synchronisé : dialogues, effets sonores, bruit ambiant et musique de fond. Vous pouvez diriger l'audio directement dans votre prompt."
          }
        }
      ]
    }
  ],
  "comment-utiliser-suno-ai-creer-musique": [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "Comment utiliser Suno AI pour créer de la musique",
      "description": "Guide étape par étape pour créer de la musique avec Suno AI.",
      "datePublished": "2026-05-01",
      "dateModified": "2026-05-01",
      "author": {
        "@type": "Person",
        "name": "Oumarou Sanda",
        "url": "https://oumarousanda.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Oumarou Sanda",
        "url": "https://oumarousanda.com"
      },
      "totalTime": "PT30M",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Définir l'objectif",
          "text": "Déterminez où sera utilisé le morceau, sa durée et s'il nécessite des paroles."
        },
        {
          "@type": "HowToStep",
          "name": "Créer votre compte Suno",
          "text": "Rendez-vous sur suno.com et créez un compte gratuit."
        },
        {
          "@type": "HowToStep",
          "name": "Écrire votre prompt musical",
          "text": "Remplissez les champs Style of Music, Lyrics et Title en mode Custom."
        },
        {
          "@type": "HowToStep",
          "name": "Générer et évaluer",
          "text": "Lancez la génération, écoutez les deux variantes et affinez si nécessaire."
        },
        {
          "@type": "HowToStep",
          "name": "Télécharger et intégrer",
          "text": "Téléchargez le morceau en MP3/WAV et intégrez-le dans votre projet."
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Suno AI est-il gratuit ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, partiellement. Le plan Basic donne 50 crédits par jour (environ 10 chansons). Les créations gratuites sont réservées à un usage personnel. Le plan Pro à 10 $/mois est nécessaire pour un usage commercial."
          }
        },
        {
          "@type": "Question",
          "name": "Quelle est la durée maximale d'une chanson Suno AI ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Chaque génération produit 1 à 2 minutes. La fonction Extend permet de prolonger jusqu'à 4+ minutes."
          }
        },
        {
          "@type": "Question",
          "name": "Peut-on utiliser la musique Suno AI dans des publicités ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, avec un abonnement Pro (10 $/mois) ou Premier (30 $/mois). Suno ne prélève aucune commission."
          }
        },
        {
          "@type": "Question",
          "name": "Suno AI fonctionne-t-il en français ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui. Suno comprend et génère du contenu en français. Les paroles sont chantées en français avec une prononciation correcte."
          }
        },
        {
          "@type": "Question",
          "name": "La musique Suno AI est-elle protégée par le droit d'auteur ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "En l'état du droit américain, une œuvre purement IA n'est pas éligible au droit d'auteur. Vous avez les droits commerciaux d'utilisation via votre abonnement."
          }
        },
        {
          "@type": "Question",
          "name": "Peut-on publier de la musique Suno AI sur Spotify ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, avec un abonnement payant et via un distributeur. Spotify exige que vous déclariez le contenu comme généré par IA."
          }
        }
      ]
    }
  ]
};
