const path = require('path');

module.exports = {
  mode: 'development',
  entry: './app/javascript/packs/application.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/packs/js'),
  },
  resolve: {
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  esmodules: true,
                },
              }]
            ],
            plugins: [
              '@babel/plugin-proposal-nullish-coalescing-operator',
              '@babel/plugin-proposal-optional-chaining'
            ]
          }
        }
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      }
    ]
  },
};
