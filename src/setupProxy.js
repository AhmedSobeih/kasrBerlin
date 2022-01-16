const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
 
  app.use(
    createProxyMiddleware("/login2", { target: "http://localhost:8080/" })
  );


};