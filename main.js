// 引用依赖
const express = require('express');
const proxy = require('http-proxy-middleware');

// {
//   target: 'localhost', // 目标服务器 host
//   changeOrigin: true,               // 默认false，是否需要改变原始主机头为目标URL
//   ws: false,                         // 是否代理websockets
//   pathRewrite: {
//     '^/api/old-path': '/api/new-path',     // 重写请求，比如我们源访问的是api/old-path，那么请求会被解析为/api/new-path
//     '^/api/remove/path': '/path',           // 同上
//   },
// };

const options = {
    '/api': {
        target: 'http://192.168.66.95:8080',
        changOrigin: true,
        logLevel: 'debug'
    },
    '/XGZ':{
        // target: 'http://192.168.100.8',
        target: 'http://192.168.100.38',
        // target: 'http://192.168.104.133:8080',
        changOrigin: true,
        logLevel: 'debug'
    }
};

// 使用代理
const app = express();

for (const key in options) {
    if (options[key] !== undefined) {
        app.use(key, proxy(options[key]));
    }
}

// app.use(express.static('D:\\project\\libary\\new-library\\tttc_library_web\\app', {cacheControl: true, maxAge: 0}));
app.use(express.static('D:\\project\\XGZ\\ui\\app', {cacheControl: true, maxAge: 0}));

app.listen(8084);
