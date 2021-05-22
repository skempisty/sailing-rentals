const db = require('../connectDb')

exports.getUserByGoogleId = async (id) => {
  const [ user ] = await db.query(`SELECT * FROM ${db.name}.users WHERE googleId = ?`, [id])

  return user
}

exports.getUserById = async (id) => {
  const [ user ] = await db.query(`SELECT * FROM ${db.name}.users WHERE id = ?`, [id])

  return user
}

exports.createUser = async (googleUser) => {
  const { sub: googleId, email, given_name: firstName, family_name: lastName, picture: imageUrl } = googleUser

  const newUser = [ googleId, firstName, lastName, email, imageUrl ]

  await db.query(`INSERT INTO ${db.name}.users (googleId, firstName, lastName, email, imageUrl) VALUES (?, ?, ?, ?, ?)`, newUser)

  const [ user ] = await db.query(`SELECT * FROM ${db.name}.users WHERE id = LAST_INSERT_ID()`)

  return user
}

exports.updateUser = async (id, updateFields, isAdmin = false) => {
  const { phone, affiliation, isApproved } = updateFields

  const updateSql = []
  const sqlArgs = []

  if (phone !== null) {
    updateSql.push('phone = ?')
    sqlArgs.push(phone)
  }

  if (affiliation !== null) {
    updateSql.push('affiliation = ?')
    sqlArgs.push(affiliation)
  }

  if (isAdmin && isApproved !== null) {
    updateSql.push('isApproved = ?')
    sqlArgs.push(isApproved)
  }

  sqlArgs.push(id)

  const sql = `UPDATE ${db.name}.users SET ${updateSql.join(', ')} WHERE id = ?`

  return await db.query(sql, sqlArgs)
}

exports.getUserList = async () => {
  return await db.query(`SELECT * FROM ${db.name}.users WHERE deletedAt = "0000-00-00 00:00:00" ORDER BY users.isAdmin DESC`)
}

exports.approveUser = async (id) => {
  return await db.query(`UPDATE ${db.name}.users SET isApproved = true WHERE id = ?`, [id])
}

exports.deleteUser = async (id) => {
  return await db.query(`UPDATE ${db.name}.users SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?`, [id])
}
