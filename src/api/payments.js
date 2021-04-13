const db = require('../connectDb')

exports.getMyPayments = async (userId) => {
  return await db.query(`SELECT * FROM ${db.name}.payments WHERE paidBy = '${userId}' ORDER BY createdAt`)
}

exports.getAllPayments = async () => {
  return await db.query(`SELECT * FROM ${db.name}.payments ORDER BY createdAt`)
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
    paypalCaptureId,
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
    paypalCaptureId,
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
    paypalCaptureId,
    paidBy,
    rentalId
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, newPayment)

  const [ payment ] = await db.query(`SELECT * FROM ${db.name}.payments WHERE id = LAST_INSERT_ID()`)

  return payment
}
