const db = require('../connectDb')

exports.getUser = async (id) => {
  return await db.query('SELECT * FROM sailing.users WHERE google_id = ?', [id])
}

exports.createUser = async (googleUser) => {
  const { sub: googleId, email, given_name: firstName, family_name: lastName, picture: imageUrl } = googleUser

  const newUser = [ googleId, firstName, lastName, email, imageUrl ]

  await db.query('INSERT INTO sailing.users (google_id, first_name, last_name, email, image_url) VALUES (?, ?, ?, ?, ?)', newUser)
}

exports.getUserList = async () => {
  return await db.query('SELECT * FROM sailing.users')
}
