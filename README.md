# stakater-nordmart-web

## Overview

A node js web application.

It requires following things to be installed:

* Node: ^8.0.
* NPM.

## Configurations

Environment variables can be provided to configure the customer service.

* SECURE_GW_ENDPOINT - Secure gateway service endpoint.
* PORT - Port of the web application.

**Keycloak configurations**
*SSO_URL - Keycloak authentication URL
*SSO_REALM - Keycloak realm name
*SSO_CLIENT_ID - Keycloak client

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

### Helm Charts

#### Pre-requisites

Helm operator needs to to be running inside the cluster. Helm operator is deployed by Stakater Global Stack, deployment guidelines are provided in this [link](https://playbook.stakater.com/content/processes/bootstrapping/deploying-stack-on-azure.html)

#### Helm chart deployment

To create helm release of this application using the command given below:

kubectl apply -f [helm-release](https://github.com/stakater-lab/nordmart-dev-apps/blob/master/releases/web-helm-release.yaml).yaml -n <namespace-name>
