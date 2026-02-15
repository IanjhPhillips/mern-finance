FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --quiet

COPY . .

EXPOSE 8081

CMD ["npm", "start"]
