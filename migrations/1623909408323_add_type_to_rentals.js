(async () => {
  require('dotenv').config()
  const db = require('../src/connectDb')

  const SAILING_DB_NAME = process.env.DATABASE_NAME || 'sailing'

  await db.connect()

  await db.query(`ALTER TABLE ${SAILING_DB_NAME}.rentals ADD COLUMN type ENUM('standard', 'course', 'maintenance') NOT NULL DEFAULT 'standard'`)

  process.exit()
})()
