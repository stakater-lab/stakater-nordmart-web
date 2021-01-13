module.exports = {
  "/api": {
    changeOrigin: true,
    secure: false,
    target: "https://gateway-veeru-dev.apps.devtest.41b996e9.kubeapp.cloud",
    logLevel: "info",
  },
  "/static": {
    target: "https://web-veeru-dev.apps.devtest.41b996e9.kubeapp.cloud",
    changeOrigin: true,
    pathRewrite: {
      '^/static': '',
    },
  },
};
