module.exports = {
  "/api": {
    changeOrigin: true,
    secure: false,
    target: "https://api.dev.cloud.stakater.com",
    pathRewrite: {
      "^/api/": "/",
    },
    logLevel: "info",
  },
  "/iam": {
    changeOrigin: true,
    secure: false,
    target: "https://iam.dev.cloud.stakater.com",
    pathRewrite: {
      "^/iam/": "/",
    },
    logLevel: "info",
  },
  "/domain": {
    changeOrigin: true,
    secure: false,
    target: "https://iam-api.dev.cloud.stakater.com",
    pathRewrite: {
      "^/domain/": "/realm/",
    },
    logLevel: "info",
  },
};
