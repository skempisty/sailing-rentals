const db = require('../../../src/connectDb')

const initializeDatabase = require('../../initializeDatabase')

module.exports = async function setupTestDb(testDbName) {
  await db.connect()

  await initializeDatabase(testDbName)

  await db.useDb(testDbName)
}