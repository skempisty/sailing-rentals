const checkoutNodeJssdk = require('@paypal/checkout-server-sdk')

const payPalClient = require('../utils/payPalClient')

exports.getPaypalOrderByOrderId = async (paypalOrderId) => {
  // Call PayPal to get the transaction details
  const orderRequest = new checkoutNodeJssdk.orders.OrdersGetRequest(paypalOrderId)

  return await payPalClient.client().execute(orderRequest)
}

/**
 * @deprecated use capturePayment instead
 * @param authorizationId
 * @returns {Promise<*>}
 */
exports.capturePaymentWithAuthorizationId = async (authorizationId) => {
  const captureRequest = new checkoutNodeJssdk.payments.AuthorizationsCaptureRequest(authorizationId)

  captureRequest.requestBody({})

  const capture = await payPalClient.client().execute(captureRequest)

  return capture.result.id
}

/**
 * @param authorizationId
 * @returns {Promise<*>}
 */
exports.capturePayment = async (authorizationId) => {
  if (process.env.PAYPAL_CLIENT_ID !== 'test') {
    /*
     * Actually capture the payment using the auth Id
     */
    const captureRequest = new checkoutNodeJssdk.payments.AuthorizationsCaptureRequest(authorizationId)

    captureRequest.requestBody({})

    const capture = await payPalClient.client().execute(captureRequest)

    return capture.result.id
  } else {
    return '-1'
  }
}

// TODO: stub - refundPayment
// exports.refundPayment = async (captureId) => {}
