import React from 'react'
import PropTypes from 'prop-types'

import { Button, Modal } from 'react-bootstrap'

import { useBoats } from '../../../../store/boats'

const DisableBoatModal = ({ boat, show, onHide }) => {
  const { updateBoat } = useBoats()

  const handleConfirmDisable = async () => {
    const updatedBoat = { ...boat, isDisabled: !boat.isDisabled }

    updateBoat({ id: boat.id, boatObj: updatedBoat })
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Disable Boat</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to disable <b>{boat.name}</b>?</p>

        <p>some warning that I need to think out better</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Nevermind
        </Button>

        <Button
          variant='warning'
          onClick={handleConfirmDisable}
        >
          Disable
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

DisableBoatModal.propTypes = {
  boat: PropTypes.object,
  show: PropTypes.bool,
  onHide: PropTypes.func
}

export default DisableBoatModal
