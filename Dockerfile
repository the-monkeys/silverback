# Base image using Bun (Alpine variant)
FROM oven/bun:alpine AS base

# All deps stage
FROM base AS deps
WORKDIR /app
# If you already have bun.lockb, you can add it here too
COPY package.json bun.lock ./
RUN bun install

# Production only deps stage
FROM base AS production-deps
WORKDIR /app
COPY package.json bun.lock ./
# Install without devDependencies (similar to npm ci --omit=dev)
RUN bun install --production

# Build stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY . .

RUN bun x ace build

# Production stage
FROM oven/bun:distroless AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app

EXPOSE 8080
# Bun runs Node-compatible entrypoints directly
CMD ["bun", "./bin/server.js"]
