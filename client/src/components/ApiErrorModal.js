import React from 'react'

import { Modal } from 'react-bootstrap'

import { useSite } from '../store/site'

const ApiErrorModal = () => {
  const { showApiErrorModal, setShowApiErrorModal } = useSite()

  return (
    <Modal show={showApiErrorModal} onHide={() => setShowApiErrorModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Whoops!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Refresh this page and try again. Site data has been updated.
      </Modal.Body>
    </Modal>
  )
}

export default ApiErrorModal
