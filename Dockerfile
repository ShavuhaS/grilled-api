FROM node:22-alpine

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.3.1

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .


RUN yarn generate

RUN yarn build

RUN yarn workspaces focus --all --production

ARG PORT=3000
ENV PORT=${PORT}
ENV NODE_ENV=production
EXPOSE ${PORT}

CMD node dist/main