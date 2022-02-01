const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const Dotenv = require('dotenv-webpack');
const WebpackPwaManifest = require('webpack-pwa-manifest')
 module.exports = {
    entry: ["regenerator-runtime/runtime.js", './src/index.js'],
    plugins: [
      new Dotenv({
        path: './.env', // Path to .env file (this is the default)
        safe: false, // load .env.example (defaults to "false" which does not use dotenv-safe)
      }),
      new HtmlWebpackPlugin({
        title: 'Résin',
        template: './public/index.html',
        favicon:  './public/favicon.ico',
        inject: true
        
      }),
      new WorkboxPlugin.InjectManifest({
        swSrc: './src/service-worker/sw.js',
        swDest: './service-worker.js',
        compileSrc: true,
        maximumFileSizeToCacheInBytes : 500000000,
      }),
      new WebpackPwaManifest({
        filename: 'manifest.json',
        fingerprints: true,
        short_name: 'Proms',
        name: 'Projects Manager Simple',
        gcm_sender_id: '19700101',
        inject: true,
        start_url: '/',
        includeDirectory: true,
        background_color: '#f0f2f5',
        crossorigin: 'use-credentials',
        display: 'standalone',
        description: 'a simple projects management app'
      })
    ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { 
          presets: ["@babel/env"],
          plugins: ["@babel/plugin-proposal-class-properties"]
       }
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          useRelativePath: true,
          esModule: false
        }
      }
    ]
  },
   output: {
    filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
  resolve: { 
    extensions: ["*", ".js", ".jsx"],
    alias: { 'react-dom': '@hot-loader/react-dom'  } 
  },
 };