const { environment } = require('@rails/webpacker')
const { resolve } = require('path')

environment.loaders.get('babel').exclude = []

// .mjsファイルを適切に処理するための設定
environment.loaders.append('mjs', {
  test: /\.mjs$/,
  include: /node_modules/,
  type: 'javascript/auto',
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-optional-chaining']
    }
  }
})

module.exports = environment
