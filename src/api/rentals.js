const moment = require('moment')

const db = require('../connectDb')

const ValidationError = require('../errors/ValidationError')

exports.getMyRentals = async (userId) => {
  return await db.query(`SELECT * FROM ${db.name}.rentals WHERE rentedBy = '${userId}' ORDER BY start`)
}

exports.getAllRentals = async () => {
  return await db.query(`SELECT * FROM ${db.name}.rentals ORDER BY start`)
}

exports.getRental = async (id) => {
  const [ rental ] = await db.query(`SELECT * FROM ${db.name}.rentals WHERE id = ?`, [id])

  return rental
}

exports.createRental = async (rentedBy, newRentalObj) => {
  const { boatId, start, end, crewCount } = newRentalObj

  const validation = await validateRental(newRentalObj, rentedBy)

  if (validation.error) {
    throw new ValidationError(validation.error.message)
  }

  const newRental = [ rentedBy, boatId, start, end, crewCount ]

  await db.query(`INSERT INTO ${db.name}.rentals (rentedBy, boatId, start, end, crewCount) VALUES (?, ?, ?, ?, ?)`, newRental)

  const [ rental ] = await db.query(`SELECT * FROM ${db.name}.rentals WHERE id = LAST_INSERT_ID()`)

  return rental
}

exports.updateRental = async (updateFields, rentalId, rentedBy) => {
  const { crewCount, start, end  } = updateFields

  const rentalObj = { id: rentalId, ...updateFields }

  const validation = await validateRental(rentalObj, rentedBy)

  if (validation.error) {
    throw new ValidationError(validation.error.message)
  }

  const updateSql = ['updatedAt = CURRENT_TIMESTAMP']
  const sqlArgs = []

  if (crewCount !== null) {
    updateSql.push('crewCount = ?')
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

  sqlArgs.push(rentalId)

  const sql = `UPDATE ${db.name}.rentals SET ${updateSql.join(', ')} WHERE id = ?`

  await db.query(sql, sqlArgs)

  const [ rental ] = await db.query(`SELECT * FROM ${db.name}.rentals WHERE id = ?`, [rentalId])

  return rental
}

exports.deleteRental = async (id) => {
  await db.query(`UPDATE ${db.name}.rentals SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?`, [id])

  const [ rental ] = await db.query(`SELECT * FROM ${db.name}.rentals WHERE id = ?`, [id])

  return rental
}

/**
 * Runs a series of validations on incoming rental object
 * @param rentalObj the proposed new rental object
 * @param {string} rentedBy user id of the renter
 * @returns {Promise<{}>} validation object
 */
async function validateRental(rentalObj, rentedBy) {
  const validation = {}

  // TODO: maybe better to just pull all existing rentals and work with it so we only have to do one query
  const emptyTimeSlotValidated = await validateEmptyTimeSlot(rentalObj)
  const noTwoRentalsInOneDayValidated = await validateNoTwoRentalsInOneDay(rentalObj, rentedBy)

  if (!emptyTimeSlotValidated) {
    validation.error = {
      message: 'Provided time slot selection conflicts with an existing rental'
    }
  } else if (!noTwoRentalsInOneDayValidated) {
    validation.error = {
      message: 'User has already rented a boat this day'
    }
  }

  return validation
}

async function validateEmptyTimeSlot(rentalObj) {
  const { id, boatId, start, end } = rentalObj

  // id is only non-null when editing a rental
  const rentalId = id || '-1'

  const query = [
      `SELECT * FROM ${db.name}.rentals`,
      `WHERE deletedAt = NULL`, // only non-deleted rentals considered
      `AND id != ?`, // it's ok to overwrite on top of the rental being updated
      `AND boatId = ?`, // same boat
      `AND (start >= ? AND start <= ? OR end >= ? AND end <= ?)` // start or finish is between the start/finish of another rental
  ]

  const conflictingRentals = await db.query(query.join(' '), [ rentalId, boatId, start, end, start, end ])

  return !conflictingRentals.length
}

async function validateNoTwoRentalsInOneDay(rentalObj, rentedBy) {
  const { id, start } = rentalObj

  // id is only non-null when editing a rental
  const rentalId = id || '-1'

  // get moment for day start at 0000 hours
  const dayBegin = moment(start).startOf('day').format()
  const dayEnd = moment(start).endOf('day').format()

  const query = [
    `SELECT * FROM ${db.name}.rentals`,
    `WHERE deletedAt = NULL`, // only non-deleted rentals considered
    `AND rentedBy = ?`, // same user
    `AND id != ?`, // it's ok to overwrite on top of the rental being updated
    `AND (start >= ? AND start <= ?)` // is on the same day
  ]

  const conflictingRentals = await db.query(query.join(' '), [ rentedBy, rentalId, dayBegin, dayEnd ])

  return !conflictingRentals.length
}
