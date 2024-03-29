import React from 'react'
import { connect } from 'react-redux'

import { Card, Table, Alert, Button } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'

import DryDockRentalRow from './DryDockRentalRow'
import AddRentalModal from '../../../shared/modals/AddRentalModal'

import createRentalBlock from '../../../../api/createRentalBlock'
import splitUpcomingAndPastRentals from '../../../../utils/splitUpcomingAndPastRentals'
import isNotDeleted from '../../../../utils/isNotDeleted'
import { rentalTypes } from '../../../../utils/constants'

import { addNewRental } from '../../../../store/rentals'

class DryDockTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showAddRentalModal: false }
  }

  get maintenanceEvents() {
    const { allRentals } = this.props

    const MaintenanceEventsToShow = allRentals.filter(rental => isNotDeleted(rental) && rental.type === rentalTypes.MAINTENANCE)

    const { upcomingRentals } = splitUpcomingAndPastRentals(MaintenanceEventsToShow)

    return upcomingRentals
  }

  /**
   * Takes a rental object from a submitted add rental modal and calls the
   * createRentalBlock api function, updates Redux
   * @param {Rental} rentalParams object that comes from addRentalModal's Paypal integration. Not a full Rental object
   */
  async handleAddMaintenance(rentalParams) {
    const { addNewRental } = this.props

    try {
      // TODO: combine api and redux functions into a async thunk
      const { rental: newRental } = await createRentalBlock(rentalParams)

      addNewRental({ newRental })

      this.setState({ showAddRentalModal: false })
    } catch (error) {
      alert(`Error adding maintenance: ${error.message}`)
    }
  }

  render() {
    const { showAddRentalModal } = this.state

    return (
      <React.Fragment>
        <AddRentalModal
          show={showAddRentalModal}
          onHide={() => this.setState({ showAddRentalModal: false })}
          onRentalAdd={this.handleAddMaintenance.bind(this)}
          rentalType={rentalTypes.MAINTENANCE}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1em'
          }}
        >
          <h3 style={{ color: 'white', margin: '0' }}>Dry Dock</h3>

          <Button onClick={() => this.setState({ showAddRentalModal: true })}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FaPlusCircle/>
              <div style={{ marginLeft: '0.5em' }}>Add Maintenance</div>
            </div>
          </Button>
        </div>

        <Card>
          <Table responsive style={{ margin: '0' }}>
            <thead><tr>
              <th>Boat</th>
              <th>Start</th>
              <th>End</th>
              <th>Maintainer</th>
              <th>Created</th>
              <th/>
            </tr></thead>

            {!!this.maintenanceEvents.length &&
              <tbody>
                {this.maintenanceEvents.map((rental, index) =>
                  <DryDockRentalRow
                    key={`dry-dock-row-${rental.id}-${index}`}
                    rental={rental}
                  />
                )}
              </tbody>
            }
          </Table>

          {!this.maintenanceEvents.length &&
            <Alert
              variant='dark'
              style={{
                margin: '0.5em',
                textAlign: 'center'
              }}
            >
              <b>No Maintenance Records</b>
            </Alert>
          }
        </Card>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { allRentals } = state.rentals

  return { allRentals }
}

const mapDispatchToProps = {
  addNewRental
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DryDockTab)
