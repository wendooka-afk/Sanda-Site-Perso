import { useState } from 'react';
import { motion } from 'framer-motion';

/* ─── Simulated Data ─── */
const monthlyData = [
  { month: 'Jul', visitors: 3200, leads: 96, sales: 24, revenue: 1200000 },
  { month: 'Aoû', visitors: 4100, leads: 123, sales: 31, revenue: 1550000 },
  { month: 'Sep', visitors: 5800, leads: 174, sales: 42, revenue: 2100000 },
  { month: 'Oct', visitors: 7200, leads: 216, sales: 54, revenue: 2700000 },
  { month: 'Nov', visitors: 9400, leads: 282, sales: 68, revenue: 3400000 },
  { month: 'Déc', visitors: 11200, leads: 336, sales: 78, revenue: 3900000 },
  { month: 'Jan', visitors: 12847, leads: 385, sales: 89, revenue: 4250000 },
];

const trafficSources = [
  { source: 'Google Organic', visits: 5400, pct: 42, color: 'bg-blue-400' },
  { source: 'YouTube', visits: 2800, pct: 22, color: 'bg-red-400' },
  { source: 'Direct', visits: 1900, pct: 15, color: 'bg-amber-400' },
  { source: 'Facebook', visits: 1300, pct: 10, color: 'bg-indigo-400' },
  { source: 'TikTok', visits: 800, pct: 6, color: 'bg-pink-400' },
  { source: 'Autres', visits: 647, pct: 5, color: 'bg-white/40' },
];

const topCountries = [
  { country: '🇨🇲 Cameroun', visits: 3200, pct: 25 },
  { country: '🇨🇮 Côte d\'Ivoire', visits: 2100, pct: 16 },
  { country: '🇸🇳 Sénégal', visits: 1800, pct: 14 },
  { country: '🇫🇷 France', visits: 1500, pct: 12 },
  { country: '🇲🇱 Mali', visits: 900, pct: 7 },
  { country: '🇬🇦 Gabon', visits: 750, pct: 6 },
  { country: '🇧🇫 Burkina Faso', visits: 620, pct: 5 },
  { country: '🇨🇩 RD Congo', visits: 580, pct: 4 },
];

const devices = [
  { device: '📱 Mobile', pct: 72, color: 'bg-amber-400' },
  { device: '💻 Desktop', pct: 22, color: 'bg-blue-400' },
  { device: '📟 Tablette', pct: 6, color: 'bg-violet-400' },
];

const seoKeywords = [
  { keyword: 'expert IA Afrique', position: 3, change: '+2', volume: 1200 },
  { keyword: 'formation IA générative', position: 5, change: '+4', volume: 890 },
  { keyword: 'Oumarou Sanda', position: 1, change: '—', volume: 650 },
  { keyword: 'business en ligne Afrique', position: 7, change: '+3', volume: 2100 },
  { keyword: 'créer vidéo avec IA', position: 4, change: '+1', volume: 1500 },
  { keyword: 'vibe coding', position: 2, change: '+5', volume: 340 },
  { keyword: 'Wendooka', position: 1, change: '—', volume: 120 },
  { keyword: 'automatisation business IA', position: 8, change: '+6', volume: 780 },
];

const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

