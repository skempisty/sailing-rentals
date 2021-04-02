import React from 'react';
import { connect } from 'react-redux';

import { Card, Table, Button } from 'react-bootstrap';

import ContentWrapper from '../../ContentWrapper';
import AddRentalModal from './AddRentalModal';
import RentalRow from "./RentalRow"

import createRental from '../../../api/createRental'

import { addNewRental } from "../../../store/rentals"
import Rental from "../../../models/Rental";

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

      addNewRental({
        newRental: new Rental({
          start: newRental.start,
          end: newRental.end,
          rentedBy: newRental.rented_by,
          boatId: newRental.boat_id,
          crewCount: newRental.crew_count,
          createdAt: newRental.created_at
        })
      })

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
          {myRentals.length > 0 ?
            <Table>
              <thead>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>Boat</th>
                <th>Crew Count</th>
                <th>Rented At</th>
                <th/>
              </tr>
              </thead>

              <tbody>
                {myRentals.map((rental, index) =>
                 <RentalRow
                   key={`rental-row-${rental.id}-${index}`}
                   rental={rental}
                 />
                )}
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
  const { myRentals } = state.rentals;

  return { myRentals };
};

const mapDispatchToProps = {
  addNewRental
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rentals);