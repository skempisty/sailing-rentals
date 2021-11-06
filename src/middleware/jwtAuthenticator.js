const jwt = require('express-jwt')

/**
 * Authenticates request with standard JWT
 *
 * @returns {*} hands over control to next matching route or returns error
 */
const secret = process.env.JWT_SECRET

const pathFilter = (req) => {
  const { path, method } = req

  const excludedPaths = [
    { path: '/api/health' },
    { path: '/api/site_data' },
    { path: '/api/logged_in_data' },
    { path: '/api/users/login' },
    { path: '/api/carousel_slides', methods: [ 'GET' ] },
    { path: '/api/posts', methods: [ 'GET' ] },
    { path: '/api/boats', methods: [ 'GET' ] },
    { path: '/api/rentals', methods: [ 'GET' ] },
    { path: '/api/classes', methods: [ 'GET' ] },
    { path: '/api/classes/*', methods: [ 'GET' ] },
    // exclude any non-api paths
    { path: '^(?!/api.*$).*' }
  ]

  // check if path matches excluded path
  const excludedPathMatch = excludedPaths.find(({ path: excludedPath }) => {
    const regex = new RegExp(excludedPath)

    return regex.test(path)
  })

  if (excludedPathMatch) {
    const { methods } = excludedPathMatch

    // no methods property makes the entire path unprotected
    if (!methods) return true

    // check for method match
    return methods.some((excludedMethod) => {
      return excludedMethod === method
    })
  } else {
    return false
  }
}

module.exports = jwt({ secret, algorithms: ['HS256'] }).unless(pathFilter)
