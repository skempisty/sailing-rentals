const jwt = require('express-jwt')

/**
 * Authenticates request with standard JWT
 *
 * @returns {*} hands over control to next matching route or returns error
 */
const secret = process.env.JWT_SECRET

const excludedPaths = ['/api/health', '/api/users/login']

module.exports = jwt({ secret, algorithms: ['HS256'] }).unless({ path: excludedPaths })
