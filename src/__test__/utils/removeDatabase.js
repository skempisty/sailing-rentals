const db = require('../../connectDb')

const removeDatabase = async function(dbName) {
  await db.query(`DROP DATABASE ${dbName}`)
}

module.exports = removeDatabase