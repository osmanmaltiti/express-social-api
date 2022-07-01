FROM node:16-alpine3.15

WORKDIR /usr/src/mock-api

COPY ./ /usr/src/mock-api

COPY ./prisma/ /usr/src/mock-api/prisma/

COPY package.json /usr/src/mock-api/

RUN npm install

RUN npx prisma generate

CMD [ "/bin/bash" ]
