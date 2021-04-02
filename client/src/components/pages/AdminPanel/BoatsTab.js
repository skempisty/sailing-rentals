import React from 'react';
import { connect } from 'react-redux';

import { Card, Button, Modal, Form } from 'react-bootstrap';

import createBoat from "../../../api/createBoat";

import { addNewBoat } from '../../../store/boats';

class BoatsTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      showAddBoatModal: false
    };
  }

  hideAddBoatModal() {
    this.setState({ showAddBoatModal: false });
  }

  async handleAddBoatClick() {
    const { addNewBoat } = this.props;
    const { name } = this.state;

    const newBoat = await createBoat(name);

    addNewBoat({
      id: newBoat.id,
      name: newBoat.name,
      model: 'Cutter22',
      description: 'what a magnificent vessel'
    })

    this.hideAddBoatModal();
  }

  render() {
    const { boats } = this.props;
    const {
      name,
      showAddBoatModal
    } = this.state;

    return (
      <React.Fragment>
        <Modal show={showAddBoatModal} onHide={this.hideAddBoatModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Boat</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group controlId="addBoatForm">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Boat name"
                  value={name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideAddBoatModal.bind(this)}>
              Cancel
            </Button>

            <Button variant="primary" onClick={this.handleAddBoatClick.bind(this)}>
              Add Boat
            </Button>
          </Modal.Footer>
        </Modal>

        <Button
          onClick={() => this.setState({ showAddBoatModal: true })}
          style={{ marginBottom: '1em' }}
        >
          Add Boat
        </Button>

        <Card>
          <Card.Body>
            {boats.map((boat, index) =>
              <div key={index}>{boat.name}</div>
            )}
          </Card.Body>
        </Card>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { boats } = state.boats;

  return { boats };
};

const mapDispatchToProps = {
  addNewBoat
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoatsTab);
