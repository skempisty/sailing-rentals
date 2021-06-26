const usersApi = require('../../api/users')
const getNewLoginJwt = require('../../utils/getNewLoginJwt')

module.exports = async function getAdminJwt() {
  const adminUser = await usersApi.getAnAdminUser()

  const adminUserObj = {
    id: adminUser.id,
    isAdmin: 1,
    isApproved: 1
  }

  return getNewLoginJwt(adminUserObj)
}