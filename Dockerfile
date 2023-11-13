FROM node:18-alpine as base

WORKDIR /src
COPY package*.json ./
EXPOSE 3000

ENV NODE_ENV=production
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]