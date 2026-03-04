import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Send, Mail, MapPin, FileDown, Mic2, Handshake, MessageSquare, CheckCircle } from 'lucide-react';

const contactTypes = [
  { id: 'general', label: 'Question générale', icon: MessageSquare },
  { id: 'sponsor', label: 'Sponsoring / Partenariat', icon: Handshake },
  { id: 'conference', label: 'Conférence / Intervention', icon: Mic2 },
  { id: 'presse', label: 'Média / Presse', icon: FileDown },
];

export function Contact() {
  const { ref, isInView } = useInView();
  const [selectedType, setSelectedType] = useState('general');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-charcoal to-navy-900" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-accent-gold/20 text-accent-gold text-sm font-medium mb-4">
            <Mail className="w-3 h-3" />
            Contact & Presse
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Travaillons <span className="gradient-text">ensemble</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Que ce soit pour un partenariat, une conférence, un projet média ou une simple question, 
            je serais ravi d'échanger avec vous.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-gold to-accent-gold-light flex items-center justify-center">
                  <span className="font-heading font-bold text-navy-900 text-lg">OS</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white">Oumarou Sanda</h3>
                  <p className="text-gray-400 text-sm">Expert IA & Entrepreneur Digital</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-4 h-4 text-accent-gold shrink-0" />
                  <span className="text-sm">contact@oumarousanda.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-accent-gold shrink-0" />
                  <span className="text-sm">Cameroun, Afrique Centrale</span>
                </div>
              </div>
            </div>

            {/* Press kit */}
            <div className="glass-card rounded-2xl p-6 border border-accent-blue/20">
              <h3 className="font-heading font-bold text-white mb-2 flex items-center gap-2">
                <FileDown className="w-5 h-5 text-accent-blue" />
                Kit Média / Presse
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Bio, photos HD, logos, statistiques d'audience et informations pour les médias.
              </p>
              <button className="w-full py-3 bg-accent-blue/10 border border-accent-blue/20 text-accent-blue rounded-xl font-semibold text-sm hover:bg-accent-blue/20 transition-all flex items-center justify-center gap-2">
                <FileDown className="w-4 h-4" />
                Télécharger le kit média
              </button>
            </div>

            {/* Collaboration types */}
            <div className="glass-card rounded-2xl p-6 border border-white/5">
              <h3 className="font-heading font-bold text-white mb-4">Types de collaboration</h3>
              <div className="space-y-2">
                {['Conférences & keynotes', 'Ateliers & workshops IA', 'Consulting entreprises', 'Ambassadorat & sponsoring', 'Interviews & podcasts', 'Projets éducatifs'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                    <span className="text-gray-400 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/5">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white mb-2">Message envoyé !</h3>
                  <p className="text-gray-400">Merci pour votre message. Je vous répondrai dans les plus brefs délais.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-accent-gold text-sm hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-heading font-bold text-xl text-white mb-6">Envoyez-moi un message</h3>
                  
                  {/* Contact type selector */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                    {contactTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`p-3 rounded-xl text-xs font-medium transition-all flex flex-col items-center gap-1.5 ${
                          selectedType === type.id
                            ? 'bg-accent-gold/10 border border-accent-gold/30 text-accent-gold'
                            : 'bg-white/3 border border-white/5 text-gray-400 hover:bg-white/5'
                        }`}
                      >
                        <type.icon className="w-4 h-4" />
                        {type.label}
                      </button>
                    ))}
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Nom complet</label>
                        <input
                          type="text"
                          required
                          placeholder="Votre nom"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-accent-gold/40 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                        <input
                          type="email"
                          required
                          placeholder="votre@email.com"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-accent-gold/40 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Entreprise / Organisation</label>
                      <input
                        type="text"
                        placeholder="Facultatif"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-accent-gold/40 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Sujet</label>
                      <input
                        type="text"
                        required
                        placeholder="Objet de votre message"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-accent-gold/40 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Message</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Décrivez votre demande en détail..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-accent-gold/40 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-accent-gold to-accent-gold-light text-navy-900 font-heading font-bold rounded-xl hover:shadow-lg hover:shadow-accent-gold/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Envoyer le message
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