export default function DashboardAnalytics() {
  const [period] = useState('7m');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white text-xl font-bold">Analytics</h2>
        <p className="text-white/40 text-sm mt-1">Performance détaillée du site</p>
      </div>

      {/* Core Web Vitals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'PageSpeed Mobile', value: '92/100', target: 'Objectif: 85+', icon: '⚡', color: 'text-emerald-400', bg: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20' },
          { label: 'LCP', value: '1.8s', target: 'Objectif: < 2.5s', icon: '🎯', color: 'text-emerald-400', bg: 'from-blue-500/20 to-blue-600/5 border-blue-500/20' },
          { label: 'Taux de rebond', value: '42%', target: 'Objectif: < 50%', icon: '📉', color: 'text-emerald-400', bg: 'from-violet-500/20 to-violet-600/5 border-violet-500/20' },
          { label: 'Temps moyen', value: '3:24', target: 'Objectif: > 2:30', icon: '⏱️', color: 'text-emerald-400', bg: 'from-amber-500/20 to-amber-600/5 border-amber-500/20' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-5 rounded-2xl bg-gradient-to-br ${stat.bg} border`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/50 text-xs">{stat.label}</p>
                <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                <p className="text-white/30 text-xs mt-1">{stat.target}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl bg-white/[0.02] border border-white/5"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-semibold">Croissance mensuelle</h3>
            <p className="text-white/40 text-sm mt-1">Revenus sur {period}</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-2 text-amber-400"><span className="w-3 h-3 rounded-full bg-amber-400" /> Revenus</span>
            <span className="flex items-center gap-2 text-blue-400"><span className="w-3 h-3 rounded-full bg-blue-400" /> Visiteurs</span>
          </div>
        </div>

        <div className="flex items-end gap-2 sm:gap-4 h-52">
          {monthlyData.map((d, i) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-2 relative" style={{ height: '100%' }}>
              <div className="w-full flex-1 relative">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.6 }}
                  className="absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t from-amber-500/20 to-amber-400/50"
                />
                {/* Value Label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className="absolute w-full text-center text-[10px] text-amber-400/80 font-medium"
                  style={{ bottom: `${(d.revenue / maxRevenue) * 100 + 2}%` }}
                >
                  {(d.revenue / 1000000).toFixed(1)}M
                </motion.div>
              </div>
              <span className="text-white/30 text-xs">{d.month}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Two Column Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/5"
        >
          <h3 className="text-white font-semibold mb-6">Sources de trafic</h3>
          <div className="space-y-4">
            {trafficSources.map((source, i) => (
              <motion.div
                key={source.source}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white/80 text-sm">{source.source}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white/40 text-sm">{source.visits.toLocaleString()}</span>
                    <span className="text-white/60 text-sm font-medium w-10 text-right">{source.pct}%</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${source.pct}%` }}
                    transition={{ delay: 0.7 + i * 0.05, duration: 0.6 }}
                    className={`h-full rounded-full ${source.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top Countries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/5"
        >
          <h3 className="text-white font-semibold mb-6">Top pays</h3>
          <div className="space-y-3">
            {topCountries.map((country, i) => (
              <motion.div
                key={country.country}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.04 }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.03] transition-all"
              >
                <span className="text-white/80 text-sm">{country.country}</span>
                <div className="flex items-center gap-4">
                  <span className="text-white/40 text-sm">{country.visits.toLocaleString()}</span>
                  <div className="w-16 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full bg-amber-400" style={{ width: `${country.pct}%` }} />
                  </div>
                  <span className="text-white/50 text-xs w-8 text-right">{country.pct}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* SEO & Devices Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* SEO Rankings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="xl:col-span-2 p-6 rounded-2xl bg-white/[0.02] border border-white/5"
        >
          <h3 className="text-white font-semibold mb-6">Classement SEO — Google.fr</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-white/30 text-xs uppercase tracking-wider border-b border-white/5">
                  <th className="text-left pb-3 font-medium">Mot-clé</th>
                  <th className="text-center pb-3 font-medium">Position</th>
                  <th className="text-center pb-3 font-medium">Évolution</th>
                  <th className="text-right pb-3 font-medium">Volume</th>
                </tr>
              </thead>
              <tbody>
                {seoKeywords.map((kw) => (
                  <tr key={kw.keyword} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                    <td className="py-3 text-white/80 text-sm">{kw.keyword}</td>
                    <td className="py-3 text-center">
                      <span className={`inline-flex w-8 h-8 rounded-lg items-center justify-center font-bold text-sm ${
                        kw.position <= 3 ? 'bg-emerald-500/20 text-emerald-400' :
                        kw.position <= 5 ? 'bg-blue-500/20 text-blue-400' :
                        kw.position <= 10 ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {kw.position}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <span className={`text-sm font-medium ${kw.change.startsWith('+') ? 'text-emerald-400' : 'text-white/30'}`}>
                        {kw.change.startsWith('+') ? `↑ ${kw.change}` : kw.change}
                      </span>
                    </td>
                    <td className="py-3 text-right text-white/50 text-sm">{kw.volume.toLocaleString()}/mois</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Devices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/5"
        >
          <h3 className="text-white font-semibold mb-6">Appareils</h3>

          {/* Donut-like visual */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {devices.reduce((acc, device, i) => {
                  const offset = acc.offset;
                  const circumference = 2 * Math.PI * 40;
                  const strokeDash = (device.pct / 100) * circumference;
                  const colors = ['#f59e0b', '#3b82f6', '#8b5cf6'];
                  acc.elements.push(
                    <circle
                      key={i}
                      cx="50" cy="50" r="40"
                      fill="none"
                      stroke={colors[i]}
                      strokeWidth="12"
                      strokeDasharray={`${strokeDash} ${circumference}`}
                      strokeDashoffset={-offset}
                      strokeLinecap="round"
                      className="opacity-80"
                    />
                  );
                  acc.offset += strokeDash;
                  return acc;
                }, { elements: [] as React.ReactNode[], offset: 0 }).elements}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white text-2xl font-bold">72%</p>
                  <p className="text-white/30 text-xs">Mobile</p>
                </div>
              </div>
            </div>

            <div className="w-full space-y-3">
              {devices.map(d => (
                <div key={d.device} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${d.color}`} />
                    <span className="text-white/70 text-sm">{d.device}</span>
                  </div>
                  <span className="text-white font-medium text-sm">{d.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
