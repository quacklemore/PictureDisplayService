const path = require('path');
const source = path.join(__dirname, '/Client');
const outputSource = path.join(__dirname, '/public');

module.exports = {
  entry: `${source}/index.jsx`,
  mode: "developement",
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: outputSource,
    filename: 'bundle.js'
  },
  module: {
    rules: [{
        test: /\.jsx?/,
        include: source,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: [
                "@babel/preset-react",
                "@babel/preset-env"
            ],
          }
        }
    }]
  }
};