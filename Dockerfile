# Stage 1: Compilazione
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Esecuzione con NGINX
FROM nginx:alpine
# Copia il file di configurazione NGINX personalizzato
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# Copia il build finale da stage 1 nella directory di NGINX
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]