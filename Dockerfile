FROM node:18-alpine as base

WORKDIR /src
COPY package*.json ./
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]