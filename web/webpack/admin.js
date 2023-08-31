const mix = require('laravel-mix');

mix.webpackConfig({
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                "style-loader", "css-loader", 'postcss-loader', 'resolve-url-loader', 'sass-loader?sourceMap'
            ]
        }]
    },
    output: {
        publicPath: 'admin-app/',
        //path: path.resolve(__dirname, '../public/admin-app'),
    },
}).setPublicPath('public/admin-app');
//console.log('mix', mix);
mix.copyDirectory('resources/js/admin/assets', 'public/admin-app/assets');
// mix.react('resources/js/admin/index.js', 'public/admin-app/');
mix.js('resources/js/admin/index.js', 'public/admin-app/').react();