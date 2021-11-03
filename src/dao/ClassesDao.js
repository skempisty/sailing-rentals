const db = require('../connectDb')

const ClassesDao = () => {
  /**
   * @param {ClassDto} classObj data for creating a class
   * @returns {Promise<ClassDto>} the created class
   */
  const create = async (classObj) => {
    const { details, capacity, price } = classObj

    // create the class
    const newClass = [ details, capacity, price ]

    await db.query(`INSERT INTO ${db.name}.classes (details, capacity, price) VALUES (?, ?, ?)`, newClass)

    const [ createdClass ] = await db.query(`SELECT * FROM ${db.name}.classes WHERE id = LAST_INSERT_ID()`)

    return createdClass
  }

  /**
   * @param {number} id the class id that we want to update
   * @param {ClassDto} updatedClassDto
   * @returns {Promise<void>}
   */
  const update = async (id, updatedClassDto) => {
    const { details, capacity, price } = updatedClassDto

    const updateSql = []
    const sqlArgs = []

    updateSql.push('details = ?')
    sqlArgs.push(details)

    updateSql.push('capacity = ?')
    sqlArgs.push(capacity)

    updateSql.push('price = ?')
    sqlArgs.push(price)

    sqlArgs.push(id)

    const sql = `UPDATE ${db.name}.classes SET ${updateSql.join(', ')} WHERE id = ?`

    await db.query(sql, sqlArgs)
  }

  const markDeleted = async (id) => {
    await db.query(`UPDATE ${db.name}.classes SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?`, [id])
  }

  return {
    create,
    update,
    markDeleted
  }
}

module.exports = ClassesDao()
