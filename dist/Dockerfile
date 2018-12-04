# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.

FROM keymetrics/pm2:latest-alpine

ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /tmp
COPY package.json /tmp/
RUN  npm install
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/

ENV NODE_ENV=production
ENV PORT=8080
CMD [ "pm2-runtime", "start", "pm2.json", "--web" ]
EXPOSE 8080

