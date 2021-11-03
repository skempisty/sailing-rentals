const db = require('../connectDb')

const RentalsDao = require('../dao/RentalsDao')
const ClassesDao = require('../dao/ClassesDao')
const ClassMeetingsDao = require('../dao/ClassMeetingsDao')

const RentalDto = require('../dto/RentalDto')
const ClassMeetingDto = require('../dto/ClassMeetingDto')

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
  klass.meetings = await db.query(`SELECT * FROM ${db.name}.class_meetings WHERE classId = ? ORDER BY start`, [id])

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
  const { capacity, meetings } = classObj

  const createdClass = await ClassesDao.create(classObj)

  // create the boat rentals for the "useBoat" meetings
  const useBoatMtgs = meetings.filter(mtg => mtg.boatId)
  const noBoatMtgs = meetings.filter(mtg => !mtg.boatId)

  let newBoatMeetings = []

  if (useBoatMtgs.length) {
    const meetingRentals = useBoatMtgs.map(mtg => new RentalDto({
      type: rentalTypes.KLASS,
      boatId: mtg.boatId,
      rentedBy: creatorId,
      crewCount: capacity,
      start: mtg.start,
      end: mtg.end,
      reason: 'Sailing Instruction'
    }))

    const newRentalIds = await RentalsDao.createMany(meetingRentals)

    // create useBoat meetings using inserted Rental ids
    newBoatMeetings = useBoatMtgs.map((mtg, index) => {
      const { name, instructorId, details, start, end } = mtg

      return new ClassMeetingDto({
        name,
        classId: createdClass.id,
        instructorId,
        rentalId: newRentalIds[index],
        details,
        start,
        end
      })
    })
  }

  // create the non-boat using meetings
  const newNoBoatMeetings = noBoatMtgs.map(mtg => {
    const { name, instructorId, details, start, end } = mtg

    return new ClassMeetingDto({
      name,
      classId: createdClass.id,
      instructorId,
      rentalId: null,
      details,
      start,
      end
    })
  })

  const combinedMtgs = newBoatMeetings.concat(newNoBoatMeetings)

  await ClassMeetingsDao.createMany(combinedMtgs)

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

exports.deleteClass = async (id) => {
  // delete any class_meetings associated with the class
  await db.query(`UPDATE ${db.name}.class_meetings SET deletedAt = CURRENT_TIMESTAMP WHERE classId = ?`, [id])

  const deletedClassMeetings = await db.query(`SELECT * FROM ${db.name}.class_meetings WHERE classId = ?`, [id])

  const associatedRentalIds = deletedClassMeetings.map(mtg => mtg.rentalId).filter(Boolean)

  if (associatedRentalIds.length) {
    // delete any rentals associated with any of the deleted class_meetings
    await db.query(`UPDATE ${db.name}.rentals SET deletedAt = CURRENT_TIMESTAMP WHERE id IN (?)`, [associatedRentalIds.join(', ')])
  }

  // TODO: delete any class_registrations associated with this class

  // delete the class itself
  await db.query(`UPDATE ${db.name}.classes SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?`, [id])
}