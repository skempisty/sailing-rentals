const db = require('../connectDb')
const PaymentDto = require('../dto/PaymentDto')

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

    console.log('ORDER ID', orderId)

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
      classRegistrationId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, newPayment)

    const [ payment ] = await db.query(`SELECT * FROM ${db.name}.payments WHERE id = LAST_INSERT_ID()`)

    return payment
  }

  return {
    createClassPayment
  }
}

module.exports = PaymentsDao()
