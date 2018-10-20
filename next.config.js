// next.config.js
const
  nextEnv        = require('next-env'),
  dotenvLoad     = require('dotenv-load'),
  withCSS = require('@zeit/next-css')

dotenvLoad()

const withNextEnv = nextEnv({})
module.exports = withCSS(withNextEnv({}))
