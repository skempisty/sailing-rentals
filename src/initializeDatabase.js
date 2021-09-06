const db = require('./connectDb')

const initializeDatabase = async function(dbName) {
  /*
   * Must blank out sql_mode before initializing test DB. Without this we cannot insert 0 values for timestamps.
   * Does not matter locally, but it does while using the docker MySQL in github actions.
   * https://gokhan.ozar.net/blog/how-to-fix-incorrect-datetime-value-mysql-mariadb/
   */
  await db.query("SET sql_mode = 'NO_ENGINE_SUBSTITUTION';")

  await db.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`)

  /**
   * Drop Tables
   */
  await db.query(`DROP TABLE IF EXISTS ${dbName}.carousel_slides;`)
  await db.query(`DROP TABLE IF EXISTS ${dbName}.posts;`)
  await db.query(`DROP TABLE IF EXISTS ${dbName}.payments;`)
  await db.query(`DROP TABLE IF EXISTS ${dbName}.rentals;`)
  await db.query(`DROP TABLE IF EXISTS ${dbName}.settings;`)
  await db.query(`DROP TABLE IF EXISTS ${dbName}.boats;`)
  await db.query(`DROP TABLE IF EXISTS ${dbName}.users;`)

  /**
   * Create Tables
   */
  await db.query(`CREATE TABLE ${dbName}.users (` +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    'googleId VARCHAR(255) NOT NULL,' +
    'imageUrl VARCHAR(255),' +
    'isApproved BOOLEAN DEFAULT false,' +
    'isInstructor BOOLEAN DEFAULT false,' +
    'isAdmin BOOLEAN DEFAULT false,' +
    'createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,' +
    'deletedAt TIMESTAMP NULL DEFAULT NULL,' +
    'firstName VARCHAR(255),' +
    'lastName VARCHAR(255),' +
    'email VARCHAR(255),' +
    'phone VARCHAR(255),' +
    'affiliation VARCHAR(255)' +
    ');'
  )

  await db.query(`CREATE TABLE ${dbName}.carousel_slides (` +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    'createdBy INT NOT NULL,' +
    'FOREIGN KEY (createdBy) REFERENCES users(id),' +
    'label VARCHAR(255) DEFAULT NULL,' +
    'subText TEXT DEFAULT NULL,' +
    'imageUrl VARCHAR(255) NOT NULL,' +
    'slideOrder INT NOT NULL,' +
    'createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,' +
    'deletedAt TIMESTAMP NULL DEFAULT NULL' +
    ');'
  )

  await db.query(`CREATE TABLE ${dbName}.posts (` +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    'createdBy INT NOT NULL,' +
    'FOREIGN KEY (createdBy) REFERENCES users(id),' +
    'title VARCHAR(255) NOT NULL,' +
    'body TEXT,' +
    'imageUrl VARCHAR(255),' +
    'createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,' +
    'deletedAt TIMESTAMP NULL DEFAULT NULL' +
    ');'
  )

  await db.query(`CREATE TABLE ${dbName}.boats (` +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    'createdBy INT NOT NULL,' +
    'FOREIGN KEY (createdBy) REFERENCES users(id),' +
    'name VARCHAR(255) NOT NULL,' +
    'model VARCHAR(255) NOT NULL,' +
    'description TEXT,' +
    'perHourRentalCost DOUBLE(10,2) NOT NULL,' +
    'imageUrl VARCHAR(255),' +
    'createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,' +
    'deletedAt TIMESTAMP NULL DEFAULT NULL' +
    ');'
  )

  await db.query(`CREATE TABLE ${dbName}.rentals (` +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    'boatId INT NOT NULL,' +
    'rentedBy INT NOT NULL,' +
    'FOREIGN KEY (boatId) REFERENCES boats(id),' +
    'FOREIGN KEY (rentedBy) REFERENCES users(id),' +
    'crewCount INT,' +
    "type ENUM('standard', 'maintenance') NOT NULL DEFAULT 'standard'," +
    'start TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,' +
    'end TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,' +
    'reason TEXT DEFAULT NULL,' +
    'createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,' +
    'deletedAt TIMESTAMP NULL DEFAULT NULL' +
    ');'
  )

  await db.query(`CREATE TABLE ${dbName}.payments (` +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +

    'orderId VARCHAR(255) NOT NULL,' +
    'amount DOUBLE(10,2) NOT NULL,' +
    'currency VARCHAR(255) NOT NULL,' +

    'payerId VARCHAR(255),' +
    'payerCountryCode VARCHAR(255),' +
    'payerPostalCode VARCHAR(255),' +
    'payerEmailAddress VARCHAR(255),' +
    'payerPhone VARCHAR(255),' +
    'payerGivenName VARCHAR(255),' +
    'payerSurname VARCHAR(255),' +

    'payeeEmail VARCHAR(255),' +
    'payeeMerchantId VARCHAR(255),' +
    'paypalAuthorizationId VARCHAR(255) NOT NULL,' +
    'paypalCaptureId VARCHAR(255),' +

    'rentalId INT NOT NULL,' +
    'paidBy INT NOT NULL,' +
    'FOREIGN KEY (rentalId) REFERENCES rentals(id),' +
    'FOREIGN KEY (paidBy) REFERENCES users(id),' +
    'createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' +
    ');'
  )

  await db.query(`CREATE TABLE ${dbName}.settings (` +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    'name VARCHAR(255) NOT NULL,' +
    'value VARCHAR(255) NOT NULL,' +
    'createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' +
    ');'
  )

  await db.query(`CREATE TABLE ${dbName}.classes (` +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    'instructorId INT NOT NULL,' +
    'FOREIGN KEY (instructorId) REFERENCES users(id),' +
    'name VARCHAR(255) NOT NULL,' +
    'details TEXT,' +
    'capacity INT NOT NULL,' +
    'price DOUBLE(10,2) NOT NULL,' +
    'createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,' +
    'deletedAt TIMESTAMP NULL DEFAULT NULL' +
    ');'
  )

  await db.query(`CREATE TABLE ${dbName}.class_meetings (` +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    'classId INT NOT NULL,' +
    'rentalId INT DEFAULT NULL,' +
    'FOREIGN KEY (classId) REFERENCES classes(id),' +
    'FOREIGN KEY (rentalId) REFERENCES rentals(id),' +
    'name VARCHAR(255) NOT NULL,' +
    'details TEXT,' +
    'usesBoat BOOLEAN DEFAULT false,' +
    'createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,' +
    'deletedAt TIMESTAMP NULL DEFAULT NULL' +
    ');'
  )

  await db.query(`CREATE TABLE ${dbName}.class_registrations (` +
    'id INT PRIMARY KEY AUTO_INCREMENT,' +
    'userId INT NOT NULL,' +
    'classId INT NOT NULL,' +
    'FOREIGN KEY (userId) REFERENCES users(id),' +
    'FOREIGN KEY (classId) REFERENCES classes(id),' +
    'createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
    'updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,' +
    'deletedAt TIMESTAMP NULL DEFAULT NULL' +
    ');'
  )

  /**
   * Insert Dummy data
   */
  await db.query(`INSERT INTO ${dbName}.users (id, googleId, firstName, lastName, email, phone, affiliation, imageUrl, isAdmin, isApproved, isInstructor) VALUES
    (null, '0', 'Eru', 'Iluvatar', 'iam.god@gmail.com', '2406456689', 'The one God', 'https://loremflickr.com/50/50/god', '1', '1', '0'),
    (null, '1', 'Frodo', 'Baggins', 'one.ring@gmail.com', '2406456690', 'Fellowship of the Ring', 'https://loremflickr.com/50/50/frodo', '0', '1', '1'),
    (null, '2', 'Gollum', 'Smeagol', 'my.precious@gmail.com', '2406456691', 'Lava dweller', 'https://loremflickr.com/50/50/gollum', '0', '0', '0')
  `)

  await db.query(`INSERT INTO ${dbName}.boats (createdBy, name, model, imageUrl, description, perHourRentalCost) VALUES
    (LAST_INSERT_ID(), 'Cloud 9', 'Cutter22', 'https://loremflickr.com/200/400/sailboat', 'Oh what a faithful old barnacle!', 10),
    (LAST_INSERT_ID(), 'Iris', 'Cutter22', 'https://loremflickr.com/200/400/sailboat', 'Oh how it doth soar!', 10)
  `)

  await db.query(`INSERT INTO ${dbName}.settings (name, value) VALUES
    ('min_rental_hours', '3'),
    ('max_rental_hours', '3'),
    ('earliest_rental_time', '0700'),
    ('latest_rental_time', '2000'),
    ('paypal_payee_client_id', '')
  `)
}

module.exports = initializeDatabase