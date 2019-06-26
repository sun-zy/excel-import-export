'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1543909941861_5688';

    config.security = {
        csrf: {
            enable: false,
        },
        domainWhiteList: ['http://localhost:8001'],
    };
    // // add your config here
    // //gzip 压缩body返回
    config.middleware = ['errorHandler'];
    config.bodyParser = {
        enable: true,
        encoding: 'utf8',
        formLimit: '100kb',
        jsonLimit: '100kb',
        strict: true,
        // @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
        queryString: {
            arrayLimit: 100,
            depth: 5,
            parameterLimit: 1000,
        },
    };
    //接口内容压缩
    config.gzip = {
        threshold: 50,
    };
    //允许请求的类型
    config.cors = {
        //    origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    };

    config.multipart  = {
        whitelist:[".xlsx",".xls"]
    };
    // 自定义端口
    config.cluster = {
        listen: {
            port: 7030
        }
    };

    return config;
};