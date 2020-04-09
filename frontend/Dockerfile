FROM node:12.16-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:12.16-alpine
WORKDIR /var/www
RUN npm install -g http-server
COPY --from=builder /usr/src/app/public .
EXPOSE 8080
ENTRYPOINT ["http-server", "-a", "0.0.0.0", "-p", "8080"]
