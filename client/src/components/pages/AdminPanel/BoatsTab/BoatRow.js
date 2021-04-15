import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components'

import { Dropdown } from 'react-bootstrap';
import { FaEllipsisH, FaEdit, FaHistory, FaBan } from 'react-icons/fa';

import AddBoatModal from './AddBoatModal';
import DeleteBoatModal from './DeleteBoatModal';

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

class BoatRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditBoatModal: false,
      showDeleteBoatModal: false
    }
  }

  render() {
    const { boat } = this.props;
    const { showEditBoatModal, showDeleteBoatModal } = this.state;

    return (
      <React.Fragment>
        <AddBoatModal
          boat={boat}
          show={showEditBoatModal}
          onHide={() => this.setState({ showEditBoatModal: false })}
        />

        <DeleteBoatModal
          boat={boat}
          show={showDeleteBoatModal}
          onHide={() => this.setState({ showDeleteBoatModal: false })}
        />

        <tr>
          <td>{boat.name}</td>
          <td>{boat.model}</td>
          <td>{boat.perHourRentalCost}</td>

          <td>
            <Dropdown alignRight>
              <StyledDropDownToggle>
                <Dropdown.Toggle variant='outline-dark'>
                  <FaEllipsisH/>
                </Dropdown.Toggle>
              </StyledDropDownToggle>

              <Dropdown.Menu>
                <StyledDropDownItem>
                  <Dropdown.Item onClick={() => this.setState({ showEditBoatModal: true })} disabled>
                    <FaHistory/>
                    <span>Rental History</span>
                  </Dropdown.Item>
                </StyledDropDownItem>

                <StyledDropDownItem>
                  <Dropdown.Item onClick={() => this.setState({ showEditBoatModal: true })}>
                    <FaEdit/>
                    <span>Edit</span>
                  </Dropdown.Item>
                </StyledDropDownItem>

                <StyledDropDownItem>
                  <Dropdown.Item onClick={() => this.setState({ showDeleteBoatModal: true })}>
                    <FaBan/>
                    <span>Delete</span>
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

BoatRow.propTypes = {
  boat: PropTypes.object
}

export default connect(
  null,
  null
)(BoatRow);
