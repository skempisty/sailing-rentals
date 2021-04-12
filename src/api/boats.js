const db = require('../connectDb')

exports.getBoats = async () => {
  return await db.query(`SELECT * FROM ${db.name}.boats WHERE deletedAt = "0000-00-00 00:00:00"`)
}

exports.createBoat = async (createdBy, name, model, description) => {
  const newBoat = [ createdBy, name, model, description ]

  await db.query(`INSERT INTO ${db.name}.boats (createdBy, name, model, description) VALUES (?, ?, ?, ?)`, newBoat)

  const [ boat ] = await db.query(`SELECT * FROM ${db.name}.boats WHERE id = LAST_INSERT_ID()`)

  return boat
}
