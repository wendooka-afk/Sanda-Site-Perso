import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useLanguage } from '../i18n';

type ChatMessage = { role: 'bot' | 'user'; text: string };

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    setMessages([
      { role: 'bot', text: t.chat.greeting },
      { role: 'bot', text: t.chat.greeting2 },
    ]);
  }, [t]);

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { role: 'user' as const, text: msg }]);
    setInput('');

    setTimeout(() => {
      let reply = t.chat.defaultReply;
      if (msg.toLowerCase().includes('formation') || msg.toLowerCase().includes('course')) {
        reply = t.chat.formationReply;
      } else if (msg.toLowerCase().includes('wendooka')) {
        reply = t.chat.wendookaReply;
      } else if (msg.toLowerCase().includes('contact')) {
        reply = t.chat.contactReply;
      }
      setMessages(prev => [...prev, { role: 'bot' as const, text: reply }]);
    }, 800);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: 'spring', stiffness: 200 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat'}
        aria-expanded={isOpen}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-500 ${
          isOpen
            ? 'bg-[#1a1a1a] border border-black/20 rotate-0'
            : 'bg-gradient-to-br from-gold to-gold-light shadow-gold/20'
        }`}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white/80" />
        ) : (
          <MessageCircle className="w-5 h-5 text-[#1a1a1a]" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[380px] max-h-[70vh] flex flex-col card-elevated rounded-2xl overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-black/[0.06] bg-black/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#1a1a1a]" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-[#0a0a0a] text-[13px]">{t.chat.title}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald rounded-full" />
                    <span className="text-emerald text-[11px]">{t.chat.online}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-72">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'bot' && (
                    <div className="w-6 h-6 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-3 h-3 text-gold" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-gold/10 text-[#0a0a0a] rounded-br-md'
                      : 'bg-black/[0.04] text-[#525252] rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-lg bg-blue/10 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-3 h-3 text-blue" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {messages.length <= 2 && (
              <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                {t.chat.quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="px-3 py-1.5 bg-black/[0.03] border border-black/[0.08] rounded-full text-[11px] text-[#737373] hover:text-[#0a0a0a] hover:border-gold/20 transition-all"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            <div className="p-3 border-t border-black/[0.06]">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.chat.placeholder}
                  className="flex-1 px-4 py-2.5 bg-black/[0.02] border border-black/[0.08] rounded-xl text-[#0a0a0a] placeholder:text-[#a3a3a3] text-[13px] transition-all"
                />
                <button
                  type="submit"
                  aria-label="Envoyer"
                  className="px-3.5 py-2.5 bg-gradient-to-r from-gold to-gold-light rounded-xl hover:shadow-lg hover:shadow-gold/10 transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-dark-950" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
