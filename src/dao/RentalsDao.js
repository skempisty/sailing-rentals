const moment = require('moment')

const db = require('../connectDb')

const ValidationError = require('../errors/ValidationError')
const { rentalTypes } = require('../utils/constants')

const RentalsDao = () => {
  /**
   * Create one rental and return the new ID
   * @param {RentalDto} newRentalObj
   * @param {number} rentedBy Id of user creating the rental
   * @returns {Promise<RentalDto>}
   */
  const create = async (newRentalObj, rentedBy) => {
    const { boatId, start, end, crewCount, type, reason } = newRentalObj

    const validation = await validateRental(newRentalObj, rentedBy)

    if (validation.error) {
      throw new ValidationError(validation.error.message)
    }

    const newRental = [ rentedBy, boatId, start, end, crewCount, type || rentalTypes.STANDARD, reason ]

    const result = await db.query(`INSERT INTO ${db.name}.rentals (rentedBy, boatId, start, end, crewCount, type, reason) VALUES (?, ?, ?, ?, ?, ?, ?)`, newRental)

    return result.insertId
  }

  /**
   * Creates multiple rentals. Get back the new rental ids
   * @param {RentalDto[]} rentalDtos
   * @returns {Promise<number[]>} array of Ids for created Rentals.
   * In the same order they were input
   */
  const createMany = async (rentalDtos) => {
    // validate rentals
    for (const rentalDto of rentalDtos) {
      const validation = await validateRental(rentalDto, rentalDto.rentedBy)

      if (validation.error) {
        throw new ValidationError(validation.error.message)
      }
    }

    const insertedIds = []

    // create rentals
    for (const rentalDto of rentalDtos) {
      const { rentedBy, boatId, start, end, crewCount, type, reason } = rentalDto

      const insertArgs = [ rentedBy, boatId, start, end, crewCount, type, reason ]

      const result = await db.query(`
        INSERT INTO ${db.name}.rentals
        (rentedBy, boatId, start, end, crewCount, type, reason)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, insertArgs)

      insertedIds.push(result.insertId)
    }

    // return ids
    return insertedIds
  }

  const updateClassMeetingRental = async (rentalId, updatedClassMtgDto, updatedClassDto) => {
    const pseudoRental = {
      ...updatedClassMtgDto,
      id: rentalId,
      rentalType: rentalTypes.KLASS
    }

    const validation = await validateRental(pseudoRental)

    if (validation.error) {
      throw new ValidationError(validation.error.message)
    }

    const { capacity: crewCount } = updatedClassDto
    const { boatId, start, end } = pseudoRental

    const updateSql = []
    const sqlArgs = []

    updateSql.push('crewCount = ?')
    sqlArgs.push(crewCount)

    updateSql.push('boatId = ?')
    sqlArgs.push(boatId)

    updateSql.push('start = ?')
    sqlArgs.push(start)

    updateSql.push('end = ?')
    sqlArgs.push(end)

    sqlArgs.push(rentalId)

    const sql = `UPDATE ${db.name}.rentals SET ${updateSql.join(', ')} WHERE id = ?`

    await db.query(sql, sqlArgs)
  }

  /**
   * @param {number[]} idArray
   * @returns {Promise<void>}
   */
  const markManyDeletedByIds = async (idArray) => {
    await db.query(`UPDATE ${db.name}.rentals SET deletedAt = CURRENT_TIMESTAMP WHERE id IN (?)`, [idArray.join(', ')])
  }

  /**
   * Runs a series of validations on incoming rental object
   * @param rentalObj the proposed new rental object
   * @param {number|null} rentedBy user id of the renter
   * @returns {Promise<{}>} validation object
   */
  const validateRental = async (rentalObj, rentedBy = null) => {
    const { type: rentalType } = rentalObj

    const validation = {}

    if (rentalType === rentalTypes.STANDARD && rentedBy) {
      const noTwoRentalsInOneDayValidated = await validateNoTwoRentalsInOneDay(rentalObj, rentedBy)

      if (!noTwoRentalsInOneDayValidated) {
        validation.error = {
          message: 'User has already rented a boat this day'
        }

        return validation
      }
    }

    // validations for all rental types
    const emptyTimeSlotValidated = await validateEmptyTimeSlot(rentalObj)

    if (!emptyTimeSlotValidated) {
      validation.error = {
        message: 'Provided time slot selection conflicts with an existing rental'
      }
    }

    return validation
  }

  const validateEmptyTimeSlot = async (rentalObj) => {
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

  const validateNoTwoRentalsInOneDay = async (rentalObj, rentedBy) => {
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

  return {
    create,
    createMany,
    updateClassMeetingRental,
    markManyDeletedByIds
  }
}

module.exports = RentalsDao()