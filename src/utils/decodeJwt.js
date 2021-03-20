const jwt = require('jsonwebtoken')

async function decodeJwt(token) {
  return await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)
}

module.exports = decodeJwt
