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

  const markDeleted = async (id) => {
    await db.query(`UPDATE ${db.name}.classes SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?`, [id])
  }

  return {
    create,
    markDeleted
  }
}

module.exports = ClassesDao()
