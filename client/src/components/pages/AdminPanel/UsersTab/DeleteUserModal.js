import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Button, Form, Modal } from 'react-bootstrap'

import deleteUser from '../../../../api/deleteUser'
import buildUserFullName from '../../../../utils/buildUserFullName'

import { removeUser } from '../../../../store/users'

class DeleteUserModal extends React.Component {
  async handleConfirmDelete() {
    const { user, removeUser } = this.props

    try {
      await deleteUser(user.id)

      removeUser({ id: user.id })
    } catch (error) {
      alert(`Error deleting user: ${error}`)
    }
  }

  render() {
    const { user, show, onHide } = this.props

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            This action will prevent a user with this email from registering again.
            Are you sure you want to remove:
          </p>

          <Form.Label><b>User</b></Form.Label>
          <p>{buildUserFullName(user.firstName, user.lastName)}</p>

          <Form.Label><b>Email</b></Form.Label>
          <p>{user.email}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={onHide}>
            Keep User
          </Button>

          <Button
            variant='danger'
            onClick={this.handleConfirmDelete.bind(this)}
          >
            Remove User
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  removeUser
}

export default connect(
  null,
  mapDispatchToProps
)(DeleteUserModal)

DeleteUserModal.propTypes = {
  show: PropTypes.bool,
  user: PropTypes.object,
  onHide: PropTypes.func,
  onUserDelete: PropTypes.func
}
