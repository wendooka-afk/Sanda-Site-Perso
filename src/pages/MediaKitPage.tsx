import { SEOHead } from '../components/SEOHead';
import { motion } from 'framer-motion';
import { Download, Mail, Youtube, Linkedin, Globe, ExternalLink, Mic, Camera, BookOpen, Users, Play, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ═══════════════════════ DATA ═══════════════════════ */
const stats = [
  { value: '112K+', label: 'Abonnés toutes plateformes', icon: '🌍', color: 'from-gold/15 to-gold/5 border-gold/20' },
  { value: '10 400', label: 'Abonnés YouTube', icon: '▶️', color: 'from-red-500/15 to-red-500/5 border-red-500/20' },
  { value: '68K+', label: 'Abonnés TikTok', icon: '🎵', color: 'from-pink-500/15 to-pink-500/5 border-pink-500/20' },
  { value: '34K+', label: 'Abonnés Facebook', icon: '👤', color: 'from-blue/15 to-blue/5 border-blue/20' },
  { value: '5K+', label: 'Abonnés LinkedIn', icon: '💼', color: 'from-sky-500/15 to-sky-500/5 border-sky-500/20' },
  { value: '500+', label: 'Apprenants formés', icon: '🎓', color: 'from-emerald/15 to-emerald/5 border-emerald/20' },
  { value: '6+', label: 'Formations créées', icon: '📚', color: 'from-violet/15 to-violet/5 border-violet/20' },
  { value: '2', label: 'Livres publiés', icon: '✍️', color: 'from-amber-500/15 to-amber-500/5 border-amber-500/20' },
];

const topics = [
  {
    icon: '🤖',
    title: 'Intelligence artificielle générative',
    desc: 'ChatGPT, Claude, Midjourney, Runway, Sora, agents IA, workflows automatisés, impact sur les métiers du futur.',
  },
  {
    icon: '🌍',
    title: 'Business digital en Afrique',
    desc: 'Entrepreneuriat digital, fintech, e-commerce, accès aux marchés globaux depuis l\'Afrique francophone.',
  },
  {
    icon: '💻',
    title: 'Vibe Coding & No-Code',
    desc: 'Créer des applications web, des SaaS et des outils sans coder grâce à l\'IA et aux plateformes no-code.',
  },
  {
    icon: '📱',
    title: 'Création de contenu et réseaux sociaux',
    desc: 'Stratégies YouTube, TikTok, LinkedIn - créer une audience, monétiser son personal brand, storytelling digital.',
  },
  {
    icon: '⚡',
    title: 'Automatisation et productivité',
    desc: 'n8n, Make, Zapier, workflows IA, optimiser et automatiser son business pour gagner du temps et réduire les coûts.',
  },
  {
    icon: '📚',
    title: 'Formations en ligne & édition',
    desc: 'Créer et vendre des formations, écrire un livre, construire un écosystème de produits digitaux rentables.',
  },
];

const highlights = [
  'Invité dans plusieurs médias africains et podcasts francophones',
  'Conférencier au Forum IA & Business Afrique (Douala, 2025)',
  'Auteur de «Si l\'Afrique rate l\'IA, elle rate le Futur» (disponible sur Amazon)',
  'Fondateur de Wendooka - agence IA & digital basée au Cameroun',
  'Co-fondateur de Sanda Vibe Code - plateforme de formations en vibe coding',
  'Ancien journaliste reconverti en entrepreneur digital en 2019',
];

/* ═══════════════════════ HERO ═══════════════════════ */
function MediaKitHero() {
  return (
    <section className="relative pt-32 pb-20 section-dark overflow-hidden min-h-[50dvh] flex items-center border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-[#050505] to-[#050505] opacity-70" />
      <div className="absolute inset-0 bg-grid-dark opacity-50" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold font-bold text-[11px] tracking-wider uppercase mb-6">
              <Mic className="w-3 h-3" />
              Kit Média & Presse
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black mb-5 tracking-tight text-white leading-[1.2]">
              Oumarou Sanda -<br />
              <span className="text-gold">Expert IA Générative</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-xl">
              Entrepreneur digital, expert en intelligence artificielle et formateur basé au Cameroun. Voici toutes les informations dont vous avez besoin pour un partenariat, une interview ou une collaboration médias.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#telechargement"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-gold to-gold-light text-[#0a0a0a] font-bold rounded-xl hover:shadow-lg hover:shadow-gold/20 transition-all text-[14px]"
              >
                <Download className="w-4 h-4" />
                Télécharger le kit presse
              </a>
              <a
                href="mailto:contact@oumarousanda.com"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-[14px]"
              >
                <Mail className="w-4 h-4" />
                Contact médias
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden lg:block">
            <div className="relative rounded-[2rem] overflow-hidden aspect-[3/4] max-h-[500px] border border-white/10 shadow-2xl bg-white/5">
              <img
                src="/oumarou-sanda-15.webp"
                alt="Oumarou Sanda - Expert IA Générative"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/50 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <p className="text-white font-heading font-bold text-[16px]">Oumarou Sanda</p>
                  <p className="text-gold text-[12px] mt-0.5">Expert IA Générative · Fondateur Wendooka</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ PAGE EXPORT ═══════════════════════ */
export default function MediaKitPage() {

  return (
    <>
      <SEOHead
        title="Kit Média | Press Kit - Oumarou Sanda, Expert IA Générative"
        description="Kit média officiel d'Oumarou Sanda : biographie, statistiques d'audience, sujets d'expertise, photos HD, logos et informations pour collaborations médias et interviews."
        canonical="/kit-media"
      />
      <MediaKitHero />

      {/* Audience Stats */}
      <section className="relative py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0a0a0a] mb-3">
              Audience & portée
            </h2>
            <p className="text-[#737373] text-[15px] max-w-xl mx-auto">
              Une communauté engagée d'entrepreneurs africains et francophones passionnés par l'IA et le business digital.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`bg-gradient-to-br ${stat.color} border rounded-2xl p-5 text-center`}
              >
                <span className="text-2xl mb-2 block">{stat.icon}</span>
                <p className="font-heading font-black text-2xl text-[#0a0a0a] mb-1">{stat.value}</p>
                <p className="text-[#737373] text-[11px] font-medium leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Audience demographics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 grid sm:grid-cols-3 gap-6"
          >
            {[
              { label: 'Localisation principale', value: 'Afrique francophone (65%), France & Canada (25%), Reste du monde (10%)' },
              { label: 'Tranche d\'âge', value: '25–45 ans (72%) - entrepreneurs, créateurs, étudiants en reconversion' },
              { label: 'Centres d\'intérêt', value: 'IA & Tech (88%), Entrepreneuriat (79%), Création de contenu (64%)' },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#a3a3a3] mb-2">{item.label}</p>
                <p className="text-[#0a0a0a] text-[14px] font-medium leading-relaxed">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="relative py-20 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0a0a0a] mb-6">
                Biographie courte
              </h2>
              <p className="text-[#525252] text-[15px] leading-relaxed mb-4">
                Oumarou Sanda est un entrepreneur digital, expert en intelligence artificielle générative et formateur basé à Ngaoundéré, Cameroun. Ancien journaliste et correspondant Vision 4 TV dans la région de l'Adamaoua, il s'est reconverti dans le digital et a rapidement bâti une audience de plus de 110 000 abonnés sur les réseaux sociaux.
              </p>
              <p className="text-[#525252] text-[15px] leading-relaxed mb-6">
                Fondateur de <strong className="text-[#0a0a0a]">Wendooka</strong> (agence IA & digital) et de <strong className="text-[#0a0a0a]">Sanda Vibe Code</strong> (plateforme de formations en vibe coding), il a formé des centaines d'entrepreneurs africains à utiliser l'intelligence artificielle pour générer des revenus en ligne. Il est l'auteur de <em>«Si l'Afrique rate l'IA, elle rate le Futur»</em> et de <em>«Le Cerveau Augmenté»</em>.
              </p>

              <div className="space-y-2.5">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <p className="text-[#525252] text-[13px] leading-relaxed">{h}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-8">
                <a href="https://www.youtube.com/@Oumarou_Sanda" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500/20 transition-all">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com/in/benibsanda" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-blue/10 border border-blue/20 flex items-center justify-center text-blue hover:bg-blue/20 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="/" className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/20 transition-all">
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0a0a0a] mb-6">
                Sujets d'expertise
              </h2>
              <div className="space-y-4">
                {topics.map((topic, i) => (
                  <motion.div
                    key={topic.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-4 p-5 bg-[#fafafa] border border-black/5 rounded-xl hover:border-gold/20 hover:bg-gold/[0.02] transition-all"
                  >
                    <span className="text-2xl shrink-0">{topic.icon}</span>
                    <div>
                      <h3 className="font-heading font-semibold text-[#0a0a0a] text-[15px] mb-1">{topic.title}</h3>
                      <p className="text-[#737373] text-[13px] leading-relaxed">{topic.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Assets & Download Section */}
      <section id="telechargement" className="relative py-20 bg-[#fafafa] border-t border-black/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0a0a0a] mb-3">
              Assets médias
            </h2>
            <p className="text-[#737373] text-[15px]">Photos HD, logos et documents officiels disponibles sur demande.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Camera,
                label: 'Photos HD',
                desc: 'Photos officielles haute définition (fond blanc, fond sombre, en action) pour publication médias.',
                badge: 'Sur demande',
                color: 'bg-violet/5 border-violet/20',
              },
              {
                icon: BookOpen,
                label: 'Logos & assets visuels',
                desc: 'Logos Wendooka, Sanda Vibe Code et les assets de marque personnelle en formats PNG, SVG et PDF.',
                badge: 'Sur demande',
                color: 'bg-gold/5 border-gold/20',
              },
              {
                icon: Play,
                label: 'Extraits vidéo',
                desc: 'Extraits d\'interviews, conférences et présentations disponibles pour intégration ou partage médias.',
                badge: 'Sur demande',
                color: 'bg-coral/5 border-coral/20',
              },
              {
                icon: Users,
                label: 'Biographie officielle',
                desc: 'Versions courte (150 mots), moyenne (300 mots) et longue (600+ mots) en français et en anglais.',
                badge: 'Inclus dans le kit',
                color: 'bg-emerald/5 border-emerald/20',
              },
              {
                icon: Mic,
                label: 'Fiche conférencier',
                desc: 'Présentation officielle, sujets de conférence, rider technique et conditions d\'intervention.',
                badge: 'Inclus dans le kit',
                color: 'bg-blue/5 border-blue/20',
              },
              {
                icon: Globe,
                label: 'Charte éditoriale',
                desc: 'Guidelines pour l\'utilisation de mon nom, de mes citations et de mes images dans les publications.',
                badge: 'Inclus dans le kit',
                color: 'bg-gold/5 border-gold/20',
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`bg-white ${item.color} border rounded-2xl p-6 flex flex-col gap-4`}
              >
                <item.icon className="w-6 h-6 text-[#737373]" />
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-heading font-semibold text-[#0a0a0a] text-[15px]">{item.label}</h3>
                    <span className="px-2 py-0.5 bg-black/5 text-[#737373] text-[10px] font-semibold rounded-full border border-black/5">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[#737373] text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Download CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] p-10 sm:p-14"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
                  Télécharger le kit presse complet
                </h3>
                <p className="text-white/50 text-[15px] mb-0 md:mb-0 max-w-lg">
                  Un PDF complet avec biographies, stats d'audience, sujets d'expertise, informations de contact et guidelines éditoriales.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <a
                  href="mailto:contact@oumarousanda.com?subject=Demande Kit Presse - Oumarou Sanda"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-gold to-gold-light text-[#0a0a0a] font-bold rounded-xl hover:shadow-lg hover:shadow-gold/20 transition-all text-[14px] whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  Demander le kit presse
                </a>
                <a
                  href="mailto:contact@oumarousanda.com"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all text-[14px]"
                >
                  <Mail className="w-4 h-4" />
                  contact@oumarousanda.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interview types */}
      <section className="relative py-20 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0a0a0a] mb-4">
                Disponible pour
              </h2>
              <div className="space-y-3">
                {[
                  { icon: Mic, label: 'Interviews podcast & radio', desc: 'Disponible en distanciel (Zoom, Teams) ou présentiel à Ngaoundéré.' },
                  { icon: Play, label: 'Participations YouTube & Web TV', desc: 'Invité d\'honneur, co-animateur ou expert commentateur sur l\'IA et le business.' },
                  { icon: Users, label: 'Conférences & panels', desc: 'Keynote, table ronde, masterclass pour événements tech et entrepreneuriat.' },
                  { icon: BookOpen, label: 'Articles & tribunes', desc: 'Citations d\'expert, interviews écrites, tribunes d\'opinion sur l\'IA en Afrique.' },
                  { icon: Globe, label: 'Partenariats & collaborations', desc: 'Co-création de contenu, sponsoring de newsletter, collaboration de marque.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#fafafa] transition-all border border-transparent hover:border-black/5">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-[#0a0a0a] text-[14px] mb-0.5">{item.label}</p>
                      <p className="text-[#737373] text-[13px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#fafafa] border border-black/5 rounded-3xl p-8"
            >
              <h3 className="font-heading font-bold text-[#0a0a0a] text-xl mb-6">Contact presse & partenariats</h3>
              <div className="space-y-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#a3a3a3] mb-1">Email principal</p>
                  <a href="mailto:contact@oumarousanda.com" className="text-[#0a0a0a] font-bold text-[15px] hover:text-gold transition-colors flex items-center gap-1.5">
                    contact@oumarousanda.com <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#a3a3a3] mb-1">Partenariats & business</p>
                  <a href="mailto:business@oumarousanda.com" className="text-[#0a0a0a] font-bold text-[15px] hover:text-gold transition-colors flex items-center gap-1.5">
                    business@oumarousanda.com <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#a3a3a3] mb-1">Basé à</p>
                  <p className="text-[#0a0a0a] font-bold text-[15px]">Ngaoundéré, Cameroun 🇨🇲</p>
                  <p className="text-[#737373] text-[13px] mt-0.5">Disponible en distanciel partout dans le monde</p>
                </div>
                <div className="pt-4 border-t border-black/5">
                  <p className="text-[#737373] text-[13px] mb-3 font-medium">Réseaux professionnels :</p>
                  <div className="flex items-center gap-3">
                    <a href="https://www.youtube.com/@Oumarou_Sanda" target="_blank" rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-[12px] font-bold hover:bg-red-500/20 transition-all flex items-center gap-1.5">
                      <Youtube className="w-3.5 h-3.5" /> YouTube
                    </a>
                    <a href="https://linkedin.com/in/benibsanda" target="_blank" rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-blue/10 border border-blue/20 text-blue text-[12px] font-bold hover:bg-blue/20 transition-all flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-16 bg-[#fafafa] border-t border-black/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading font-bold text-[#0a0a0a] text-xl mb-2">Découvrir le travail d'Oumarou Sanda</h3>
            <p className="text-[#737373] text-[14px] mb-6">Vidéos, articles, formations et ressources gratuites.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a0a0a] text-white font-bold rounded-xl hover:bg-gold transition-all text-[14px]">
                <BookOpen className="w-4 h-4" /> Lire le blog
              </Link>
              <Link to="/ressources" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-black/10 text-[#0a0a0a] font-bold rounded-xl hover:border-black/20 transition-all text-[14px]">
                Ressources gratuites <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/formations" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-[#0a0a0a] font-bold rounded-xl hover:shadow-lg hover:shadow-gold/20 transition-all text-[14px]">
                Formations <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
