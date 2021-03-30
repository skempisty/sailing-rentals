import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Switch from 'react-switch';
import { FaInfoCircle } from 'react-icons/fa';
import { Button, Col, Form, InputGroup, Modal } from 'react-bootstrap';

import buildFullName from '../../../../utils/buildUserFullName';
import updateUser from '../../../../api/updateUser';

class UserInfoModal extends React.Component {
  constructor(props) {
    super(props);

    const {
      phone,
      job_title: jobTitle,
      affiliation,
      is_approved: isApproved
    } = props.user;

    const incomingUserObj = {
      phone,
      jobTitle,
      affiliation,
      isApproved: isApproved === 1
    }

    this.savedProfileFields = incomingUserObj;
    this.state = incomingUserObj;
  }

  get savedProfileFields() {
    const { phone, jobTitle, affiliation, isApproved } = this;

    return { phone, jobTitle, affiliation, isApproved };
  }

  set savedProfileFields({ phone, jobTitle, affiliation, isApproved }) {
    this.phone = phone;
    this.jobTitle = jobTitle;
    this.affiliation = affiliation;
    this.isApproved = isApproved;
  }

  get profileNotEdited() {
    const { phone, jobTitle, affiliation, isApproved } = this.state;

    return JSON.stringify(this.savedProfileFields) === JSON.stringify({ phone, jobTitle, affiliation, isApproved });
  }

  async handleSaveEditsClick() {
    const { user, onHide } = this.props;
    const { phone, jobTitle, affiliation, isApproved } = this.state;

    const updatedFields = { phone, jobTitle, affiliation, isApproved };

    try {
      await updateUser(user.id, updatedFields);

      this.savedProfileFields = updatedFields;

      onHide();
    } catch (error) {
      alert('Error saving user edits: ' + error);
    }
  }

  render() {
    const { user, show, onHide } = this.props;
    const { phone, jobTitle, affiliation, isApproved } = this.state;

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
                <Form.Control value={buildFullName(user.first_name, user.last_name)} readOnly/>
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

              {/* Job Title */}
              <Form.Group as={Col}>
                <Form.Label><b>Job Title</b></Form.Label>

                <InputGroup>
                  <Form.Control
                    value={jobTitle}
                    onChange={(e) => this.setState({ jobTitle: e.target.value })}
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Switch
              checked={isApproved}
              onChange={() => this.setState({ isApproved: !isApproved })}
            />

            <div style={{ marginLeft: '0.5em' }}>Approved</div>
          </div>

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

export default connect(
  null,
  null
)(UserInfoModal);

UserInfoModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onRentalAdd: PropTypes.func
}