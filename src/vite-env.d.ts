/// <reference types="vite/client" />

interface ImportMetaEnv {
    // ── MailZeet ────────────────────────────────────────────────────────────────
    readonly VITE_MAILZEET_API_KEY: string;
    readonly VITE_MAILZEET_SENDER_EMAIL: string;

    // ── Contact ─────────────────────────────────────────────────────────────────
    readonly VITE_CONTACT_EMAIL: string;

    // ── Dashboard ───────────────────────────────────────────────────────────────
    readonly VITE_DASHBOARD_PASSWORD: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
