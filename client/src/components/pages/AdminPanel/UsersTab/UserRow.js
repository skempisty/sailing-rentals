import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'

import { Dropdown, Badge } from 'react-bootstrap';
import { FaEllipsisH, FaTrash, FaInfoCircle, FaDollarSign, FaLock } from 'react-icons/fa';
import { RiSailboatFill } from 'react-icons/ri';
import UserInfoModal from './UserInfoModal';
import buildFullName from '../../../../utils/buildUserFullName';

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

class UserRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showUserInfoModal: false
    }
  }

  render() {
    const { user } = this.props;
    const { showUserInfoModal } = this.state;

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
            <Dropdown alignRight>
              <StyledDropDownToggle>
                <Dropdown.Toggle variant='outline-dark'>
                  <FaEllipsisH/>
                </Dropdown.Toggle>
              </StyledDropDownToggle>

              <Dropdown.Menu>
                <StyledDropDownItem>
                  <Dropdown.Item onClick={() => this.setState({ showUserInfoModal: true })}>
                    <FaInfoCircle/>
                    <span>Edit Info</span>
                  </Dropdown.Item>
                </StyledDropDownItem>

                <StyledDropDownItem>
                  <Dropdown.Item onClick={() => this.setState({ showUserInfoModal: true })}>
                    <RiSailboatFill/>
                    <span>Rentals</span>
                  </Dropdown.Item>
                </StyledDropDownItem>

                <StyledDropDownItem>
                  <Dropdown.Item onClick={() => this.setState({ showUserInfoModal: true })}>
                    <FaDollarSign/>
                    <span>Payments</span>
                  </Dropdown.Item>
                </StyledDropDownItem>

                <StyledDropDownItem>
                  <Dropdown.Item onClick={() => this.setState({ showUserInfoModal: true })}>
                    <FaTrash/>
                    <span>Delete User</span>
                  </Dropdown.Item>
                </StyledDropDownItem>
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
      </React.Fragment>
    )
  }
}

export default connect(
  null,
  null
)(UserRow);
