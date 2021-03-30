import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, Form, Modal, Dropdown } from 'react-bootstrap';

class AddRentalModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBoatId: ''
    }
  }

  getBoatNameById(id) {
    const { boats } = this.props;

    for (let i = 0; i < boats.length; i++) {
      if (boats[i].id === id) {
        return boats[i].name;
      }
    }

    return '';
  }

  render() {
    const { show, onHide, onRentalAdd, boats } = this.props;
    const { selectedBoatId } = this.state;

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Rental</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {/* Boat Select */}
            <Form.Label><b>Boat</b></Form.Label>
            <Dropdown alignRight>
              <Dropdown.Toggle variant='dark' id='dropdown-basic'>
                {this.getBoatNameById(selectedBoatId) || 'Select a boat'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {boats.map((boat, index) =>
                  <Dropdown.Item
                    key={`boat-select-${boat.id}-${index}`}
                    onSelect={() => this.setState({ selectedBoatId: boat.id })}
                  >
                    {boat.name}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>

            {/* Crew Members Select */}
            <Form.Label><b>Crew Members</b></Form.Label>
            <Form.Control value='5' readOnly/>

            {/* Date */}
            <Form.Label><b>Date</b></Form.Label>
            <p>
              <input type="date"/>
            </p>


            {/* Time Slot */}
            <Form.Label><b>Time Slot</b></Form.Label>
            <Form.Control value='noon' readOnly/>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={onHide}>
            Cancel
          </Button>

          <Button variant='primary' onClick={onRentalAdd}>
            Proceed to Payment
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  const { boats } = state.general;

  return { boats };
};

export default connect(
  mapStateToProps,
  null
)(AddRentalModal);

AddRentalModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onRentalAdd: PropTypes.func
}