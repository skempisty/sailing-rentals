const usersApi = require('../../api/users')
const getNewLoginJwt = require('../../utils/getNewLoginJwt')

module.exports = async function getNonAdminJwt(isApproved = 1) {
  const nonAdminUser = await usersApi.getANonAdminUser()

  const nonAdminUserObj = {
    id: nonAdminUser.id,
    isAdmin: 0,
    isApproved
  }

  return getNewLoginJwt(nonAdminUserObj)
}