const db = require('../connectDb')

exports.getBoats = async () => {
  return await db.query(`SELECT * FROM ${db.name}.boats WHERE deleted_at = "0000-00-00 00:00:00"`)
}
