# === Base build stage ===
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.3.1

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn generate
RUN yarn build

RUN yarn workspaces focus --all --production

# === Final lightweight stage ===
FROM node:22-alpine AS runtime

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.3.1

COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarn /app/.yarn
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/email /app/email
COPY --from=builder /app/package.json ./package.json

ARG PORT=3000
ENV PORT=${PORT}
ENV NODE_ENV=production
EXPOSE ${PORT}

CMD ["node", "dist/main"]
