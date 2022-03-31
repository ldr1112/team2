# syntax=docker/dockerfile:1
FROM node:12-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm run", "dev"]
EXPOSE 3003