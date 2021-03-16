const db = require('../connectDb')

exports.getUser = async (id) => {
  return await db.query(`SELECT * FROM ${db.name}.users WHERE google_id = ?`, [id])
}

exports.createUser = async (googleUser) => {
  const { sub: googleId, email, given_name: firstName, family_name: lastName, picture: imageUrl } = googleUser

  const newUser = [ googleId, firstName, lastName, email, imageUrl ]

  await db.query(`INSERT INTO ${db.name}.users (google_id, first_name, last_name, email, image_url) VALUES (?, ?, ?, ?, ?)`, newUser)
}

exports.getUserList = async () => {
  return await db.query(`SELECT * FROM ${db.name}.users`)
}

exports.approveUser = async (id) => {
  return await db.query(`UPDATE ${db.name}.users SET is_approved = true WHERE id = ?`, [id])
}

exports.deleteUser = async (id) => {
  return await db.query(`UPDATE ${db.name}.users SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?`, [id])
}
