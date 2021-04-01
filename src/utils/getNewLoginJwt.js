const jwt = require('jsonwebtoken')

function getNewLoginJwt(userObj) {
  return jwt.sign({
    userId: userObj.id,
    isAdmin: userObj.is_admin,
    isApproved: userObj.is_approved
  }, process.env.JWT_SECRET)
}

module.exports = getNewLoginJwt
