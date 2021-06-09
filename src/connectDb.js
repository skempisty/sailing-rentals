require('dotenv').config()
const util = require('util')
const mysql = require('mysql')

const MYSQL_CHARSET = 'UTF8MB4_UNICODE_CI'
const MYSQL_TIMEZONE = 'Z'

let pool
let name = process.env.DATABASE_NAME

module.exports = {
  get name() {
    return name
  },
  async useDb(dbName) {
    // TODO: remove
    console.log('DURING USE DB', dbName)

    name = dbName
  },
  async connect(databaseName = '') {
    console.log('Connecting to MySQL...')

    if (databaseName.length) {
      console.log(`Database: ${databaseName}`)
    } else {
      console.log('No database selected')
    }

    pool = await mysql.createPool({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: databaseName,
      charset: MYSQL_CHARSET,
      timezone: MYSQL_TIMEZONE
    })
  },
  async query(sql, args) {
    console.log(`Sending query: ${sql}, ${args}`)

    return await util
      .promisify(pool.query)
      .call(pool, sql, args)
  },
  async disconnect() {
    pool.end()
  }
}
