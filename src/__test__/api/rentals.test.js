const supertest = require('supertest')
const app = require('../../../server')

const boatsApi = require('../../api/boats')

const request = supertest(app)

const setupTestDb = require('../utils/setupTestDb')
const teardownTestDb = require('../utils/teardownTestDb')
const getAdminJwt = require('../utils/getAdminJwt')
const getNonAdminJwt = require('../utils/getNonAdminJwt')

const { rentalTypes } = require('../../utils/constants')

const TEST_DB_NAME = 'sailing_rentals_test'

let adminJwt = null
let nonAdminJwt = null
let unapprovedNonAdminJwt = null
let aBoat = null

const MAINTENANCE_REASON = 'Broken mast'

const newPaymentParams = {
  orderId: '06X58295VP479834H',
  payerId: 'AV2V2Y7864QNG',
  amount: '35.00',
  currency: 'USD',
  payerCountryCode: 'US',
  payerPostalCode: '90004',
  payerEmailAddress: 'stephen.kempisty@gmail.com',
  payerGivenName: 'Stephen',
  payerSurname: 'Kempisty',
  payeeEmail: 'barco.03-facilitator@gmail.com',
  payeeMerchantId: 'YQZCHTGHUK5P8',
  paypalAuthorizationId: '3B599806CB4495735'
}

beforeAll(async () => {
  await setupTestDb(TEST_DB_NAME)

  adminJwt = await getAdminJwt()
  nonAdminJwt = await getNonAdminJwt()
  unapprovedNonAdminJwt = await getNonAdminJwt(0)
  aBoat = await boatsApi.getABoat()
})

afterAll(async () => {
  await teardownTestDb(TEST_DB_NAME)
})

describe('POST /api/rentals', function() {
  it('should create a new standard rental as an admin', async () => {
    const newRentalParams = {
      id: null,
      type: '', // without a type given, type will be set to standard
      start: '2031-06-26T14:00:00.322Z', // set way in the future to avoid "in the past" validation
      end: '2031-06-26T17:30:00.000Z',
      reason: '', // standard rentals wont have a reason
      boatId: aBoat.id, // a boat available in table - doesn't matter which
      crewCount: '2'
    }

    const res = await request.post('/api/rentals')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${adminJwt}`)
      .send({ rental: newRentalParams, payment: newPaymentParams })

    const { rental, payment } = res.body

    expect(rental.id).toBeTruthy()
    expect(rental.type).toBe(rentalTypes.STANDARD)
    expect(payment.id).toBeTruthy()
  })

  it('should create a new standard rental as a non-admin', async () => {
    const newRentalParams = {
      id: null,
      type: '', // without a type given, type will be set to standard
      start: '2031-06-26T14:00:00.322Z', // set way in the future to avoid "in the past" validation
      end: '2031-06-26T17:30:00.000Z',
      reason: '', // standard rentals wont have a reason
      boatId: aBoat.id, // a boat available in table - doesn't matter which
      crewCount: '2'
    }

    const res = await request.post('/api/rentals')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${nonAdminJwt}`)
      .send({ rental: newRentalParams, payment: newPaymentParams })

    const { rental, payment } = res.body

    expect(rental.id).toBeTruthy()
    expect(rental.type).toBe(rentalTypes.STANDARD)
    expect(payment.id).toBeTruthy()
  })

  it('should throw a permissions error if not admin and not approved for rentals', async () => {
    const newRentalParams = {
      id: null,
      type: '', // without a type given, type will be set to standard
      start: '2031-06-25T14:00:00.322Z', // set way in the future to avoid "in the past" validation
      end: '2031-06-25T17:30:00.000Z',
      reason: '', // standard rentals wont have a reason
      boatId: aBoat.id, // a boat available in table - doesn't matter which
      crewCount: '2'
    }

    const res = await request.post('/api/rentals')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${unapprovedNonAdminJwt}`)
      .send({ rental: newRentalParams, payment: newPaymentParams })

    expect(res.status).toBe(401)
  })
})

describe('POST /api/rentals/nopay', function() {
  it('should create a new maintenance period block as an admin', async () => {
    const newMaintenanceParams = {
      id: null,
      type: rentalTypes.MAINTENANCE,
      start: '2031-06-26T14:00:00.322Z', // set way in the future to avoid "in the past" validation
      end: '2031-06-26T17:30:00.000Z',
      reason: MAINTENANCE_REASON,
      boatId: aBoat.id, // a boat available in table - doesn't matter which
      crewCount: '1'
    }

    const res = await request.post('/api/rentals/nopay')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${adminJwt}`)
      .send({ rental: newMaintenanceParams })

    const { rental } = res.body

    expect(rental.id).toBeTruthy()
    expect(rental.type).toBe(rentalTypes.MAINTENANCE)
    expect(rental.reason).toBe(MAINTENANCE_REASON)
  })

  it('should return 401 status if not admin', async () => {
    const newMaintenanceParams = {
      id: null,
      type: rentalTypes.MAINTENANCE,
      start: '2032-06-26T14:00:00.322Z', // set way in the future to avoid "in the past" validation
      end: '2032-06-26T17:30:00.000Z',
      reason: MAINTENANCE_REASON,
      boatId: aBoat.id, // a boat available in table - doesn't matter which
      crewCount: '1'
    }

    const res = await request.post('/api/rentals/nopay')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${nonAdminJwt}`)
      .send({ rental: newMaintenanceParams })

    expect(res.status).toBe(401)
  })
})