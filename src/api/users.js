const db = require('../connectDb')

exports.getUserByGoogleId = async (id) => {
  const [ user ] = await db.query(`SELECT * FROM ${db.name}.users WHERE google_id = ?`, [id])

  return user
}

exports.getUserById = async (id) => {
  const [ user ] = await db.query(`SELECT * FROM ${db.name}.users WHERE id = ?`, [id])

  return user
}

exports.createUser = async (googleUser) => {
  const { sub: googleId, email, given_name: firstName, family_name: lastName, picture: imageUrl } = googleUser

  const newUser = [ googleId, firstName, lastName, email, imageUrl ]

  await db.query(`INSERT INTO ${db.name}.users (google_id, first_name, last_name, email, image_url) VALUES (?, ?, ?, ?, ?)`, newUser)

  const [ user ] = await db.query(`SELECT * FROM ${db.name}.users WHERE id = LAST_INSERT_ID()`)

  return user
}

exports.updateUser = async (id, updateFields) => {
  const { phone, jobTitle, affiliation } = updateFields

  const updateSql = []
  const sqlArgs = []

  if (phone) {
    updateSql.push('phone = ?')
    sqlArgs.push(phone)
  }

  if (jobTitle) {
    updateSql.push('job_title = ?')
    sqlArgs.push(jobTitle)
  }

  if (affiliation) {
    updateSql.push('affiliation = ?')
    sqlArgs.push(affiliation)
  }

  sqlArgs.push(id)

  const sql = `UPDATE ${db.name}.users SET ${updateSql.join(', ')} WHERE id = ?`

  return await db.query(sql, sqlArgs)
}

exports.getUserList = async () => {
  return await db.query(`SELECT * FROM ${db.name}.users ORDER BY users.is_admin DESC`)
}

exports.approveUser = async (id) => {
  return await db.query(`UPDATE ${db.name}.users SET is_approved = true WHERE id = ?`, [id])
}

exports.deleteUser = async (id) => {
  return await db.query(`UPDATE ${db.name}.users SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?`, [id])
}
