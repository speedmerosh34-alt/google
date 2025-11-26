const { createProxyMiddleware } = require('http-proxy-middleware');

const apiProxy = createProxyMiddleware({
  target: 'https://www.google.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/proxy': '',
  },
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  },
});

export default (req, res) => apiProxy(req, res);
