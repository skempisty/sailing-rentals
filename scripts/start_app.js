(async () => {
  require('dotenv').config()

  const app = require('../server')
  const db = require('../src/connectDb')

  const port = process.env.PORT || 5001

  await db.connect(process.env.DATABASE_NAME)
  console.log('DB connected!')

  await app.listen(port)
  console.log(`Server running on port ${port}`)
})()