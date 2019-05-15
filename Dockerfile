# base image
FROM node:8.9.3-alpine

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . /usr/src/app/

RUN npm run build

# start app
CMD ["npm", "run", "serve"]
