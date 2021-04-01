import React from 'react';
import { connect } from 'react-redux';

import { Card, Table, Button } from 'react-bootstrap';

import ContentWrapper from '../../ContentWrapper';
import AddRentalModal from './AddRentalModal';

import createRental from '../../../api/createRental';

import { addNewRental } from "../../../store/general";

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

  /**
   * Takes a rental object from a submitted add rental modal and calls the
   * createRental api function, updates Redux
   * @param {Rental} rental object from addRentalModal
   */
  async handleAddRental(rental) {
    const { addNewRental } = this.props;

    try {
      // TODO: combine api and redux functions into a async thunk
      const newRental = await createRental(rental);

      addNewRental({ newRental })

      this.hideAddRentalModal();
    } catch (error) {
      alert('Error adding your rental')
    }
  }

  render() {
    const { myRentals } = this.props;
    const { showAddRentalModal } = this.state;

    return (
      <ContentWrapper>
        <AddRentalModal
          show={showAddRentalModal}
          onHide={this.hideAddRentalModal.bind(this)}
          onRentalAdd={this.handleAddRental.bind(this)}
        />

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

const mapDispatchToProps = {
  addNewRental
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rentals);