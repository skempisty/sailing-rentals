const db = require('../connectDb')

const ClassRegistrationsDao = () => {
  const getAll = async () => {
    return await db.query(`SELECT * FROM ${db.name}.class_registrations`)
  }

  /**
   * @param {ClassRegistrationDto} classRegistrationDto
   * @returns {Promise<ClassRegistrationDto>} the created registration record
   */
  const create = async (classRegistrationDto) => {
    const { userId, classId } = classRegistrationDto

    const newRegistration = [ userId, classId ]

    await db.query(`INSERT INTO ${db.name}.class_registrations (userId, classId) VALUES (?, ?)`, newRegistration)

    const [ createdRegistration ] = await db.query(`SELECT * FROM ${db.name}.class_registrations WHERE id = LAST_INSERT_ID()`)

    return createdRegistration
  }

  return {
    getAll,
    create
  }
}

module.exports = ClassRegistrationsDao()
