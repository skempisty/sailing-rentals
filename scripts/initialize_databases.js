(async () => {
  const db = require('../src/connectDb')

  const SAILING_DB_NAME = 'sailing'

  await db.connect()

  await db.query(`CREATE DATABASE IF NOT EXISTS ${SAILING_DB_NAME}`)

  await db.query('DROP TABLE IF EXISTS sailing.posts;')
  await db.query('DROP TABLE IF EXISTS sailing.rentals;')
  await db.query('DROP TABLE IF EXISTS sailing.payments;')
  await db.query('DROP TABLE IF EXISTS sailing.boats;')
  await db.query('DROP TABLE IF EXISTS sailing.users;')

  await db.query('CREATE TABLE sailing.users (' +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    'google_id VARCHAR(255),' +
    'image_url VARCHAR(255),' +
    'is_approved BOOLEAN DEFAULT false,' +
    'is_admin BOOLEAN DEFAULT false,' +
    'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'deleted_at TIMESTAMP,' +
    // data requirements
    'first_name VARCHAR(255),' +
    'last_name VARCHAR(255),' +
    'email VARCHAR(255),' +
    'phone INT,' +
    'job_title VARCHAR(255),' +
    'affiliation VARCHAR(255)' +
    ');'
  )

  await db.query('CREATE TABLE sailing.posts (' +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    'created_by INT,' +
    'FOREIGN KEY (created_by) REFERENCES users(id),' +
    'title VARCHAR(255),' +
    'body TEXT,' +
    'image_url VARCHAR(255),' +
    'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'deleted_at TIMESTAMP' +
    ');'
  )

  await db.query('CREATE TABLE sailing.boats (' +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    'created_by INT,' +
    'FOREIGN KEY (created_by) REFERENCES users(id),' +
    'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'deleted_at TIMESTAMP' +
    ');'
  )

  await db.query('CREATE TABLE sailing.rentals (' +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    'boat_id INT,' +
    'rented_by INT,' +
    'FOREIGN KEY (boat_id) REFERENCES boats(id),' +
    'FOREIGN KEY (rented_by) REFERENCES users(id),' +
    'crew_member_count INT,' +
    'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'deleted_at TIMESTAMP' +
    ');'
  )

  await db.query('CREATE TABLE sailing.payments (' +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    'rental_id INT,' +
    'paid_by INT,' +
    'FOREIGN KEY (rental_id) REFERENCES boats(id),' +
    'FOREIGN KEY (paid_by) REFERENCES users(id),' +
    'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'deleted_at TIMESTAMP' +
    ');'
  )
})()
