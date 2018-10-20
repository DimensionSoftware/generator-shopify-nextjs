// next.config.js
const
  nextEnv        = require('next-env'),
  dotenvLoad     = require('dotenv-load')

dotenvLoad()

const withNextEnv = nextEnv({})
module.exports = withNextEnv({})
