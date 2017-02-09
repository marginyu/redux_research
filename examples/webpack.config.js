var path = require('path');
var webpack = require('webpack');

module.exports = {
  //webpack-dev-server相关配置
  devtool: 'eval',
  //入口文件配置
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index'
  ],
  //输出
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  //使用什么插件
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  //无法解析文件时,自动加上哪些后缀
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'redux': path.resolve(__dirname, '../src') 
    }
  },
  module: {
    loaders: [{
      //对什么文件进行处理
      test: /\.jsx?$/,
      //需要用到的插件
      loaders: ['react-hot', 'babel'],
      //包括哪些文件夹
      include: [
        __dirname,
        path.resolve(__dirname, '../src')
      ]
    }]
  }
};
