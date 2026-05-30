/// <reference types="vite/client" />

interface ImportMetaEnv {
    // ── Dashboard ───────────────────────────────────────────────────────────────
    readonly VITE_DASHBOARD_PASSWORD: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
