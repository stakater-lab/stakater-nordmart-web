const express = require('express');
const server = express();
const {createProxyMiddleware} = require('http-proxy-middleware');

server.set("keepAliveTimeout", 61 * 1000);
server.set("headersTimeout", 65 * 1000);

server.get("/keycloak.json", (req, res) => {
  res.json({
    "auth-server-url": process.env.SSO_URL,
    "realm": process.env.SSO_REALM,
    "resource": process.env.SSO_CLIENT_ID,
    "ssl-required": "external",
    "public-client": true,
    "confidential-port": 0
  });
});

server.use(express.static("dist"));

server.use("/api", createProxyMiddleware({
  changeOrigin: true,
  secure: true,
  target: process.env.SECURE_GW_ENDPOINT,
  logLevel: "info",
}));

server.listen(4200, () => {
  console.log(`Page served at: http://localhost:4200`);
});
