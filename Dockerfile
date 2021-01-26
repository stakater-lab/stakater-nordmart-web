# BUILD APP
FROM node:14 as build
WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

## SETUP NGINX
FROM nginx
# support running as arbitrary user which belogs to the root group
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx /etc/nginx/conf.d
RUN chmod 777 -R /etc/nginx/conf.d/default.conf
# users are not allowed to listen on priviliged ports
RUN sed -i.bak 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf
# comment user directive as master process is run as user in OpenShift anyhow
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

COPY --from=build /app/dist /var/www
COPY --from=build /app/deploy/default.conf.template /etc/nginx/templates/

EXPOSE 8080

# START SERVER
CMD ["nginx", "-g", "daemon off;"]
