import React from 'react'
import PropTypes from 'prop-types'

import { Button, Modal } from 'react-bootstrap'

const DeleteClassModal = ({ show, klass, onHide }) => {
  const handleDeleteConfirmClick = () => {
    console.log('delete!')
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Class</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Warning! Deleting a class will not give students that already signed up their class fee back.
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Cancel
        </Button>

        <Button variant='danger' onClick={handleDeleteConfirmClick}>
          Confirm Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

DeleteClassModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  klass: PropTypes.object
}

export default DeleteClassModal
