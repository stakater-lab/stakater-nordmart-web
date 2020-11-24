module.exports = {
  "/api": {
    changeOrigin: true,
    secure: false,
    target: "https://web-nordmart-dev.apps.binero.06p407u4.kubeapp.cloud",
    logLevel: "info",
  },
  "*.json": {
    target: "https://web-nordmart-dev.apps.binero.06p407u4.kubeapp.cloud",
  },
};
