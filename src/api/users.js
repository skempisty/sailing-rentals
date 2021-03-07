const db = require('../connectDb')

exports.getUser = async (id) => {
  return await db.query('SELECT * FROM sailing.users WHERE google_id = ?', [id])
}

exports.createUser = async (googleUser) => {
  const { sub: googleId, email, name, picture: imageUrl } = googleUser

  const newUser = [ googleId, name, email, imageUrl ]

  await db.query('INSERT INTO sailing.users (google_id, name, email, image_url) VALUES (?, ?, ?, ?)', newUser)
}
