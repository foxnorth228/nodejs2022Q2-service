FROM node:18-alpine

WORKDIR /usr/app

COPY --chown=node:node package*.json ./

RUN npm install
COPY --chown=node:node . .

RUN npm run prisma:generate
EXPOSE ${PORT}
USER node
CMD [ "npm", "run", "start:migrate:dev" ]