import React from 'react';
import { connect } from 'react-redux';

import { InputGroup, Col, Alert, Card, Form, Button, Badge } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';

import ContentWrapper from '../ContentWrapper';
import VanishingAlert from '../VanishingAlert';

import updateUser from '../../api/updateUser';
import buildFullName from '../../utils/buildUserFullName'
import formatDateTime from '../../utils/formatDateTime'
import setStateAsync from '../../utils/setStateAsync';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.initialState;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { showProfileUpdateSuccess } = this.state;

    if (showProfileUpdateSuccess && showProfileUpdateSuccess !== prevState.showProfileUpdateSuccess) {
      this.setState({ showProfileUpdateSuccess: false });
    }
  }

  get initialState() {
    const { currentUser } = this.props;

    return {
      showProfileUpdateSuccess: false,
      phone: currentUser.phone,
      jobTitle: currentUser.jobTitle,
      affiliation: currentUser.affiliation
    }
  }

  async handleSaveChangesClick() {
    const { currentUser } = this.props;
    const { phone, jobTitle, affiliation } = this.state;

    await setStateAsync({ savingProfile: true }, this);

    const updatedFields = { phone, jobTitle, affiliation };

    try {
      await updateUser(currentUser.id, updatedFields);

      this.setState({ showProfileUpdateSuccess: true });
    } catch (error) {
      alert('Error saving profile changes: ' + error);
    }
  }

  render() {
    const { currentUser } = this.props;
    const { showProfileUpdateSuccess, phone, jobTitle, affiliation } = this.state;

    console.log('showProfileUpdateSuccess', showProfileUpdateSuccess)

    return (
      <ContentWrapper>
        <h1 style={{ color: 'white' }}>Profile</h1>

        <Card><Card.Body>
          <Alert variant='danger'>
            Profile incomplete! Please fill out the missing fields in order for
            your account to be approved for rentals.
          </Alert>

          <div style={{ display: 'flex', marginBottom: '1em' }}>
            <img
              src={currentUser.imageUrl}
              alt=''
              style={{ height: '5em', maxWidth: '5em' }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '1em' }}>
              {currentUser.isAdmin &&
                <Badge variant='danger' style={{ width: '4.5em', marginRight: '0.5em' }}>Admin</Badge>
              }

              <div><b>Approved:</b> {currentUser.isApproved ? <FaCheck color='green' /> : <FaTimes color='red' />}</div>

              <div><b>Joined:</b> {formatDateTime(currentUser.createdAt)}</div>
            </div>
          </div>

          <Form>
            <Form.Row>
              {/* Name */}
              <Form.Group as={Col}>
                <Form.Label><b>Name</b></Form.Label>
                <Form.Control value={buildFullName(currentUser.firstName, currentUser.lastName)} readOnly/>
                <Form.Text className='text-muted'>
                  From Google
                </Form.Text>
              </Form.Group>

              {/* Email */}
              <Form.Group as={Col}>
                <Form.Label><b>Email</b></Form.Label>
                <Form.Control value={currentUser.email} readOnly/>
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

            <div style={{ display: 'flex' }}>
              <Button
                style={{ width: '8.5em' }}
                onClick={this.handleSaveChangesClick.bind(this)}
              >
                <span>Save Changes</span>
              </Button>

              <VanishingAlert
                variant='success'
                margin='0 0 0 1em'
                padding='0.35em 0.75em'
                showStart={showProfileUpdateSuccess}
              >
                Profile Updated!
              </VanishingAlert>
            </div>
          </Form>
        </Card.Body></Card>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { currentUser } = state.general;

  return { currentUser };
};

export default connect(
  mapStateToProps,
  null
)(Profile);
