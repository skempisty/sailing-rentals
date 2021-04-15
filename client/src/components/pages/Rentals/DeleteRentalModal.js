import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

import { Button, Form, Modal } from 'react-bootstrap'

import getBoatById from '../../../store/orm/boats/getBoatById'

class DeleteRentalModal extends React.Component {
  handleConfirmDelete() {
    const { onRentalDelete, onHide } = this.props

    onRentalDelete()
    onHide()
  }

  render() {
    const { rental, show, onHide } = this.props

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Rental</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
          Please understand that refunds are not being granted at this time.
          Feel free to edit your existing rental as needed.
          If you would like to cancel this reservation regardless, please press
          "Cancel Rental"
          </p>

          <Form.Label><b>Boat</b></Form.Label>
          <p>{getBoatById(rental.boatId).name}</p>

          <Form.Label><b>Start</b></Form.Label>
          <p>{moment(rental.start).format('MM/DD/YY LT')}</p>

          <Form.Label><b>End</b></Form.Label>
          <p>{moment(rental.end).format('MM/DD/YY LT')}</p>

          <Form.Label><b>Crew count</b></Form.Label>
          <p>{rental.crewCount}</p>

          <Form.Label><b>Rented at</b></Form.Label>
          <p>{moment(rental.createdAt).format('MM/DD/YY LT')}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={onHide}>
            Keep Rental
          </Button>

          <Button
            variant='danger'
            onClick={this.handleConfirmDelete.bind(this)}
          >
            Cancel Rental
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default connect(
  null,
  null
)(DeleteRentalModal)

DeleteRentalModal.propTypes = {
  show: PropTypes.bool,
  rental: PropTypes.object,
  onHide: PropTypes.func,
  onRentalDelete: PropTypes.func
}
