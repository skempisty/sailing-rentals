const supertest = require('supertest')
const app = require('../../../../server')

const request = supertest(app)

const setupTestDb = require('../../utils/setupTestDb')
const teardownTestDb = require('../../utils/teardownTestDb')

const TEST_DB_NAME = 'sailing_site_data_test'

beforeAll(async () => {
  await setupTestDb(TEST_DB_NAME)
})

afterAll(async () => {
  await teardownTestDb(TEST_DB_NAME)
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
