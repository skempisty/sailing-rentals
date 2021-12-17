class PaymentDto {
  constructor({
    id,
    classRegistrationId,
    rentalId,
    paidBy,
    orderId,
    amount,
    currency,
    payerId,
    payerEmailAddress,
    payerGivenName,
    payerSurname,
    payeeEmail,
    payeeMerchantId,
    paypalAuthorizationId,
    payerCountryCode,
    payerPostalCode
  }) {
    const hasRequiredFields = [
      paidBy,
      orderId,
      amount,
      currency,
      payerId,
      payerGivenName,
      payerSurname,
      payerEmailAddress,
      payeeEmail,
      payeeMerchantId,
      paypalAuthorizationId
    ].every(Boolean)
    if (!hasRequiredFields) throw new Error('Error creating a PaymentDto without a required field')

    const hasForeignKey = [ rentalId, classRegistrationId ].some(Boolean)
    if (!hasForeignKey) throw new Error('Error creating a PaymentDto without an attached foreign key record')

    this.id = id || null
    this.paidBy = paidBy
    this.orderId = orderId
    this.amount = amount
    this.currency = currency
    this.payerId = payerId
    this.payerGivenName = payerGivenName
    this.payerSurname = payerSurname
    this.payerEmailAddress = payerEmailAddress
    this.payeeEmail = payeeEmail
    this.payeeMerchantId = payeeMerchantId
    this.paypalAuthorizationId = paypalAuthorizationId
    this.payerCountryCode = payerCountryCode || ''
    this.payerPostalCode = payerPostalCode || ''
    this.rentalId = rentalId || null
    this.classRegistrationId = classRegistrationId || null
  }

  /**
   *
   * @param {ClassRegistrationDto} classRegistrationDto
   * @returns {PaymentDto}
   */
  static classRegistrationDtoToPaymentDto(classRegistrationDto) {
    const { userId, id: classRegistrationId, payPalData: { data, authorization }} = classRegistrationDto

    const { orderID: orderId, payerID: payerId } = data

    const { payer, purchase_units } = authorization
    const { amount, payee } = purchase_units[0]

    // Get the authorization id
    const authorizationId = authorization.purchase_units[0]
      .payments.authorizations[0].id

    return new PaymentDto({
      classRegistrationId,
      paidBy: userId,
      orderId,
      amount: amount.value,
      currency: amount.currency_code,
      payerId,
      payerEmailAddress: payer.email_address || '',
      payerGivenName: payer.name.given_name,
      payerSurname: payer.name.surname,
      payeeEmail: payee.email_address,
      payeeMerchantId: payee.merchant_id,
      paypalAuthorizationId: authorizationId,
      payerCountryCode: payer.address.country_code,
      payerPostalCode: payer.address.postal_code || ''
    })
  }
}

module.exports = PaymentDto
