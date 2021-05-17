
# stakater-nordmart-web

## Overview

A node js web application.

It requires following things to be installed:

* Node: ^8.0.
* NPM.

## Dependencies

Web has two dependencies; and following environment variables must be provided.

### Gateway

* SECURE_GW_ENDPOINT - Secure gateway service endpoint.
* PORT - Port of the web application.

### KeyCloak

* SSO_URL - Keycloak authentication URL
* SSO_REALM - Keycloak realm name
* SSO_CLIENT_ID - Keycloak client

## Deployment strategy

### Local deployment

To run the application locally first install all the dependencies by executing

```bash
npm install
```

You will have to change ```proxy.config.js``` reverse proxy to correct ```api``` and ```keycloak``` server address.
Then start the application using:

```bash
npm start
```

### Docker

To deploy app inside a docker container
* Setup ```api``` and ```keycloak``` env variables in ```docker-compose.yml```
```
--env SECURE_GW_ENDPOINT={Secure gateway service endpoint}
--env SSO_URL= {Keycloak authentication URL}
--env SSO_REALM= {Keycloak realm name}
--env SSO_CLIENT_ID= {Keycloak client}
```
* Create aand run the container

  ```bash
  docker-compose build && docker-compose up
  ```
