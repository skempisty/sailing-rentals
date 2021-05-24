import React from 'react'
import { connect } from 'react-redux'
import qs from 'qs'

import { Card, Table, Button, Jumbotron } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'

import ContentWrapper from '../../shared/ContentWrapper'
import AddRentalModal from '../../shared/modals/AddRentalModal'
import RentalRow from '../../shared/table-rows/RentalRow'

import createRental from '../../../api/createRental'
import splitUpcomingAndPastRentals from '../../../utils/splitUpcomingAndPastRentals'
import isNotDeleted from '../../../utils/isNotDeleted'

import { addNewRental } from '../../../store/rentals'
import { addNewPayment } from '../../../store/payments'

class Rentals extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.initialState
  }

  get initialState() {
    const { showAddRentalModal } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })

    return {
      showAddRentalModal: !!showAddRentalModal
    }
  }

  hideAddRentalModal() {
    this.setState({ showAddRentalModal: false })
  }

  /**
   * Takes a rental object from a submitted add rental modal and calls the
   * createRental api function, updates Redux
   * @param {Rental} rentalParams object that comes from addRentalModal's Paypal integration. Not a full Rental object
   * @param {Payment} paymentParams object that comes from addRentalModal's Paypal integration. Not a full Payment object
   */
  async handleAddRental(rentalParams, paymentParams) {
    const { addNewRental, addNewPayment } = this.props

    try {
      // TODO: combine api and redux functions into a async thunk
      const { rental: newRental, payment: newPayment } = await createRental(rentalParams, paymentParams)

      addNewRental({ newRental })
      addNewPayment({ newPayment })

      this.hideAddRentalModal()
    } catch (error) {
      alert(`Error adding your rental: ${error.message}`)
    }
  }

  render() {
    const { myRentals } = this.props
    const { showAddRentalModal } = this.state

    const { upcomingRentals, pastRentals } = splitUpcomingAndPastRentals(myRentals)

    return (
      <ContentWrapper>
        <AddRentalModal
          show={showAddRentalModal}
          onHide={this.hideAddRentalModal.bind(this)}
          onRentalAdd={this.handleAddRental.bind(this)}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1em'
          }}
        >
          <h1 style={{ color: 'white', margin: '0' }}>Sailing Rentals</h1>

          <Button onClick={() => this.setState({ showAddRentalModal: true })}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FaPlusCircle/>
              <div style={{ marginLeft: '0.5em' }}>Rent a sailboat</div>
            </div>
          </Button>
        </div>

        {myRentals.filter(isNotDeleted).length > 0 ?
          <React.Fragment>
            {upcomingRentals.length > 0 &&
              <React.Fragment>
                <h3 style={{ color: 'white' }}>Upcoming</h3>

                <Card>
                  <Table style={{ margin: '0' }}>
                    <thead>
                    <tr>
                      <th>Start</th>
                      <th>End</th>
                      <th>Boat</th>
                      <th>Crew</th>
                      <th>Rented At</th>
                      <th/>
                    </tr>
                    </thead>

                    <tbody>
                      {upcomingRentals.filter(isNotDeleted).map((rental, index) =>
                        <RentalRow
                          options
                          key={`rental-row-${rental.id}-${index}`}
                          rental={rental}
                        />
                      )}
                    </tbody>
                  </Table>
                </Card>
              </React.Fragment>
            }

            {pastRentals.filter(isNotDeleted).length > 0 &&
              <React.Fragment>
                <h3 style={{ color: 'white', marginTop: '0.5em' }}>Past</h3>

                <Card>
                  <Table style={{ margin: '0' }}>
                    <thead>
                    <tr>
                      <th>Start</th>
                      <th>End</th>
                      <th>Boat</th>
                      <th>Crew</th>
                      <th>Rented At</th>
                    </tr>
                    </thead>

                    <tbody>
                      {pastRentals.filter(isNotDeleted).map((rental, index) =>
                        <RentalRow
                          key={`rental-row-${rental.id}-${index}`}
                          rental={rental}
                        />
                      )}
                    </tbody>
                  </Table>
                </Card>
              </React.Fragment>
            }
          </React.Fragment>
          :
          <Jumbotron>
            <h1>You've never rented a sailboat before!</h1>
            <p>
              Click below to begin
            </p>
            <p>
              <Button onClick={() => this.setState({ showAddRentalModal: true })}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <FaPlusCircle/>
                  <div style={{ marginLeft: '0.5em' }}>Rent a sailboat</div>
                </div>
              </Button>
            </p>
          </Jumbotron>
        }
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { myRentals } = state.rentals

  return { myRentals }
}

const mapDispatchToProps = {
  addNewRental,
  addNewPayment
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rentals)