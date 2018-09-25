var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve('dist/Resume/'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-3',]
                }
            },
            // {
            //   test: /\.(gif|svg|jpg|png|)$/,
            //   loader: "file-loader",
            // },
            {
                test: /\.css$/,
                use: [
                  { loader: "style-loader" },
                  { loader: "css-loader" }
                ]
            },
            {
              test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|php)(\?[a-z0-9=.]+)?$/,
              loader: 'url-loader?limit=100000' ,
          }
          

        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body'
    })],
    devServer: {
        historyApiFallback: true,
          headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    node:{
        child_processes: true,
    }
    }
