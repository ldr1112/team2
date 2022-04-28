From node:12-alpine
WORKDIR /team2-back
COPY package*.json ./
RUN npm install --silent
COPY . .
CMD ["dev", "npm", "start"]
EXPOSE 3003