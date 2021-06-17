(async () => {
  require('dotenv').config()
  const db = require('../src/connectDb')

  const SAILING_DB_NAME = process.env.DATABASE_NAME || 'sailing'

  await db.connect()

  // Users table structure changes
  await db.query(`ALTER TABLE ${SAILING_DB_NAME}.users
    MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    MODIFY COLUMN deletedAt TIMESTAMP NULL DEFAULT NULL;
  `)

  // Carousel Slides table structure changes
  await db.query(`ALTER TABLE ${SAILING_DB_NAME}.carousel_slides
    MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    MODIFY COLUMN deletedAt TIMESTAMP NULL DEFAULT NULL;
  `)

  // Posts table structure changes
  await db.query(`ALTER TABLE ${SAILING_DB_NAME}.posts
    MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    MODIFY COLUMN deletedAt TIMESTAMP NULL DEFAULT NULL;
  `)

  // Boats table structure changes
  await db.query(`ALTER TABLE ${SAILING_DB_NAME}.boats
    MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    MODIFY COLUMN deletedAt TIMESTAMP NULL DEFAULT NULL;
  `)

  // Rentals table structure changes
  await db.query(`ALTER TABLE ${SAILING_DB_NAME}.rentals
    MODIFY COLUMN start TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY COLUMN end TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    MODIFY COLUMN deletedAt TIMESTAMP NULL DEFAULT NULL;
  `)

  // Payments table structure changes
  await db.query(`ALTER TABLE ${SAILING_DB_NAME}.payments
    MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
  `)

  // Settings table structure changes
  await db.query(`ALTER TABLE ${SAILING_DB_NAME}.settings
    MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
  `)

  // Set all records with deletedAt to null if = '0000-00-00 00:00:00'
  await db.query(`UPDATE ${SAILING_DB_NAME}.users SET deletedAt = NULL WHERE deletedAt = '0000-00-00 00:00:00'`)
  await db.query(`UPDATE ${SAILING_DB_NAME}.boats SET deletedAt = NULL WHERE deletedAt = '0000-00-00 00:00:00'`)
  await db.query(`UPDATE ${SAILING_DB_NAME}.carousel_slides SET deletedAt = NULL WHERE deletedAt = '0000-00-00 00:00:00'`)
  await db.query(`UPDATE ${SAILING_DB_NAME}.posts SET deletedAt = NULL WHERE deletedAt = '0000-00-00 00:00:00'`)
  await db.query(`UPDATE ${SAILING_DB_NAME}.rentals SET deletedAt = NULL WHERE deletedAt = '0000-00-00 00:00:00'`)
  await db.query(`UPDATE ${SAILING_DB_NAME}.users SET deletedAt = NULL WHERE deletedAt = '0000-00-00 00:00:00'`)
  await db.query(`UPDATE ${SAILING_DB_NAME}.users SET deletedAt = NULL WHERE deletedAt = '0000-00-00 00:00:00'`)

  process.exit()
})()
