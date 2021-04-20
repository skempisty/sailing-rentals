const db = require('../connectDb')

exports.getCarouselSlides = async () => {
  return await db.query(`SELECT * FROM ${db.name}.carousel_slides WHERE deletedAt = "0000-00-00 00:00:00" ORDER BY slideOrder`)
}

exports.createCarouselSlide = async (createdBy, imageUrl) => {
  const [ result ] = await db.query(`SELECT COUNT(*) AS rowCount FROM ${db.name}.carousel_slides`)

  console.log('rowCount', result.rowCount)

  const newSlide = [ createdBy, imageUrl, result.rowCount ]

  await db.query(`INSERT INTO ${db.name}.carousel_slides (createdBy, imageUrl, slideOrder) VALUES (?, ?, ?)`, newSlide)

  const [ slide ] = await db.query(`SELECT * FROM ${db.name}.carousel_slides WHERE id = LAST_INSERT_ID()`)

  return slide
}

exports.updateCarouselSlide = async (id, updateFields) => {
  const { label, subText, imageUrl, slideOrder } = updateFields

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

  if (slideOrder !== null) {
    updateSql.push('slideOrder = ?')
    sqlArgs.push(slideOrder)
  }

  sqlArgs.push(id)

  const sql = `UPDATE ${db.name}.carousel_slides SET ${updateSql.join(', ')} WHERE id = ?`

  await db.query(sql, sqlArgs)

  const [ slide ] = await db.query(`SELECT * FROM ${db.name}.carousel_slides WHERE id = ?`, [id])

  return slide
}

exports.moveCarouselSlides = async (oldIndex, newIndex) => {
  const sql = `
    UPDATE 
      ${db.name}.carousel_slides
    SET
      slideOrder = CASE
    WHEN 
      slideOrder = ? THEN ?
    WHEN
      slideOrder = ? THEN ?
    ELSE
      slideOrder END
  `

  const sqlArgs = [ oldIndex, newIndex, newIndex, oldIndex ]

  await db.query(sql, sqlArgs)
}

exports.deleteCarouselSlide = async (id) => {
  return await db.query(`UPDATE ${db.name}.carousel_slides SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?`, [id])
}
