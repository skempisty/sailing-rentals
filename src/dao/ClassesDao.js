const db = require('../connectDb')

const ClassesDao = () => {
  const getById = async (id) => {
    const [ klass ] = await db.query(`SELECT * FROM ${db.name}.classes WHERE id = ?`, [id])

    return klass
  }

  /**
   * @param {ClassDto} classObj data for creating a class
   * @returns {Promise<ClassDto>} the created class
   */
  const create = async (classObj) => {
    const { capacity, price } = classObj

    // create the class
    const newClass = [ capacity, price ]

    const result = await db.query(`INSERT INTO ${db.name}.classes (capacity, price) VALUES (?, ?)`, newClass)

    const [ createdClass ] = await db.query(`SELECT * FROM ${db.name}.classes WHERE id = ${result.insertId}`)

    return createdClass
  }

  /**
   * @param {number} id the class id that we want to update
   * @param {ClassDto} updatedClassDto
   * @returns {Promise<void>}
   */
  const update = async (id, updatedClassDto) => {
    const { capacity, price } = updatedClassDto

    const updateSql = []
    const sqlArgs = []

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
    getById,
    create,
    update,
    markDeleted
  }
}

module.exports = ClassesDao()
