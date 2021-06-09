(async () => {
  const db = require('../src/connectDb')
  const initializeDatabase = require('../src/initializeDatabase')

  await db.connect()

  await initializeDatabase(process.env.DATABASE_NAME)

  process.exit()
})()
