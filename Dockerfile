# 1) Сборка Angular внутри контейнера
FROM node:20-alpine AS build
WORKDIR /app

# Быстрый и воспроизводимый install
COPY package*.json ./
RUN npm ci

# Копируем исходники и собираем
COPY . .
RUN npm run build

# 2) Лёгкий runtime с nginx
FROM nginx:stable-alpine

# Конфиг nginx для SPA (твой файл в корне репо)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Кладём готовый билд из предыдущего шага
COPY --from=build /app/dist/anda-fisher-f/browser/ /usr/share/nginx/html

EXPOSE 80
