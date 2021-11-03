const db = require('../connectDb')

const getInsertSqlPlaceholders = require('../utils/getInsertSqlPlaceholders')

const ClassMeetingsDao = () => {
  const getByClassId = async (id) => {
    return await db.query(`SELECT * FROM ${db.name}.class_meetings WHERE classId = ?`, [id])
  }

  /**
   * @param {ClassMeetingDto[]} classMtgDtos data for creating a bunch of meetings
   * @returns {Promise<void>}
   */
  const createMany = async (classMtgDtos) => {
    const mtgData = classMtgDtos.map(mtgDto => {
      const { name, classId, instructorId, rentalId, details, start, end  } = mtgDto

      return [ name, classId, instructorId, rentalId, details, start, end ]
    })

    await db.query(`
      INSERT INTO ${db.name}.class_meetings
      (name, classId, instructorId, rentalId, details, start, end)
      VALUES ${getInsertSqlPlaceholders(mtgData)}
    `, mtgData.flat())
  }

  const markDeletedByClassId = async (id) => {
    await db.query(`UPDATE ${db.name}.class_meetings SET deletedAt = CURRENT_TIMESTAMP WHERE classId = ?`, [id])
  }

  return {
    getByClassId,
    createMany,
    markDeletedByClassId
  }
}

module.exports = ClassMeetingsDao()
