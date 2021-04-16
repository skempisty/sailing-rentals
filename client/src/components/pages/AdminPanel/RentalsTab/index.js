import React from 'react'
import { connect } from 'react-redux'

import { Card, Table } from 'react-bootstrap'

import RentalRow from '../../../shared/table-rows/RentalRow'

import splitUpcomingAndPastRentals from '../../../../utils/splitUpcomingAndPastRentals'

class RentalsTab extends React.Component {
  render() {
    const { allRentals } = this.props

    const { upcomingRentals, pastRentals } = splitUpcomingAndPastRentals(allRentals)

    return (
      <React.Fragment>
        <h3 style={{ color: 'white' }}>Upcoming</h3>

        <Card>
          <Table>
            <thead><tr>
              <th>Sailor</th>
              <th>Start</th>
              <th>End</th>
              <th>Boat</th>
              <th>Crew</th>
              <th>Rented At</th>
              <th/>
            </tr></thead>

            <tbody>
              {upcomingRentals.map((rental, index) =>
                <RentalRow
                  key={`rental-row-${rental.id}-${index}`}
                  rental={rental}
                  options
                  showSailor
                />
              )}
            </tbody>
          </Table>
        </Card>

        {pastRentals.length > 0 &&
          <React.Fragment>
            <h3 style={{color: 'white', marginTop: '0.5em'}}>Past</h3>

            <Card>
              <Table>
                <thead>
                <tr>
                  <th>Sailor</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Boat</th>
                  <th>Crew</th>
                  <th>Rented At</th>
                </tr>
                </thead>

                <tbody>
                {pastRentals.map((rental, index) =>
                  <RentalRow
                    key={`rental-row-${rental.id}-${index}`}
                    rental={rental}
                    showSailor
                  />
                )}
                </tbody>
              </Table>
            </Card>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { allRentals } = state.rentals

  return { allRentals }
}

export default connect(
  mapStateToProps,
  null
)(RentalsTab)
