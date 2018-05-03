FROM mhart/alpine-node:10.0.0 as builder

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

ADD yarn.lock /yarn.lock
ADD package.json /package.json

RUN yarn --ignore-engines

WORKDIR /app
ADD . /app

RUN yarn run build

FROM mhart/alpine-node:10.0.0

ENV NODE_ENV=production

RUN addgroup -g 1000 -S node && \
    adduser -u 1000 -S node -G node

WORKDIR /app

COPY --from=builder /node_modules /node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/.env /app/.env
COPY --from=builder /app/.sequelizerc.prod /app/.sequelizerc

EXPOSE 7770

CMD ["node", "dist/server.js"]