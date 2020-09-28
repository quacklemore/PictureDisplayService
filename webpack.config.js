const path = require('path');
const source = path.join(__dirname, '/client');
const outputSource = path.join(__dirname, '/public');

module.exports = {
  entry: `${source}/index.jsx`,
  output: {
    path: outputSource,
    filename: 'bundle.js'
  },
  module: {
    rules: [{
        test: /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
                "@babel/preset-react",
                "@babel/preset-env"
            ],
          }
        }
    }]
  }

};