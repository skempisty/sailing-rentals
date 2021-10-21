const db = require('../connectDb')

const rentalsApi = require('../api/rentals')

const Rental = require('../models/Rental')

const getInsertSqlPlaceholders = require('../utils/getInsertSqlPlaceholders')
const { rentalTypes } = require('../utils/constants')

/**
 * ░██████╗░███████╗████████╗
 * ██╔════╝░██╔════╝╚══██╔══╝
 * ██║░░██╗░█████╗░░░░░██║░░░
 * ██║░░╚██╗██╔══╝░░░░░██║░░░
 * ╚██████╔╝███████╗░░░██║░░░
 * ░╚═════╝░╚══════╝░░░╚═╝░░░
 */

exports.getClasses = async () => {
  const classes = await db.query(`SELECT * FROM ${db.name}.classes`)
  const classMeetings = await db.query(`SELECT * FROM ${db.name}.class_meetings`)

  return classes.map(klass => {
    const mtgsInClass = classMeetings.filter(mtg => mtg.classId === klass.id)

    return {
      ...klass,
      meetings: mtgsInClass
    }
  })
}

exports.getClass = async (id) => {
  const [ klass ] = await db.query(`SELECT * FROM ${db.name}.classes WHERE id = ?`, [id])
  klass.meetings = await db.query(`SELECT * FROM ${db.name}.class_meetings WHERE classId = ?`, [id])

  return klass
}

/**
 * ██████╗░░█████╗░░██████╗████████╗
 * ██╔══██╗██╔══██╗██╔════╝╚══██╔══╝
 * ██████╔╝██║░░██║╚█████╗░░░░██║░░░
 * ██╔═══╝░██║░░██║░╚═══██╗░░░██║░░░
 * ██║░░░░░╚█████╔╝██████╔╝░░░██║░░░
 * ╚═╝░░░░░░╚════╝░╚═════╝░░░░╚═╝░░░
 */

exports.createClass = async (classObj, creatorId) => {
  const { details, capacity, price, meetings } = classObj

  // create the class
  const newClass = [ details, capacity, price ]

  await db.query(`INSERT INTO ${db.name}.classes (details, capacity, price) VALUES (?, ?, ?)`, newClass)

  const [ createdClass ] = await db.query(`SELECT * FROM ${db.name}.classes WHERE id = LAST_INSERT_ID()`)

  // create the boat rentals for the "useBoat" meetings
  const useBoatMtgs = meetings.filter(mtg => mtg.boatId)

  if (useBoatMtgs.length) {
    const meetingRentals = useBoatMtgs.map(mtg => new Rental({
      type: rentalTypes.KLASS,
      boatId: mtg.boatId,
      rentedBy: creatorId,
      crewCount: capacity,
      start: mtg.start,
      end: mtg.end,
      reason: 'Sailing Instruction'
    }))

    await rentalsApi.createRentals(meetingRentals)
  }

  // create the meetings for the class
  const newMeetingsData = meetings.map(mtg => {
    const { name, instructorId, details, start, end } = mtg

    return [ name, createdClass.id, instructorId, details, start, end ]
  })

  await db.query(`
    INSERT INTO ${db.name}.class_meetings
    (name, classId, instructorId, details, start, end)
    VALUES ${getInsertSqlPlaceholders(newMeetingsData)}
  `, newMeetingsData.flat())

  return createdClass
}

/**
 * ██████╗░██╗░░░██╗████████╗
 * ██╔══██╗██║░░░██║╚══██╔══╝
 * ██████╔╝██║░░░██║░░░██║░░░
 * ██╔═══╝░██║░░░██║░░░██║░░░
 * ██║░░░░░╚██████╔╝░░░██║░░░
 * ╚═╝░░░░░░╚═════╝░░░░╚═╝░░░
 */

exports.updateClass = async (id, updatedClassObj) => {
  const { instructorId, details, capacity, price } = updatedClassObj

  const updateSql = []
  const sqlArgs = []

  updateSql.push('instructorId = ?')
  sqlArgs.push(instructorId)

  updateSql.push('details = ?')
  sqlArgs.push(details)

  updateSql.push('capacity = ?')
  sqlArgs.push(capacity)

  updateSql.push('price = ?')
  sqlArgs.push(price)

  sqlArgs.push(id)

  const sql = `UPDATE ${db.name}.classes SET ${updateSql.join(', ')} WHERE id = ?`

  await db.query(sql, sqlArgs)

  const [ klass ] = await db.query(`SELECT * FROM ${db.name}.classes WHERE id = ?`, [id])

  return klass
}

/**
 * ██████╗░███████╗██╗░░░░░███████╗████████╗███████╗
 * ██╔══██╗██╔════╝██║░░░░░██╔════╝╚══██╔══╝██╔════╝
 * ██║░░██║█████╗░░██║░░░░░█████╗░░░░░██║░░░█████╗░░
 * ██║░░██║██╔══╝░░██║░░░░░██╔══╝░░░░░██║░░░██╔══╝░░
 * ██████╔╝███████╗███████╗███████╗░░░██║░░░███████╗
 * ╚═════╝░╚══════╝╚══════╝╚══════╝░░░╚═╝░░░╚══════╝
 */
