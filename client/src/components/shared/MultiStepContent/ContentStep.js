import React  from 'react'
import PropTypes from 'prop-types'
import Box from "../styled-system/Box";

const ContentStep = ({ step, stepNum, children }) => {
  return (
    <Box display={step !== stepNum ? 'none' : null}>{children}</Box>
  )
}

ContentStep.propTypes = {
  step: PropTypes.number,
  stepNum: PropTypes.number,
  children: PropTypes.node.isRequired
}

export default ContentStep
