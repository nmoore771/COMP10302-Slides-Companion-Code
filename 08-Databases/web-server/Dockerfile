FROM node:lts-alpine

WORKDIR /usr/app
COPY . /usr/app
COPY server.mjs /usr/app
RUN npm install

EXPOSE 3000
ENTRYPOINT ["node", "server.mjs"]