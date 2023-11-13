FROM node:18-alpine as base

WORKDIR /src
COPY package*.json ./

ENV PORT=3000
EXPOSE ${PORT}

ENV NODE_ENV=production
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]