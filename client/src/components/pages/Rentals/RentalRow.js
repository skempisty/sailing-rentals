import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'

import { Dropdown } from 'react-bootstrap'
import { FaEllipsisH, FaEdit, FaBan } from 'react-icons/fa'

import AddRentalModal from './AddRentalModal'
import DeleteRentalModal from './DeleteRentalModal'

import updateRental from '../../../api/updateRental'
import deleteRental from '../../../api/deleteRental'

import getBoatById from '../../../store/orm/boats/getBoatById'
import { editRental, removeRental } from '../../../store/rentals'

const StyledDropDownToggle = styled.div`
  button {
    display: flex;
    align-items: center;
    height: 2em;
    
    &:after {
      display: none;
    }
  }
`;

const StyledDropDownItem = styled.div`
  a.dropdown-item {
    display: flex;
    align-items: center;
    
    span {
      margin-left: 0.5em;
    }
  }
`;

class RentalRow extends React.Component {
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
    const { rental, options } = this.props
    const { showEditRentalModal, showDeleteRentalModal } = this.state

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

        <tr>
          <td>{moment(rental.start).format('MM/DD/YY LT')}</td>

          <td>{moment(rental.end).format('MM/DD/YY LT')}</td>

          <td>{getBoatById(rental.boatId).name}</td>

          <td>{rental.crewCount}</td>

          <td>{moment(rental.createdAt).format('MM/DD/YY LT')}</td>

          {options &&
            <td>
              <Dropdown alignRight>
                <StyledDropDownToggle>
                  <Dropdown.Toggle variant='outline-dark'>
                    <FaEllipsisH/>
                  </Dropdown.Toggle>
                </StyledDropDownToggle>

                <Dropdown.Menu>
                  <StyledDropDownItem>
                    <Dropdown.Item onClick={() => this.setState({ showEditRentalModal: true })}>
                      <FaEdit/>
                      <span>Edit Rental</span>
                    </Dropdown.Item>
                  </StyledDropDownItem>

                  <StyledDropDownItem>
                    <Dropdown.Item onClick={() => this.setState({ showDeleteRentalModal: true })}>
                      <FaBan/>
                      <span>Cancel Rental</span>
                    </Dropdown.Item>
                  </StyledDropDownItem>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          }
        </tr>
      </React.Fragment>
    )
  }
}

RentalRow.propTypes = {
  options: PropTypes.bool,
  rental: PropTypes.object.isRequired
}

const mapDispatchToProps = {
  editRental,
  removeRental
}

export default connect(
  null,
  mapDispatchToProps
)(RentalRow)
