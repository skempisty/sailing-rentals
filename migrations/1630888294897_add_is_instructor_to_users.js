(async () => {
  require('dotenv').config()
  const db = require('../src/connectDb')

  const SAILING_DB_NAME = process.env.DATABASE_NAME || 'sailing'

  await db.connect()

  await db.query(`ALTER TABLE ${SAILING_DB_NAME}.users 
    ADD COLUMN isInstructor BOOLEAN DEFAULT false
  `)

  process.exit()
})()
