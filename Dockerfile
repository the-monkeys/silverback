FROM oven/bun:alpine AS base

# All deps stage
FROM base AS deps
WORKDIR /app
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
FROM gcr.io/distroless/nodejs22 AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app

EXPOSE 8080
CMD ["./bin/server.js"]
