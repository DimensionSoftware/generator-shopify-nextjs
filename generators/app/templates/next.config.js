// next.config.js
const
  nextEnv    = require('next-env'),
  dotenvLoad = require('dotenv-load'),
  withCSS    = require('@zeit/next-css')

// load & use dotenv
dotenvLoad()
const withNextEnv = nextEnv({
  // TODO custom config
})

module.exports = withNextEnv(withCSS({}))
