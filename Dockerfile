from node:8

WORKDIR /usr/src/app

ADD . .

RUN npm i

CMD node app.js
