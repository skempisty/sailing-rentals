const db = require('../connectDb')

exports.getMyRentals = async (userId) => {
  return await db.query(`SELECT * FROM ${db.name}.rentals WHERE rented_by = '${userId}'`)
}

exports.getAllRentals = async () => {
  return await db.query(`SELECT * FROM ${db.name}.rentals`)
}
