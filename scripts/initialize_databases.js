(async () => {
  const db = require('../src/connectDb')

  const SAILING_DB_NAME = 'sailing'

  await db.connect()

  await db.query(`CREATE DATABASE IF NOT EXISTS ${SAILING_DB_NAME}`)

  await db.query('CREATE TABLE sailing.users (' +
    'id INT PRIMARY KEY,' +
    'google_id VARCHAR(255),' +
    'name VARCHAR(255),' +
    'image_url VARCHAR(255),' +
    'email VARCHAR(255),' +
    'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'is_approved BOOLEAN DEFAULT false,' +
    'is_admin BOOLEAN DEFAULT false,' +
    'deleted_at TIMESTAMP );'
  )
})()
