// TODO: combine and run this migration on production
(async () => {
  require('dotenv').config()
  const db = require('../src/connectDb')

  const SAILING_DB_NAME = process.env.DATABASE_NAME || 'sailing'

  await db.connect()

  await db.query(`
    CREATE TABLE ${SAILING_DB_NAME}.classes (
      id INT PRIMARY KEY AUTO_INCREMENT, 
      details TEXT,
      capacity INT NOT NULL,
      price DOUBLE(10,2) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deletedAt TIMESTAMP NULL DEFAULT NULL
    );
  `)

  await db.query(`
    CREATE TABLE ${SAILING_DB_NAME}.class_meetings (
      id INT PRIMARY KEY AUTO_INCREMENT,
      classId INT NOT NULL,
      rentalId INT DEFAULT NULL,
      instructorId INT NOT NULL,
      FOREIGN KEY (classId) REFERENCES ${SAILING_DB_NAME}.classes(id),
      FOREIGN KEY (rentalId) REFERENCES ${SAILING_DB_NAME}.rentals(id),
      FOREIGN KEY (instructorId) REFERENCES ${SAILING_DB_NAME}.users(id),
      name VARCHAR(255) NOT NULL,
      details TEXT,
      start TIMESTAMP NOT NULL,
      end TIMESTAMP NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deletedAt TIMESTAMP NULL DEFAULT NULL
    );
  `)

  await db.query(`
    CREATE TABLE ${SAILING_DB_NAME}.class_registrations (
      id INT PRIMARY KEY AUTO_INCREMENT,
      userId INT NOT NULL,
      classId INT NOT NULL,
      FOREIGN KEY (userId) REFERENCES ${SAILING_DB_NAME}.users(id),
      FOREIGN KEY (classId) REFERENCES ${SAILING_DB_NAME}.classes(id),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deletedAt TIMESTAMP NULL DEFAULT NULL
    );
  `)
})()
