import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { FaInfoCircle } from 'react-icons/fa'
import { Button, Modal } from 'react-bootstrap'

class PaymentInfoModal extends React.Component {
  render() {
    const { payment, show, onHide } = this.props

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title style={{ display: 'flex', alignItems: 'center' }}>
            <FaInfoCircle/>
            <span style={{ marginLeft: '0.5em' }}>Payment Info</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        </Modal.Body>

        <Modal.Footer style={{ justifyContent: 'flex-end' }}>
          <Button onClick={onHide}>
            <span>Close</span>
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default connect(
  null,
  null
)(PaymentInfoModal)

PaymentInfoModal.propTypes = {
  payment: PropTypes.object,
  show: PropTypes.bool,
  onHide: PropTypes.func
}