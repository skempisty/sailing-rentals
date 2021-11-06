/**
 * RAN ON PRODUCTION <Date Unknown>
 */

(async () => {
  require('dotenv').config()
  const db = require('../src/connectDb')

  const SAILING_DB_NAME = process.env.DATABASE_NAME || 'sailing'

  await db.connect()

  await db.query(`ALTER TABLE ${SAILING_DB_NAME}.site_settings RENAME TO settings`)

  await db.query(`INSERT INTO ${db.name}.settings (name, value) VALUES
    ('min_rental_hours', '3'),
    ('max_rental_hours', '3')
  `)
})()
