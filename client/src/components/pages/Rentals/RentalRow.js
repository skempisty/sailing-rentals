import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import moment from 'moment'
import styled from 'styled-components'

import { Dropdown } from 'react-bootstrap';
import { FaEllipsisH, FaInfoCircle, FaSlash } from 'react-icons/fa';

import AddRentalModal from "./AddRentalModal";

import getBoatById from '../../../store/orm/boats/getBoatById'

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
    super(props);

    this.state = {
      showEditRentalModal: false
    }
  }

  render() {
    const { rental, options } = this.props;
    const { showEditRentalModal } = this.state;

    return (
      <React.Fragment>
        <AddRentalModal
          editRental={rental}
          show={showEditRentalModal}
          onHide={() => this.setState({ showEditRentalModal: false })}
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
                      <FaInfoCircle/>
                      <span>Edit Rental</span>
                    </Dropdown.Item>
                  </StyledDropDownItem>

                  {/* TODO: Add back when adding cancel rental functionality */}
                  {/*<StyledDropDownItem>*/}
                  {/*  <Dropdown.Item disabled onClick={() => console.log('Cancel Rental')}>*/}
                  {/*    <FaSlash/>*/}
                  {/*    <span>Cancel Rental</span>*/}
                  {/*  </Dropdown.Item>*/}
                  {/*</StyledDropDownItem>*/}
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
  rental: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default connect(
  null,
  null
)(RentalRow);
