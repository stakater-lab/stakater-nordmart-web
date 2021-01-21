# BUILD APP
FROM node:15 as build
WORKDIR /app
COPY . .

ARG SECURE_GW_ENDPOINT
ARG SSO_URL
ARG SSO_CLIENT_ID
ARG SSO_REALM
ARG NGINX_PORT

RUN npm install
RUN npm run build -- \
    --env SECURE_GW_ENDPOINT=$SECURE_GW_ENDPOINT \
    --env SSO_URL=$SSO_URL \
    --env SSO_CLIENT_ID=$SSO_CLIENT_ID \
    --env SSO_REALM=$SSO_REALM

## SETUP NGINX
FROM nginx
COPY --from=build /app/dist /var/www
COPY --from=build /app/default.conf.template /etc/nginx/templates/

EXPOSE ${NGINX_PORT}

# START SERVER
CMD ["nginx", "-g", "daemon off;"]
