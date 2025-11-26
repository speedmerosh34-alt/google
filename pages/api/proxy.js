const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  let target = "https://www.google.com/";

  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {},
  })(req, res);
};
