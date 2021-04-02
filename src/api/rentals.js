const db = require('../connectDb')

exports.getMyRentals = async (userId) => {
  console.log('userId inside API', userId)

  return await db.query(`SELECT * FROM ${db.name}.rentals WHERE rented_by = '${userId}'`)
}

exports.getAllRentals = async () => {
  return await db.query(`SELECT * FROM ${db.name}.rentals`)
}

exports.createRental = async (created_by, event) => {
  const { rentedBy, boatId, start, end, crewCount } = event;

  const newRental = [ rentedBy, boatId, start, end, crewCount ]

  await db.query(`INSERT INTO ${db.name}.rentals (rented_by, boat_id, start, end, crew_count) VALUES (?, ?, ?, ?, ?)`, newRental)

  const [ rental ] = await db.query(`SELECT * FROM ${db.name}.rentals WHERE id = LAST_INSERT_ID()`)

  return rental
}