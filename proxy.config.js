module.exports = {
  "/api": {
    changeOrigin: true,
    secure: false,
    target: process.env.SECURE_GW_ENDPOINT,
    logLevel: "info",
  }
};
