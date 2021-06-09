const supertest = require('supertest')
const app = require('../../../../server') // Link to your server file

const request = supertest(app)
const db = require('../../../../src/connectDb')

const initializeDatabase = require('../../../../src/initializeDatabase')
const removeDatabase = require('../../utils/removeDatabase')

const TEST_DB_NAME = 'sailing_site_data_test'

beforeAll(async () => {
  await db.connect()

  await initializeDatabase(TEST_DB_NAME)

  console.log('BEFORE USE DB')

  await db.useDb(TEST_DB_NAME)

  console.log('AFTER USE DB')
})

afterAll(async () => {
  await removeDatabase(TEST_DB_NAME)

  await db.disconnect()
})

it('should get non-logged in data when not logged in', async () => {
  const res = await request.get('/api/site_data')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer null')

  const {
    currentUser,
    myRentals,
    allRentals,
    myPayments,
    allPayments
  } = res.body

  expect(currentUser).toBe(null)
  expect(myRentals.length).toBe(0)
  expect(allRentals.length).toBe(0)
  expect(myPayments.length).toBe(0)
  expect(allPayments.length).toBe(0)
})
