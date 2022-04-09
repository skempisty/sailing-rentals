import React from 'react'
import PropTypes from 'prop-types'

import { Button, Modal } from 'react-bootstrap'

import { useBoats } from '../../../../store/boats'

const DisableBoatModal = ({ boat, show, onHide }) => {
  const { updateBoat } = useBoats()

  const handleConfirmDisable = async () => {
    const updatedBoat = { ...boat, isDisabled: !boat.isDisabled }

    updateBoat({ id: boat.id, boatObj: updatedBoat })

    onHide()
  }

  const enableWarningBulletPts = [
    `${boat.name} will immediately become available for rentals and class meeting assignments.`,
    'Congratulations on a good fix!'
  ]
  const disableWarningBulletPts = [
    `${boat.name} will immediately become unavailable for rentals and class meeting assignments.`,
    'Disabling a boat will NOT automatically refund renters that have already booked this boat. All refunds must be done manually.',
    'Disabling a boat will NOT cancel any rentals booked for that boat.'
  ]

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{boat.isDisabled ? 'Enable Boat' : 'Disable Boat'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to {boat.isDisabled ? 'enable' : 'disable'} <b>{boat.name}</b>?</p>

        <ul>
          {(boat.isDisabled ? enableWarningBulletPts : disableWarningBulletPts).map(pt =>
            <li>{pt}</li>
          )}
        </ul>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Nevermind
        </Button>

        <Button
          variant='warning'
          onClick={handleConfirmDisable}
        >
          {boat.isDisabled ? 'Enable' : 'Disable'}
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
