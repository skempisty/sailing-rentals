import React from 'react'
import PropTypes from 'prop-types'

import { PayPalButton } from 'react-paypal-button-v2'

import { paypalAccountClientId } from '../../config'

const PayPalButtons = ({ amount, onApprove, onButtonRdy }) => {
  return (
    <PayPalButton
      amount={amount}
      shippingPreference='NO_SHIPPING' // default is 'GET_FROM_FILE'
      onApprove={onApprove}
      onError={(e) => {
        alert(`Error contacting Paypal. Try again later`)
        console.log('e', e)
      }}
      options={{
        clientId: paypalAccountClientId, // 'PRODUCTION_CLIENT_ID'
        disableFunding: 'paylater',
        intent: 'authorize'
      }}
      onButtonReady={onButtonRdy}
      onShippingChange={() => { return '' }} // Just having this prop forces all payment forms to render in popups instead of inline
    />
  )
}

PayPalButtons.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onApprove: PropTypes.func.isRequired,
  onButtonRdy: PropTypes.func
}

export default PayPalButtons
