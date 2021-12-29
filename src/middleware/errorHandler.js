/**
 * Handler function called when error occurs in one the routes with the
 * purpose of logging and answering standard status code
 *
 * @param {Object} err Captures the stacktrace at witch the `Error` was initiated
 * @param {Object} req Represents the HTTP request and it's properties
 * @param {Object} res Represents the HTTP response that the Express
 *  app sends for each request
 * @param {function} next will move to the next matching handler when called
 * @returns hands off control to the next callback
 */
const errorHandler = (err, req, res, next) => {
  if (err) {
    console.error(`Error in route ${req.path}: ${JSON.stringify(err.message)}`)
    let status

    switch (err.constructor.name) {
      case 'ValidationError':
        status = 400
        break
      default:
        status = 500
        break
    }
    res.status(status).json({ error: err.message })
  } else {
    next()
  }
}

module.exports = errorHandler
