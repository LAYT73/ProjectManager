FROM node:20.10.0

WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@10.2.3
RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "run", "start"]