const checkoutNodeJssdk = require('@paypal/checkout-server-sdk')

const payPalClient = require('../utils/payPalClient')

exports.getPaypalOrderByOrderId = async (paypalOrderId) => {
  // Call PayPal to get the transaction details
  const orderRequest = new checkoutNodeJssdk.orders.OrdersGetRequest(paypalOrderId)

  return await payPalClient.client().execute(orderRequest)
}

exports.capturePaymentWithAuthorizationId = async (authorizationId) => {
  const captureRequest = new checkoutNodeJssdk.payments.AuthorizationsCaptureRequest(authorizationId)

  captureRequest.requestBody({})

  const capture = await payPalClient.client().execute(captureRequest)

  return capture.result.id
}

// TODO: stub - refundPayment
// exports.refundPayment = async (captureId) => {}
