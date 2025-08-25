FROM nginx:alpine


# Сначала конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Потом билд Angular
COPY ./dist/anda-fisher-f/browser/ /usr/share/nginx/html

EXPOSE 80
