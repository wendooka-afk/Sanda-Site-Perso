import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Sert public/<slug>/index.html pour les pages articles statiques
    // (en prod Apache fait ça nativement via DirectoryIndex)
    {
      name: "serve-static-articles",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const pathname = (req.url ?? "/").split("?")[0].split("#")[0];
          // Ignore la racine et les chemins avec extension (.js, .css, etc.)
          if (pathname === "/" || path.extname(pathname)) return next();
          const clean = pathname.replace(/^\/|\/$/g, "");
          const candidate = path.resolve(__dirname, "public", clean, "index.html");
          if (fs.existsSync(candidate)) {
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(fs.readFileSync(candidate));
          } else {
            next();
          }
        });
      },
    },
  ],
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
