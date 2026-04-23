# --- Stage 1: Base ---
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# --- Stage 2: Build ---
FROM base AS build
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# --- Stage 3: Dev (local testing) ---
FROM node:20-alpine AS dev
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "dev"]

# --- Stage 4: Production ---
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY package.json ./
COPY prisma ./prisma
EXPOSE 3000
CMD ["node", "dist/app.js"]
