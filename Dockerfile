# ── Stage 1: Build + Prerender ───────────────────────────────────
FROM node:22-bookworm-slim AS build
WORKDIR /app

# Install Chromium + deps for Puppeteer prerendering
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    fonts-liberation \
    libnss3 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Point Puppeteer to system Chromium (saves ~170MB by skipping its own download)
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Declare build args for Vite env vars (set in Coolify → Environment Variables)
ARG VITE_DASHBOARD_PASSWORD

ENV VITE_DASHBOARD_PASSWORD=$VITE_DASHBOARD_PASSWORD

# Install dependencies first (layer cache)
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copy source and build (vite build + prerender via Puppeteer)
COPY . .
RUN npm run build

# ── Stage 2: Serve ───────────────────────────────────────────────
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
