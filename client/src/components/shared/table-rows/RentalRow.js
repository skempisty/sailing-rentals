import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

import { Button } from 'react-bootstrap'
import { FaEdit, FaBan } from 'react-icons/fa'

import AddRentalModal from '../modals/AddRentalModal'
import DeleteRentalModal from '../modals/DeleteRentalModal'
import UserInfoModal from '../modals/UserInfoModal'

import SelectMenuItem from '../SelectMenuItem'
import SelectMenu from '../SelectMenu'

import updateRental from '../../../api/updateRental'
import deleteRental from '../../../api/deleteRental'

import getUserById from '../../../store/orm/users/getUserById'
import getBoatById from '../../../store/orm/boats/getBoatById'
import { editRental, removeRental } from '../../../store/rentals'

class RentalRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showEditRentalModal: false,
      showDeleteRentalModal: false,
      showSailorModal: false
    }
  }

  async handleRentalEdit(id, updatedRental) {
    const { rental, editRental } = this.props

    try {
      await updateRental(rental.id, updatedRental)

      editRental({ id: rental.id, updatedRental })
    } catch (error) {
      alert('Error updating rental')
    }
  }

  async handleRentalDelete() {
    const { rental, removeRental } = this.props

    try {
      await deleteRental(rental.id)

      removeRental({ id: rental.id })
    } catch (error) {
      alert('Error cancelling rental')
    }
  }

  render() {
    const { rental, options, showSailor } = this.props
    const { showEditRentalModal, showDeleteRentalModal, showSailorModal } = this.state

    return (
      <React.Fragment>
        <AddRentalModal
          editRental={rental}
          show={showEditRentalModal}
          onRentalEdit={this.handleRentalEdit.bind(this)}
          onHide={() => this.setState({ showEditRentalModal: false })}
        />

        <DeleteRentalModal
          show={showDeleteRentalModal}
          rental={rental}
          onRentalDelete={this.handleRentalDelete.bind(this)}
          onHide={() => this.setState({ showDeleteRentalModal: false })}
        />

        <UserInfoModal
          user={getUserById(rental.rentedBy)}
          show={showSailorModal}
          onHide={() => this.setState({ showSailorModal: false })}
        />

        <tr>
          {showSailor &&
            <td>
              <Button
                variant='link'
                onClick={() => this.setState({ showSailorModal: true })}
                style={{ padding: '0' }}
              >
                {getUserById(rental.rentedBy).email}
              </Button>
            </td>
          }

          <td>{moment(rental.start).format('MM/DD/YY LT')}</td>

          <td>{moment(rental.end).format('MM/DD/YY LT')}</td>

          <td>{getBoatById(rental.boatId).name}</td>

          <td>{rental.crewCount}</td>

          <td>{moment(rental.createdAt).format('MM/DD/YY LT')}</td>

          {options &&
            <td>
              <SelectMenu variant='outline-dark'>
                <SelectMenuItem
                  label='Edit Rental'
                  iconComponent={<FaEdit/>}
                  callback={() => this.setState({ showEditRentalModal: true })}
                />

                <SelectMenuItem
                  label='Cancel Rental'
                  iconComponent={<FaBan/>}
                  callback={() => this.setState({ showDeleteRentalModal: true })}
                />
              </SelectMenu>
            </td>
          }
        </tr>
      </React.Fragment>
    )
  }
}

RentalRow.propTypes = {
  options: PropTypes.bool,
  rental: PropTypes.object.isRequired,
  showSailor: PropTypes.bool
}

const mapDispatchToProps = {
  editRental,
  removeRental
}

export default connect(
  null,
  mapDispatchToProps
)(RentalRow)
