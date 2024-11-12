FROM node:20-alpine as build

RUN npm install pnpm -g

RUN mkdir /app && \
    chown -R node:node /app

USER node

WORKDIR /app

ADD package.json .
ADD pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile

ADD app ./app
ADD components ./components
ADD lib ./lib
ADD public ./public
ADD utils ./utils
ADD tsconfig.json .
ADD tailwind.config.ts .
ADD next.config.ts .
ADD components.json .
ADD postcss.config.mjs .

RUN pnpm run build

FROM node:20-alpine

RUN mkdir /app && \
    chown -R node:node /app

RUN npm install pm2 -g

USER node
WORKDIR /app

COPY --from=build /app/.next ./.next
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules/

CMD ["pm2-runtime", "start", "npm", "--", "start"]