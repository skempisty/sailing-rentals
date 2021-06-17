const db = require('../connectDb')

exports.getPosts = async () => {
  return await db.query(`SELECT * FROM ${db.name}.posts WHERE deletedAt IS NULL`)
}

exports.createPost = async (createdBy, postObj) => {
  const { title, body, imageUrl } = postObj

  const newPost = [ createdBy, title, body, imageUrl ]

  await db.query(`INSERT INTO ${db.name}.posts (createdBy, title, body, imageUrl) VALUES (?, ?, ?, ?)`, newPost)

  const [ post ] = await db.query(`SELECT * FROM ${db.name}.posts WHERE id = LAST_INSERT_ID()`)

  return post
}

exports.updatePost = async (id, updateFields) => {
  const { title, body, imageUrl } = updateFields

  const updateSql = ['updatedAt = CURRENT_TIMESTAMP']
  const sqlArgs = []

  if (title !== null) {
    updateSql.push('title = ?')
    sqlArgs.push(title)
  }

  if (body !== null) {
    updateSql.push('body = ?')
    sqlArgs.push(body)
  }

  if (imageUrl !== null) {
    updateSql.push('imageUrl = ?')
    sqlArgs.push(imageUrl)
  }

  sqlArgs.push(id)

  const sql = `UPDATE ${db.name}.posts SET ${updateSql.join(', ')} WHERE id = ?`

  await db.query(sql, sqlArgs)

  const [ post ] = await db.query(`SELECT * FROM ${db.name}.posts WHERE id = ?`, [id])

  return post
}

exports.deletePost = async (id) => {
  return await db.query(`UPDATE ${db.name}.posts SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?`, [id])
}
