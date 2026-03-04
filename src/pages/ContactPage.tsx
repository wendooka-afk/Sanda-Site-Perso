import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../components/useInView';
import {
  Send, Mail, Globe, Briefcase, MessageSquare, Loader2,
  CheckCircle, ArrowDown, ExternalLink, Youtube, Linkedin, Facebook, Instagram, ChevronDown, MonitorPlay, FileText, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { sendContactEmail, type ContactFormData } from '../services/mailzeet';

export default function ContactPage() {
  const { ref: heroRef, isInView: heroInView } = useInView(0.1);
  const { ref: optionsRef, isInView: optionsInView } = useInView(0.1);
  const { ref: formRef, isInView: formInView } = useInView(0.1);
  const { ref: mediaRef, isInView: mediaInView } = useInView(0.1);

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // État du formulaire
  const [form, setForm] = useState<ContactFormData>({
    name: '', email: '', phone: '', subject: '', budget: '', message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError(null);
    try {
      await sendContactEmail(form);
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', subject: '', budget: '', message: '' });
    } catch (err) {
      setSendError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue. Merci de réessayer ou d'écrire directement à contact@oumarousanda.com"
      );
    } finally {
      setSending(false);
    }
  };

  const faqs = [
    { q: "Comment contacter Oumarou Sanda ?", a: "Oumarou Sanda est joignable via le formulaire de contact sur oumarousanda.com/contact, par email à contact@oumarousanda.com, ou par WhatsApp. Il est également actif sur YouTube, TikTok, LinkedIn, Facebook et Instagram. Le délai de réponse moyen est de 48 heures." },
    { q: "Oumarou Sanda est-il disponible pour des conférences ?", a: "Oui, Oumarou Sanda est disponible pour des conférences, keynotes, panels, interviews et interventions médias. Ses sujets d'expertise incluent l'intelligence artificielle appliquée, la souveraineté numérique africaine, le vibe coding et l'entrepreneuriat digital en Afrique francophone. Contact : presse@oumarousanda.com." },
    { q: "Peut-on sponsoriser une vidéo d'Oumarou Sanda ?", a: "Oui, Oumarou Sanda propose des vidéos sponsorisées sur YouTube, du contenu TikTok et Reels, des posts LinkedIn et Facebook, ainsi que des newsletters sponsorisées. Son audience cumulée dépasse 125 000 abonnés dans la niche IA et business digital en Afrique francophone. Kit média disponible sur demande à sponsoring@oumarousanda.com." },
    { q: "Quel est le délai de réponse d'Oumarou Sanda ?", a: "Le délai de réponse moyen est de 48 heures pour les demandes envoyées via le formulaire ou par email. Pour les demandes urgentes, le contact par WhatsApp est recommandé." },
    { q: "Où est basé Oumarou Sanda ?", a: "Oumarou Sanda est basé à Ngaoundéré, région de l'Adamaoua, au Cameroun. Il travaille avec des clients et partenaires dans toute l'Afrique francophone et à l'international, principalement à distance." },
  ];

  return (
    <>
      <SEOHead
        title="Contact | Oumarou Sanda — Projets, Collaborations & Médias"
        description="Contactez Oumarou Sanda pour un projet web, un consulting IA, une collaboration média, un sponsoring ou une demande presse. Expert IA, entrepreneur digital basé au Cameroun. Réponse sous 48h."
        canonical="/contact"
        schema={{ "@context": "https://schema.org", "@type": "ContactPage", "url": "https://oumarousanda.com/contact", "name": "Contact — Oumarou Sanda" }}
      />
      <div className="bg-[#fafafa] min-h-screen">

        {/* SECTION 01 — HERO CONTACT */}
        <section className="relative pt-32 pb-24 overflow-hidden section-dark border-b border-white/5">
          <div className="absolute inset-0 bg-grid-dark opacity-60" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/10 to-transparent opacity-50 blur-3xl pointer-events-none" />
          <div ref={heroRef} className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-left"
              >
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-[4rem] font-black text-white mb-6 tracking-tight leading-[1.1]">
                  Parlons de <span className="text-gold block mt-2">ton projet.</span>
                </h1>
                <p className="text-white/65 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
                  Que tu aies un projet web, une question business, une demande de sponsoring ou une invitation média — je suis accessible. Choisis le bon canal ci-dessous, et je reviens vers toi sous 48h.
                </p>

                <a href="#options" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all animate-bounce">
                  <ArrowDown className="w-5 h-5" />
                </a>
              </motion.div>

              {/* HER RIGHT CONTENT (IMAGE) */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={heroInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1, delay: 0.2 }} className="relative hidden lg:block h-[550px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5">
                <img src="/Oumarou Sanda CEO Wendooka 5.webp" alt="Oumarou Sanda Contact" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
              </motion.div>
            </div>
          </div>
        </section>


        {/* SECTION 02 — ACCÈS RAPIDES */}
        <section id="options" className="py-16 relative z-20">
          <div ref={optionsRef} className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={optionsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-[11px] font-bold text-blue-600 tracking-widest text-center mb-10 uppercase">Choisis ton sujet</h2>

              <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                {/* Card 1 */}
                <a href="#formulaire" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('formulaire')?.scrollIntoView({ behavior: 'smooth' });
                  // Logic to set select field can be done by standard ID based approach or state
                }} className="group bg-white border border-black/5 p-6 lg:p-8 rounded-2xl hover:border-black/15 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-all" />
                  <MonitorPlay className="w-8 h-8 text-[#525252] group-hover:text-blue-600 transition-colors mb-4" />
                  <h3 className="text-[#0a0a0a] font-bold text-lg mb-2 font-heading">Projet Web ou Digital</h3>
                  <p className="text-[#525252] text-sm mb-6 line-clamp-2">Tu veux un site web, un tunnel de vente, une automatisation ou une solution digitale ?</p>
                  <span className="flex items-center gap-2 text-[13px] font-semibold text-blue-600 group-hover:text-blue-700">Demande un devis gratuit <ExternalLink className="w-3.5 h-3.5" /></span>
                </a>

                {/* Card 2 */}
                <a href="https://academy.oumarousanda.com/coaching-ia" target="_blank" rel="noopener noreferrer" className="group bg-white border border-black/5 p-6 lg:p-8 rounded-2xl hover:border-black/15 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full group-hover:bg-gold/10 transition-all" />
                  <Briefcase className="w-8 h-8 text-[#525252] group-hover:text-gold-dark transition-colors mb-4" />
                  <h3 className="text-[#0a0a0a] font-bold text-lg mb-2 font-heading">Consulting IA</h3>
                  <p className="text-[#525252] text-sm mb-6 line-clamp-2">Tu veux un accompagnement stratégique sur l'IA pour ton business ou ton équipe ?</p>
                  <span className="flex items-center gap-2 text-[13px] font-semibold text-gold-dark group-hover:text-gold">Réserve un appel stratégique <ExternalLink className="w-3.5 h-3.5" /></span>
                </a>

                {/* Card 3 */}
                <a href="mailto:sponsoring@oumarousanda.com" className="group bg-white border border-black/5 p-6 lg:p-8 rounded-2xl hover:border-black/15 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-coral-500/5 blur-3xl rounded-full group-hover:bg-coral-500/10 transition-all" />
                  <Globe className="w-8 h-8 text-[#525252] group-hover:text-coral-600 transition-colors mb-4" />
                  <h3 className="text-[#0a0a0a] font-bold text-lg mb-2 font-heading">Sponsoring & Collaborations</h3>
                  <p className="text-[#525252] text-sm mb-6 line-clamp-2">Tu représentes une marque ou un outil IA et tu veux toucher 125 000+ abonnés ?</p>
                  <span className="flex items-center gap-2 text-[13px] font-semibold text-coral-600 group-hover:text-coral-700">Envoie ta proposition <ExternalLink className="w-3.5 h-3.5" /></span>
                </a>

                {/* Card 4 */}
                <a href="mailto:presse@oumarousanda.com" className="group bg-white border border-black/5 p-5 sm:p-6 lg:p-8 rounded-2xl hover:border-black/15 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full group-hover:bg-emerald-500/10 transition-all" />
                  <FileText className="w-8 h-8 text-[#525252] group-hover:text-emerald-600 transition-colors mb-4" />
                  <h3 className="text-[#0a0a0a] font-bold text-lg mb-2 font-heading">Presse, Médias & Conférences</h3>
                  <p className="text-[#525252] text-sm mb-6 line-clamp-2">Interview, article, podcast, conférence, intervention ou citation ?</p>
                  <span className="flex items-center gap-2 text-[13px] font-semibold text-emerald-600 group-hover:text-emerald-700">Contacte le service presse <ExternalLink className="w-3.5 h-3.5" /></span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>


        {/* SECTION 03 — FORMULAIRE PRINCIPAL & SECTION 04 — ACCÈS DIRECTS */}
        <section id="formulaire" className="py-16 relative">
          <div ref={formRef} className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="lg:col-span-3 order-2 lg:order-1"
              >
                <div className="bg-white border border-black/5 shadow-md p-5 sm:p-8 lg:p-10 rounded-2xl relative">
                  {submitted ? (
                    <div className="text-center py-20 px-4">
                      <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-emerald-500" />
                      </div>
                      <h3 className="font-heading font-black text-2xl text-[#0a0a0a] mb-4">Message envoyé !</h3>
                      <p className="text-[#525252] mb-8 max-w-sm mx-auto leading-relaxed">
                        Merci ! Ton message a bien été envoyé. Je reviens vers toi sous 48 heures maximum. En attendant, tu peux me suivre sur YouTube ou découvrir mes formations.
                      </p>
                      <button onClick={() => setSubmitted(false)} className="px-6 py-3 bg-black/5 text-[#0a0a0a] hover:bg-black/10 rounded-xl font-bold text-sm transition-all border border-black/5">
                        Envoyer un autre message
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-heading font-black text-[#0a0a0a] mb-8">Envoyer une demande</h3>
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-[#a3a3a3] text-xs font-bold uppercase tracking-wider mb-2">Nom complet *</label>
                            <input name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Ex: Jean Dupont" className="w-full bg-[#fafafa] border border-black/10 rounded-xl px-4 py-3.5 text-[#0a0a0a] placeholder:text-[#a3a3a3] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[#a3a3a3] text-xs font-bold uppercase tracking-wider mb-2">Email *</label>
                            <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jean@entreprise.com" className="w-full bg-[#fafafa] border border-black/10 rounded-xl px-4 py-3.5 text-[#0a0a0a] placeholder:text-[#a3a3a3] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-[#a3a3a3] text-xs font-bold uppercase tracking-wider mb-2">Téléphone / WhatsApp</label>
                            <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+237 6XX XX XX XX" className="w-full bg-[#fafafa] border border-black/10 rounded-xl px-4 py-3.5 text-[#0a0a0a] placeholder:text-[#a3a3a3] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[#a3a3a3] text-xs font-bold uppercase tracking-wider mb-2">Sujet *</label>
                            <select name="subject" required value={form.subject} onChange={handleChange} className="w-full bg-[#fafafa] border border-black/10 rounded-xl px-4 py-3.5 text-[#0a0a0a] outline-none transition-all appearance-none cursor-pointer focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm">
                              <option value="" disabled>Sélectionner un sujet...</option>
                              <option value="projet">Projet web</option>
                              <option value="consulting">Consulting IA</option>
                              <option value="sponsoring">Sponsoring</option>
                              <option value="presse">Presse &amp; Médias</option>
                              <option value="autre">Autre demande</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[#a3a3a3] text-xs font-bold uppercase tracking-wider mb-2">Budget estimé (Optionnel)</label>
                          <select name="budget" value={form.budget} onChange={handleChange} className="w-full bg-[#fafafa] border border-black/10 rounded-xl px-4 py-3.5 text-[#0a0a0a] outline-none transition-all appearance-none cursor-pointer focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm">
                            <option value="">Pas encore défini</option>
                            <option value="Moins de 100K FCFA">&lt; 100K FCFA</option>
                            <option value="100K - 500K FCFA">100K - 500K FCFA</option>
                            <option value="500K - 1M FCFA">500K - 1M FCFA</option>
                            <option value="1M+ FCFA">1M+ FCFA</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[#a3a3a3] text-xs font-bold uppercase tracking-wider mb-2">Message *</label>
                          <textarea name="message" required minLength={20} rows={5} value={form.message} onChange={handleChange} placeholder="Décris ton projet ou ta demande en quelques lignes..." className="w-full bg-[#fafafa] border border-black/10 rounded-xl px-4 py-3.5 text-[#0a0a0a] placeholder:text-[#a3a3a3] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none" />
                        </div>

                        {/* Erreur API */}
                        {sendError && (
                          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
                            ⚠️ {sendError}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={sending}
                          className="w-full py-4 bg-[#0a0a0a] hover:bg-black text-white font-heading font-black rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider border border-black/10 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {sending ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours...</>
                          ) : (
                            <><Send className="w-4 h-4" /> Envoyer le message</>
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>

              {/* Alternate Contacts */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2 order-1 lg:order-2 space-y-8"
              >
                <div>
                  <h3 className="font-heading font-black text-xl text-[#0a0a0a] mb-6">Canaux Alternatifs</h3>
                  <div className="space-y-4">
                    <div className="bg-white border border-black/5 shadow-sm rounded-2xl p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <Mail className="w-5 h-5 text-[#525252]" />
                        <h4 className="font-bold text-[#0a0a0a] text-sm">Emails Directs</h4>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex flex-col"><span className="text-[11px] text-[#a3a3a3] uppercase font-bold tracking-wider">Général</span><a href="mailto:contact@oumarousanda.com" className="text-[#525252] hover:text-[#0a0a0a] transition-colors text-sm font-medium">contact@oumarousanda.com</a></li>
                        <li className="flex flex-col"><span className="text-[11px] text-[#a3a3a3] uppercase font-bold tracking-wider">Presse & Médias</span><a href="mailto:presse@oumarousanda.com" className="text-[#525252] hover:text-[#0a0a0a] transition-colors text-sm font-medium">presse@oumarousanda.com</a></li>
                        <li className="flex flex-col"><span className="text-[11px] text-[#a3a3a3] uppercase font-bold tracking-wider">Sponsoring</span><a href="mailto:sponsoring@oumarousanda.com" className="text-[#525252] hover:text-[#0a0a0a] transition-colors text-sm font-medium">sponsoring@oumarousanda.com</a></li>
                      </ul>
                    </div>

                    <a href="https://wa.me/237699999999?text=Bonjour%20Oumarou,%20je%20vous%20contacte%20via%20votre%20site%20web.%20Je%20souhaite..." target="_blank" rel="noopener noreferrer" className="bg-[#25D366]/5 border border-[#25D366]/20 rounded-2xl p-5 flex items-center gap-4 hover:bg-[#25D366]/10 transition-all group">
                      <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shrink-0 shadow-sm">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0a0a0a] text-sm mb-1">WhatsApp Business</h4>
                        <p className="text-[#525252] text-[12px] group-hover:text-[#0a0a0a] transition-colors">Pour les demandes urgentes uniquement.</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-black text-xl text-[#0a0a0a] mb-6">Me retrouver</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'YouTube', url: 'https://www.youtube.com/@Oumarou_Sanda', icon: Youtube, subs: '100K+' },
                      { name: 'TikTok', url: 'https://tiktok.com/@iamsanda', icon: MonitorPlay, subs: '20K+' },
                      { name: 'LinkedIn', url: 'https://linkedin.com/in/benibsanda', icon: Linkedin, subs: 'Actif' },
                      { name: 'Facebook', url: 'https://facebook.com/iamoumarousanda', icon: Facebook, subs: 'Actif' },
                      { name: 'Instagram', url: 'https://instagram.com/iamsanda', icon: Instagram, subs: 'Actif' }
                    ].map((social) => (
                      <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white border border-black/5 rounded-xl hover:bg-[#fafafa] hover:border-black/15 shadow-sm transition-all group">
                        <div className="flex items-center gap-3">
                          <social.icon className="w-5 h-5 text-[#525252] group-hover:text-[#0a0a0a] transition-colors" />
                          <span className="font-semibold text-[#525252] group-hover:text-[#0a0a0a] text-sm transition-colors">{social.name}</span>
                        </div>
                        <span className="text-[11px] font-bold text-[#a3a3a3] uppercase tracking-wider bg-black/5 px-2 py-1 rounded-md">{social.subs}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* SECTION 05 — SPONSORING & MÉDIAS */}
        <section className="py-20 relative bg-[#fafafa] border-y border-black/5">
          <div className="absolute inset-0 bg-gradient-to-br from-coral-500/5 via-transparent to-transparent opacity-50 pointer-events-none" />
          <div ref={mediaRef} className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={mediaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-20"
            >
              {/* Marques et Annonceurs */}
              <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-coral-500/20 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-40 h-40 bg-coral-500/10 blur-[80px] rounded-full" />
                <h3 className="font-heading text-2xl font-black text-[#0a0a0a] mb-6">Pour les marques et annonceurs</h3>
                <p className="text-[#525252] mb-8 leading-relaxed">Tu représentes un outil IA, une plateforme SaaS, un événement tech ou une marque qui veut atteindre des entrepreneurs et créateurs francophones ?</p>

                <h4 className="text-coral-600 font-bold text-sm tracking-wider mb-4 uppercase">Ce que je propose :</h4>
                <ul className="space-y-3 mb-8">
                  {["Vidéos sponsorisées YouTube (tutoriels, reviews, mentions)", "Contenu TikTok / Reels (formats viraux, éducatifs)", "Posts LinkedIn & Facebook (audience B2B)", "Newsletter sponsorisée (email list qualifiée)", "Ambassadeur de marque (long terme)"].map((item, i) => (
                    <li key={i} className="flex gap-3 text-[#525252] text-sm">
                      <CheckCircle className="w-4 h-4 text-coral-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#fafafa] p-4 rounded-xl border border-black/5">
                    <span className="block text-[#a3a3a3] text-[10px] uppercase font-bold tracking-wider mb-1">Audience cumulée</span>
                    <span className="block text-[#0a0a0a] font-bold text-lg">125K+ abonnés</span>
                  </div>
                  <div className="bg-[#fafafa] p-4 rounded-xl border border-black/5">
                    <span className="block text-[#a3a3a3] text-[10px] uppercase font-bold tracking-wider mb-1">Démographie</span>
                    <span className="block text-[#0a0a0a] font-bold text-sm mt-1">18-45 ans, 70% hommes, Afrique + Diaspora</span>
                  </div>
                </div>

                <p className="text-[#a3a3a3] text-sm italic border-l-2 border-coral-500/30 pl-4">
                  Kit média disponible sur demande. Envoie ta proposition à <a href="mailto:sponsoring@oumarousanda.com" className="text-coral-600 hover:underline">sponsoring@oumarousanda.com</a>
                </p>
              </div>

              {/* Médias et Événements */}
              <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-black/5 shadow-sm">
                <h3 className="font-heading text-2xl font-black text-[#0a0a0a] mb-6">Pour les médias et organisateurs d'événements</h3>
                <p className="text-[#525252] mb-8 leading-relaxed">Oumarou Sanda est disponible pour apporter son expertise sur l'IA et l'écosystème numérique africain.</p>

                <h4 className="text-blue-600 font-bold text-sm tracking-wider mb-4 uppercase">Formats d'intervention :</h4>
                <ul className="space-y-3 mb-10">
                  {[
                    "Interviews (presse, radio, télé, podcast)",
                    "Conférences et keynotes (IA, souveraineté numérique)",
                    "Panels et tables rondes (tech, innovation)",
                    "Citations et expertise (rappports, documentaires)",
                    "Contributions écrites (tribunes, op-eds)"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-[#525252] text-sm">
                      <MonitorPlay className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-[#fafafa] p-5 rounded-2xl mb-8 border border-black/5">
                  <h4 className="text-[#0a0a0a] font-bold text-[11px] tracking-wider mb-2 uppercase">Sujets d'expertise</h4>
                  <p className="text-[#525252] text-sm leading-relaxed">
                    Intelligence artificielle appliquée, souveraineté numérique africaine, vibe coding, création de contenu avec l'IA, entrepreneuriat digital en Afrique francophone.
                  </p>
                </div>

                <p className="text-[#a3a3a3] text-sm italic border-l-2 border-black/10 pl-4">
                  Bio et photos HD disponibles. Contact presse : <a href="mailto:presse@oumarousanda.com" className="text-[#525252] hover:text-[#0a0a0a] hover:underline">presse@oumarousanda.com</a>
                </p>
              </div>

            </motion.div>
          </div>
        </section>

        {/* SECTION 06 — LIENS RAPIDES */}
        <section className="py-12 border-b border-black/5 relative overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <h3 className="text-center font-heading text-xl font-bold text-[#a3a3a3] mb-8">Avant de partir...</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/services" className="bg-[#fafafa] border border-black/5 p-6 rounded-2xl hover:bg-white hover:border-black/15 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group h-full">
                <div>
                  <h4 className="font-bold text-[#0a0a0a] mb-2 group-hover:text-blue-600 transition-colors">Découvrir mes services</h4>
                  <p className="text-[#525252] text-sm mb-6">Agence Wendooka, Consulting IA & Production.</p>
                </div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#a3a3a3] group-hover:text-blue-600 flex items-center gap-1 transition-colors">Page Services <ChevronRight className="w-3.5 h-3.5" /></span>
              </Link>
              <Link to="/formations" className="bg-[#fafafa] border border-black/5 p-6 rounded-2xl hover:bg-white hover:border-black/15 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group h-full">
                <div>
                  <h4 className="font-bold text-[#0a0a0a] mb-2 group-hover:text-coral-600 transition-colors">Se former sur l'IA</h4>
                  <p className="text-[#525252] text-sm mb-6">Protocole Vidéo IA, Le Cerveau Augmenté, Coaching IA.</p>
                </div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#a3a3a3] group-hover:text-coral-600 flex items-center gap-1 transition-colors">Mes Formations <ChevronRight className="w-3.5 h-3.5" /></span>
              </Link>
              <Link to="/blog" className="bg-[#fafafa] border border-black/5 p-6 rounded-2xl hover:bg-white hover:border-black/15 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group h-full">
                <div>
                  <h4 className="font-bold text-[#0a0a0a] mb-2 group-hover:text-emerald-600 transition-colors">Lire mes analyses</h4>
                  <p className="text-[#525252] text-sm mb-6">IA & Outils, Business Digital, Vibe Coding, Afrique.</p>
                </div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#a3a3a3] group-hover:text-emerald-600 flex items-center gap-1 transition-colors">Le Blog <ChevronRight className="w-3.5 h-3.5" /></span>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 07 — FAQ */}
        <section className="py-20 bg-[#fafafa]">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-black text-[#0a0a0a] text-center mb-12">Questions Fréquentes</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white border border-black/5 shadow-sm rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#fafafa] transition-colors"
                  >
                    <span className="font-semibold text-[#0a0a0a] pr-8">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#a3a3a3] shrink-0 transition-transform ${openFaq === index ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 text-[#525252] leading-relaxed text-sm">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
