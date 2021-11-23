import React from 'react'
import PropTypes from 'prop-types'

import Box from './styled-system/Box'
import Flex from './styled-system/Flex'
import Text from './styled-system/Text'

const SailingRentalPriceBreakdown = ({ boatName, boatPricePerHour, hoursToRent }) => {
  const total = (boatPricePerHour * hoursToRent).toFixed(2)

  return (
    <Flex minWidth='12em' flexDirection='column'>
      <Flex justifyContent='flex-end'>
        <Text>Sailing on</Text>
        <Text marginLeft='0.25em' fontWeight='bold'>{boatName}</Text>
      </Flex>

      <Flex justifyContent='flex-end'>${boatPricePerHour} per hour</Flex>

      <Flex justifyContent='flex-end'>x {hoursToRent} Hours</Flex>

      <Flex justifyContent='space-between' borderTop='2px solid black'>
        <Box>Total</Box>
        <Box><Text fontWeight='bold'>${total}</Text></Box>
      </Flex>
    </Flex>
  )
}

SailingRentalPriceBreakdown.propTypes = {
  boatName: PropTypes.string.isRequired,
  boatPricePerHour: PropTypes.number.isRequired,
  hoursToRent: PropTypes.number.isRequired
}

export default SailingRentalPriceBreakdown
