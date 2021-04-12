const db = require('../connectDb')

exports.getPosts = async () => {
  return await db.query(`SELECT * FROM ${db.name}.posts WHERE deletedAt = NULL`)
}
