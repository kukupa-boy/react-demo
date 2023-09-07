// 处理react跨域的问题,需要提供一个中间件http-proxy-middleware
// devserver的底层使用的也是这个
// 也可以在package.json中配置proxy（这种方法只能代理到一台服务器，很不方便）
const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports =  function (app) {
    app.use(
        createProxyMiddleware('/jian',{
            target: 'https://www.jianshu.com/asimov',
            changeOrigin: true,
            ws:true,
            pathRewrite: {
                "^/jian": ""
            }
        })
    );
    app.use(
        createProxyMiddleware('/zhi',{
            target: 'https://news-at.zhihu.com/api/4',
            changeOrigin: true,
            ws:true,
            pathRewrite: {
                "^/zhi": ""
            }
        })
    );
    app.use(
        createProxyMiddleware('/api',{
            target: 'http://127.0.0.1:7100',
            changeOrigin: true,
            ws:true,
            pathRewrite: {
                "^/api": ""
            }
        })
    );
}