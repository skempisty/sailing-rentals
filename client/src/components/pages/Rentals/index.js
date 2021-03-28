import React from 'react';
import { connect } from "react-redux";

import { Card, Table, Button, Modal } from 'react-bootstrap';

import ContentWrapper from "../../ContentWrapper";

class Rentals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddRentalModal: false
    }
  }

  hideAddRentalModal() {
    this.setState({ showAddRentalModal: false });
  }

  async handleAddRentalClick() {
    // const { addNewBoat } = this.props;
    // const { name } = this.state;
    //
    // const newBoat = await createBoat(name);
    //
    // addNewBoat({
    //   name: newBoat.name,
    //   model: 'Cutter22',
    //   description: 'what a magnificent vessel'
    // })

    this.hideAddRentalModal();
  }

  render() {
    const { myRentals } = this.props;
    const { showAddRentalModal } = this.state;

    return (
      <ContentWrapper>
        <Modal show={showAddRentalModal} onHide={this.hideAddRentalModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Rental</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Hello
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideAddRentalModal.bind(this)}>
              Cancel
            </Button>

            <Button variant="primary" onClick={this.handleAddRentalClick.bind(this)}>
              Add Rental
            </Button>
          </Modal.Footer>
        </Modal>

        <h1 style={{ color: 'white' }}>Rentals</h1>

        <Button
          onClick={() => this.setState({ showAddRentalModal: true })}
          style={{ marginBottom: '1em' }}
        >
          Rent
        </Button>

        <Card>
          {myRentals ?
            <Table striped bordered hover>
              <thead>
              <tr>
                <th>Boat</th>
                <th>Rental Period</th>
                <th>Paid</th>
                <th>Rented At</th>

              </tr>
              </thead>

              <tbody>
              <tr>
                <td>Cloud Nine</td>
                <td>Mark</td>
                <td>3.50</td>
                <td>noonthirty</td>
              </tr>

              <tr>
                <td>Cloud Nine</td>
                <td>Jacob</td>
                <td>3.50</td>
                <td>noon</td>
              </tr>
              </tbody>
            </Table>
            :
            <div>No Rentals Found. Purchase a rental and you'll find it here!</div>
          }
        </Card>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { myRentals } = state.general;

  return { myRentals };
};

export default connect(
  mapStateToProps,
  null
)(Rentals);