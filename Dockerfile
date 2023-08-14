FROM node:16

ADD . /opt/app
WORKDIR /opt/app
RUN npm i

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "node", "dist/main.js" ]