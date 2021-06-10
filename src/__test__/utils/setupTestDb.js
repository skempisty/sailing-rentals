const db = require('../../../src/connectDb')

const initializeDatabase = require('../../initializeDatabase')

module.exports = async function setupTestDb(testDbName) {
  await db.connect()

  /*
   * Must blank out sql_mode before initializing test DB. Without this we cannot insert 0 values for timestamps.
   * Does not matter locally, but it does while using the docker MySQL in github actions.
   * https://gokhan.ozar.net/blog/how-to-fix-incorrect-datetime-value-mysql-mariadb/
   */
  await db.query("SET sql_mode = '';")

  await initializeDatabase(testDbName)

  await db.useDb(testDbName)
}