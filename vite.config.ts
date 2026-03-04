import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // Avertissement à 600KB (par défaut 500KB)
    chunkSizeWarningLimit: 600,
    // Activer la minification CSS
    cssMinify: true,
    // Inline les assets très petits (< 2KB) pour économiser des requêtes HTTP
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        // Code splitting par module ID — évite les doublons de react-dom entre chunks
        manualChunks(id) {
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/") || id.includes("node_modules/scheduler/")) {
            return "vendor-react";
          }
          if (id.includes("node_modules/react-router") || id.includes("node_modules/@remix-run/")) {
            return "vendor-router";
          }
          if (id.includes("node_modules/framer-motion/")) {
            return "vendor-motion";
          }
          if (id.includes("node_modules/lucide-react/")) {
            return "vendor-icons";
          }
          if (id.includes("node_modules/marked/") || id.includes("node_modules/dompurify/")) {
            return "vendor-content";
          }
        },
      },
    },
  },
});
