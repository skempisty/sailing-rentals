const jwt = require('express-jwt')

/**
 * Authenticates request with standard JWT
 *
 * @returns {*} hands over control to next matching route or returns error
 */
const secret = process.env.JWT_SECRET

const pathFilter = function(req) {
  const excludedPaths = [
    '/api/health',
    '/api/users/login',
    '/api/carousel_slides', // TODO: need to lock down POST endpoint
    '/api/posts' // TODO: need to lock down POST endpoint
  ]

  return (
    !/^\/api/.test(req.path) || // exclude any non-api paths
    excludedPaths.includes(req.path)
  )
}

module.exports = jwt({ secret, algorithms: ['HS256'] }).unless(pathFilter)
