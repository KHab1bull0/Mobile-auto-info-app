FROM node:18-alpine

WORKDIR /app

COPY package*.json . 

RUN npm install 

COPY . . 

RUN npx prisma generate

ENV DOT_ENV_PATH=./.env

EXPOSE 6000

CMD ["npm", "run", "start"]

 