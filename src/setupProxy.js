const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/usuarios/**',
        createProxyMiddleware({
            target: 'http://127.0.0.1:8085',
            changeOrigin: true,
        })
    );
};