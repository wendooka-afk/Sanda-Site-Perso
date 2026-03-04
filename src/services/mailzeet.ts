// ── MailZeet Email Service ────────────────────────────────────────────────────
// API : POST https://api.mailzeet.com/v1/mails
// Auth : Bearer token dans le header Authorization
// Doc : https://docs.mailzeet.com/emails/sending-an-email

const MAILZEET_API_URL = 'https://api.mailzeet.com/v1/mails';
const MAILZEET_API_KEY = import.meta.env.VITE_MAILZEET_API_KEY as string;

// Email de destination (où tu reçois les messages du formulaire)
const CONTACT_RECIPIENT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'contact@oumarousanda.com';
const CONTACT_RECIPIENT_NAME = 'Oumarou Sanda';

// Email expéditeur (doit être autorisé sur ton serveur SMTP Mailzeet)
const SENDER_EMAIL = import.meta.env.VITE_MAILZEET_SENDER_EMAIL as string;
const SENDER_NAME = 'Site oumarousanda.com';

export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    budget?: string;
    message: string;
}

export interface MailZeetResponse {
    message: string;
    data?: { id: string; status: string };
    errors: unknown | null;
}

/**
 * Envoie un email via l'API MailZeet depuis le formulaire de contact.
 * ⚠️ NOTE : l'API MailZeet est appelée directement depuis le navigateur.
 * La clé API est exposée côté client → utilise une clé avec permissions minimales
 * (envoi uniquement) et restreins les domaines autorisés depuis le dashboard MailZeet.
 */
export async function sendContactEmail(data: ContactFormData): Promise<MailZeetResponse> {
    if (!MAILZEET_API_KEY) {
        throw new Error('VITE_MAILZEET_API_KEY manquante dans .env');
    }

    const subjectMap: Record<string, string> = {
        projet: 'Projet Web ou Digital',
        consulting: 'Consulting IA',
        sponsoring: 'Sponsoring',
        presse: 'Presse & Médias',
        autre: 'Autre demande',
    };
    const subjectLabel = subjectMap[data.subject] || data.subject;

    const budgetLine = data.budget ? `\nBudget estimé : ${data.budget}` : '';
    const phoneLine = data.phone ? `\nTéléphone : ${data.phone}` : '';

    const textBody = `
Nouveau message depuis oumarousanda.com

Nom : ${data.name}
Email : ${data.email}${phoneLine}
Sujet : ${subjectLabel}${budgetLine}

Message :
${data.message}

---
Ce message a été envoyé via le formulaire de contact de oumarousanda.com
`.trim();

    const htmlBody = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><style>
  body { font-family: 'Inter', Arial, sans-serif; color: #333; background: #f9f9f9; margin: 0; padding: 0; }
  .wrapper { max-width: 600px; margin: 32px auto; background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e5e5; }
  .header { background: #0a0a0a; padding: 32px; text-align: center; }
  .header h1 { color: #d4af37; font-size: 22px; margin: 0; font-weight: 800; letter-spacing: -0.5px; }
  .header p { color: #666; font-size: 12px; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 2px; }
  .body { padding: 32px; }
  .field { margin-bottom: 20px; }
  .label { color: #a0a0a0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px; }
  .value { color: #0a0a0a; font-size: 15px; font-weight: 600; }
  .message-box { background: #f5f5f5; border-radius: 12px; padding: 20px; margin-top: 24px; border-left: 4px solid #d4af37; }
  .message-box .label { margin-bottom: 10px; }
  .message-text { color: #333; font-size: 15px; line-height: 1.7; white-space: pre-wrap; }
  .footer { background: #fafafa; padding: 20px 32px; border-top: 1px solid #e5e5e5; text-align: center; }
  .footer p { color: #a0a0a0; font-size: 12px; margin: 0; }
  .badge { display: inline-block; background: #d4af37/10; color: #a07a10; border: 1px solid #d4af37; border-radius: 20px; padding: 4px 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
</style></head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>📬 Nouveau Message</h1>
      <p>oumarousanda.com — Formulaire de Contact</p>
    </div>
    <div class="body">
      <div style="display:flex;gap:16px;flex-wrap:wrap">
        <div class="field" style="flex:1;min-width:200px">
          <div class="label">Nom</div>
          <div class="value">${escapeHtml(data.name)}</div>
        </div>
        <div class="field" style="flex:1;min-width:200px">
          <div class="label">Email</div>
          <div class="value"><a href="mailto:${escapeHtml(data.email)}" style="color:#0a0a0a">${escapeHtml(data.email)}</a></div>
        </div>
      </div>
      ${data.phone ? `
      <div class="field">
        <div class="label">Téléphone</div>
        <div class="value">${escapeHtml(data.phone)}</div>
      </div>` : ''}
      <div style="display:flex;gap:16px;flex-wrap:wrap">
        <div class="field" style="flex:1;min-width:200px">
          <div class="label">Sujet</div>
          <div class="value">${escapeHtml(subjectLabel)}</div>
        </div>
        ${data.budget ? `<div class="field" style="flex:1;min-width:200px">
          <div class="label">Budget estimé</div>
          <div class="value">${escapeHtml(data.budget)}</div>
        </div>` : ''}
      </div>
      <div class="message-box">
        <div class="label">Message</div>
        <div class="message-text">${escapeHtml(data.message)}</div>
      </div>
    </div>
    <div class="footer">
      <p>Message envoyé depuis <strong>oumarousanda.com/contact</strong></p>
      <p style="margin-top:6px">Répondre directement à : <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
    </div>
  </div>
</body>
</html>
`.trim();

    const payload = {
        sender: {
            email: SENDER_EMAIL,
            name: SENDER_NAME,
        },
        recipients: [
            { email: CONTACT_RECIPIENT_EMAIL, name: CONTACT_RECIPIENT_NAME },
        ],
        // Reply-to = l'expéditeur (pour répondre directement) — tableau obligatoire
        reply_to: [
            { email: data.email, name: data.name },
        ],
        subject: `[Contact] ${subjectLabel} — ${data.name}`,
        text: textBody,
        html: htmlBody,
        params: {
            name: data.name,
            subject: subjectLabel,
        },
    };

    const response = await fetch(MAILZEET_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${MAILZEET_API_KEY}`,
        },
        body: JSON.stringify(payload),
    });

    const result: MailZeetResponse = await response.json();

    if (!response.ok) {
        const errorMsg = typeof result === 'object' && result !== null
            ? JSON.stringify(result)
            : `HTTP ${response.status}`;
        throw new Error(`Erreur MailZeet : ${errorMsg}`);
    }

    return result;
}

/** Échappe les caractères HTML dangereux */
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
