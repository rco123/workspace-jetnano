const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'development',
  devServer: {
    static: './dist',
    port: 8888,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

      {
        test: /\.(png|jpg|gif|mp3|wav|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: 'src', // prevent display of src/ in filename
              outputPath: 'assets/',
            },
          },
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico',
      inject: 'body',
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/media', to: 'media' },  // media 디렉토리를 복사
        { from: 'src/images', to: "images"},
        { from: 'src/ublocks/code_blk', to: "ublocks/code_blk"},
        
      ],
    }),

  ],
  resolve: {
    extensions: ['.js'],
  },
};
