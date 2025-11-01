const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');


module.exports = {
     mode: 'development',
     entry: {
          index: [
               path.resolve(__dirname, 'src/js/index.js'),
               path.resolve(__dirname, 'src/sass/style.scss'),
          ],
          trip1: [
               path.resolve(__dirname, 'src/js/trip.js'),
               path.resolve(__dirname, 'src/sass/trip-1.scss'),
          ],
          trip2: [
               path.resolve(__dirname, 'src/js/trip.js'),
               path.resolve(__dirname, 'src/sass/trip-1.scss'),
          ],
          forms: [
               path.resolve(__dirname, 'src/js/forms.js'),
               path.resolve(__dirname, 'src/sass/forms.scss'),
          ],
     },
     output: {
          path: path.resolve(__dirname, 'dist'),
          filename: 'js/[name].bundle.js',
          clean: true,
     },
     devServer: {
          static: { directory: path.join(__dirname, 'dist') },
          compress: true,
          port: 9000,
          open: true,
     },
     optimization: {
          runtimeChunk: 'single',
          splitChunks: {
               chunks: 'all',
               maxInitialRequests: 3,
               cacheGroups: {
                    vendor: {
                         test: /[\\/]node_modules[\\/]/,
                         name: 'vendors',
                         chunks: 'all',
                         priority: 10
                    },
                    common: {
                         minChunks: 2,
                         name: 'common',
                         chunks: 'all',
                         priority: 5
                    }
               }
          }
     },
     performance: {
          // Increase limits since we have many images
          maxEntrypointSize: 2500000, // 2.5MB
          maxAssetSize: 1500000,      // 1.5MB
          hints: 'warning'
     },
     module: {
          rules: [
               {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                         loader: 'babel-loader',
                         options: { presets: ['@babel/preset-env'] },
                    },
               },
               {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                         MiniCssExtractPlugin.loader,
                         'css-loader',
                         {
                              loader: 'sass-loader',
                              options: {
                                   // use Dart Sass and silence deprecation warnings from dependencies
                                   implementation: require('sass'),
                                   sourceMap: true,
                                   sassOptions: {
                                        quietDeps: true,
                                   },
                              },
                         },
                    ],
               },
               {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: 'asset',
                    parser: {
                         dataUrlCondition: {
                              // Images under 8kb will be inlined as base64
                              maxSize: 8 * 1024
                         }
                    },
                    generator: {
                         filename: 'image/[name][ext]',
                    },
               },
               {
                    test: /\.html$/i,
                    loader: 'html-loader',
                    options: {
                         minimize: true,
                         // Add loading="lazy" to img tags except above-the-fold ones
                         preprocessor: (content) => {
                              return content.replace(
                                   /<img(?!\s+loading=["'])[^>]*(?!class=["'][^"']*\bhero\b[^"']*["'])[^>]*>/g,
                                   match => match.replace(/<img/, '<img loading="lazy"')
                              );
                         }
                    }
               },
          ],
     },
     plugins: [
          new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
          new ImageMinimizerPlugin({
               minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                         plugins: [
                              ["mozjpeg", {
                                   quality: 60,  // More aggressive compression
                                   progressive: true // Progressive loading
                              }],
                              ["pngquant", {
                                   quality: [0.5, 0.7],  // More compression
                                   speed: 1  // Highest quality compression
                              }],
                         ],
                    },
               },
          }),
          new HtmlWebpackPlugin({ template: './src/index.html', filename: 'index.html', chunks: ['index'] }),
          new HtmlWebpackPlugin({ template: './src/login.html', filename: 'login.html', chunks: ['forms'] }),
          new HtmlWebpackPlugin({ template: './src/sign-up.html', filename: 'sign-up.html', chunks: ['forms'] }),
          new HtmlWebpackPlugin({ template: './src/trip-1.html', filename: 'trip-1.html', chunks: ['trip1'] }),
          new HtmlWebpackPlugin({ template: './src/trip-2.html', filename: 'trip-2.html', chunks: ['trip2'] }),
     ],
};
