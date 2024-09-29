import React from 'react'
import PropTypes from 'prop-types'

import { paypalAccountClientId } from '../../config'
import { PayPalScriptProvider, PayPalButtons as PPButtons } from "@paypal/react-paypal-js";

const PayPalButtons = ({ amount, onApprove }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": paypalAccountClientId,
        intent: "authorize",
      }}
    >
      <PPButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount, // The amount to charge
                  currency_code: "USD", // The currency of the amount
                },
              },
            ],
            application_context: {
              shipping_preference: "NO_SHIPPING",
            },
            intent: "AUTHORIZE",
          });
        }}
        onApprove={onApprove}
        forceReRender={[amount]}
      />
    </PayPalScriptProvider>
  )

  // return (
  //   <PayPalButton
  //     amount={amount}
  //     shippingPreference='NO_SHIPPING' // default is 'GET_FROM_FILE'
  //     onApprove={onApprove}
  //     onError={(e) => {
  //       alert(`Error contacting Paypal. Try again later`)
  //       console.log('e', e)
  //     }}
  //     options={{
  //       // clientId: paypalAccountClientId, // 'PRODUCTION_CLIENT_ID'
  //       clientId: 'sb', // 'SANDBOX_CLIENT_ID'
  //       disableFunding: 'paylater',
  //       intent: 'authorize'
  //     }}
  //     onButtonReady={onButtonRdy}
  //     onShippingChange={() => { return '' }} // Just having this prop forces all payment forms to render in popups instead of inline
  //   />
  // )
}

PayPalButtons.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onApprove: PropTypes.func.isRequired,
  onButtonRdy: PropTypes.func
}

export default PayPalButtons
