module.exports = {
  "/api": {
    changeOrigin: true,
    secure: true,
    target: "https://gateway-veeru-dev.apps.devtest.41b996e9.kubeapp.cloud",
    logLevel: "info",
  },
  "/keycloak.json": {
    target: "https://web-veeru-dev.apps.devtest.41b996e9.kubeapp.cloud",
    changeOrigin: true,
    secure: false,
  },
};
