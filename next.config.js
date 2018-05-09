const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob')
const CSSExtract = new ExtractTextPlugin('styles.css');

module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/'},
    }
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    config.module.rules.push(
     {
       test: /\.(css|scss)/,
       loader: 'emit-file-loader',
       options: {
         name: 'dist/[path][name].[ext]'
       }
     }
   ,
     {
       test: /\.css$/,
       use: ['babel-loader', 'raw-loader', 'postcss-loader']
     }
   ,
     {
       test: /\.s(a|c)ss$/,
       use: ['babel-loader', 'raw-loader', 'postcss-loader',
         { loader: 'sass-loader',
           options: {
             includePaths: ['styles', 'node_modules']
               .map((d) => path.join(__dirname, d))
               .map((g) => glob.sync(g))
               .reduce((a, c) => a.concat(c), [])
           }
         }
       ]
     }
   )
    return config
  }
}
