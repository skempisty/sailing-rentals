const db = require('../connectDb')

exports.getMyPayments = async (userId) => {
  return await db.query(`SELECT * FROM ${db.name}.payments WHERE paid_by = '${userId}' ORDER BY created_at`)
}

exports.getAllPayments = async () => {
  return await db.query(`SELECT * FROM ${db.name}.payments ORDER BY created_at`)
}

exports.createPayment = async (creatorId, rentalId, paymentObj) => {
  const {
    orderId,
    amount,
    currency,
    payerId,
    payerAddressLine1,
    payerAdminArea2,
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
    payerAddressLine1,
    payerAdminArea2,
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
    order_id,
    amount,
    currency,
    payer_id,
    payer_address_line_1,
    payer_admin_area_2,
    payer_country_code,
    payer_postal_code,
    payer_email_address,
    payer_phone,
    payer_given_name,
    payer_surname,
    payee_email,
    payee_merchant_id,
    paypal_capture_id,
    paid_by,
    rental_id
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, newPayment)

  const [ payment ] = await db.query(`SELECT * FROM ${db.name}.payments WHERE id = LAST_INSERT_ID()`)

  return payment
}
