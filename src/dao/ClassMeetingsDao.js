const db = require('../connectDb')

const getInsertSqlPlaceholders = require('../utils/getInsertSqlPlaceholders')

const CLASS_MEETINGS_TABLE = `${db.name}.class_meetings`

const ClassMeetingsDao = () => {
  const getAll = async () => {
    return await db.query(`SELECT * FROM ${CLASS_MEETINGS_TABLE} WHERE deletedAt IS NULL ORDER BY start`)
  }

  const getByClassId = async (id) => {
    return await db.query(`SELECT * FROM ${CLASS_MEETINGS_TABLE} WHERE classId = ? AND deletedAt IS NULL ORDER BY start`, [id])
  }

  /**
   * @param {ClassMeetingDto[]} classMtgDtos data for creating a bunch of meetings
   * @returns {Promise<void>}
   */
  const createMany = async (classMtgDtos) => {
    if (!classMtgDtos.length) return

    const mtgData = classMtgDtos.map(mtgDto => {
      const { name, classId, instructorId, rentalId, details, start, end  } = mtgDto

      return [ name, classId, instructorId, rentalId, details, start, end ]
    })

    await db.query(`
      INSERT INTO ${CLASS_MEETINGS_TABLE}
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
    const { instructorId, rentalId, name, details, start, end } = updatedMtgDto

    const updateSql = []
    const sqlArgs = []

    updateSql.push('instructorId = ?')
    sqlArgs.push(instructorId)

    updateSql.push('rentalId = ?')
    sqlArgs.push(rentalId)

    updateSql.push('name = ?')
    sqlArgs.push(name)

    updateSql.push('details = ?')
    sqlArgs.push(details)

    updateSql.push('start = ?')
    sqlArgs.push(start)

    updateSql.push('end = ?')
    sqlArgs.push(end)

    sqlArgs.push(id)

    const sql = `UPDATE ${CLASS_MEETINGS_TABLE} SET ${updateSql.join(', ')} WHERE id = ?`

    await db.query(sql, sqlArgs)
  }

  /**
   * @param {number[]} idArray
   * @returns {Promise<void>}
   */
  const markManyDeletedByIds = async (idArray) => {
    await db.query(`UPDATE ${CLASS_MEETINGS_TABLE} SET deletedAt = CURRENT_TIMESTAMP WHERE id IN (?)`, [idArray.join(', ')])
  }

  const markDeletedByClassId = async (id) => {
    await db.query(`UPDATE ${CLASS_MEETINGS_TABLE} SET deletedAt = CURRENT_TIMESTAMP WHERE classId = ?`, [id])
  }

  return {
    getAll,
    getByClassId,
    createMany,
    update,
    markManyDeletedByIds,
    markDeletedByClassId
  }
}

module.exports = ClassMeetingsDao()
