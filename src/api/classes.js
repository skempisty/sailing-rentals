const db = require('../connectDb')

/**
 * ░██████╗░███████╗████████╗
 * ██╔════╝░██╔════╝╚══██╔══╝
 * ██║░░██╗░█████╗░░░░░██║░░░
 * ██║░░╚██╗██╔══╝░░░░░██║░░░
 * ╚██████╔╝███████╗░░░██║░░░
 * ░╚═════╝░╚══════╝░░░╚═╝░░░
 */

exports.getClasses = async () => {
  return await db.query(`SELECT * FROM ${db.name}.classes`)
}

/**
 * ██████╗░░█████╗░░██████╗████████╗
 * ██╔══██╗██╔══██╗██╔════╝╚══██╔══╝
 * ██████╔╝██║░░██║╚█████╗░░░░██║░░░
 * ██╔═══╝░██║░░██║░╚═══██╗░░░██║░░░
 * ██║░░░░░╚█████╔╝██████╔╝░░░██║░░░
 * ╚═╝░░░░░░╚════╝░╚═════╝░░░░╚═╝░░░
 */

exports.createClass = async (classObj) => {
  const { instructorId, details, capacity, price } = classObj

  const newClass = [ instructorId, details, capacity, price ]

  await db.query(`INSERT INTO ${db.name}.classes (instructorId, details, capacity, price) VALUES (?, ?, ?, ?)`, newClass)

  const [ klass ] = await db.query(`SELECT * FROM ${db.name}.classes WHERE id = LAST_INSERT_ID()`)

  return klass
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
