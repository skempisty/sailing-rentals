const jwt = require('jsonwebtoken')

function getNewLoginJwt(userObj) {
  const { id, isAdmin, isApproved } = userObj

  return jwt.sign({
    userId: id,
    isAdmin,
    isApproved
  }, process.env.JWT_SECRET)
}

module.exports = getNewLoginJwt
