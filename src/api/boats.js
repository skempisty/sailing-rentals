const db = require('../connectDb')

exports.getBoats = async () => {
  return await db.query(`SELECT * FROM ${db.name}.boats`)
}

exports.createBoat = async (createdBy, boatObj) => {
  const { name, model, perHourRentalCost, description, imageUrl } = boatObj

  const newBoat = [ createdBy, name, model, perHourRentalCost, description, imageUrl ]

  await db.query(`INSERT INTO ${db.name}.boats (createdBy, name, model, perHourRentalCost, description, imageUrl) VALUES (?, ?, ?, ?, ?, ?)`, newBoat)

  const [ boat ] = await db.query(`SELECT * FROM ${db.name}.boats WHERE id = LAST_INSERT_ID()`)

  return boat
}

exports.updateBoat = async (id, updateFields) => {
  const { name, model, perHourRentalCost, isDisabled, description, imageUrl } = updateFields

  const updateSql = ['updatedAt = CURRENT_TIMESTAMP']
  const sqlArgs = []

  if (name !== null) {
    updateSql.push('name = ?')
    sqlArgs.push(name)
  }

  if (model !== null) {
    updateSql.push('model = ?')
    sqlArgs.push(model)
  }

  if (perHourRentalCost !== null) {
    updateSql.push('perHourRentalCost = ?')
    sqlArgs.push(perHourRentalCost)
  }

  if (description !== null) {
    updateSql.push('isDisabled = ?')
    sqlArgs.push(isDisabled)
  }

  if (description !== null) {
    updateSql.push('description = ?')
    sqlArgs.push(description)
  }

  if (imageUrl !== null) {
    updateSql.push('imageUrl = ?')
    sqlArgs.push(imageUrl)
  }

  sqlArgs.push(id)

  const sql = `UPDATE ${db.name}.boats SET ${updateSql.join(', ')} WHERE id = ?`

  await db.query(sql, sqlArgs)

  const [ boat ] = await db.query(`SELECT * FROM ${db.name}.boats WHERE id = ?`, [id])

  return boat
}

/**
 * Mark a boat as deleted and return that boat
 * @param {string} id the boat's id
 * @returns {Promise<Boat>}
 */
exports.deleteBoat = async (id) => {
  await db.query(`UPDATE ${db.name}.boats SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?`, [id])

  const [ boat ] = await db.query(`SELECT * FROM ${db.name}.boats WHERE id = ?`, [id])

  return boat
}

exports.getABoat = async () => {
  const [ boat ] = await db.query(`SELECT * FROM ${db.name}.boats`)

  return boat
}
