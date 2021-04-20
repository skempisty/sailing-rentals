import React from 'react'
import { connect } from 'react-redux'

import { Badge } from 'react-bootstrap'
import { FaTrash, FaDollarSign, FaLock, FaEdit } from 'react-icons/fa'
import { RiSailboatFill } from 'react-icons/ri'

import UserInfoModal from '../../../shared/modals/UserInfoModal'

import SelectMenuItem from '../../../shared/SelectMenuItem'
import SelectMenu from '../../../shared/SelectMenu'

import buildFullName from '../../../../utils/buildUserFullName'

class UserRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showUserInfoModal: false
    }
  }

  render() {
    const { user } = this.props
    const { showUserInfoModal } = this.state

    return (
      <React.Fragment>
        <UserInfoModal
          user={user}
          show={showUserInfoModal}
          onHide={() => this.setState({ showUserInfoModal: false })}
        />

        <tr>
          <td>
            <img
              src={user.imageUrl}
              alt=''
              style={{ maxWidth: '2em', height: '2em', marginRight: '1em' }}
            />

            <b>{buildFullName(user.firstName, user.lastName)}</b>

            {user.isAdmin === 1 &&
              <Badge
                variant='warning'
                style={{ marginLeft: '0.5em' }}
              >
                Admin
              </Badge>
            }

            {user.isApproved !== 1 &&
              <span style={{ marginLeft: '0.5em' }}><FaLock color='red' /></span>
            }
          </td>

          <td>{user.email}</td>

          <td>
            <SelectMenu variant='outline-dark'>
              <SelectMenuItem
                label='Edit Info'
                iconComponent={<FaEdit/>}
                callback={() => this.setState({ showUserInfoModal: true })}
              />

              <SelectMenuItem
                label='Rentals'
                iconComponent={<RiSailboatFill/>}
                callback={() => this.setState({ showUserInfoModal: true })}
                disabled
              />

              <SelectMenuItem
                label='Payments'
                iconComponent={<FaDollarSign/>}
                callback={() => this.setState({ showUserInfoModal: true })}
                disabled
              />

              <SelectMenuItem
                label='Delete User'
                iconComponent={<FaTrash/>}
                callback={() => this.setState({ showUserInfoModal: true })}
                disabled
              />
            </SelectMenu>
          </td>
        </tr>
      </React.Fragment>
    )
  }
}

export default connect(
  null,
  null
)(UserRow)
