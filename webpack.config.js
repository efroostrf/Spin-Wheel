var path = require('path');

module.exports = {
   entry: {
      app: './src/index.js'
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
   },
   mode:'development',
   module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};