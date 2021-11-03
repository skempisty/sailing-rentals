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

  /**
   * @param {number} id class mtg id
   * @param {ClassMeetingDto} updatedMtgDto
   * @returns {Promise<void>}
   */
  const update = async (id, updatedMtgDto) => {
    const { instructorId, name, details, start, end } = updatedMtgDto

    const updateSql = []
    const sqlArgs = []

    updateSql.push('instructorId = ?')
    sqlArgs.push(instructorId)

    updateSql.push('name = ?')
    sqlArgs.push(name)

    updateSql.push('details = ?')
    sqlArgs.push(details)

    updateSql.push('start = ?')
    sqlArgs.push(start)

    updateSql.push('end = ?')
    sqlArgs.push(end)

    sqlArgs.push(id)

    const sql = `UPDATE ${db.name}.class_meetings SET ${updateSql.join(', ')} WHERE id = ?`

    await db.query(sql, sqlArgs)
  }

  const markDeletedByClassId = async (id) => {
    await db.query(`UPDATE ${db.name}.class_meetings SET deletedAt = CURRENT_TIMESTAMP WHERE classId = ?`, [id])
  }

  return {
    getByClassId,
    createMany,
    update,
    markDeletedByClassId
  }
}

module.exports = ClassMeetingsDao()
