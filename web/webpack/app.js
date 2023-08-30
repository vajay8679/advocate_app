const mix = require("laravel-mix");
const path = require('path');
mix.webpackConfig({
    output: {
        publicPath: 'app/',
    },
}).setPublicPath('public/app');
mix.override(webpackConfig => {
    webpackConfig.module.rules.push({
        test: /\.(jpg|png)$/,
        loader: 'url-loader',
        //loader: 'file?name=[path][name].[ext]',
        // include: path.join(__dirname, 'resources/js/app/assets')
    });
});

mix.js('resources/js/app/index.jsx', 'public/app/').react();
