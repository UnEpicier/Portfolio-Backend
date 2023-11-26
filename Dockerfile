FROM node:18-alpine as base

WORKDIR /src
COPY package*.json ./

EXPOSE 3000

RUN npm ci
COPY . .
RUN npm run build
ENV NODE_ENV=production
CMD ["npm", "start"]