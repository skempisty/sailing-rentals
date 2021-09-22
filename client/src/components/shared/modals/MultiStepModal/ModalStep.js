import React  from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'react-bootstrap'

const ModalStep = ({ step, stepNum, children }) => {
  if (step !== stepNum) return null

  return (
    <React.Fragment>
      <Modal.Body>
        {children}
      </Modal.Body>
    </React.Fragment>
  )
}

ModalStep.propTypes = {
  step: PropTypes.number,
  stepNum: PropTypes.number,
  children: PropTypes.node.isRequired
}

export default ModalStep
