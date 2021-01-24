# BUILD APP
FROM node:14 as build
WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

## SETUP NGINX
FROM nginx
COPY --from=build /app/dist /var/www
COPY --from=build /app/default.conf.template /etc/nginx/templates/

ARG NGINX_PORT
ENV NGINX_PORT ${NGINX_PORT}
EXPOSE ${NGINX_PORT}

# START SERVER
CMD ["nginx", "-g", "daemon off;"]
