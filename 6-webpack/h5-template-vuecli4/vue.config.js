const path = require('path');

module.exports = {
    chainWebpack: config => {
        config.resolve.alias

            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@components', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@static', resolve('src/static'));
    }
};