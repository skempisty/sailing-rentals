/**
 * TODO: record these values
 * RAN ON DEV 4/8/22 9pm
 * RAN ON PRODUCTION XXX
 */

(async () => {
  require('dotenv').config()
  const db = require('../src/connectDb')

  const SAILING_DB_NAME = process.env.DATABASE_NAME || 'sailing'

  await db.connect()

  await db.query(`ALTER TABLE ${SAILING_DB_NAME}.boats 
    ADD COLUMN isDisabled BOOLEAN DEFAULT false
  `)

  process.exit()
})()
