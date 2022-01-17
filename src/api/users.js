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

exports.updateUser = async (id, updateFields, requesterIsAdmin = false) => {
  const { phone, affiliation, isApproved, isInstructor, isAdmin } = updateFields

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

  if (requesterIsAdmin && isApproved !== undefined) {
    updateSql.push('isApproved = ?')
    sqlArgs.push(isApproved)
  }

  if (requesterIsAdmin && isInstructor !== undefined) {
    updateSql.push('isInstructor = ?')
    sqlArgs.push(isInstructor)
  }

  if (requesterIsAdmin && isAdmin !== undefined) {
    updateSql.push('isAdmin = ?')
    sqlArgs.push(isAdmin)
  }

  sqlArgs.push(id)

  const sql = `UPDATE ${db.name}.users SET ${updateSql.join(', ')} WHERE id = ?`

  return await db.query(sql, sqlArgs)
}

exports.getUserList = async () => {
  return await db.query(`SELECT * FROM ${db.name}.users ORDER BY users.isAdmin DESC`)
}

exports.getInstructors = async () => {
  return await db.query(`SELECT id, imageUrl, firstName, lastName, email, phone  FROM ${db.name}.users WHERE isInstructor = 1 ORDER BY users.isAdmin DESC`)
}

exports.deleteUser = async (id) => {
  await db.query(`UPDATE ${db.name}.users SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?`, [id])

  const [ user ] = await db.query(`SELECT * FROM ${db.name}.users WHERE id = ?`, [id])

  return user
}

exports.getAnAdminUser = async () => {
  const [ user ] = await db.query(`SELECT * FROM ${db.name}.users WHERE isAdmin = 1`)

  return user
}

exports.getANonAdminUser = async () => {
  const [ user ] = await db.query(`SELECT * FROM ${db.name}.users WHERE isAdmin = 0`)

  return user
}
