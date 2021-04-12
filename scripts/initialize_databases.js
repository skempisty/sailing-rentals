(async () => {
  const db = require('../src/connectDb')

  const SAILING_DB_NAME = process.env.DATABASE_NAME || 'sailing'

  await db.connect()

  if (process.env.NODE_ENV !== 'production') {
    await db.query(`CREATE DATABASE IF NOT EXISTS ${SAILING_DB_NAME}`)
  }

  /**
   * Drop Tables
   */
  await db.query(`DROP TABLE IF EXISTS ${SAILING_DB_NAME}.carousel_slides;`)
  await db.query(`DROP TABLE IF EXISTS ${SAILING_DB_NAME}.posts;`)
  await db.query(`DROP TABLE IF EXISTS ${SAILING_DB_NAME}.rentals;`)
  await db.query(`DROP TABLE IF EXISTS ${SAILING_DB_NAME}.payments;`)
  await db.query(`DROP TABLE IF EXISTS ${SAILING_DB_NAME}.site_settings;`)
  await db.query(`DROP TABLE IF EXISTS ${SAILING_DB_NAME}.boats;`)
  await db.query(`DROP TABLE IF EXISTS ${SAILING_DB_NAME}.users;`)

  /**
   * Create Tables
   */
  await db.query(`CREATE TABLE ${SAILING_DB_NAME}.users (` +
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
    'phone VARCHAR(255),' +
    'job_title VARCHAR(255),' +
    'affiliation VARCHAR(255)' +
    ');'
  )

  await db.query(`CREATE TABLE ${SAILING_DB_NAME}.carousel_slides (` +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    'created_by INT,' +
    'FOREIGN KEY (created_by) REFERENCES users(id),' +
    'label VARCHAR(255),' +
    'sub_text TEXT,' +
    'image_url VARCHAR(255),' +
    'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'deleted_at TIMESTAMP' +
    ');'
  )

  await db.query(`CREATE TABLE ${SAILING_DB_NAME}.posts (` +
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

  await db.query(`CREATE TABLE ${SAILING_DB_NAME}.boats (` +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    'created_by INT,' +
    'FOREIGN KEY (created_by) REFERENCES users(id),' +
    'name VARCHAR(255),' +
    'model VARCHAR(255),' +
    'description TEXT,' +
    'per_hour_rental_cost DOUBLE(10,2),' +
    'image_url VARCHAR(255),' +
    'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'deleted_at TIMESTAMP' +
    ');'
  )

  await db.query(`CREATE TABLE ${SAILING_DB_NAME}.rentals (` +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    'boat_id INT,' +
    'rented_by INT,' +
    'FOREIGN KEY (boat_id) REFERENCES boats(id),' +
    'FOREIGN KEY (rented_by) REFERENCES users(id),' +
    'crew_count INT,' +
    'start TIMESTAMP NOT NULL,' +
    'end TIMESTAMP NOT NULL,' +
    'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'deleted_at TIMESTAMP' +
    ');'
  )

  await db.query(`CREATE TABLE ${SAILING_DB_NAME}.payments (` +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +

    'order_id VARCHAR(255) NOT NULL,' +
    'amount DOUBLE(10,2) NOT NULL,' +
    'currency VARCHAR(255) NOT NULL,' +

    'payer_id VARCHAR(255) NOT NULL,' +
    'payer_country_code VARCHAR(255) NOT NULL,' +
    'payer_postal_code VARCHAR(255) NOT NULL,' +
    'payer_email_address VARCHAR(255) NOT NULL,' +
    'payer_phone VARCHAR(255) NOT NULL,' +
    'payer_given_name VARCHAR(255) NOT NULL,' +
    'payer_surname VARCHAR(255) NOT NULL,' +

    'payee_email VARCHAR(255) NOT NULL,' +
    'payee_merchant_id VARCHAR(255) NOT NULL,' +
    'paypal_capture_id VARCHAR(255) NOT NULL,' +

    'rental_id INT NOT NULL,' +
    'paid_by INT NOT NULL,' +
    'FOREIGN KEY (rental_id) REFERENCES rentals(id),' +
    'FOREIGN KEY (paid_by) REFERENCES users(id),' +
    'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP' +
    ');'
  )

  await db.query(`CREATE TABLE ${SAILING_DB_NAME}.site_settings (` +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    'name VARCHAR(255) NOT NULL,' +
    'value VARCHAR(255) NOT NULL,' +
    'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP' +
    ');'
  )

  /**
   * Insert Dummy data
   */
  await db.query(`INSERT INTO ${db.name}.users (id, google_id, first_name, last_name, email, phone, job_title, affiliation, image_url, is_admin) VALUES
    (null, '0', 'Frodo', 'Baggins', 'one.ring@gmail.com', 2406456689, 'Ring Bearer', 'Fellowship of the Ring', 'https://loremflickr.com/50/50/frodo', '1'),
    (null, '1', 'Samwise', 'Gamgee', 'mrfrodo@gmail.com', 2406456690, 'Ring Bearer Bearer', 'Fellowship of the Ring', 'https://loremflickr.com/50/50/samwise', '0')
  `);

  await db.query(`INSERT INTO ${db.name}.boats (created_by, name, model, image_url, description, per_hour_rental_cost) VALUES
    (LAST_INSERT_ID(), 'Cloud 9', 'Cutter22', 'https://loremflickr.com/200/400/sailboat', 'Oh what a faithful old barnacle!', 10),
    (LAST_INSERT_ID(), 'Iris', 'Cutter22', 'https://loremflickr.com/200/400/sailboat', 'Oh how it doth soar!', 10)
  `);

  await db.query(`INSERT INTO ${db.name}.site_settings (name, value) VALUES
    ('earliest_rental_time', '0700'),
    ('latest_rental_time', '2000'),
    ('paypal_payee_client_id', '')
  `);
})()
