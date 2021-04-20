import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Button, Form, Modal } from 'react-bootstrap'

import updateCarouselSlide from '../../../../api/updateCarouselSlide'
import Slide from '../../../../models/Slide'

import { editCarouselSlide } from '../../../../store/carouselSlides'

class EditSlideModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.initialState
  }

  get initialState() {
    const { slide } = this.props

    const slideObj = new Slide({
      label: slide.label || '',
      subText: slide.subText || '',
      imageUrl: slide.imageUrl
    })

    return { ...slideObj }
  }

  async handleSaveSlideClick() {
    const { slide, editCarouselSlide } = this.props

    try {
      const updatedSlide = await updateCarouselSlide(slide.id, this.state)

      editCarouselSlide({ updatedSlide: new Slide({
        id: updatedSlide.id,
        label: updatedSlide.label,
        subText: updatedSlide.subText,
        imageUrl: updatedSlide.imageUrl
      })})
    } catch (error) {
      alert(`Error updating slide: ${error}`)
    } finally {
      this.resetAndHide()
    }
  }

  resetAndHide() {
    const { onHide } = this.props

    this.setState(this.initialState)
    onHide()
  }

  render() {
    const { show } = this.props
    const { label, subText } = this.state

    return (
      <Modal show={show} onHide={this.resetAndHide.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Slide</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label><b>Label</b></Form.Label>
              <Form.Control
                type='text'
                placeholder='Slide Label'
                value={label}
                onChange={(e) => this.setState({ label: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label><b>Sub-text</b></Form.Label>
              <Form.Control
                type='text'
                placeholder='Slide Sub-text'
                value={subText}
                onChange={(e) => this.setState({ subText: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={this.resetAndHide.bind(this)}>
            Cancel
          </Button>

          <Button variant='primary' onClick={this.handleSaveSlideClick.bind(this)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  editCarouselSlide
}

export default connect(
  null,
  mapDispatchToProps
)(EditSlideModal)

EditSlideModal.propTypes = {
  slide: PropTypes.object,
  show: PropTypes.bool,
  onHide: PropTypes.func
}
