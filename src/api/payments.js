const db = require('../connectDb')

exports.getMyPayments = async (userId) => {
  const selectFields = [
    'id',
    'amount',
    'rentalId',
    'paidBy',
    'createdAt',
    'updatedAt'
  ]

  return await db.query(`SELECT ${selectFields.join(', ')} FROM ${db.name}.payments WHERE paidBy = '${userId}' ORDER BY createdAt`)
}

exports.getAllPayments = async () => {
  const selectFields = [
    'id',
    'amount',
    'rentalId',
    'paidBy',
    'createdAt',
    'updatedAt'
  ]

  return await db.query(`SELECT ${selectFields.join(', ')} FROM ${db.name}.payments ORDER BY createdAt`)
}

exports.createPayment = async (creatorId, rentalId, paymentObj) => {
  const {
    orderId,
    amount,
    currency,
    payerId,
    payerCountryCode,
    payerPostalCode,
    payerEmailAddress,
    payerPhone,
    payerGivenName,
    payerSurname,
    payeeEmail,
    payeeMerchantId,
    paypalAuthorizationId
  } = paymentObj

  const newPayment = [
    orderId,
    amount,
    currency,
    payerId,
    payerCountryCode,
    payerPostalCode,
    payerEmailAddress,
    payerPhone,
    payerGivenName,
    payerSurname,
    payeeEmail,
    payeeMerchantId,
    paypalAuthorizationId,
    creatorId, // paidBy
    rentalId
  ]

  await db.query(`INSERT INTO ${db.name}.payments (
    orderId,
    amount,
    currency,
    payerId,
    payerCountryCode,
    payerPostalCode,
    payerEmailAddress,
    payerPhone,
    payerGivenName,
    payerSurname,
    payeeEmail,
    payeeMerchantId,
    paypalAuthorizationId,
    paidBy,
    rentalId
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, newPayment)

  const [ payment ] = await db.query(`SELECT * FROM ${db.name}.payments WHERE id = LAST_INSERT_ID()`)

  return payment
}

/**
 * Capture Id is saved after the payment is created usually
 * @param {string} id the payment's id
 * @param {string} captureId the id received after capturing a payment using an authorization ID. Used for refunds.
 */
exports.updateCaptureId = async (id, captureId) => {
  await db.query(`UPDATE ${db.name}.payments SET paypalCaptureId = ? WHERE id = ?`, [captureId, id])
}
