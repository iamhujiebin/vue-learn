'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  WS_URL:'"ws://127.0.0.1:3620"',
  HTTP_URL:'"http://127.0.0.1:3600"',
});
