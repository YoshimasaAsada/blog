FROM node:20.12.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# ビルド時にサイトマップも生成
RUN npm run build

CMD ["npm", "run", "dev"]
