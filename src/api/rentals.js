const db = require('../connectDb')

exports.getMyRentals = async (userId) => {
  return await db.query(`SELECT * FROM ${db.name}.rentals WHERE rented_by = '${userId}' ORDER BY start`)
}

exports.getAllRentals = async () => {
  return await db.query(`SELECT * FROM ${db.name}.rentals ORDER BY start`)
}

exports.createRental = async (created_by, event) => {
  const { rentedBy, boatId, start, end, crewCount } = event;

  const newRental = [ rentedBy, boatId, start, end, crewCount ]

  await db.query(`INSERT INTO ${db.name}.rentals (rented_by, boat_id, start, end, crew_count) VALUES (?, ?, ?, ?, ?)`, newRental)

  const [ rental ] = await db.query(`SELECT * FROM ${db.name}.rentals WHERE id = LAST_INSERT_ID()`)

  return rental
}

exports.updateRental = async (id, updateFields = false) => {
  const { boatId, crewCount, start, end  } = updateFields

  const updateSql = ['updated_at = CURRENT_TIMESTAMP']
  const sqlArgs = []

  if (boatId !== null) {
    updateSql.push('boat_id = ?')
    sqlArgs.push(boatId)
  }

  if (crewCount !== null) {
    updateSql.push('crew_count = ?')
    sqlArgs.push(crewCount)
  }

  if (start !== null) {
    updateSql.push('start = ?')
    sqlArgs.push(start)
  }

  if (end !== null) {
    updateSql.push('end = ?')
    sqlArgs.push(end)
  }

  sqlArgs.push(id)

  const sql = `UPDATE ${db.name}.rentals SET ${updateSql.join(', ')} WHERE id = ?`

  return await db.query(sql, sqlArgs)
}