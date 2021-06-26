import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

import { FaEdit, FaBan } from 'react-icons/fa'

import AddRentalModal from '../../../shared/modals/AddRentalModal'
import DeleteRentalModal from '../../../shared/modals/DeleteRentalModal'

import SelectMenuItem from '../../../shared/SelectMenuItem'
import SelectMenu from '../../../shared/SelectMenu'

import updateRental from '../../../../api/updateRental'
import deleteRental from '../../../../api/deleteRental'
import { rentalTypes } from '../../../../utils/constants'

import getUserById from '../../../../store/orm/users/getUserById'
import getBoatById from '../../../../store/orm/boats/getBoatById'
import { editRental } from '../../../../store/rentals'

class DryDockRentalRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showEditRentalModal: false,
      showDeleteRentalModal: false
    }
  }

  async handleRentalEdit(id, updatedRental) {
    const { rental, editRental } = this.props

    try {
      const newRental = await updateRental(rental.id, updatedRental)

      editRental({ id: rental.id, updatedRental: newRental })
    } catch (error) {
      alert('Error updating rental')
    }
  }

  async handleRentalDelete() {
    const { rental, editRental } = this.props

    try {
      const deletedRental = await deleteRental(rental.id)

      editRental({ id: rental.id, updatedRental: deletedRental })
    } catch (error) {
      alert('Error cancelling rental')
    }
  }

  render() {
    const { rental } = this.props
    const { showEditRentalModal, showDeleteRentalModal } = this.state

    return (
      <React.Fragment>
        <AddRentalModal
          editRental={rental}
          show={showEditRentalModal}
          rentalType={rentalTypes.MAINTENANCE}
          onRentalEdit={this.handleRentalEdit.bind(this)}
          onHide={() => this.setState({ showEditRentalModal: false })}
        />

        <DeleteRentalModal
          show={showDeleteRentalModal}
          rental={rental}
          onRentalDelete={this.handleRentalDelete.bind(this)}
          onHide={() => this.setState({ showDeleteRentalModal: false })}
        />

        <tr style={{ whiteSpace: 'nowrap' }}>
          <td>{getBoatById(rental.boatId).name}</td>

          <td>{moment(rental.start).format('MM/DD/YY LT')}</td>

          <td>{moment(rental.end).format('MM/DD/YY LT')}</td>

          <td>{getUserById(rental.rentedBy).email}</td>

          <td>{moment(rental.createdAt).format('MM/DD/YY LT')}</td>

          <td>
            <SelectMenu variant='outline-dark'>
              <SelectMenuItem
                label='Edit Maintenance'
                iconComponent={<FaEdit/>}
                callback={() => this.setState({ showEditRentalModal: true })}
              />

              <SelectMenuItem
                label='Cancel Maintenance'
                iconComponent={<FaBan/>}
                callback={() => this.setState({ showDeleteRentalModal: true })}
              />
            </SelectMenu>
          </td>
        </tr>
      </React.Fragment>
    )
  }
}

DryDockRentalRow.propTypes = {
  rental: PropTypes.object.isRequired
}

const mapDispatchToProps = {
  editRental
}

export default connect(
  null,
  mapDispatchToProps
)(DryDockRentalRow)
