FROM node:18-alpine As production

WORKDIR /app

ENV NODE_ENV=production

# Copy the bundled code from the build stage to the production image
COPY doc ./doc/
COPY node_modules ./node_modules/
COPY dist ./dist/
COPY .env ./.env
COPY prisma ./prisma/
COPY package*.json ./

RUN npm run prisma:generate
# Start the server using the production build
CMD [ "npm", "run", "start:migrate:prod" ]