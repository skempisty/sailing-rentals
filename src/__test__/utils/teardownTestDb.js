const db = require('../../../src/connectDb')

module.exports = async function teardownTestDb(testDbName) {
  await db.query(`DROP DATABASE ${testDbName}`)

  await db.disconnect()
}