//webpack.config.js  
var webpack = require('webpack'); 
const path = require('path');
const apiMocker = require('webpack-api-mocker');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = (env) => {
  let isDev = env == "devEnv";
  return {
      entry: {
        'vendor': ['antd'],
        'reducers': ['./src/app/AppRootReducer.js'],
        'bundle': ['babel-polyfill','./src/main.js']
      },
      output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name]'+(isDev?"":".[hash]")+'.js'
      },
      optimization: {
            runtimeChunk: {
                name: "manifest"
            },
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        priority: -20,
                        chunks: "all"
                    }
                }
            }
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              presets: ["react", "es2015","stage-0"]
            }
          },{
            test: /\.css$/,
            //exclude: /node_modules/,
            use: [
                //'style-loader', 
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        },{
          　 test: /\.(png|jpg|gif)$/,
  　　　　　　loader: 'file-loader',
             options: {
               name: '[name].[ext]',
               outputPath: 'asset/img'
             }
  　　　　}
        ]
      },
    optimization: { 
          runtimeChunk: false, 
          splitChunks: { 
            cacheGroups: { 
                   vendor: { name: "vendor", chunks: "initial", minChunks: 2 , enforce:true} 
                } 
            } 
      },
      plugins: [
        //webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead.
        //new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'}),
        
         new webpack.HotModuleReplacementPlugin()
        ,new HtmlWebpackPlugin({
          template: "./src/index.html",
          filename: "./index.html",
        })
        ,new MiniCssExtractPlugin({
          filename: '[name]'+(isDev?"":".[hash]")+'.css',
          chunkFilename: '[name]'+(isDev?"":".[hash]")+'.css'
        })
        ,new webpack.optimize.SplitChunksPlugin({
          chunks: "chunks",
          reuseExistingChunk:true
        })
        ,new CleanWebpackPlugin(['dist'])
      ],
    devtool: isDev? 'source-map' : 'eval',
      devServer: {
        contentBase: path.join(__dirname, "dist"),
        host: "127.0.0.1",
        port: 3001,
        compress: true,
        historyApiFallback: true,
        stats: 'normal',
        inline: true,
        hot: true,
        open: true,
        before(app) {
            apiMocker(app, path.resolve('./mocker.js'), {
            // 'GET /api/users/list': 'http://localhost:3000',
            // 'GET /api/userinfo/:id': 'http://localhost:3000',
            })
        }
      }
    }
};  