FROM --platform=linux/amd64 node:22-alpine3.18

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci  && npm cache clean --force

COPY prisma ./prisma

RUN npx prisma generate 

COPY . .

RUN mkdir -p /usr/src/app/logs

EXPOSE 4000

CMD [ "npm", "run", "start:dev" ]










