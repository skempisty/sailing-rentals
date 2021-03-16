const util = require('util')
const mysql = require('mysql')

const MYSQL_CHARSET = 'UTF8MB4_UNICODE_CI'
const MYSQL_TIMEZONE = 'Z'

let connection

module.exports = {
  name: process.env.DATABASE_NAME,
  connect() {
    console.log('Connecting to the DB...')

    connection = mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      charset: MYSQL_CHARSET,
      timezone: MYSQL_TIMEZONE
    })

    return util
      .promisify(connection.connect)
      .call(connection)
  },
  query(sql, args) {
    console.log(`Sending query: ${sql}, ${args}`)

    return util
      .promisify(connection.query)
      .call(connection, sql, args)
  },
  close() {
    console.log('Closing DB connection...')

    return util
      .promisify(connection.end)
      .call(connection)
      .then(() => console.log('Connection closed'))
      .catch((e) => console.log('Connection closing error', e))
  },
  beginTransaction() {
    console.log('Starting transaction...')

    return util
      .promisify(connection.beginTransaction)
      .call(connection)
      .then(() => console.log('Transaction started'))
  },
  commitTransaction() {
    console.log('Commiting transaction...')

    return util
      .promisify(connection.commit)
      .call(connection)
      .then(() => console.log('Transaction commited'))
  },
  rollbackTransaction() {
    console.log('Rolling back transaction...')

    return util
      .promisify(connection.rollback)
      .call(connection)
      .then(() => console.log('Transaction rolled back successfully'))
  }
}
