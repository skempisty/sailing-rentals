import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Button, Modal } from 'react-bootstrap'

import deleteCarouselSlide from '../../../../api/deleteCarouselSlide';

import { removeCarouselSlide } from '../../../../store/carouselSlides';

class DeleteSlideModal extends React.Component {
  async handleConfirmDelete() {
    const { slide, removeCarouselSlide } = this.props

    try {
      await deleteCarouselSlide(slide.id)

      removeCarouselSlide({ id: slide.id })
    } catch (error) {
      alert(`Error deleting slide: ${error}`)
    }
  }

  render() {
    const { slide, show, onHide } = this.props

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Slide</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete this slide?</p>
          <img
            src={slide.imageUrl}
            alt=""
            style={{
              maxWidth: '100%',
              maxHeight: '10em'
            }}
          />
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
  removeCarouselSlide
}

export default connect(
  null,
  mapDispatchToProps
)(DeleteSlideModal)

DeleteSlideModal.propTypes = {
  show: PropTypes.bool,
  slide: PropTypes.object,
  onHide: PropTypes.func
}
