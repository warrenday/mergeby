
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./mergeby.cjs.production.min.js')
} else {
  module.exports = require('./mergeby.cjs.development.js')
}
