module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-discard-overridden'),
    require('cssnano')({
      preset: [
        'default', {
          discardComments: {
            removeAll: true,
          }
        }
      ]
    })
  ]
}