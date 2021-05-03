export default class Payment {
  constructor({
    id,
    orderId,
    amount,
    currency,
    paidBy,
    rentalId,
    payerCountryCode,
    payerPostalCode,
    payerEmailAddress,
    payerPhone,
    payerGivenName,
    payerSurname,
    payeeEmail,
    payeeMerchantId,
    paypalCaptureId
  }) {
    this.id = id
    this.orderId = orderId
    this.amount = amount
    this.currency = currency
    this.paidBy = paidBy
    this.rentalId = rentalId
    this.payerCountryCode = payerCountryCode
    this.payerPostalCode = payerPostalCode
    this.payerEmailAddress = payerEmailAddress
    this.payerPhone = payerPhone
    this.payerGivenName = payerGivenName
    this.payerSurname = payerSurname
    this.payeeEmail = payeeEmail
    this.payeeMerchantId = payeeMerchantId
    this.paypalCaptureId = paypalCaptureId
  }
}





