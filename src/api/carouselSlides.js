const db = require('../connectDb')

exports.getCarouselSlides = async () => {
  return await db.query(`SELECT * FROM ${db.name}.carousel_slides WHERE deletedAt = NULL`)
}

exports.createCarouselSlide = async (createdBy, slideObj) => {
  const { label, subText, imageUrl } = slideObj

  const newSlide = [ createdBy, label, subText, imageUrl ]

  await db.query(`INSERT INTO ${db.name}.carousel_slides (createdBy, label, subText, imageUrl) VALUES (?, ?, ?, ?)`, newSlide)

  const [ slide ] = await db.query(`SELECT * FROM ${db.name}.carousel_slides WHERE id = LAST_INSERT_ID()`)

  return slide
}

exports.updateCarouselSlide = async (id, updateFields) => {
  const { label, subText, imageUrl } = updateFields

  const updateSql = ['updatedAt = CURRENT_TIMESTAMP']
  const sqlArgs = []

  if (label !== null) {
    updateSql.push('label = ?')
    sqlArgs.push(label)
  }

  if (subText !== null) {
    updateSql.push('subText = ?')
    sqlArgs.push(subText)
  }

  if (imageUrl !== null) {
    updateSql.push('imageUrl = ?')
    sqlArgs.push(imageUrl)
  }

  sqlArgs.push(id)

  const sql = `UPDATE ${db.name}.carousel_slides SET ${updateSql.join(', ')} WHERE id = ?`

  await db.query(sql, sqlArgs)

  const [ slide ] = await db.query(`SELECT * FROM ${db.name}.carousel_slides WHERE id = ?`, [id])

  return slide
}

exports.deleteCarouselSlide = async (id) => {
  return await db.query(`UPDATE ${db.name}.carousel_slides SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?`, [id])
}
