const db = require('../connectDb')

exports.getBoats = async () => {
  return await db.query(`SELECT * FROM ${db.name}.boats WHERE deleted_at = "0000-00-00 00:00:00"`)
}

exports.createBoat = async (created_by, name, model, description) => {
  const newBoat = [ created_by, name, model, description ]

  await db.query(`INSERT INTO ${db.name}.boats (created_by, name, model, description) VALUES (?, ?, ?, ?)`, newBoat)

  const [ boat ] = await db.query(`SELECT * FROM ${db.name}.boats WHERE id = LAST_INSERT_ID()`)

  return boat
}
