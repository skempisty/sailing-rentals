import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

import { Button } from 'react-bootstrap'
import { FaInfoCircle } from 'react-icons/fa'

import UserInfoModal from '../modals/UserInfoModal'
import RentalInfoModal from '../modals/RentalInfoModal'
import PaymentInfoModal from '../modals/PaymentInfoModal'

import SelectMenuItem from '../SelectMenuItem'
import SelectMenu from '../SelectMenu'

import getUserById from '../../../store/orm/users/getUserById'
import getRentalById from '../../../store/orm/rentals/getRentalById'
import getBoatByRentalId from '../../../store/orm/boats/getBoatByRentalId'

class PaymentRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showUserInfoModal: false,
      showRentalInfoModal: false,
      showPaymentInfoModal: false
    }
  }

  get rentalColumnValue() {
    const { payment: { rentalId } } = this.props

    const boatName = getBoatByRentalId(rentalId).name
    const rentalStartTime = moment(getRentalById(rentalId).start).format('MM/DD/YY LT')

    return `${boatName}, ${rentalStartTime}`
  }

  render() {
    const { payment } = this.props
    const { showUserInfoModal, showRentalInfoModal, showPaymentInfoModal } = this.state

    return (
      <React.Fragment>
        <UserInfoModal
          user={getUserById(payment.paidBy)}
          show={showUserInfoModal}
          onHide={() => this.setState({ showUserInfoModal: false })}
        />

        <RentalInfoModal
          rental={getRentalById(payment.rentalId)}
          show={showRentalInfoModal}
          onHide={() => this.setState({ showRentalInfoModal: false })}
        />

        <PaymentInfoModal
          payment={payment}
          show={showPaymentInfoModal}
          onHide={() => this.setState({ showPaymentInfoModal: false })}
        />

        <tr>
          <td>
            <Button
              variant='link'
              onClick={() => this.setState({ showUserInfoModal: true })}
              style={{ padding: '0' }}
            >
              {getUserById(payment.paidBy).email}
            </Button>
          </td>

          <td>
            <Button
              variant='link'
              onClick={() => this.setState({ showRentalInfoModal: true })}
              style={{ padding: '0' }}
            >
              {this.rentalColumnValue}
            </Button>
          </td>

          <td>${payment.amount}</td>

          <td>{moment(payment.createdAt).format('MM/DD/YY LT')}</td>

          <td>
            <SelectMenu variant='outline-dark'>
              <SelectMenuItem
                label='Paypal Details'
                iconComponent={<FaInfoCircle/>}
                callback={() => this.setState({ showPaymentInfoModal: true })}
              />
            </SelectMenu>
          </td>
        </tr>
      </React.Fragment>
    )
  }
}

PaymentRow.propTypes = {
  payment: PropTypes.object.isRequired
}

export default connect(
  null,
  null
)(PaymentRow)
