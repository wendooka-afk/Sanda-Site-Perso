# ── Stage 1: Build ──────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app

# Declare build args for Vite env vars (set in Coolify → Environment Variables)
ARG VITE_DASHBOARD_PASSWORD
ARG VITE_MAILZEET_API_KEY
ARG VITE_MAILZEET_SENDER_EMAIL
ARG VITE_CONTACT_EMAIL

# Expose as ENV so Vite picks them up during build
ENV VITE_DASHBOARD_PASSWORD=$VITE_DASHBOARD_PASSWORD
ENV VITE_MAILZEET_API_KEY=$VITE_MAILZEET_API_KEY
ENV VITE_MAILZEET_SENDER_EMAIL=$VITE_MAILZEET_SENDER_EMAIL
ENV VITE_CONTACT_EMAIL=$VITE_CONTACT_EMAIL

# Install dependencies first (layer cache)
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build

# ── Stage 2: Serve ───────────────────────────────────────────────
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
