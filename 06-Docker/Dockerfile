FROM node:lts-alpine

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install

EXPOSE 3000
ENTRYPOINT sh start.sh