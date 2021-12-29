const db = require('../connectDb')
const PaymentDto = require('../dto/PaymentDto')

const PAYMENTS_TABLE = `${db.name}.payments`

const PaymentsDao = () => {
  /**
   * @param {ClassRegistrationDto} classRegistrationDto
   * @returns {Promise<*>}
   */
  const createClassPayment = async (classRegistrationDto) => {
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
      paypalAuthorizationId,
      paidBy,
      classRegistrationId
    } = PaymentDto.classRegistrationDtoToPaymentDto(classRegistrationDto)

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
      paidBy,
      classRegistrationId
    ]

    const result = await db.query(`INSERT INTO ${PAYMENTS_TABLE} (
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
      classRegistrationId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, newPayment)

    const [ payment ] = await db.query(`SELECT * FROM ${PAYMENTS_TABLE} WHERE id = ${result.insertId}`)

    return payment
  }

  /**
   * Capture Id is saved after the payment is created usually
   * @param {string} id the payment's id
   * @param {string} captureId the id received after capturing a payment using an authorization ID. Used for refunds.
   */
  const updateCaptureId = async (id, captureId) => {
    await db.query(`UPDATE ${PAYMENTS_TABLE} SET paypalCaptureId = ? WHERE id = ?`, [captureId, id])
  }

  return {
    createClassPayment,
    updateCaptureId
  }
}

module.exports = PaymentsDao()
