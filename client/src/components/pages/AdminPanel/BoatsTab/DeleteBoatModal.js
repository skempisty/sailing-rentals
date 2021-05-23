import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Button, Modal } from 'react-bootstrap'

import deleteBoat from '../../../../api/deleteBoat'

import { editBoat } from '../../../../store/boats'

class DeleteBoatModal extends React.Component {
  async handleConfirmDelete() {
    const { boat, editBoat } = this.props

    try {
      const deletedBoat = await deleteBoat(boat.id)

      editBoat({ updatedBoat: deletedBoat })
    } catch (error) {
      alert(`Error deleting boat: ${error}`)
    }
  }

  render() {
    const { boat, show, onHide } = this.props

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Boat</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete <b>{boat.name}</b>?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={onHide}>
            Nevermind
          </Button>

          <Button
            variant='danger'
            onClick={this.handleConfirmDelete.bind(this)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  editBoat
}

export default connect(
  null,
  mapDispatchToProps
)(DeleteBoatModal)

DeleteBoatModal.propTypes = {
  show: PropTypes.bool,
  boat: PropTypes.object,
  onHide: PropTypes.func
}
