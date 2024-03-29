import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Button, Form, Modal } from 'react-bootstrap'
import CurrencyInput from 'react-currency-input-field'

import ImageUploader from '../../../shared/ImageUploader'

import createBoat from '../../../../api/createBoat'
import updateBoat from '../../../../api/updateBoat'
import Boat from '../../../../models/Boat'

import { addBoat, editBoat } from '../../../../store/boats'

class AddBoatModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.initialState
  }

  get initialState() {
    const { boat } = this.props

    const boatObj = new Boat({
      name: boat ? boat.name : '',
      model: boat ? boat.model : '',
      perHourRentalCost: boat ? boat.perHourRentalCost : '',
      description: boat ? boat.description : '',
      imageUrl: boat ? boat.imageUrl : ''
    })

    return {
      ...boatObj,
      uploadedImageUrl: ''
    }
  }

  get boatToSubmit() {
    const { name, model, perHourRentalCost, description, imageUrl, uploadedImageUrl } = this.state

    return {
      name,
      model,
      perHourRentalCost,
      description,
      imageUrl: uploadedImageUrl || imageUrl
    }
  }

  async handleSaveBoatClick() {
    const { boat, addBoat, editBoat } = this.props

    try {
      if (boat) {
        const updatedBoat = await updateBoat(boat.id, this.boatToSubmit)

        editBoat({ updatedBoat: new Boat({
          id: updatedBoat.id,
          name: updatedBoat.name,
          model: updatedBoat.model,
          perHourRentalCost: updatedBoat.perHourRentalCost,
          description: updatedBoat.description,
          imageUrl: updatedBoat.imageUrl,
          deletedAt: updatedBoat.deletedAt
        })})
      } else {
        const newBoat = await createBoat(this.boatToSubmit)

        addBoat({ boat: new Boat({
          id: newBoat.id,
          name: newBoat.name,
          model: newBoat.model,
          perHourRentalCost: newBoat.perHourRentalCost,
          description: newBoat.description,
          imageUrl: newBoat.imageUrl,
          deletedAt: newBoat.deletedAt
        })})
      }
    } catch (error) {
      alert(`Error saving boat: ${error}`)
    } finally {
      this.resetAndHide()
    }
  }

  handlePriceChange(e) {
    const newPrice = Number(e.target.value).toFixed(2)

    this.setState({ perHourRentalCost: newPrice })
  }

  resetAndHide() {
    const { onHide } = this.props

    this.setState(this.initialState)
    onHide()
  }

  render() {
    const { show, boat } = this.props
    const { name, model, description, perHourRentalCost, imageUrl } = this.state

    return (
      <Modal show={show} onHide={this.resetAndHide.bind(this)} style={{ transform: 'translate(4em, 0)' }}>
        <Modal.Header closeButton>
          <Modal.Title>{boat ? 'Edit Boat' : 'Add Boat'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label><b>Name</b></Form.Label>
              <Form.Control
                type='text'
                placeholder='Boat name'
                value={name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label><b>Model</b></Form.Label>
              <Form.Control
                type='text'
                placeholder='Boat model'
                value={model}
                onChange={(e) => this.setState({ model: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label><b>Price per hour</b></Form.Label>
              <CurrencyInput
                placeholder='Price/hour'
                className='form-control'
                defaultValue={0}
                decimalsLimit={2}
                prefix='$'
                value={perHourRentalCost}
                onValueChange={(value) => this.setState({ perHourRentalCost: value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label><b>Description</b></Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Optional'
                value={description}
                onChange={(e) => this.setState({ description: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label><b>Image</b></Form.Label>

              <ImageUploader
                file={imageUrl}
                bucketDirectory='boats'
                maxWidth='20em'
                labelMaxFileSize='Max file size is {filesize}'
                onFileChange={(downloadUrl) => this.setState({ uploadedImageUrl: downloadUrl })}
                onRemoveFileClick={() => this.setState({ imageUrl: '' })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={this.resetAndHide.bind(this)}>
            Cancel
          </Button>

          <Button variant='primary' onClick={this.handleSaveBoatClick.bind(this)}>
            {boat ? 'Save Changes' : 'Add Boat'}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  addBoat,
  editBoat
}

export default connect(
  null,
  mapDispatchToProps
)(AddBoatModal)

AddBoatModal.propTypes = {
  show: PropTypes.bool,
  boat: PropTypes.object,
  onHide: PropTypes.func
}
