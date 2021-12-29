const db = require('../connectDb')

const CLASS_REGISTRATIONS_TABLE = `${db.name}.class_registrations`

const ClassRegistrationsDao = () => {
  const getAll = async () => {
    return await db.query(`SELECT * FROM ${CLASS_REGISTRATIONS_TABLE}`)
  }

  const getRegistrationCountByClassId = async (classId) => {
    const [ result ] = await db.query(`SELECT COUNT(*) AS count FROM ${CLASS_REGISTRATIONS_TABLE} WHERE classId = ${classId}`)

    return result.count
  }

  /**
   * @param {ClassRegistrationDto} classRegistrationDto
   * @returns {Promise<ClassRegistrationDto>} the created registration record
   */
  const create = async (classRegistrationDto) => {
    const { userId, classId } = classRegistrationDto

    const newRegistration = [ userId, classId ]

    const result = await db.query(`INSERT INTO ${CLASS_REGISTRATIONS_TABLE} (userId, classId) VALUES (?, ?)`, newRegistration)

    const [ createdRegistration ] = await db.query(`SELECT * FROM ${CLASS_REGISTRATIONS_TABLE} WHERE id = ${result.insertId}`)

    return createdRegistration
  }

  return {
    getAll,
    getRegistrationCountByClassId,
    create
  }
}

module.exports = ClassRegistrationsDao()
