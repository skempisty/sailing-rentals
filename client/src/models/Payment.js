export default class Payment {
  constructor({
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
    paypalCaptureId
  }) {
    this.orderId = orderId
    this.amount = amount
    this.currency = currency
    this.payerId = payerId
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





