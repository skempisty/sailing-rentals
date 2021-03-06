(async () => {
  const db = require('../src/connectDb')

  await db.connect()

  await db.query('CREATE DATABASE sailing')

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
