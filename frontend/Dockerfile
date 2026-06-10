FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3541

EXPOSE 3541

CMD ["npm", "start"]