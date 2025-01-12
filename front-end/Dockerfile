FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object

RUN npm install

RUN npx update-browserslist-db@latest

COPY . .

CMD npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]