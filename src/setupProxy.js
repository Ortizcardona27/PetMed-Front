const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8085',
      changeOrigin: true,
    })
  );

  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8082',
      changeOrigin: true,
    })
  );
};