const util = require('util')
const mysql = require('mysql')

const MYSQL_CHARSET = 'UTF8MB4_UNICODE_CI'
const MYSQL_TIMEZONE = 'Z'

let pool

module.exports = {
  name: process.env.DATABASE_NAME,
  connect() {
    console.log('Connecting to the DB...')

    pool = mysql.createPool({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      charset: MYSQL_CHARSET,
      timezone: MYSQL_TIMEZONE
    })
  },
  query(sql, args) {
    console.log(`Sending query: ${sql}, ${args}`)

    return util
      .promisify(pool.query)
      .call(pool, sql, args)
  }
}
