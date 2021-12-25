/**
 * RAN ON DEV 11/25/2021 2:35pm
 * RAN ON PROD 12/24/2021
 */

(async () => {
  require('dotenv').config()
  const db = require('../src/connectDb')

  const SAILING_DB_NAME = process.env.DATABASE_NAME || 'sailing'

  await db.connect()

  /**
   * Alter payments
   */
  await db.query(`ALTER TABLE ${SAILING_DB_NAME}.payments
    ADD COLUMN classRegistrationId INT,
    ADD FOREIGN KEY (classRegistrationId) REFERENCES ${SAILING_DB_NAME}.class_registrations(id),
    MODIFY COLUMN rentalId INT
  `)

  /**
   * Remove class details
   */
  await db.query(`ALTER TABLE ${SAILING_DB_NAME}.classes
    DROP COLUMN details
  `)

  /**
   * Alter settings
   */
  await db.query(`ALTER TABLE ${SAILING_DB_NAME}.settings
    MODIFY COLUMN value TEXT
  `)

  process.exit()
})()
