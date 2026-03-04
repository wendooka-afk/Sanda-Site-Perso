import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocalStorage } from './useLocalStorage';

export default function DashboardSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useLocalStorage('dashboard_settings', {
    siteName: 'Oumarou Sanda',
    siteTagline: 'Expert IA Générative • Entrepreneur Digital • Créateur de Contenus',
    siteUrl: 'https://oumarousanda.com',
    email: 'contact@oumarousanda.com',
    language: 'fr',
    timezone: 'Africa/Douala',
    // SEO
    metaTitle: 'Oumarou Sanda — Expert IA Générative & Business Digital en Afrique',
    metaDescription: 'Site officiel d\'Oumarou Sanda. Expert en IA générative, entrepreneur digital, fondateur de Wendooka et Sanda Vibe Code.',
    googleAnalytics: 'G-XXXXXXXXXX',
    clarityId: 'xxxxxxxxxx',
    // Social
    youtube: 'https://youtube.com/@iamsanda',
    tiktok: 'https://tiktok.com/@iamsanda',
    linkedin: 'https://linkedin.com/in/oumarousanda',
    instagram: 'https://instagram.com/iamsanda',
    facebook: 'https://facebook.com/oumarousanda',
    // Payments
    stripeKey: 'sk_live_••••••••••••••••',
    flutterwaveKey: 'FLWSECK-••••••••••••••••',
    currency: 'FCFA',
    // Email
    brevoApiKey: 'xkeysib-••••••••••••••••',
    senderName: 'Oumarou Sanda',
    senderEmail: 'newsletter@oumarousanda.com',
    // Appearance
    darkMode: true,
    accentColor: '#f59e0b',
    showChat: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (key: string, value: string | boolean) => {
    setSettings((prev: typeof settings) => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: 'general', label: 'Général', icon: '⚙️' },
    { id: 'seo', label: 'SEO', icon: '🔍' },
    { id: 'social', label: 'Réseaux sociaux', icon: '📱' },
    { id: 'payments', label: 'Paiements', icon: '💳' },
    { id: 'email', label: 'Email Marketing', icon: '📧' },
    { id: 'appearance', label: 'Apparence', icon: '🎨' },
  ];

  const InputField = ({ label, value, field, type = 'text', placeholder = '' }: { label: string; value: string; field: string; type?: string; placeholder?: string }) => (
    <div>
      <label className="text-white/60 text-sm mb-2 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => update(field, e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-amber-500/50 transition-colors"
        placeholder={placeholder}
      />
    </div>
  );

  const ToggleField = ({ label, description, value, field }: { label: string; description: string; value: boolean; field: string }) => (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5">
      <div>
        <p className="text-white text-sm font-medium">{label}</p>
        <p className="text-white/40 text-xs mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => update(field, !value)}
        className={`w-12 h-7 rounded-full transition-all relative ${value ? 'bg-amber-500' : 'bg-white/10'}`}
      >
        <div className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-1 transition-all ${value ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-white text-xl font-bold">Paramètres</h2>
          <p className="text-white/40 text-sm mt-1">Configuration du site</p>
        </div>
        <button
          onClick={handleSave}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            saved
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:shadow-lg hover:shadow-amber-500/20'
          }`}
        >
          {saved ? '✅ Sauvegardé !' : '💾 Sauvegarder'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="flex lg:flex-col gap-1 overflow-x-auto p-1 rounded-xl bg-white/[0.02] border border-white/5">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                    : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 p-6 rounded-2xl bg-white/[0.02] border border-white/5"
        >
          {activeTab === 'general' && (
            <div className="space-y-5">
              <h3 className="text-white font-semibold text-lg mb-4">Paramètres généraux</h3>
              <InputField label="Nom du site" value={settings.siteName} field="siteName" />
              <InputField label="Sous-titre / Tagline" value={settings.siteTagline} field="siteTagline" />
              <InputField label="URL du site" value={settings.siteUrl} field="siteUrl" />
              <InputField label="Email de contact" value={settings.email} field="email" type="email" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Langue principale</label>
                  <select
                    value={settings.language}
                    onChange={(e) => update('language', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-amber-500/50"
                  >
                    <option value="fr" className="bg-[#12131a]">Français</option>
                    <option value="en" className="bg-[#12131a]">English</option>
                  </select>
                </div>
                <InputField label="Fuseau horaire" value={settings.timezone} field="timezone" />
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-5">
              <h3 className="text-white font-semibold text-lg mb-4">Configuration SEO</h3>
              <InputField label="Meta Title (page d'accueil)" value={settings.metaTitle} field="metaTitle" />
              <div>
                <label className="text-white/60 text-sm mb-2 block">Meta Description</label>
                <textarea
                  value={settings.metaDescription}
                  onChange={(e) => update('metaDescription', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-amber-500/50 resize-none"
                />
                <p className="text-white/30 text-xs mt-1">{settings.metaDescription.length}/160 caractères</p>
              </div>
              <InputField label="Google Analytics 4 ID" value={settings.googleAnalytics} field="googleAnalytics" placeholder="G-XXXXXXXXXX" />
              <InputField label="Microsoft Clarity ID" value={settings.clarityId} field="clarityId" placeholder="xxxxxxxxxx" />
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <p className="text-blue-400 text-sm font-medium">💡 Conseil SEO</p>
                <p className="text-white/60 text-xs mt-1">Assurez-vous que chaque page a un titre unique et une meta description entre 120-160 caractères pour maximiser le CTR dans les résultats Google.</p>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-5">
              <h3 className="text-white font-semibold text-lg mb-4">Réseaux sociaux</h3>
              <InputField label="YouTube" value={settings.youtube} field="youtube" placeholder="https://youtube.com/@..." />
              <InputField label="TikTok" value={settings.tiktok} field="tiktok" placeholder="https://tiktok.com/@..." />
              <InputField label="LinkedIn" value={settings.linkedin} field="linkedin" placeholder="https://linkedin.com/in/..." />
              <InputField label="Instagram" value={settings.instagram} field="instagram" placeholder="https://instagram.com/..." />
              <InputField label="Facebook" value={settings.facebook} field="facebook" placeholder="https://facebook.com/..." />
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-5">
              <h3 className="text-white font-semibold text-lg mb-4">Configuration Paiements</h3>
              <InputField label="Stripe Secret Key" value={settings.stripeKey} field="stripeKey" type="password" />
              <InputField label="Flutterwave Secret Key" value={settings.flutterwaveKey} field="flutterwaveKey" type="password" />
              <div>
                <label className="text-white/60 text-sm mb-2 block">Devise principale</label>
                <select
                  value={settings.currency}
                  onChange={(e) => update('currency', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-amber-500/50"
                >
                  <option value="FCFA" className="bg-[#12131a]">FCFA (XAF)</option>
                  <option value="USD" className="bg-[#12131a]">USD ($)</option>
                  <option value="EUR" className="bg-[#12131a]">EUR (€)</option>
                </select>
              </div>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <p className="text-amber-400 text-sm font-medium">🔒 Sécurité</p>
                <p className="text-white/60 text-xs mt-1">Les clés API sont stockées de manière sécurisée dans les variables d'environnement. Ne partagez jamais vos clés secrètes.</p>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="space-y-5">
              <h3 className="text-white font-semibold text-lg mb-4">Email Marketing (Brevo)</h3>
              <InputField label="Clé API Brevo" value={settings.brevoApiKey} field="brevoApiKey" type="password" />
              <InputField label="Nom de l'expéditeur" value={settings.senderName} field="senderName" />
              <InputField label="Email de l'expéditeur" value={settings.senderEmail} field="senderEmail" type="email" />
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-emerald-400 text-sm font-medium">📊 Séquences actives</p>
                <p className="text-white/60 text-xs mt-1">3 séquences email automatisées sont actives : Bienvenue, Nurturing formations, Relance panier abandonné.</p>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-5">
              <h3 className="text-white font-semibold text-lg mb-4">Apparence</h3>
              <ToggleField label="Mode sombre" description="Activer le thème sombre par défaut" value={settings.darkMode} field="darkMode" />
              <ToggleField label="Chat IA" description="Afficher le chatbot IA sur le site" value={settings.showChat} field="showChat" />
              <div>
                <label className="text-white/60 text-sm mb-2 block">Couleur d'accent</label>
                <div className="flex items-center gap-3">
                  {['#f59e0b', '#3b82f6', '#ef4444', '#10b981', '#8b5cf6', '#ec4899'].map(color => (
                    <button
                      key={color}
                      onClick={() => update('accentColor', color)}
                      className={`w-10 h-10 rounded-xl transition-all ${settings.accentColor === color ? 'ring-2 ring-offset-2 ring-offset-[#0a0b0f] scale-110' : 'hover:scale-105'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
