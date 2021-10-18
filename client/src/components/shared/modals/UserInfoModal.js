import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Switch from 'react-switch'
import { FaInfoCircle, FaApple, FaCheckCircle, FaCrown } from 'react-icons/fa'
import { Button, Col, Form, InputGroup, Modal } from 'react-bootstrap'

import Flex from '../styled-system/Flex'

import User from '../../../domains/User'
import updateUser from '../../../api/updateUser'

import { updateUserById } from '../../../store/users'

class UserInfoModal extends React.Component {
  constructor(props) {
    super(props)

    const {
      phone,
      affiliation,
      isApproved,
      isInstructor,
      isAdmin
    } = props.user

    const incomingUserObj = {
      phone: phone || '',
      affiliation: affiliation || '',
      isApproved: isApproved === 1,
      isInstructor: isInstructor === 1,
      isAdmin: isAdmin === 1
    }

    this.savedProfileFields = incomingUserObj
    this.state = incomingUserObj
  }

  get savedProfileFields() {
    const { phone, affiliation, isApproved, isInstructor, isAdmin } = this

    return { phone, affiliation, isApproved, isInstructor, isAdmin }
  }

  set savedProfileFields({ phone, affiliation, isApproved, isInstructor, isAdmin }) {
    this.phone = phone
    this.affiliation = affiliation
    this.isApproved = isApproved
    this.isInstructor = isInstructor
    this.isAdmin = isAdmin
  }

  get profileNotEdited() {
    const { phone, affiliation, isApproved, isInstructor, isAdmin } = this.state

    return JSON.stringify(this.savedProfileFields) === JSON.stringify({ phone, affiliation, isApproved, isInstructor, isAdmin })
  }

  async handleSaveEditsClick() {
    const { user, onHide, updateUserById } = this.props
    const { phone, affiliation, isApproved, isInstructor, isAdmin } = this.state

    const updatedFields = { phone, affiliation, isApproved, isInstructor, isAdmin }

    try {
      // update DB
      await updateUser(user.id, updatedFields)
      // update Redux
      updateUserById({ id: user.id, toUpdate: updatedFields })
      // update last saved field local state
      this.savedProfileFields = updatedFields

      onHide()
    } catch (error) {
      alert('Error saving user edits: ' + error)
    }
  }

  render() {
    const { user, show, onHide } = this.props
    const { phone, affiliation, isApproved, isInstructor, isAdmin } = this.state

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title style={{ display: 'flex', alignItems: 'center' }}>
            <FaInfoCircle/>
            <span style={{ marginLeft: '0.5em' }}>Edit Info</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Row>
              {/* Name */}
              <Form.Group as={Col}>
                <Form.Label><b>Name</b></Form.Label>
                <Form.Control value={User.buildUserFullName(user)} readOnly/>
                <Form.Text className='text-muted'>
                  From Google
                </Form.Text>
              </Form.Group>

              {/* Email */}
              <Form.Group as={Col}>
                <Form.Label><b>Email</b></Form.Label>
                <Form.Control value={user.email} readOnly/>
                <Form.Text className='text-muted'>
                  From Google
                </Form.Text>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              {/* Phone */}
              <Form.Group as={Col}>
                <Form.Label><b>Phone</b></Form.Label>

                <InputGroup>
                  <Form.Control
                    value={phone}
                    onChange={(e) => this.setState({ phone: e.target.value })}
                  />
                </InputGroup>
              </Form.Group>

              {/* Affiliation */}
              <Form.Group as={Col}>
                <Form.Label><b>Affiliation</b></Form.Label>

                <InputGroup>
                  <Form.Control
                    value={affiliation}
                    onChange={(e) => this.setState({ affiliation: e.target.value })}
                  />
                </InputGroup>
              </Form.Group>
            </Form.Row>
        </Form>
        </Modal.Body>

        <Modal.Footer style={{ justifyContent: 'space-between' }}>
          <Flex flexDirection='column'>
            <Flex alignItems='center' marginBottom='0.5em'>
              <Switch
                checked={isApproved}
                onChange={() => this.setState({ isApproved: !isApproved })}
              />

              <Flex marginLeft='0.25em'>
                <FaCheckCircle/>
              </Flex>

              <div style={{ marginLeft: '0.5em' }}>Approved</div>
            </Flex>

            <Flex alignItems='center' marginBottom='0.5em'>
              <Switch
                checked={isInstructor}
                onChange={() => this.setState({ isInstructor: !isInstructor })}
              />

              <Flex marginLeft='0.25em'>
                <FaApple/>
              </Flex>

              <div style={{ marginLeft: '0.5em' }}>Instructor</div>
            </Flex>

            <Flex alignItems='center'>
              <Switch
                checked={isAdmin}
                onChange={() => this.setState({ isAdmin: !isAdmin })}
              />

              <Flex marginLeft='0.25em'>
                <FaCrown/>
              </Flex>

              <div style={{ marginLeft: '0.5em' }}>Admin</div>
            </Flex>
          </Flex>

          <Button
            disabled={this.profileNotEdited}
            style={{ width: '8.5em' }}
            onClick={this.handleSaveEditsClick.bind(this)}
          >
            <span>Save Edits</span>
          </Button>

        </Modal.Footer>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  updateUserById
}

export default connect(
  null,
  mapDispatchToProps
)(UserInfoModal)

UserInfoModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onRentalAdd: PropTypes.func
}