import React from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'react-bootstrap'

const MtgInfoModal = ({ mtg, show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginLeft: '0.5em' }}>Meeting Info</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

      </Modal.Body>

      <Modal.Footer>

      </Modal.Footer>
    </Modal>
  )
}

MtgInfoModal.propTypes = {
  mtg: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
}

export default MtgInfoModal
